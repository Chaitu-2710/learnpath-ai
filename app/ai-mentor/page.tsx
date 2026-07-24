"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, User, Trash2, Loader2, AlertCircle } from "lucide-react";
import { aiApi } from "@/lib/apiClient";
import { useAuth } from "@/lib/auth/AuthContext";
import { cn } from "@/lib/utils";
import { AIMentorSkeleton } from "@/components/ui/Skeletons";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "Explain machine learning in simple terms",
  "How do I become an ML Engineer?",
  "Suggest a beginner ML project for me",
  "Review my learning approach",
  "What should I study this week?",
  "Help me understand neural networks",
];

export default function AIMentorPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history
  useEffect(() => {
    const loadHistory = async () => {
      const initialWelcome: Message[] = [
        {
          id: "welcome-1",
          role: "assistant",
          content: "Hello! I'm your LearnPath AI mentor 🤖. I can help guide your learning journey, answer technical questions, recommend hands-on projects, and prepare you for interviews. What would you like to explore today?",
          timestamp: new Date().toISOString(),
        },
      ];

      try {
        const history = await aiApi.history();
        setMessages(history && history.length > 0 ? history : initialWelcome);
      } catch {
        setMessages(initialWelcome);
      } finally {
        setIsHistoryLoading(false);
      }
    };
    loadHistory();
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || isLoading) return;

    setInput("");
    setError("");

    // Optimistically add user message
    const tempUserMsg: Message = {
      id: `temp-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);
    setIsLoading(true);

    try {
      const result = await aiApi.chat(content);
      // Replace temp message with real ones
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== tempUserMsg.id);
        return [
          ...filtered,
          result.user_message,
          result.assistant_message,
        ];
      });
    } catch (err: any) {
      setError(err.message || "Failed to get response");
      // Remove temp message on error
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMsg.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    try {
      await aiApi.clearHistory();
      setMessages([]);
    } catch {
      setMessages([]);
    }
  };

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  if (isHistoryLoading) return <AIMentorSkeleton />;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-[calc(100vh-2rem)] p-4 lg:p-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0 flex flex-col gap-4">
          {/* Mentor Card */}
          <div className="card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-slate-800 border border-brand-green/30 shrink-0">
                <img
                  src="/images/ai_mentor_avatar.png"
                  alt="AI Mentor"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-slate-100 text-sm">AI Mentor</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                  <span className="text-[10px] text-slate-400">Gemini 1.5 Active</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Personalized learning guidance powered by Google Gemini. Ask me anything about your tech journey!
            </p>
          </div>

          {/* Quick Prompts */}
          <div className="card p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Questions</p>
            <div className="flex flex-col gap-1.5">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                  className="text-left text-xs text-slate-300 hover:text-brand-green hover:bg-brand-green/5 rounded-lg p-2 transition-colors disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-400 transition-colors px-3 py-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear conversation
            </button>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col card min-h-0">
          {/* Header */}
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-brand-green" />
              <span className="font-semibold text-slate-100">Chat with AI Mentor</span>
            </div>
            <span className="text-xs text-slate-500">{messages.length} messages</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {isHistoryLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 text-brand-green animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-green/20 to-brand-blue/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-brand-green" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-lg mb-1">Hi, {user?.name?.split(" ")[0] || "there"}! 👋</h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    I&apos;m your personal AI learning mentor. Ask me about ML, career advice, projects, or anything tech!
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {QUICK_PROMPTS.slice(0, 3).map((p) => (
                    <button
                      key={p}
                      onClick={() => handleSend(p)}
                      className="text-xs bg-slate-700/50 hover:bg-brand-green/10 hover:text-brand-green border border-slate-600 hover:border-brand-green/30 rounded-full px-3 py-1.5 text-slate-300 transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center shrink-0 mt-1">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                      msg.role === "user"
                        ? "bg-brand-green/20 text-slate-100 rounded-tr-sm"
                        : "bg-slate-700/50 text-slate-200 rounded-tl-sm"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{msg.content}</pre>
                    ) : (
                      <p>{msg.content}</p>
                    )}
                    <p className="text-[10px] text-slate-500 mt-1.5">{formatTime(msg.timestamp)}</p>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-xl bg-slate-600 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Error */}
          {error && (
            <div className="mx-4 mb-2 flex items-center gap-2 p-2 rounded-lg bg-red-400/10 border border-red-400/20 text-xs text-red-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-slate-700/50 shrink-0">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your AI mentor anything..."
                disabled={isLoading}
                className="flex-1 bg-slate-700/40 border border-slate-600 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-brand-green/50 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-all active:scale-95"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-white" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
