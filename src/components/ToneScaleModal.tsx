'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FitForgeApi } from '@/services/api';
import { Sparkles, X, ChevronRight, Check, AlertCircle, Dumbbell, RefreshCw } from 'lucide-react';

interface ToneScaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: string;
  onApplyModification?: (modifiedContent: string) => void;
}

export default function ToneScaleModal({ isOpen, onClose, initialContent = '', onApplyModification }: ToneScaleModalProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState(initialContent || "Bench Press: 4 sets x 8 reps (80kg)\nSquats: 3 sets x 10 reps (100kg)\nOverhead Press: 3 sets x 8 reps (50kg)");
  const [profile, setProfile] = useState("Make Harder / Progressive Overload");
  const [modifiedResult, setModifiedResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const modificationProfiles = [
    { name: "Make Harder / Progressive Overload", desc: "Scale weights, sets, reps, or reduce recovery rest times." },
    { name: "Regress / Simpler Exercises", desc: "Simplify movement patterns for beginners or post-injury athletes." },
    { name: "Swap Ingredients for Vegan Alternatives", desc: "Replace meat, dairy, and eggs with high-protein plant-based alternatives." },
    { name: "Fix Form Description", desc: "Elaborate posture directives, bio-mechanical cues, and safety tips." }
  ];

  if (!isOpen) return null;

  const handleModify = async () => {
    if (!content.trim()) {
      setError('Please provide content to modify');
      return;
    }

    if (!session) {
      setError('Please login to execute AI modifications.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await FitForgeApi.ai.modify({
        content,
        modificationProfile: profile
      }, session.accessToken as string);

      if (res.success && res.data) {
        setModifiedResult(res.data.modifiedContent);
        setSuccess(true);
      } else {
        throw new Error('AI modification pipeline returned an empty response.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to modify plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (onApplyModification && modifiedResult) {
      onApplyModification(modifiedResult);
    }
    setModifiedResult('');
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-2xl z-10 flex flex-col max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5 animate-pulse text-accent-neon" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">AI Plan & Tone Modifier</h2>
            <p className="text-xs text-muted-foreground">Modify specific routine reps, scale load overloads, or convert diet ingredients instantly.</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 flex items-center gap-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Controls Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                1. Select Modification Profile
              </label>
              <div className="space-y-2">
                {modificationProfiles.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setProfile(p.name)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-150 cursor-pointer flex justify-between items-center ${
                      profile === p.name
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{p.desc}</p>
                    </div>
                    {profile === p.name && <Check className="h-4 w-4 text-primary shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                2. Input Workout Day / Meal Segment
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                placeholder="Paste the routine, exercises, sets, or diet segments here..."
                className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/60 resize-none font-mono"
              />
            </div>

            <button
              onClick={handleModify}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/95 transition-all shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Rewriting Segment...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-accent-neon fill-accent-neon" /> Apply Agent Modification
                </>
              )}
            </button>
          </div>

          {/* Results Column */}
          <div className="flex flex-col border border-border rounded-2xl bg-secondary/5 dark:bg-card/25 p-4 min-h-[300px]">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
              <Dumbbell className="h-3.5 w-3.5" /> Output Program Variant
            </span>

            <div className="flex-1 overflow-y-auto bg-card rounded-xl border border-border/60 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap select-text">
              {loading ? (
                <div className="space-y-2.5 animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ) : modifiedResult ? (
                modifiedResult
              ) : (
                <span className="text-muted-foreground/60 italic">Your modified program will appear here. Choose a profile on the left and hit generate...</span>
              )}
            </div>

            {modifiedResult && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setModifiedResult('')}
                  className="flex-1 py-2 px-3 rounded-lg border border-border text-sm font-semibold hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-center"
                >
                  Discard
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 py-2 px-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/95 transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  Apply Changes <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
