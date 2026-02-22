# Spectre Workflow: Agent Deployment & Shielding

## Trigger
User clicks "+ Deploy New Agent" on the Dashboard.

## Steps

### 1. Connect Wallet
- User connects Phantom via `@solana/wallet-adapter-react`.
- Frontend reads the user's public key.

### 2. Create Agent Character
- User selects a strategy template (Conservative, Aggressive, Custom).
- Frontend generates an ElizaOS `Character` JSON config with the selected strategy as personality traits.

### 3. Fund Agent
- User specifies SOL amount to deposit into the agent's gas tank.
- Frontend constructs a `SystemProgram.transfer` tx from the user's wallet to a new Agent State PDA.

### 4. Initialize Agent On-Chain
- Frontend calls the Spectre Anchor Program's `initialize_agent` instruction.
- This creates the Agent State PDA with: `owner`, `balance`, `strategy_hash`, `is_delegated: false`.

### 5. Set Up Permissions (ACL)
- Frontend calls the Spectre Program's `setup_permissions` instruction.
- This issues a CPI to MagicBlock's Permission Program (`ACLseoPoyC3cBqoUtkbjZ4aDrkurZW86v19pXz2XQnp1`).
- Creates a Permission Account with flags: owner = `AUTHORITY | TX_LOGS | TX_BALANCES`, public = `NONE`.

### 6. Delegate to PER
- Frontend calls the Spectre Program's `delegate_to_per` instruction.
- This issues a CPI to MagicBlock's Delegation Program (`DELeGGvXpWV2fqJUhqcF5ZSYMS4JTLjteaAMARRSaeSh`).
- The Agent State PDA is now locked on L1 and controlled by the TEE validator.

### 7. Verify TEE Attestation
- Backend ElizaOS agent (with `@elizaos/plugin-tee`) fetches the remote attestation quote from `https://pccs.phala.network/tdx/certification/v4`.
- Verifies the quote is valid and the PER node is running genuine Intel TDX.
- Dashboard updates agent status to 🟢 **Shielded**.

### 8. Start Agent Runtime
- ElizaOS `AgentRuntime` starts with the Spectre Character config.
- Plugins loaded: `plugin-tee`, `plugin-solana`, `plugin-openai`, `@spectre/plugin-per`.
- Agent enters autonomous execution loop: monitor prices → decide → execute via PER → commit to L1.

## Result
Agent is live, shielded, and executing trades confidentially inside the MagicBlock PER.
