'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FitForgeApi } from '@/services/api';
import { 
  Layers, Plus, Trash2, Edit, RefreshCw, AlertCircle, 
  CheckCircle, Sparkles, Dumbbell, DollarSign, Image, Settings2
} from 'lucide-react';

interface BlueprintItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  category: string;
}

export default function ManageBlueprintsPage() {
  const { data: session } = useSession();
  const [items, setItems] = useState<BlueprintItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState('Commercial Gym');
  const [category, setCategory] = useState('Hypertrophy');
  const [aiGenerating, setAiGenerating] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await FitForgeApi.items.getAll();
      if (res.success && res.data) {
        setItems(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve blueprints database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAiGenerateDescription = async () => {
    if (!title.trim()) {
      setError('Please provide a title before invoking AI description generation.');
      return;
    }
    if (!session) return;

    setAiGenerating(true);
    setError('');
    
    try {
      const res = await FitForgeApi.ai.generateDescription(
        title,
        session.accessToken as string
      );
      if (res.success && res.data) {
        setDescription(res.data.description);
        setSuccess('AI Agent drafted a premium blueprint description!');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate description with AI.');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    setError('');
    setSuccess('');

    const body = {
      title,
      description,
      image: image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600',
      price: Number(price),
      location,
      category,
    };

    try {
      let res;
      if (editId) {
        res = await FitForgeApi.items.update(editId, body, session.accessToken as string);
      } else {
        res = await FitForgeApi.items.create(body, session.accessToken as string);
      }

      if (res.success) {
        setSuccess(editId ? 'Blueprint modified successfully!' : 'New Blueprint created successfully!');
        resetForm();
        fetchItems();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save blueprint settings.');
    }
  };

  const handleEdit = (item: BlueprintItem) => {
    setEditId(item._id);
    setTitle(item.title);
    setDescription(item.description);
    setImage(item.image);
    setPrice(item.price);
    setLocation(item.location);
    setCategory(item.category);
    setIsFormOpen(true);
  };

  const handleDelete = async (itemId: string, itemTitle: string) => {
    if (!session || !confirm(`Are you sure you want to delete blueprint: "${itemTitle}"?`)) return;
    setError('');
    setSuccess('');

    try {
      const res = await FitForgeApi.items.delete(itemId, session.accessToken as string);
      if (res.success) {
        setSuccess(`Blueprint "${itemTitle}" deleted successfully.`);
        fetchItems();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete blueprint.');
    }
  };

  const resetForm = () => {
    setEditId('');
    setTitle('');
    setDescription('');
    setImage('');
    setPrice(0);
    setLocation('Commercial Gym');
    setCategory('Hypertrophy');
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-foreground">Manage Platform Blueprints</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Configure system templates, draft detailed program descriptions, or delete items.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsFormOpen(!isFormOpen);
          }}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/95 flex items-center gap-1 cursor-pointer transition-all shadow"
        >
          {isFormOpen ? 'Cancel' : <><Plus className="h-4 w-4" /> Create Blueprint</>}
        </button>
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

      {/* CRUD Form */}
      {isFormOpen && (
        <div className="border border-border/60 rounded-2xl bg-card p-6 shadow-md animate-in slide-in-from-top duration-200 space-y-4">
          <h2 className="font-display text-lg font-bold text-foreground">
            {editId ? 'Modify Plan Settings' : 'Forge Community Blueprint'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Blueprint Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 6-Week Shred Routine"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer text-foreground"
                >
                  <option value="Hypertrophy">Hypertrophy / Strength</option>
                  <option value="HIIT Endurance">HIIT Endurance / Cardio</option>
                  <option value="Calisthenics">Calisthenics</option>
                  <option value="Keto Diet">Keto Diet / Meal splits</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Focus Location
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Commercial Gym"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Unsplash URL or image asset link..."
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Plan Price ($)
                </label>
                <input
                  type="number"
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="0 for Free"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Description & Plan Splits
                </label>
                <button
                  type="button"
                  onClick={handleAiGenerateDescription}
                  disabled={aiGenerating || !title.trim()}
                  className="px-3 py-1 rounded-lg border border-border hover:bg-muted text-[10px] font-bold text-foreground disabled:opacity-50 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {aiGenerating ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3 text-primary" />}
                  Generate with AI Agent
                </button>
              </div>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details of what this training split resolves..."
                className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-muted-foreground cursor-pointer"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 cursor-pointer shadow"
              >
                {editId ? 'Save Changes' : 'Publish Blueprint'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blueprints list */}
      {loading ? (
        <div className="text-center py-12 border border-border/40 rounded-2xl bg-card">
          <RefreshCw className="mx-auto h-7 w-7 animate-spin text-primary mb-2" />
          <p className="text-xs text-muted-foreground">Retrieving blueprints database...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl p-8 bg-card">
          <Layers className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="font-display font-bold text-lg text-foreground">No blueprints published</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
            Create your first workout split blueprint by clicking the Create Blueprint button above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="border border-border/60 rounded-2xl bg-card overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
              <div className="h-32 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600'}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 left-3 text-[9px] font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-white font-mono">
                  ${item.price}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-sm text-foreground mb-1 truncate">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
                
                <div className="mt-auto space-y-3 pt-3 border-t border-border/40 text-xs">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span className="flex items-center gap-1"><Dumbbell className="h-3.5 w-3.5" /> Target focus:</span>
                    <span className="font-semibold text-foreground truncate max-w-[120px]">{item.location}</span>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-border/20">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 py-1.5 px-2 rounded-lg border border-border hover:bg-muted text-[10px] font-bold text-foreground flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Edit className="h-3 w-3 text-primary" /> Edit Settings
                    </button>
                    <button
                      onClick={() => handleDelete(item._id, item.title)}
                      className="py-1.5 px-2.5 rounded-lg bg-red-500/15 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
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
    </div>
  );
}
