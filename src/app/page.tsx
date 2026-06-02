'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AiCoachChat from '@/components/AiCoachChat';
import { 
  Sparkles, ArrowRight, ShieldCheck, Zap, BarChart3, ChevronDown, 
  Play, Users, Award, Star, Mail, Check, Dumbbell, Flame, Target, Compass
} from 'lucide-react';

export default function Home() {
  // Typing animation goals
  const goals = ["Build Muscle", "Lose Fat", "Optimize Endurance", "Forge Elite Power"];
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // FAQ Expandable indexes
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Auto typing logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentGoal = goals[currentGoalIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(currentGoal.slice(0, displayedText.length + 1));
      }, 100);
    }

    if (!isDeleting && displayedText === currentGoal) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Wait 2s before delete
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentGoalIndex(prev => (prev + 1) % goals.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentGoalIndex]);

  // FAQ Data
  const faqs = [
    {
      q: "How does the Agentic AI plan builder work?",
      a: "Unlike standard static tools, FitForge AI acts as a background agent. It scans your starting metrics (weight, height, and target macros) and designs step-by-step routines. The AI agent runs active optimizations programmatically behind the scenes."
    },
    {
      q: "Can I swap routine segments or modify meal ingredients?",
      a: "Yes! Using our Agent 2 (Tone & Scale Modifier), you can click any workout or meal segment and instantly scale it. You can progressive overload the reps/sets, swap ingredients for vegan/keto alternatives, or expand form instructions."
    },
    {
      q: "Is there a free trial tier available?",
      a: "Absolutely. Our Free Tier offers access to public community blueprints and standard AI assistant prompts, letting you explore the planner tools without entering credit card details."
    },
    {
      q: "Can I connect the API to third-party fitness hardware?",
      a: "Our Premium tiers include dedicated webhook triggers and schema access, allowing professional coaches to link FitForge AI data structure to external tracking dashboards seamlessly."
    }
  ];

  // Pricing Data
  const pricingTiers = [
    {
      name: "Free Athlete",
      price: "$0",
      desc: "Perfect for beginners exploring AI-assisted workout tracking.",
      features: [
        "Access to public templates grid",
        "10 AI Routine Generations / month",
        "Standard Biometrics tracker dashboard",
        "FitForge AI Coach standard chat access"
      ],
      cta: "Start Forging Free",
      popular: false
    },
    {
      name: "Pro Athlete",
      price: "$29",
      desc: "For serious training seeking advanced progression algorithms.",
      features: [
        "Unlimited custom routine drafts",
        "Advanced Agent 2 plan scaling modifiers",
        "Full biometric history and macro adjustments",
        "High-priority Google Gemini 2.5 response keys",
        "Active booking calendars tracking"
      ],
      cta: "Forge Pro Plan",
      popular: true
    },
    {
      name: "Elite Coach Split",
      price: "$89",
      desc: "For personal trainers and nutrition coaches managing teams.",
      features: [
        "All Pro Athlete features included",
        "Multi-athlete dashboard trackers",
        "Admin reviews curator & AI Review Summarizers",
        "Custom branded workspace profiles",
        "Priority 24/7 athletic engineer support"
      ],
      cta: "Forge Team Elite",
      popular: false
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterError('Please enter a valid athletic email address.');
      setNewsletterSuccess(false);
      return;
    }
    setNewsletterError('');
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 border-b border-border/20 bg-secondary/5 dark:bg-card/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Tagline Sparks */}
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold bg-primary/10 text-primary border border-primary/20 mb-6 uppercase tracking-wider animate-pulse">
            <Sparkles className="h-3.5 w-3.5 text-accent-neon fill-accent-neon" /> Next-Generation Agentic Performance
          </div>

          {/* Title */}
          <h1 className="max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
            Forge Your Fitness Legacy with <br />
            <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
              Dynamic AI Planning
            </span>
          </h1>

          {/* Subtitle / Dynamic typing text */}
          <p className="max-w-2xl text-lg text-muted-foreground mb-8 leading-relaxed">
            Stop guessing your sets, reps, and macros. Define your biometrics, choose a blueprint, and let background AI agents optimize your track splits to{' '}
            <span className="font-bold text-foreground border-b-2 border-primary pb-0.5 inline-block min-w-[190px] text-primary">
              {displayedText}
              <span className="animate-ping">|</span>
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/auth/register"
              className="px-8 py-4 rounded-xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/95 shadow-lg shadow-primary/25 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
            >
              Forge Your Plan Free <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/explore"
              className="px-8 py-4 rounded-xl text-base font-semibold border border-border hover:bg-muted text-foreground transition-all flex items-center gap-2 cursor-pointer"
            >
              Explore Blueprints <Compass className="h-5 w-5 text-primary" />
            </Link>
          </div>

          {/* Interactive visual mockup display */}
          <div className="w-full max-w-4xl border border-border/80 rounded-2xl p-4 glass shadow-2xl relative">
            <div className="absolute top-2 left-4 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="bg-background/90 dark:bg-card/90 rounded-xl p-6 text-left border border-border/40 font-mono text-sm leading-relaxed overflow-x-auto text-muted-foreground select-none">
              <span className="text-primary font-bold">fitforge-agent-1$</span> initiate --goal="Hypertrophy PPL Split" --biometrics="weight:80kg,height:180cm"<br />
              <span className="text-accent font-semibold">[Agent]</span> Reading biometrics target matrices... Done. (Carbs: 250g | Protein: 180g | Fat: 70g)<br />
              <span className="text-accent font-semibold">[Agent]</span> Generating customized 3-day split layout...<br />
              <span className="text-foreground">PUSH DAY: Flat Barbell Bench Press (4x8 reps, 80kg) | Rest: 120s</span><br />
              <span className="text-foreground">PULL DAY: Weighted Pullups (3x6 reps, +10kg) | Rest: 90s</span><br />
              <span className="text-primary font-bold">fitforge-agent-1$</span> <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES CARD GRID */}
      <section id="features" className="py-20 bg-background border-b border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Agentic SaaS Capabilities
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our AI background agents run calculations autonomously, keeping your routines aligned with your gains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-border/60 rounded-2xl p-6 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">AI Program Drafting</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Provide available equipment and food preferences. Our Draft Agent designs highly structured day segments with proper rep load sets instantly.
              </p>
            </div>

            <div className="border border-border/60 rounded-2xl p-6 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-12 w-12 rounded-xl bg-accent-neon/15 text-accent flex items-center justify-center mb-4">
                <Flame className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Tone & Calorie Swap</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Scale any plan day instantly. Swap animal-based meals to organic vegan options, increase progression weights, or add coaching form details.
              </p>
            </div>

            <div className="border border-border/60 rounded-2xl p-6 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Biometrics Tracker</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Monitor your current weight and height charts. Our dashboards aggregate your macro history, calories calculated, and completed plan statistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="py-20 bg-secondary/5 dark:bg-card/5 border-b border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Follow our simple, streamlined workflow to deploy your customized athletic plans.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold font-display text-lg flex items-center justify-center mb-4 relative z-10 shadow-lg shadow-primary/20">
                1
              </div>
              <h3 className="font-display font-bold text-base mb-2">Pick Goal</h3>
              <p className="text-xs text-muted-foreground max-w-[180px]">
                Choose standard hypertrophy muscle gains, endurance, or customized nutrition keto/diet goals.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold font-display text-lg flex items-center justify-center mb-4 relative z-10 shadow-lg shadow-primary/20">
                2
              </div>
              <h3 className="font-display font-bold text-base mb-2">Enter Biometrics</h3>
              <p className="text-xs text-muted-foreground max-w-[180px]">
                Log your starting weight, height, and target macros on your profile settings.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold font-display text-lg flex items-center justify-center mb-4 relative z-10 shadow-lg shadow-primary/20">
                3
              </div>
              <h3 className="font-display font-bold text-base mb-2">AI Drafts Split</h3>
              <p className="text-xs text-muted-foreground max-w-[180px]">
                Our agent drafts a step-by-step program complete with proper reps, sets, and calories.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold font-display text-lg flex items-center justify-center mb-4 relative z-10 shadow-lg shadow-primary/20">
                4
              </div>
              <h3 className="font-display font-bold text-base mb-2">Track & Train</h3>
              <p className="text-xs text-muted-foreground max-w-[180px]">
                Log workouts logged this month, track active bookings, and consult the AI coach sidebar anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POPULAR BLUEPRINTS CARDS SECTION */}
      <section className="py-20 bg-background border-b border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Popular Fitness Blueprints
              </h2>
              <p className="text-muted-foreground">
                Get started instantly with templates configured and tested by our elite athletes.
              </p>
            </div>
            <Link
              href="/explore"
              className="mt-4 sm:mt-0 px-5 py-2.5 rounded-lg border border-border text-sm font-semibold hover:bg-muted text-primary flex items-center gap-1.5 transition-all cursor-pointer"
            >
              Browse All Templates <ChevronDown className="h-4 w-4 -rotate-90 text-primary" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Template Card 1 */}
            <div className="border border-border/60 rounded-2xl overflow-hidden bg-card flex flex-col hover:shadow-lg transition-all duration-300 group">
              <div className="h-44 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground uppercase">
                  Hypertrophy
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-base text-foreground mb-1">Push-Pull-Legs Split</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                  Maximize progressive overload splits with compound pulls and pushes. Perfect for commercial gym setups.
                </p>
                <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-foreground">5.0</span>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    FREE PLAN
                  </span>
                </div>
              </div>
            </div>

            {/* Template Card 2 */}
            <div className="border border-border/60 rounded-2xl overflow-hidden bg-card flex flex-col hover:shadow-lg transition-all duration-300 group">
              <div className="h-44 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544033527-b192daee1f5b?q=80&w=600')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-accent text-accent-foreground uppercase">
                  Keto Diet
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-base text-foreground mb-1">Ketogenic Shred Protocol</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                  High fat, moderate protein meal routine splits. Calculated to optimize standard fat metabolism cycles.
                </p>
                <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-foreground">4.8</span>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    FREE PLAN
                  </span>
                </div>
              </div>
            </div>

            {/* Template Card 3 */}
            <div className="border border-border/60 rounded-2xl overflow-hidden bg-card flex flex-col hover:shadow-lg transition-all duration-300 group">
              <div className="h-44 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground uppercase">
                  HIIT Endurance
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-base text-foreground mb-1">Tabata Core Burnout</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                  High-intensity intervals designed to burn maximum active calories with zero commercial equipment needed.
                </p>
                <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-foreground">4.9</span>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    FREE PLAN
                  </span>
                </div>
              </div>
            </div>

            {/* Template Card 4 */}
            <div className="border border-border/60 rounded-2xl overflow-hidden bg-card flex flex-col hover:shadow-lg transition-all duration-300 group">
              <div className="h-44 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-secondary-foreground uppercase">
                  Strength
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-base text-foreground mb-1">5x5 Compound Heavy Load</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                  Focus heavily on squatting, deadlifts, and benching with strict progression schedules. Build absolute power.
                </p>
                <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-foreground">5.0</span>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    FREE PLAN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STATS SECTION */}
      <section className="py-16 bg-secondary text-secondary-foreground border-b border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-primary font-display mb-1">10,000+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Athletes</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-white font-display mb-1">500,000+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Workouts Generated</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-accent-neon font-display mb-1">99.4%</p>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">AI Precision Score</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-white font-display mb-1">150+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Elite Coaches</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING PLANS SECTION */}
      <section id="pricing" className="py-20 bg-background border-b border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Forge Pricing Splits
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select the pricing tier tailored exactly to your athletic training objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.name}
                className={`border rounded-2xl p-6 bg-card flex flex-col relative transition-all duration-300 hover:shadow-xl ${
                  tier.popular 
                    ? 'border-primary ring-2 ring-primary/20 scale-105 z-10' 
                    : 'border-border/60 hover:-translate-y-1'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                
                <h3 className="font-display text-xl font-bold text-foreground mb-1">{tier.name}</h3>
                <p className="text-xs text-muted-foreground mb-4 min-h-[32px]">{tier.desc}</p>
                
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold font-display text-foreground">{tier.price}</span>
                  <span className="text-xs text-muted-foreground">/ month</span>
                </div>

                <ul className="space-y-3 mb-8 text-sm flex-1">
                  {tier.features.map((f, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-xs leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/auth/register"
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-center transition-all ${
                    tier.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/95 shadow-md shadow-primary/25'
                      : 'border border-border hover:bg-muted text-foreground'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Pricing Matrix */}
          <div className="border border-border/60 rounded-2xl overflow-hidden hidden sm:block">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-secondary text-secondary-foreground">
                  <th className="p-4 font-bold text-white uppercase tracking-wider">Feature Comparison</th>
                  <th className="p-4 font-bold text-white uppercase tracking-wider text-center">Free</th>
                  <th className="p-4 font-bold text-white uppercase tracking-wider text-center">Pro</th>
                  <th className="p-4 font-bold text-white uppercase tracking-wider text-center">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/30">
                  <td className="p-4 font-semibold text-foreground">AI Plan Generations</td>
                  <td className="p-4 text-center text-muted-foreground">10 / month</td>
                  <td className="p-4 text-center font-bold text-primary">Unlimited</td>
                  <td className="p-4 text-center font-bold text-primary">Unlimited</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="p-4 font-semibold text-foreground">Agent 2 Scaling Modifiers</td>
                  <td className="p-4 text-center text-muted-foreground">Standard</td>
                  <td className="p-4 text-center font-bold text-accent">Active Neon</td>
                  <td className="p-4 text-center font-bold text-accent">Active Neon</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="p-4 font-semibold text-foreground">Team Management Panel</td>
                  <td className="p-4 text-center text-muted-foreground">No</td>
                  <td className="p-4 text-center text-muted-foreground">No</td>
                  <td className="p-4 text-center font-bold text-primary">Yes (Full CRM)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="py-20 bg-secondary/5 dark:bg-card/5 border-b border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Athlete Endorsements
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See what certified personal trainers and endurance athletes say about FitForge AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="border border-border/40 rounded-2xl p-6 bg-card flex flex-col shadow-sm">
              <div className="flex items-center gap-1.5 text-amber-500 mb-4">
                <Star className="h-4 w-4 fill-amber-500" />
                <Star className="h-4 w-4 fill-amber-500" />
                <Star className="h-4 w-4 fill-amber-500" />
                <Star className="h-4 w-4 fill-amber-500" />
                <Star className="h-4 w-4 fill-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed mb-6">
                "The Agent 2 Swapper simplifies PPL customization during heavy hypertrophy macro weeks. My athlete clients love how clean the formatted set logs print."
              </p>
              <div className="mt-auto flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  JS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">John Shrapnel</h4>
                  <p className="text-[10px] text-muted-foreground">Certified Personal Trainer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="border border-border/40 rounded-2xl p-6 bg-card flex flex-col shadow-sm">
              <div className="flex items-center gap-1.5 text-amber-500 mb-4">
                <Star className="h-4 w-4 fill-amber-500" />
                <Star className="h-4 w-4 fill-amber-500" />
                <Star className="h-4 w-4 fill-amber-500" />
                <Star className="h-4 w-4 fill-amber-500" />
                <Star className="h-4 w-4 fill-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed mb-6">
                "The macro target calorie adjustments updated on my profile settings are seamless. The Recharts dashboard allows me to track progression metrics beautifully."
              </p>
              <div className="mt-auto flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  MK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Michelle Karter</h4>
                  <p className="text-[10px] text-muted-foreground">Marathon Runner</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="border border-border/40 rounded-2xl p-6 bg-card flex flex-col shadow-sm">
              <div className="flex items-center gap-1.5 text-amber-500 mb-4">
                <Star className="h-4 w-4 fill-amber-500" />
                <Star className="h-4 w-4 fill-amber-500" />
                <Star className="h-4 w-4 fill-amber-500" />
                <Star className="h-4 w-4 fill-amber-500" />
                <Star className="h-4 w-4 fill-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed mb-6">
                "I ask the floating AI coach chat assistant about exercise alternatives for lower back pain, and the Gemini agent yields precise suggestions within seconds!"
              </p>
              <div className="mt-auto flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  DP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">David Pratt</h4>
                  <p className="text-[10px] text-muted-foreground">Olympic Weightlifter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section className="py-20 bg-background border-b border-border/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Common Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about the FitForge AI SaaS ecosystem.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border/60 rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-5 font-semibold text-sm hover:bg-muted/40 transition-colors text-left text-foreground cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 text-primary shrink-0 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === index && (
                  <div className="p-5 border-t border-border/40 text-xs text-muted-foreground leading-relaxed animate-in fade-in duration-200 bg-muted/10">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER SIGNUP SECTION */}
      <section className="py-20 bg-primary/5 dark:bg-card/5 border-b border-border/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-6">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-3">
            Elite Fitness Intelligence
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
            Subscribe to receive hyper-customized workout routines, progressive overload advice, and organic vegan meal swap lists directly.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 bg-card text-foreground text-sm rounded-xl border border-border px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/60"
            />
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/95 transition-all shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 text-xs uppercase tracking-wider cursor-pointer"
            >
              Subscribe
            </button>
          </form>

          {newsletterSuccess && (
            <p className="mt-4 text-xs font-semibold text-accent animate-in fade-in duration-200">
              ✓ Successfully signed up! Welcome to the FitForge intelligence dispatch.
            </p>
          )}
          {newsletterError && (
            <p className="mt-4 text-xs font-semibold text-red-500 animate-in fade-in duration-200">
              {newsletterError}
            </p>
          )}
        </div>
      </section>

      {/* Floating AI chat assistant sidebar widget */}
      <AiCoachChat />

      <Footer />
    </div>
  );
}
