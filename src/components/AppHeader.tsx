import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { loadActiveRegion } from "@/lib/profile-store";
import type { Region } from "@/data/passport";

const NAV = [
  { to: "/onboarding", label: "Onboarding" },
  { to: "/profile", label: "Skills Profile" },
  { to: "/readiness", label: "AI Readiness" },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/policymaker", label: "Policymaker" },
  { to: "/config", label: "Config" },
] as const;

export function AppHeader() {
  const { location } = useRouterState();
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState<Region>("Sub-Saharan Africa");

  useEffect(() => {
    setRegion(loadActiveRegion());
    const sync = () => setRegion(loadActiveRegion());
    window.addEventListener("dsp:region", sync as EventListener);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("dsp:region", sync as EventListener);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="sticky top-0 z-30 border-b border-border/70 backdrop-blur"
      style={{ background: "color-mix(in oklab, var(--background) 85%, transparent)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg font-display text-sm font-bold"
            style={{ background: "var(--gradient-ink)", color: "var(--surface-ink-foreground)" }}
          >
            D
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-semibold tracking-tight">
              Digital Skill Passport
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              {region}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{
                className:
                  "rounded-full px-3 py-1.5 text-xs font-semibold text-foreground bg-muted",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-card/90 lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col p-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                activeProps={{
                  className:
                    "rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground bg-muted",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}