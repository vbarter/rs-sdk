// AI NPC 模块入口
export { initAiBridge, isAiBridgeConnected, getController, removeController, sendAiRequest, sendAiGreetRequest, shutdownAiBridge } from './AiBridge.js';
export { isAiEnabled, setAiEnabled, getAiRole, isAiNpc, inferRole, registerAiNpc } from './AiNpcRegistry.js';
export { executeAiAction, executeTradeConfirmation, executeTradeCancellation, broadcastToChatPanel } from './AiActionExecutor.js';
export { default as NpcAiController, GREET_SCAN_RANGE, GREET_PROBABILITY } from './NpcAiController.js';
export type { PendingTrade } from './NpcAiController.js';
export { clearGreetClaims, tryClaimGreet } from './AiGreetCoordinator.js';
