# UI Restyle — "Digital Passport" Aesthetic

**Scope:** Visual styling only. **No changes to text/copy, features, data flow, API calls, routes, auth, or state management.** All original wording stays exactly as currently written.

## Design language
Cream paper background, inky charcoal navigation, Fraunces serif headings (already loaded), Inter body, ornamental details (guilloche line patterns, wax-seal stamps, visa chips). Lightweight, interactive, fully responsive.

## 1. Design tokens (`src/styles.css`)
Add (do not remove existing tokens):
- `--stamp-red`, `--stamp-green`, `--stamp-blue` (oklch wax-seal colors)
- `--guilloche` (repeating-linear-gradient pattern for paper texture)
- `--paper-grain` subtle noise overlay variable
- Dark mode equivalents

## 2. New ornament components (purely presentational)
- `src/components/ornaments/PassportCard.tsx` — wrapper with cream surface, subtle border, guilloche corner accent, soft shadow
- `src/components/ornaments/StampBadge.tsx` — circular/rotated wax-seal badge (color + label prop)
- `src/components/ornaments/VisaChip.tsx` — small rectangular chip for tags/categories
- `src/components/ornaments/Guilloche.tsx` — decorative SVG line pattern divider

## 3. Header (`src/components/AppHeader.tsx`)
- Convert nav links to passport-tab strip with raised active state
- Keep all existing labels, links, auth logic, sign-out redirect, mobile menu behavior **unchanged**

## 4. Pages — visual wrapper only, copy untouched
- `src/routes/index.tsx` — hero gets paper texture + guilloche accents; CTA labels and step copy preserved verbatim; demo card restyled as passport booklet
- `src/routes/onboarding.tsx` — steps wrapped in `PassportCard`; progress indicator styled as visa stamps; all step text, questions, button labels unchanged
- `src/routes/profile.tsx` — Skills Profile rendered as passport page with `StampBadge` per category; all category labels, role cards, citations identical
- `src/routes/readiness.tsx` — `RiskGauge` reskinned with stamp aesthetic; analysis text unchanged
- `src/routes/opportunities.tsx` — job cards + matched opportunities cards restyled; match %, missing skills, risk level text identical
- `src/routes/policymaker.tsx` — filter pills as visa chips; CSV export button + all labels unchanged
- `src/routes/auth.tsx`, `signup.youth.tsx`, `signup.policymaker.tsx`, `account.tsx`, `pending.tsx` — restyled card surfaces only

## 5. Supporting components (visual only)
- `RiskGauge.tsx`, `EconometricSignals.tsx`, `SkillTranslationCard.tsx`, `NoAssessmentData.tsx`, `RegionToggle.tsx`, `AuthCard.tsx`, `SocialAuthButtons.tsx` — updated Tailwind classes for new tokens; all rendered text preserved

## Responsive
All restyled components use existing Tailwind responsive utilities (`sm:`, `md:`, `lg:`); validated against the 768px viewport and mobile widths.

## Explicit non-goals
- ❌ No copy/wording changes anywhere
- ❌ No changes to `AssessmentContext`, `useAuth`, API endpoints, routing, or any handler logic
- ❌ No changes to `client.ts`, `types.ts`, `routeTree.gen.ts`
