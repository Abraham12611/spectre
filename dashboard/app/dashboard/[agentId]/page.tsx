import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Lock, Terminal, Box, Activity } from "lucide-react";
import Link from "next/link";

export default async function AgentDetailPage({ params }: { params: { agentId: string } }) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        redirect("/");
    }

    const { data: agent, error } = await supabase
        .from("agents")
        .select("*")
        .eq("id", params.agentId)
        .single();

    if (error || !agent || agent.owner_wallet !== session.user.name) {
        return <div className="p-8 text-white">Agent not found or unauthorized.</div>;
    }

    // Fetch encrypted logs
    const { data: logs } = await supabase
        .from("logs")
        .select("*")
        .eq("agent_id", params.agentId)
        .order("created_at", { ascending: false })
        .limit(50);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center text-gray-500 hover:text-white transition-colors mb-6 text-sm font-medium">
                        <ArrowLeft size={16} className="mr-2" /> back to dashboard
                    </Link>
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <h1 className="text-3xl font-bold">{agent.name}</h1>
                                <span className="px-3 py-1 text-xs font-semibold bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                                    {agent.status.toUpperCase()}
                                </span>
                            </div>
                            <p className="text-gray-400 font-mono text-sm">ID: {agent.id}</p>
                        </div>

                        <div className="flex space-x-3">
                            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                                Settings
                            </button>
                            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition-colors flex items-center">
                                <Lock size={16} className="mr-2" /> Shield Agent
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                            <h2 className="text-lg font-semibold flex items-center mb-6">
                                <Terminal className="mr-2 text-gray-400" size={20} /> Encrypted Execution Logs
                            </h2>

                            <div className="space-y-3">
                                {(!logs || logs.length === 0) ? (
                                    <div className="text-center py-8 text-gray-500">No logs generated yet.</div>
                                ) : (
                                    logs.map((log) => (
                                        <div key={log.id} className="p-4 rounded-xl bg-black/40 border border-gray-800/50 font-mono text-sm flex flex-col space-y-2">
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>{new Date(log.created_at).toLocaleString()}</span>
                                                <span className="flex items-center text-blue-500"><Lock size={12} className="mr-1" /> Encrypted</span>
                                            </div>
                                            <div className="text-emerald-400 break-all">
                                                {log.encrypted_log_data}
                                            </div>
                                            <div className="text-gray-400 text-xs">
                                                [Local Decryption Required]
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                                <Box size={16} className="mr-2" /> TEE Enclave
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Node Pubkey</label>
                                    <div className="font-mono text-sm text-gray-300 break-all bg-black/50 p-2 rounded">
                                        {agent.tee_node_id || "Not assigned"}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Attestation Status</label>
                                    <div className="flex items-center text-emerald-400 text-sm font-medium">
                                        <Activity size={16} className="mr-2" /> Verified
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-900/20 to-emerald-900/20 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
                            <h3 className="text-lg font-semibold text-white mb-2 relative z-10">MagicBlock ER</h3>
                            <p className="text-sm text-gray-400 mb-4 relative z-10">Agent state is currently delegated to the Ephemeral Rollup for gasless compute.</p>
                            <button className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm font-medium transition-colors relative z-10">
                                Commit & Undelegate
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
