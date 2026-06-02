'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FitForgeApi } from '@/services/api';
import { MessageSquare, Sparkles, X, Send, Dumbbell, Bot } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  time: Date;
}

export default function AiCoachChat() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Hello! I am your FitForge AI Fitness & Nutrition Coach. How can I help you optimize your workout routines, scale your progressive overloads, or format your macros today?",
      time: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    if (!session) {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: prompt, time: new Date() },
        { sender: 'ai', text: 'Please sign in to chat with the AI Fitness Coach.', time: new Date() },
      ]);
      setPrompt('');
      return;
    }

    const userText = prompt;
    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: new Date() }]);
    setPrompt('');
    setLoading(true);

    try {
      const res = await FitForgeApi.ai.chat(userText, session.accessToken as string);
      if (res.success && res.data) {
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: res.data.response, time: new Date() },
        ]);
      } else {
        throw new Error('AI was unable to formulate a response.');
      }
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `Sorry, I encountered an error: ${error.message || 'AI timeout. Please try again.'}`, time: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Sparkle/Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer border border-white/20 group"
        title="Open AI Fitness Coach"
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping group-hover:animate-none" />
        <MessageSquare className="h-6 w-6 group-hover:hidden" />
        <Sparkles className="h-6 w-6 hidden group-hover:block text-accent-neon" />
      </button>

      {/* Slide-out glassmorphic panel */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] shadow-2xl glass border-l border-border/40 flex flex-col transition-all duration-300 animate-in slide-in-from-right">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-secondary/10 dark:bg-card/25 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Dumbbell className="h-5 w-5 animate-bounce" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-1">
                  FitForge AI Coach <Sparkles className="h-3.5 w-3.5 text-accent-neon fill-accent-neon" />
                </h3>
                <span className="text-[10px] text-accent font-semibold uppercase tracking-wider flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" /> Background Agent Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {msg.sender === 'user' ? 'ME' : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-card text-card-foreground border border-border/40 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  <span
                    className={`block mt-1 text-[9px] text-right ${
                      msg.sender === 'user' ? 'text-white/60' : 'text-muted-foreground'
                    }`}
                  >
                    {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-card text-card-foreground border border-border/40 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1.5 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-primary/80 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-primary/80 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-primary/80 animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form input */}
          <form
            onSubmit={handleSend}
            className="p-4 border-t border-border/40 bg-secondary/10 dark:bg-card/25 rounded-b-2xl flex gap-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask anything about routines, reps, rest, or macros..."
              disabled={loading}
              className="flex-1 bg-card text-foreground text-sm rounded-xl border border-border px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow hover:bg-primary/95 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
