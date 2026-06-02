"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  CheckCircle,
  Dumbbell,
  Users,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const contactReasons = [
  "General Enquiry",
  "Technical Support",
  "Billing & Subscriptions",
  "Partnership / Coach Collaboration",
  "Enterprise / Team License",
  "Press & Media",
  "Other",
];

const faqs = [
  {
    q: "How quickly will I get a response?",
    a: "Our support team responds to all inquiries within 24 hours on business days. Pro and Elite subscribers receive priority responses, typically within 4 hours.",
  },
  {
    q: "I'm a personal trainer. Can I partner with FitForge?",
    a: "Absolutely. We have a dedicated Coach Partnership program that provides white-label tools, multi-client dashboards, and co-branded blueprint publishing. Select 'Partnership / Coach Collaboration' in the contact form.",
  },
  {
    q: "Where is my data stored?",
    a: "All athlete data is encrypted at rest using AES-256 and stored in SOC 2 Type II compliant data centers in the United States. We never sell or share your data with third parties.",
  },
  {
    q: "Do you offer enterprise or team licenses?",
    a: "Yes. Our Elite Coach Split tier supports multi-athlete management, and we offer custom enterprise contracts for gyms, sports academies, and corporate wellness programs. Contact us to discuss pricing.",
  },
  {
    q: "Can I cancel my subscription at any time?",
    a: "Yes. There are no lock-in contracts. You can cancel your Pro or Elite plan from your account settings at any time, with access continuing until the end of the billing cycle.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    reason: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Your name is required.";
    if (!form.email.includes("@"))
      newErrors.email = "Enter a valid email address.";
    if (!form.reason) newErrors.reason = "Please select a reason for contact.";
    if (!form.message.trim() || form.message.trim().length < 20)
      newErrors.message = "Message must be at least 20 characters.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 space-y-0">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-20 pb-16 border-b border-border/20 bg-secondary/5 dark:bg-card/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
              <MessageSquare className="h-3.5 w-3.5" /> We're Here to Help
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-foreground max-w-3xl mx-auto leading-tight">
              Get in Touch with{" "}
              <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
                FitForge AI
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Whether you need support, want to explore a coaching partnership,
              or have a press inquiry — our team typically responds within 24
              hours.
            </p>
          </div>
          <div className="absolute top-10 right-1/4 h-56 w-56 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        </section>

        {/* ── Contact Info Cards ── */}
        <section className="py-12 bg-background border-b border-border/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="border border-border/60 rounded-2xl bg-card p-6 flex gap-4 items-start hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-foreground mb-1">
                    Email Support
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Fastest route for technical and billing questions.
                  </p>
                  <a
                    href="mailto:support@fitforge.ai"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    support@fitforge.ai
                  </a>
                </div>
              </div>
              <div className="border border-border/60 rounded-2xl bg-card p-6 flex gap-4 items-start hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-foreground mb-1">
                    Phone Line
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Available Mon–Fri, 9 AM – 6 PM PST.
                  </p>
                  <a
                    href="tel:+18005557526"
                    className="text-sm font-semibold text-amber-500 hover:underline"
                  >
                    +1 (800) 555-PLAN
                  </a>
                </div>
              </div>
              <div className="border border-border/60 rounded-2xl bg-card p-6 flex gap-4 items-start hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-foreground mb-1">
                    Headquarters
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Our main office for enterprise meetings.
                  </p>
                  <span className="text-sm font-semibold text-blue-500">
                    Silicon Valley, CA, USA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact Form + Sidebar ── */}
        <section className="py-16 bg-secondary/5 dark:bg-card/5 border-b border-border/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Sidebar */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-2">
                    Response Times
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We prioritize every message. Here's what to expect based on
                    your plan tier.
                  </p>
                </div>
                {[
                  {
                    tier: "Free Athlete",
                    time: "Within 48 hours",
                    icon: Dumbbell,
                    color: "text-muted-foreground",
                    bg: "bg-muted/50",
                  },
                  {
                    tier: "Pro Athlete",
                    time: "Within 8 hours",
                    icon: Sparkles,
                    color: "text-primary",
                    bg: "bg-primary/10",
                  },
                  {
                    tier: "Elite Coach",
                    time: "Within 2 hours (priority)",
                    icon: ShieldCheck,
                    color: "text-amber-500",
                    bg: "bg-amber-500/10",
                  },
                ].map((item) => (
                  <div
                    key={item.tier}
                    className={`border border-border/60 rounded-2xl p-4 ${item.bg} flex items-center gap-3`}
                  >
                    <item.icon className={`h-5 w-5 ${item.color} shrink-0`} />
                    <div>
                      <p className={`text-xs font-bold ${item.color}`}>
                        {item.tier}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                    <Clock className="h-4 w-4 text-muted-foreground/50 ml-auto" />
                  </div>
                ))}

                <div className="border border-border/60 rounded-2xl bg-card p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold text-foreground">
                      Coach Partnership Program
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Personal trainers and fitness coaches can apply for our
                    Partner Program to unlock multi-client management tools,
                    co-branded blueprint publishing, and revenue sharing.
                  </p>
                  <Link
                    href="/auth/register"
                    className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center border border-green-500/30 bg-green-500/5 rounded-2xl p-12 space-y-4 h-full">
                    <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Message Received
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      Thanks for reaching out. Our team will get back to you at{" "}
                      <span className="font-semibold text-foreground">
                        {form.email || "your email"}
                      </span>{" "}
                      within the timeframe for your plan tier.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          reason: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/95 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="border border-border/60 rounded-2xl bg-card p-8 space-y-5 shadow-sm"
                  >
                    <div>
                      <h2 className="font-display text-xl font-bold text-foreground">
                        Send Us a Message
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Fill in the details below and we'll be in touch.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">
                          Full Name <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Johnson"
                          className={`w-full bg-background border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder-muted-foreground/50 ${errors.name ? "border-red-500/60" : "border-border"}`}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="alex@example.com"
                          className={`w-full bg-background border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder-muted-foreground/50 ${errors.email ? "border-red-500/60" : "border-border"}`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Reason */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">
                          Reason for Contact{" "}
                          <span className="text-primary">*</span>
                        </label>
                        <select
                          name="reason"
                          value={form.reason}
                          onChange={handleChange}
                          className={`w-full bg-background border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground appearance-none cursor-pointer ${errors.reason ? "border-red-500/60" : "border-border"}`}
                        >
                          <option value="" disabled>
                            Select a topic...
                          </option>
                          {contactReasons.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                        {errors.reason && (
                          <p className="text-xs text-red-500">
                            {errors.reason}
                          </p>
                        )}
                      </div>

                      {/* Subject */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">
                          Subject{" "}
                          <span className="text-muted-foreground">
                            (optional)
                          </span>
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="Brief subject line..."
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder-muted-foreground/50"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Describe your question or request in detail..."
                        className={`w-full bg-background border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder-muted-foreground/50 resize-none ${errors.message ? "border-red-500/60" : "border-border"}`}
                      />
                      <div className="flex justify-between">
                        {errors.message ? (
                          <p className="text-xs text-red-500">
                            {errors.message}
                          </p>
                        ) : (
                          <span />
                        )}
                        <span
                          className={`text-[10px] ${form.message.length < 20 ? "text-muted-foreground/50" : "text-primary"}`}
                        >
                          {form.message.length} chars
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </button>

                    <p className="text-[10px] text-muted-foreground/60 text-center">
                      By submitting this form you agree to our privacy policy.
                      We never share your information with third parties.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 bg-background border-b border-border/20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                <MessageSquare className="h-3.5 w-3.5" /> Common Questions
              </span>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-border/60 rounded-2xl bg-card overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-muted/30 transition-colors"
                  >
                    <span className="text-sm font-semibold text-foreground pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                        expandedFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-5 border-t border-border/40">
                      <p className="text-sm text-muted-foreground leading-relaxed pt-4">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Map / Office Visual ── */}
        <section className="py-16 bg-secondary/5 dark:bg-card/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                  <MapPin className="h-3.5 w-3.5" /> Find Us
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Our Silicon Valley Office
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Located in the heart of Silicon Valley, our headquarters
                  brings together sports scientists, AI engineers, and nutrition
                  experts under one roof. Enterprise clients and coach partners
                  are welcome to schedule in-person meetings.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span>1 Infinite FitForge Drive, Palo Alto, CA 94303</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span>Mon – Fri: 9:00 AM – 6:00 PM PST</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <span>+1 (800) 555-PLAN</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <span>support@fitforge.ai</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl overflow-hidden border border-border/60 shadow-xl h-72 sm:h-80 relative">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900"
                  alt="FitForge Office"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-lg">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-foreground">
                    Office Open Today
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
