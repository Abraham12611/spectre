# Spectre: Dashboard Sitemap

## Pages

### `/` — Landing / Marketing Page
- Hero section: "The Confidential Operating System for Agentic Commerce"
- Problem statement animation (unshielded agent getting front-run)
- Feature cards: Shielded Execution, Access Control, Verifiable Randomness
- CTA: "Launch Dashboard" → `/dashboard`

### `/dashboard` — Main Dashboard
- **Agent List Panel:** Shows all deployed Spectre agents with status badges (🟢 Shielded, 🟡 Delegating, ⚪ Unshielded).
- **Quick Stats Bar:** Total agents, total capital shielded, attestation status.
- **CTA Button:** "+ Deploy New Agent" → opens **Deploy Agent Modal**.

### `/dashboard/agent/[id]` — Agent Detail Page
- **Tabs:**
  - **Overview:** Agent name, character, shielding status, wallet balance (L1 vs PER), attestation certificate.
  - **Activity Log:** Real-time feed of agent decisions (visible only to owner via Auth Token). Shows reasoning chain: "Pyth price SOL = $180 → Strategy: Sell 10% → Swap 5 SOL → USDC via Jupiter."
  - **Settings:** Edit strategy parameters, update ACL permissions, set stop-loss.
- **Actions Bar:**  
  - "Undelegate" button → opens **Confirm Undelegate Modal**.
  - "View Attestation" button → opens **Attestation Proof Modal**.

### `/demo` — Split-Screen Demo Page (Hackathon Showcase)
- **Left Panel:** "Unshielded Agent" — live simulation of an agent operating publicly. Shows a MEV bot reading its transactions and front-running.
- **Right Panel:** "Spectre Agent" — same strategy, but shielded inside PER. MEV bot sees nothing. Shows clean, private execution.
- **Metrics Bar:** Comparison: "Unshielded lost $X to front-running. Spectre agent saved $X."

## Modals & Pop-ups

### Deploy Agent Modal
- **Step 1:** Connect Wallet (Phantom).
- **Step 2:** Configure Agent Character (name, strategy type: Conservative / Aggressive / Custom).
- **Step 3:** Fund Agent (deposit SOL amount).
- **Step 4:** Confirm & Deploy → triggers delegation to PER.

### Confirm Undelegate Modal
- Warning: "This will commit the agent's final state to Solana L1 and make the account publicly visible."
- Confirm / Cancel buttons.

### Attestation Proof Modal
- Displays: TEE Vendor (Phala), Attestation Quote (base64), Timestamp, Agent PublicKey.
- Copyable raw attestation data for independent verification.

### Transaction Detail Modal
- Shows details of a specific agent action: signature, amount, token pair, timestamp, Jupiter route used.
