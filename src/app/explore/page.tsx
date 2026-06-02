'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FitForgeApi } from '@/services/api';
import { Search, SlidersHorizontal, Star, Dumbbell, MapPin, Eye, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface BlueprintItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  category: string;
  savesCount?: number;
}

export default function ExplorePage() {
  const [items, setItems] = useState<BlueprintItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filter and pagination states
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | ''>('');
  const [sort, setSort] = useState('-createdAt'); // Default to Newest
  const [page, setPage] = useState(1);
  const limit = 12;

  // Search input debouncer (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page on new search
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch blueprints from the Express backend
  const fetchBlueprints = async () => {
    setLoading(true);
    try {
      // Mapping sort parameters to backend expected formats
      let backendSort = sort;
      if (sort === 'popular') backendSort = '-price'; // Proxy for popular
      else if (sort === 'rating') backendSort = '-rating';
      else if (sort === 'newest') backendSort = '-createdAt';

      const res = await FitForgeApi.items.getAll({
        search: debouncedSearch,
        category: category || undefined,
        sort: backendSort,
        page,
        limit,
      });

      if (res.success && res.data) {
        setItems(res.data);
        setTotalItems(res.meta?.total || res.data.length);
      }
    } catch (error) {
      console.error('Failed to fetch blueprints:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlueprints();
  }, [debouncedSearch, category, ratingFilter, sort, page]);

  // Filter items client-side for ratings (since Express ratings are computed)
  const filteredItems = items.filter((item) => {
    if (ratingFilter === '') return true;
    return item.rating >= ratingFilter;
  });

  const totalPages = Math.ceil(totalItems / limit) || 1;

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'Hypertrophy', label: 'Strength / Hypertrophy' },
    { value: 'HIIT Endurance', label: 'Cardio & HIIT' },
    { value: 'Calisthenics', label: 'Calisthenics' },
    { value: 'Keto Diet', label: 'Meal Plans / Keto' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Page title */}
        <div>
          <h1 className="font-display text-3xl font-extrabold text-foreground">Explore Fitness Blueprints</h1>
          <p className="text-sm text-muted-foreground mt-1">Select and load premium routines and diet programs engineered by AI.</p>
        </div>

        {/* Search, filters & sorts toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-border/60 rounded-2xl glass shadow-sm">
          {/* Search bar */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground/60" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by routine title, exercise or ingredients..."
              className="w-full bg-background border border-border rounded-xl pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/50"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer text-foreground appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer text-foreground appearance-none"
            >
              <option value="-createdAt">Newest Additions</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular (Price)</option>
            </select>
          </div>

          {/* Extra rating filter row */}
          <div className="md:col-span-4 flex flex-wrap gap-2 items-center text-xs border-t border-border/40 pt-3 mt-1">
            <span className="font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3" /> Rating Filters:
            </span>
            <button
              onClick={() => setRatingFilter('')}
              className={`px-3 py-1 rounded-full border cursor-pointer font-medium transition-all ${
                ratingFilter === '' ? 'bg-primary/10 border-primary text-primary' : 'border-border hover:bg-muted text-muted-foreground'
              }`}
            >
              All Ratings
            </button>
            <button
              onClick={() => setRatingFilter(4)}
              className={`px-3 py-1 rounded-full border cursor-pointer font-medium transition-all flex items-center gap-1 ${
                ratingFilter === 4 ? 'bg-primary/10 border-primary text-primary' : 'border-border hover:bg-muted text-muted-foreground'
              }`}
            >
              4.0★ & Above
            </button>
            <button
              onClick={() => setRatingFilter(3)}
              className={`px-3 py-1 rounded-full border cursor-pointer font-medium transition-all flex items-center gap-1 ${
                ratingFilter === 3 ? 'bg-primary/10 border-primary text-primary' : 'border-border hover:bg-muted text-muted-foreground'
              }`}
            >
              3.0★ & Above
            </button>
          </div>
        </div>

        {/* Blueprint results grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border border-border/40 rounded-2xl overflow-hidden bg-card flex flex-col h-[340px]">
                <div className="h-44 w-full animate-shimmer" />
                <div className="p-5 flex-1 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4 animate-shimmer" />
                  <div className="h-3 bg-muted rounded w-5/6 animate-shimmer" />
                  <div className="h-3 bg-muted rounded w-2/3 animate-shimmer" />
                  <div className="pt-4 mt-auto border-t border-border/20 flex justify-between">
                    <div className="h-4 bg-muted rounded w-10 animate-shimmer" />
                    <div className="h-4 bg-muted rounded w-16 animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl p-8 bg-card">
            <Dumbbell className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="font-display font-bold text-lg text-foreground">No blueprints found</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mt-1 mb-6">
              We couldn't locate any routine matching your search. Clear all filters to browse our library.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('');
                setRatingFilter('');
                setSort('-createdAt');
              }}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 text-xs uppercase tracking-wider cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item._id} className="border border-border/60 rounded-2xl overflow-hidden bg-card flex flex-col hover:shadow-lg transition-all duration-300 group">
                <div className="h-44 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600'}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 text-[9px] font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-base text-foreground mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2.5 mt-auto pt-4 border-t border-border/40">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span className="font-bold text-foreground">{item.rating || '0.0'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="text-[11px] truncate max-w-[120px]">{item.location}</span>
                      </div>
                    </div>

                    <Link
                      href={`/explore/${item._id}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/95 text-xs text-center flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-95 transition-all shadow shadow-primary/10 cursor-pointer"
                    >
                      Use Blueprint <Eye className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination controls */}
        {!loading && filteredItems.length > 0 && (
          <div className="flex items-center justify-between border-t border-border/40 pt-6">
            <span className="text-xs text-muted-foreground">
              Showing page <span className="font-bold text-foreground">{page}</span> of <span className="font-bold text-foreground">{totalPages}</span> ({totalItems} elements)
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                className="p-2.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                className="p-2.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
