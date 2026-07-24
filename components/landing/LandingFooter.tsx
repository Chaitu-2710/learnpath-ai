"use client";

import { Sparkles, ArrowRight, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

interface LandingFooterProps {
  onGetStartedClick: () => void;
}

export default function LandingFooter({ onGetStartedClick }: LandingFooterProps) {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 transition-colors">
      {/* Top Newsletter Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-slate-800/80">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">Stay updated with AI Learning Trends</h3>
            <p className="text-slate-400 text-sm">
              Subscribe to get weekly machine learning roadmaps, Python tips, and platform updates.
            </p>
          </div>
          <div className="lg:col-span-5 flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-4 py-3 rounded-full bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <button className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 font-medium text-xs text-white shrink-0 transition-colors flex items-center gap-1">
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Col 1 & 2: Brand */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-900">
              <Sparkles className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="font-extrabold text-lg tracking-tight">
              LearnPath <span className="text-emerald-400">AI</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            The Apple-inspired AI learning platform designed to accelerate tech mastery with personalized roadmaps and 24/7 AI mentorship.
          </p>
          <div className="flex items-center gap-3 text-slate-400 pt-2">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Col 3: Navigation */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Platform</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="#features" className="hover:text-emerald-400 transition-colors">Features</a></li>
            <li><a href="#why-us" className="hover:text-emerald-400 transition-colors">Why Us</a></li>
            <li><a href="#courses" className="hover:text-emerald-400 transition-colors">Courses</a></li>
            <li><a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Col 4: Resources */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Resources</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">API Docs</a></li>
            <li><button onClick={onGetStartedClick} className="hover:text-emerald-400 transition-colors text-left">Get Started</button></li>
            <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Sign In</Link></li>
            <li><Link href="/signup" className="hover:text-emerald-400 transition-colors">Sign Up</Link></li>
          </ul>
        </div>

        {/* Col 5: Legal */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Legal</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><span className="hover:text-slate-100 cursor-pointer">Privacy Policy</span></li>
            <li><span className="hover:text-slate-100 cursor-pointer">Terms of Service</span></li>
            <li><span className="hover:text-slate-100 cursor-pointer">Security</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} LearnPath AI Inc. All rights reserved.</p>
        <p>Apple-inspired design system · Powered by Google Gemini AI</p>
      </div>
    </footer>
  );
}
