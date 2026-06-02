'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FitForgeApi } from '@/services/api';
import { 
  MessageSquare, Star, Trash2, Sparkles, RefreshCw, 
  AlertCircle, CheckCircle, ChevronDown, Bot
} from 'lucide-react';

interface BlueprintItem {
  _id: string;
  title: string;
  category: string;
}

interface ReviewItem {
  _id: string;
  rating: number;
  comment: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function ManageReviewsPage() {
  const { data: session } = useSession();
  const [blueprints, setBlueprints] = useState<BlueprintItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // AI Review summary states
  const [aiSummary, setAiSummary] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const fetchBlueprints = async () => {
    try {
      const res = await FitForgeApi.items.getAll();
      if (res.success && res.data) {
        setBlueprints(res.data);
        if (res.data.length > 0) {
          setSelectedItemId(res.data[0]._id);
        }
      }
    } catch (err: any) {
      setError('Failed to fetch blueprints library list.');
    }
  };

  const fetchReviews = async (itemId: string) => {
    if (!itemId) return;
    setLoading(true);
    setAiSummary('');
    setError('');
    try {
      const res = await FitForgeApi.reviews.getByItem(itemId);
      if (res.success && res.data) {
        setReviews(res.data);
      }
    } catch (err: any) {
      setError('Failed to fetch review logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlueprints();
  }, []);

  useEffect(() => {
    if (selectedItemId) {
      fetchReviews(selectedItemId);
    }
  }, [selectedItemId]);

  const handleAiSummarize = async () => {
    if (!selectedItemId || !session) return;
    if (reviews.length === 0) {
      setError('No reviews available to compile a summary.');
      return;
    }

    setAiLoading(true);
    setError('');
    setAiSummary('');

    try {
      const res = await FitForgeApi.ai.reviewSummary(
        selectedItemId,
        session.accessToken as string
      );
      if (res.success && res.data) {
        setAiSummary(res.data.summary);
        setSuccess('AI Review summary generated successfully.');
      }
    } catch (err: any) {
      setError(err.message || 'AI Summarizer pipeline failed.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!session || !confirm('Are you sure you want to reject and delete this user review?')) return;
    setError('');
    setSuccess('');

    try {
      const res = await FitForgeApi.reviews.delete(reviewId, session.accessToken as string);
      if (res.success) {
        setSuccess('Review rejected and deleted successfully.');
        fetchReviews(selectedItemId);
      }
    } catch (err: any) {
      setError('Failed to reject review.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="font-display text-2xl font-extrabold text-foreground">Manage Blueprint Reviews</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Moderate community athlete reviews, audit ratings, or trigger AI Review Summarizers.</p>
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-2 text-sm text-red-500">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="rounded-xl bg-accent-neon/15 border border-accent-neon/20 p-4 flex items-center gap-2 text-sm text-accent">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <p>{success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 border border-border/60 rounded-2xl bg-card shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="w-full sm:max-w-xs">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Select Blueprint
                </label>
                <select
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer text-foreground appearance-none"
                >
                  {blueprints.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title} ({item.category})
                    </option>
                  ))}
                </select>
              </div>

              {reviews.length > 0 && (
                <button
                  onClick={handleAiSummarize}
                  disabled={aiLoading}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/95 text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all shadow"
                >
                  {aiLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4 text-accent-neon fill-accent-neon" />
                  )}
                  AI Review Summarizer
                </button>
              )}
            </div>

            {/* Reviews list */}
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="mx-auto h-7 w-7 animate-spin text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Retrieving reviews list...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12 bg-muted/20 border border-dashed border-border rounded-xl">
                <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/30 mb-3" />
                <p className="text-xs text-muted-foreground font-semibold">No reviews registered for this blueprint.</p>
              </div>
            ) : (
              <div className="border border-border/60 rounded-xl overflow-hidden bg-background">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-secondary/5 dark:bg-muted/30 border-b border-border text-muted-foreground font-bold">
                      <th className="p-3">Athlete</th>
                      <th className="p-3">Stars</th>
                      <th className="p-3">Comment feedback</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {reviews.map((rev) => (
                      <tr key={rev._id} className="hover:bg-muted/10 transition-colors">
                        <td className="p-3 font-semibold text-foreground">
                          {rev.user?.name || 'Athlete'}
                        </td>
                        <td className="p-3 text-amber-500 whitespace-nowrap">
                          <div className="flex gap-0.5">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            ))}
                          </div>
                        </td>
                        <td className="p-3 text-muted-foreground max-w-xs truncate" title={rev.comment}>
                          {rev.comment}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteReview(rev._id)}
                            className="py-1 px-2 rounded bg-red-500/15 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Reject/Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* AI summary panel */}
        <div className="space-y-6">
          <div className="border border-border/60 rounded-2xl bg-card p-5 shadow-sm space-y-4 min-h-[300px] flex flex-col">
            <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-1.5 border-b border-border/40 pb-2">
              <Bot className="h-4.5 w-4.5 text-primary" /> AI Sentiment Summarizer
            </h3>

            <div className="flex-1 text-xs leading-relaxed overflow-y-auto whitespace-pre-wrap">
              {aiLoading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ) : aiSummary ? (
                <div className="bg-background rounded-xl p-4 border border-border/40 select-text font-sans">
                  {aiSummary}
                </div>
              ) : (
                <p className="text-muted-foreground/60 italic text-center py-12">
                  Select a blueprint with reviews and click the AI Review Summarizer button to compile sentiments.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
