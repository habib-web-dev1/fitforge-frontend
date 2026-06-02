'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/components/Providers';
import { 
  Dumbbell, User, BookOpen, LayoutDashboard, Compass, LogOut, Sun, Moon, 
  Users, Layers, MessageSquare, Settings, RefreshCw, Sparkles
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=' + encodeURIComponent(pathname));
    }
  }, [status, pathname]);

  if (status === 'loading') {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground">
        <RefreshCw className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-sm text-muted-foreground font-medium">Validating athlete session...</p>
      </div>
    );
  }

  if (!session) return null;

  const userNavigation = [
    { name: 'My Saved Blueprints', path: '/dashboard/user/saved', icon: Dumbbell },
    { name: 'Athlete Profile', path: '/dashboard/user/profile', icon: User },
    { name: 'AI Gen History', path: '/dashboard/user/history', icon: BookOpen },
  ];

  const adminNavigation = [
    { name: 'Fitness Analytics', path: '/dashboard/admin/analytics', icon: LayoutDashboard },
    { name: 'Manage Athletes', path: '/dashboard/admin/users', icon: Users },
    { name: 'Manage Blueprints', path: '/dashboard/admin/blueprints', icon: Layers },
    { name: 'Manage Reviews', path: '/dashboard/admin/reviews', icon: MessageSquare },
    { name: 'Engine Settings', path: '/dashboard/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Panel */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r border-border/40 bg-card z-20 shrink-0">
        {/* Brand */}
        <div className="flex h-16 items-center px-6 border-b border-border/40">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground p-1.5">
              <Dumbbell className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              FIT<span className="text-primary">FORGE</span>
            </span>
          </Link>
        </div>

        {/* Navigation list */}
        <div className="flex-1 flex flex-col justify-between py-6 px-4 space-y-8">
          <div className="space-y-6">
            {/* User navigation */}
            <div>
              <span className="block px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Athlete Center
              </span>
              <ul className="space-y-1">
                {userNavigation.map((route) => (
                  <li key={route.path}>
                    <Link
                      href={route.path}
                      className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg font-semibold transition-all ${
                        isActive(route.path)
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <route.icon className="h-4.5 w-4.5" />
                      {route.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Admin navigation */}
            {session.user?.role === 'ADMIN' && (
              <div>
                <span className="block px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                  Admin Panel <Sparkles className="h-3 w-3 text-accent-neon" />
                </span>
                <ul className="space-y-1">
                  {adminNavigation.map((route) => (
                    <li key={route.path}>
                      <Link
                        href={route.path}
                        className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg font-semibold transition-all ${
                          isActive(route.path)
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <route.icon className="h-4.5 w-4.5" />
                        {route.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Bottom user settings */}
          <div className="pt-4 border-t border-border/40 space-y-3">
            <div className="px-3 py-1 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Global Theme</span>
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
            
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-red-500 hover:bg-red-500/10 font-bold transition-all text-left cursor-pointer"
            >
              <LogOut className="h-4.5 w-4.5" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main workspace section */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="flex h-16 md:hidden items-center justify-between px-4 border-b border-border/40 bg-card z-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground p-1.5">
              <Dumbbell className="h-5 w-5" />
            </div>
            <span className="font-display text-base font-bold tracking-tight text-foreground">
              FIT<span className="text-primary">FORGE</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5 text-amber-500" /> : <Moon className="h-4.5 w-4.5" />}
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="p-2 rounded-lg border border-border hover:bg-red-500/10 text-red-500 cursor-pointer"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background">
          {/* Mobile bottom nav drawer list */}
          <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-4 border-b border-border/40 text-xs">
            {userNavigation.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 ${
                  isActive(route.path) ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground border border-border'
                }`}
              >
                {route.name}
              </Link>
            ))}
            {session.user?.role === 'ADMIN' && adminNavigation.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 ${
                  isActive(route.path) ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground border border-border'
                }`}
              >
                {route.name}
              </Link>
            ))}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
