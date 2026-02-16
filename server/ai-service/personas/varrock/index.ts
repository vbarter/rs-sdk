// 瓦洛克城所有 persona 汇总导出
import type { PersonaConfig } from '../../types.js';

// 商人（7个）
import { zaff, baraek, thessalia, horvik, lowe, aubury, teaSeller } from './merchants.js';
// 酒馆（2个）
import { blueMoonBartender, drHarlow } from './tavern.js';
// 宫殿/学者（3个）
import { kingRoald, reldo, curator } from './palace.js';
// 任务/氛围 NPC（5个）
import { romeo, juliet, apothecary, fatherLawrence, jonnyTheBeard } from './quest-npcs.js';

/** 所有瓦洛克 persona 列表（17个） */
export const varrockPersonas: PersonaConfig[] = [
    // 商人
    zaff,
    baraek,
    thessalia,
    horvik,
    lowe,
    aubury,
    teaSeller,
    // 酒馆
    blueMoonBartender,
    drHarlow,
    // 宫殿/学者
    kingRoald,
    reldo,
    curator,
    // 任务/氛围
    romeo,
    juliet,
    apothecary,
    fatherLawrence,
    jonnyTheBeard,
];
