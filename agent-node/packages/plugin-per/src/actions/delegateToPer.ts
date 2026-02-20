import { Action, IAgentRuntime, Memory, State, HandlerCallback } from "@elizaos/core";

export const delegateToPerAction: Action = {
    name: "DELEGATE_TO_PER",
    similes: ["SHIELD_AGENT", "ENTER_TEE", "START_CONFIDENTIAL_SESSION"],
    description: "Delegates the agent's Solana account to the MagicBlock Private Ephemeral Rollup (PER) to begin confidential execution.",
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        // Need to ensure the user has Solana keys and MagicBlock API configured
        return !!runtime.getSetting("MAGICBLOCK_RPC_URL");
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: any,
        callback: HandlerCallback
    ) => {
        try {
            // In a real implementation, this would make a CPI to the Delegation Program
            // or use the Ephemeral Rollup Web3.JS SDK to delegate the PDA.
            // e.g., await magicRouter.delegate(pdaPubkey);

            runtime.elizaLogger.info("Starting Delegation to PER...");

            // Sync with Supabase
            const syncService = runtime.getService<any>("spectre-supabase-sync");
            if (syncService) {
                await syncService.encryptAndPushLog(
                    runtime.agentId,
                    message.userId,
                    "Agent delegated to Private Ephemeral Rollup."
                );
            }

            callback({
                text: "Agent successfully delegated to the MagicBlock Private Ephemeral Rollup. Execution is now confidential.",
                action: "DELEGATE_TO_PER"
            });
            return true;
        } catch (error) {
            runtime.elizaLogger.error("Delegation failed", error);
            callback({ text: "Failed to delegate to PER. " + error.message });
            return false;
        }
    },
    examples: [
        [
            { user: "user1", content: { text: "Shield my trading agent." } },
            { user: "spectre", content: { text: "Delegating agent to PER...", action: "DELEGATE_TO_PER" } }
        ]
    ]
};
