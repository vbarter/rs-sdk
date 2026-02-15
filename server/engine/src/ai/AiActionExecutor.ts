// AI 动作执行器
// 将 AI 服务返回的动作翻译为引擎中的实际调用

import Npc from '#/engine/entity/Npc.js';
import Player from '#/engine/entity/Player.js';
import World from '#/engine/World.js';
import { CoordGrid } from '#/engine/CoordGrid.js';
import NpcType from '#/cache/config/NpcType.js';
import ObjType from '#/cache/config/ObjType.js';
import { ParamHelper } from '#/cache/config/ParamHelper.js';
import TranslationService from '#/util/TranslationService.js';
import IfSetText from '#/network/game/server/model/IfSetText.js';
import { printInfo } from '#/util/Logger.js';
import { getController } from '#/ai/AiBridge.js';
import type { PendingTrade } from '#/ai/NpcAiController.js';

type NpcAiAction =
    | { type: 'say'; text: string }
    | { type: 'open_shop' }
    | { type: 'open_shop_for_player'; playerName: string }
    | { type: 'open_bank' }
    | { type: 'give_item'; itemId: number; count: number }
    | { type: 'sell_item'; itemName: string; count: number; playerName: string }
    | { type: 'face_player'; playerName: string }
    | { type: 'walk_to'; x: number; z: number }
    | { type: 'attack'; playerName: string }
    | { type: 'call_backup'; message: string }
    | { type: 'end_conversation' };

const AI_CHAT_PANEL_RANGE = 8; // 聊天面板消息可见范围（格数）

/**
 * 格式化当前时间为 HH:MM
 */
function formatTime(): string {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
}

/**
 * 查找指定名称的玩家
 */
function findPlayerByName(playerName: string): Player | null {
    for (const player of World.players) {
        if (player.username === playerName || player.displayName === playerName) {
            return player;
        }
    }
    return null;
}

const CHAT_LINE_MAX = 35; // 聊天面板每行最大视觉宽度

/**
 * 计算字符串的视觉宽度（中文/全角字符算 2，其余算 1）
 */
function visualWidth(text: string): number {
    let w = 0;
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        // CJK 统一表意文字、全角标点、日韩字符等
        if (code > 0x7f) {
            w += 2;
        } else {
            w += 1;
        }
    }
    return w;
}

/**
 * 找到使视觉宽度不超过 maxWidth 的最大字符索引
 */
function findBreakIndex(text: string, maxWidth: number): number {
    let w = 0;
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        w += code > 0x7f ? 2 : 1;
        if (w > maxWidth) return i;
    }
    return text.length;
}

/**
 * 将长文本按视觉宽度拆成多行（用于聊天面板和气泡）
 * 先按 \n 拆分显式换行，再对每段做视觉宽度限制
 */
function wrapText(text: string, maxWidth: number): string[] {
    // 先按显式换行符拆分
    const paragraphs = text.split(/\n/);
    const lines: string[] = [];

    for (const paragraph of paragraphs) {
        const trimmed = paragraph.trim();
        if (trimmed.length === 0) continue;

        if (visualWidth(trimmed) <= maxWidth) {
            lines.push(trimmed);
            continue;
        }

        let remaining = trimmed;
        while (remaining.length > 0) {
            if (visualWidth(remaining) <= maxWidth) {
                lines.push(remaining);
                break;
            }
            // 找到不超过 maxWidth 的最大字符位置
            let hardBreak = findBreakIndex(remaining, maxWidth);
            // 尝试在标点或空格处断行（往回找 8 个字符）
            let breakAt = -1;
            const searchStart = Math.max(hardBreak - 8, 0);
            for (let j = hardBreak; j >= searchStart; j--) {
                const ch = remaining[j];
                if (ch === ' ' || ch === '，' || ch === '。' || ch === '！' || ch === '？' || ch === '、' || ch === ',' || ch === '；') {
                    breakAt = j + 1;
                    break;
                }
            }
            if (breakAt <= 0) breakAt = hardBreak;
            if (breakAt <= 0) breakAt = 1; // 至少推进 1 个字符
            lines.push(remaining.slice(0, breakAt));
            remaining = remaining.slice(breakAt);
        }
    }

    return lines.length > 0 ? lines : [text];
}

/**
 * 向 NPC 附近的所有玩家聊天面板发送格式化消息
 * 格式: [HH:MM] NPC名字: 内容（长消息自动换行）
 */
export function broadcastToChatPanel(npc: Npc, npcName: string, text: string): void {
    const time = formatTime();
    const lines = wrapText(text, CHAT_LINE_MAX);
    for (const player of World.players) {
        if (player.level !== npc.level) continue;
        if (CoordGrid.distanceToSW(npc, player) <= AI_CHAT_PANEL_RANGE) {
            // 第一行带时间和名字前缀
            player.messageGame(`[${time}] ${npcName}: ${lines[0]}`);
            // 续行缩进对齐
            for (let k = 1; k < lines.length; k++) {
                player.messageGame(`  ${lines[k]}`);
            }
        }
    }
}

/**
 * 向 NPC 附近的所有玩家聊天面板广播玩家消息（蓝色）
 * 格式: [HH:MM] @blu@玩家名: 内容
 */
export function broadcastPlayerChatToPanel(npc: Npc, playerName: string, text: string): void {
    const time = formatTime();
    const lines = wrapText(text, CHAT_LINE_MAX);
    for (const player of World.players) {
        if (player.level !== npc.level) continue;
        if (CoordGrid.distanceToSW(npc, player) <= AI_CHAT_PANEL_RANGE) {
            player.messageGame(`[${time}] @blu@${playerName}: ${lines[0]}`);
            for (let k = 1; k < lines.length; k++) {
                player.messageGame(`@blu@  ${lines[k]}`);
            }
        }
    }
}

/**
 * 将长文本格式化为气泡换行格式（用 | 分隔）
 * 客户端通过 split('|') 实现多行气泡渲染
 */
export function formatBubbleText(text: string): string {
    const lines = wrapText(text, 28); // 气泡每行约 14 个中文字符宽
    return lines.join('|');
}

/**
 * 执行一个 AI 动作
 * @returns true 表示动作已处理，false 表示需要下一个 tick 继续
 */
export function executeAiAction(npc: Npc, action: NpcAiAction): boolean {
    const npcType = NpcType.get(npc.type);
    const rawName = npcType.name || `NPC#${npc.type}`;
    const npcName = TranslationService.translate(rawName);

    switch (action.type) {
        case 'say': {
            // 气泡文字支持换行（用 | 分隔）
            npc.say(formatBubbleText(action.text));
            // 同时发送到聊天面板（长消息自动拆行）
            broadcastToChatPanel(npc, npcName, action.text);
            return true;
        }

        case 'face_player': {
            const player = findPlayerByName(action.playerName);
            if (player) {
                npc.faceSquare(player.x, player.z);
            }
            return true;
        }

        case 'walk_to': {
            npc.queueWaypoint(action.x, action.z);
            return true;
        }

        case 'open_shop': {
            npc.say('来看看我的商品吧！');
            broadcastToChatPanel(npc, npcName, '来看看我的商品吧！');
            return true;
        }

        case 'open_shop_for_player': {
            const shopPlayer = findPlayerByName(action.playerName);
            if (!shopPlayer) {
                printInfo(`[AI Shop] 找不到玩家: ${action.playerName}`);
                return true;
            }

            const shopNpcType = NpcType.get(npc.type);
            const shopInvId = ParamHelper.getIntParam(39, shopNpcType, -1);  // owned_shop
            if (shopInvId === -1) {
                printInfo(`[AI Shop] NPC=${npcName} 没有商店(param39=-1)`);
                npc.say('抱歉，商店暂时关门了。');
                broadcastToChatPanel(npc, npcName, '抱歉，商店暂时关门了。');
                return true;
            }

            const buyMult = ParamHelper.getIntParam(41, shopNpcType, 400);
            const sellMult = ParamHelper.getIntParam(40, shopNpcType, 1300);
            const haggle = ParamHelper.getIntParam(42, shopNpcType, 30);
            const shopTitle = ParamHelper.getStringParam(43, shopNpcType, npcName);

            printInfo(`[AI Shop] 打开商店: NPC=${npcName}(type=${npc.type}), 标题="${shopTitle}", invId=${shopInvId}, 玩家=${action.playerName}`);

            // 设置 varps
            shopPlayer.setVar(126, shopInvId);
            shopPlayer.setVar(127, buyMult);
            shopPlayer.setVar(128, sellMult);
            shopPlayer.setVar(129, haggle);

            // 绑定库存
            shopPlayer.invListenOnCom(shopInvId, 3900, -1);       // 商店库存 → shop_template:inv
            shopPlayer.invListenOnCom(93, 3823, shopPlayer.uid);  // 玩家背包(inv=93) → shop_template_side:inv

            // 打开商店界面
            shopPlayer.openMainModalSide(3824, 3822);

            // 设置商店标题 — 组件 3901 (shop_template:com_76)
            shopPlayer.write(new IfSetText(3901, TranslationService.translate(shopTitle)));

            broadcastToChatPanel(npc, npcName, '来看看吧！');
            return true;
        }

        case 'open_bank': {
            npc.say('请使用银行柜台存取物品。');
            broadcastToChatPanel(npc, npcName, '请使用银行柜台存取物品。');
            return true;
        }

        case 'give_item': {
            npc.say('给你！');
            broadcastToChatPanel(npc, npcName, '给你！');
            return true;
        }

        case 'sell_item': {
            const sellPlayer = findPlayerByName(action.playerName);
            if (!sellPlayer) {
                printInfo(`[AI Sell] 找不到玩家: ${action.playerName}`);
                return true;
            }

            // 从 NPC 的商店库存中查找物品 ID 和价格
            const sellNpcType = NpcType.get(npc.type);
            const shopInvId = ParamHelper.getIntParam(39, sellNpcType, -1);
            if (shopInvId === -1) {
                npc.say('抱歉，我没有商店。');
                broadcastToChatPanel(npc, npcName, '抱歉，我没有商店。');
                return true;
            }

            const inventory = World.getInventory(shopInvId);
            if (!inventory) {
                npc.say('商店暂时关门了。');
                broadcastToChatPanel(npc, npcName, '商店暂时关门了。');
                return true;
            }

            // 在库存中查找物品
            let foundItem: { id: number; count: number; price: number } | null = null;
            for (const item of inventory.items) {
                if (!item || item.id === -1) continue;
                const objType = ObjType.get(item.id);
                if (objType.name && objType.name.toLowerCase().includes(action.itemName.toLowerCase())) {
                    foundItem = { id: item.id, count: item.count, price: objType.cost };
                    break;
                }
            }

            if (!foundItem) {
                npc.say(`抱歉，没有${action.itemName}了。`);
                broadcastToChatPanel(npc, npcName, `抱歉，没有${action.itemName}了。`);
                return true;
            }

            if (foundItem.count < action.count) {
                npc.say(`${action.itemName}只剩${foundItem.count}个了。`);
                broadcastToChatPanel(npc, npcName, `${action.itemName}只剩${foundItem.count}个了。`);
                return true;
            }

            const unitPrice = foundItem.price;
            const totalPrice = unitPrice * action.count;

            // 在 controller 上设置 pendingTrade
            const controller = getController(npc.uid);
            controller.setPendingTrade({
                playerName: action.playerName,
                itemName: action.itemName,
                itemId: foundItem.id,
                count: action.count,
                unitPrice,
                totalPrice,
                createdAt: World.currentTick
            });

            // 发送黄色确认提示到玩家聊天面板
            const translatedItemName = TranslationService.translate(action.itemName);
            const confirmMsg = action.count === 1
                ? `@yel@[交易确认] ${translatedItemName} x1，价格 ${totalPrice} 金币。回复"确认"购买，"取消"取消。`
                : `@yel@[交易确认] ${translatedItemName} x${action.count}，单价 ${unitPrice}，总价 ${totalPrice} 金币。回复"确认"购买，"取消"取消。`;
            sellPlayer.messageGame(confirmMsg);

            printInfo(`[AI Sell] 待确认交易: ${action.playerName} <- ${action.itemName} x${action.count} @ ${totalPrice}gp`);
            return true;
        }

        case 'attack': {
            const target = findPlayerByName(action.playerName);
            if (target) {
                npc.say('站住！');
                broadcastToChatPanel(npc, npcName, '站住！');
            }
            return true;
        }

        case 'call_backup': {
            for (const otherNpc of World.npcs) {
                if (!otherNpc || otherNpc.nid === npc.nid) continue;
                const otherType = NpcType.get(otherNpc.type);
                if (otherType.name?.toLowerCase().includes('guard') &&
                    CoordGrid.distanceToSW(npc, otherNpc) <= 10) {
                    otherNpc.say(action.message);
                    broadcastToChatPanel(otherNpc, TranslationService.translate(otherType.name || 'Guard'), action.message);
                }
            }
            return true;
        }

        case 'end_conversation': {
            return true;
        }

        default:
            return true;
    }
}

// 金币 ID
const COINS_ID = 995;
// 玩家背包 inv ID
const PLAYER_INV = 93;

/**
 * 执行交易确认：扣金币 + 给物品
 */
export function executeTradeConfirmation(npc: Npc, player: Player, trade: PendingTrade): void {
    const npcType = NpcType.get(npc.type);
    const npcName = TranslationService.translate(npcType.name || 'NPC');
    const itemDisplayName = TranslationService.translate(trade.itemName);

    // 检查金币
    const playerCoins = player.invTotal(PLAYER_INV, COINS_ID);
    if (playerCoins < trade.totalPrice) {
        player.messageGame(`@red@金币不够！需要 ${trade.totalPrice} 金币，你只有 ${playerCoins} 金币。`);
        npc.say('金币不够哦。');
        broadcastToChatPanel(npc, npcName, '金币不够哦。');
        return;
    }

    // 检查背包空位
    const freeSpace = player.invFreeSpace(PLAYER_INV);
    if (freeSpace < trade.count) {
        player.messageGame(`@red@背包满了！需要 ${trade.count} 个空位，只剩 ${freeSpace} 个。`);
        npc.say('你背包满了，先清理一下吧。');
        broadcastToChatPanel(npc, npcName, '你背包满了，先清理一下吧。');
        return;
    }

    // 再次检查库存（可能在等待确认期间卖完了）
    const shopInvId = ParamHelper.getIntParam(39, npcType, -1);
    if (shopInvId !== -1) {
        const inventory = World.getInventory(shopInvId);
        if (inventory) {
            let stockOk = false;
            for (const item of inventory.items) {
                if (item && item.id === trade.itemId && item.count >= trade.count) {
                    stockOk = true;
                    break;
                }
            }
            if (!stockOk) {
                player.messageGame(`@red@抱歉，${itemDisplayName}刚卖完了。`);
                npc.say('不好意思，刚卖完了。');
                broadcastToChatPanel(npc, npcName, '不好意思，刚卖完了。');
                return;
            }
        }
    }

    // 执行交易：扣金币
    player.invDel(PLAYER_INV, COINS_ID, trade.totalPrice);
    // 给物品
    player.invAdd(PLAYER_INV, trade.itemId, trade.count);

    // 成功提示
    const successMsg = trade.count === 1
        ? `@gre@交易成功！获得 ${itemDisplayName} x1，花费 ${trade.totalPrice} 金币。`
        : `@gre@交易成功！获得 ${itemDisplayName} x${trade.count}，花费 ${trade.totalPrice} 金币。`;
    player.messageGame(successMsg);

    npc.say('好咧，拿好！');
    broadcastToChatPanel(npc, npcName, '好咧，拿好！');

    printInfo(`[AI Sell] 交易完成: ${trade.playerName} 购买 ${trade.itemName} x${trade.count} @ ${trade.totalPrice}gp`);
}

/**
 * 执行交易取消
 */
export function executeTradeCancellation(npc: Npc, player: Player): void {
    const npcType = NpcType.get(npc.type);
    const npcName = TranslationService.translate(npcType.name || 'NPC');

    player.messageGame('@yel@交易已取消。');
    npc.say('好吧，想买的时候再来找我。');
    broadcastToChatPanel(npc, npcName, '好吧，想买的时候再来找我。');
}
