# MagicBlock Documentation Reference & Hackathon Strategy

> **Purpose**: Quick-reference index for the entire MagicBlock docs repo (`magic-block-doc/`) and first-principles analysis of what wins the MagicBlock hackathon.

---

## Part 1 — First-Principles Hackathon Analysis

### What MagicBlock IS (the atoms)

| Primitive | What It Does | Key Benefit |
|---|---|---|
| **Ephemeral Rollup (ER)** | Temporary SVM runtime where delegated accounts execute at **10 ms block time, gasless** | Real-time, zero-fee state transitions |
| **Private Ephemeral Rollup (PER)** | ER inside Intel TDX TEE — shielded state with fine-grained access control | Confidential on-chain computation |
| **Delegation Program** | CPI that locks an account on Solana L1 and hands control to ER/PER | Bridge between L1 ↔ ER |
| **Magic Router** | RPC proxy that reads tx metadata and routes to ER or L1 automatically | Single-endpoint DX |
| **Magic Actions** | Instructions that auto-execute on L1 after an ER commit | Cross-program composability post-ER |
| **Cranks** | ER-native scheduled on-chain task execution | Automated periodic logic |
| **Oracles (Pyth Lazer)** | 50-200 ms price feeds written to ER accounts | Ultra-low-latency DeFi data |
| **VRFs (EphemeralVrf)** | Verifiable random function via oracle network inside ER | Provably fair randomness |
| **Session Keys** | Ephemeral keys with scoped permissions, no repeated wallet popups | Seamless UX |
| **BOLT** | Entity Component System framework extending Anchor for on-chain games | Modular game architecture |
| **Permission Program (ACL)** | PER access control — member flags (AUTHORITY, TX_LOGS, TX_BALANCES, etc.) | Fine-grained privacy |

### What Judges Want (first principles)

1. **Uses ER or PER meaningfully** — the hard requirement. Project must delegate accounts and execute in an ephemeral rollup.
2. **Showcases ER/PER superpower** — winning projects don't just "use" ER, they build something **impossible without it**:
   - Real-time (sub-second) interaction loops
   - Gasless UX enabling mass-scale throughput
   - Private state that solves a real problem (sealed bids, hidden hands, confidential payments)
3. **Technical depth** — integration with multiple MagicBlock primitives (e.g. ER + VRF + Cranks + Session Keys) shows mastery.
4. **Working demo** — hackathons reward live, functional prototypes over specs.
5. **Novel use case** — DeFi, gaming, social, payments, infra are all fair game. Less obvious categories (AI agents, DePIN, social) may stand out more since gaming is heavily represented.

### Ingredients for a Winning Project

```
WINNING = (Novel Problem × ER/PER Necessity) + Technical Depth + Polish + Demo
```

| Ingredient | Why it Matters | How to Score High |
|---|---|---|
| **ER/PER Necessity** | Judges verify you couldn't do this on vanilla Solana | Design around 10ms loops, gasless batching, or hidden state |
| **Multiple Primitives** | Shows deep platform understanding | Combine ER + VRF + Session Keys + Cranks, or PER + ACL + Magic Actions |
| **Real-time UX** | The core selling point of MagicBlock | WebSocket subscriptions showing instant state updates |
| **Privacy angle (PER)** | Newer, less explored = more differentiated | Sealed-bid auctions, private social graphs, confidential payments |
| **Working frontend** | "Show don't tell" | Interactive web app or Unity game with live ER connection |
| **Clean architecture** | Code quality matters | Follow the delegate → execute → commit → undelegate lifecycle |

### High-Impact Project Categories

| Category | Example Idea | Key Primitives |
|---|---|---|
| **DeFi / Payments** | Real-time micro-payment streaming, high-frequency AMM, sealed-bid OTC desk | ER + Oracles + Magic Actions + PER |
| **Gaming** | Real-time multiplayer PvP with hidden moves (poker, strategy) | ER + VRF + Session Keys + PER + BOLT |
| **Social** | Private group messaging with on-chain message state, reputation system | PER + ACL + Session Keys |
| **AI Agents** | Autonomous on-chain agents executing at ER speed with verifiable random decisions | ER + VRF + Cranks |
| **Infra** | Developer tools for ER (explorer, debugger, migration tool) | ER + Magic Router SDK |

---

## Part 2 — Documentation Index

All paths are relative to `magic-block-doc/`.

---

### 🏠 Overview & Getting Started

| Doc | Path | Key Content |
|---|---|---|
| **Products** | [`pages/overview/products.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/overview/products.mdx) | Product cards overview |
| **Why MagicBlock** | [`pages/get-started/introduction/why-magicblock.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/get-started/introduction/why-magicblock.mdx) | Core value prop: 10ms blocks, gasless, horizontal scaling |
| **Ephemeral Rollup Intro** | [`pages/get-started/introduction/ephemeral-rollup.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/get-started/introduction/ephemeral-rollup.mdx) | Architecture overview, how ERs work |
| **Pricing** | [`pages/get-started/introduction/pricing.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/get-started/introduction/pricing.mdx) | Public nodes: free tx, 0.0003 SOL/session, 0.0001 SOL/commit |
| **Whitepaper** | [`pages/overview/additional-information/whitepaper.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/overview/additional-information/whitepaper.mdx) | Authors: Gabriele Picco, Andrea Fortugno. [arXiv link](https://arxiv.org/abs/2311.02650) |
| **Security & Audits** | [`pages/overview/additional-information/security-and-audits.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/overview/additional-information/security-and-audits.mdx) | Audit information |
| **System Status** | [`pages/overview/additional-information/system-status.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/overview/additional-information/system-status.mdx) | Status page link |

---

### ⚡ Ephemeral Rollups (ER)

#### Introduction
| Doc | Path | Key Content |
|---|---|---|
| **Why ER** | [`pages/ephemeral-rollups-ers/introduction/why.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/ephemeral-rollups-ers/introduction/why.mdx) | Benefits: gasless, <10ms, scheduling, horizontal scaling |
| **Delegation Lifecycle** | [`pages/ephemeral-rollups-ers/introduction/ephemeral-rollup.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/ephemeral-rollups-ers/introduction/ephemeral-rollup.mdx) | Delegate → Execute → Commit → Undelegate lifecycle |
| **Transaction Flow** | [`pages/ephemeral-rollups-ers/introduction/transactions.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/ephemeral-rollups-ers/introduction/transactions.mdx) | Routing logic: all-delegated→ER, all-undelegated→L1, mixed→error |
| **Magic Router** | [`pages/ephemeral-rollups-ers/introduction/magic-router.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/ephemeral-rollups-ers/introduction/magic-router.mdx) | Dynamic tx routing, single RPC endpoint |
| **FAQ** | [`pages/ephemeral-rollups-ers/introduction/faq.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/ephemeral-rollups-ers/introduction/faq.mdx) | Accounts can't be created on ER, programs are cloned not delegated, ER slot=50ms |

#### How-To Guides
| Doc | Path | Key Content |
|---|---|---|
| **Quickstart (Anchor)** | [`pages/ephemeral-rollups-ers/how-to-guide/quickstart.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/ephemeral-rollups-ers/how-to-guide/quickstart.mdx) | Step-by-step Anchor counter: write→delegate→deploy→test |
| **Rust Program** | [`pages/ephemeral-rollups-ers/how-to-guide/rust-program.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/ephemeral-rollups-ers/how-to-guide/rust-program.mdx) | Native Rust counter with delegation hooks |
| **Rust Tests** | [`pages/ephemeral-rollups-ers/how-to-guide/rust-tests.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/ephemeral-rollups-ers/how-to-guide/rust-tests.mdx) | Testing ER programs |
| **Local Development** | [`pages/ephemeral-rollups-ers/how-to-guide/local-development.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/ephemeral-rollups-ers/how-to-guide/local-development.mdx) | Local dev setup |

#### Magic Actions
| Doc | Path | Key Content |
|---|---|---|
| **Overview** | [`pages/ephemeral-rollups-ers/magic-actions/overview.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/ephemeral-rollups-ers/magic-actions/overview.mdx) | Auto-execute L1 instructions after ER commit |
| **Implementation** | [`pages/ephemeral-rollups-ers/magic-actions/implementation.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/ephemeral-rollups-ers/magic-actions/implementation.mdx) | Code for attaching actions to commits |
| **Client** | [`pages/ephemeral-rollups-ers/magic-actions/client.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/ephemeral-rollups-ers/magic-actions/client.mdx) | Client-side usage |
| **Troubleshooting** | [`pages/ephemeral-rollups-ers/magic-actions/troubleshooting.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/ephemeral-rollups-ers/magic-actions/troubleshooting.mdx) | Common issues |

---

### 🔒 Private Ephemeral Rollups (PER)

#### Introduction
| Doc | Path | Key Content |
|---|---|---|
| **Onchain Privacy** | [`pages/private-ephemeral-rollups-pers/introduction/onchain-privacy.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/private-ephemeral-rollups-pers/introduction/onchain-privacy.mdx) | TEE on Intel TDX, comparison table (TEE vs ZK vs FHE vs MPC) |
| **Authorization** | [`pages/private-ephemeral-rollups-pers/introduction/authorization.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/private-ephemeral-rollups-pers/introduction/authorization.mdx) | Permission Program, groups, members, access tokens |
| **Compliance Framework** | [`pages/private-ephemeral-rollups-pers/introduction/compliance-framework.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/private-ephemeral-rollups-pers/introduction/compliance-framework.mdx) | IP geofencing, AML/sanctions screening, EULA licensing |

#### How-To Guides
| Doc | Path | Key Content |
|---|---|---|
| **PER Quickstart** | [`pages/private-ephemeral-rollups-pers/how-to-guide/quickstart.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/private-ephemeral-rollups-pers/how-to-guide/quickstart.mdx) | Rock-Paper-Scissors example with permission + delegation hooks |
| **Access Control** | [`pages/private-ephemeral-rollups-pers/how-to-guide/access-control.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/private-ephemeral-rollups-pers/how-to-guide/access-control.mdx) | Permission lifecycle: Create→Delegate→Update→Request→Commit→Close. Member flags: AUTHORITY, TX_LOGS, TX_BALANCES, TX_MESSAGE, ACCOUNT_SIGNATURES |
| **Ephemeral SPL Payments** | [`pages/private-ephemeral-rollups-pers/how-to-guide/ephemeral-spl-private-payments.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/private-ephemeral-rollups-pers/how-to-guide/ephemeral-spl-private-payments.mdx) | Private deposits/transfers/withdrawals with ephemeral token accounts |
| **Private SPL Token API** | [`pages/private-ephemeral-rollups-pers/how-to-guide/private-spl-token-api.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/private-ephemeral-rollups-pers/how-to-guide/private-spl-token-api.mdx) | SPL token operations in PER |
| **API & SDK Overview** | [`pages/private-ephemeral-rollups-pers/api-and-sdk/overview.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/private-ephemeral-rollups-pers/api-and-sdk/overview.mdx) | Under construction |

#### Archive (older PER guides)
| Doc | Path |
|---|---|
| Archive: Client Implementation | `pages/private-ephemeral-rollups-pers/how-to-guide/archive/client-implementation.mdx` |
| Archive: Program Implementation | `pages/private-ephemeral-rollups-pers/how-to-guide/archive/program-implementation.mdx` |
| Archive: Quickstart | `pages/private-ephemeral-rollups-pers/how-to-guide/archive/quickstart.mdx` |
| Archive: Compliance Framework | `pages/private-ephemeral-rollups-pers/how-to-guide/archive/PER-Compliance-Framework.mdx` |

---

### 🔧 Tools & SDKs

#### BOLT (ECS Framework)
| Doc | Path | Key Content |
|---|---|---|
| **Introduction** | [`pages/tools/bolt/introduction.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/bolt/introduction.mdx) | Entity Component System for on-chain games, extends Anchor |
| **Installation** | [`pages/tools/bolt/getting-started/installation.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/bolt/getting-started/installation.mdx) | CLI setup |
| **Hello BOLT** | [`pages/tools/bolt/getting-started/hello-bolt.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/bolt/getting-started/hello-bolt.mdx) | Getting started tutorial |
| **Components** | [`pages/tools/bolt/getting-started/create-component.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/bolt/getting-started/create-component.mdx) | Creating ECS components |
| **Systems** | [`pages/tools/bolt/getting-started/create-system.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/bolt/getting-started/create-system.mdx) | Creating ECS systems |
| **World Program** | [`pages/tools/bolt/getting-started/world-program.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/bolt/getting-started/world-program.mdx) | World program concept |
| **Mapping** | [`pages/tools/bolt/mapping.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/bolt/mapping.mdx) | Mapping ECS to Solana |

#### Session Keys
| Doc | Path | Key Content |
|---|---|---|
| **Introduction** | [`pages/tools/session-keys/introduction.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/session-keys/introduction.mdx) | Ephemeral keys, scoped permissions, no wallet popups |
| **How They Work** | [`pages/tools/session-keys/how-do-session-keys-work.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/session-keys/how-do-session-keys-work.mdx) | Mechanics |
| **Installation** | [`pages/tools/session-keys/installation.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/session-keys/installation.mdx) | Setup |
| **Program Integration** | [`pages/tools/session-keys/integrating-sessions-in-your-program.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/session-keys/integrating-sessions-in-your-program.mdx) | On-chain integration |
| **Session Provider** | [`pages/tools/session-keys/session-provider-and-context.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/session-keys/session-provider-and-context.mdx) | Frontend provider |
| **Usage Examples** | [`pages/tools/session-keys/usage-examples.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/session-keys/usage-examples.mdx) | Code examples |
| **SessionKey Manager** | [`pages/tools/session-keys/use-sessionkey-manager.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/session-keys/use-sessionkey-manager.mdx) | Manager usage |
| **Security** | [`pages/tools/session-keys/security.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/session-keys/security.mdx) | Security considerations |

#### Cranks (Scheduled Tasks)
| Doc | Path | Key Content |
|---|---|---|
| **Introduction** | [`pages/tools/crank/introduction.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/crank/introduction.mdx) | Automated time-based on-chain execution via CPI |
| **Implementation** | [`pages/tools/crank/implementation.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/crank/implementation.mdx) | Code guide |

#### Oracles (Pyth Lazer)
| Doc | Path | Key Content |
|---|---|---|
| **Introduction** | [`pages/tools/oracle/introduction.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/oracle/introduction.mdx) | 50-200ms Pyth Lazer feeds on ER |
| **Implementation** | [`pages/tools/oracle/implementation.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/oracle/implementation.mdx) | Integration code |

#### Verifiable Randomness (VRFs)
| Doc | Path | Key Content |
|---|---|---|
| **What is VR?** | [`pages/tools/randomness/what-is-verifiable-randomness.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/randomness/what-is-verifiable-randomness.mdx) | EphemeralVrf, RFC 9381, Ristretto/Schnorr |
| **Technical Details** | [`pages/tools/randomness/technical-details.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/randomness/technical-details.mdx) | Deep dive |
| **Best Practices** | [`pages/tools/randomness/best-practices.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/randomness/best-practices.mdx) | Guidelines |
| **Security** | [`pages/tools/randomness/security.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/randomness/security.mdx) | Security guarantees |
| **FAQ** | [`pages/tools/randomness/faq.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/randomness/faq.mdx) | Common questions |

#### TEE (Trusted Execution Environments)
| Doc | Path | Key Content |
|---|---|---|
| **Introduction** | [`pages/tools/tee/introduction.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/tee/introduction.mdx) | PER on Intel TDX, privacy comparison table |
| **Authorization** | [`pages/tools/tee/authorization.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/tee/authorization.mdx) | Permission groups and access |
| **Program Implementation** | [`pages/tools/tee/program-implementation.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/tee/program-implementation.mdx) | Adding permissions via CPI |
| **Client Implementation** | [`pages/tools/tee/client-implementation.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/tee/client-implementation.mdx) | Attestation, challenge, access |

#### Magic Router SDK
| Doc | Path | Key Content |
|---|---|---|
| **Introduction** | [`pages/tools/magic-router-sdk/introduction.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/magic-router-sdk/introduction.mdx) | SDK overview |
| **Getting Started** | [`pages/tools/magic-router-sdk/getting-started.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/magic-router-sdk/getting-started.mdx) | Setup |
| **Core Concepts** | [`pages/tools/magic-router-sdk/core-concepts.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/tools/magic-router-sdk/core-concepts.mdx) | How routing works |

#### Solana Unity SDK
| Doc | Path |
|---|---|
| Overview | `pages/tools/solana-unity-sdk/overview.mdx` |
| Installation | `pages/tools/solana-unity-sdk/getting-started/installation.mdx` |
| Configuration | `pages/tools/solana-unity-sdk/getting-started/configuration.mdx` |
| Sample Scene | `pages/tools/solana-unity-sdk/getting-started/sample-scene.mdx` |
| Transaction Builder | `pages/tools/solana-unity-sdk/core-concepts/transaction-builder.mdx` |
| Transfer Token | `pages/tools/solana-unity-sdk/core-concepts/transfer-token.mdx` |
| Staking | `pages/tools/solana-unity-sdk/core-concepts/staking.mdx` |
| Add Signature | `pages/tools/solana-unity-sdk/core-concepts/add-signature.mdx` |
| ATA | `pages/tools/solana-unity-sdk/core-concepts/associated-token-account.mdx` |
| Mint NFT | `pages/tools/solana-unity-sdk/guides/mint-an-nft.mdx` |
| DEX Integration | `pages/tools/solana-unity-sdk/guides/dex-integration.mdx` |
| Jupiter | `pages/tools/solana-unity-sdk/guides/jupiter.mdx` |
| Host Your Game | `pages/tools/solana-unity-sdk/guides/host-your-game.mdx` |
| Publishing | `pages/tools/solana-unity-sdk/guides/publishing-a-game.mdx` |
| Additional Examples | `pages/tools/solana-unity-sdk/guides/additional-examples.mdx` |
| Contribution Guide | `pages/tools/solana-unity-sdk/contribution-guide.mdx` |

#### Other Tools
| Doc | Path |
|---|---|
| Wallets & Onramp | `pages/tools/wallets-and-onramp/overview.mdx` |
| SOAR | `pages/tools/open-source-programs/SOAR.mdx` |

---

### 🎯 Use Cases

| Doc | Path | Key Content |
|---|---|---|
| **Introduction** | [`pages/get-started/use-cases/introduction.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/get-started/use-cases/introduction.mdx) | Overview of all categories |
| **Games** | [`pages/get-started/use-cases/games.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/get-started/use-cases/games.mdx) | Generals example, architecture walkthrough |
| **Finance** | [`pages/get-started/use-cases/finance.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/get-started/use-cases/finance.mdx) | Real-time pricing oracle, Pyth demo |
| **AI Agents** | [`pages/get-started/use-cases/ai.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/get-started/use-cases/ai.mdx) | Super Smart Contracts example |
| **Payments** | [`pages/get-started/use-cases/payments.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/get-started/use-cases/payments.mdx) | Dummy token transfer example |
| **DePIN** | [`pages/get-started/use-cases/depin.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/get-started/use-cases/depin.mdx) | IoT, infrastructure coordination |
| **Privacy** | [`pages/get-started/use-cases/privacy.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/get-started/use-cases/privacy.mdx) | TEE intro links, confidential computing |

---

### 📋 Templates (Starter Kits)

| Template | Path | Repo | Live Demo |
|---|---|---|---|
| **Counter** | [`pages/templates/counter.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/templates/counter.mdx) | [anchor-counter](https://github.com/magicblock-labs/magicblock-engine-examples/tree/main/anchor-counter) | — |
| **On-chain Dice** | [`pages/templates/onchain-dice.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/templates/onchain-dice.mdx) | [roll-dice](https://github.com/magicblock-labs/magicblock-engine-examples/tree/main/roll-dice) | — |
| **Private Payments** | [`pages/templates/private-payments.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/templates/private-payments.mdx) | [private-payments-demo](https://github.com/magicblock-labs/starter-kits/tree/main/private-payments-demo) | [private-payments.magicblock.app](https://private-payments.magicblock.app) |
| **Random Character Generator** | [`pages/templates/random-character-generator.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/templates/random-character-generator.mdx) | [vrf-demo](https://github.com/magicblock-labs/starter-kits/tree/main/vrf-demo) | [mb-vrf.vercel.app](https://mb-vrf.vercel.app/) |
| **Real-Time Price Feed** | [`pages/templates/real-time-price-feed.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/pages/templates/real-time-price-feed.mdx) | [oracle-demo](https://github.com/magicblock-labs/starter-kits/tree/main/oracle-demo) | [pyth-template.magicblock.app](https://pyth-template.magicblock.app/) |

---

### 📡 API Reference

| Doc | Path | Key Content |
|---|---|---|
| **Introduction** | [`api-reference/introduction.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/api-reference/introduction.mdx) | JSON RPC API, Solana-compatible |

#### ER API
| Endpoint | Path |
|---|---|
| getAccountInfo | `api-reference/er-api/getAccountInfo.mdx` |
| getBlockhashForAccounts | `api-reference/er-api/getBlockhashForAccounts.mdx` |
| getDelegationStatus | `api-reference/er-api/getDelegationStatus.mdx` |
| getIdentity | `api-reference/er-api/getIdentity.mdx` |
| getPermission | `api-reference/er-api/getPermission.mdx` |
| getRoutes | `api-reference/er-api/getRoutes.mdx` |
| getSignatureStatuses | `api-reference/er-api/getSignatureStatuses.mdx` |
| Introduction | `api-reference/er-api/introduction.mdx` |

#### PER API
| Endpoint | Path |
|---|---|
| deposit | `api-reference/per-api/deposit.mdx` |
| getConfig | `api-reference/per-api/getConfig.mdx` |
| introduction | `api-reference/per-api/introduction.mdx` |
| prepareWithdrawal | `api-reference/per-api/prepareWithdrawal.mdx` |
| transferAmount | `api-reference/per-api/transferAmount.mdx` |
| withdraw | `api-reference/per-api/withdraw.mdx` |

#### SPL API (PER Token Operations)
| Endpoint | Path |
|---|---|
| checked-transfer | `api-reference/spl-api/checked-transfer.mdx` |
| create-ephemeral-ata-permission | `api-reference/spl-api/create-ephemeral-ata-permission.mdx` |
| delegate-ephemeral-ata-permission | `api-reference/spl-api/delegate-ephemeral-ata-permission.mdx` |
| delegate-ephemeral-ata | `api-reference/spl-api/delegate-ephemeral-ata.mdx` |
| deposit-spl-tokens | `api-reference/spl-api/deposit-spl-tokens.mdx` |
| get-config | `api-reference/spl-api/get-config.mdx` |
| initialize-ata | `api-reference/spl-api/initialize-ata.mdx` |
| initialize-ephemeral-ata | `api-reference/spl-api/initialize-ephemeral-ata.mdx` |
| initialize-global-vault | `api-reference/spl-api/initialize-global-vault.mdx` |
| introduction-per | `api-reference/spl-api/introduction-per.mdx` |
| reset-ephemeral-ata-permission | `api-reference/spl-api/reset-ephemeral-ata-permission.mdx` |
| undelegate-ephemeral-ata-permission | `api-reference/spl-api/undelegate-ephemeral-ata-permission.mdx` |
| undelegate-ephemeral-ata | `api-reference/spl-api/undelegate-ephemeral-ata.mdx` |
| withdraw-spl-tokens | `api-reference/spl-api/withdraw-spl-tokens.mdx` |

---

### 🎓 Tutorials

#### On-Chain Chess (Unity)
| Doc | Path | Key Content |
|---|---|---|
| **Overview** | [`onchain_chess/on-chain-chess.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/onchain_chess/on-chain-chess.mdx) | Full chess game tutorial: Unity + Solana |
| **Module 1: Setup** | [`onchain_chess/module_1/setup.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/onchain_chess/module_1/setup.mdx) | Project setup and SDK |
| **Module 2: On-chain Logic** | [`onchain_chess/module_2/onchain_logic.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/onchain_chess/module_2/onchain_logic.mdx) | Smart contract for chess |
| **Module 3: Import Project** | [`onchain_chess/module_3/import_project.mdx`](file:///c:/Users/DELL/sol-blitz/magic-block-doc/onchain_chess/module_3/import_project.mdx) | Unity project import |

---

### 📚 VRF Documentation (Separate Section)

| Doc | Path |
|---|---|
| Why VR On-chain | `pages/verifiable-randomness-functions-vrfs/introduction/why-verifiable-randomness-onchain.mdx` (if exists) |
| VRF Introduction | `pages/verifiable-randomness-functions-vrfs/introduction/` |
| VRF How-To Guide | `pages/verifiable-randomness-functions-vrfs/how-to-guide/` |
| VRF API & SDK | `pages/verifiable-randomness-functions-vrfs/api-and-sdk/` |

---

### 🧩 Key Code Snippets

All in `snippets/` directory. Major categories:

| Category | Path | Purpose |
|---|---|---|
| **Anchor Counter** | `snippets/anchor-counter-code/` | delegate, commit, undelegate, test, resize, write-program |
| **Rust Counter** | `snippets/rust-counter-code/` | delegate, commit, undelegate, instructions, resize |
| **ACL/Permission** | `snippets/acl-code/` | Permission CRUD in Rust, Pinocchio, Web3.js, Kit |
| **PER RPS (Rock-Paper-Scissors)** | `snippets/per-rps-code/` | write-program, delegate, restrict, authorize |
| **PER Code** | `snippets/per-code/` | General PER snippets |
| **Roll Dice** | `snippets/roll-dice-code/` | VRF dice example |
| **Magic Router** | `snippets/magic-router-code/` | Kit and Web3.js router snippets |
| **Magic Action** | `snippets/magic-action-code/` | action, commit-with-action, multiple-actions |
| **UI Components** | `snippets/components/` | Reusable doc components |

---

### 🏗️ Key Programs & Addresses

| Program | Address | Purpose |
|---|---|---|
| **Delegation Program** | `DELeGGvXpWV2fqJUhqcF5ZSYMS4JTLjteaAMARRSaeSh` | Account delegation to ER |
| **Permission Program** | `ACLseoPoyC3cBqoUtkbjZ4aDrkurZW86v19pXz2XQnp1` | PER access control |
| **Session Key Program** | `KeyspM2ssCJbqUhQ4k7sveSiY4WjnYsrXkC8oDbwde5` | Session key management |

### 🌐 Key Endpoints

| Endpoint | URL | Purpose |
|---|---|---|
| **Devnet ER** | `https://devnet.magicblock.app` | ER validator RPC |
| **TEE RPC** | `https://tee.magicblock.app?token=${token}` | PER endpoint (requires auth token) |
| **TEE Attestation** | `https://pccs.phala.network/tdx/certification/v4` | TEE integrity verification |

### 📦 Key GitHub Repos

| Repo | URL | Purpose |
|---|---|---|
| **Engine Examples** | [magicblock-engine-examples](https://github.com/magicblock-labs/magicblock-engine-examples) | Counter, crank, dice, token-transfer, magic-actions |
| **Starter Kits** | [starter-kits](https://github.com/magicblock-labs/starter-kits) | Private payments, VRF demo, Oracle demo |
| **Solana Generals** | [solana-generals](https://github.com/magicblock-labs/solana-generals) | Full game example with BOLT |
| **Delegation Program** | [delegation-program](https://github.com/magicblock-labs/delegation-program) | Core delegation on-chain program |
| **ER SDK** | [ephemeral-rollups-sdk](https://github.com/magicblock-labs/ephemeral-rollups-sdk) | Rust SDK for ER integration |
| **Super Smart Contracts** | [super-smart-contracts](https://github.com/GabrielePicco/super-smart-contracts) | AI agent example |
| **Real-Time Pricing Oracle** | [real-time-pricing-oracle](https://github.com/magicblock-labs/real-time-pricing-oracle) | Pyth Lazer on ER |

---

### 🔑 SDK Import Cheatsheet

```rust
// ER SDK (Anchor)
use ephemeral_rollups_sdk::anchor::{commit, delegate, ephemeral};
use ephemeral_rollups_sdk::cpi::DelegateConfig;
use ephemeral_rollups_sdk::ephem::{commit_accounts, commit_and_undelegate_accounts};

// Add to Cargo.toml
// cargo add ephemeral-rollups-sdk --features anchor
```

### 🔄 Core Lifecycle Cheatsheet

```
┌───────────────────────────────────────────────┐
│  1. CREATE account on Solana (L1)              │
│  2. DELEGATE account → ER (CPI to Delegation) │
│  3. EXECUTE txs on ER (10ms, gasless)          │
│     └─ Optional: COMMIT state → L1 (periodic) │
│  4. UNDELEGATE → commits final state to L1     │
└───────────────────────────────────────────────┘

For PER, add before step 2:
  1b. CREATE permission (CPI to Permission Program)
  1c. Add members with flags
  2b. DELEGATE permission + account → TEE validator

After execution, authorize client:
  3b. Verify TEE attestation
  3c. Request auth token
  3d. Connect with token in header/query param
```
