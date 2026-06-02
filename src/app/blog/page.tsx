"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiCoachChat from "@/components/AiCoachChat";
import {
  BookOpen,
  User,
  Clock,
  Tag,
  ArrowRight,
  Search,
  Mail,
  Check,
  Flame,
  Dumbbell,
  Apple,
  Brain,
  Heart,
  Zap,
} from "lucide-react";

const articles = [
  {
    id: 1,
    title: "The Physiological Science of Progressive Overload",
    desc: "Micro-loading parameters and mechanotransduction pathways — discover how to systematically increment tension splits without causing nervous fatigue.",
    content:
      "Progressive overload is the foundation of muscular hypertrophy and strength. It relies on mechanotransduction, where muscle fibers convert mechanical tension into chemical growth signals. To prevent CNS exhaustion, athletes should cycle volume blocks, introducing micro-load increments of 1.5–2.5% weekly rather than rushing heavy compounds. Pair this with deload weeks every 4th cycle to allow neural recovery and maximize long-term gains.",
    tag: "Strength Science",
    tagColor: "bg-primary text-primary-foreground",
    author: "Dr. Marcus Vance",
    date: "May 28, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800",
    featured: true,
  },
  {
    id: 2,
    title: "Macro Calculations: Ectomorph vs. Endomorph Ratios",
    desc: "Calibrating target macros based on somatic profile structures. Optimize energy expenditure cycles autonomously.",
    content:
      "Somatic types influence metabolic rates and insulin sensitivity. Ectomorph profiles require a carb-dominant macro split (50% carbs, 30% protein, 20% fat) to sustain caloric surplus demands. Endomorph profiles thrive under fat-adapted splits (25% carbs, 40% protein, 35% fat) to control insulin spikes while preserving muscle mass.",
    tag: "Nutrition Theory",
    tagColor: "bg-amber-500 text-white",
    author: "Coach Elena Ristova",
    date: "June 01, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800",
    featured: false,
  },
  {
    id: 3,
    title: "Ketogenic Adaptation & Aerobic Endurance Splits",
    desc: "Evaluating respiratory quotient changes during fat-adapted marathon preparation. Fuel performance efficiently with ketones.",
    content:
      "Fat adaptation shifts the body's primary fuel source from glycogen to ketones. This lowers the Respiratory Quotient (RQ), meaning muscle cells burn less oxygen per unit of energy produced. For ultra-endurance runners, ketogenic adaptation prevents the dreaded 'bonking' phase by utilizing body fat reserves as a stable energy reservoir.",
    tag: "Endurance Prep",
    tagColor: "bg-blue-500 text-white",
    author: "David Pratt",
    date: "June 02, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800",
    featured: false,
  },
  {
    id: 4,
    title: "Sleep Optimization for Anabolic Hormone Production",
    desc: "How deep sleep cycles directly influence testosterone, growth hormone, and cortisol regulation for peak recovery.",
    content:
      "During Stage 3 and REM sleep, the pituitary gland releases the majority of its daily growth hormone (GH) pulse. Studies show that athletes sleeping fewer than 6 hours experience a 15–20% drop in testosterone levels, severely impairing muscle protein synthesis. Establishing a consistent 10 PM–6 AM sleep window, limiting blue light exposure post-7 PM, and supplementing with 400mg magnesium glycinate can significantly improve slow-wave sleep depth.",
    tag: "Recovery",
    tagColor: "bg-purple-500 text-white",
    author: "Dr. Lyra Mensah",
    date: "May 20, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800",
    featured: false,
  },
  {
    id: 5,
    title: "Creatine Monohydrate: The Evidence-Based Deep Dive",
    desc: "Breaking down phosphocreatine resynthesis kinetics and why creatine remains the most validated performance supplement.",
    content:
      "Creatine monohydrate replenishes phosphocreatine (PCr) stores used during explosive, high-intensity efforts like sprinting or heavy compound lifts. The scientific consensus from 500+ peer-reviewed studies confirms a 5–15% improvement in short-burst output. Loading protocol (20g/day split into 4 doses for 5 days) followed by maintenance (3–5g/day) produces full muscle saturation in roughly 7 days. Timing is less critical than previously thought — consistency matters most.",
    tag: "Supplementation",
    tagColor: "bg-green-600 text-white",
    author: "Coach Theo Harrington",
    date: "May 15, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800",
    featured: false,
  },
  {
    id: 6,
    title: "Periodization Models: Linear vs. Daily Undulating",
    desc: "Comparing LP and DUP frameworks for strength athletes — when to use each and how to transition between models.",
    content:
      "Linear Periodization (LP) increases load incrementally each week within a single rep range, making it ideal for beginners and intermediate lifters who need consistent progressive stress. Daily Undulating Periodization (DUP) alternates rep ranges across sessions within the same week (e.g., 3x5 Monday, 4x10 Wednesday, 5x15 Friday), stimulating multiple muscle fiber types simultaneously. Research suggests DUP produces 28% greater strength gains over 12 weeks compared to LP for advanced trainees.",
    tag: "Programming",
    tagColor: "bg-orange-500 text-white",
    author: "Dr. Marcus Vance",
    date: "May 10, 2026",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=800",
    featured: false,
  },
  {
    id: 7,
    title: "Zone 2 Cardio: Building Your Aerobic Base the Right Way",
    desc: "Why most athletes train too hard, too often — and how low-intensity steady-state cardio builds mitochondrial density.",
    content:
      "Zone 2 training (60–70% max heart rate) specifically targets slow-twitch Type I muscle fibers, stimulating mitochondrial biogenesis and fatty acid oxidation efficiency. Elite endurance coaches at training programs like those of high-level triathletes report athletes spending 80% of total training volume in Zone 2. For most gym-goers, this means 45–90 minutes of brisk walking, light cycling, or rowing at a conversational pace, 3–4 times per week. The result: dramatically improved aerobic capacity and faster recovery between high-intensity sessions.",
    tag: "Cardio Science",
    tagColor: "bg-cyan-500 text-white",
    author: "David Pratt",
    date: "May 5, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800",
    featured: false,
  },
  {
    id: 8,
    title: "Gut Microbiome & Athletic Performance: The Emerging Link",
    desc: "New research connects gut bacteria diversity to energy extraction efficiency, inflammation markers, and VO2 max scores.",
    content:
      "The gut-muscle axis is an emerging field showing that athletes with diverse microbiomes extract 8–12% more usable energy from identical diets compared to those with low microbial diversity. Lactobacillus and Bifidobacterium strains reduce systemic inflammation post-exercise by modulating cytokine production. High-fiber, fermented food intake (yogurt, kimchi, kefir) alongside 30+ unique plant species per week represents the most evidence-backed approach to optimizing the athletic microbiome.",
    tag: "Nutrition Science",
    tagColor: "bg-emerald-500 text-white",
    author: "Coach Elena Ristova",
    date: "April 28, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800",
    featured: false,
  },
];

const categories = [
  { label: "All Topics", value: "", icon: BookOpen },
  { label: "Strength Science", value: "Strength Science", icon: Dumbbell },
  { label: "Nutrition", value: "Nutrition", icon: Apple },
  { label: "Endurance", value: "Endurance Prep", icon: Flame },
  { label: "Recovery", value: "Recovery", icon: Heart },
  { label: "Programming", value: "Programming", icon: Brain },
  { label: "Cardio Science", value: "Cardio Science", icon: Zap },
];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const filtered = articles.filter((a) => {
    const matchesSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.tag.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "" ||
      a.tag.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes("@")) {
      setNewsletterSuccess(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        {/* ── Hero Header ── */}
        <div className="text-center py-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
            <BookOpen className="h-3.5 w-3.5" /> FitForge Intelligence Dispatch
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-foreground">
            Fitness & Nutrition Blog
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Scientific deep-dives, macronutrient calibration guides, and
            evidence-based programming strategies from elite coaches and sports
            scientists.
          </p>
        </div>

        {/* ── Search Bar ── */}
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground/60" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles, topics, or authors..."
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/50"
          />
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border hover:bg-muted text-muted-foreground"
              }`}
            >
              <cat.icon className="h-3.5 w-3.5" />
              {cat.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card">
            <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/30 mb-3" />
            <p className="font-display font-bold text-foreground">
              No articles found
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <>
            {/* ── Featured Article ── */}
            {featured && (
              <div className="border border-border/60 rounded-2xl overflow-hidden bg-card shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="h-64 sm:h-full min-h-[280px] relative overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary text-primary-foreground uppercase tracking-wider">
                    Featured
                  </span>
                </div>
                <div className="p-7 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span
                      className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${featured.tagColor}`}
                    >
                      {featured.tag}
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {featured.desc}
                    </p>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed">
                      {featured.content}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-primary" /> By{" "}
                      {featured.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                    </span>
                    <span className="text-muted-foreground/60">
                      {featured.date}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ── Article Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((art) => (
                <div
                  key={art.id}
                  className="border border-border/60 rounded-2xl bg-card overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span
                      className={`absolute top-3 left-3 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${art.tagColor}`}
                    >
                      {art.tag}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {art.desc}
                      </p>
                      <p className="text-xs text-muted-foreground/70 leading-relaxed line-clamp-3">
                        {art.content}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-primary" />{" "}
                        {art.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {art.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Newsletter CTA ── */}
        <div className="border border-primary/30 bg-primary/5 rounded-2xl p-8 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
            <Mail className="h-3.5 w-3.5" /> FitForge Weekly Intelligence
          </span>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Stay Ahead of Your Training
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Get our latest research breakdowns, macro guides, and programming
            strategies delivered every Monday.
          </p>
          {newsletterSuccess ? (
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-primary">
              <Check className="h-5 w-5" /> You're in — expect your first
              dispatch Monday.
            </div>
          ) : (
            <form
              onSubmit={handleNewsletter}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/95 transition-all flex items-center gap-1.5 justify-center cursor-pointer"
              >
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        {/* ── Topics Grid ── */}
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-foreground">
            Browse by Topic
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                label: "Strength Training",
                icon: Dumbbell,
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                label: "Nutrition & Macros",
                icon: Apple,
                color: "text-amber-500",
                bg: "bg-amber-500/10",
              },
              {
                label: "Cardio & HIIT",
                icon: Flame,
                color: "text-orange-500",
                bg: "bg-orange-500/10",
              },
              {
                label: "Recovery Science",
                icon: Heart,
                color: "text-purple-500",
                bg: "bg-purple-500/10",
              },
              {
                label: "Periodization",
                icon: Brain,
                color: "text-blue-500",
                bg: "bg-blue-500/10",
              },
              {
                label: "Supplements",
                icon: Zap,
                color: "text-green-500",
                bg: "bg-green-500/10",
              },
            ].map((topic) => (
              <button
                key={topic.label}
                onClick={() => setActiveCategory(topic.label.split(" ")[0])}
                className="flex flex-col items-center gap-2 p-4 border border-border/60 rounded-2xl bg-card hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <div
                  className={`h-10 w-10 rounded-xl ${topic.bg} flex items-center justify-center`}
                >
                  <topic.icon className={`h-5 w-5 ${topic.color}`} />
                </div>
                <span className="text-xs font-semibold text-center text-foreground leading-tight group-hover:text-primary transition-colors">
                  {topic.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      <AiCoachChat />
      <Footer />
    </div>
  );
}
