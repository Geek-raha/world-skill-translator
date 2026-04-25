import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Sparkles, Target, TrendingUp, Wallet, Lock } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useActiveProfile } from "@/lib/profile-store";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import type { Opportunity } from "@/data/passport";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunities — Digital Skill Passport" },
      {
        name: "description",
        content:
          "Matched jobs, gigs, freelance work, training, and fellowships — with real wage ranges and reach indicators.",
      },
    ],
  }),
  component: OpportunitiesPage,
});

const TYPES: Opportunity["type"][] = ["Formal job", "Gig", "Freelance", "Training", "Fellowship"];

const REACH_TONE: Record<Opportunity["reach"], { bg: string; fg: string }> = {
  "Within reach": { bg: "var(--risk-low)", fg: "var(--risk-low-foreground)" },
  Stretch: { bg: "var(--risk-medium)", fg: "var(--risk-medium-foreground)" },
  Aspirational: { bg: "var(--risk-high)", fg: "var(--risk-high-foreground)" },
};

const TYPE_ICON: Record<Opportunity["type"], typeof Briefcase> = {
  "Formal job": Briefcase,
  Gig: Target,
  Freelance: Sparkles,
  Training: GraduationCap,
  Fellowship: Wallet,
};

function OpportunitiesPage() {
  const { passport } = useActiveProfile();
  const [filter, setFilter] = useState<Opportunity["type"] | "All">("All");
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  function handleApply(o: Opportunity) {
    if (loading) return;
    if (!user) {
      toast.info("Sign in to apply", {
        description: "Create an account or sign in to apply for opportunities.",
      });
      navigate({ to: "/auth" });
      return;
    }
    toast.success("Application started", {
      description: `Your interest in “${o.title}” at ${o.employer} has been recorded.`,
    });
  }

  const visible = useMemo(
    () =>
      passport.opportunities
        .filter((o) => filter === "All" || o.type === filter)
        .sort((a, b) => b.matchScore - a.matchScore),
    [filter, passport.opportunities]
  );

  return (
    <main className="pb-20">
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 sm:pt-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Module 03 · Opportunity matching
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Grounded, not aspirational.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Every card shows wage range, sector growth, and how attainable it really is for you
          in {passport.country}.
        </p>

        {/* Filter chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(["All", ...TYPES] as const).map((t) => {
            const active = filter === t;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  background: active ? "var(--surface-ink)" : "var(--card)",
                  color: active ? "var(--surface-ink-foreground)" : "var(--muted-foreground)",
                  borderColor: active ? "var(--surface-ink)" : "var(--border)",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {visible.map((o, i) => {
            const Icon = TYPE_ICON[o.type];
            const reach = REACH_TONE[o.reach];
            return (
              <motion.article
                key={o.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex flex-col rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ background: "var(--gradient-ink)", color: "var(--surface-ink-foreground)" }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {o.type}
                      </p>
                      <h3 className="font-display text-base font-semibold leading-tight">
                        {o.title}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Match
                    </p>
                    <p className="font-display text-xl font-semibold">{o.matchScore}</p>
                  </div>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">{o.employer}</p>

                {/* Wage */}
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Wage range · ILOSTAT
                    </p>
                    <p className="font-display text-base font-semibold">{o.wageRange}</p>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ background: reach.bg, color: reach.fg }}
                  >
                    {o.reach}
                  </span>
                </div>

                {/* Econometric signals */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-border/70 bg-surface-paper p-3">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em]">
                        Sector growth
                      </p>
                    </div>
                    <p className="mt-1 text-xs font-semibold">{o.sectorGrowth}</p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-surface-paper p-3">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Wallet className="h-3 w-3" />
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em]">
                        Wage floor
                      </p>
                    </div>
                    <p className="mt-1 text-xs font-semibold">{o.wageFloor}</p>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-snug text-muted-foreground">
                  <span className="font-semibold text-foreground">Why matched: </span>
                  {o.whyMatched}
                </p>

                {o.skillGap && o.skillGap.length > 0 && (
                  <div className="mt-4 rounded-2xl border border-dashed border-border bg-background p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      What would get you there
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {o.skillGap.map((g) => (
                        <span
                          key={g}
                          className="rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-medium text-foreground"
                        >
                          + {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between gap-3">
                  {!user && !loading && (
                    <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      Sign in required
                    </p>
                  )}
                  <Button
                    onClick={() => handleApply(o)}
                    disabled={loading}
                    size="sm"
                    className="ml-auto rounded-full"
                  >
                    {user ? "Apply now" : "Sign in to apply"}
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            No opportunities of this type for your profile yet.
          </p>
        )}
      </div>
    </main>
  );
}