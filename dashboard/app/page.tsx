import { WalletConnectButton } from "@/components/wallet-connect-button";
import { ShieldAlert, Cpu, Lock, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="text-blue-500" size={24} />
            <span className="text-xl font-bold tracking-tighter">Spectre</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/demo" className="text-sm text-gray-400 hover:text-white transition-colors">Live Demo</Link>
            <WalletConnectButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 pt-16">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm text-gray-300 font-medium">Powered by MagicBlock Ephemeral Rollups</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Confidential AI Agents <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
              Unstoppable Execution
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Deploy autonomous AI agents inside MagicBlock Ephemeral Rollups. Gasless execution, sub-second latency, cryptographic state integrity on Solana.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-8 py-3 bg-black rounded-lg border border-white/10 text-white font-semibold">
                Launch Dashboard →
              </div>
            </Link>
            <Link href="/demo" className="px-8 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 text-gray-200 font-medium transition-colors">
              View Live Demo
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 relative z-10">
          <FeatureCard
            icon={<Lock className="text-blue-400" size={24} />}
            title="Ephemeral Rollups"
            description="Delegate PDA state to a dedicated validator for gasless execution loops without L1 latency or transaction costs."
          />
          <FeatureCard
            icon={<Zap className="text-amber-400" size={24} />}
            title="Gasless Compute"
            description="Execute unlimited actions inside the ER at sub-second latency. Zero gas fees. State commits back to L1 atomically."
          />
          <FeatureCard
            icon={<Cpu className="text-emerald-400" size={24} />}
            title="Cryptographic Integrity"
            description="Every action is hash-chained. State roundtrips L1→ER→L1 with full verifiability. Judges can check on Solscan."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
      <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  )
}
