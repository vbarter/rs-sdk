// 训练师专用工具
import type { NpcAiAction } from '../types.js';

export const trainerToolDefs = [
    // 训练师主要通过 say 工具给予建议
    // 未来可以扩展 assess_skill 等工具
];

export function parseTrainerToolCall(name: string, args: any): NpcAiAction | null {
    return null;
}
