# Layout Patterns

## 1. The Bento Grid
Popular for showcasing features. Uses CSS Grid to create distinct, unequal boxes.

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
  {/* Large Item spanning 2 cols */}
  <div className="md:col-span-2 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
    Feature A
  </div>
  
  {/* Tall Item spanning 2 rows */}
  <div className="md:row-span-2 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
    Feature B
  </div>
  
  {/* Standard Item */}
  <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
    Feature C
  </div>
</div>

2. Split Screen Hero
Left: Typography & CTA (Vertical flex). Right: Visual/Abstract (Centered).
code
Jsx
<section className="relative flex min-h-[80vh] w-full flex-col-reverse items-center justify-center gap-12 overflow-hidden px-4 py-24 md:flex-row md:px-8">
  <div className="flex w-full flex-col items-start gap-6 md:w-1/2">
    <div className="inline-flex rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs text-neutral-400">
      New Release 2.0
    </div>
    <h1 className="text-5xl font-bold tracking-tighter text-white md:text-7xl">
      Design without <br/> limits.
    </h1>
    <p className="max-w-md text-lg text-neutral-400">
      Create stunning interfaces with our new design engine.
    </p>
    {/* Buttons */}
  </div>
  <div className="relative flex w-full items-center justify-center md:w-1/2">
    {/* Abstract Graphic / 3D Element */}
  </div>
</section>