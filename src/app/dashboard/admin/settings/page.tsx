'use client';

import React, { useState } from 'react';
import { 
  Settings, Bot, ToggleLeft, ToggleRight, Sparkles, 
  CheckCircle2, AlertCircle, Wrench, ShieldCheck, Save
} from 'lucide-react';

export default function EngineSettingsPage() {
  const [model, setModel] = useState('gemini-2.5-flash');
  const [maintenance, setMaintenance] = useState(false);
  const [branding, setBranding] = useState('FitForge AI');
  const [accent, setAccent] = useState('orange');
  const [webhook, setWebhook] = useState('https://api.fitforge.ai/webhooks/activity');
  const [success, setSuccess] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    
    // Simulate save success
    setTimeout(() => {
      setSuccess('Global operational engine settings applied and saved successfully.');
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="font-display text-2xl font-extrabold text-foreground">Global Engine Settings</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Control active LLM models, update operational maintenance settings, and manage branding variables.</p>
      </div>

      {success && (
        <div className="rounded-xl bg-accent-neon/15 border border-accent-neon/20 p-4 flex items-center gap-2 text-sm text-accent animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <p>{success}</p>
        </div>
      )}

      <div className="max-w-3xl border border-border/60 rounded-2xl bg-card p-6 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: AI Engines */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Bot className="h-4.5 w-4.5" /> AI Engine Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  Active AI Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer text-foreground"
                >
                  <option value="gemini-2.5-flash">Google Gemini 2.5 Flash (Default)</option>
                  <option value="gemini-2.5-pro">Google Gemini 2.5 Pro (Heavy reasoning)</option>
                  <option value="gemini-2.0-flash">Google Gemini 2.0 Flash (Fast stream)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  API Request Webhook Trigger
                </label>
                <input
                  type="text"
                  value={webhook}
                  onChange={(e) => setWebhook(e.target.value)}
                  placeholder="Webhook URL endpoint..."
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>

          <hr className="border-border/40" />

          {/* Section 2: Maintenance & Safety */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Wrench className="h-4.5 w-4.5" /> Maintenance & Safety
            </h3>
            <div className="flex items-center justify-between p-4 border border-border/40 rounded-xl bg-secondary/5 dark:bg-muted/10">
              <div>
                <h4 className="text-xs font-bold text-foreground">Operational Maintenance Mode</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">Toggle to block standard user interactions and show maintenance screens during window deployments.</p>
              </div>
              <button
                type="button"
                onClick={() => setMaintenance(!maintenance)}
                className="focus:outline-none cursor-pointer"
              >
                {maintenance ? (
                  <ToggleRight className="h-9 w-9 text-primary" />
                ) : (
                  <ToggleLeft className="h-9 w-9 text-muted-foreground/50" />
                )}
              </button>
            </div>
          </div>

          <hr className="border-border/40" />

          {/* Section 3: Branding */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <ShieldCheck className="h-4.5 w-4.5" /> Platform Styling & Branding
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  Organization Branding Name
                </label>
                <input
                  type="text"
                  value={branding}
                  onChange={(e) => setBranding(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  Theme Accent Palette
                </label>
                <select
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer text-foreground"
                >
                  <option value="orange">Active Orange / Neon Green (Default)</option>
                  <option value="slate">Sleek Slate / White</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow shadow-primary/10"
          >
            <Save className="h-4 w-4" /> Save operational configurations
          </button>
        </form>
      </div>
    </div>
  );
}
