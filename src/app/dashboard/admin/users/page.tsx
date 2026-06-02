'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FitForgeApi } from '@/services/api';
import { 
  Users, UserCheck, ShieldAlert, Trash2, RefreshCw, 
  AlertCircle, Search, Mail, Shield
} from 'lucide-react';

interface AthleteUser {
  _id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export default function ManageAthletesPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<AthleteUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const res = await FitForgeApi.users.getAll(session.accessToken as string);
      if (res.success && res.data) {
        setUsers(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve athletes database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [session]);

  const handleToggleRole = async (user: AthleteUser) => {
    if (!session) return;
    setError('');
    setActionSuccess('');
    
    // Prevent admin from accidentally changing their own role!
    if (user._id === session?.user?.id) {
      setError('You cannot toggle your own administrative role.');
      return;
    }

    const newRole = user.role === 'USER' ? 'ADMIN' : 'USER';
    
    try {
      const res = await FitForgeApi.users.updateRole(
        { userId: user._id, role: newRole },
        session.accessToken as string
      );

      if (res.success) {
        setActionSuccess(`Successfully changed ${user.name}'s role to ${newRole}.`);
        fetchUsers();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to toggle athlete role.');
    }
  };

  const handleBanUser = async (userId: string, userName: string) => {
    if (!session || !confirm(`Are you absolutely sure you want to ban and delete athlete "${userName}"?`)) return;
    
    setError('');
    setActionSuccess('');
    
    if (userId === session?.user?.id) {
      setError('You cannot ban your own active account.');
      return;
    }

    try {
      const res = await FitForgeApi.users.delete(userId, session.accessToken as string);
      if (res.success) {
        setActionSuccess(`Athlete "${userName}" has been banned and scrubbed from FitForge.`);
        fetchUsers();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to ban athlete.');
    }
  };

  const filteredUsers = users.filter((u) => {
    return u.name.toLowerCase().includes(search.toLowerCase()) || 
      u.email.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-foreground">Manage Registered Athletes</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Toggle administrative permissions, audit emails, or issue system bans.</p>
        </div>
        <button
          onClick={fetchUsers}
          className="p-2.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-2 text-sm text-red-500">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {actionSuccess && (
        <div className="rounded-xl bg-accent-neon/15 border border-accent-neon/20 p-4 flex items-center gap-2 text-sm text-accent">
          <UserCheck className="h-4 w-4 shrink-0" />
          <p>{actionSuccess}</p>
        </div>
      )}

      {/* Search Toolbar */}
      <div className="flex max-w-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full bg-card border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/50"
        />
      </div>

      {/* Users table */}
      {loading ? (
        <div className="text-center py-12 border border-border/40 rounded-2xl bg-card">
          <RefreshCw className="mx-auto h-7 w-7 animate-spin text-primary mb-2" />
          <p className="text-xs text-muted-foreground">Retrieving athlete data...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl p-8 bg-card">
          <Users className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="font-display font-bold text-lg text-foreground">No athletes found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
            There are no athlete accounts matching your search coordinates.
          </p>
        </div>
      ) : (
        <div className="border border-border/60 rounded-2xl overflow-hidden bg-card shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-secondary/5 dark:bg-muted/30 border-b border-border text-muted-foreground font-bold">
                <th className="p-4 uppercase tracking-wider">Athlete Info</th>
                <th className="p-4 uppercase tracking-wider">Credentials Mail</th>
                <th className="p-4 uppercase tracking-wider">System Role</th>
                <th className="p-4 uppercase tracking-wider">Join Date</th>
                <th className="p-4 uppercase tracking-wider text-right">Actions Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((u) => (
                <tr key={u._id} className="hover:bg-muted/20 transition-colors">
                  <td className="p-4 font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-bold text-xs uppercase">
                        {u.name.charAt(0)}
                      </div>
                      <span>{u.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground font-mono">
                    <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-primary" /> {u.email}</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                      u.role === 'ADMIN' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-zinc-500/10 text-muted-foreground'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-1.5">
                    <button
                      onClick={() => handleToggleRole(u)}
                      disabled={u._id === session?.user?.id}
                      className="py-1.5 px-3 rounded-lg border border-border hover:bg-muted text-[10px] font-bold text-foreground transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1"
                    >
                      <Shield className="h-3 w-3 text-primary" /> Change Role
                    </button>
                    <button
                      onClick={() => handleBanUser(u._id, u.name)}
                      disabled={u._id === session?.user?.id}
                      className="py-1.5 px-2.5 rounded-lg bg-red-500/15 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center justify-center"
                      title="Issue Ban & Delete"
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
  );
}
