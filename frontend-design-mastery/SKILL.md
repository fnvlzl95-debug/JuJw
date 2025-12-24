---
name: frontend-design-mastery
description: Create modern, high-quality frontend interfaces using React and Tailwind CSS. Use this skill when the user asks for UI implementation, redesigns, "make it look good", or specific components like dashboards, landing pages, and cards. Triggers on requests for aesthetic improvements or frontend code generation.
---

# Frontend Design Mastery

## Core Philosophy
**"Clarity, Consistency, and Subtle Details."**
Do not produce generic Bootstrap-style layouts. Aim for "Linear-like" or "Vercel-like" aesthetics: clean typography, micro-borders, subtle glows, and perfect spacing.

## Workflow

### 1. Analyze Intent & Vibe
Before coding, identify the page type:
- **Landing Page:** High impact, large typography, clear CTAs.
- **Dashboard:** Information density, bento-grid layouts, muted colors.
- **Tool/App:** Functional, clear affordances, focus states.

### 2. Structural Strategy (Layout)
Select the appropriate layout pattern.
- **Default:** Use Flexbox/Grid combinators.
- **Complexity:** For multi-widget sections, use **Bento Grid** patterns.
- **Reference:** See [references/layout-patterns.md](references/layout-patterns.md) for structures.

### 3. Apply 2025 Aesthetics
Apply the core design principles regarding spacing, radius, and typography.
- **Reference:** See [references/aesthetics-2025.md](references/aesthetics-2025.md) for rules on spacing, colors, and shadows.

### 4. Implementation (Tailwind CSS)
Write the code using precise Tailwind classes.
- Use `lucide-react` for icons.
- Use `clsx` or `tailwind-merge` if conditional logic is needed.
- **Reference:** See [references/tailwind-recipes.md](references/tailwind-recipes.md) for specific class combinations (glassmorphism, gradients, borders).

## Guidelines for Output
- **Mobile First:** Always ensure classes support responsive design (`md:`, `lg:`).
- **Dark Mode:** Assume a dark-themed or neutral-gray aesthetic by default unless specified otherwise.
- **Concise Code:** Do not include unnecessary comments. Focus on the `className` logic.