# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Install dependencies (Bun workspace - includes mcp/)
bun install

# Create a new bot
bun scripts/create-bot.ts {username}           # remote server
bun scripts/create-bot.ts {username} --local    # local server

# Check bot world state
bun sdk/cli.ts {username}

# Run a bot script
bun bots/{username}/script.ts

# Regenerate API docs from source
bun scripts/generate-api-docs.ts

# Run test scripts (these are integration tests against a running server)
bun sdk/test/{test-name}.ts

# Local server development
cd server/engine && bun run dev         # Engine with hot-reload
cd server/webclient && bun run build    # Build web client
cd server/gateway && bun run gateway    # Gateway relay service

# Engine linting
cd server/engine && bun run lint
```

## Architecture

### Two-Layer SDK Design

The SDK has two distinct layers in `sdk/`:

- **BotSDK** (`sdk/index.ts`) — Plumbing layer. Low-level protocol mapping where actions resolve when the game **acknowledges** them. Manages WebSocket connections, state tracking, pathfinding. Methods prefixed with `send*` (e.g. `sendWalk`, `sendInteractNpc`).

- **BotActions** (`sdk/actions.ts`) — Porcelain layer. High-level domain-aware API where actions resolve when the **effect completes** (e.g. `chopTree()` waits until logs appear in inventory, `walkTo()` waits until arrival). All "smart" multi-step behavior lives here.

Supporting files: `sdk/types.ts` (type definitions), `sdk/runner.ts` (script execution framework), `sdk/pathfinding.ts` (local collision-based pathfinding using rsmod), `sdk/actions-helpers.ts` (shared helper functions), `sdk/formatter.ts` (human-readable state output), `sdk/cli.ts` (CLI state checker).

### Connection Flow

```
Script (BotActions/BotSDK) → WebSocket → Gateway (server/gateway/) → Browser Bot Client → Game Server
```

The SDK cannot talk directly to the game server; it communicates through a browser-based bot client via the gateway relay. The gateway URL is derived from the `SERVER` env var:
- Empty → `ws://localhost:7780`
- `localhost` → plain WebSocket
- Hostname → `wss://hostname/gateway` (TLS)

### Script Runner (`sdk/runner.ts`)

All bot scripts use `runScript()` which handles connection management, credential loading (from sibling `bot.env`), log capture, timeouts, and formatted state output after execution. Returns `RunResult` with `success`, `result`, `duration`, `logs`, `finalState`.

### MCP Server (`mcp/`)

Separate workspace (`package.json` workspaces: `["mcp"]`). Auto-discovered via `.mcp.json`. Provides `execute_code`, `list_bots`, `disconnect_bot` tools for interactive bot control from Claude Code.

## Key Patterns

- **Entity types matter**: Fishing spots are **NPCs** (`nearbyNpcs`), not locations. Trees/doors/anvils are **locations** (`nearbyLocs`).
- **Regex precision**: Use `/^tree$/i` not `/tree/i` (avoids matching "tree stump").
- **Dialog dismissal**: Always call `await bot.dismissBlockingUI()` in main loops — level-up dialogs block all actions.
- **Action results**: Most `bot.*` methods return `{ success: boolean, message: string }`. Always check `success`.
- **Animation state**: `player.animId === -1` means idle.
- **Pathfinding**: `bot.walkTo()` auto-opens doors along the path. Watch for "I can't reach" — often means a closed gate.
- **Inventory limit**: 28 slots. For gathering loops, drop items when near full.
- **Game messages persist** in buffer — filter by tick when checking recent messages.

## Project Layout

- `sdk/` — Core SDK library (no external dependencies beyond bundled rsmod pathfinder)
- `sdk/test/` — Integration test scripts (run against a live server, not unit tests)
- `mcp/` — MCP server for Claude Code interactive control (separate workspace)
- `scripts/` — Example automation scripts organized by skill (each in its own directory with `script.ts` + `lab_log.md`)
- `bots/` — Per-user bot directories (created by `create-bot.ts`, contains `bot.env`, scripts)
- `learnings/` — Game mechanics documentation (banking, combat, fishing, etc.)
- `server/engine/` — Game server (Kotlin/JS, LostCity fork)
- `server/webclient/` — Browser game client (TypeScript)
- `server/gateway/` — WebSocket relay between SDK and bot client
- `benchmark/` — Harbor-based benchmark tasks for evaluation

## TypeScript Config

Bun runtime, ESNext target, strict mode, bundler module resolution. The SDK and scripts are included; `server/engine` and `server/webclient` are excluded from the root tsconfig.

---

# RS-Agent Bot Guide

You're here to play the mmo game through the progressive development of botting scripts, starting small then adapting to your desires and ideas.

## First Time Setup

**Create a new bot using the setup script:**

Ask the user for a bot name (max 12 chars, alphanumeric). If they skip, use the command without a username to auto-generate a random 9-character name.

```bash
# With custom username
bun scripts/create-bot.ts {username}

# Auto-generate random username
bun scripts/create-bot.ts

# Use local server (sets SERVER=localhost in bot.env)
bun scripts/create-bot.ts {username} --local

# Use a custom server
bun scripts/create-bot.ts {username} --server=myserver.example.com
```

This automatically creates:
- `bots/{username}/bot.env` - Credentials with auto-generated password
- `bots/{username}/lab_log.md` - Session notes template
- `bots/{username}/script.ts` - Ready-to-run starter script

## MCP Integration (Interactive Mode)

The MCP server auto-discovers via `.mcp.json` when you open the project in Claude Code.

### Quick Start

1. Install dependencies: `bun install` (from project root)
2. Open project in Claude Code — approve the MCP server when prompted
3. Control your bot with suggestions.

### Tools

| Tool | Description |
|------|-------------|
| `execute_code(bot_name, code)` | Run code on a bot. Auto-connects on first use. |
| `list_bots()` | List connected bots |
| `disconnect_bot(name)` | Disconnect a bot |

### Example

```typescript
// Just execute - auto-connects on first use
execute_code({
  bot_name: "mybot",
  code: `
    const state = sdk.getState();
    console.log('Position:', state.player.worldX, state.player.worldZ);

    // Chop trees for 1 minute
    const endTime = Date.now() + 60_000;
    while (Date.now() < endTime) {
      await bot.dismissBlockingUI();
      const tree = sdk.findNearbyLoc(/^tree$/i);
      if (tree) await bot.chopTree(tree);
    }

    return sdk.getInventory();
  `
})
```


**When to use MCP vs Scripts:**
- **MCP**: One-off fixes, probing, experimenting, quick state checks
- **Scripts**: Anything running in a loop, long-running automation, reproducible tasks, version control

See `mcp/README.md` for detailed API reference.

## Script Runner API

Scripts should leverage `runScript` to manage their connections, initialization, and timeouts.
Make new scripts for different skills, for instance fishing.ts, woodcutting.ts, combat.ts, etc.
You may also wish to import or re-use code between them.

**Run scripts:**
```bash
bun bots/{username}/script.ts
```

The runner automatically finds `bot.env` in the same directory as the script. Alternative methods:
- `bun script.ts {botname}` - loads `bots/{botname}/bot.env`
- `bun --env-file=bots/{name}/bot.env script.ts` - explicit env file

```typescript
// bots/mybot/woodcutter.ts
import { runScript } from '../../sdk/runner';

const result = await runScript(async (ctx) => {
  const { bot, sdk, log } = ctx;

  const endTime = Date.now() + 5 * 60_000; // 5 minutes
  let logsChopped = 0;

  while (Date.now() < endTime) {
    await bot.dismissBlockingUI();

    const tree = sdk.findNearbyLoc(/^tree$/i);
    if (tree) {
      const r = await bot.chopTree(tree);
      if (r.success) logsChopped++;
    }
  }

  log(`Chopped ${logsChopped} logs`);
  return { logsChopped };
}, {
  timeout: 6 * 60_000,  // Overall timeout
});

console.log(`Success: ${result.success}`);
```

### ScriptContext

Scripts receive a context object with:

| Property | Description |
|----------|-------------|
| `bot` | BotActions instance (high-level actions) |
| `sdk` | BotSDK instance (low-level SDK) |
| `log` | Captured logging (like console.log) |
| `warn` | Captured warnings |
| `error` | Captured errors |

### RunOptions

| Option | Default | Description |
|--------|---------|-------------|
| `timeout` | none | Overall timeout in ms |
| `autoConnect` | true | Connect if not connected |
| `disconnectAfter` | false | Disconnect when done |

### RunResult

```typescript
interface RunResult {
  success: boolean;
  result?: any;           // Return value from script
  error?: Error;          // If failed
  duration: number;       // Total ms
  logs: LogEntry[];       // Captured logs
  finalState: BotWorldState;
}
```

The runner automatically prints formatted world state after execution 

## Session Workflow

This is a **persistent character** - you don't restart fresh each time. The workflow is:

### 1. Check World State First

Before writing any script, check where the bot is and what it has:

```bash
bun sdk/cli.ts {username}
```

This shows: position, inventory, skills, nearby NPCs/objects, and more.

**Exception**: Skip this if you just created the character and know it's at spawn.

**Tutorial Check**: If the character is in the tutorial area, call `await bot.sendSkipTutorial()` before running any other scripts. The tutorial blocks normal gameplay.

### 2. Write Your Script

Edit `bots/{username}/script_name.ts` with your goal. Keep scripts focused on one task. you may write multiple scripts for different tasks and switch between them.

### 3. Run the Script

```bash
bun bots/{username}/script_name.ts
```

### 4. Observe and Iterate

Watch the output. After the script finishes (or fails), check state again:

```bash
bun sdk/cli.ts {username}
```

Record observations in `lab_log.md`, then improve the script.

## Script Duration Guidelines

**Start short, extend as you gain confidence:**

| Duration | Use When |
|----------|----------|
| **10-30s** | New script, single actions, untested logic, debugging |
| **2-5 min** | Validated approach, building confidence |
| **10+ min** | Proven strategy, grinding runs |

A failed 5-minute run wastes more time than five 30 second diagnostic runs. **Fail fast and start simple.**

Be extremely cognizant of pathing issues. It's very common to have issues because of closed doors and gates.
Look out for "I can't reach" messages - the solution is often to open closed gates. 

Read and grep in the learnings folder for tips.

## SDK API Reference

For the complete method reference, see **[sdk/API.md](sdk/API.md)** (auto-generated from source).

**Quick overview:**
- `bot.*` - High-level actions that wait for effects to complete (chopTree, walkTo, attackNpc, etc.)
- `sdk.*` - Low-level methods that resolve on server acknowledgment (sendWalk, getState, findNearbyNpc, etc.)

### bot.* Quick Reference

| Method | What it does |
|--------|-------------|
| `walkTo(x, z, tolerance?)` | Pathfind to coords, opens doors along the way |
| `talkTo(target)` | Walk to NPC, start dialog |
| `interactNpc(target, option?)` | Walk to NPC, interact with any option (e.g. `'trade'`, `'fish'`) |
| `interactLoc(target, option?)` | Walk to loc, interact with any option (e.g. `'mine'`, `'smelt'`) |
| `attackNpc(target)` | Walk to NPC, start combat |
| `pickpocketNpc(target)` | Pickpocket NPC, detects XP gain vs stun |
| `castSpellOnNpc(target, spell)` | Cast combat spell on NPC |
| `chopTree(target?)` | Chop tree, wait for logs |
| `pickupItem(target)` | Pick up ground item |
| `openDoor(target?)` | Open a door or gate |
| `openBank()` | Open nearest bank |
| `depositItem(target, amount?)` | Deposit item to bank |
| `withdrawItem(slot, amount?)` | Withdraw item from bank |
| `openShop(target?)` | Open shop via shopkeeper NPC |
| `buyFromShop(target, amount?)` | Buy item from open shop |
| `sellToShop(target, amount?)` | Sell item to open shop |
| `equipItem(target)` | Equip from inventory |
| `unequipItem(target)` | Unequip to inventory |
| `eatFood(target)` | Eat food, returns HP gained |
| `useItemOnLoc(item, loc)` | Use inventory item on loc (e.g. fish on range) |
| `useItemOnNpc(item, npc)` | Use inventory item on NPC |
| `burnLogs(target?)` | Light logs with tinderbox |
| `fletchLogs(product?)` | Fletch logs with knife |
| `craftLeather(product?)` | Craft leather with needle |
| `smithAtAnvil(product)` | Smith bars at anvil |
| `dismissBlockingUI()` | Dismiss level-up dialogs (call in every loop) |
| `navigateDialog(choices)` | Auto-click through dialog options |
| `skipTutorial()` | Skip the tutorial island |

### sdk.* Commonly Used Directly

| Method | What it does |
|--------|-------------|
| `getState()` | Full world state snapshot |
| `getSkill(name)` / `getSkillXp(name)` | Skill info |
| `getInventory()` / `findInventoryItem(pattern)` | Inventory queries |
| `findNearbyNpc(pattern)` / `findNearbyLoc(pattern)` | Find nearby entities |
| `findGroundItem(pattern)` | Find ground items |
| `getDialog()` | Current dialog state |
| `sendClickDialog(option)` | Click dialog option |
| `sendClickComponent(id)` | Click interface button |
| `sendDropItem(slot)` | Drop inventory item |
| `sendUseItem(slot)` | Use inventory item (bury, etc.) |
| `sendUseItemOnItem(src, dst)` | Combine two items |
| `sendSay(message)` | Send chat message |
| `waitForCondition(pred)` | Wait for state predicate |
| `waitForTicks(n)` | Wait n game ticks |
| `scanNearbyLocs(radius?)` | Extended-range loc scan |

---

### Dismiss Level-Up Dialogs

```typescript
// In your main loop - always call this because level ups are blocking.
await bot.dismissBlockingUI();

// Or manually check
if (sdk.getState()?.dialog.isOpen) {
    await sdk.sendClickDialog(0);
}
```

### Error Handling

```typescript
const result = await bot.chopTree();
if (!result.success) {
    console.log(`Failed: ${result.message}`);
    // Handle failure - maybe walk somewhere else
}
```

## Project Structure

```

bots/
└── {username}/
    ├── bot.env        # Credentials (BOT_USERNAME, PASSWORD, SERVER)
    ├── lab_log.md     # Session notes and observations
    └── script.ts      # Current script

sdk/
├── index.ts           # BotSDK (low-level)
├── actions.ts         # BotActions (high-level)
├── cli.ts             # CLI for checking state
└── types.ts           # Type definitions

learnings/
├── banking.md
├── combat.md
├── shops.md
├── fletching.md
└── ...etc

```

## Troubleshooting

**"No state received"** - Bot isn't connected to game. Open browser first or use `autoLaunchBrowser: true`.

**Script stalls** - Check for open dialogs (`state.dialog.isOpen`). Level-ups block everything.

**"Can't reach"** - Path is blocked. Try walking closer first, or find a different target.

**Wrong target** - Use more specific regex patterns: `/^tree$/i` not `/tree/i` (which matches "tree stump").
