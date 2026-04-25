import { useEffect, useState } from "react";
import { PASSPORTS, type Region, type SkillPassport } from "@/data/passport";

const KEY = "dsp.activeProfile.v1";
const REGION_KEY = "dsp.activeRegion.v1";

export interface OnboardingDraft {
  country: string;
  region: Region;
  language: string;
  setting: "Urban" | "Rural";
  educationLevel: string;
  experience: string;
  confirmedSkills: string[];
}

export const DEFAULT_DRAFT: OnboardingDraft = {
  country: "Ghana",
  region: "Sub-Saharan Africa",
  language: "English (Ghana)",
  setting: "Urban",
  educationLevel: "",
  experience: "",
  confirmedSkills: [],
};

export function saveProfile(passport: SkillPassport) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(passport));
  localStorage.setItem(REGION_KEY, passport.region);
}

export function loadProfile(): SkillPassport | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SkillPassport;
  } catch {
    return null;
  }
}

export function loadActiveRegion(): Region {
  if (typeof window === "undefined") return "Sub-Saharan Africa";
  const r = localStorage.getItem(REGION_KEY);
  if (r === "Sub-Saharan Africa" || r === "South Asia") return r;
  return "Sub-Saharan Africa";
}

export function setActiveRegion(region: Region) {
  if (typeof window === "undefined") return;
  localStorage.setItem(REGION_KEY, region);
  window.dispatchEvent(new CustomEvent("dsp:region", { detail: region }));
}

/** React hook: returns saved profile, falling back to demo passport for active region. */
export function useActiveProfile(): { passport: SkillPassport; region: Region; isCustom: boolean } {
  const [region, setRegion] = useState<Region>(() => loadActiveRegion());
  const [profile, setProfile] = useState<SkillPassport | null>(() => loadProfile());

  useEffect(() => {
    const sync = () => {
      setRegion(loadActiveRegion());
      setProfile(loadProfile());
    };
    window.addEventListener("storage", sync);
    window.addEventListener("dsp:region", sync as EventListener);
    window.addEventListener("dsp:profile", sync as EventListener);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("dsp:region", sync as EventListener);
      window.removeEventListener("dsp:profile", sync as EventListener);
    };
  }, []);

  if (profile && profile.region === region) {
    return { passport: profile, region, isCustom: true };
  }
  return { passport: PASSPORTS[region], region, isCustom: false };
}

export function notifyProfileChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("dsp:profile"));
}