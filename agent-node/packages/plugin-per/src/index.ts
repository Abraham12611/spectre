import { Plugin } from "@elizaos/core";
import { delegateToPerAction } from "./actions/delegateToPer";
import { undelegateFromPerAction } from "./actions/undelegateFromPer";
import { executeConfidentialAction } from "./actions/executeConfidential";
import { checkAttestationAction } from "./actions/checkAttestation";
import { SupabaseSyncService } from "./services/SupabaseSyncService";

export const spectrePerPlugin: Plugin = {
    name: "spectre-per",
    description: "MagicBlock Private Ephemeral Rollups bridge for confidential execution and encrypted logging",
    actions: [
        delegateToPerAction,
        undelegateFromPerAction,
        executeConfidentialAction,
        checkAttestationAction
    ],
    evaluators: [],
    providers: [],
    services: [new SupabaseSyncService()]
};

export * as actions from "./actions";
export * as services from "./services";
