'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSuccess(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Recover Password Split
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email and we'll dispatch reset coordinates.
            </p>
          </div>

          <div className="border border-border/60 rounded-2xl bg-card p-6 shadow-xl space-y-4">
            {success ? (
              <div className="text-center space-y-3 py-4 animate-in fade-in duration-200">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-neon/15 text-accent">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-sm text-foreground">Recovery Dispatch Complete</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  If an athlete account is linked with {email}, you will receive a reset password link shortly.
                </p>
                <div className="pt-2">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back to Log In
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      placeholder="athlete@fitforge.com"
                      className="w-full bg-background border border-border rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/45"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/95 transition-all shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  Send Recovery Link
                </button>

                <div className="text-center pt-2">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Return to Login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
