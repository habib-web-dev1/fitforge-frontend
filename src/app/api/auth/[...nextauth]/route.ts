import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// authorize() runs server-side on Vercel.
// We call our own proxy (/api/backend/auth/login) which:
//   1. runs server-to-server (no CORS)
//   2. injects x-vercel-protection-bypass header automatically
// NEXTAUTH_URL must be set in Vercel env vars so this absolute URL resolves.
function getLoginUrl(): string {
  const base =
    process.env.NEXTAUTH_URL || "https://fitforge-frontend-ten.vercel.app";
  return `${base}/api/backend/auth/login`;
}

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

        try {
          const response = await fetch(getLoginUrl(), {
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
        } catch (err: any) {
          throw new Error(err.message || "Login failed. Please try again.");
        }
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
