// 银行家专用工具
import type { NpcAiAction } from '../types.js';

export const bankerToolDefs = [
    {
        type: 'function' as const,
        function: {
            name: 'open_bank',
            description: '打开银行界面，让玩家管理存储的物品。',
            parameters: {
                type: 'object',
                properties: {},
                required: []
            }
        }
    }
];

export function parseBankerToolCall(name: string, args: any): NpcAiAction | null {
    switch (name) {
        case 'open_bank':
            return { type: 'open_bank' };
        default:
            return null;
    }
}
