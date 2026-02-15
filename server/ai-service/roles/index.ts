// 角色注册表
import type { NpcRole, RoleConfig } from '../types.js';
import { shopkeeperRole } from './shopkeeper.js';
import { guardRole } from './guard.js';
import { bankerRole } from './banker.js';
import { bartenderRole } from './bartender.js';
import { trainerRole } from './trainer.js';

const roleRegistry = new Map<NpcRole, RoleConfig>();

roleRegistry.set('shopkeeper', shopkeeperRole);
roleRegistry.set('guard', guardRole);
roleRegistry.set('banker', bankerRole);
roleRegistry.set('bartender', bartenderRole);
roleRegistry.set('trainer', trainerRole);

// 通用角色（用于没有特定角色的NPC）
const genericRole: RoleConfig = {
    role: 'generic',
    systemPrompt: `你是一个中世纪奇幻世界的NPC。你生活在Gielinor大陆上。

## 行为规则
1. 用 say 工具回复玩家，保持简短（不超过60字）
2. 根据你的名字和位置扮演合适的角色
3. 保持中世纪奇幻风格
4. 面向与你交谈的玩家`,
    tools: [],
    temperature: 0.7,
    maxTokens: 120
};

roleRegistry.set('generic', genericRole);

export function getRole(role: NpcRole): RoleConfig {
    return roleRegistry.get(role) || genericRole;
}

export function getAllRoles(): Map<NpcRole, RoleConfig> {
    return roleRegistry;
}
