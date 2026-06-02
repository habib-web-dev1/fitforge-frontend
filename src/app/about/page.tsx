"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sparkles,
  Target,
  Zap,
  Users,
  Award,
  ShieldCheck,
  ArrowRight,
  Dumbbell,
  Brain,
  BarChart3,
  Flame,
  Globe,
  Heart,
  Star,
  CheckCircle,
} from "lucide-react";

const team = [
  {
    name: "Dr. Marcus Vance",
    role: "Chief Science Officer",
    bio: "Former NCAA strength coach and sports physiologist with 15 years researching mechanotransduction and neuromuscular adaptations. Leads FitForge's evidence-based algorithm development.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
    credentials: [
      "PhD Sports Science, Stanford",
      "CSCS Certified",
      "150+ peer-reviewed publications",
    ],
  },
  {
    name: "Elena Ristova",
    role: "Head of Nutrition AI",
    bio: "Registered Dietitian and precision nutrition specialist. Designed FitForge's macro-calibration engine, training it on clinical data from 12,000+ athlete profiles across six somatic categories.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    credentials: [
      "MS Clinical Nutrition, UCLA",
      "Registered Dietitian (RD)",
      "Olympic nutrition consultant",
    ],
  },
  {
    name: "David Pratt",
    role: "Lead AI Engineer",
    bio: "Ex-Google DeepMind engineer who built the agentic planning backbone of FitForge. Specializes in LLM fine-tuning for structured program generation and real-time biometric analysis.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
    credentials: [
      "BSc Computer Science, MIT",
      "Google DeepMind Alumni",
      "AI/ML Patent Holder x3",
    ],
  },
  {
    name: "Dr. Lyra Mensah",
    role: "Recovery & Sleep Science Lead",
    bio: "Sports medicine physician and circadian biology researcher. Oversees FitForge's recovery analytics module, integrating sleep staging data and HRV metrics with training load algorithms.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
    credentials: [
      "MD, Johns Hopkins Medicine",
      "Board-Certified Sports Medicine",
      "Sleep research fellow, NIH",
    ],
  },
];

const milestones = [
  {
    year: "2021",
    event:
      "FitForge founded in Silicon Valley by a team of sports scientists and AI engineers.",
  },
  {
    year: "2022",
    event:
      "Launched MVP with 500 beta athletes. Core AI blueprint generator reached 90%+ precision score.",
  },
  {
    year: "2023",
    event:
      "Series A funding secured. Expanded team to 40+ engineers, scientists, and coaches.",
  },
  {
    year: "2024",
    event:
      "Crossed 5,000 active athletes. Introduced Agent 2 scaling modifiers and daily undulating periodization engine.",
  },
  {
    year: "2025",
    event:
      "Integrated Google Gemini 2.5 backbone. Launched Elite Coach tier with multi-athlete CRM dashboard.",
  },
  {
    year: "2026",
    event:
      "10,000+ athletes. 500,000+ AI-generated workouts. 150+ elite partner coaches worldwide.",
  },
];

const values = [
  {
    icon: Brain,
    color: "text-primary",
    bg: "bg-primary/10",
    title: "Science-First",
    desc: "Every algorithm, macro calculator, and training recommendation is grounded in peer-reviewed sports science and clinical nutrition research.",
  },
  {
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    title: "Athlete-Centered",
    desc: "We build tools for real people with real goals — from first-time gym-goers to competitive athletes preparing for national-level events.",
  },
  {
    icon: ShieldCheck,
    color: "text-green-500",
    bg: "bg-green-500/10",
    title: "Privacy & Trust",
    desc: "Your biometric data and health information never leaves our encrypted infrastructure. We are SOC 2 Type II compliant and GDPR-ready.",
  },
  {
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    title: "Continuous Innovation",
    desc: "Our AI agents are continuously retrained on emerging research, ensuring the plans you receive reflect the latest understanding in exercise physiology.",
  },
  {
    icon: Globe,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    title: "Globally Accessible",
    desc: "From calisthenics athletes in Cape Town to marathon runners in Oslo, FitForge adapts to any environment, equipment level, or dietary culture.",
  },
  {
    icon: Heart,
    color: "text-red-500",
    bg: "bg-red-500/10",
    title: "Inclusive Fitness",
    desc: "We reject one-size-fits-all training. Our somatic-aware AI accounts for body type, mobility limitations, age, and experience level in every plan.",
  },
];

const stats = [
  {
    value: "10,000+",
    label: "Active Athletes",
    icon: Users,
    color: "text-primary",
  },
  {
    value: "500,000+",
    label: "Workouts Generated",
    icon: Dumbbell,
    color: "text-amber-400",
  },
  {
    value: "99.4%",
    label: "AI Precision Score",
    icon: Brain,
    color: "text-green-400",
  },
  {
    value: "150+",
    label: "Elite Partner Coaches",
    icon: Award,
    color: "text-blue-400",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 space-y-0">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-20 pb-20 border-b border-border/20 bg-secondary/5 dark:bg-card/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5" /> Our Mission
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-foreground max-w-4xl mx-auto leading-tight">
              Built by Athletes.{" "}
              <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
                Powered by Science.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              FitForge was born from a simple frustration: generic fitness apps
              that ignore individual biology. We combined elite sports science,
              clinical nutrition, and cutting-edge AI to build the world's first
              truly personalized performance platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link
                href="/auth/register"
                className="px-8 py-4 rounded-xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/95 shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 group justify-center"
              >
                Start Forging Free{" "}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/explore"
                className="px-8 py-4 rounded-xl text-base font-semibold border border-border hover:bg-muted text-foreground transition-all flex items-center gap-2 justify-center"
              >
                Explore Blueprints <Dumbbell className="h-5 w-5 text-primary" />
              </Link>
            </div>
          </div>

          {/* Background decorative blobs */}
          <div className="absolute top-10 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 h-48 w-48 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        </section>

        {/* ── Stats Band ── */}
        <section className="py-14 bg-secondary text-secondary-foreground border-b border-border/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s) => (
                <div key={s.label} className="space-y-1">
                  <s.icon className={`mx-auto h-6 w-6 mb-2 ${s.color}`} />
                  <p
                    className={`text-3xl sm:text-4xl font-extrabold font-display ${s.color}`}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="py-20 bg-background border-b border-border/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                  <Target className="h-3.5 w-3.5" /> What We Stand For
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                  Precision Training for Every Body Type
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Most fitness apps hand you a cookie-cutter 12-week program and
                  call it personalization. We disagree. Your biology is unique —
                  your somatic profile, metabolic rate, training history, and
                  recovery capacity all determine what actually works for you.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  FitForge's agentic AI reads your biometric inputs and
                  constructs a program from the ground up — not from a template.
                  Every rep scheme, macro split, and deload timing is calculated
                  for your specific physiology.
                </p>
                <ul className="space-y-2">
                  {[
                    "Somatic-aware macro calculations",
                    "Progressive overload algorithms based on your 1RM history",
                    "Sleep and recovery metrics integrated into load management",
                    "Real-time plan adjustments via AI coach feedback",
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-border/60 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800"
                    alt="Athlete training in a gym"
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card border border-border/60 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        AI Precision Score
                      </p>
                      <p className="text-xl font-extrabold text-primary font-display">
                        99.4%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="py-20 bg-secondary/5 dark:bg-card/5 border-b border-border/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                <Star className="h-3.5 w-3.5" /> Our Principles
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                What Drives Everything We Build
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Six core values that guide every decision — from algorithm
                design to product features.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="border border-border/60 rounded-2xl p-6 bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`h-12 w-12 rounded-xl ${v.bg} flex items-center justify-center mb-4`}
                  >
                    <v.icon className={`h-6 w-6 ${v.color}`} />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="py-20 bg-background border-b border-border/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                <Users className="h-3.5 w-3.5" /> The Team
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Meet the Minds Behind FitForge
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A multidisciplinary team of sports scientists, registered
                dietitians, AI engineers, and elite coaches.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="border border-border/60 rounded-2xl bg-card overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-56 relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="font-display font-bold text-white text-sm leading-tight">
                        {member.name}
                      </p>
                      <p className="text-[10px] text-white/80 font-semibold">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                    <ul className="space-y-1">
                      {member.credentials.map((c) => (
                        <li
                          key={c}
                          className="flex items-center gap-1.5 text-[10px] text-muted-foreground/80"
                        >
                          <CheckCircle className="h-3 w-3 text-primary shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline / Milestones ── */}
        <section className="py-20 bg-secondary/5 dark:bg-card/5 border-b border-border/20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                <Flame className="h-3.5 w-3.5" /> Our Journey
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                From Idea to 10,000 Athletes
              </h2>
            </div>
            <div className="relative space-y-0">
              {/* Vertical line */}
              <div className="absolute left-[20px] top-2 bottom-2 w-0.5 bg-border/60 hidden sm:block" />
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className="flex gap-6 items-start pb-8 last:pb-0 relative"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold font-display text-xs flex items-center justify-center shadow-lg shadow-primary/20 relative z-10">
                    {m.year.slice(2)}
                  </div>
                  <div className="flex-1 border border-border/60 rounded-2xl bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-xs font-bold text-primary">
                      {m.year}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {m.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 bg-secondary text-secondary-foreground">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Ready to Forge Your Legacy?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join 10,000+ athletes already training smarter with FitForge AI —
              your biology-driven performance partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="px-8 py-4 rounded-xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/95 shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 group justify-center"
              >
                Get Started Free{" "}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl text-base font-semibold border border-border/40 hover:bg-white/5 text-white transition-all flex items-center gap-2 justify-center"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
