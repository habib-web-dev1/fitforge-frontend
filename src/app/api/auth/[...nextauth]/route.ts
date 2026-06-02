import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { FitForgeApi } from '@/services/api';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'FitForge AI',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password');
        }

        try {
          const res = await FitForgeApi.auth.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (res.success && res.data) {
            return {
              id: res.data.user.id,
              email: res.data.user.email,
              name: res.data.user.name,
              role: res.data.user.role,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            } as any;
          }
          return null;
        } catch (error: any) {
          throw new Error(error.message || 'Login failed. Invalid email or password.');
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
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
