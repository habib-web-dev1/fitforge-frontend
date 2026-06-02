'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FitForgeApi } from '@/services/api';
import { Bot, Calendar, Sparkles, AlertCircle, RefreshCw, Database, ArrowUpDown } from 'lucide-react';

interface AiLogItem {
  _id: string;
  agent: string;
  prompt: string;
  tokensConsumed: number;
  createdAt: string;
}

export default function AiHistoryPage() {
  const { data: session } = useSession();
  const [logs, setLogs] = useState<AiLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sorting and search states
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'createdAt' | 'agent' | 'tokensConsumed'>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const fetchLogs = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const res = await FitForgeApi.users.getMyAiLogs(session.accessToken as string);
      if (res.success && res.data) {
        setLogs(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve AI logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [session]);

  const handleSort = (field: 'createdAt' | 'agent' | 'tokensConsumed') => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Client side filtering & sorting
  const filteredAndSortedLogs = logs
    .filter((log) => {
      const matchesSearch = log.agent.toLowerCase().includes(search.toLowerCase()) ||
        log.prompt.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortField === 'agent') {
        comparison = a.agent.localeCompare(b.agent);
      } else if (sortField === 'tokensConsumed') {
        comparison = a.tokensConsumed - b.tokensConsumed;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="font-display text-2xl font-extrabold text-foreground">AI Generation History</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Audit trail of background AI agent triggers, prompts, and tokens consumed.</p>
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-2 text-sm text-red-500">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 border border-border/40 rounded-2xl bg-card">
          <RefreshCw className="mx-auto h-7 w-7 animate-spin text-primary mb-2" />
          <p className="text-xs text-muted-foreground">Retrieving generation logs...</p>
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl p-8 bg-card">
          <Database className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="font-display font-bold text-lg text-foreground">No AI logs available</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
            Your generation records will appear here as soon as you generate blueprints or use the AI Coach chatbot.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="flex max-w-sm">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search logs by agent or prompt snippet..."
              className="w-full bg-card border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-muted-foreground/50"
            />
          </div>

          {/* Logs Table */}
          <div className="border border-border/60 rounded-2xl overflow-hidden bg-card shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-secondary/5 dark:bg-muted/30 border-b border-border text-muted-foreground font-bold">
                  <th 
                    onClick={() => handleSort('createdAt')}
                    className="p-4 cursor-pointer hover:bg-muted/40 transition-colors uppercase tracking-wider"
                  >
                    <span className="flex items-center gap-1">Date <ArrowUpDown className="h-3 w-3" /></span>
                  </th>
                  <th 
                    onClick={() => handleSort('agent')}
                    className="p-4 cursor-pointer hover:bg-muted/40 transition-colors uppercase tracking-wider"
                  >
                    <span className="flex items-center gap-1">AI Fitness Agent <ArrowUpDown className="h-3 w-3" /></span>
                  </th>
                  <th className="p-4 uppercase tracking-wider">Prompt Snippet</th>
                  <th 
                    onClick={() => handleSort('tokensConsumed')}
                    className="p-4 cursor-pointer hover:bg-muted/40 transition-colors uppercase tracking-wider text-center"
                  >
                    <span className="flex items-center justify-center gap-1">Tokens <ArrowUpDown className="h-3 w-3" /></span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAndSortedLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-foreground whitespace-nowrap">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" /> {new Date(log.createdAt).toLocaleString()}</span>
                    </td>
                    <td className="p-4 font-semibold text-foreground">
                      <span className="flex items-center gap-1.5"><Bot className="h-3.5 w-3.5 text-accent" /> {log.agent}</span>
                    </td>
                    <td className="p-4 text-muted-foreground max-w-xs truncate font-mono text-[11px]" title={log.prompt}>
                      {log.prompt}
                    </td>
                    <td className="p-4 text-center font-bold text-foreground">
                      <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-[11px]">
                        {log.tokensConsumed}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
