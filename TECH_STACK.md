# Spectre: Technical Stack & External Dependencies (v2.1 — Complete)

## Core Stack Summary
| Layer | Technology | Why |
| :--- | :--- | :--- |
| Agent Framework | **ElizaOS** | Autonomous AI agent runtime with plugin system, persistent memory, TEE support. |
| Solana Toolkit | **Solana Agent Kit v2** | Modular DeFi primitives (Jupiter, Pyth, Drift). Embedded wallet support. |
| Compute TEE | **Phala Network** | Hosts the Node.js ElizaOS process in a secure Intel TDX Docker container. |
| State TEE | **MagicBlock PER** | Hosts the agent's delegated wallet/state and executes Solana transactions confidentially. |
| Smart Contracts | **Anchor Framework** (Rust) | On-chain Spectre Agent Program with delegation hooks. |
| Database & Auth | **Supabase & NextAuth** | PostgreSQL for agent metadata and SIWS (Sign-In With Solana) for secure dashboard access. |
| Frontend | **Next.js** + Vanilla CSS | Developer dashboard and demo UI. |

---

## 1. Agent Layer (TypeScript)

### 1.1 ElizaOS (Hosted on Phala Compute TEE)
- **Package:** `@elizaos/cli`, `@elizaos/core`
- **Key Plugins Used:**
  - `@elizaos/plugin-tee` — Remote attestation and secure key derivation inside the Phala Compute TEE.
  - `@elizaos/plugin-solana` — Solana wallet provider, Jupiter integration.
  - `@elizaos/plugin-openai` — LLM reasoning for the agent.

### 1.2 Solana Agent Kit v2
- **Package:** `solana-agent-kit`
- **Key Plugins Used:**
  - `@solana-agent-kit/plugin-defi` — Jupiter swaps, Drift perps, Pyth oracles.
  - `@solana-agent-kit/plugin-token` — Token transfers, balances.

### 1.3 Custom Spectre Plugin (`@spectre/plugin-per`)
- **Purpose:** Bridges ElizaOS actions to the MagicBlock State TEE. Routes transactions through `tee.magicblock.app`. Contains the `SupabaseSyncService` to encrypt and push reasoning logs securely to the off-chain dashboard.

## 2. Smart Contract Layer (Rust)

### 2.1 Anchor Framework
- **Package:** `anchor-lang`, `anchor-spl`
- **Purpose:** Building the on-chain Spectre Agent Program.

### 2.2 MagicBlock SDK
- **Package:** `ephemeral-rollups-sdk`
- **Key Programs:**
  - Delegation Program: `DELeGGvXpWV2fqJUhqcF5ZSYMS4JTLjteaAMARRSaeSh`
  - Permission Program: `ACLseoPoyC3cBqoUtkbjZ4aDrkurZW86v19pXz2XQnp1`

## 3. Frontend & Off-Chain Backend (TypeScript)

### 3.1 Next.js Dashboard
- **Framework:** Next.js 14+ (App Router)
- **Authentication:** `NextAuth.js` integrated with `@solana/wallet-adapter-react` for Sign-In With Solana (SIWS) authentication.

### 3.2 Supabase (PostgreSQL)
- **Purpose:** Relational database mapping Phantom wallet addresses to deployed agents. Stores encrypted agent activity logs pushed by the Phala Compute TEE. Handled via `@supabase/supabase-js`.

## 4. Infrastructure & APIs

| Service | URL/Package | Purpose |
| :--- | :--- | :--- |
| **MagicBlock TEE RPC** | `https://tee.magicblock.app` | Execution endpoint for the State TEE. |
| **Magic Router** | `magicblock-router-sdk` | Dynamic tx routing between PER and L1. |
| **Phala TDX Attestation**| `https://pccs.phala.network/tdx...` | Certifies the Compute TEE environment. |
| **Jupiter API** | `https://quote-api.jup.ag/v6` | Token swap quotes and execution. |
| **Pyth Lazer** | Integrated via MagicBlock ER | 50ms price oracle feeds. |
| **Supabase** | `supabase.com` | Metadata database and auth layer. |
| **OpenAI API** | `https://api.openai.com` | LLM reasoning for the agent brain. |

## 5. Development Environment

| Tool | Purpose |
| :--- | :--- |
| `solana-test-validator` | Local Solana testing. |
| `anchor build` / `anchor test` | Rust program compilation and testing. |
| `elizaos start` | Run the ElizaOS agent locally. |
| `pnpm` | Package manager. |
| `cargo` | Rust package manager. |

## 6. Complete External Dependencies List (Required)

| Dependency | Category | Role in Spectre |
| :--- | :--- | :--- |
| **MagicBlock PER** | Infrastructure | State TEE: Executes transactions confidentially and gaslessly. |
| **Phala Network** | Infrastructure | Compute TEE: Securely hosts the Node.js ElizaOS agent. |
| **Supabase** | Database | Off-chain storage for UI metadata and encrypted logs. |
| **NextAuth / SIWS** | Auth | Cryptographic wallet authentication for the dashboard. |
| **ElizaOS** | Agent Framework | The autonomous reasoning loop and memory. |
| **Solana Agent Kit v2** | DeFi Toolkit | Connects reasoning to Solana logic (Jupiter, Pyth). |
| **Anchor Framework** | Smart Contract | Compiles the Spectre Solana program. |
| **Jupiter API** | DeFi | Executes token swaps. |
| **Pyth Lazer Oracle** | Data Feed | Real-time prices governing agent decisions. |
| **OpenAI API** | AI Model | The actual cognitive engine behind the agent. |
| **Next.js & Wallet Adapter** | Frontend | The user-facing deployment dashboard. |
