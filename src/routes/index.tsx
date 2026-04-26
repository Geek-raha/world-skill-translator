import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Compass, Globe2, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Skill Passport — Labor intelligence for everyone" },
      {
        name: "description",
        content:
          "Translate informal experience into globally legible credentials. Country-agnostic infrastructure aligned to ISCO-08, ILOSTAT, and Wittgenstein Centre projections.",
      },
      { property: "og:title", content: "Digital Skill Passport" },
      {
        property: "og:description",
        content:
          "An honest assessment of skills, automation risk, and opportunity — calibrated for low- and middle-income economies.",
      },
    ],
  }),
  component: LandingPage,
});

const FLOW = [
  {
    step: "01",
    title: "Skills Signal Engine",
    body: "Tell us in your own words what you do. We translate it into ISCO-08 skills you can actually share.",
    // href: "/onboarding",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "AI Readiness Lens",
    body: "An honest, calibrated view of which skills are at risk, which are durable, and which are emerging.",
    // href: "/readiness",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "Opportunity Match",
    body: "Real wage ranges, sector growth, and reach indicators — for jobs, gigs, training, and fellowships.",
    // href: "/opportunities",
    icon: Compass,
  },
] as const;

function LandingPage() {
  return (
    <main className="pb-20">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {/* Module 01–03 · Country-agnostic */}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              The credential the
              <br />
              informal economy
              <br />
              do not have.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Amara fixes phones in Accra. Riya tailors from a one-room studio in Dhaka. Both have skills the labour
              market do not read. The Digital Skill Passport translates informal experience into globally legible
              signals — calibrated honestly for the economies most workers actually live in.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/signup/youth"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-[var(--shadow-elevated)]"
                style={{
                  background: "var(--gradient-ink)",
                  color: "var(--surface-ink-foreground)",
                }}
              >
                Create youth account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/signup/policymaker"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
              >
                <BarChart3 className="h-4 w-4" />
                Policymaker access
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-3xl border border-border p-6 shadow-[var(--shadow-elevated)]"
            style={{ background: "var(--gradient-ink)", color: "var(--surface-ink-foreground)" }}
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-surface-ink-foreground/60">
                {/* Live demo signal */}
              </p>
              <Globe2 className="h-4 w-4 text-surface-ink-foreground/60" />
            </div>
            <p className="mt-3 font-display text-2xl font-semibold leading-tight">
              "I fix broken phone screens and watch python tutorials on YouTube."
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Hardware Diagnostics", "Python Scripting", "Customer Triage"].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-surface-ink-foreground/20 bg-surface-ink-foreground/5 px-3 py-1 text-xs"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-surface-ink-foreground/5 p-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-surface-ink-foreground/60">
                  ISCO match
                </p>
                <p className="mt-1 font-display text-lg font-semibold">3512</p>
              </div>
              <div className="rounded-2xl bg-surface-ink-foreground/5 p-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-surface-ink-foreground/60">Risk</p>
                <p className="mt-1 font-display text-lg font-semibold">Medium</p>
              </div>
              <div className="rounded-2xl bg-surface-ink-foreground/5 p-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-surface-ink-foreground/60">
                  Sector
                </p>
                <p className="mt-1 font-display text-lg font-semibold">+4.2%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            How the passport gets built
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {/* Three modules · one flow */}
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {FLOW.map((f) => (
            <Link
              key={f.step}
              to={f.href}
              className="group flex flex-col rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="flex items-center justify-between">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: "var(--gradient-ink)", color: "var(--surface-ink-foreground)" }}
                >
                  <f.icon className="h-4 w-4" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Step {f.step}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-foreground transition-transform group-hover:translate-x-1">
                Open <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust footer */}
      <p className="mt-16 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        Aligned to ISCO-08 · ILOSTAT · World Bank WDI · Wittgenstein Centre projections
      </p>
    </main>
  );
}
