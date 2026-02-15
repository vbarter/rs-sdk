#!/usr/bin/env bun
// AI NPC Sidecar Service — WebSocket 服务端
// 接收引擎转发的玩家聊天消息，通过 LLM 生成 NPC 回复

import type { AiRequest, WsMessage } from './types.js';
import { initAgentPool, processRequest, cleanupAgents, getStats } from './AgentPool.js';

const PORT = parseInt(process.env.AI_SERVICE_PORT || '7781');

// 初始化 pi-mono Agent 池
initAgentPool();

// 跟踪已连接的引擎客户端
const connectedClients = new Set<any>();

console.log(`[AI Service] 启动中，端口 ${PORT}...`);

const server = Bun.serve({
    port: PORT,

    fetch(req, server) {
        const url = new URL(req.url);

        // WebSocket upgrade
        if (req.headers.get('upgrade') === 'websocket') {
            const upgraded = server.upgrade(req);
            if (upgraded) return undefined;
            return new Response('WebSocket upgrade 失败', { status: 400 });
        }

        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        };

        if (req.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // 健康检查 + 状态
        if (url.pathname === '/' || url.pathname === '/status') {
            const stats = getStats();
            return new Response(JSON.stringify({
                status: 'running',
                port: PORT,
                clients: connectedClients.size,
                ...stats
            }, null, 2), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }

        return new Response(`AI NPC Service (port ${PORT})\n\nEndpoints:\n- GET /status\n- ws://localhost:${PORT} (Engine connection)\n`, {
            headers: { 'Content-Type': 'text/plain', ...corsHeaders }
        });
    },

    websocket: {
        open(ws: any) {
            connectedClients.add(ws);
            console.log(`[AI Service] 引擎客户端已连接 (总数: ${connectedClients.size})`);
        },

        async message(ws: any, data: string | Buffer) {
            let parsed: WsMessage;
            try {
                parsed = JSON.parse(data.toString());
            } catch {
                console.error('[AI Service] 无效的 JSON');
                return;
            }

            if (parsed.type === 'ping') {
                ws.send(JSON.stringify({ type: 'pong' }));
                return;
            }

            if (parsed.type === 'ai_request') {
                const request = parsed.data as AiRequest;
                console.log(`[AI Service] 收到请求: ${request.npcName} <- 玩家 ${request.event.playerName}: "${request.event.playerMessage}"`);

                try {
                    const response = await processRequest(request, (text) => {
                        // 流式发送累积文本到引擎
                        try {
                            ws.send(JSON.stringify({
                                type: 'ai_stream_chunk',
                                data: { requestId: request.requestId, text }
                            }));
                        } catch { /* ws 可能已断开 */ }
                    });
                    const responseMsg: WsMessage = { type: 'ai_response', data: response };
                    ws.send(JSON.stringify(responseMsg));

                    const sayAction = response.actions.find(a => a.type === 'say');
                    if (sayAction && sayAction.type === 'say') {
                        console.log(`[AI Service] 回复: ${request.npcName} -> "${sayAction.text}"`);
                    }
                } catch (err: any) {
                    console.error(`[AI Service] 处理请求失败:`, err.message);
                    const errorResponse: WsMessage = {
                        type: 'ai_response',
                        data: {
                            requestId: request.requestId,
                            actions: [{ type: 'say', text: '...' }]
                        }
                    };
                    ws.send(JSON.stringify(errorResponse));
                }
            }
        },

        close(ws: any) {
            connectedClients.delete(ws);
            console.log(`[AI Service] 引擎客户端已断开 (总数: ${connectedClients.size})`);
        }
    }
});

// 定期清理过期对话 (每分钟)
setInterval(cleanupAgents, 60_000);

console.log(`[AI Service] 已启动: ws://localhost:${PORT}`);
console.log(`[AI Service] 状态页面: http://localhost:${PORT}/status`);
console.log(`[AI Service] AI 模型: ${process.env.AI_MODEL || 'moonshot-v1-128k'} (provider: ${process.env.AI_PROVIDER || 'moonshot'})`);
