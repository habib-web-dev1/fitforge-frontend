import React from "react";
import Link from "next/link";
import {
  Dumbbell,
  Globe,
  Send,
  Flame,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary border-t border-border/40 text-secondary-foreground mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand details */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground p-1.5">
                <Dumbbell className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                FIT<span className="text-primary">FORGE</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Forging hyper-customized fitness plans, meal splits, and tracking
              active routines autonomously using agentic AI.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Flame className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Site navigation columns */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-4">
              Core Ecosystem
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/explore"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Explore Blueprints
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Athlete Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Pricing Models
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-4">
              Company & Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  About Our Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Fitness Knowledge Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact coordinates */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@fitforge.ai</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (800) 555-PLAN</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Silicon Valley, California, USA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} FitForge AI. All rights reserved.
            Forging elite performance.
          </p>
        </div>
      </div>
    </footer>
  );
}
