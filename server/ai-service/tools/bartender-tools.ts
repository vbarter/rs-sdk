// 酒保专用工具
import type { NpcAiAction } from '../types.js';

export const bartenderToolDefs = [
    {
        type: 'function' as const,
        function: {
            name: 'open_shop',
            description: '打开酒水菜单，让玩家购买饮品。',
            parameters: {
                type: 'object',
                properties: {},
                required: []
            }
        }
    },
    {
        type: 'function' as const,
        function: {
            name: 'give_item',
            description: '给玩家一件物品（比如一杯啤酒）。',
            parameters: {
                type: 'object',
                properties: {
                    itemId: { type: 'number', description: '物品ID' },
                    count: { type: 'number', description: '数量', default: 1 }
                },
                required: ['itemId']
            }
        }
    }
];

export function parseBartenderToolCall(name: string, args: any): NpcAiAction | null {
    switch (name) {
        case 'open_shop':
            return { type: 'open_shop' };
        case 'give_item':
            return { type: 'give_item', itemId: Number(args.itemId), count: Number(args.count || 1) };
        default:
            return null;
    }
}
