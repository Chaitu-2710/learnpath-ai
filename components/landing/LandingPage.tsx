"use client";

import { useState } from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingHero from "@/components/landing/LandingHero";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingComparison from "@/components/landing/LandingComparison";
import LandingCourses from "@/components/landing/LandingCourses";
import LandingFAQ from "@/components/landing/LandingFAQ";
import LandingFooter from "@/components/landing/LandingFooter";
import GetStartedModal from "@/components/ui/GetStartedModal";
import { ThemeProvider } from "@/lib/theme/ThemeContext";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const router = useRouter();

  const handleGetStartedClick = () => {
    setIsGetStartedOpen(true);
  };

  const handleModalSuccess = (data: { careerTarget: string; level: string }) => {
    // Navigate to signup with prefilled goal
    router.push(`/signup?goal=${encodeURIComponent(data.careerTarget)}&level=${encodeURIComponent(data.level)}`);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors antialiased font-sans">
        {/* Navigation */}
        <LandingNavbar onGetStartedClick={handleGetStartedClick} />

        {/* Main Content Sections */}
        <main>
          <LandingHero onGetStartedClick={handleGetStartedClick} />
          <LandingFeatures />
          <LandingComparison />
          <LandingCourses onGetStartedClick={handleGetStartedClick} />
          <LandingFAQ />
        </main>

        {/* Footer */}
        <LandingFooter onGetStartedClick={handleGetStartedClick} />

        {/* Get Started Modal Dialog */}
        <GetStartedModal
          isOpen={isGetStartedOpen}
          onClose={() => setIsGetStartedOpen(false)}
          onSuccess={handleModalSuccess}
        />
      </div>
    </ThemeProvider>
  );
}
