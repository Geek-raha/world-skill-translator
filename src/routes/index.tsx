import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RegionToggle } from "@/components/RegionToggle";
import { SkillTranslationCard } from "@/components/SkillTranslationCard";
import { RiskGauge } from "@/components/RiskGauge";
import { PASSPORTS, type Region } from "@/data/passport";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [region, setRegion] = useState<Region>("Sub-Saharan Africa");
  const passport = PASSPORTS[region];

  return (
    <main
      className="min-h-screen pb-12"
      style={{ background: "var(--gradient-paper)" }}
    >
      <div className="mx-auto max-w-md px-4 pt-6 sm:max-w-lg sm:px-6 sm:pt-10">
        {/* Brand bar */}
        <header className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg font-display text-sm font-bold"
              style={{ background: "var(--gradient-ink)", color: "var(--surface-ink-foreground)" }}
            >
              D
            </div>
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold tracking-tight">
                Digital Skill Passport
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Labor Intelligence · v0.1
              </p>
            </div>
          </div>
          <span className="rounded-full border border-border bg-card px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            Live
          </span>
        </header>

        {/* Region toggle */}
        <RegionToggle value={region} onChange={setRegion} />

        {/* Region context line */}
        <div className="mt-5 flex items-baseline justify-between">
          <h1 className="font-display text-3xl font-semibold leading-none tracking-tight sm:text-4xl">
            {region}
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Region
          </p>
        </div>
        <p className="mt-2 text-sm leading-snug text-muted-foreground">
          Translating informal labor into globally legible credentials.
        </p>

        {/* Animated content */}
        <div className="mt-6 space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={region}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <SkillTranslationCard passport={passport} />
              <RiskGauge passport={passport} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footnote */}
        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Aligned to ISCO-08 · World Bank methodology
        </p>
      </div>
    </main>
  );
}
