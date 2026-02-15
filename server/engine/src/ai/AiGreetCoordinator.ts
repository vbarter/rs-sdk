// AI 问候协调器
// 确保同一 tick 内：同一玩家只被一个 NPC 问候，同一区域只有一个 NPC 主动问候

// 当前 tick 已被抢占的问候：playerName → npcUid
const greetClaims = new Map<string, number>();

// 当前 tick 已有 NPC 主动问候的区域：areaKey → npcUid
const areaClaims = new Map<string, number>();

// 区域粒度（8格为一个区域块）
const AREA_GRID_SIZE = 8;

/**
 * 根据坐标和层级生成区域 key
 */
function areaKey(x: number, z: number, level: number): string {
    const ax = Math.floor(x / AREA_GRID_SIZE);
    const az = Math.floor(z / AREA_GRID_SIZE);
    return `${level}:${ax}:${az}`;
}

/**
 * 每 tick 开始时清空问候抢占记录
 */
export function clearGreetClaims(): void {
    greetClaims.clear();
    areaClaims.clear();
}

/**
 * 尝试为指定 NPC 抢占问候某个玩家的权利
 * 同一 tick 内只允许一个 NPC 问候同一个玩家，且同一区域只允许一个 NPC 主动问候
 */
export function tryClaimGreet(playerName: string, npcUid: number, npcX: number, npcZ: number, npcLevel: number): boolean {
    // 同一玩家不能被多个 NPC 问候
    if (greetClaims.has(playerName)) {
        return false;
    }

    // 同一区域不能有多个 NPC 主动问候
    const key = areaKey(npcX, npcZ, npcLevel);
    if (areaClaims.has(key)) {
        return false;
    }

    greetClaims.set(playerName, npcUid);
    areaClaims.set(key, npcUid);
    return true;
}
