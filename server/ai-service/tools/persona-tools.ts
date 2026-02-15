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
