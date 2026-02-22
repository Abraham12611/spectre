# Spectre Workflow: Agent Unshielding & Withdrawal

## Trigger
User clicks "Undelegate" on the Agent Detail Page.

## Steps

### 1. Confirm Action
- **Confirm Undelegate Modal** warns the user:
  - "This will commit the agent's final state to Solana L1 and make the account publicly visible."
  - "The agent will stop executing confidentially."
- User clicks "Confirm."

### 2. Stop Agent Runtime
- ElizaOS `AgentRuntime` is gracefully stopped.
- All pending actions are completed or cancelled.
- `@spectre/plugin-per`'s `SpectreMonitorService` is shut down.

### 3. Commit Final State
- `@spectre/plugin-per` sends a `commit` instruction to the PER.
- The PER writes the final agent state (balances, positions) to the Agent State PDA on Solana L1.

### 4. Undelegate from PER
- `@spectre/plugin-per` sends an `undelegate` instruction via CPI to MagicBlock's Delegation Program.
- The Agent State PDA is unlocked on L1.
- The account is no longer under PER control.

### 5. Close Permissions
- Optional: The Permission Account can be closed to reclaim rent.
- `@spectre/plugin-per` sends a `close_permission` instruction via CPI.

### 6. Dashboard Update
- Agent status changes to ⚪ **Unshielded**.
- Balances are now publicly visible on Solana Explorer.
- User can withdraw funds from the Agent State PDA to their personal wallet.

## Result
Agent is fully unshielded. Funds are back on L1 under the user's control. The PER session is terminated.
