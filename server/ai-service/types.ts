// AI Service ↔ Engine 通信协议类型

// ============ 引擎 → AI 服务 (请求) ============

export interface AiRequest {
    requestId: string;
    npcUid: number;
    npcName: string;
    npcRole: NpcRole;
    npcTypeId: number;
    event: AiEvent;
    context: AiContext;
}

export type NpcRole = 'shopkeeper' | 'guard' | 'banker' | 'bartender' | 'trainer' | 'generic';

export interface AiEvent {
    type: 'player_chat';
    playerName: string;
    playerMessage: string;
}

export interface AiContext {
    npcPosition: { x: number; z: number; level: number };
    nearbyPlayers: Array<{ name: string; combatLevel: number; distance: number }>;
    shopInventory?: Array<{ itemName: string; stock: number; price: number }>;
    conversationHistory: Array<{ speaker: string; text: string }>;
}

// ============ AI 服务 → 引擎 (响应) ============

export interface AiResponse {
    requestId: string;
    actions: NpcAiAction[];
}

export type NpcAiAction =
    | { type: 'say'; text: string }
    | { type: 'open_shop' }
    | { type: 'open_shop_for_player'; playerName: string }
    | { type: 'open_bank' }
    | { type: 'give_item'; itemId: number; count: number }
    | { type: 'face_player'; playerName: string }
    | { type: 'walk_to'; x: number; z: number }
    | { type: 'attack'; playerName: string }
    | { type: 'call_backup'; message: string }
    | { type: 'end_conversation' };

// ============ WebSocket 消息封装 ============

export type WsMessage =
    | { type: 'ai_request'; data: AiRequest }
    | { type: 'ai_response'; data: AiResponse }
    | { type: 'ai_stream_chunk'; data: { requestId: string; text: string } }
    | { type: 'ping' }
    | { type: 'pong' };

// ============ 角色配置 ============

export interface RoleConfig {
    role: NpcRole;
    systemPrompt: string;
    tools: ToolDefinition[];
    temperature?: number;
    maxTokens?: number;
}

export interface ToolDefinition {
    name: string;
    description: string;
    parameters: Record<string, any>; // JSON Schema
}

// ============ Persona 系统 ============

export interface PersonaConfig {
    id: string;
    baseRole: NpcRole;
    npcTypeIds: number[];
    identity: {
        displayName?: string;
        occupation: string;
        location: string;
        bio: string;
    };
    soul: {
        traits: string[];
        speechStyle: string;
        boundaries: string[];
        quirks: string[];
    };
    tools: ToolDefinition[];
    skills: NpcSkill[];
    temperature?: number;
    maxTokens?: number;
}

export interface NpcSkill {
    name: string;
    description: string;
    knowledge: string;
}

// ============ 对话记忆 ============

export interface NpcMemoryEntry {
    npcType: number;
    playerName: string;
    memoryKey: string;
    memoryValue: string;
    updatedAt: number;
}
