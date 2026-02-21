"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { WalletConnectButton } from "@/components/wallet-connect-button";
import { SystemProgram, Keypair } from "@solana/web3.js";
import {
    getAgentPDA,
    getL1Program,
    getAgentStatus,
    shortenAddress,
    hashToHex,
    ER_VALIDATOR,
    PROGRAM_ID,
} from "@/lib/anchor-client";
import {
    ShieldAlert,
    Activity,
    Zap,
    RefreshCw,
    Rocket,
    ArrowRight,
    ExternalLink,
    Hash,
    User,
    Cpu,
} from "lucide-react";
import Link from "next/link";

// Agent state from on-chain
interface AgentData {
    owner: string;
    teeNode: string;
    actionCount: number;
    lastActionHash: string;
    pda: string;
    exists: boolean;
    delegated: boolean;
}

export default function DashboardPage() {
    const { publicKey, wallet, signMessage } = useWallet();
    const { connection } = useConnection();
    const walletAdapter = useWallet();

    const [agent, setAgent] = useState<AgentData | null>(null);
    const [loading, setLoading] = useState(false);
    const [actionInProgress, setActionInProgress] = useState<string | null>(null);
    const [txSignature, setTxSignature] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch agent state from L1
    const fetchAgent = useCallback(async () => {
        if (!publicKey || !connection) return;
        setLoading(true);
        setError(null);

        try {
            const [agentPda] = getAgentPDA(publicKey);
            const status = await getAgentStatus(connection, agentPda);

            if (status === "none") {
                setAgent({ owner: "", teeNode: "", actionCount: 0, lastActionHash: "", pda: agentPda.toBase58(), exists: false, delegated: false });
            } else if (status === "delegated") {
                // Agent is delegated — can't deserialize from L1
                setAgent({
                    owner: publicKey.toBase58(),
                    teeNode: "(delegated to ER)",
                    actionCount: -1,
                    lastActionHash: "(state in ER)",
                    pda: agentPda.toBase58(),
                    exists: true,
                    delegated: true,
                });
            } else {
                // Deserialize using Anchor
                const program = getL1Program(connection, walletAdapter as any);
                const agentState = await (program.account as any).agentState.fetch(agentPda);
                setAgent({
                    owner: agentState.owner.toBase58(),
                    teeNode: agentState.teeNode.toBase58(),
                    actionCount: agentState.actionCount.toNumber(),
                    lastActionHash: hashToHex(agentState.lastActionHash),
                    pda: agentPda.toBase58(),
                    exists: true,
                    delegated: false,
                });
            }
        } catch (e: any) {
            console.error("Fetch error:", e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [publicKey, connection, walletAdapter]);

    useEffect(() => {
        fetchAgent();
    }, [fetchAgent]);

    // Initialize Agent on L1
    const handleInitialize = async () => {
        if (!publicKey || !connection) return;
        setActionInProgress("Initializing Agent on L1...");
        setTxSignature(null);
        setError(null);

        try {
            const program = getL1Program(connection, walletAdapter as any);
            const teeNode = Keypair.generate();
            const [agentPda] = getAgentPDA(publicKey);

            const tx = await (program.methods as any)
                .initializeAgent(teeNode.publicKey)
                .accounts({
                    agent: agentPda,
                    owner: publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .rpc();

            setTxSignature(tx);
            setActionInProgress(null);
            await fetchAgent();
        } catch (e: any) {
            console.error("Init error:", e);
            setError(e.message?.includes("already in use") ? "Agent already exists!" : e.message);
            setActionInProgress(null);
        }
    };

    // Delegate Agent to ER
    const handleDelegate = async () => {
        if (!publicKey || !connection) return;
        setActionInProgress("Delegating Agent to Ephemeral Rollup...");
        setTxSignature(null);
        setError(null);

        try {
            const program = getL1Program(connection, walletAdapter as any);
            const [agentPda] = getAgentPDA(publicKey);

            const tx = await (program.methods as any)
                .delegateAgent(publicKey)
                .accounts({
                    payer: publicKey,
                    pda: agentPda,
                })
                .remainingAccounts([
                    { pubkey: ER_VALIDATOR, isSigner: false, isWritable: false },
                ])
                .rpc();

            setTxSignature(tx);
            setActionInProgress(null);
        } catch (e: any) {
            console.error("Delegate error:", e);
            setError(e.message);
            setActionInProgress(null);
        }
    };

    if (!publicKey) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center mx-auto mb-8">
                        <ShieldAlert className="text-white" size={40} />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Connect Wallet</h1>
                    <p className="text-gray-400 mb-8">
                        Connect your Phantom wallet to manage your Spectre agents on Solana Devnet.
                    </p>
                    <WalletConnectButton />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <div className="flex items-center space-x-3 mb-1">
                            <ShieldAlert className="text-blue-500" size={28} />
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                                Spectre Dashboard
                            </h1>
                        </div>
                        <p className="text-gray-500 text-sm">Real-time on-chain agent management · Devnet</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/demo" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                            Live Demo →
                        </Link>
                        <div className="px-4 py-2 rounded-full border border-gray-800 bg-gray-900/50 font-mono text-sm text-emerald-400">
                            {shortenAddress(publicKey.toBase58())}
                        </div>
                    </div>
                </header>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-900/20 border border-red-800 text-red-300 text-sm">
                        {error}
                        <button onClick={() => setError(null)} className="ml-4 underline">dismiss</button>
                    </div>
                )}

                {/* Action In Progress Banner */}
                {actionInProgress && (
                    <div className="mb-6 p-4 rounded-xl bg-blue-900/20 border border-blue-800 text-blue-300 text-sm flex items-center">
                        <RefreshCw size={16} className="mr-3 animate-spin" />
                        {actionInProgress}
                    </div>
                )}

                {/* Tx Success Banner */}
                {txSignature && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-900/20 border border-emerald-800 text-emerald-300 text-sm flex items-center justify-between">
                        <span>✅ Transaction confirmed!</span>
                        <a
                            href={`https://solscan.io/tx/${txSignature}?cluster=devnet`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-emerald-400 hover:underline"
                        >
                            View on Solscan <ExternalLink size={14} className="ml-1" />
                        </a>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <RefreshCw size={32} className="animate-spin text-gray-500" />
                    </div>
                ) : !agent?.exists ? (
                    /* No Agent State */
                    <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-16 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Rocket className="text-blue-400" size={36} />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Deploy Your First Agent</h2>
                        <p className="text-gray-400 mb-2 max-w-md mx-auto">
                            Initialize an on-chain Agent PDA and delegate it to MagicBlock{"'"}s Ephemeral Rollup for gasless execution.
                        </p>
                        <p className="text-gray-600 font-mono text-xs mb-8">
                            PDA: {shortenAddress(agent?.pda || "")}
                        </p>
                        <button
                            onClick={handleInitialize}
                            disabled={!!actionInProgress}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 rounded-xl text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/30"
                        >
                            Deploy Agent to Devnet
                        </button>
                    </div>
                ) : (
                    /* Agent Exists — Show State */
                    <div className="space-y-6">
                        {/* Agent Card */}
                        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600/30 to-emerald-500/30 flex items-center justify-center">
                                        <Activity className="text-blue-400" size={28} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Spectre Agent</h2>
                                        <p className="text-gray-500 font-mono text-xs mt-1">{agent.pda}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={fetchAgent}
                                        className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
                                        title="Refresh"
                                    >
                                        <RefreshCw size={16} className="text-gray-400" />
                                    </button>
                                    <button
                                        onClick={handleDelegate}
                                        disabled={!!actionInProgress}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center"
                                    >
                                        <Zap size={16} className="mr-2" /> Delegate to ER
                                    </button>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <StatCard icon={<User size={18} />} label="Owner" value={shortenAddress(agent.owner)} color="text-blue-400" />
                                <StatCard icon={<Cpu size={18} />} label="TEE Node" value={shortenAddress(agent.teeNode)} color="text-emerald-400" />
                                <StatCard icon={<Zap size={18} />} label="Action Count" value={agent.actionCount.toString()} color="text-amber-400" />
                                <StatCard icon={<Hash size={18} />} label="Last Action Hash" value={agent.lastActionHash === "0".repeat(64) ? "None" : shortenAddress(agent.lastActionHash, 8)} color="text-purple-400" />
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <a
                                href={`https://solscan.io/account/${agent.pda}?cluster=devnet`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-gray-900/40 border border-gray-800 rounded-xl hover:border-gray-600 transition-all group"
                            >
                                <div className="flex items-center text-gray-300">
                                    <ExternalLink size={18} className="mr-3 text-gray-500" />
                                    View Agent on Solscan
                                </div>
                                <ArrowRight size={16} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
                            </a>
                            <Link
                                href="/demo"
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-all group"
                            >
                                <div className="flex items-center text-blue-300">
                                    <Rocket size={18} className="mr-3" />
                                    Run Full ER Lifecycle Demo
                                </div>
                                <ArrowRight size={16} className="text-blue-500 group-hover:translate-x-1 transition-all" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
    return (
        <div className="bg-black/30 border border-gray-800/60 rounded-xl p-4">
            <div className={`flex items-center space-x-2 mb-2 ${color}`}>
                {icon}
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
            </div>
            <div className="text-lg font-bold font-mono text-white truncate">{value}</div>
        </div>
    );
}
