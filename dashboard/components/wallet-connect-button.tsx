"use client";

import { useEffect } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { SigninMessage } from "@/utils/SigninMessage";
import bs58 from "bs58";

export function WalletConnectButton() {
    const { data: session, status } = useSession();
    const wallet = useWallet();
    const walletModal = useWalletModal();

    const handleSignIn = async () => {
        try {
            if (!wallet.connected) {
                walletModal.setVisible(true);
                return;
            }

            const csrf = await getCsrfToken();
            if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

            const message = new SigninMessage({
                domain: window.location.host,
                publicKey: wallet.publicKey.toBase58(),
                statement: `Sign this message to authenticate with Spectre.`,
                nonce: csrf,
            });

            const data = new TextEncoder().encode(message.prepare());
            const signature = await wallet.signMessage(data);
            const serializedSignature = bs58.encode(signature);

            // Authenticate with NextAuth
            await signIn("credentials", {
                message: JSON.stringify(message),
                redirect: false,
                signature: serializedSignature,
            });
        } catch (error) {
            console.log("Sign in error:", error);
        }
    };

    useEffect(() => {
        if (wallet.connected && status === "unauthenticated") {
            handleSignIn();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet.connected, status]);

    const truncate = (str: string) => `${str.slice(0, 4)}…${str.slice(-4)}`;

    if (status === "loading") {
        return (
            <button className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-500 cursor-not-allowed">
                Loading...
            </button>
        );
    }

    if (session?.user?.name) {
        return (
            <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-md border border-emerald-400/20">
                    {truncate(session.user.name)}
                </span>
                <button
                    onClick={() => {
                        signOut({ redirect: false });
                        wallet.disconnect();
                    }}
                    className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors border border-zinc-700"
                >
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleSignIn}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20"
        >
            Connect Wallet
        </button>
    );
}
