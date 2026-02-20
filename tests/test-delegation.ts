/**
 * Spectre ER Delegation Lifecycle Test
 * =====================================
 * Proves the full lifecycle on Solana Devnet:
 *   1. Initialize Agent PDA on L1
 *   2. Delegate Agent to Ephemeral Rollup
 *   3. Record Action on ER (gasless, ~10ms)
 *   4. Commit & Undelegate back to L1
 *   5. Verify state on L1
 *
 * Reference: MagicBlock Quickstart — anchor-counter test snippet
 * https://github.com/magicblock-labs/magicblock-engine-examples/tree/main/anchor-counter
 */

const anchor = require("@coral-xyz/anchor");
const { Program, AnchorProvider, web3, BN } = anchor;
const { PublicKey, Connection, Keypair, SystemProgram } = require("@solana/web3.js");
const { assert } = require("chai");
const IDL = require("../target/idl/spectre_program.json");

// ─── Constants ──────────────────────────────────────────────────────────────
const PROGRAM_ID = new PublicKey("3xAmgLtbu1SZdDrp85vXiW1JMF9iMcys1DsQMhWQg3gb");
const DELEGATION_PROGRAM_ID = new PublicKey("DELeGGvXpWV2fqJUhqcF5ZSYMS4JTLjteaAMARRSaeSh");

// MagicBlock ER Validators — from MAGICBLOCK_DOCS_REFERENCE.md
const ER_VALIDATOR = new PublicKey("MAS1Dt9qreoRMQ14YQuhg8UTZMMzDdKhmkZMECCzk57"); // Asia
const ER_RPC_URL = "https://devnet.magicblock.app";
const ER_WS_URL = "wss://devnet.magicblock.app";
const L1_RPC_URL = "https://api.devnet.solana.com";

// Agent PDA seed
const AGENT_SEED = Buffer.from("agent");

// ─── Helpers ────────────────────────────────────────────────────────────────

function getAgentPDA(owner: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
        [AGENT_SEED, owner.toBuffer()],
        PROGRAM_ID
    );
}



function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Main Test ──────────────────────────────────────────────────────────────

describe("Spectre ER Delegation Lifecycle", () => {
    // L1 (Devnet) provider
    const provider = AnchorProvider.env();
    anchor.setProvider(provider);
    const wallet = provider.wallet as anchor.Wallet;

    // ER provider (MagicBlock Devnet)
    const erConnection = new Connection(ER_RPC_URL, {
        wsEndpoint: ER_WS_URL,
        commitment: "confirmed",
    });
    const erProvider = new AnchorProvider(erConnection, wallet, {
        commitment: "confirmed",
    });

    // Programs
    const program = new Program(IDL as any, provider);
    const erProgram = new Program(IDL as any, erProvider);

    // PDAs
    const [agentPda, agentBump] = getAgentPDA(wallet.publicKey);

    // Generate a fake TEE node keypair for testing
    // In production, this would be the Phala TEE enclave's pubkey
    const teeNode = Keypair.generate();

    console.log("========================================");
    console.log("Spectre ER Delegation Lifecycle Test");
    console.log("========================================");
    console.log(`Wallet:       ${wallet.publicKey.toBase58()}`);
    console.log(`Agent PDA:    ${agentPda.toBase58()}`);
    console.log(`TEE Node:     ${teeNode.publicKey.toBase58()}`);
    console.log(`Program ID:   ${PROGRAM_ID.toBase58()}`);
    console.log(`ER Validator:  ${ER_VALIDATOR.toBase58()}`);
    console.log(`ER RPC:       ${ER_RPC_URL}`);
    console.log("========================================\n");

    it("Step 1: Initialize Agent on L1 (Devnet)", async () => {
        console.log("🔄 Initializing agent on L1...");

        try {
            const tx = await program.methods
                .initializeAgent(teeNode.publicKey)
                .accounts({
                    agent: agentPda,
                    owner: wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .rpc();

            console.log(`✅ Agent initialized on L1.`);
            console.log(`   Tx: ${tx}`);
            console.log(`   Solscan: https://solscan.io/tx/${tx}?cluster=devnet`);

            // Verify the agent state
            const agentAccount = await program.account.agentState.fetch(agentPda);
            assert.equal(
                agentAccount.owner.toBase58(),
                wallet.publicKey.toBase58(),
                "Owner should match"
            );
            assert.equal(
                agentAccount.teeNode.toBase58(),
                teeNode.publicKey.toBase58(),
                "TEE node should match"
            );
            assert.equal(
                agentAccount.actionCount.toNumber(),
                0,
                "Action count should be 0"
            );
            console.log(`   Agent state verified: owner=${agentAccount.owner.toBase58()}, actionCount=0\n`);
        } catch (e: any) {
            // If agent already exists, that's okay for re-runs
            if (e.message?.includes("already in use")) {
                console.log("⚠️  Agent PDA already exists (previous test run). Continuing...\n");
            } else {
                throw e;
            }
        }
    });

    it("Step 2: Delegate Agent to Ephemeral Rollup", async () => {
        console.log("🔄 Delegating agent to ER...");

        const tx = await program.methods
            .delegateAgent(wallet.publicKey)
            .accounts({
                payer: wallet.publicKey,
                pda: agentPda,
            })
            .remainingAccounts([
                { pubkey: ER_VALIDATOR, isSigner: false, isWritable: false },
            ])
            .rpc();

        console.log(`✅ Agent delegated to Ephemeral Rollup.`);
        console.log(`   Tx: ${tx}`);
        console.log(`   Solscan: https://solscan.io/tx/${tx}?cluster=devnet`);

        // Give the ER time to pick up the delegation
        console.log("   Waiting 5s for ER to process delegation...");
        await sleep(5000);
        console.log("   Done.\n");
    });

    it("Step 3: Record Action on ER (gasless, ~10ms)", async () => {
        console.log("🔄 Recording action on ER...");

        // Create a dummy action hash (SHA-256 of "spectre-test-action")
        const actionHash = Array.from(
            Buffer.from(
                "a]f4e8d9c2b1a0f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7",
                "hex"
            ).slice(0, 32)
        );
        // Pad to 32 bytes if needed
        while (actionHash.length < 32) actionHash.push(0);

        const startTime = Date.now();

        const tx = await erProgram.methods
            .recordAction(actionHash)
            .accounts({
                agent: agentPda,
                signer: wallet.publicKey,
            })
            .rpc();

        const latency = Date.now() - startTime;

        console.log(`✅ Action recorded on ER (gasless).`);
        console.log(`   Tx: ${tx}`);
        console.log(`   Latency: ${latency}ms`);

        // Verify on ER
        const agentOnER = await erProgram.account.agentState.fetch(agentPda);
        console.log(`   Action count on ER: ${agentOnER.actionCount.toNumber()}`);
        assert.isAbove(
            agentOnER.actionCount.toNumber(),
            0,
            "Action count should be > 0 on ER"
        );
        console.log("");
    });

    it("Step 4: Commit & Undelegate back to L1", async () => {
        console.log("🔄 Committing state and undelegating...");

        const tx = await erProgram.methods
            .commitAndUndelegate()
            .accounts({
                agent: agentPda,
                payer: wallet.publicKey,
            })
            .rpc();

        console.log(`✅ State committed and undelegated to L1.`);
        console.log(`   Tx: ${tx}`);

        // Wait for L1 to process the undelegation
        console.log("   Waiting 10s for L1 to finalize undelegation...");
        await sleep(10000);
        console.log("   Done.\n");
    });

    it("Step 5: Verify Final State on L1", async () => {
        console.log("🔄 Verifying final state on L1...");

        const agentAccount = await program.account.agentState.fetch(agentPda);

        console.log(`✅ Final L1 State:`);
        console.log(`   Owner:           ${agentAccount.owner.toBase58()}`);
        console.log(`   TEE Node:        ${agentAccount.teeNode.toBase58()}`);
        console.log(`   Action Count:    ${agentAccount.actionCount.toNumber()}`);
        console.log(
            `   Last Action Hash: ${Buffer.from(agentAccount.lastActionHash).toString("hex")}`
        );

        assert.isAbove(
            agentAccount.actionCount.toNumber(),
            0,
            "Action count should be > 0 after undelegation"
        );

        console.log("\n========================================");
        console.log("🎉 FULL ER LIFECYCLE PROVEN ON DEVNET!");
        console.log("========================================");
        console.log("Initialize → Delegate → Execute (gasless) → Commit → Undelegate → Verify ✅");
        console.log("========================================\n");
    });
});
