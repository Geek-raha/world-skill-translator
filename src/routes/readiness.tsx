import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldAlert, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { useActiveProfile } from "@/lib/profile-store";
import type { ProfileSkill, SkillBucket } from "@/data/passport";
import { useAgentResponse } from "@/lib/agent-response";

export const Route = createFileRoute("/readiness")({
  head: () => ({
    meta: [
      { title: "AI Readiness — UNMAPPED" },
      {
        name: "description",
        content:
          "An honest assessment of which skills are at risk, durable, and emerging — calibrated for LMIC task composition.",
      },
    ],
  }),
  component: ReadinessPage,
});

const BUCKET_META: Record<
  SkillBucket,
  { label: string; tagline: string; bg: string; fg: string; icon: typeof ShieldCheck }
> = {
  at_risk: {
    label: "At risk",
    tagline: "Likely to be automated or restructured by 2030.",
    bg: "var(--risk-high)",
    fg: "var(--risk-high-foreground)",
    icon: ShieldAlert,
  },
  durable: {
    label: "Durable",
    tagline: "Anchored in physical, social, or trust-based work.",
    bg: "var(--risk-low)",
    fg: "var(--risk-low-foreground)",
    icon: ShieldCheck,
  },
  emerging: {
    label: "Emerging",
    tagline: "Growing demand, often working alongside AI tools.",
    bg: "var(--accent)",
    fg: "var(--accent-foreground)",
    icon: Sparkles,
  },
};

function ReadinessPage() {
  const { passport } = useActiveProfile();
  const agent = useAgentResponse();

  // Prefer agent-provided risk level if present.
  const riskLevel = agent?.automation_risk_level ?? passport.automation_risk_level;
  const gaugePosition = riskLevel === "Low" ? 16 : riskLevel === "Medium" ? 50 : 84;
  const gaugeTone =
    riskLevel === "High"
      ? { bg: "var(--risk-high)", fg: "var(--risk-high-foreground)", label: "High exposure" }
      : riskLevel === "Medium"
      ? { bg: "var(--risk-medium)", fg: "var(--risk-medium-foreground)", label: "Mixed exposure" }
      : { bg: "var(--risk-low)", fg: "var(--risk-low-foreground)", label: "Resilient" };

  const grouped: Record<SkillBucket, ProfileSkill[]> = {
    at_risk: [],
    durable: [],
    emerging: [],
  };
  for (const s of passport.skills) grouped[s.bucket].push(s);

  const total = passport.skills.length || 1;
  const breakdown = (Object.keys(grouped) as SkillBucket[]).map((b) => ({
    bucket: b,
    count: grouped[b].length,
    pct: Math.round((grouped[b].length / total) * 100),
  }));

  return (
    <main className="pb-20">
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 sm:pt-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Module 02 · AI Readiness & displacement risk
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Honest, not alarming.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          We tell you what's shifting and what isn't — calibrated for {passport.country}.
        </p>

        {/* Automation risk gauge — driven by agent response when available */}
        <section
          className="mt-6 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-elevated)]"
          style={{ background: "var(--gradient-ink)", color: "var(--surface-ink-foreground)" }}
        >
          <div className="space-y-5 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-surface-ink-foreground/60">
                  Automation risk index
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold leading-tight">
                  {gaugeTone.label}
                </h3>
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: gaugeTone.bg, color: gaugeTone.fg }}
              >
                {riskLevel}
              </span>
            </div>
            <div className="space-y-2">
              <div className="relative h-3 overflow-hidden rounded-full">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{ background: "var(--gradient-risk-meter)" }}
                />
                <motion.div
                  className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-surface-ink-foreground shadow-[var(--shadow-elevated)]"
                  style={{ background: gaugeTone.bg }}
                  initial={{ left: "0%" }}
                  animate={{ left: `${gaugePosition}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.15 }}
                />
              </div>
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-surface-ink-foreground/50">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
          </div>
        </section>

        {/* Calibration banner */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Calibrated for {passport.country} · LMIC urban informal economy
          </p>
        </div>

        {/* Stacked bar */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex h-3">
            {breakdown.map(({ bucket, pct }) => (
              <motion.div
                key={bucket}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: BUCKET_META[bucket].bg }}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 divide-x divide-border">
            {breakdown.map(({ bucket, count, pct }) => {
              const m = BUCKET_META[bucket];
              return (
                <div key={bucket} className="px-3 py-3 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {m.label}
                  </p>
                  <p className="mt-1 font-display text-2xl font-semibold">{pct}%</p>
                  <p className="text-[10px] text-muted-foreground">{count} skills</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skill breakdown */}
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {(Object.keys(grouped) as SkillBucket[]).map((b) => {
            const meta = BUCKET_META[b];
            const Icon = meta.icon;
            return (
              <section
                key={b}
                className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ background: meta.bg, color: meta.fg }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <h2 className="font-display text-lg font-semibold">{meta.label}</h2>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{meta.tagline}</p>
                <ul className="mt-3 space-y-2">
                  {grouped[b].length === 0 ? (
                    <li className="text-xs italic text-muted-foreground">
                      No skills in this band.
                    </li>
                  ) : (
                    grouped[b].map((s) => (
                      <li
                        key={s.name}
                        className="rounded-xl border border-border/70 bg-surface-paper p-3"
                      >
                        <p className="font-display text-sm font-semibold">{s.name}</p>
                        <p className="mt-1 text-xs leading-snug text-muted-foreground">
                          {s.meaning}
                        </p>
                      </li>
                    ))
                  )}
                </ul>
              </section>
            );
          })}
        </div>

        {/* What's shifting */}
        <section
          className="mt-8 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-elevated)]"
          style={{ background: "var(--gradient-ink)", color: "var(--surface-ink-foreground)" }}
        >
          <div className="border-b border-surface-ink-foreground/10 px-5 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-surface-ink-foreground/60">
              What's shifting · Wittgenstein Centre projections
            </p>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {passport.shifts.map((s) => (
              <div
                key={s.year}
                className="rounded-2xl border border-surface-ink-foreground/10 bg-surface-ink-foreground/5 p-4"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-surface-ink-foreground/70" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-surface-ink-foreground/60">
                    By {s.year}
                  </span>
                </div>
                <p className="mt-2 font-display text-base font-semibold">{s.label}</p>
                <p className="mt-1 text-sm leading-snug text-surface-ink-foreground/80">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Adjacent skills */}
        <section className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Adding these would lower your risk
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Adjacent skills with the highest leverage for your current profile.
          </p>
          <ul className="mt-4 space-y-3">
            {passport.adjacentSkills.map((a) => (
              <li
                key={a.name}
                className="flex items-start justify-between gap-3 rounded-2xl border border-border/70 bg-surface-paper p-4"
              >
                <div>
                  <p className="font-display text-sm font-semibold">{a.name}</p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{a.effect}</p>
                </div>
                <Link
                  to="/opportunities"
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
                >
                  Find training <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Transparency */}
        <p className="mt-8 rounded-2xl border border-dashed border-border bg-card/50 p-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Uses Frey-Osborne automation scores · re-weighted for LMIC task composition · no
          single number captures a person.
        </p>
      </div>
    </main>
  );
}