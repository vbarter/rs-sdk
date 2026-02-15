// formatters.ts - State formatting functions for display and agent consumption

import type { BotState, BotWorldState } from './types.js';
import { tName, t } from '../util/I18n.js';

function isZhLang(): boolean {
    return typeof localStorage !== 'undefined' && localStorage.getItem('rs_language') === '1';
}

function langSetting(): number {
    return isZhLang() ? 1 : 0;
}

function zh(en: string, zhText: string): string {
    return isZhLang() ? zhText : en;
}

// Translate entity name if Chinese mode
function trName(name: string): string {
    return tName(name, langSetting());
}

// Translate option text if Chinese mode
function trOpt(text: string): string {
    return t(text, langSetting());
}

// Format state as text for display (fixed-width columns for alignment)
export function formatBotState(state: BotState): string {
    const lines: string[] = [];

    lines.push(zh('=== BOT SDK STATE ===', '=== Bot SDK 状态 ==='));
    lines.push(`${zh('Tick', '游戏刻')}: ${state.tick}  ${zh('In Game', '游戏中')}: ${state.inGame}`);
    lines.push('');

    // Player info
    if (state.player) {
        const p = state.player;
        lines.push(zh('--- PLAYER ---', '--- 玩家 ---'));
        lines.push(`${p.name} (${zh('Combat', '战斗')} ${p.combatLevel})`);
        lines.push(`${zh('Pos', '位置')}: (${p.worldX}, ${p.worldZ})  ${zh('Level', '层级')}: ${p.level}`);
        lines.push(`${zh('Run', '奔跑')}: ${p.runEnergy}%  ${zh('Weight', '重量')}: ${p.runWeight}kg`);
        lines.push('');
    }

    // Key stats
    lines.push(zh('--- KEY STATS ---', '--- 关键属性 ---'));
    const keySkills = ['Hitpoints', 'Attack', 'Strength', 'Defence', 'Magic', 'Ranged', 'Prayer'];
    const skillZh: Record<string, string> = {
        'Hitpoints': '生命值', 'Attack': '攻击', 'Strength': '力量',
        'Defence': '防御', 'Magic': '魔法', 'Ranged': '远程', 'Prayer': '祈祷'
    };
    for (const skillName of keySkills) {
        const skill = state.skills.find(s => s.name === skillName);
        if (skill) {
            const xpStr = skill.experience.toLocaleString().padStart(10);
            const displayName = isZhLang() ? (skillZh[skillName] ?? skillName) : skillName;
            lines.push(`${displayName.padEnd(10)} ${String(skill.level).padStart(2)}/${String(skill.baseLevel).padEnd(2)} ${xpStr} xp`);
        }
    }
    lines.push('');

    // Inventory summary
    lines.push(zh('--- INVENTORY ---', '--- 背包 ---'));
    if (state.inventory.length === 0) {
        lines.push(zh('Empty', '空'));
    } else {
        const itemCounts: Map<string, number> = new Map();
        for (const item of state.inventory) {
            const key = trName(item.name);
            itemCounts.set(key, (itemCounts.get(key) || 0) + item.count);
        }
        for (const [name, qty] of itemCounts) {
            lines.push(`${name.padEnd(20)} x${qty}`);
        }
    }
    lines.push('');

    // Nearby NPCs
    lines.push(zh('--- NEARBY NPCS ---', '--- 附近NPC ---'));
    if (state.nearbyNpcs.length === 0) {
        lines.push(zh('None', '无'));
    } else {
        for (let i = 0; i < Math.min(5, state.nearbyNpcs.length); i++) {
            const npc = state.nearbyNpcs[i];
            const name = trName(npc.name).padEnd(16);
            const lvl = npc.combatLevel > 0 ? `Lv${String(npc.combatLevel).padStart(2)}` : '    ';
            const hp = npc.maxHp > 0 ? `${String(npc.hp).padStart(2)}/${String(npc.maxHp).padEnd(2)}` : '     ';
            const dist = `${npc.distance}t`.padStart(3);
            const opts = npc.optionsWithIndex.map(o => trOpt(o.text));
            const opStr = opts.length > 0 ? `[${opts.join(',')}]` : '';
            lines.push(`${name} ${lvl} ${hp} ${dist} ${opStr}`);
        }
        if (state.nearbyNpcs.length > 5) {
            lines.push(`... +${state.nearbyNpcs.length - 5} ${zh('more', '更多')}`);
        }
    }
    lines.push('');

    // Nearby Players
    lines.push(zh('--- NEARBY PLAYERS ---', '--- 附近玩家 ---'));
    if (state.nearbyPlayers.length === 0) {
        lines.push(zh('None', '无'));
    } else {
        for (let i = 0; i < Math.min(5, state.nearbyPlayers.length); i++) {
            const pl = state.nearbyPlayers[i];
            lines.push(`${pl.name.padEnd(12)} Cb${String(pl.combatLevel).padStart(3)} ${pl.distance}t`);
        }
        if (state.nearbyPlayers.length > 5) {
            lines.push(`... +${state.nearbyPlayers.length - 5} ${zh('more', '更多')}`);
        }
    }
    lines.push('');

    // Nearby Locations (interactable objects)
    lines.push(zh('--- NEARBY OBJECTS ---', '--- 附近物体 ---'));
    if (state.nearbyLocs.length === 0) {
        lines.push(zh('None', '无'));
    } else {
        for (let i = 0; i < Math.min(8, state.nearbyLocs.length); i++) {
            const loc = state.nearbyLocs[i];
            const name = trName(loc.name).padEnd(16);
            const coords = `(${loc.x},${loc.z})`.padEnd(12);
            const dist = `${loc.distance}t`.padStart(3);
            const opts = loc.options.map(o => trOpt(o));
            const opStr = opts.length > 0 ? `[${opts.join(',')}]` : '';
            lines.push(`${name} ${coords} ${dist} ${opStr}`);
        }
        if (state.nearbyLocs.length > 8) {
            lines.push(`... +${state.nearbyLocs.length - 8} ${zh('more', '更多')}`);
        }
    }
    lines.push('');

    // Ground items
    lines.push(zh('--- GROUND ITEMS ---', '--- 地面物品 ---'));
    if (state.groundItems.length === 0) {
        lines.push(zh('None', '无'));
    } else {
        for (let i = 0; i < Math.min(5, state.groundItems.length); i++) {
            const item = state.groundItems[i];
            lines.push(`${trName(item.name).padEnd(20)} x${String(item.count).padEnd(4)} ${item.distance}t`);
        }
        if (state.groundItems.length > 5) {
            lines.push(`... +${state.groundItems.length - 5} ${zh('more', '更多')}`);
        }
    }
    lines.push('');

    // Recent game messages
    lines.push(zh('--- RECENT MESSAGES ---', '--- 最近消息 ---'));
    if (state.gameMessages.length === 0) {
        lines.push(zh('None', '无'));
    } else {
        for (const msg of state.gameMessages) {
            // Strip color tags
            const cleanText = msg.text.replace(/@\w+@/g, '');
            if (msg.sender) {
                lines.push(`${msg.sender}: ${cleanText}`);
            } else {
                lines.push(cleanText);
            }
        }
    }
    lines.push('');

    // Recent dialogs (NPC chat, popups, etc.)
    lines.push(zh('--- RECENT DIALOGS ---', '--- 最近对话 ---'));
    if (!state.recentDialogs || state.recentDialogs.length === 0) {
        lines.push(zh('None', '无'));
    } else {
        for (const dialog of state.recentDialogs.slice(0, 5)) {
            const textPreview = dialog.text.join(' | ').substring(0, 80);
            lines.push(`[tick ${dialog.tick}] ${textPreview}${dialog.text.join(' | ').length > 80 ? '...' : ''}`);
        }
    }
    lines.push('');

    // Current menu actions (if menu is visible)
    if (state.menuActions.length > 1) {
        lines.push(zh('--- AVAILABLE ACTIONS ---', '--- 可用操作 ---'));
        for (let i = 0; i < Math.min(8, state.menuActions.length); i++) {
            const action = state.menuActions[i];
            // Strip color tags like @whi@, @cya@, etc.
            const cleanOption = action.option.replace(/@\w+@/g, '');
            lines.push(`${i + 1}. ${cleanOption}`);
        }
        if (state.menuActions.length > 8) {
            lines.push(`... and ${state.menuActions.length - 8} more`);
        }
    }

    // Shop state (if open)
    if (state.shop && state.shop.isOpen) {
        lines.push('');
        lines.push(zh('--- SHOP OPEN ---', '--- 商店已开 ---'));
        lines.push(`${zh('Title', '标题')}: ${state.shop.title}`);
        lines.push('');
        lines.push(zh('Shop Items (Buy):', '商店物品 (购买):'));
        if (state.shop.shopItems.length === 0) {
            lines.push(zh('  None', '  无'));
        } else {
            for (const item of state.shop.shopItems.slice(0, 10)) {
                const slot = `[${item.slot}]`.padEnd(4);
                lines.push(`  ${slot} ${trName(item.name).padEnd(18)} x${item.count}`);
            }
            if (state.shop.shopItems.length > 10) {
                lines.push(`  ... +${state.shop.shopItems.length - 10} ${zh('more', '更多')}`);
            }
        }
        lines.push('');
        lines.push(zh('Your Items (Sell):', '你的物品 (出售):'));
        if (state.shop.playerItems.length === 0) {
            lines.push(zh('  None', '  无'));
        } else {
            for (const item of state.shop.playerItems.slice(0, 10)) {
                const slot = `[${item.slot}]`.padEnd(4);
                lines.push(`  ${slot} ${trName(item.name).padEnd(18)} x${item.count}`);
            }
            if (state.shop.playerItems.length > 10) {
                lines.push(`  ... +${state.shop.playerItems.length - 10} ${zh('more', '更多')}`);
            }
        }
    }

    return lines.join('\n');
}

// Format world state for agent - includes dialog/modal info
export function formatWorldStateForAgent(state: BotWorldState, goal: string): string {
    const lines: string[] = [];

    lines.push(`## Current Goal: ${goal}`);
    lines.push(`Tick: ${state.tick}`);

    if (state.player) {
        lines.push('');
        lines.push('### Player');
        lines.push(`Name: ${state.player.name}, Combat Level: ${state.player.combatLevel}`);
        lines.push(`Position: (${state.player.worldX}, ${state.player.worldZ}), Level: ${state.player.level}`);
        lines.push(`Run Energy: ${state.player.runEnergy}%`);
    }

    // Modal state
    if (state.modalOpen) {
        lines.push('');
        lines.push(`### Modal Interface Open: ${state.modalInterface}`);
        if (state.modalInterface === 269) {
            lines.push('(This is the character design screen - use acceptCharacterDesign to continue)');
        }
    }

    // Dialog state
    if (state.dialog.isOpen) {
        lines.push('');
        lines.push('### Dialog Open');
        if (state.dialog.isWaiting) {
            lines.push('(Waiting for server response...)');
        } else if (state.dialog.options.length > 0) {
            lines.push('Options:');
            for (const opt of state.dialog.options) {
                lines.push(`  ${opt.index}. ${opt.text}`);
            }
        } else {
            lines.push('(Click to continue available - use optionIndex: 0)');
        }
    }

    // Interface state (crafting menus like fletching)
    if (state.interface && state.interface.isOpen) {
        lines.push('');
        lines.push(`### Interface Open (id: ${state.interface.interfaceId})`);
        if (state.interface.options.length > 0) {
            lines.push('Options (use "rsbot action interface <N>" to select):');
            for (const opt of state.interface.options) {
                lines.push(`  ${opt.index}. ${opt.text}`);
            }
        } else {
            lines.push('(No selectable options detected)');
        }
    }

    // Shop state
    if (state.shop && state.shop.isOpen) {
        lines.push('');
        lines.push('### Shop Open');
        lines.push(`Title: ${state.shop.title}`);
        lines.push('');
        lines.push('**Shop Items (to buy):**');
        if (state.shop.shopItems.length === 0) {
            lines.push('  (Empty)');
        } else {
            for (const item of state.shop.shopItems) {
                lines.push(`  - [slot ${item.slot}] ${item.name} x${item.count} (id: ${item.id})`);
            }
        }
        lines.push('');
        lines.push('**Your Items (to sell):**');
        if (state.shop.playerItems.length === 0) {
            lines.push('  (Empty)');
        } else {
            for (const item of state.shop.playerItems) {
                lines.push(`  - [slot ${item.slot}] ${item.name} x${item.count} (id: ${item.id})`);
            }
        }
        lines.push('');
        lines.push('Actions: Use shopBuy(slot, amount) or shopSell(slot, amount)');
    }

    // Nearby NPCs
    if (state.nearbyNpcs.length > 0) {
        lines.push('');
        lines.push('### Nearby NPCs');
        for (const npc of state.nearbyNpcs.slice(0, 8)) {
            const lvl = npc.combatLevel > 0 ? ` (Lvl ${npc.combatLevel})` : '';
            const hp = npc.maxHp > 0 ? ` HP: ${npc.hp}/${npc.maxHp}` : '';
            const opts = npc.options.length > 0 ? ` [${npc.options.join(', ')}]` : '';
            lines.push(`- ${npc.name}${lvl}${hp} - ${npc.distance} tiles away, index: ${npc.index}${opts}`);
        }
    }

    // Nearby Objects (trees, rocks, doors, etc.)
    if (state.nearbyLocs && state.nearbyLocs.length > 0) {
        lines.push('');
        lines.push('### Nearby Objects');
        for (const loc of state.nearbyLocs.slice(0, 10)) {
            const opts = loc.options.length > 0 ? ` [${loc.options.join(', ')}]` : '';
            lines.push(`- ${loc.name} at (${loc.x}, ${loc.z}) - ${loc.distance} tiles, id: ${loc.id}${opts}`);
        }
    }

    // Inventory summary
    if (state.inventory.length > 0) {
        lines.push('');
        lines.push('### Inventory');
        const itemCounts = new Map<string, number>();
        for (const item of state.inventory) {
            itemCounts.set(item.name, (itemCounts.get(item.name) || 0) + item.count);
        }
        for (const [name, qty] of itemCounts) {
            lines.push(`  ${name} x${qty}`);
        }
    }

    // Ground items
    if (state.groundItems.length > 0) {
        lines.push('');
        lines.push('### Ground Items Nearby');
        for (const item of state.groundItems.slice(0, 5)) {
            lines.push(`- ${item.name} x${item.count} at (${item.x}, ${item.z}), ${item.distance} tiles`);
        }
    }

    // Recent game messages
    if (state.gameMessages && state.gameMessages.length > 0) {
        lines.push('');
        lines.push('### Recent Messages');
        for (const msg of state.gameMessages) {
            const cleanText = msg.text.replace(/@\w+@/g, '');
            if (msg.sender) {
                lines.push(`- ${msg.sender}: ${cleanText}`);
            } else {
                lines.push(`- ${cleanText}`);
            }
        }
    }

    // Recent dialogs
    if (state.recentDialogs && state.recentDialogs.length > 0) {
        lines.push('');
        lines.push('### Recent Dialogs');
        for (const dialog of state.recentDialogs.slice(0, 5)) {
            lines.push(`- [tick ${dialog.tick}] ${dialog.text.join(' | ')}`);
        }
    }

    return lines.join('\n');
}
