'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FitForgeApi } from '@/services/api';
import { Star, ChevronRight, Check, AlertCircle, Dumbbell, Calendar, Heart, Shield, Award, User, RefreshCw, MessageSquare } from 'lucide-react';

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

interface BlueprintDetail {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  category: string;
  createdBy: string;
  createdAt: string;
}

export default function BlueprintDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { data: session } = useSession();

  const [item, setItem] = useState<BlueprintDetail | null>(null);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [related, setRelated] = useState<BlueprintDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Booking states
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState('');

  // Review states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  const fetchDetails = async () => {
    try {
      const itemRes = await FitForgeApi.items.getById(id);
      if (itemRes.success && itemRes.data) {
        setItem(itemRes.data);
        
        // Fetch reviews
        const reviewsRes = await FitForgeApi.reviews.getByItem(id);
        if (reviewsRes.success && reviewsRes.data) {
          setReviews(reviewsRes.data);
        }

        // Fetch related items matching category
        const relatedRes = await FitForgeApi.items.getAll({
          category: itemRes.data.category,
          limit: 4
        });
        if (relatedRes.success && relatedRes.data) {
          setRelated(relatedRes.data.filter((r: any) => r._id !== id));
        }
      }
    } catch (err: any) {
      setError(err.message || 'Blueprint details not found.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetails();
    }
  }, [id]);

  const handleActivatePlan = async () => {
    if (!session) {
      router.push(`/auth/login?callbackUrl=/explore/${id}`);
      return;
    }

    setBookingLoading(true);
    setBookingSuccess('');
    setError('');

    try {
      const res = await FitForgeApi.bookings.create({
        itemId: id
      }, session.accessToken as string);

      if (res.success) {
        setBookingSuccess('Routine split activated! Directing to saved workspace...');
        setTimeout(() => {
          router.push('/dashboard/user/saved');
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to activate plan.');
      setBookingLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setReviewError('Please login to leave comments.');
      return;
    }

    if (!comment.trim()) {
      setReviewError('Please type review feedback comments.');
      return;
    }

    setReviewLoading(true);
    setReviewError('');
    setReviewSuccess('');

    try {
      const res = await FitForgeApi.reviews.create({
        itemId: id,
        rating,
        comment
      }, session.accessToken as string);

      if (res.success) {
        setReviewSuccess('Review cataloged! Recalculating ratings...');
        setComment('');
        // Reload details and reviews list
        await fetchDetails();
      }
    } catch (err: any) {
      setReviewError(err.message || 'You have already reviewed this routine.');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <RefreshCw className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading blueprint details splits...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4 max-w-sm">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="font-display font-bold text-lg text-foreground">Blueprint not found</h3>
            <p className="text-sm text-muted-foreground">The routine split you are seeking doesn't exist or was archived.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Pre-configured split schedules based on template names
  const daySplitPreview = item.category === 'Keto Diet'
    ? {
        day: 'Meal Day Split Preview',
        activities: [
          { time: 'Breakfast', name: 'Avocado & Egg Scramble', detail: '3 eggs, 1/2 medium avocado, cooked in 1 tbsp organic butter.' },
          { time: 'Lunch', name: 'Grilled Chicken & Leafy Salad', detail: '150g chicken breast, olive oil drizzle, leafy spinach and cucumber.' },
          { time: 'Dinner', name: 'Pan-Seared Salmon & Asparagus', detail: '200g salmon fillet, steamed asparagus segments, butter coat.' }
        ]
      }
    : {
        day: 'Workout Day 1 Split Preview',
        activities: [
          { time: 'Warmup', name: 'Dynamic Arm Swings & Rotators', detail: '5-10 minutes low intensity bloodflow exercises.' },
          { time: 'Exercise 1', name: 'Flat Bench Press (Heavy)', detail: '4 sets x 8 reps at 80% 1RM. Rest 120s.' },
          { time: 'Exercise 2', name: 'Weighted Pull-ups', detail: '3 sets x 6 reps (+10kg load). Rest 90s.' },
          { time: 'Exercise 3', name: 'Dumbbell Incline Flys', detail: '3 sets x 10 reps (moderate). Rest 60s.' }
        ]
      };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Cover visual header */}
        <div className="relative border border-border/60 rounded-2xl overflow-hidden shadow-xl h-64 sm:h-80 flex items-end">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${item.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200'})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
          
          <div className="relative p-6 sm:p-8 text-white space-y-3 z-10 w-full flex flex-col sm:flex-row justify-between sm:items-end gap-4">
            <div>
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground uppercase tracking-wider mb-2">
                {item.category}
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">{item.title}</h1>
              <div className="flex items-center gap-4 text-xs text-white/70 mt-1.5">
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {item.rating || '0.0'} ({reviews.length} reviews)</span>
                <span>•</span>
                <span>Category: {item.category}</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-2">
              {bookingSuccess ? (
                <div className="bg-accent-neon/20 border border-accent-neon/40 text-accent font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 animate-pulse">
                  <Check className="h-4 w-4" /> {bookingSuccess}
                </div>
              ) : (
                <button
                  onClick={handleActivatePlan}
                  disabled={bookingLoading}
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/95 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 text-sm flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  {bookingLoading ? 'Activating Split...' : 'Use Blueprint Plan'} <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Details, Previews, Related) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="border border-border/60 rounded-2xl bg-card p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground">Program Overview</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              
              {/* Detailed metrics metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/40 text-center">
                <div className="p-3 bg-muted/40 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Target Location</span>
                  <p className="text-xs font-bold text-foreground truncate">{item.location}</p>
                </div>
                <div className="p-3 bg-muted/40 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Estimated Duration</span>
                  <p className="text-xs font-bold text-foreground">6 Weeks</p>
                </div>
                <div className="p-3 bg-muted/40 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Intensity Level</span>
                  <p className="text-xs font-bold text-foreground">Intermediate</p>
                </div>
                <div className="p-3 bg-muted/40 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">AI Engine Model</span>
                  <p className="text-xs font-bold text-foreground">Gemini 2.5 Flash</p>
                </div>
              </div>
            </div>

            {/* Day Split Preview */}
            <div className="border border-border/60 rounded-2xl bg-card p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-1.5">
                  <Dumbbell className="h-5 w-5 text-primary" /> {daySplitPreview.day}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase">
                  SNEAK PEEK
                </span>
              </div>
              <div className="space-y-3">
                {daySplitPreview.activities.map((act, index) => (
                  <div key={index} className="flex gap-4 p-3 border border-border/40 rounded-xl bg-muted/10">
                    <div className="shrink-0 flex h-8 w-16 items-center justify-center rounded-lg bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider">
                      {act.time}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{act.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{act.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Reviews & Ratings feedback submission) */}
          <div className="space-y-6">
            {/* Submit review */}
            <div className="border border-border/60 rounded-2xl bg-card p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-1.5">
                <MessageSquare className="h-5 w-5 text-primary" /> Submit Athlete Review
              </h3>

              {reviewSuccess && (
                <div className="rounded-xl bg-accent-neon/15 border border-accent-neon/20 p-3 flex items-center gap-2 text-sm text-accent">
                  <Check className="h-4 w-4 shrink-0" />
                  <p>{reviewSuccess}</p>
                </div>
              )}

              {reviewError && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p>{reviewError}</p>
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Rating selection stars */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Rating Evaluation
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-115 transition-transform cursor-pointer"
                      >
                        <Star 
                          className={`h-6 w-6 ${
                            star <= rating 
                              ? 'fill-amber-500 text-amber-500' 
                              : 'text-muted-foreground/30 hover:text-amber-500/50'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Feedback Comments
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Provide detailed feedback on this split..."
                    className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={reviewLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {reviewLoading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            </div>

            {/* Reviews feeds */}
            <div className="border border-border/60 rounded-2xl bg-card p-6 space-y-4 max-h-[400px] overflow-y-auto">
              <h3 className="font-display text-lg font-bold text-foreground">Community Feedback</h3>
              
              {reviews.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">No feedback submitted for this routine yet.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev._id} className="p-3 border border-border/40 rounded-xl space-y-2 text-xs bg-muted/10">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-[10px]">
                            {rev.user?.name ? rev.user.name.charAt(0).toUpperCase() : <User className="h-3 w-3" />}
                          </div>
                          <span className="font-semibold text-foreground truncate max-w-[100px]">{rev.user?.name || 'Athlete'}</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Blueprints */}
        {related.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-border/40">
            <h2 className="font-display text-xl font-bold text-foreground">Related Blueprints</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <Link
                  key={item._id}
                  href={`/explore/${item._id}`}
                  className="border border-border/60 rounded-2xl overflow-hidden bg-card flex flex-col hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="h-32 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="font-display font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </h4>
                    <div className="mt-auto pt-2 border-t border-border/20 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span className="text-[11px] font-bold text-foreground">{item.rating || '0.0'}</span>
                      </div>
                      <span className="text-[10px] font-bold text-primary uppercase">
                        VIEW
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
