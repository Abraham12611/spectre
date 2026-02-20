# Spectre: System Architecture (v2.1 — Complete)

## 1. High-Level Architecture Diagram
```mermaid
graph TD
    subgraph "Frontend & Auth (Next.js)"
        UI[Web UI - localhost:3000]
        WalletAdapter[Solana Wallet Adapter]
        NextAuth[NextAuth / SIWS]
    end

    subgraph "Off-Chain Storage (Supabase)"
        DB[(PostgreSQL)]
        Users[User Profiles]
        Agents[Agent Metadata]
        Logs[Encrypted Activity Logs]
        DB --- Users & Agents & Logs
    end

    subgraph "Compute TEE (Phala Network Docker)"
        Runtime[ElizaOS AgentRuntime]
        Character[Character Config]
        PluginTEE["@elizaos/plugin-tee"]
        PluginSolana["@elizaos/plugin-solana"]
        SpectrePlugin["@spectre/plugin-per"]
        SAK[Solana Agent Kit]
    end

    subgraph "State TEE (MagicBlock PER - Intel TDX)"
        TEE_RPC["TEE RPC (tee.magicblock.app)"]
        ACL[Permission Program]
        DelegationProg[Delegation Program]
        SpectreProgram["Spectre Anchor Program"]
        VRF[EphemeralVrf]
    end

    subgraph "Solana Base Layer (L1)"
        AgentAccount[Agent State PDA]
        GasTank[SOL Gas Tank]
        Jupiter[Jupiter Aggregator]
        Pyth[Pyth Price Feeds]
    end

    UI -->|1. Connect & Auth| WalletAdapter
    WalletAdapter --> NextAuth
    NextAuth -->|JWT Session| UI
    UI -->|2. Fetch Metadata| DB
    UI -->|3. Deploy Agent| Runtime
    
    Runtime --> PluginTEE
    Runtime --> PluginSolana
    Runtime --> SpectrePlugin
    
    SpectrePlugin -->|4. Push Encrypted Logs| DB
    SpectrePlugin -->|5. Delegate State| DelegationProg
    SpectrePlugin -->|6. Set Permissions| ACL
    SpectrePlugin -->|7. Auth Token| TEE_RPC
    
    SAK -->|8. Construct Tx| SpectreProgram
    SpectreProgram --> VRF
    SpectreProgram -->|9. Signed Tx via Router| Jupiter
    SpectreProgram -->|10. Commit Final State| AgentAccount
    Pyth -->|Price Feed| SpectreProgram

    classDef tee fill:#1e1e2f,stroke:#4caf50,stroke-width:2px;
    class "Compute TEE (Phala Network Docker)","State TEE (MagicBlock PER - Intel TDX)" tee;
```

## 2. Core Separation: Compute TEE vs State TEE

A critical architectural distinction in Spectre is the dual-TEE setup:

1.  **Compute TEE (Phala Network):** This is a secure Docker environment running on Intel SGX/TDX. It hosts the Node.js/Bun process running the **ElizaOS AgentRuntime** and the LLM API calls. It holds the agent's derived private keys securely in memory but does *not* natively run Solana smart contracts.
2.  **State TEE (MagicBlock PER):** This is a specialized Ephemeral Rollup running a Solana Virtual Machine (SVM) inside Intel TDX. It hosts the **Delegated Agent State** and the Spectre Anchor Program. 

**The Flow:** The ElizaOS Agent (Compute TEE) reasons about the market, constructs a Solana transaction, signs it with its secure enclave key, and submits the transaction to the MagicBlock PER (State TEE) RPC. The PER executes the transaction confidentially and gaslessly before settling back to L1.

## 3. Off-Chain Database & Authentication

While the agent's financial state lives securely on-chain (shielded in the PER), the dashboard requires off-chain storage for metadata and user experience.

-   **Supabase (PostgreSQL):** Stores user profiles (linked to wallet addresses), agent deployment configurations (Name, Strategy Template, TEE Node ID), and encrypted activity logs.
-   **Sign-In With Solana (SIWS):** Uses `NextAuth.js` and `@solana/wallet-adapter-react` to cryptographically prove the user owns the public key. This allows the backend to issue a secure JWT session.
-   **Encrypted Activity Logs:** The ElizaOS agent inside the Compute TEE encrypts its reasoning logs (e.g., "Selling 5 SOL because Pyth oracle dropped 3%") using the owner's public key, then writes them to Supabase. The dashboard uses the owner's connected wallet to decrypt these logs locally, ensuring the agent's internal logic remains 100% confidential even if the database is compromised.

## 4. The Custom Spectre Plugin (`@spectre/plugin-per`)

This plugin bridges the ElizaOS agent runtime with the MagicBlock PER and Supabase:

```typescript
// Conceptual plugin structure
const spectrePlugin: Plugin = {
  name: '@spectre/plugin-per',
  description: 'Confidential execution via MagicBlock PER and Supabase Sync',
  
  actions: [
    delegateToPERAction,      // CPI to MagicBlock Delegation
    undelegateFromPERAction,  // Withdraws to L1
    checkAttestationAction,   // Verifies Phala and MagicBlock TDX quotes
  ],
  
  providers: [
    spectreStatusProvider,    // Shows: "Shielded: YES | Attestation: VALID"
    perBalanceProvider,       // Shows hidden PER balances
  ],
  
  services: [
    SpectreMonitorService,    // Background: monitors PER health
    SupabaseSyncService,      // Background: encrypts & pushes reasoning logs to DB
  ],
};
```

## 5. Data Privacy Model

| Data Type | Storage Location | Visibility | Why? |
| :--- | :--- | :--- | :--- |
| Agent Capital Balance (pre-delegation) | Solana L1 | **Public** | Base layer accounts are transparent by design. |
| User Profile & Agent Metadata | Supabase | **Private (RLS)** | Secured by Supabase Row Level Security (RLS) linked to the user's wallet signature. |
| Execution Logic / Activity Logs | Supabase | **Encrypted** | Encrypted by the agent in the TEE using the owner's pubkey; only owner can decrypt. |
| Agent Working State & Tokens | MagicBlock PER | **Shielded** | Protected by Intel TDX; completely hidden from public RPCs until committed to L1. |
| Final Action (e.g., Jupiter Swap) | Solana L1 | **Public** | Settlement must occur on the public ledger. |
