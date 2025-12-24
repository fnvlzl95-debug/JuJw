import React from 'react';
import { clsx } from 'clsx'; // or use your preferred utility

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function ModernLayout({ children, className }: LayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-neutral-950 text-neutral-200 antialiased selection:bg-neutral-800 selection:text-white">
      
      {/* 1. Subtle Background Grid Pattern (The "Pro" Vibe) */}
      <div className="fixed inset-0 z-0 h-full w-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* 2. Glassmorphism Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-neutral-950/60 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-tr from-neutral-100 to-neutral-500"></div>
            <span className="font-semibold tracking-tight text-white">Brand</span>
          </div>
          <div className="hidden gap-6 text-sm font-medium text-neutral-400 md:flex">
            <a href="#" className="transition-colors hover:text-white">Features</a>
            <a href="#" className="transition-colors hover:text-white">Pricing</a>
            <a href="#" className="transition-colors hover:text-white">About</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-neutral-400 hover:text-white">Log in</button>
            <button className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-opacity hover:opacity-90">
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Main Content Area */}
      {/* pt-24 ensures content isn't hidden behind the fixed nav */}
      <main className={clsx("relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-20 lg:px-8", className)}>
        {children}
      </main>

      {/* 4. Minimal Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-neutral-950 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-neutral-500 md:flex-row lg:px-8">
          <p>© 2025 Brand Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-300">Privacy</a>
            <a href="#" className="hover:text-neutral-300">Terms</a>
            <a href="#" className="hover:text-neutral-300">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}