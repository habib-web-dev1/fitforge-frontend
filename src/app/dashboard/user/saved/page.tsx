'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FitForgeApi } from '@/services/api';
import ToneScaleModal from '@/components/ToneScaleModal';
import { 
  Dumbbell, Calendar, CheckCircle2, Archive, Trash2, Search, Sparkles, 
  ChevronRight, RefreshCw, AlertCircle, Eye, Settings2, SlidersHorizontal
} from 'lucide-react';

interface BookingItem {
  _id: string;
  item: {
    _id: string;
    title: string;
    description: string;
    image: string;
    location: string;
    category: string;
  };
  price: number;
  status: 'active' | 'completed' | 'archived';
  createdAt: string;
}

export default function SavedBlueprintsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtering states
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'archived'>('active');
  const [page, setPage] = useState(1);
  const limit = 8;

  // Plan editor states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingTitle, setSelectedBookingTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [activeBookingId, setActiveBookingId] = useState('');

  const fetchBookings = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const res = await FitForgeApi.bookings.getAll(session.accessToken as string);
      if (res.success && res.data) {
        setBookings(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve active bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [session]);

  const handleUpdateStatus = async (bookingId: string, newStatus: 'completed' | 'archived') => {
    if (!session) return;
    try {
      const res = await FitForgeApi.bookings.updateStatus(
        bookingId,
        { status: newStatus },
        session.accessToken as string
      );
      if (res.success) {
        // Refresh local bookings list
        fetchBookings();
      }
    } catch (err: any) {
      console.error('Failed to update booking status:', err);
    }
  };

  const handleDelete = async (bookingId: string) => {
    if (!session || !confirm('Are you sure you want to delete this routine split?')) return;
    try {
      const res = await FitForgeApi.bookings.delete(bookingId, session.accessToken as string);
      if (res.success) {
        fetchBookings();
      }
    } catch (err: any) {
      console.error('Failed to delete booking:', err);
    }
  };

  const handleOpenEditor = (booking: BookingItem) => {
    setActiveBookingId(booking._id);
    setSelectedBookingTitle(booking.item.title);
    
    // Set some sample base routines content for modification
    const sampleSplit = booking.item.category === 'Keto Diet'
      ? `Meal Split:\n- Breakfast: Scrambled eggs with spinach\n- Lunch: High protein grilled chicken salad\n- Dinner: Seared salmon fillet with greens`
      : `Workout Routine Day 1:\n- Bench Press: 4 sets x 8 reps\n- Lat Pulldowns: 3 sets x 10 reps\n- Lateral Shoulder Raises: 3 sets x 12 reps`;
      
    setEditorContent(sampleSplit);
    setIsModalOpen(true);
  };

  const handleApplyModification = (modifiedText: string) => {
    // Alert user we successfully adjusted the plan (mock update since modifications are returned on layout)
    alert(`Successfully applied AI Agent modification to: "${selectedBookingTitle}"!\n\nNew Schedule Split:\n${modifiedText.slice(0, 200)}...`);
    setIsModalOpen(false);
  };

  // Filter logic
  const filteredBookings = bookings.filter((b) => {
    if (!b.item) return false;
    const matchesSearch = b.item.title.toLowerCase().includes(search.toLowerCase()) ||
      b.item.category.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / limit) || 1;
  const paginatedBookings = filteredBookings.slice((page - 1) * limit, page * limit);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-foreground">My Saved Blueprints</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Track your active schedules, archive completed protocols, or modify splits with AI.</p>
        </div>
        <Link
          href="/explore"
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/95 hover:scale-[1.01] active:scale-95 transition-all shadow shadow-primary/20 cursor-pointer"
        >
          Explore New Blueprints
        </Link>
      </div>

      {/* Filters Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 border border-border/40 rounded-xl bg-card shadow-sm">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search saved routines..."
            className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/50"
          />
        </div>

        {/* Status filters */}
        <div className="sm:col-span-2 flex gap-1.5 items-center justify-end text-xs">
          <span className="font-bold text-muted-foreground uppercase tracking-wider hidden md:inline-flex items-center gap-1">
            <SlidersHorizontal className="h-3 w-3" /> Status:
          </span>
          <button
            onClick={() => { setStatusFilter('active'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg border font-semibold cursor-pointer transition-all ${
              statusFilter === 'active' ? 'bg-primary/10 border-primary text-primary' : 'border-border hover:bg-muted text-muted-foreground'
            }`}
          >
            Active Plans
          </button>
          <button
            onClick={() => { setStatusFilter('completed'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg border font-semibold cursor-pointer transition-all ${
              statusFilter === 'completed' ? 'bg-primary/10 border-primary text-primary' : 'border-border hover:bg-muted text-muted-foreground'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => { setStatusFilter('archived'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg border font-semibold cursor-pointer transition-all ${
              statusFilter === 'archived' ? 'bg-primary/10 border-primary text-primary' : 'border-border hover:bg-muted text-muted-foreground'
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-2 text-sm text-red-500">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Main content display */}
      {loading ? (
        <div className="text-center py-12 border border-border/40 rounded-2xl bg-card">
          <RefreshCw className="mx-auto h-7 w-7 animate-spin text-primary mb-2" />
          <p className="text-xs text-muted-foreground">Retrieving routine splits...</p>
        </div>
      ) : paginatedBookings.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl p-8 bg-card">
          <Dumbbell className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="font-display font-bold text-lg text-foreground">You have no {statusFilter !== 'all' ? statusFilter : ''} blueprints</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1 mb-6">
            Explore our community blueprints library and activate a customized fitness/diet routine program.
          </p>
          <Link
            href="/explore"
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/95 text-xs uppercase tracking-wider cursor-pointer inline-flex items-center gap-1.5"
          >
            Forge Your First Routine <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedBookings.map((b) => (
            <div key={b._id} className="border border-border/60 rounded-2xl bg-card overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="h-32 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                <img
                  src={b.item.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600'}
                  alt={b.item.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 left-3 text-[9px] font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground uppercase tracking-wider">
                  {b.item.category}
                </span>
                <span className={`absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  b.status === 'active' 
                    ? 'bg-accent text-accent-foreground' 
                    : b.status === 'completed' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-zinc-500 text-white'
                }`}>
                  {b.status}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-sm text-foreground mb-1 truncate">{b.item.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{b.item.description}</p>
                
                <div className="mt-auto space-y-3 pt-3 border-t border-border/40 text-xs">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Activated:</span>
                    <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/20">
                    <button
                      onClick={() => handleOpenEditor(b)}
                      className="flex-1 py-1.5 px-2 rounded-lg border border-border text-[10px] font-bold hover:bg-muted text-foreground flex items-center justify-center gap-1 cursor-pointer"
                      title="Modify splits with Agent 2"
                    >
                      <Sparkles className="h-3 w-3 text-primary shrink-0" /> Edit Split
                    </button>

                    {b.status === 'active' && (
                      <button
                        onClick={() => handleUpdateStatus(b._id, 'completed')}
                        className="py-1.5 px-2 rounded-lg bg-green-500/10 text-green-500 text-[10px] font-bold hover:bg-green-500 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1"
                        title="Mark plan completed"
                      >
                        <CheckCircle2 className="h-3 w-3 shrink-0" /> Done
                      </button>
                    )}

                    {b.status !== 'archived' && (
                      <button
                        onClick={() => handleUpdateStatus(b._id, 'archived')}
                        className="py-1.5 px-2 rounded-lg bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold hover:bg-zinc-500 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1"
                        title="Archive blueprint"
                      >
                        <Archive className="h-3 w-3 shrink-0" /> Archive
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(b._id)}
                      className="py-1.5 px-2 rounded-lg bg-red-500/15 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                      title="Delete routine"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredBookings.length > 0 && (
        <div className="flex items-center justify-between border-t border-border/40 pt-4 text-xs">
          <span className="text-muted-foreground">
            Showing page <span className="font-bold text-foreground">{page}</span> of <span className="font-bold text-foreground">{totalPages}</span> ({filteredBookings.length} total)
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              className="px-3 py-1.5 rounded-lg border border-border disabled:opacity-50 hover:bg-muted text-muted-foreground cursor-pointer"
            >
              Previous
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              className="px-3 py-1.5 rounded-lg border border-border disabled:opacity-50 hover:bg-muted text-muted-foreground cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Interactive Agent 2 Modifier Modal */}
      <ToneScaleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialContent={editorContent}
        onApplyModification={handleApplyModification}
      />
    </div>
  );
}
