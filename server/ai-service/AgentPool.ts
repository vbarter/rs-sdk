// Agent 实例池管理
// 使用 pi-mono Agent 框架，通过 OpenRouter 调用 LLM

import { Agent } from '@mariozechner/pi-agent-core';
import { getModel, registerBuiltInApiProviders } from '@mariozechner/pi-ai';
import { Type } from '@mariozechner/pi-ai';
import type { AgentTool, AgentToolResult } from '@mariozechner/pi-agent-core';
import type { AiRequest, AiResponse, NpcAiAction, NpcRole, PersonaConfig } from './types.js';
import { getRole } from './roles/index.js';
import { getPersonaByTypeId } from './personas/index.js';
import { createPersonaTools } from './tools/persona-tools.js';

const AI_MODEL_ID = process.env.AI_MODEL || 'moonshot-v1-128k';
const AI_PROVIDER = process.env.AI_PROVIDER || 'moonshot';
const AI_REQUEST_TIMEOUT_MS = parseInt(process.env.AI_REQUEST_TIMEOUT_MS || '30000');
const AI_MAX_CONCURRENT = parseInt(process.env.AI_MAX_CONCURRENT || '20');

// Agent 实例池：按 "npcUid-playerName" 索引
const agents = new Map<string, { agent: Agent; lastUsed: number; npcRole: NpcRole }>();

// 并发请求计数
let activeRequests = 0;

// 速率限制
const playerRateLimit = new Map<string, { count: number; resetAt: number }>();
let globalRateCount = 0;
let globalRateResetAt = 0;

const RATE_LIMIT_PER_PLAYER = parseInt(process.env.AI_RATE_LIMIT_PER_PLAYER || '10');
const RATE_LIMIT_GLOBAL = parseInt(process.env.AI_RATE_LIMIT_GLOBAL || '60');

let model: any;

/**
 * 创建 Kimi/Moonshot 自定义模型对象
 * Moonshot API 兼容 OpenAI 格式，使用 openai-completions API 类型
 */
function createKimiModel(modelId: string): any {
    const baseUrl = process.env.KIMI_BASE_URL || 'https://api.moonshot.cn/v1';
    return {
        id: modelId,
        name: `Kimi ${modelId}`,
        api: 'openai-completions',
        provider: 'moonshot',
        baseUrl,
        reasoning: false,
        input: ['text'],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: modelId.includes('128k') ? 128000 : modelId.includes('32k') ? 32000 : 128000,
        maxTokens: 4096,
        // Kimi/Moonshot 兼容性设置 — 禁用 Kimi 不支持的 OpenAI 特有字段
        compat: {
            supportsStore: false,              // 不发 store 参数
            supportsDeveloperRole: false,       // 用 system 而非 developer
            supportsReasoningEffort: false,     // 不发 reasoning_effort
            supportsUsageInStreaming: false,    // 不发 stream_options
            maxTokensField: 'max_tokens',       // 用 max_tokens 而非 max_completion_tokens
            supportsStrictMode: false,          // 不在 tools 里加 strict 字段
        },
    };
}

export function initAgentPool() {
    registerBuiltInApiProviders();

    if (AI_PROVIDER === 'moonshot') {
        // Kimi/Moonshot：手动构建模型对象（pi-ai 内置注册表没有 moonshot 平台 API 的模型）
        model = createKimiModel(AI_MODEL_ID);
        console.log(`[AI] Kimi/Moonshot 初始化完成, model=${model.id}, baseUrl=${model.baseUrl}`);
    } else {
        // 其他 provider（OpenRouter 等）：从内置注册表查找
        model = getModel(AI_PROVIDER as any, AI_MODEL_ID as any);
        console.log(`[AI] Pi-Agent 初始化完成, provider=${AI_PROVIDER}, model=${model?.id}`);
    }
}

// ============ 工具定义（pi-mono AgentTool 格式）============

// say 工具 — 收集到的动作存在这个闭包变量中
function createTools(actions: NpcAiAction[]): AgentTool<any>[] {
    const sayTool: AgentTool<any> = {
        name: 'say',
        description: '让 NPC 说话（头顶气泡文字）。保持简短自然，不超过 80 个字。必须使用中文。',
        label: 'NPC 说话',
        parameters: Type.Object({
            text: Type.String({ description: '要说的话（中文）' })
        }),
        execute: async (_id, params) => {
            actions.push({ type: 'say', text: String(params.text).slice(0, 80) });
            return { content: [{ type: 'text', text: `已说: ${params.text}` }], details: {} };
        }
    };

    const facePlayerTool: AgentTool<any> = {
        name: 'face_player',
        description: '转向面对指定玩家。',
        label: '面向玩家',
        parameters: Type.Object({
            playerName: Type.String({ description: '玩家名称' })
        }),
        execute: async (_id, params) => {
            actions.push({ type: 'face_player', playerName: String(params.playerName) });
            return { content: [{ type: 'text', text: `已面向: ${params.playerName}` }], details: {} };
        }
    };

    const endConversationTool: AgentTool<any> = {
        name: 'end_conversation',
        description: '结束与玩家的对话。当对话自然结束或玩家告别时使用。',
        label: '结束对话',
        parameters: Type.Object({}),
        execute: async () => {
            actions.push({ type: 'end_conversation' });
            return { content: [{ type: 'text', text: '对话已结束' }], details: {} };
        }
    };

    return [sayTool, facePlayerTool, endConversationTool];
}

// ============ 速率限制 ============

function checkRateLimit(playerName: string): boolean {
    const now = Date.now();

    if (now > globalRateResetAt) {
        globalRateCount = 0;
        globalRateResetAt = now + 60_000;
    }
    if (globalRateCount >= RATE_LIMIT_GLOBAL) return false;

    let playerRate = playerRateLimit.get(playerName);
    if (!playerRate || now > playerRate.resetAt) {
        playerRate = { count: 0, resetAt: now + 60_000 };
        playerRateLimit.set(playerName, playerRate);
    }
    if (playerRate.count >= RATE_LIMIT_PER_PLAYER) return false;

    globalRateCount++;
    playerRate.count++;
    return true;
}

// ============ 请求处理 ============

function getAgentKey(npcUid: number, playerName: string): string {
    return `${npcUid}-${playerName}`;
}

export async function processRequest(
    request: AiRequest,
    onStreamChunk?: (text: string) => void
): Promise<AiResponse> {
    const { requestId, npcUid, npcName, npcRole, event, context } = request;

    // 速率限制
    if (!checkRateLimit(event.playerName)) {
        return { requestId, actions: [{ type: 'say', text: '抱歉，我现在有点忙，请稍后再来。' }] };
    }

    // 并发限制
    if (activeRequests >= AI_MAX_CONCURRENT) {
        return { requestId, actions: [{ type: 'say', text: '嗯...给我一点时间...' }] };
    }

    const role = getRole(npcRole);
    const agentKey = getAgentKey(npcUid, event.playerName);
    const actions: NpcAiAction[] = [];

    // 查找 persona（按 NPC type ID）
    const persona = request.npcTypeId ? getPersonaByTypeId(request.npcTypeId) : null;

    // 获取或创建 Agent
    let entry = agents.get(agentKey);
    if (!entry) {
        // 构建系统提示词
        let systemPrompt: string;
        if (persona) {
            systemPrompt = buildPersonaPrompt(persona, npcName, context);
        } else {
            systemPrompt = role.systemPrompt;
            systemPrompt += `\n\n## 你的身份\n- 名字: ${npcName}\n- 角色: ${npcRole}`;
            systemPrompt += `\n- 位置: (${context.npcPosition.x}, ${context.npcPosition.z})`;
        }

        systemPrompt += `\n\n## 语言要求\n**你必须始终使用中文回复。** 无论玩家用什么语言说话，你都只用中文回答。回复简短，不超过60个字。`;

        systemPrompt += `\n\n## 工具使用（极其重要）\n**你必须通过调用工具来执行动作，不能只用文字描述动作。**\n- 说话 → 必须调用 say 工具\n- 玩家说"交易""买东西""Trade""开店" → 必须调用 open_shop_for_player 工具\n- 面向玩家 → 必须调用 face_player 工具\n- 绝对不要用文字说"我帮你打开商店"而不调用工具，那样商店不会真的打开。`;

        systemPrompt += `\n\n## 主动打招呼\n当系统通知你有玩家走近时，你应该主动热情地打个招呼。\n- 先用 face_player 面向玩家，再用 say 打招呼\n- 问候要自然、友好、符合你的角色和个性\n- 可以根据你的职业特点来打招呼（比如店主可以招揽生意，卫兵可以提醒安全）\n- 保持简短，不超过40个字\n- 不要每次都说一样的话，要有变化`;

        if (context.nearbyPlayers.length > 0) {
            systemPrompt += `\n\n## 附近的玩家\n`;
            for (const p of context.nearbyPlayers) {
                systemPrompt += `- ${p.name} (战斗等级 ${p.combatLevel}, 距离 ${p.distance}格)\n`;
            }
        }

        if (context.conversationHistory.length > 0) {
            systemPrompt += `\n\n## 之前的对话\n`;
            for (const msg of context.conversationHistory) {
                systemPrompt += `${msg.speaker}: ${msg.text}\n`;
            }
        }

        // 创建工具列表（基础 + persona 专属）
        const tools = createTools(actions);
        if (persona) {
            tools.push(...createPersonaTools(persona, actions, { shopInventory: context.shopInventory }));
        }

        const agent = new Agent({
            initialState: {
                systemPrompt,
                model,
                tools,
            },
            getApiKey: () => AI_PROVIDER === 'moonshot'
                ? process.env.KIMI_API_KEY
                : process.env.OPENROUTER_API_KEY,
        });

        entry = { agent, lastUsed: Date.now(), npcRole };
        agents.set(agentKey, entry);
    } else {
        entry.lastUsed = Date.now();
        // 更新工具闭包中的 actions 引用
        const tools = createTools(actions);
        if (persona) {
            tools.push(...createPersonaTools(persona, actions, { shopInventory: context.shopInventory }));
        }
        entry.agent.setTools(tools);
    }

    activeRequests++;
    let unsubscribe: (() => void) | null = null;
    try {
        let userMsg: string;
        if (event.type === 'player_nearby') {
            userMsg = `一个叫 ${event.playerName} 的玩家走到了你附近（距离${event.playerDistance}格，战斗等级${event.playerCombatLevel}）。你注意到了他/她，主动打个招呼吧！`;
        } else {
            userMsg = `玩家 ${event.playerName} 说: "${event.playerMessage}"`;
        }

        // 流式监听：在 prompt 之前订阅，累积文本并回调
        if (onStreamChunk) {
            let accumulatedText = '';
            unsubscribe = entry.agent.subscribe((e) => {
                if (e.type === 'message_update' && e.assistantMessageEvent.type === 'text_delta') {
                    accumulatedText += e.assistantMessageEvent.delta;
                    onStreamChunk(accumulatedText);
                }
            });
        }

        await Promise.race([
            (async () => {
                await entry!.agent.prompt(userMsg);
                await entry!.agent.waitForIdle();
            })(),
            new Promise<void>((_, reject) =>
                setTimeout(() => reject(new Error('AI 请求超时')), AI_REQUEST_TIMEOUT_MS)
            )
        ]);

        // 如果 Agent 没有调用 say 工具，检查最后一条 assistant 消息的文本内容
        if (!actions.some(a => a.type === 'say')) {
            const msgs = entry.agent.state.messages;
            const last = msgs[msgs.length - 1];
            console.log(`[AI Debug] 无 say action, 消息数=${msgs.length}, last.role=${last?.role}, last.content type=${typeof last?.content}, content=${JSON.stringify(last?.content).slice(0, 200)}`);
            if (last && last.role === 'assistant') {
                // 兼容 OpenAI 格式：content 可能是字符串或对象数组
                let text = '';
                if (typeof last.content === 'string') {
                    text = last.content.trim();
                } else if (Array.isArray(last.content)) {
                    const textParts = last.content.filter((c: any) => c.type === 'text');
                    text = textParts.map((c: any) => c.text).join('').trim();
                }
                if (text) {
                    let cleaned = text.trim();
                    if (cleaned.length > 120) cleaned = cleaned.slice(0, 117) + '...';
                    actions.push({ type: 'say', text: cleaned });
                }
            }
        }
    } catch (err: any) {
        console.error(`[AI] 请求失败 (${npcName}):`, err.message);
        // 超时时 abort agent
        entry.agent.abort();
        actions.push({ type: 'say', text: '嗯...我想想...' });
    } finally {
        // 取消流式订阅
        if (unsubscribe) unsubscribe();
        activeRequests--;
    }

    if (actions.length === 0) {
        actions.push({ type: 'say', text: '...' });
    }

    // 后处理：为 open_shop_for_player / sell_item 填充 playerName
    for (const action of actions) {
        if (action.type === 'open_shop_for_player' && !action.playerName) {
            action.playerName = event.playerName;
        }
        if (action.type === 'sell_item' && !action.playerName) {
            action.playerName = event.playerName;
        }
    }

    // 关键词回退：如果玩家请求交易但模型没有调用 open_shop_for_player 工具，自动补上
    // 仅对 player_chat 事件生效
    const hasShopAction = actions.some(a => a.type === 'open_shop_for_player');
    if (!hasShopAction && npcRole === 'shopkeeper' && event.type === 'player_chat') {
        const playerMsg = event.playerMessage.toLowerCase();
        const sayTexts = actions.filter(a => a.type === 'say').map(a => (a as any).text || '').join(' ');
        const tradeKeywords = /交易|买东西|trade|看看商品|打开商店|开店|购买|browse|shop/i;
        if (tradeKeywords.test(playerMsg) || tradeKeywords.test(sayTexts)) {
            console.log(`[AI] 关键词回退: 检测到交易意图，自动添加 open_shop_for_player`);
            actions.push({ type: 'open_shop_for_player', playerName: event.playerName });
        }
    }

    return { requestId, actions };
}

// 定期清理过期的 Agent（5分钟无活动）
const AGENT_TIMEOUT_MS = 5 * 60 * 1000;

export function cleanupAgents() {
    const now = Date.now();
    for (const [key, entry] of agents) {
        if (now - entry.lastUsed > AGENT_TIMEOUT_MS) {
            agents.delete(key);
        }
    }
}

export function getStats() {
    return {
        activeRequests,
        agents: agents.size,
        globalRateCount,
    };
}

// ============ Persona Prompt 构建 ============

function buildPersonaPrompt(
    persona: PersonaConfig,
    npcName: string,
    context: { npcPosition: { x: number; z: number }; shopInventory?: Array<{ itemName: string; stock: number; price: number }> }
): string {
    const { identity, soul, skills } = persona;

    let prompt = `你是一个中世纪奇幻世界（Gielinor 大陆）中的NPC。\n`;

    // 身份
    prompt += `\n## 你的身份\n`;
    prompt += `- 名字: ${identity.displayName || npcName}\n`;
    prompt += `- 职业: ${identity.occupation}\n`;
    prompt += `- 所在地: ${identity.location}\n`;
    prompt += `- 背景: ${identity.bio}\n`;
    prompt += `- 坐标: (${context.npcPosition.x}, ${context.npcPosition.z})\n`;

    // 灵魂/性格
    prompt += `\n## 性格与说话风格\n`;
    prompt += `- 性格特征: ${soul.traits.join('、')}\n`;
    prompt += `- 说话风格: ${soul.speechStyle}\n`;
    if (soul.quirks.length > 0) {
        prompt += `- 小癖好:\n`;
        for (const quirk of soul.quirks) {
            prompt += `  - ${quirk}\n`;
        }
    }

    // 知识/技能
    if (skills.length > 0) {
        prompt += `\n## 你的专业知识\n`;
        for (const skill of skills) {
            prompt += `### ${skill.name}\n${skill.knowledge}\n\n`;
        }
    }

    // 商店库存
    if (context.shopInventory && context.shopInventory.length > 0) {
        prompt += `\n## 你的商店库存\n`;
        prompt += `| 商品 | 库存 | 价格(金币) |\n|------|------|------------|\n`;
        for (const item of context.shopInventory) {
            prompt += `| ${item.itemName} | ${item.stock} | ${item.price} |\n`;
        }
        prompt += `\n当玩家说"看看商品""交易""逛逛"等模糊请求时，使用 open_shop_for_player 工具打开商店界面。\n`;
        prompt += `当玩家明确说要买某个具体商品（如"买一张地图""给我一个桶"）时，使用 sell_item 工具直接出售，会弹出确认提示让玩家确认。\n`;
        prompt += `你也可以用 recommend_item 工具主动推荐商品。\n`;
    }

    // 行为边界
    prompt += `\n## 行为规则\n`;
    prompt += `1. 用 say 工具回复玩家，保持简短（不超过60字）\n`;
    prompt += `2. 始终面向与你交谈的玩家（用 face_player）\n`;
    prompt += `3. 如果玩家告别，用 say 说再见然后 end_conversation\n`;
    if (soul.boundaries.length > 0) {
        for (const boundary of soul.boundaries) {
            prompt += `4. ${boundary}\n`;
        }
    }

    return prompt;
}
