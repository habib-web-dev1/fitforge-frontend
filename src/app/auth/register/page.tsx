'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FitForgeApi } from '@/services/api';
import { Mail, Lock, User, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please complete all form fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await FitForgeApi.auth.register({
        name,
        email,
        password,
        role: 'USER', // Default to User athlete
      });

      if (res.success) {
        setSuccess('Athlete account forged successfully! Redirecting to sign in...');
        setTimeout(() => {
          router.push('/auth/login');
        }, 1500);
      } else {
        throw new Error(res.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during account forging.');
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
              Forge Your Athlete Account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Begin planning, generating, and tracking with Agentic AI today.
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

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground/60" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-background border border-border rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/45"
                  />
                </div>
              </div>

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
                    placeholder="john@fitforge.com"
                    className="w-full bg-background border border-border rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/45"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground/60" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="•••••••• (Min 6 chars)"
                    className="w-full bg-background border border-border rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/45"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/95 transition-all shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                {loading ? 'Forging Account...' : 'Forge Account'} <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Already have an athlete account?{' '}
            <Link href="/auth/login" className="text-primary hover:underline font-bold">
              Sign In Instead
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
