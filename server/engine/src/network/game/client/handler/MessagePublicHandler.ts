import { PlayerInfoProt } from '@2004scape/rsbuf';

import WordEnc from '#/cache/wordenc/WordEnc.js';
import Player from '#/engine/entity/Player.js';
import Packet from '#/io/Packet.js';
import ClientGameMessageHandler from '#/network/game/client/ClientGameMessageHandler.js';
import MessagePublic from '#/network/game/client/model/MessagePublic.js';
import WordPack from '#/wordenc/WordPack.js';

import NpcType from '#/cache/config/NpcType.js';
import ObjType from '#/cache/config/ObjType.js';
import { ParamHelper } from '#/cache/config/ParamHelper.js';
import Npc from '#/engine/entity/Npc.js';
import World from '#/engine/World.js';
import { CoordGrid } from '#/engine/CoordGrid.js';
import { isAiEnabled, getAiRole, type NpcRole } from '#/ai/AiNpcRegistry.js';
import { isAiBridgeConnected, getController, sendAiRequest } from '#/ai/AiBridge.js';
import { broadcastPlayerChatToPanel, executeTradeConfirmation, executeTradeCancellation } from '#/ai/AiActionExecutor.js';
import TranslationService from '#/util/TranslationService.js';
import { printInfo } from '#/util/Logger.js';

const AI_CHAT_RANGE = 5; // NPC 能"听到"玩家说话的范围（格数）

/**
 * 计算 NPC 应走到的位置：玩家旁边相邻格子（不重叠）
 * 优先选择 NPC 当前方向侧的格子（让 NPC 走最短路径过来）
 */
function calcAdjacentPos(npc: { x: number; z: number }, player: { x: number; z: number }): { x: number; z: number } {
    const dx = npc.x - player.x;
    const dz = npc.z - player.z;

    // NPC 和玩家重叠时，往 +x 方向退一格
    if (dx === 0 && dz === 0) {
        return { x: player.x + 1, z: player.z };
    }

    // 选择从 NPC 方向过来的相邻格（NPC 走到玩家面前）
    let stepX = 0;
    let stepZ = 0;
    if (Math.abs(dx) >= Math.abs(dz)) {
        stepX = dx > 0 ? 1 : -1;
    } else {
        stepZ = dz > 0 ? 1 : -1;
    }
    return { x: player.x + stepX, z: player.z + stepZ };
}

export default class MessagePublicHandler extends ClientGameMessageHandler<MessagePublic> {
    handle(message: MessagePublic, player: Player): boolean {
        const { color, effect, input } = message;

        if (player.socialProtect || color < 0 || color > 11 || effect < 0 || effect > 2 || input.length > 100) {
            return false;
        }

        if (player.muted_until !== null && player.muted_until > new Date()) {
            // todo: do we still log their attempt to chat?
            return false;
        }

        const buf: Packet = Packet.alloc(0);
        buf.pdata(input, 0, input.length);
        buf.pos = 0;
        const unpack: string = WordPack.unpack(buf, input.length);
        buf.release();

        player.chatColour = color;
        player.chatEffect = effect;
        player.chatRights = Math.min(player.staffModLevel, 2);
        player.logMessage = unpack;

        // === AI NPC Hook: 检测附近 AI NPC 并转发消息 ===
        let forwarded = false;
        if (isAiEnabled() && isAiBridgeConnected()) {
            forwarded = this.forwardToAiNpcs(player, unpack);
        }

        const out: Packet = Packet.alloc(0);
        WordPack.pack(out, WordEnc.filter(unpack));
        player.chatMessage = new Uint8Array(out.pos);
        out.pos = 0;
        out.gdata(player.chatMessage, 0, player.chatMessage.length);
        out.release();

        if (forwarded) {
            // AI 对话：不设 CHAT mask（避免其他玩家 chatbox 重复）
            // broadcastPlayerChatToPanel 已在 forwardToAiNpcs 中发送
        } else {
            // 普通聊天：设置 CHAT mask（其他玩家看到头顶气泡 + chatbox）
            player.masks |= PlayerInfoProt.CHAT;
            // 回显给说话者（客户端不再本地 addMessage）
            player.messageGame(`${player.displayName}: ${unpack}`);
        }

        player.socialProtect = true;
        return true;
    }

    /**
     * 将玩家聊天消息转发给最近的 AI NPC（只选一个）
     */
    private forwardToAiNpcs(player: Player, chatText: string): boolean {
        // 第一遍：找到距离最近的可用 AI NPC
        let closestNpc: Npc | null = null;
        let closestDist = AI_CHAT_RANGE + 1;
        let closestRole: NpcRole | null = null;

        for (const npc of World.npcs) {
            if (!npc || !npc.isActive) continue;
            if (npc.level !== player.level) continue;

            const dist = CoordGrid.distanceToSW(player, npc);
            if (dist > AI_CHAT_RANGE || dist >= closestDist) continue;

            const npcType = NpcType.get(npc.type);
            const role = getAiRole(npc.type, npcType.name);
            if (!role) continue;

            // 检查是否已被其他玩家锁定
            const controller = getController(npc.uid);
            if (controller.isEngaged() && controller.lockedByPlayer !== player.displayName) continue;

            closestNpc = npc;
            closestDist = dist;
            closestRole = role;
        }

        if (!closestNpc || !closestRole) return false;

        const npcType = NpcType.get(closestNpc.type);
        const shopTitle = ParamHelper.getStringParam(43, npcType, '');
        printInfo(`[AI Chat] 选中NPC: name="${npcType.name}", type=${closestNpc.type}, role=${closestRole}, shop="${shopTitle}", dist=${closestDist}, 玩家=${player.displayName}`);

        const controller = getController(closestNpc.uid);

        // === 待确认交易拦截 ===
        if (controller.hasPendingTradeFor(player.displayName)) {
            const trade = controller.pendingTrade!;
            const confirmPattern = /^(确认|买|好|好的|行|yes|buy|ok|y)$/i;
            const cancelPattern = /^(取消|不买|算了|不要|no|cancel|n|不)$/i;

            // 广播玩家消息到聊天面板
            broadcastPlayerChatToPanel(closestNpc, player.displayName, chatText);

            if (confirmPattern.test(chatText.trim())) {
                // 确认交易
                executeTradeConfirmation(closestNpc, player, trade);
                controller.clearPendingTrade();
                controller.lockedAt = World.currentTick; // 刷新锁时间
                controller.addToHistory(player.displayName, chatText);
                controller.addToHistory(
                    TranslationService.translate(NpcType.get(closestNpc.type).name || 'NPC'),
                    '好咧，拿好！'
                );
                return true;
            } else if (cancelPattern.test(chatText.trim())) {
                // 取消交易
                executeTradeCancellation(closestNpc, player);
                controller.clearPendingTrade();
                controller.lockedAt = World.currentTick;
                controller.addToHistory(player.displayName, chatText);
                controller.addToHistory(
                    TranslationService.translate(NpcType.get(closestNpc.type).name || 'NPC'),
                    '好吧，想买的时候再来找我。'
                );
                return true;
            } else {
                // 说了其他内容 → 清除 pendingTrade，继续正常 AI 对话
                controller.clearPendingTrade();
                printInfo(`[AI Trade] 玩家说了无关内容，清除 pendingTrade，继续正常对话`);
            }
        }

        // 尝试获取对话锁
        if (!controller.tryLock(player.displayName, World.currentTick)) {
            closestNpc.say('抱歉，我正在忙，请稍等。');
            return false;
        }

        // 如果已有请求在飞行中，跳过
        if (controller.pendingRequest) return false;

        // 记录玩家位置，NPC 会走向这里
        controller.setTargetPlayerPos(player.x, player.z);

        // NPC 走到玩家面前（相邻但不重叠）并面向玩家
        if (closestDist !== 1) {
            // dist > 1: 太远，走过去; dist === 0: 重叠了，需要退开
            const adjPos = calcAdjacentPos(closestNpc, player);
            closestNpc.queueWaypoint(adjPos.x, adjPos.z);
        }
        closestNpc.faceSquare(player.x, player.z);

        // 收集附近玩家信息
        const nearbyPlayers: Array<{ name: string; combatLevel: number; distance: number }> = [];
        for (const other of World.players) {
            if (!other || other.pid === player.pid) continue;
            const otherDist = CoordGrid.distanceToSW(closestNpc, other);
            if (otherDist <= AI_CHAT_RANGE && other.level === closestNpc.level) {
                nearbyPlayers.push({
                    name: other.displayName,
                    combatLevel: other.combatLevel,
                    distance: otherDist
                });
            }
        }

        // 将玩家消息广播到聊天面板（与 NPC 回复格式一致）
        broadcastPlayerChatToPanel(closestNpc, player.displayName, chatText);

        // 获取商店库存（如果此 NPC 有 owned_shop 参数）
        const shopInventory = this.getShopInventory(npcType);

        // 发送 AI 请求
        sendAiRequest(
            closestNpc.uid,
            npcType.name || `NPC#${closestNpc.type}`,
            closestRole,
            player.displayName,
            chatText,
            closestNpc.x, closestNpc.z, closestNpc.level,
            nearbyPlayers,
            controller,
            closestNpc.type,
            shopInventory
        );

        return true;
    }

    /**
     * 从 NPC 的 params 中读取 owned_shop 库存信息
     */
    private getShopInventory(npcType: any): Array<{ itemName: string; stock: number; price: number }> | undefined {
        const shopInvId = ParamHelper.getIntParam(39, npcType, -1); // param 39 = owned_shop
        if (shopInvId === -1) return undefined;

        const inventory = World.getInventory(shopInvId);
        if (!inventory) return undefined;

        const items: Array<{ itemName: string; stock: number; price: number }> = [];
        for (const item of inventory.items) {
            if (!item || item.id === -1) continue;
            const objType = ObjType.get(item.id);
            items.push({
                itemName: objType.name || `item#${item.id}`,
                stock: item.count,
                price: objType.cost
            });
        }

        return items.length > 0 ? items : undefined;
    }
}
