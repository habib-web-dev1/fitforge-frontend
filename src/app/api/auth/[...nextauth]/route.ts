import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// NextAuth authorize() runs server-to-server — calls the backend directly.
// No CORS issue. No proxy needed. No Vercel protection issue (server-to-server
// requests with no browser origin are allowed through by Vercel protection).
const BACKEND_URL =
  process.env.BACKEND_URL ||
  "https://fitforge-backend-md-ahsan-habibs-projects-f65cbd92.vercel.app";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "FitForge AI",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password");
        }

        const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const res = await response.json().catch(() => null);

        if (!response.ok || !res?.success) {
          throw new Error(res?.message || "Invalid email or password");
        }

        return {
          id: res.data.user.id,
          email: res.data.user.email,
          name: res.data.user.name,
          role: res.data.user.role,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
