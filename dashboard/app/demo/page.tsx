"use client";

import { useState, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { SystemProgram, Keypair } from "@solana/web3.js";
import { WalletConnectButton } from "@/components/wallet-connect-button";
import {
    getAgentPDA,
    getL1Program,
    getERProgram,
    getAgentStatus,
    shortenAddress,
    hashToHex,
    ER_VALIDATOR,
    ER_RPC_URL,
} from "@/lib/anchor-client";
import {
    ArrowLeft,
    ShieldAlert,
    Play,
    CheckCircle2,
    Circle,
    Loader2,
    ExternalLink,
    XCircle,
    Zap,
} from "lucide-react";
import Link from "next/link";

// Step status
type StepStatus = "pending" | "running" | "done" | "error";

interface LogLine {
    time: string;
    source: string;
    text: string;
    type: "info" | "success" | "warning" | "error" | "highlight";
    tx?: string;
}

interface StepState {
    label: string;
    status: StepStatus;
    latencyMs?: number;
}

export default function DemoPage() {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const walletAdapter = useWallet();

    const [running, setRunning] = useState(false);
    const [finished, setFinished] = useState(false);
    const [logs, setLogs] = useState<LogLine[]>([]);
    const [steps, setSteps] = useState<StepState[]>([
        { label: "Initialize Agent on L1", status: "pending" },
        { label: "Delegate to Ephemeral Rollup", status: "pending" },
        { label: "Record Action on ER (gasless)", status: "pending" },
        { label: "Commit & Undelegate to L1", status: "pending" },
        { label: "Verify State on L1", status: "pending" },
    ]);
    const logsEndRef = useRef<HTMLDivElement>(null);

    const addLog = (log: Omit<LogLine, "time">) => {
        const now = new Date();
        const time = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
        setLogs((prev) => [...prev, { ...log, time }]);
        setTimeout(() => logsEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    };

    const updateStep = (index: number, update: Partial<StepState>) => {
        setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, ...update } : s)));
    };

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const runDemo = async () => {
        if (!publicKey || !connection || running) return;

        setRunning(true);
        setFinished(false);
        setLogs([]);
        setSteps([
            { label: "Initialize Agent on L1", status: "pending" },
            { label: "Delegate to Ephemeral Rollup", status: "pending" },
            { label: "Record Action on ER (gasless)", status: "pending" },
            { label: "Commit & Undelegate to L1", status: "pending" },
            { label: "Verify State on L1", status: "pending" },
        ]);

        const program = getL1Program(connection, walletAdapter as any);
        const erProgram = getERProgram(walletAdapter as any);
        const [agentPda] = getAgentPDA(publicKey);
        const teeNode = Keypair.generate();

        addLog({ source: "System", text: `Wallet: ${shortenAddress(publicKey.toBase58())}`, type: "info" });
        addLog({ source: "System", text: `Agent PDA: ${shortenAddress(agentPda.toBase58())}`, type: "info" });
        addLog({ source: "System", text: `ER RPC: ${ER_RPC_URL}`, type: "info" });

        // Check current agent status before starting
        addLog({ source: "L1", text: "Checking agent PDA status...", type: "info" });
        let agentStatus = await getAgentStatus(connection, agentPda);
        addLog({ source: "L1", text: `Agent status: ${agentStatus}`, type: "info" });

        // ─── Step 1: Initialize ─────────────────────────────────────────
        try {
            updateStep(0, { status: "running" });
            if (agentStatus === "none") {
                addLog({ source: "L1", text: "Initializing Agent PDA on Devnet...", type: "info" });
                const start = Date.now();
                const tx = await (program.methods as any)
                    .initializeAgent(teeNode.publicKey)
                    .accounts({
                        agent: agentPda,
                        owner: publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc();
                const ms = Date.now() - start;
                updateStep(0, { status: "done", latencyMs: ms });
                addLog({ source: "L1", text: `✅ Agent initialized (${ms}ms)`, type: "success", tx });
                agentStatus = "initialized";
            } else {
                updateStep(0, { status: "done", latencyMs: 0 });
                addLog({ source: "L1", text: `Agent already exists (status: ${agentStatus}). Reusing.`, type: "warning" });
            }
        } catch (e: any) {
            updateStep(0, { status: "error" });
            addLog({ source: "L1", text: `❌ Init failed: ${e.message?.slice(0, 200)}`, type: "error" });
            setRunning(false);
            return;
        }

        // ─── Step 2: Delegate ───────────────────────────────────────────
        try {
            updateStep(1, { status: "running" });
            if (agentStatus === "delegated") {
                updateStep(1, { status: "done", latencyMs: 0 });
                addLog({ source: "L1", text: "Agent already delegated to ER. Skipping.", type: "warning" });
            } else {
                addLog({ source: "L1", text: "Delegating to MagicBlock ER validator...", type: "info" });
                const start = Date.now();

                const tx = await (program.methods as any)
                    .delegateAgent(publicKey)
                    .accounts({ payer: publicKey, pda: agentPda })
                    .remainingAccounts([
                        { pubkey: ER_VALIDATOR, isSigner: false, isWritable: false },
                    ])
                    .rpc();

                const ms = Date.now() - start;
                updateStep(1, { status: "done", latencyMs: ms });
                addLog({ source: "L1", text: `✅ Delegated to ER (${ms}ms)`, type: "success", tx });
                addLog({ source: "ER", text: "Waiting 5s for ER to pick up delegation...", type: "info" });
                await sleep(5000);
            }
        } catch (e: any) {
            updateStep(1, { status: "error" });
            addLog({ source: "L1", text: `❌ Delegate failed: ${e.message?.slice(0, 200)}`, type: "error" });
            setRunning(false);
            return;
        }

        // ─── Step 3: Record Action ──────────────────────────────────────
        try {
            updateStep(2, { status: "running" });
            addLog({ source: "ER", text: "Recording action on Ephemeral Rollup (gasless)...", type: "highlight" });
            const actionHash = new Array(32).fill(0).map((_, i) => (i * 7 + 42) % 256);
            const start = Date.now();

            const tx = await (erProgram.methods as any)
                .recordAction(actionHash)
                .accounts({ agent: agentPda, signer: publicKey })
                .rpc();

            const ms = Date.now() - start;
            updateStep(2, { status: "done", latencyMs: ms });
            addLog({ source: "ER", text: `✅ Action recorded — GASLESS (${ms}ms)`, type: "success", tx });
            addLog({ source: "ER", text: `Latency: ${ms}ms | Cost: 0 SOL ⚡`, type: "highlight" });
        } catch (e: any) {
            updateStep(2, { status: "error" });
            addLog({ source: "ER", text: `❌ ${e.message}`, type: "error" });
            setRunning(false);
            return;
        }

        // ─── Step 4: Commit & Undelegate ────────────────────────────────
        try {
            updateStep(3, { status: "running" });
            addLog({ source: "ER", text: "Committing state and undelegating to L1...", type: "info" });
            const start = Date.now();

            const tx = await (erProgram.methods as any)
                .commitAndUndelegate()
                .accounts({ agent: agentPda, payer: publicKey })
                .rpc();

            const ms = Date.now() - start;
            updateStep(3, { status: "done", latencyMs: ms });
            addLog({ source: "L1", text: `✅ State committed to L1 (${ms}ms)`, type: "success", tx });
            addLog({ source: "L1", text: "Waiting 10s for L1 finalization...", type: "info" });
            await sleep(10000);
        } catch (e: any) {
            updateStep(3, { status: "error" });
            addLog({ source: "L1", text: `❌ ${e.message}`, type: "error" });
            setRunning(false);
            return;
        }

        // ─── Step 5: Verify ─────────────────────────────────────────────
        try {
            updateStep(4, { status: "running" });
            addLog({ source: "L1", text: "Verifying final state on L1...", type: "info" });

            const agentState = await (program.account as any).agentState.fetch(agentPda);
            const actionCount = agentState.actionCount.toNumber();
            const lastHash = hashToHex(agentState.lastActionHash);

            updateStep(4, { status: "done" });
            addLog({ source: "L1", text: `✅ Owner: ${shortenAddress(agentState.owner.toBase58())}`, type: "success" });
            addLog({ source: "L1", text: `✅ Action Count: ${actionCount}`, type: "success" });
            addLog({ source: "L1", text: `✅ Last Hash: ${shortenAddress(lastHash, 8)}`, type: "success" });
            addLog({ source: "System", text: "🎉 FULL ER LIFECYCLE PROVEN ON DEVNET!", type: "highlight" });
        } catch (e: any) {
            updateStep(4, { status: "error" });
            addLog({ source: "L1", text: `❌ ${e.message}`, type: "error" });
        }

        setRunning(false);
        setFinished(true);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="mb-6 flex justify-between items-center border-b border-gray-800 pb-6">
                    <div>
                        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-white transition-colors mb-3 text-sm font-medium">
                            <ArrowLeft size={16} className="mr-2" /> back to home
                        </Link>
                        <h1 className="text-3xl font-bold mb-1">Spectre Live Demo</h1>
                        <p className="text-gray-400 text-sm">
                            Execute the full Ephemeral Rollup lifecycle on Solana Devnet in real-time
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        {!publicKey ? (
                            <WalletConnectButton />
                        ) : (
                            <>
                                <span className="font-mono text-sm text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-md border border-emerald-400/20">
                                    {shortenAddress(publicKey.toBase58())}
                                </span>
                                <button
                                    onClick={runDemo}
                                    disabled={running || !publicKey}
                                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg shadow-blue-900/30"
                                >
                                    {running ? (
                                        <><Loader2 size={18} className="mr-2 animate-spin" /> Running...</>
                                    ) : finished ? (
                                        <><Play size={18} className="mr-2" /> Run Again</>
                                    ) : (
                                        <><Play size={18} className="mr-2" /> Run Live Demo</>
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                    {/* Steps Sidebar */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">ER Lifecycle Steps</h3>
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                className={`flex items-center space-x-3 p-3 rounded-xl border transition-all ${step.status === "running"
                                    ? "bg-blue-900/20 border-blue-500/30"
                                    : step.status === "done"
                                        ? "bg-emerald-900/10 border-emerald-500/20"
                                        : step.status === "error"
                                            ? "bg-red-900/10 border-red-500/20"
                                            : "bg-gray-900/30 border-gray-800"
                                    }`}
                            >
                                <div className="shrink-0">
                                    {step.status === "running" ? (
                                        <Loader2 size={20} className="text-blue-400 animate-spin" />
                                    ) : step.status === "done" ? (
                                        <CheckCircle2 size={20} className="text-emerald-400" />
                                    ) : step.status === "error" ? (
                                        <XCircle size={20} className="text-red-400" />
                                    ) : (
                                        <Circle size={20} className="text-gray-600" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-white truncate">{step.label}</div>
                                    {step.latencyMs !== undefined && step.status === "done" && (
                                        <div className="text-xs text-gray-500 mt-0.5">{step.latencyMs}ms</div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Finished Badge */}
                        {finished && (
                            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-blue-900/30 to-emerald-900/30 border border-emerald-500/20 text-center">
                                <Zap className="text-emerald-400 mx-auto mb-2" size={24} />
                                <div className="text-sm font-bold text-emerald-300">Lifecycle Complete</div>
                                <div className="text-xs text-gray-400 mt-1">Initialize → Delegate → Execute → Commit → Verify ✅</div>
                            </div>
                        )}
                    </div>

                    {/* Logs Panel */}
                    <div className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden flex flex-col" style={{ maxHeight: "75vh" }}>
                        <div className="p-4 bg-gray-900 border-b border-gray-800 flex justify-between items-center">
                            <div className="flex items-center text-blue-400 font-semibold text-sm">
                                <ShieldAlert size={18} className="mr-2" /> Real-Time Execution Log
                            </div>
                            <div className="flex items-center text-xs text-gray-500 font-mono">
                                Network: Solana Devnet + MagicBlock ER
                            </div>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-2">
                            {logs.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-gray-600">
                                    {publicKey ? "Click \"Run Live Demo\" to start" : "Connect wallet to begin"}
                                </div>
                            ) : (
                                logs.map((log, i) => (
                                    <div
                                        key={i}
                                        className={`flex flex-col p-2.5 rounded-lg border ${log.type === "success"
                                            ? "bg-emerald-900/10 border-emerald-800/30"
                                            : log.type === "error"
                                                ? "bg-red-900/10 border-red-800/30"
                                                : log.type === "highlight"
                                                    ? "bg-blue-900/10 border-blue-800/30"
                                                    : log.type === "warning"
                                                        ? "bg-amber-900/10 border-amber-800/30"
                                                        : "bg-white/[0.01] border-white/[0.03]"
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-gray-500 text-xs shrink-0">{log.time}</span>
                                            <span className={`text-xs font-bold uppercase tracking-wider ${log.source === "ER" ? "text-blue-400" : log.source === "L1" ? "text-emerald-400" : "text-gray-400"
                                                }`}>
                                                [{log.source}]
                                            </span>
                                            <span className={`flex-1 ${log.type === "success" ? "text-emerald-300" :
                                                log.type === "error" ? "text-red-300" :
                                                    log.type === "highlight" ? "text-blue-300" :
                                                        log.type === "warning" ? "text-amber-300" :
                                                            "text-gray-300"
                                                }`}>
                                                {log.text}
                                            </span>
                                        </div>
                                        {log.tx && (
                                            <div className="mt-1 pl-16">
                                                <a
                                                    href={`https://solscan.io/tx/${log.tx}?cluster=devnet`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-gray-500 hover:text-blue-400 flex items-center"
                                                >
                                                    {shortenAddress(log.tx, 8)} <ExternalLink size={10} className="ml-1" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                            <div ref={logsEndRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
