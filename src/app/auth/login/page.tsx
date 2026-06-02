'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Lock, Sparkles, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all credentials fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      setSuccess('Access granted. Redirecting to Athlete Workspace...');
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
      setLoading(false);
    }
  };

  const handleQuickLogin = async (role: 'user' | 'admin') => {
    setError('');
    setSuccess('');
    setLoading(true);

    const demoEmail = role === 'user' ? 'user@fitforge.com' : 'admin@fitforge.com';
    const demoPassword = '123456';

    setEmail(demoEmail);
    setPassword(demoPassword);

    try {
      const res = await signIn('credentials', {
        email: demoEmail,
        password: demoPassword,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      setSuccess(`Autofilled and authenticated as Demo ${role.toUpperCase()}. Redirecting...`);
      setTimeout(() => {
        router.push(role === 'admin' ? '/dashboard/admin/analytics' : '/dashboard');
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Demo authentication failed.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Athlete Workspace Sign In
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Welcome back. Let's resume your progression split.
            </p>
          </div>

          <div className="border border-border/60 rounded-2xl bg-card p-6 shadow-xl space-y-4">
            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 flex items-center gap-2 text-sm text-red-500 animate-in fade-in duration-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="rounded-xl bg-accent-neon/15 border border-accent-neon/20 p-3 flex items-center gap-2 text-sm text-accent animate-in fade-in duration-200">
                <UserCheck className="h-4 w-4 shrink-0" />
                <p>{success}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground/60" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@fitforge.com"
                    className="w-full bg-background border border-border rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/45"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Password
                  </label>
                  <Link href="/auth/forgot" className="text-xs text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground/60" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-background border border-border rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/45"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/95 transition-all shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Demo Autofill Keys</span>
              </div>
            </div>

            {/* Quick Login Auto-fills */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickLogin('user')}
                disabled={loading}
                className="py-2.5 px-3 rounded-xl border border-border text-xs font-semibold hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" /> User Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                disabled={loading}
                className="py-2.5 px-3 rounded-xl border border-border text-xs font-semibold hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-accent-neon" /> Admin Demo
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Don't have an athlete account?{' '}
            <Link href="/auth/register" className="text-primary hover:underline font-bold">
              Forge Account Free
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
