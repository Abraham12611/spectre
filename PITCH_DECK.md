# Spectre — Pitch Deck (Slide Content)

> For MagicBlock Solana Speedrun Hackathon Submission
> Each section = one slide in your deck / one shot in your video

---

## SLIDE 1: Title

**SPECTRE**
*MEV-Proof AI Agent Execution on Solana*

Built on MagicBlock Ephemeral Rollups
Solana Devnet · Live Demo

---

## SLIDE 2: The Problem — Transparent Agents

> AI agents on Solana are PUBLIC ATMs for MEV bots

- Every AI trade goes through the public mempool
- MEV bots front-run before execution
- Strategies are copied by observing patterns
- $900M+ in AI agent TVL is exploitable

**An AI that telegraphs its moves is a dead agent.**

---

## SLIDE 3: The Analogy — Before HTTPS

```
HTTP  (1995): Credit cards sent in plain text → fraud
HTTPS (1998): Encrypted tunnel → e-commerce explodes

Solana L1 (Now) : Agent trades in public mempool → MEV
Spectre   (Now) : Private execution in ER → MEV-proof
```

Spectre is **HTTPS for AI agent transactions.**

---

## SLIDE 4: The Solution — How Spectre Works

```
┌──────────┐    delegate     ┌─────────────────┐    commit     ┌──────────┐
│ Agent    │ ──────────────► │ Ephemeral       │ ────────────► │ Solana   │
│ PDA      │                 │ Rollup          │               │ L1       │
│ (L1)     │                 │ (MagicBlock)    │               │          │
│          │                 │                 │               │ Result   │
│ state    │    ownership    │ ⚡ gasless      │    state      │ verified │
│ init     │    transfers    │ 🔒 private      │    returns    │ on-chain │
│          │                 │ ⏱️ ~10ms        │               │          │
└──────────┘                 └─────────────────┘               └──────────┘
```

1. **Initialize** agent state on L1
2. **Delegate** PDA to Ephemeral Rollup
3. **Execute** actions privately (gasless, invisible)
4. **Commit** results back to L1

---

## SLIDE 5: What Makes ER Special

| Property | Solana L1 | Ephemeral Rollup |
|---|---|---|
| Visibility | Public mempool | Private |
| Gas cost | ~0.00005 SOL/tx | **FREE** |
| Latency | ~400ms | **~10ms** |
| MEV risk | High | **None** |
| State integrity | ✅ | ✅ (commits to L1) |

---

## SLIDE 6: Live Proof — 5/5 Tests Passing

```
✔ Step 1: Initialize Agent on L1       — 1047ms
✔ Step 2: Delegate to Ephemeral Rollup — 6393ms
✔ Step 3: Record Action on ER (gasless) — 47ms   ← GASLESS + PRIVATE
✔ Step 4: Commit & Undelegate to L1    — 12451ms
✔ Step 5: Verify State on L1           — 623ms
═══════════════════════════════════════════════════
5 passing
```

**Solscan Verification:**
- PDA owner changes `3xAmg...` → `DELeG...` → `3xAmg...`
- `record_action` tx NOT in L1 history = **privacy proof**

---

## SLIDE 7: Framework Agnostic

```
Any AI agent → Spectre → Private Execution
```

- **ElizaOS** agents
- **Solana Agent Kit** agents
- **Custom** Python/JS/Rust bots
- **OpenAI** function-calling agents

Integration = 2 changes:
1. Point to MagicBlock RPC
2. Call `spectre.recordAction(hash)`

---

## SLIDE 8: Tech Stack

| Layer | Technology |
|---|---|
| Smart Contract | Anchor 0.32.1 + `ephemeral-rollups-sdk` |
| Runtime | MagicBlock Ephemeral Rollups (Devnet) |
| Frontend | Next.js 16 + Solana Wallet Adapter |
| Network | Solana Devnet |
| Program ID | `3xAmgLtbu1SZdDrp85vXiW1JMF9iMcys1DsQMhWQg3gb` |

---

## SLIDE 9: The Close

> **Gasless execution. Private actions. Verifiable results.**

Spectre — MEV-proof AI agents on Solana.

- ✅ Real ER usage (not simulated)
- ✅ Full lifecycle proven on Devnet
- ✅ Interactive dashboard for judges
- ✅ Framework agnostic

**Try it yourself:** `git clone` → `npm run dev` → Connect Phantom → Run Demo
