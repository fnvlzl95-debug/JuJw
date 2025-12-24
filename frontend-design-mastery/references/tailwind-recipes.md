# Tailwind CSS High-Quality Recipes

## Shadows & Glows
- **Subtle Drop Shadow:** `shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]` (Adjust color)
- **Inner Highlight (3D feel):** `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]`
- **Soft Glow Background:** `absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]`

## Components

### 1. Modern Button
```jsx
<button className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white px-6 font-medium text-neutral-600 transition-all duration-300 hover:bg-neutral-50 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white">
  <span className="relative">Click Me</span>
</button>
2. Glass Card (Dark Mode)
code
Jsx
<div className="relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/20 backdrop-blur-xl p-6 shadow-2xl">
  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  {/* Content */}
</div>
3. Gradient Text
code
Jsx
<h1 className="bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent">
  Mastering the Art of Design
</h1>
4. Grid Divider (Subtle)
code
Jsx
<div className="divide-y divide-gray-200/10 border-y border-gray-200/10 bg-gray-900">
  {/* List Items */}
</div>