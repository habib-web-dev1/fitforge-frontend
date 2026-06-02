"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "./Providers";
import {
  Menu,
  X,
  Sun,
  Moon,
  Dumbbell,
  User,
  LogOut,
  LayoutDashboard,
  Compass,
  BookOpen,
  Info,
  Mail,
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const pathname = usePathname();

  const loggedOutRoutes = [
    { name: "Home", path: "/", icon: Dumbbell },
    { name: "Explore Routines", path: "/explore", icon: Compass },
    { name: "Fitness Blog", path: "/blog", icon: BookOpen },
    { name: "About Us", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const loggedInRoutes = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Explore Routines", path: "/explore", icon: Compass },
    { name: "My Workout Hub", path: "/dashboard/user/saved", icon: Dumbbell },
    { name: "Athlete Profile", path: "/dashboard/user/profile", icon: User },
    { name: "AI Gen History", path: "/dashboard/user/history", icon: BookOpen },
  ];

  // If user is admin, append Admin dashboard link to logged in routes
  if (session?.user?.role === "ADMIN") {
    loggedInRoutes.unshift({
      name: "Admin Control",
      path: "/dashboard/admin/analytics",
      icon: LayoutDashboard,
    });
  }

  const activeRoutes = session ? loggedInRoutes : loggedOutRoutes;

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 glass backdrop-blur-md transition-all duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-between rounded-xl bg-primary text-primary-foreground p-2 transition-transform duration-300 group-hover:rotate-12">
                <Dumbbell className="h-6 w-6" />
              </div>
              <span className="font-display text-xl font-extrabold tracking-tight">
                FIT<span className="text-primary">FORGE</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 ml-1 rounded bg-accent-neon/20 text-accent font-sans">
                  AI
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-1">
              {activeRoutes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                    isActive(route.path)
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <route.icon className="h-4 w-4" />
                  {route.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3 border-l border-border pl-4">
              {/* Theme Toggle button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-150"
                title={
                  theme === "dark"
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
                }
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-amber-500 animate-pulse" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Authentication interface items */}
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 rounded-full p-0.5 border-2 border-primary/40 focus:outline-none hover:border-primary transition-all duration-150"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold text-sm">
                      {session.user?.name ? (
                        session.user.name.charAt(0).toUpperCase()
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {profileDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setProfileDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-card border border-border p-2 shadow-2xl z-20 transition-all duration-200">
                        <div className="px-3 py-2 border-b border-border/60">
                          <p className="text-sm font-semibold truncate">
                            {session.user?.name || "Athlete"}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {session.user?.email}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/15 text-primary">
                            {session.user?.role} ATHLETE
                          </span>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/dashboard/user/profile"
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted text-foreground transition-colors"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <User className="h-4 w-4" /> Athlete Profile
                          </Link>
                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              signOut({ callbackUrl: "/" });
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-500/10 text-red-500 transition-colors text-left"
                          >
                            <LogOut className="h-4 w-4" /> Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 rounded-lg text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/95 shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Forge Plan Free
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-border/40 px-4 pt-2 pb-4 space-y-1">
          {activeRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                isActive(route.path)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <route.icon className="h-5 w-5" />
              {route.name}
            </Link>
          ))}
          <div className="border-t border-border/40 mt-3 pt-3">
            {session ? (
              <div className="space-y-2">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold truncate">
                    {session.user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session.user?.email}
                  </p>
                </div>
                <Link
                  href="/dashboard/user/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-base text-muted-foreground hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" /> Athlete Profile
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-base text-red-500 hover:bg-red-500/10 text-left"
                >
                  <LogOut className="h-5 w-5" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-2">
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold border border-border hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/95"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
