import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      role: 'USER' | 'ADMIN';
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role: 'USER' | 'ADMIN';
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'USER' | 'ADMIN';
    accessToken?: string;
    refreshToken?: string;
  }
}
