// Persona 注册表
// 按 persona ID 和 NPC type ID 双向索引
import type { PersonaConfig } from '../types.js';
import { lumbridgeGeneralShopkeeper } from './lumbridge-general-shopkeeper.js';
import { varrockPersonas } from './varrock/index.js';

const personaRegistry = new Map<string, PersonaConfig>();
const typeIdIndex = new Map<number, PersonaConfig>();

function registerPersona(persona: PersonaConfig): void {
    personaRegistry.set(persona.id, persona);
    for (const typeId of persona.npcTypeIds) {
        typeIdIndex.set(typeId, persona);
    }
}

// 注册所有 persona
registerPersona(lumbridgeGeneralShopkeeper);
for (const persona of varrockPersonas) {
    registerPersona(persona);
}

/**
 * 按 NPC type ID 查找 persona
 */
export function getPersonaByTypeId(npcTypeId: number): PersonaConfig | null {
    return typeIdIndex.get(npcTypeId) ?? null;
}

/**
 * 按 persona ID 查找
 */
export function getPersonaById(id: string): PersonaConfig | null {
    return personaRegistry.get(id) ?? null;
}
