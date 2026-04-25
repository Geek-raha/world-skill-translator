import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, Edit3, ExternalLink, Info, Share2 } from "lucide-react";
import { useActiveProfile } from "@/lib/profile-store";
import type { ProfileSkill, SkillCategory } from "@/data/passport";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Skills Profile — Digital Skill Passport" },
      {
        name: "description",
        content:
          "A portable, human-readable skills credential grouped by technical, interpersonal, and entrepreneurial work.",
      },
    ],
  }),
  component: ProfilePage,
});

const CATEGORY_LABEL: Record<SkillCategory, string> = {
  technical: "Technical",
  interpersonal: "Interpersonal",
  entrepreneurial: "Entrepreneurial",
};

const BUCKET_TONE: Record<ProfileSkill["bucket"], { dot: string; label: string }> = {
  durable: { dot: "var(--risk-low)", label: "Durable" },
  emerging: { dot: "var(--accent)", label: "Emerging" },
  at_risk: { dot: "var(--risk-high)", label: "At risk" },
};

function ProfilePage() {
  const { passport, isCustom } = useActiveProfile();
  const [openTip, setOpenTip] = useState<string | null>(null);

  const grouped: Record<SkillCategory, ProfileSkill[]> = {
    technical: [],
    interpersonal: [],
    entrepreneurial: [],
  };
  for (const s of passport.skills) grouped[s.category].push(s);

  function copyShareLink() {
    if (typeof window === "undefined") return;
    navigator.clipboard?.writeText(window.location.href);
  }

  return (
    <main className="pb-20">
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 sm:pt-12">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Module 01 · Skills Profile
          </p>
          {!isCustom && (
            <Link
              to="/onboarding"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            >
              Demo data — start onboarding →
            </Link>
          )}
        </div>

        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Your portable credential.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Grouped in plain language — not jargon. ISCO-08 codes are present for
          systems that need them, but you stay in the driver's seat.
        </p>

        {/* Action bar */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={copyShareLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted"
          >
            <Share2 className="h-3.5 w-3.5" /> Copy share link
          </button>
          <button
            onClick={() => typeof window !== "undefined" && window.print()}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted"
          >
            <Download className="h-3.5 w-3.5" /> Export PDF
          </button>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted"
          >
            <Edit3 className="h-3.5 w-3.5" /> Edit
          </Link>
        </div>

        {/* Header card */}
        <motion.section
          layout
          className="mt-6 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-elevated)]"
          style={{ background: "var(--gradient-ink)", color: "var(--surface-ink-foreground)" }}
        >
          <div className="grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-surface-ink-foreground/60">
                {passport.country} · {passport.region}
              </p>
              <p className="mt-3 font-display text-xl italic leading-snug">
                "{passport.informal_input}"
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <span className="rounded-full bg-surface-ink-foreground/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
                ISCO-08 aligned
              </span>
              <span className="font-display text-lg font-semibold">
                {passport.skills.length} skills mapped
              </span>
            </div>
          </div>
        </motion.section>

        {/* Visual map */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {(Object.keys(grouped) as SkillCategory[]).map((cat) => (
            <section
              key={cat}
              className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold tracking-tight">
                  {CATEGORY_LABEL[cat]}
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {grouped[cat].length}
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {grouped[cat].length === 0 ? (
                  <li className="text-xs italic text-muted-foreground">
                    No skills in this category yet.
                  </li>
                ) : (
                  grouped[cat].map((s) => (
                    <li
                      key={s.name}
                      className="rounded-2xl border border-border/70 bg-surface-paper p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-display text-sm font-semibold leading-snug">
                            {s.name}
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ background: BUCKET_TONE[s.bucket].dot }}
                            />
                            {BUCKET_TONE[s.bucket].label}
                            {s.isco && (
                              <span className="font-mono">· ISCO {s.isco}</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => setOpenTip((t) => (t === s.name ? null : s.name))}
                          aria-label={`Explain ${s.name}`}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <Info className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      {openTip === s.name && (
                        <p className="mt-2 rounded-xl bg-muted/60 p-2.5 text-xs leading-relaxed text-foreground">
                          {s.meaning}
                        </p>
                      )}
                    </li>
                  ))
                )}
              </ul>
            </section>
          ))}
        </div>

        {/* Next steps */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            to="/readiness"
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] hover:bg-muted"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Next
              </p>
              <p className="font-display text-base font-semibold">AI Readiness assessment</p>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </Link>
          <Link
            to="/opportunities"
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] hover:bg-muted"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Then
              </p>
              <p className="font-display text-base font-semibold">Matched opportunities</p>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </main>
  );
}