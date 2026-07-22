"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  BookOpen,
  Code2,
  Briefcase,
  Lightbulb,
  User,
  RotateCcw,
  Copy,
  ThumbsUp,
} from "lucide-react";
import { initialMessages, currentUser, skills } from "@/lib/data/mockData";
import type { ChatMessage } from "@/lib/types";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

const quickPrompts = [
  { icon: BookOpen, label: "Explain Machine Learning", color: "text-brand-green" },
  { icon: Code2, label: "Review my Python code", color: "text-brand-blue" },
  { icon: Briefcase, label: "Career advice for ML Engineer", color: "text-yellow-400" },
  { icon: Lightbulb, label: "What project should I build?", color: "text-purple-400" },
];

const aiResponses: Record<string, string> = {
  default: `Great question! Let me break that down for you. 🎯

**Here's what you need to know:**

Machine learning is the process of training algorithms to learn patterns from data and make predictions without being explicitly programmed for each task.

**Key concepts:**
1. **Supervised Learning** – Learn from labeled examples (like spam detection)
2. **Unsupervised Learning** – Find hidden patterns in unlabeled data (like clustering)
3. **Reinforcement Learning** – Learn through trial and error (like game AI)

**Recommended next step for you:**
Since you've completed Python Foundations, I'd suggest starting with **Scikit-Learn** — it's the go-to library for classical ML in Python.

Would you like me to suggest a hands-on project to practice this? 🚀`,

  "Explain Machine Learning": `Here's a simple breakdown of Machine Learning! 🤖

Machine Learning lets computers learn from data instead of following explicit rules.

**Think of it like this:**
- Traditional programming: You write rules → Computer follows them
- Machine Learning: You show examples → Computer learns the rules

**The 3 main types:**
\`\`\`
Supervised   → Has labeled training data (most common)
Unsupervised → Finds patterns without labels
Reinforcement → Learns via rewards & penalties
\`\`\`

**Your learning path:**
Since you're at Level 7 and 62% into your ML journey, I recommend:
1. ✅ Complete the Data Visualization module (you're 60% done)
2. 🎯 Start Linear Regression next
3. 📦 Build the Movie Recommender project

You're on track, Arjun! Keep the momentum going 🔥`,

  "Career advice for ML Engineer": `Let me give you a clear ML career roadmap, Arjun! 💼

**Your current readiness: 63%** — Here's how to close the gap:

**Technical skills to focus on:**
| Priority | Skill | Your Level | Target |
|----------|-------|-----------|--------|
| 🔴 High | Deep Learning | 20% | 70% |
| 🟡 Medium | MLOps/Deployment | 10% | 60% |
| 🟢 Good | Python | 78% | 80% |

**Action plan for next 3 months:**
1. Complete IBM ML Certificate (you're 55% done)
2. Build 2 more ML projects for portfolio
3. Start practicing LeetCode Medium problems daily
4. Apply for ML internships at product companies

**Top companies hiring ML Engineers:** Google, Microsoft, Flipkart, Swiggy, Meesho

Want me to create a week-by-week study plan? 📅`,

  "What project should I build?": `Based on your skills and career goal, here are my top picks! 🚀

**🥇 Best choice for you right now:**

**Customer Churn Predictor**
- Perfect for your current ML skill level
- Uses Python, Pandas, Scikit-Learn, XGBoost
- Shows business impact (great for interviews!)
- Estimated time: 3-4 weeks

**Why this project?**
✅ Uses your strong Python skills
✅ Covers ML algorithms you're learning
✅ Real-world business relevance
✅ Good for ML Engineer portfolio
✅ Interview-friendly topic

**Tech stack:**
\`\`\`python
# Main libraries you'll use
import pandas as pd
import sklearn
import xgboost as xgb
import shap  # For explainability
import streamlit  # For deployment
\`\`\`

Want me to create a step-by-step project guide? 📋`,
};

export default function AIMentorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `m${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    await new Promise((r) => setTimeout(r, 1200));

    const responseText = aiResponses[text] || aiResponses.default;
    const aiMsg: ChatMessage = {
      id: `m${Date.now() + 1}`,
      role: "assistant",
      content: responseText,
      timestamp: new Date().toISOString(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatMessage = (text: string) => {
    // Simple markdown-like rendering
    return text
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="font-semibold text-slate-100">{line.slice(2, -2)}</p>;
        }
        if (line.startsWith("# ")) {
          return <h3 key={i} className="text-base font-bold text-slate-100 mt-2">{line.slice(2)}</h3>;
        }
        if (line.startsWith("- ")) {
          return <li key={i} className="ml-4 list-disc text-slate-300">{renderInlineBold(line.slice(2))}</li>;
        }
        if (line.startsWith("```")) {
          return null;
        }
        if (line === "") return <br key={i} />;
        return <p key={i} className="text-slate-300">{renderInlineBold(line)}</p>;
      });
  };

  const renderInlineBold = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="text-slate-100 font-semibold">{part}</strong> : part
    );
  };

  return (
    <div className="h-[calc(100vh-56px)] lg:h-[calc(100vh-56px)] flex flex-col lg:flex-row animate-fade-in overflow-hidden">
      {/* Context Panel - Desktop only */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-slate-700/60 bg-slate-800/30 p-4 gap-4 overflow-y-auto scrollbar-hidden shrink-0">
        {/* AI Avatar */}
        <div className="card p-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-slate-100">LearnPath AI</h3>
          <p className="text-xs text-brand-green mt-0.5">Your Personal Mentor</p>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            <span className="text-xs text-slate-400">Always available</span>
          </div>
        </div>

        {/* Student Context */}
        <div className="card p-4">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Your Context</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs text-slate-300">{currentUser.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs text-slate-300">{currentUser.careerTarget}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">🔥</span>
              <span className="text-xs text-slate-300">{currentUser.streak} day streak</span>
            </div>
          </div>
        </div>

        {/* Skill Progress */}
        <div className="card p-4">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Skill Progress</h4>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-300">{skill.name}</span>
                  <span className="text-xs text-slate-400">{skill.level}%</span>
                </div>
                <ProgressBar value={skill.level} color="green" size="xs" />
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div className="card p-4">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Try asking about</h4>
          <div className="flex flex-wrap gap-2">
            {["Python OOP", "Interview tips", "ML algorithms", "My roadmap", "Project ideas", "Resume review"].map((t) => (
              <button
                key={t}
                onClick={() => sendMessage(t)}
                className="text-xs px-2.5 py-1 rounded-full bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="border-b border-slate-700/60 px-4 py-3 flex items-center gap-3 bg-slate-800/30">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-100">AI Learning Mentor</h2>
            <p className="text-xs text-brand-green">Online · Ready to help</p>
          </div>
          <button
            onClick={() => setMessages(initialMessages)}
            className="ml-auto p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 transition-colors"
            title="Reset chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Quick Prompts - show only at start */}
          {messages.length <= 1 && (
            <div className="grid grid-cols-2 gap-2 max-w-lg mx-auto">
              {quickPrompts.map(({ icon: Icon, label, color }) => (
                <button
                  key={label}
                  onClick={() => sendMessage(label)}
                  className="card p-3 text-left hover:border-slate-500 transition-colors group"
                >
                  <Icon className={cn("w-4 h-4 mb-2", color)} />
                  <p className="text-xs text-slate-300 group-hover:text-slate-100 transition-colors">{label}</p>
                </button>
              ))}
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
            >
              {/* Avatar */}
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1",
                msg.role === "assistant"
                  ? "bg-gradient-to-br from-brand-green to-brand-blue"
                  : "bg-gradient-to-br from-purple-500 to-brand-blue"
              )}>
                {msg.role === "assistant" ? (
                  <Sparkles className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-white text-xs font-bold">AS</span>
                )}
              </div>

              {/* Bubble */}
              <div className={cn(
                "max-w-[80%] lg:max-w-[70%]",
                msg.role === "user" && "items-end"
              )}>
                <div className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "assistant"
                    ? "bg-slate-800 border border-slate-700 text-slate-300 rounded-tl-sm"
                    : "bg-brand-blue text-white rounded-tr-sm"
                )}>
                  {msg.role === "assistant" ? (
                    <div className="space-y-1">{formatMessage(msg.content)}</div>
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mt-1 px-1">
                    <button className="text-slate-500 hover:text-slate-300 transition-colors">
                      <Copy className="w-3 h-3" />
                    </button>
                    <button className="text-slate-500 hover:text-brand-green transition-colors">
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-700/60 p-4 bg-slate-800/30">
          {/* Mobile quick prompts */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hidden mb-3 lg:hidden">
            {quickPrompts.map(({ label }) => (
              <button
                key={label}
                onClick={() => sendMessage(label)}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-slate-700/60 text-slate-300 hover:bg-slate-700 transition-colors border border-slate-600/50"
              >
                {label}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 focus-within:border-brand-green/50 transition-colors">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Ask me anything — concepts, career advice, code reviews..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none resize-none"
                rows={1}
                style={{ maxHeight: "120px" }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 rounded-xl bg-brand-green text-slate-900 hover:bg-brand-green-light disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-center text-[11px] text-slate-600 mt-2">
            AI can make mistakes. Always verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
