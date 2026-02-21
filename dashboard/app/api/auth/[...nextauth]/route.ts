import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SigninMessage } from "@/utils/SigninMessage";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Solana",
            credentials: {
                message: { label: "Message", type: "text" },
                signature: { label: "Signature", type: "text" },
            },
            async authorize(credentials) {
                try {
                    const signinMessage = new SigninMessage(
                        JSON.parse(credentials?.message || "{}")
                    );

                    const validationResult = await signinMessage.validate(
                        credentials?.signature || ""
                    );

                    if (!validationResult) {
                        throw new Error("Could not validate the signed message");
                    }

                    // Return user object with the wallet public key
                    return {
                        id: signinMessage.publicKey,
                        name: signinMessage.publicKey,
                    };
                } catch (e) {
                    console.error("Auth error:", e);
                    return null;
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.name = token.sub;
                // We can inject user's wallet address into the session object here
                (session as any).publicKey = token.sub;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
