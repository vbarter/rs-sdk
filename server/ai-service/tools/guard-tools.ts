// 卫兵专用工具
import type { NpcAiAction } from '../types.js';

export const guardToolDefs = [
    {
        type: 'function' as const,
        function: {
            name: 'attack',
            description: '攻击指定玩家。仅在玩家犯罪或严重挑衅时使用。',
            parameters: {
                type: 'object',
                properties: {
                    playerName: { type: 'string', description: '要攻击的玩家名称' }
                },
                required: ['playerName']
            }
        }
    },
    {
        type: 'function' as const,
        function: {
            name: 'call_backup',
            description: '呼叫附近的其他卫兵NPC来协助。',
            parameters: {
                type: 'object',
                properties: {
                    message: { type: 'string', description: '通知其他卫兵的消息内容' }
                },
                required: ['message']
            }
        }
    },
    {
        type: 'function' as const,
        function: {
            name: 'walk_to',
            description: '走向指定坐标位置。用于巡逻或追捕。',
            parameters: {
                type: 'object',
                properties: {
                    x: { type: 'number', description: 'X坐标' },
                    z: { type: 'number', description: 'Z坐标' }
                },
                required: ['x', 'z']
            }
        }
    }
];

export function parseGuardToolCall(name: string, args: any): NpcAiAction | null {
    switch (name) {
        case 'attack':
            return { type: 'attack', playerName: String(args.playerName) };
        case 'call_backup':
            return { type: 'call_backup', message: String(args.message) };
        case 'walk_to':
            return { type: 'walk_to', x: Number(args.x), z: Number(args.z) };
        default:
            return null;
    }
}
