"use client";

import React from "react";

const capabilities = [
  {
    num: "01",
    category: "CREATIVE ENGINEERING",
    title: "Spatial 3D & WebGL Worlds",
    desc: "Custom GLSL vertex & fragment shaders, physics-based simulations, Draco-compressed geometric assets, and real-time interactive canvas environments that hold 60fps on every screen.",
    tags: ["Three.js", "GLSL Shaders", "Draco Optimization", "WebGL 2.0"],
  },
  {
    num: "02",
    category: "INTELLIGENT SYSTEMS",
    title: "Autonomous AI Workspaces",
    desc: "Seamless commercial architectures for discovering, orchestrating, and interacting with specialized AI agents, multi-agent pipelines, and real-time streaming interfaces.",
    tags: ["Agent Orchestration", "Streaming LLMs", "Tool Execution", "Memory Stores"],
  },
  {
    num: "03",
    category: "MOTION & PERFORMANCE",
    title: "Physics-Driven Smooth Flow",
    desc: "Zero-friction momentum scrolling powered by Lenis and GSAP ScrollTrigger. Custom virtual camera rails, reactive depth parallax, and cinematic transitions with zero layout thrashing.",
    tags: ["Lenis Engine", "GSAP Timeline", "Virtual Camera", "Zero-Lag 60FPS"],
  },
  {
    num: "04",
    category: "FOUNDATIONAL SCALE",
    title: "Production-Grade Robustness",
    desc: "Enterprise Next.js architecture, edge rendering, isolated state persistence, and modular component systems engineered to scale from bespoke boutique portfolios to global platforms.",
    tags: ["Next.js App Router", "Edge Caching", "Tailwind CSS", "TypeScript Strict"],
  },
];

export default function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden z-20 px-6 sm:px-12 md:px-20 pointer-events-none select-none py-28"
    >
      <div className="max-w-7xl w-full mx-auto pointer-events-auto">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-[#f7c02f] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f7c02f] animate-ping" />
              Midnight Deep · Core Capabilities
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-2xl">
              Engineered For The <br />
              <span className="text-[#f7c02f]">Extraordinary.</span>
            </h2>
          </div>
          <p className="max-w-md text-white/70 text-sm md:text-base leading-relaxed font-light">
            We bridge high-art interactive aesthetics with hardened commercial engineering. Every detail is calculated to create an unforgettable brand universe.
          </p>
        </div>

        {/* 2x2 Capabilities Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {capabilities.map((item) => (
            <div
              key={item.num}
              className="relative p-8 md:p-10 rounded-2xl border border-white/15 bg-black/30 backdrop-blur-xl hover:bg-black/45 hover:border-[#f7c02f]/50 transition-all duration-500 group shadow-2xl overflow-hidden"
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#f7c02f]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#f7c02f]/15 transition-all duration-700" />

              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs tracking-widest text-[#f7c02f] uppercase">
                  {item.category}
                </span>
                <span className="font-mono text-sm text-white/40 group-hover:text-white transition-colors">
                  [{item.num}]
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#f7c02f] transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="text-sm md:text-base text-white/80 font-light leading-relaxed mb-8">
                {item.desc}
              </p>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider bg-white/5 border border-white/10 text-white/70 group-hover:border-white/20 group-hover:text-white transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

