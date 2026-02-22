# Spectre Workflow: Confidential Trade Execution

## Trigger
The ElizaOS `AgentRuntime` is running inside the PER. The agent's `@elizaos/plugin-solana` wallet provider detects a price change via Pyth Oracle.

## Steps

### 1. Market Data Ingestion
- `@elizaos/plugin-solana`'s wallet provider queries cached Pyth price data.
- Provider returns: `"SOL/USD: $182.50 | 24h change: -3.2% | Portfolio: 50 SOL ($9,125)"`.

### 2. LLM Reasoning (Inside TEE)
- The ElizaOS runtime composes state from all providers (wallet, market data, agent personality).
- The state is sent to `@elizaos/plugin-openai` for LLM reasoning.
- LLM returns: `{ action: "SWAP_SOLANA", params: { inputToken: "SOL", inputAmount: "5", outputToken: "USDC", slippage: 1 } }`.
- **CRITICAL:** This reasoning happens inside the TEE. No external observer can see the agent's decision.

### 3. Transaction Construction (SAK v2)
- `@spectre/plugin-per` intercepts the `SWAP_SOLANA` action.
- Uses Solana Agent Kit's DeFi Plugin to construct the Jupiter swap transaction.
- Gets Jupiter quote from `https://quote-api.jup.ag/v6/quote`.

### 4. Confidential Signing (Inside PER)
- Instead of signing with a standard Solana RPC, the transaction is sent to `https://tee.magicblock.app?token=<auth_token>`.
- The PER signs the transaction using the agent's enclave-derived keypair (`deriveEd25519Keypair`).
- The signed transaction is submitted to the Magic Router.

### 5. Settlement on L1
- Magic Router forwards the signed Jupiter swap transaction to Solana L1.
- The swap executes on-chain.
- The PER commits the updated agent state (new USDC balance) back to L1.

### 6. Activity Log Update
- `@spectre/plugin-per` emits a `TRADE_EXECUTED` event.
- The Dashboard's Activity Log (visible only to the owner) displays:
  - `"[14:32:05] Decision: Sell 5 SOL → 912.50 USDC | Reason: -3.2% 24h drop, stop-loss triggered | Tx: 4kT7...xQ2z"`

## Result
The trade is executed. The public ledger shows "Wallet X swapped 5 SOL for USDC." The public does NOT know why, when the decision was made, or what the agent's remaining strategy is.
