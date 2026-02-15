// AI NPC 模块入口
export { initAiBridge, isAiBridgeConnected, getController, removeController, sendAiRequest, shutdownAiBridge } from './AiBridge.js';
export { isAiEnabled, setAiEnabled, getAiRole, isAiNpc, inferRole, registerAiNpc } from './AiNpcRegistry.js';
export { executeAiAction } from './AiActionExecutor.js';
export { default as NpcAiController } from './NpcAiController.js';
