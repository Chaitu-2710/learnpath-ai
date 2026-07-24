"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * NavigationProgress — thin green bar at the top of the page
 * that fires instantly on every route change, giving the user
 * immediate visual feedback that navigation is happening.
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPathRef.current) return;
    prevPathRef.current = pathname;

    // Start progress
    setProgress(0);
    setVisible(true);

    // Fast initial jump to 30%
    const t1 = setTimeout(() => setProgress(30), 10);
    // Slower crawl to 70%
    const t2 = setTimeout(() => setProgress(70), 200);
    // Hold at 90% while page renders
    const t3 = setTimeout(() => setProgress(90), 500);
    // Complete
    const t4 = setTimeout(() => {
      setProgress(100);
      // Hide after completion animation
      const t5 = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
      timerRef.current = t5;
    }, 800);

    timerRef.current = t4;

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms" }}
    >
      <div
        className="h-full bg-brand-green shadow-[0_0_8px_rgba(34,197,94,0.8)]"
        style={{
          width: `${progress}%`,
          transition:
            progress === 100
              ? "width 200ms ease-out"
              : "width 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}
