// AI Bridge — 引擎侧 WebSocket 客户端
// 连接 AI sidecar 服务，转发消息并接收回复

import NpcAiController from './NpcAiController.js';
import { printError, printInfo } from '#/util/Logger.js';

// AI 请求/响应类型（与 ai-service/types.ts 保持一致）
type NpcRole = 'shopkeeper' | 'guard' | 'banker' | 'bartender' | 'trainer' | 'generic';

interface AiRequest {
    requestId: string;
    npcUid: number;
    npcName: string;
    npcRole: NpcRole;
    npcTypeId: number;
    event: {
        type: 'player_chat';
        playerName: string;
        playerMessage: string;
    };
    context: {
        npcPosition: { x: number; z: number; level: number };
        nearbyPlayers: Array<{ name: string; combatLevel: number; distance: number }>;
        shopInventory?: Array<{ itemName: string; stock: number; price: number }>;
        conversationHistory: Array<{ speaker: string; text: string }>;
    };
}

interface AiResponse {
    requestId: string;
    actions: any[];
}

type WsMessage =
    | { type: 'ai_request'; data: AiRequest }
    | { type: 'ai_response'; data: AiResponse }
    | { type: 'ai_stream_chunk'; data: { requestId: string; text: string } }
    | { type: 'ping' }
    | { type: 'pong' };

// 活跃的 AI NPC 控制器（npc uid -> controller）
const controllers = new Map<number, NpcAiController>();

// 请求回调（requestId -> callback）
const pendingCallbacks = new Map<string, (response: AiResponse) => void>();

// 请求ID → NPC UID 映射（用于流式 chunk 路由）
const requestToNpcUid = new Map<string, number>();

let ws: WebSocket | null = null;
let connected = false;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let aiServiceUrl = '';
let requestCounter = 0;

// 心跳
let pingTimer: ReturnType<typeof setInterval> | null = null;

/**
 * 初始化 AI Bridge，连接到 AI 服务
 */
export function initAiBridge(url?: string): void {
    aiServiceUrl = url || process.env.AI_SERVICE_URL || 'ws://localhost:7781';
    printInfo(`[AI Bridge] 初始化, 目标: ${aiServiceUrl}`);
    connect();
}

function connect(): void {
    if (ws) {
        try { ws.close(); } catch { }
    }

    try {
        ws = new WebSocket(aiServiceUrl);

        ws.onopen = () => {
            connected = true;
            printInfo(`[AI Bridge] 已连接到 AI 服务: ${aiServiceUrl}`);

            // 开始心跳
            if (pingTimer) clearInterval(pingTimer);
            pingTimer = setInterval(() => {
                if (ws && connected) {
                    try {
                        ws.send(JSON.stringify({ type: 'ping' }));
                    } catch { }
                }
            }, 30_000);
        };

        ws.onmessage = (event: MessageEvent) => {
            try {
                const msg: WsMessage = JSON.parse(event.data.toString());
                handleMessage(msg);
            } catch (err) {
                printError(`[AI Bridge] 消息解析失败: ${err}`);
            }
        };

        ws.onclose = () => {
            connected = false;
            if (pingTimer) {
                clearInterval(pingTimer);
                pingTimer = null;
            }
            printInfo('[AI Bridge] 连接断开，5秒后重连...');
            scheduleReconnect();
        };

        ws.onerror = () => {
            // onclose 会处理重连
        };
    } catch (err) {
        printError(`[AI Bridge] 连接失败: ${err}`);
        scheduleReconnect();
    }
}

function scheduleReconnect(): void {
    if (reconnectTimer) return;
    reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        connect();
    }, 5000);
}

function handleMessage(msg: WsMessage): void {
    if (msg.type === 'pong') return;

    if (msg.type === 'ai_stream_chunk') {
        const { requestId, text } = msg.data;
        const npcUid = requestToNpcUid.get(requestId);
        if (npcUid !== undefined) {
            const controller = controllers.get(npcUid);
            if (controller) {
                controller.updateStreamingText(text);
            }
        }
        return;
    }

    if (msg.type === 'ai_response') {
        const response = msg.data;
        printInfo(`[AI Bridge] 收到 AI 回复: requestId=${response.requestId}, actions=${JSON.stringify(response.actions).slice(0, 100)}`);
        // 清理 requestId → npcUid 映射
        requestToNpcUid.delete(response.requestId);
        const callback = pendingCallbacks.get(response.requestId);
        if (callback) {
            pendingCallbacks.delete(response.requestId);
            callback(response);
        } else {
            printInfo(`[AI Bridge] 未找到回调: requestId=${response.requestId} (pending: ${pendingCallbacks.size})`);
        }
    }
}

/**
 * 检查 AI 服务是否已连接
 */
export function isAiBridgeConnected(): boolean {
    return connected;
}

/**
 * 获取或创建 NPC 的 AI 控制器
 */
export function getController(npcUid: number): NpcAiController {
    let controller = controllers.get(npcUid);
    if (!controller) {
        controller = new NpcAiController();
        controllers.set(npcUid, controller);
    }
    return controller;
}

/**
 * 移除 NPC 的 AI 控制器
 */
export function removeController(npcUid: number): void {
    controllers.delete(npcUid);
}

/**
 * 发送 AI 请求（异步，通过回调返回结果）
 */
export function sendAiRequest(
    npcUid: number,
    npcName: string,
    npcRole: NpcRole,
    playerName: string,
    playerMessage: string,
    npcX: number,
    npcZ: number,
    npcLevel: number,
    nearbyPlayers: Array<{ name: string; combatLevel: number; distance: number }>,
    controller: NpcAiController,
    npcTypeId: number = 0,
    shopInventory?: Array<{ itemName: string; stock: number; price: number }>
): void {
    if (!connected || !ws) return;

    // 过滤空白消息
    if (!playerMessage || playerMessage.trim().length === 0) return;

    const requestId = `req-${++requestCounter}-${Date.now()}`;

    const request: AiRequest = {
        requestId,
        npcUid,
        npcName,
        npcRole,
        npcTypeId,
        event: {
            type: 'player_chat',
            playerName,
            playerMessage
        },
        context: {
            npcPosition: { x: npcX, z: npcZ, level: npcLevel },
            nearbyPlayers,
            shopInventory,
            conversationHistory: controller.getHistory()
        }
    };

    // 注册回调和流式映射
    requestToNpcUid.set(requestId, npcUid);
    pendingCallbacks.set(requestId, (response) => {
        controller.enqueueActions(response.actions);
    });

    // 超时清理（30秒）
    setTimeout(() => {
        if (pendingCallbacks.has(requestId)) {
            pendingCallbacks.delete(requestId);
            requestToNpcUid.delete(requestId);
            controller.pendingRequest = false;
            // 超时回退回复
            controller.enqueueActions([{ type: 'say', text: '嗯...我想想...' }]);
        }
    }, 30_000);

    controller.pendingRequest = true;
    controller.addToHistory(playerName, playerMessage);

    const wsMsg: WsMessage = { type: 'ai_request', data: request };
    try {
        ws.send(JSON.stringify(wsMsg));
    } catch (err) {
        printError(`[AI Bridge] 发送请求失败: ${err}`);
        pendingCallbacks.delete(requestId);
        controller.pendingRequest = false;
    }
}

/**
 * 关闭 AI Bridge
 */
export function shutdownAiBridge(): void {
    if (pingTimer) {
        clearInterval(pingTimer);
        pingTimer = null;
    }
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }
    if (ws) {
        try { ws.close(); } catch { }
        ws = null;
    }
    connected = false;
    controllers.clear();
    pendingCallbacks.clear();
    requestToNpcUid.clear();
    printInfo('[AI Bridge] 已关闭');
}
