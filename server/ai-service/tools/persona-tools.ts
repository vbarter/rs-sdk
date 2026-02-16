// Persona 专属工具工厂
// 根据 persona 配置创建 pi-mono AgentTool 实例

import { Type } from '@mariozechner/pi-ai';
import type { AgentTool } from '@mariozechner/pi-agent-core';
import type { NpcAiAction, PersonaConfig } from '../types.js';

interface PersonaToolContext {
    shopInventory?: Array<{ itemName: string; stock: number; price: number }>;
}

/**
 * 根据 persona 配置和上下文创建专属工具
 */
export function createPersonaTools(
    persona: PersonaConfig,
    actions: NpcAiAction[],
    context: PersonaToolContext
): AgentTool<any>[] {
    const tools: AgentTool<any>[] = [];

    for (const toolDef of persona.tools) {
        switch (toolDef.name) {
            case 'open_shop_for_player':
                tools.push(createOpenShopTool(actions, toolDef.description));
                break;
            case 'recommend_item':
                tools.push(createRecommendItemTool(actions, context, toolDef.description));
                break;
            case 'sell_item':
                tools.push(createSellItemTool(actions, context, toolDef.description));
                break;
            case 'open_shop':
                tools.push(createOpenShopBasicTool(actions, toolDef.description));
                break;
            case 'give_item':
                tools.push(createGiveItemTool(actions, toolDef.description));
                break;
        }
    }

    return tools;
}

function createOpenShopTool(actions: NpcAiAction[], description?: string): AgentTool<any> {
    return {
        name: 'open_shop_for_player',
        description: description || '为玩家打开商店界面，让他们浏览和购买商品。当玩家表示想买东西、看看商品、交易时使用。',
        label: '打开商店',
        parameters: Type.Object({}),
        execute: async () => {
            // playerName 会在后处理阶段填充
            actions.push({ type: 'open_shop_for_player', playerName: '' });
            return { content: [{ type: 'text', text: '已为玩家打开商店界面' }], details: {} };
        }
    };
}

function createRecommendItemTool(
    actions: NpcAiAction[],
    context: PersonaToolContext,
    description?: string
): AgentTool<any> {
    return {
        name: 'recommend_item',
        description: description || '向玩家推荐商店里的一件商品，说明其用途和价格。',
        label: '推荐商品',
        parameters: Type.Object({
            itemName: Type.String({ description: '要推荐的商品名称' })
        }),
        execute: async (_id, params) => {
            const name = String(params.itemName);
            const shopItems = context.shopInventory || [];
            const found = shopItems.find(
                item => item.itemName.toLowerCase().includes(name.toLowerCase())
            );

            if (found) {
                const text = `推荐：${found.itemName}，库存${found.stock}个，${found.price}金币一个。`;
                actions.push({ type: 'say', text });
                return { content: [{ type: 'text', text: `已推荐: ${found.itemName} (${found.price}金币)` }], details: {} };
            } else {
                const text = `抱歉，我店里没有${name}。`;
                actions.push({ type: 'say', text });
                return { content: [{ type: 'text', text: `未找到商品: ${name}` }], details: {} };
            }
        }
    };
}

function createOpenShopBasicTool(actions: NpcAiAction[], description?: string): AgentTool<any> {
    return {
        name: 'open_shop',
        description: description || '打开商店界面（不指定玩家）。当 NPC 需要打开自己经营的商店时使用。',
        label: '打开商店',
        parameters: Type.Object({}),
        execute: async () => {
            actions.push({ type: 'open_shop' });
            return { content: [{ type: 'text', text: '已打开商店界面' }], details: {} };
        }
    };
}

function createGiveItemTool(actions: NpcAiAction[], description?: string): AgentTool<any> {
    return {
        name: 'give_item',
        description: description || '赠送物品给玩家。当 NPC 需要给玩家一个物品时使用。',
        label: '赠送物品',
        parameters: Type.Object({
            itemId: Type.Number({ description: '物品 ID' }),
            count: Type.Number({ description: '数量，默认1', default: 1 })
        }),
        execute: async (_id, params) => {
            const itemId = Number(params.itemId);
            const count = Number(params.count) || 1;
            actions.push({ type: 'give_item', itemId, count });
            return {
                content: [{ type: 'text', text: `已赠送物品(ID:${itemId}) x${count}` }],
                details: {}
            };
        }
    };
}

function createSellItemTool(
    actions: NpcAiAction[],
    context: PersonaToolContext,
    description?: string
): AgentTool<any> {
    return {
        name: 'sell_item',
        description: description || '向玩家出售商品。会弹出确认提示，玩家确认后才完成交易。当玩家明确表示想买某个具体商品时使用。',
        label: '出售商品',
        parameters: Type.Object({
            itemName: Type.String({ description: '要出售的商品名称（英文）' }),
            count: Type.Number({ description: '出售数量，默认1', default: 1 })
        }),
        execute: async (_id, params) => {
            const name = String(params.itemName);
            const count = Number(params.count) || 1;
            const shopItems = context.shopInventory || [];
            const found = shopItems.find(
                item => item.itemName.toLowerCase().includes(name.toLowerCase())
            );

            if (!found) {
                actions.push({ type: 'say', text: `抱歉，我店里没有${name}。` });
                return { content: [{ type: 'text', text: `商品不存在: ${name}` }], details: {} };
            }

            if (found.stock < count) {
                actions.push({ type: 'say', text: `${found.itemName}库存不够了，只剩${found.stock}个。` });
                return { content: [{ type: 'text', text: `库存不足: ${found.itemName} 剩余${found.stock}` }], details: {} };
            }

            // playerName 会在后处理阶段填充
            actions.push({ type: 'sell_item', itemName: found.itemName, count, playerName: '' });
            return {
                content: [{ type: 'text', text: `已发起交易: ${found.itemName} x${count}，等待玩家确认` }],
                details: {}
            };
        }
    };
}
