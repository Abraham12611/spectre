# 🛡️ Spectre — MEV-Proof AI Agent Execution on Solana

> **Privacy layer for autonomous AI agents using MagicBlock Ephemeral Rollups**

[![Deployed on Devnet](https://img.shields.io/badge/Solana-Devnet-blue)](https://solscan.io/account/3xAmgLtbu1SZdDrp85vXiW1JMF9iMcys1DsQMhWQg3gb?cluster=devnet)

---

## 🎯 Problem

AI agents on Solana are **publicly exploitable**. Every transaction an AI agent sends is visible in the public mempool — meaning MEV bots can:

- **Front-run** trading decisions before they execute
- **Copy** proprietary strategies by observing action patterns
- **Sandwich attack** every swap the agent makes

> An AI agent that publicly telegraphs its moves is an ATM for MEV bots.

## 💡 Solution

**Spectre shields AI agent actions inside MagicBlock Ephemeral Rollups.**

Instead of executing on Solana L1 (public), the agent's state is **delegated** to a private, off-chain execution environment where:

- ⚡ **Actions are gasless** — zero transaction fees inside the ER
- 🔒 **Actions are invisible** — not in the L1 mempool, MEV bots can't see them
- ✅ **State is verifiable** — commits back to L1 atomically with cryptographic integrity

```
WITHOUT SPECTRE:                    WITH SPECTRE:
AI → L1 Transaction → PUBLIC        AI → Ephemeral Rollup → PRIVATE
     ↓                                    ↓
MEV Bot Front-runs ❌                 Nobody sees it ✅
                                          ↓
                                     Commit to L1 (only result visible)
```

## 🏗️ Architecture

```
┌──────────────┐     ┌───────────────────────┐     ┌────────────────┐
│  AI Agent    │     │  Spectre Program      │     │  MagicBlock    │
│  (any        │────►│  (Anchor, Devnet)     │────►│  Ephemeral     │
│  framework)  │     │                       │     │  Rollup        │
│              │     │  initialize_agent()   │     │                │
│  ElizaOS     │     │  delegate_agent()     │     │  Gasless exec  │
│  SAK         │     │  record_action()      │     │  Private state │
│  Custom      │     │  commit_undelegate()  │     │  ~10ms latency │
└──────────────┘     └───────────────────────┘     └────────────────┘
```

### How It Works

1. **Initialize** — Create an Agent PDA on Solana L1 (stores owner, TEE node, action count, action hash)
2. **Delegate** — Transfer the PDA to MagicBlock's Ephemeral Rollup validator
3. **Execute** — Record actions gaslessly and privately inside the ER (invisible to L1)
4. **Commit** — Settle the final state back to L1 atomically
5. **Verify** — Anyone can verify `action_count` and `last_action_hash` on L1, but nobody saw the actions happen

### How an AI Agent Connects

Any AI agent framework connects by simply switching the RPC endpoint:

```typescript
// Normal L1 (public, exploitable)
const connection = new Connection("https://api.devnet.solana.com");

// With Spectre (private, MEV-proof)
const connection = new Connection("https://devnet.magicblock.app");
await spectreProgram.methods.recordAction(actionHash).rpc();
```

The agent uses the **same wallet keypair** it already has. No complex integration required.

## 🧪 Live Demo (Devnet)

| Item | Value |
|---|---|
| **Program ID** | [`3xAmgLtbu1SZdDrp85vXiW1JMF9iMcys1DsQMhWQg3gb`](https://solscan.io/account/3xAmgLtbu1SZdDrp85vXiW1JMF9iMcys1DsQMhWQg3gb?cluster=devnet) |
| **IDL Account** | `F7tZXMeLBXM4kqkfPKSWszcKYatKry4xAjuinMxQxxjy` |
| **ER RPC** | `https://devnet.magicblock.app` |
| **Dashboard** | `localhost:3000` (Next.js) |

### Test Results — 5/5 Passing

```
✔ Step 1: Initialize Agent on L1          — 1047ms
✔ Step 2: Delegate to Ephemeral Rollup    — 6393ms
✔ Step 3: Record Action on ER (gasless)   — 4197ms
✔ Step 4: Commit & Undelegate to L1       — 12451ms
✔ Step 5: Verify State on L1              — 623ms
═══════════════════════════════════════════════════
5 passing (25s)
```

### Verification on Solscan

1. View the Agent PDA on Solscan
2. **Before delegation**: `owner = 3xAmg...` (Spectre Program)
3. **During delegation**: `owner = DELeG...` (Delegation Program) — **proof it's in the ER**
4. **After commit**: `owner = 3xAmg...` again, `action_count` incremented — **state came back**
5. The `record_action` tx does NOT appear in L1 history — **that IS the privacy proof**

## 📂 Project Structure

```
spectre/
├── programs/spectre_program/src/lib.rs  # Anchor program (4 instructions)
├── tests/test-delegation.ts             # Full lifecycle test (5/5 passing)
├── dashboard/                           # Next.js frontend
│   ├── app/page.tsx                     # Landing page
│   ├── app/dashboard/page.tsx           # Agent management (real on-chain data)
│   ├── app/demo/page.tsx                # Live ER lifecycle demo
│   └── lib/anchor-client.ts            # Shared Anchor client + IDL
├── Anchor.toml                          # Anchor config (Devnet)
└── Cargo.toml                           # Workspace config
```

## 🛠️ Tech Stack

- **Smart Contract**: Anchor 0.32.1 + `ephemeral-rollups-sdk` 0.8.5
- **Runtime**: MagicBlock Ephemeral Rollups (Devnet)
- **Frontend**: Next.js 16, Solana Wallet Adapter, TailwindCSS
- **Network**: Solana Devnet
- **Wallet**: Phantom

## 🚀 Quick Start

```bash
# Build & deploy the program
cd spectre
export CARGO_TARGET_DIR=/tmp/spectre-target
anchor build
cp /tmp/spectre-target/deploy/spectre_program.so target/deploy/
anchor deploy --provider.cluster devnet

# Run the lifecycle test
anchor test --skip-build --skip-deploy --skip-local-validator

# Launch the dashboard
cd dashboard
npm install
npm run dev
# Open http://localhost:3000
```

## 🏆 What Makes This a Winner

1. **Real ER Usage** — Not simulated. Deployed on Devnet with verifiable transactions
2. **Full Lifecycle** — Initialize → Delegate → Execute → Commit → Verify, all on-chain
3. **Gasless Execution** — Actions inside the ER cost 0 SOL
4. **Framework Agnostic** — Any AI agent (ElizaOS, SAK, custom) can plug in
5. **Live Dashboard** — Interactive demo judges can run themselves
6. **Solscan Verifiable** — Every claim is provable on-chain

---

**Built for the MagicBlock Solana Speedrun Hackathon** 🏁
