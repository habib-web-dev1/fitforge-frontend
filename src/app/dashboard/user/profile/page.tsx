'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FitForgeApi } from '@/services/api';
import { 
  User, Weight, Scale, Flame, CheckCircle, AlertCircle, 
  RefreshCw, TrendingUp, Calendar, Dumbbell, ShieldAlert
} from 'lucide-react';

export default function AthleteProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Athlete form state
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);

  // Stats summary (Calculated client side)
  const totalCalories = carbs * 4 + protein * 4 + fat * 9;

  const fetchProfile = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const res = await FitForgeApi.users.getById(
        session.user.id,
        session.accessToken as string
      );
      if (res.success && res.data) {
        setName(res.data.name || '');
        setWeight(res.data.weight || 0);
        setHeight(res.data.height || 0);
        
        const macros = res.data.targetMacros || {};
        setCarbs(macros.carbs || 0);
        setProtein(macros.protein || 0);
        setFat(macros.fat || 0);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch biometrics profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [session]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await FitForgeApi.users.update(
        session.user.id,
        {
          name,
          weight,
          height,
          targetMacros: {
            carbs,
            protein,
            fat,
          },
        },
        session.accessToken as string
      );

      if (res.success) {
        setSuccess('Athlete biometric credentials updated successfully!');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save profile biometrics.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 border border-border/40 rounded-2xl bg-card">
        <RefreshCw className="mx-auto h-7 w-7 animate-spin text-primary mb-2" />
        <p className="text-xs text-muted-foreground">Retrieving biometric settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="font-display text-2xl font-extrabold text-foreground">Athlete Profile & Biometrics</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Configure your physiological parameters to optimize generative AI macro splits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Columns (Forms Settings) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-border/60 rounded-2xl bg-card p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">Biometric Calibration</h2>

            {error && (
              <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-xl bg-accent-neon/15 border border-accent-neon/20 p-3 flex items-center gap-2 text-sm text-accent">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <p>{success}</p>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Athlete Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Athlete Name"
                    className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    required
                    min={30}
                    max={250}
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    placeholder="Weight in kg"
                    className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    max={250}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    placeholder="Height in cm"
                    className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="border-t border-border/40 pt-4 mt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Daily Macronutrient Targets</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                      Carbohydrates (g)
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={carbs}
                      onChange={(e) => setCarbs(Number(e.target.value))}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                      Protein (g)
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={protein}
                      onChange={(e) => setProtein(Number(e.target.value))}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                      Fats (g)
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={fat}
                      onChange={(e) => setFat(Number(e.target.value))}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/95 transition-all text-xs uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer mt-4"
              >
                {saving ? 'Saving Biometrics...' : 'Update Biometrics'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column (Live Statistics cards) */}
        <div className="space-y-6">
          {/* Caloric Calculator */}
          <div className="border border-border/60 rounded-2xl bg-card p-6 shadow-sm text-center space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-xl" />
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Flame className="h-6 w-6 text-primary fill-primary animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Target Energy splits</span>
              <p className="text-3xl font-extrabold text-foreground font-display mt-0.5">{totalCalories} kcal</p>
              <p className="text-[10px] text-muted-foreground mt-1">Calculated from carbs, protein, and fat load.</p>
            </div>
          </div>

          {/* Monthly stats */}
          <div className="border border-border/60 rounded-2xl bg-card p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-sm text-foreground">Monthly Activity Tracker</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/30">
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Workouts Logged</span>
                </div>
                <span className="font-bold text-foreground">14 / Month</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/30">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">Macro Precision</span>
                </div>
                <span className="font-bold text-accent">94% Score</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/30">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-muted-foreground">Plan Status</span>
                </div>
                <span className="font-bold text-primary truncate max-w-[80px]">PRO ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
