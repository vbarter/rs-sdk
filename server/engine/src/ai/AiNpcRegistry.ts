// AI NPC 注册表
// 将 NPC 名称/类型映射到 AI 角色

export type NpcRole = 'shopkeeper' | 'guard' | 'banker' | 'bartender' | 'trainer' | 'generic';

// 根据 NPC 名称关键词匹配角色
const namePatterns: Array<{ pattern: RegExp; role: NpcRole }> = [
    // 商人类
    { pattern: /shop\s*keeper/i, role: 'shopkeeper' },
    { pattern: /shop\s*assistant/i, role: 'shopkeeper' },
    { pattern: /store\s*owner/i, role: 'shopkeeper' },
    { pattern: /trader/i, role: 'shopkeeper' },
    { pattern: /merchant/i, role: 'shopkeeper' },
    { pattern: /seller/i, role: 'shopkeeper' },
    { pattern: /general\s*store/i, role: 'shopkeeper' },
    { pattern: /^Zaff$/i, role: 'shopkeeper' },        // 法杖店
    { pattern: /^Aubury$/i, role: 'shopkeeper' },       // 符文店
    { pattern: /^Thessalia$/i, role: 'shopkeeper' },     // 服装店
    { pattern: /^Horvik/i, role: 'shopkeeper' },          // 盔甲店
    { pattern: /^Lowe$/i, role: 'shopkeeper' },           // 弓箭店
    { pattern: /^Baraek$/i, role: 'shopkeeper' },         // 皮毛商人
    { pattern: /^Tea seller$/i, role: 'shopkeeper' },     // 茶叶小贩
    { pattern: /^Louie Legs$/i, role: 'shopkeeper' },
    { pattern: /^Zeke$/i, role: 'shopkeeper' },          // 弯刀店

    // 卫兵类
    { pattern: /^guard$/i, role: 'guard' },
    { pattern: /^knight/i, role: 'guard' },
    { pattern: /^paladin$/i, role: 'guard' },
    { pattern: /^white\s*knight/i, role: 'guard' },
    { pattern: /^warrior/i, role: 'guard' },

    // 银行家类
    { pattern: /^banker$/i, role: 'banker' },
    { pattern: /bank\s*guard/i, role: 'banker' },

    // 酒保类
    { pattern: /^bartender$/i, role: 'bartender' },
    { pattern: /^barman$/i, role: 'bartender' },
    { pattern: /^barmaid$/i, role: 'bartender' },
    { pattern: /^emily$/i, role: 'bartender' },          // Rising Sun 酒保
    { pattern: /^kaylee$/i, role: 'bartender' },

    // 任务/氛围 NPC
    { pattern: /^Apothecary$/i, role: 'generic' },
    { pattern: /^Father Lawrence$/i, role: 'generic' },
    { pattern: /^Romeo$/i, role: 'generic' },
    { pattern: /^Juliet$/i, role: 'generic' },
    { pattern: /^Jonny the Beard$/i, role: 'generic' },
    { pattern: /^Harlow$/i, role: 'generic' },            // Dr. Harlow
    { pattern: /^King Roald$/i, role: 'generic' },
    { pattern: /^Reldo$/i, role: 'generic' },
    { pattern: /^Curator$/i, role: 'generic' },

    // 训练师类
    { pattern: /master$/i, role: 'trainer' },
    { pattern: /^hans$/i, role: 'trainer' },             // Lumbridge 向导
    { pattern: /^lumbridge\s*guide$/i, role: 'trainer' },
    { pattern: /^combat\s*instructor$/i, role: 'trainer' },
    { pattern: /^survival\s*expert$/i, role: 'trainer' },
    { pattern: /tutor$/i, role: 'trainer' },
];

// 已注册的 AI NPC 类型 ID -> 角色映射
const registeredTypes = new Map<number, NpcRole>();

// AI 功能开关
let aiEnabled = false;

export function isAiEnabled(): boolean {
    return aiEnabled;
}

export function setAiEnabled(enabled: boolean): void {
    aiEnabled = enabled;
}

/**
 * 根据 NPC 名称推断 AI 角色
 */
export function inferRole(npcName: string | null): NpcRole | null {
    if (!npcName) return null;

    for (const { pattern, role } of namePatterns) {
        if (pattern.test(npcName)) {
            return role;
        }
    }

    return null;
}

/**
 * 注册一个 NPC 类型为 AI NPC
 */
export function registerAiNpc(typeId: number, role: NpcRole): void {
    registeredTypes.set(typeId, role);
}

/**
 * 获取 NPC 类型的 AI 角色
 */
export function getAiRole(typeId: number, npcName: string | null): NpcRole | null {
    if (!aiEnabled) return null;

    // 先检查显式注册
    const registered = registeredTypes.get(typeId);
    if (registered) return registered;

    // 然后根据名称推断
    return inferRole(npcName);
}

/**
 * 检查 NPC 是否为 AI NPC
 */
export function isAiNpc(typeId: number, npcName: string | null): boolean {
    return getAiRole(typeId, npcName) !== null;
}
