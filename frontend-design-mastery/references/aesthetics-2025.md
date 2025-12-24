# 2025 Design Aesthetics & Principles

## 1. Color Palette (Neutral & Sophisticated)
- **Backgrounds:** Avoid pure black (`#000`). Use rich dark grays (e.g., Slate-950, Zinc-900).
- **Surface:** Use slight transparency for depth. `bg-white/5` or `bg-black/40`.
- **Borders:** The "1px Border" is key. Use subtle borders instead of heavy shadows to define shapes.
  - *Example:* `border border-white/10` (Dark mode) or `border border-gray-200` (Light mode).
- **Accents:** Use gradients for text or buttons, not flat heavy colors.

## 2. Typography (The Inter/Geist Style)
- **Headings:** Tight tracking (`tracking-tight` or `tracking-tighter`). Bold weight (`font-semibold` or `font-bold`).
- **Body:** Good readability (`text-gray-500` to `text-gray-400` for secondary text).
- **Hierarchy:** Distinguish by **color**, not just size.
  - Primary: `text-white` or `text-gray-900`
  - Secondary: `text-gray-400` or `text-gray-500`
  - Tertiary: `text-gray-600`

## 3. Spacing & Radius
- **Radius:** Standardize on specific roundness.
  - Small elements (buttons): `rounded-md` or `rounded-lg`
  - Large containers (cards): `rounded-xl` or `rounded-2xl`
- **Padding:** Give elements room to breathe. Use multiples of 4 (p-4, p-6, p-8).
- **Gap:** Consistency is king. `gap-4` for tight lists, `gap-8` for sections.

## 4. Visual Effects
- **Glows:** Use subtle background gradients to create atmosphere, not overwhelming neon.
- **Noise:** Optional subtle noise texture overlays for premium feel.
- **Glassmorphism:** High blur, low opacity. `backdrop-blur-md bg-white/5`.