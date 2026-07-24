/**
 * Skeleton loading components for all pages.
 * These render instantly while API data loads.
 */

// ── Base pulse block ──────────────────────────────────────────────────────────
export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-slate-700/60 rounded-lg animate-pulse ${className}`}
    />
  );
}

// ── Dashboard skeleton ────────────────────────────────────────────────────────
export function DashboardSkeleton() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card p-4 space-y-3">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-8 w-16" />
            <SkeletonBlock className="h-2 w-full" />
          </div>
        ))}
      </div>
      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5 space-y-3">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-40 w-full" />
        </div>
        <div className="card p-5 space-y-3">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-40 w-full" />
        </div>
      </div>
      {/* Tasks */}
      <div className="card p-5 space-y-3">
        <SkeletonBlock className="h-4 w-24" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <SkeletonBlock className="h-5 w-5 rounded-full shrink-0" />
            <SkeletonBlock className="h-4 flex-1" />
            <SkeletonBlock className="h-4 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Generic page skeleton (cards + list) ──────────────────────────────────────
export function PageSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="space-y-1">
        <SkeletonBlock className="h-7 w-48" />
        <SkeletonBlock className="h-4 w-72" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(cards)].map((_, i) => (
          <div key={i} className="card p-5 space-y-3">
            <SkeletonBlock className="h-36 w-full rounded-lg" />
            <SkeletonBlock className="h-4 w-3/4" />
            <SkeletonBlock className="h-3 w-full" />
            <SkeletonBlock className="h-3 w-2/3" />
            <SkeletonBlock className="h-9 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AI Mentor skeleton ────────────────────────────────────────────────────────
export function AIMentorSkeleton() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/60 flex items-center gap-3">
        <SkeletonBlock className="w-10 h-10 rounded-xl shrink-0" />
        <div className="space-y-1.5">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-3 w-48" />
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-hidden">
        {/* AI message */}
        <div className="flex gap-3 max-w-lg">
          <SkeletonBlock className="w-8 h-8 rounded-lg shrink-0" />
          <div className="space-y-2 flex-1">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-5/6" />
            <SkeletonBlock className="h-4 w-4/6" />
          </div>
        </div>
        {/* User message */}
        <div className="flex gap-3 max-w-sm ml-auto flex-row-reverse">
          <SkeletonBlock className="w-8 h-8 rounded-lg shrink-0" />
          <div className="space-y-2 flex-1">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-3/4" />
          </div>
        </div>
        {/* Another AI message */}
        <div className="flex gap-3 max-w-xl">
          <SkeletonBlock className="w-8 h-8 rounded-lg shrink-0" />
          <div className="space-y-2 flex-1">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-2/3" />
          </div>
        </div>
      </div>
      {/* Input */}
      <div className="p-4 border-t border-slate-700/60">
        <SkeletonBlock className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}

// ── Profile skeleton ──────────────────────────────────────────────────────────
export function ProfileSkeleton() {
  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-4xl">
      {/* Profile card */}
      <div className="card p-6">
        <div className="flex gap-5">
          <SkeletonBlock className="w-20 h-20 rounded-2xl shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock className="h-6 w-40" />
            <SkeletonBlock className="h-4 w-32" />
            <div className="flex gap-2">
              <SkeletonBlock className="h-6 w-24 rounded-full" />
              <SkeletonBlock className="h-6 w-20 rounded-full" />
              <SkeletonBlock className="h-6 w-28 rounded-full" />
            </div>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-slate-700/60 space-y-2">
          <SkeletonBlock className="h-3 w-full" />
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card p-4 space-y-2 text-center">
            <SkeletonBlock className="h-6 w-6 mx-auto rounded-full" />
            <SkeletonBlock className="h-6 w-12 mx-auto" />
            <SkeletonBlock className="h-3 w-20 mx-auto" />
          </div>
        ))}
      </div>
      {/* Skills + achievements */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5 space-y-3">
          <SkeletonBlock className="h-4 w-24" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between">
                <SkeletonBlock className="h-3 w-24" />
                <SkeletonBlock className="h-3 w-8" />
              </div>
              <SkeletonBlock className="h-2 w-full" />
            </div>
          ))}
        </div>
        <div className="card p-5 space-y-3">
          <SkeletonBlock className="h-4 w-28" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg">
              <SkeletonBlock className="h-8 w-8 rounded-lg shrink-0" />
              <div className="flex-1 space-y-1">
                <SkeletonBlock className="h-3 w-32" />
                <SkeletonBlock className="h-2 w-48" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Career skeleton ───────────────────────────────────────────────────────────
export function CareerSkeleton() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="space-y-1">
        <SkeletonBlock className="h-7 w-48" />
        <SkeletonBlock className="h-4 w-64" />
      </div>
      <div className="card p-6">
        <div className="flex gap-6">
          <SkeletonBlock className="w-36 h-36 rounded-full shrink-0" />
          <div className="flex-1 space-y-3">
            <SkeletonBlock className="h-6 w-48" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-3/4" />
            <div className="flex gap-2">
              <SkeletonBlock className="h-9 w-28 rounded-lg" />
              <SkeletonBlock className="h-9 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="card p-5 space-y-3">
            <div className="flex justify-between">
              <SkeletonBlock className="h-4 w-32" />
              <SkeletonBlock className="h-4 w-4" />
            </div>
            <SkeletonBlock className="h-8 w-16" />
            <SkeletonBlock className="h-2 w-full" />
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5 space-y-3">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-44 w-full" />
        </div>
        <div className="card p-5 space-y-3">
          <SkeletonBlock className="h-4 w-24" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-1">
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-2 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Roadmap skeleton ──────────────────────────────────────────────────────────
export function RoadmapSkeleton() {
  return (
    <div className="p-4 lg:p-6 space-y-4">
      <div className="space-y-1">
        <SkeletonBlock className="h-7 w-48" />
        <SkeletonBlock className="h-4 w-64" />
      </div>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="card overflow-hidden">
          <div className="p-4 flex items-center gap-4 border-b border-slate-700/60">
            <SkeletonBlock className="w-10 h-10 rounded-xl shrink-0" />
            <div className="flex-1 space-y-1.5">
              <SkeletonBlock className="h-4 w-48" />
              <SkeletonBlock className="h-3 w-32" />
            </div>
            <SkeletonBlock className="h-6 w-20 rounded-full" />
          </div>
          <div className="p-4 space-y-2">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="flex items-center gap-3">
                <SkeletonBlock className="h-4 w-4 rounded-full shrink-0" />
                <SkeletonBlock className="h-3 flex-1" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Assessment skeleton ───────────────────────────────────────────────────────
export function AssessmentSkeleton() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="space-y-1">
        <SkeletonBlock className="h-7 w-48" />
        <SkeletonBlock className="h-4 w-64" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="card p-5 space-y-4">
            <div className="flex items-center gap-3">
              <SkeletonBlock className="h-10 w-10 rounded-xl shrink-0" />
              <div className="flex-1 space-y-1.5">
                <SkeletonBlock className="h-4 w-32" />
                <SkeletonBlock className="h-3 w-20" />
              </div>
            </div>
            <SkeletonBlock className="h-3 w-full" />
            <SkeletonBlock className="h-3 w-5/6" />
            <div className="flex justify-between pt-1">
              <SkeletonBlock className="h-5 w-16 rounded-full" />
              <SkeletonBlock className="h-5 w-12 rounded-full" />
            </div>
            <SkeletonBlock className="h-9 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Settings skeleton ─────────────────────────────────────────────────────────
export function SettingsSkeleton() {
  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-2xl">
      <div className="space-y-1">
        <SkeletonBlock className="h-7 w-32" />
        <SkeletonBlock className="h-4 w-56" />
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <SkeletonBlock className="h-4 w-4 rounded" />
            <SkeletonBlock className="h-4 w-32" />
          </div>
          {[...Array(3)].map((_, j) => (
            <div key={j} className="flex items-center justify-between">
              <div className="space-y-1">
                <SkeletonBlock className="h-3 w-36" />
                <SkeletonBlock className="h-2 w-52" />
              </div>
              <SkeletonBlock className="h-6 w-11 rounded-full" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Coding skeleton ───────────────────────────────────────────────────────────
export function CodingSkeleton() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="space-y-1">
        <SkeletonBlock className="h-7 w-48" />
        <SkeletonBlock className="h-4 w-56" />
      </div>
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <SkeletonBlock key={i} className="h-8 w-16 rounded-full" />
        ))}
      </div>
      <div className="space-y-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card p-4 flex items-center gap-4">
            <SkeletonBlock className="h-5 w-5 rounded-full shrink-0" />
            <div className="flex-1 space-y-1">
              <SkeletonBlock className="h-4 w-64" />
              <SkeletonBlock className="h-3 w-32" />
            </div>
            <SkeletonBlock className="h-5 w-14 rounded-full" />
            <SkeletonBlock className="h-5 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
