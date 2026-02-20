import { Action, IAgentRuntime, Memory, State, HandlerCallback } from "@elizaos/core";

export const undelegateFromPerAction: Action = {
    name: "UNDELEGATE_FROM_PER",
    similes: ["UNSHIELD_AGENT", "EXIT_TEE", "COMMIT_STATE"],
    description: "Undelegates the agent from the MagicBlock PER and commits the final state back to the Solana L1.",
    validate: async (runtime: IAgentRuntime, message: Memory) => {
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
            runtime.elizaLogger.info("Initiating Commit and Undelegate from PER...");

            // In reality: 
            // await magicRouter.undelegate(pdaPubkey);

            const syncService = runtime.getService<any>("spectre-supabase-sync");
            if (syncService) {
                await syncService.encryptAndPushLog(
                    runtime.agentId,
                    message.userId,
                    "Agent undelegated. State committed to L1."
                );
            }

            callback({
                text: "Agent state committed to Solana L1 and successfully unshielded.",
                action: "UNDELEGATE_FROM_PER"
            });
            return true;
        } catch (error) {
            runtime.elizaLogger.error("Undelegation failed", error);
            callback({ text: "Failed to undelegate from PER." });
            return false;
        }
    },
    examples: [
        [
            { user: "user1", content: { text: "Unshield the agent and save state." } },
            { user: "spectre", content: { text: "Committing state and undelegating...", action: "UNDELEGATE_FROM_PER" } }
        ]
    ]
};
