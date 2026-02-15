// NPC AI 控制器
// 每个 AI NPC 实例的状态管理（对话锁、动作队列、移动状态）

type NpcAiAction =
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

interface ConversationEntry {
    speaker: string;
    text: string;
}

/**
 * NPC 对话状态机:
 *   idle → engaged（玩家发起对话）
 *   engaged → lingering（对话超时/结束，NPC 原地停留）
 *   lingering → returning（停留超时或玩家走远）
 *   returning → idle（NPC 走回出生点）
 */
export type AiNpcState = 'idle' | 'engaged' | 'lingering' | 'returning';

// 对话空闲超时（ticks）—— 最后一次对话后多久算结束
const CONVERSATION_IDLE_TIMEOUT = 50; // ~30 秒无对话则开始返回

// 停留超时（ticks）—— 对话结束后原地停留多久再返回
const LINGER_TIMEOUT = 50; // ~30 秒

export default class NpcAiController {
    // 对话状态
    state: AiNpcState = 'idle';

    // 对话锁
    lockedByPlayer: string | null = null;
    lockedAt: number = 0;       // 最后一次对话的 world tick
    lockTimeout: number = 50;   // 强制超时 50 ticks（兜底）

    // 目标玩家位置（NPC 走向这个位置）
    targetPlayerX: number = 0;
    targetPlayerZ: number = 0;

    // 停留开始时间（对话结束后原地停留）
    lingerStartTick: number = 0;

    // 请求状态
    pendingRequest: boolean = false;

    // 流式文本（AI 正在生成时的累积文本）
    streamingText: string | null = null;

    // 动作队列
    actionQueue: NpcAiAction[] = [];

    // 对话历史（最近10条）
    conversationHistory: ConversationEntry[] = [];

    /**
     * 尝试锁定此 NPC 与某个玩家的对话
     */
    tryLock(playerName: string, currentTick: number): boolean {
        // 已被同一玩家锁定
        if (this.lockedByPlayer === playerName) {
            this.lockedAt = currentTick;
            return true;
        }

        // 已被其他玩家锁定且未超时
        if (this.lockedByPlayer !== null) {
            if (currentTick - this.lockedAt < this.lockTimeout) {
                return false;
            }
            // 锁超时，释放（被新玩家抢占时跳过停留，直接切换）
            this.lockedByPlayer = null;
            this.lockedAt = 0;
            this.pendingRequest = false;
        }

        // 获取锁，进入 engaged 状态
        this.lockedByPlayer = playerName;
        this.lockedAt = currentTick;
        this.state = 'engaged';
        return true;
    }

    /**
     * 更新目标玩家位置（NPC 会走向这里）
     */
    setTargetPlayerPos(x: number, z: number): void {
        this.targetPlayerX = x;
        this.targetPlayerZ = z;
    }

    /**
     * 结束对话，进入停留状态（原地等待一段时间再返回）
     */
    endConversation(currentTick: number = 0): void {
        this.lockedByPlayer = null;
        this.lockedAt = 0;
        this.pendingRequest = false;
        // 不清空 actionQueue，让剩余动作执行完
        this.lingerStartTick = currentTick;
        this.state = 'lingering';
    }

    /**
     * 完成返回，恢复空闲
     */
    returnComplete(): void {
        this.state = 'idle';
        this.conversationHistory = [];
    }

    /**
     * 检查是否应因空闲超时而结束对话
     */
    shouldTimeout(currentTick: number): boolean {
        if (this.state !== 'engaged') return false;
        if (this.lockedByPlayer === null) return false;
        return currentTick - this.lockedAt >= CONVERSATION_IDLE_TIMEOUT;
    }

    /**
     * 检查是否处于对话中
     */
    isEngaged(): boolean {
        return this.state === 'engaged' && this.lockedByPlayer !== null;
    }

    /**
     * 检查是否处于停留状态（对话结束后原地等待）
     */
    isLingering(): boolean {
        return this.state === 'lingering';
    }

    /**
     * 检查停留是否超时，应该开始返回
     */
    shouldEndLinger(currentTick: number): boolean {
        if (this.state !== 'lingering') return false;
        return currentTick - this.lingerStartTick >= LINGER_TIMEOUT;
    }

    /**
     * 从停留状态进入返回状态
     */
    startReturning(): void {
        this.state = 'returning';
    }

    /**
     * 检查是否正在返回出生点
     */
    isReturning(): boolean {
        return this.state === 'returning';
    }

    /**
     * 更新流式文本（AI 正在生成时的累积文本）
     */
    updateStreamingText(text: string): void {
        this.streamingText = text;
    }

    /**
     * 清除流式文本
     */
    clearStreamingText(): void {
        this.streamingText = null;
    }

    /**
     * 将 AI 返回的动作加入队列
     */
    enqueueActions(actions: NpcAiAction[]): void {
        this.actionQueue.push(...actions);
        this.pendingRequest = false;
        // 最终响应到达，清除流式文本
        this.clearStreamingText();
    }

    /**
     * 取出队列中的下一个动作
     */
    dequeueAction(): NpcAiAction | undefined {
        return this.actionQueue.shift();
    }

    /**
     * 检查是否有待处理的动作
     */
    hasActions(): boolean {
        return this.actionQueue.length > 0;
    }

    /**
     * 添加对话历史
     */
    addToHistory(speaker: string, text: string): void {
        this.conversationHistory.push({ speaker, text });
        if (this.conversationHistory.length > 10) {
            this.conversationHistory.shift();
        }
    }

    /**
     * 获取对话历史
     */
    getHistory(): ConversationEntry[] {
        return this.conversationHistory;
    }

    /**
     * 重置控制器状态
     */
    reset(): void {
        this.state = 'idle';
        this.lockedByPlayer = null;
        this.lockedAt = 0;
        this.lingerStartTick = 0;
        this.pendingRequest = false;
        this.streamingText = null;
        this.actionQueue = [];
        this.conversationHistory = [];
    }
}
