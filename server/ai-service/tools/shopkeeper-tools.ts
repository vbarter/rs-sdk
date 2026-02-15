// 商人专用工具
import type { NpcAiAction } from '../types.js';

export const shopkeeperToolDefs = [
    {
        type: 'function' as const,
        function: {
            name: 'open_shop',
            description: '打开商店界面，让玩家浏览和购买商品。',
            parameters: {
                type: 'object',
                properties: {},
                required: []
            }
        }
    }
];

export function parseShopkeeperToolCall(name: string, args: any): NpcAiAction | null {
    switch (name) {
        case 'open_shop':
            return { type: 'open_shop' };
        default:
            return null;
    }
}
