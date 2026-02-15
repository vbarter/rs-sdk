// 通用 NPC 工具 — 所有角色都可用
import type { NpcAiAction } from '../types.js';

// 工具定义（传给 LLM 的 function calling schema）
export const commonToolDefs = [
    {
        type: 'function' as const,
        function: {
            name: 'say',
            description: '让 NPC 说话（头顶气泡文字）。保持简短自然，不超过 80 个字。',
            parameters: {
                type: 'object',
                properties: {
                    text: { type: 'string', description: '要说的话' }
                },
                required: ['text']
            }
        }
    },
    {
        type: 'function' as const,
        function: {
            name: 'face_player',
            description: '转向面对指定玩家。',
            parameters: {
                type: 'object',
                properties: {
                    playerName: { type: 'string', description: '玩家名称' }
                },
                required: ['playerName']
            }
        }
    },
    {
        type: 'function' as const,
        function: {
            name: 'end_conversation',
            description: '结束与玩家的对话，释放对话锁。当对话自然结束或玩家告别时使用。',
            parameters: {
                type: 'object',
                properties: {},
                required: []
            }
        }
    }
];

// 将工具调用结果转换为引擎动作
export function parseCommonToolCall(name: string, args: any): NpcAiAction | null {
    switch (name) {
        case 'say':
            return { type: 'say', text: String(args.text || '').slice(0, 80) };
        case 'face_player':
            return { type: 'face_player', playerName: String(args.playerName) };
        case 'end_conversation':
            return { type: 'end_conversation' };
        default:
            return null;
    }
}
