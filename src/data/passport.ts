export type Region = "Sub-Saharan Africa" | "South Asia";

export type RiskLevel = "Low" | "Medium" | "High";

export interface SkillPassport {
  region: Region;
  informal_input: string;
  formal_skills: string[];
  isco_matched_roles: string[];
  automation_risk_level: RiskLevel;
  automation_analysis: string;
  econometric_signal: string;
}

export const PASSPORTS: Record<Region, SkillPassport> = {
  "Sub-Saharan Africa": {
    region: "Sub-Saharan Africa",
    informal_input: "I fix broken phone screens and watch python tutorials on youtube.",
    formal_skills: ["Hardware Diagnostics", "Basic Scripting (Python)", "Customer Triage"],
    isco_matched_roles: [
      "ICT User Support Technician (ISCO 3512)",
      "Electronics Mechanic (ISCO 7421)",
    ],
    automation_risk_level: "Medium",
    automation_analysis:
      "While routine coding faces high disruption, physical hardware repair maintains a durable wage floor due to manual dexterity requirements.",
    econometric_signal: "ICT sector employment growing at 4.2% annually in urban hubs.",
  },
  "South Asia": {
    region: "South Asia",
    informal_input:
      "I tailor clothes from home and learned graphic design on a borrowed laptop.",
    formal_skills: ["Garment Construction", "Adobe Suite Proficiency", "Client Brief Translation"],
    isco_matched_roles: [
      "Tailor / Dressmaker (ISCO 7531)",
      "Graphic & Multimedia Designer (ISCO 2166)",
    ],
    automation_risk_level: "Low",
    automation_analysis:
      "Bespoke creative work resists automation; generative tools augment rather than replace skilled designers in localized markets.",
    econometric_signal: "Creative services exports grew 6.8% YoY across South Asian metros.",
  },
};