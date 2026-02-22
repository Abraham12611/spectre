# Spectre — Video Demo Script

> **Format**: 3-minute screen-recorded demo with voiceover
> **Audience**: Hackathon judges evaluating MagicBlock Ephemeral Rollup usage
> **Structure**: WHY (20%) → HOW (30%) → WHAT (50%) — from Simon Sinek / tips.md
> **Tone**: Confident, technical but accessible. No filler.

---

## 0:00 – 0:35 | THE HOOK (WHY — "The MEV Problem")

**(Visual: Show the Spectre landing page at localhost:3000)**

"There are over $900 million worth of AI agents on Solana today.

And every single one of them has the same fatal flaw.

Every trade they make, every swap, every DeFi position — it all goes through the public mempool. Which means MEV bots can see it BEFORE it executes.

Think about that. You build a genius trading AI — it analyzes the market, finds the perfect entry — and the moment it submits that transaction… a bot front-runs it. Your AI is literally an ATM for MEV extractors.

An AI agent that publicly telegraphs its moves is a dead agent.

That's why we built Spectre."

---

## 0:35 – 1:20 | THE SOLUTION (HOW — "The Privacy Layer")

**(Visual: Scroll down to feature cards on landing page)**

"Spectre is a privacy layer for AI agent execution on Solana — built on the MagicBlock Ephemeral Rollups.

Here's how it works in 15 seconds:

**(Visual: Click 'Dashboard' link)**

Instead of your AI agent sending transactions to Solana L1 — where everyone can see them — the agent's state is DELEGATED into an Ephemeral Rollup.

Inside the ER: actions are gasless. They're invisible to L1. MEV bots cannot see them.

When the agent is done, the state commits back to L1 atomically. The blockchain gets the RESULT — but nobody saw HOW it got there.

Think of it like a VPN for your AI agent's transactions. Outsiders see the data went somewhere and came back. They have no idea what happened inside.

Let me prove it live."

---

## 1:20 – 2:40 | THE DEMO (WHAT — "Live ER Lifecycle")

**(Visual: Click 'Live Demo' → Show the demo page)**

"Here is our Live Demo page. I'm connected to Phantom on Solana Devnet.

**(Action: Click 'Run Live Demo' button)**

Watch the left panel — these are the 5 steps of the full Ephemeral Rollup lifecycle running in real-time.

**(Visual: Step 1 completes)**
Step 1 — Initialize Agent. We just created an on-chain PDA that holds the agent's state. Owner, action count, action hash — all on L1.

**(Visual: Step 2 completes)**
Step 2 — Delegate. The PDA just transferred to MagicBlock's Ephemeral Rollup. If you check Solscan right now, the account owner changed from our program to the Delegation Program. That's the PROOF it's in the ER.

**(Visual: Step 3 completes — highlight the latency)**
Step 3 — Record Action. THIS is the magic. Look at the latency — that was done in milliseconds. Zero gas fees. And this transaction does NOT appear on L1 — it only exists inside the Ephemeral Rollup. An MEV bot watching Solana would see absolutely nothing.

**(Visual: Step 4 completes)**
Step 4 — Commit and Undelegate. The state settles back to L1. Action count is now incremented, the hash is committed.

**(Visual: Step 5 completes — all green checkmarks)**
Step 5 — Verify. We read the state back from L1. The action count went from 0 to 1. The hash is committed. But the action itself? Private. Nobody observed it on L1.

**(Visual: Click a Solscan link from the log)**
And here it is on Solscan — verifiable. The delegation happened. The state came back. But the record_action transaction is nowhere in the L1 history. That IS the privacy proof."

---

## 2:40 – 3:00 | THE CLOSE (Vision)

**(Visual: Go back to landing page)**

"Spectre works with ANY AI agent framework — ElizaOS, Solana Agent Kit, custom bots. The agent just points to the MagicBlock RPC instead of L1, and calls our program. That's it.

We built the on-chain program. We proved the full lifecycle on Devnet. We built the dashboard judges can run themselves.

Gasless execution. Private actions. Verifiable results.

Spectre — MEV-proof AI agents on Solana.

Thank you."

---

## Recording Notes

| Section | Duration | What to Show |
|---|---|---|
| Hook | 0:00–0:35 | Landing page |
| Solution | 0:35–1:20 | Dashboard page |
| Demo | 1:20–2:40 | Live Demo page (Run Live Demo button) |
| Close | 2:40–3:00 | Landing page |

### Key Moments to Emphasize
- **Step 3 latency**: Read the actual millisecond number out loud ("That was 47 milliseconds")
- **Solscan link**: Click it and show the real explorer — proves it's live, not fake
- **"Zero gas fees"**: Say this explicitly during Step 3
- **"Not in L1 history"**: This is your killer proof — the transaction doesn't appear on chain
