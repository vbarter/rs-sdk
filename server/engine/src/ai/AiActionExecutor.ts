// AI 动作执行器
// 将 AI 服务返回的动作翻译为引擎中的实际调用

import Npc from '#/engine/entity/Npc.js';
import Player from '#/engine/entity/Player.js';
import World from '#/engine/World.js';
import { CoordGrid } from '#/engine/CoordGrid.js';
import NpcType from '#/cache/config/NpcType.js';
import { ParamHelper } from '#/cache/config/ParamHelper.js';
import TranslationService from '#/util/TranslationService.js';
import IfSetText from '#/network/game/server/model/IfSetText.js';
import { printInfo } from '#/util/Logger.js';

type NpcAiAction =
    | { type: 'say'; text: string }
    | { type: 'open_shop' }
    | { type: 'open_shop_for_player'; playerName: string }
    | { type: 'open_bank' }
    | { type: 'give_item'; itemId: number; count: number }
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
