"use client";

import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import type { AnchorWallet } from "@solana/wallet-adapter-react";

// ─── Constants ──────────────────────────────────────────────────────────────
export const PROGRAM_ID = new PublicKey("3xAmgLtbu1SZdDrp85vXiW1JMF9iMcys1DsQMhWQg3gb");
export const ER_VALIDATOR = new PublicKey("MAS1Dt9qreoRMQ14YQuhg8UTZMMzDdKhmkZMECCzk57");
export const L1_RPC_URL = "https://api.devnet.solana.com";
export const ER_RPC_URL = "https://devnet.magicblock.app";
export const ER_WS_URL = "wss://devnet.magicblock.app";
const AGENT_SEED = Buffer.from("agent");

// ─── IDL (embedded) ─────────────────────────────────────────────────────────
export const IDL: any = {
    address: "3xAmgLtbu1SZdDrp85vXiW1JMF9iMcys1DsQMhWQg3gb",
    metadata: { name: "spectre_program", version: "0.1.0", spec: "0.1.0" },
    instructions: [
        {
            name: "commit_and_undelegate",
            discriminator: [9, 108, 132, 87, 184, 76, 98, 84],
            accounts: [
                { name: "agent", writable: true },
                { name: "payer", writable: true, signer: true },
                { name: "magic_program", address: "Magic11111111111111111111111111111111111111" },
                { name: "magic_context", writable: true, address: "MagicContext1111111111111111111111111111111" },
            ],
            args: [],
        },
        {
            name: "delegate_agent",
            discriminator: [32, 179, 196, 108, 101, 41, 23, 100],
            accounts: [
                { name: "payer", signer: true },
                {
                    name: "buffer_pda", writable: true,
                    pda: {
                        seeds: [{ kind: "const", value: [98, 117, 102, 102, 101, 114] }, { kind: "account", path: "pda" }],
                        program: { kind: "const", value: [43, 217, 93, 157, 108, 10, 90, 98, 212, 35, 27, 76, 142, 63, 184, 226, 124, 236, 148, 219, 244, 144, 100, 179, 70, 92, 121, 91, 240, 186, 5, 232] },
                    },
                },
                {
                    name: "delegation_record_pda", writable: true,
                    pda: {
                        seeds: [{ kind: "const", value: [100, 101, 108, 101, 103, 97, 116, 105, 111, 110] }, { kind: "account", path: "pda" }],
                        program: { kind: "account", path: "delegation_program" },
                    },
                },
                {
                    name: "delegation_metadata_pda", writable: true,
                    pda: {
                        seeds: [{ kind: "const", value: [100, 101, 108, 101, 103, 97, 116, 105, 111, 110, 45, 109, 101, 116, 97, 100, 97, 116, 97] }, { kind: "account", path: "pda" }],
                        program: { kind: "account", path: "delegation_program" },
                    },
                },
                { name: "pda", writable: true },
                { name: "owner_program", address: "3xAmgLtbu1SZdDrp85vXiW1JMF9iMcys1DsQMhWQg3gb" },
                { name: "delegation_program", address: "DELeGGvXpWV2fqJUhqcF5ZSYMS4JTLjteaAMARRSaeSh" },
                { name: "system_program", address: "11111111111111111111111111111111" },
            ],
            args: [{ name: "owner", type: "pubkey" }],
        },
        {
            name: "initialize_agent",
            discriminator: [212, 81, 156, 211, 212, 110, 21, 28],
            accounts: [
                { name: "agent", writable: true, pda: { seeds: [{ kind: "const", value: [97, 103, 101, 110, 116] }, { kind: "account", path: "owner" }] } },
                { name: "owner", writable: true, signer: true },
                { name: "system_program", address: "11111111111111111111111111111111" },
            ],
            args: [{ name: "tee_node_pubkey", type: "pubkey" }],
        },
        {
            name: "record_action",
            discriminator: [153, 153, 235, 171, 52, 54, 196, 145],
            accounts: [
                { name: "agent", writable: true },
                { name: "signer", signer: true },
            ],
            args: [{ name: "action_hash", type: { array: ["u8", 32] } }],
        },
    ],
    accounts: [{ name: "AgentState", discriminator: [254, 187, 98, 119, 228, 48, 47, 49] }],
    errors: [{ code: 6000, name: "UnauthorizedAction", msg: "Unauthorized action. Only the agent owner or authorized TEE node can perform this." }],
    types: [{
        name: "AgentState",
        type: {
            kind: "struct",
            fields: [
                { name: "owner", type: "pubkey" },
                { name: "tee_node", type: "pubkey" },
                { name: "last_action_hash", type: { array: ["u8", 32] } },
                { name: "action_count", type: "u64" },
            ],
        },
    }],
};

// ─── Helpers ────────────────────────────────────────────────────────────────

export const DELEGATION_PROGRAM_ID = new PublicKey("DELeGGvXpWV2fqJUhqcF5ZSYMS4JTLjteaAMARRSaeSh");

export function getAgentPDA(owner: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
        [AGENT_SEED, owner.toBuffer()],
        PROGRAM_ID
    );
}

export function getL1Program(connection: Connection, wallet: AnchorWallet): Program {
    const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
        preflightCommitment: "confirmed",
    });
    return new Program(IDL, provider);
}

export function getERProgram(wallet: AnchorWallet): Program {
    const erConnection = new Connection(ER_RPC_URL, {
        wsEndpoint: ER_WS_URL,
        commitment: "confirmed",
    });
    const erProvider = new AnchorProvider(erConnection, wallet, {
        commitment: "confirmed",
        preflightCommitment: "confirmed",
    });
    return new Program(IDL, erProvider);
}

/**
 * Check agent PDA status: "none" | "initialized" | "delegated"
 * When delegated, the PDA owner changes from our program to the delegation program.
 */
export async function getAgentStatus(connection: Connection, agentPda: PublicKey): Promise<"none" | "initialized" | "delegated"> {
    const info = await connection.getAccountInfo(agentPda);
    if (!info) return "none";
    if (info.owner.equals(DELEGATION_PROGRAM_ID)) return "delegated";
    if (info.owner.equals(PROGRAM_ID)) return "initialized";
    return "none";
}

export function generateTeeKeypair(): Keypair {
    return Keypair.generate();
}

export function shortenAddress(addr: string, chars = 4): string {
    return `${addr.slice(0, chars)}…${addr.slice(-chars)}`;
}

export function hashToHex(hash: number[] | Uint8Array): string {
    return Array.from(hash).map(b => b.toString(16).padStart(2, "0")).join("");
}
