"use client";

import React from "react";

const pillars = [
  {
    num: "01",
    title: "Sculptural Code",
    tagline: "Architecture that breathes",
    desc: "We treat code as a physical material. Custom WebGL shaders, zero-overhead memory pools, and 60fps rendering built from scratch.",
  },
  {
    num: "02",
    title: "Radical Aesthetics",
    tagline: "Defying cookie-cutter minimalism",
    desc: "Every typography choice, texture reflection, and spatial composition is crafted to communicate undeniable brand authority.",
  },
  {
    num: "03",
    title: "Fluid Motion",
    tagline: "Zero friction, pure momentum",
    desc: "Physics-driven damping and continuous camera rails that transform browsing into a memorable, multi-sensory voyage.",
  },
];

export default function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden z-20 px-8 md:px-20 pointer-events-none select-none py-28"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col justify-between pointer-events-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-[#f7c02f] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f7c02f]" />
            Twilight Realm · Studio Philosophy
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl">
            Where Code Becomes <br />
            <span className="text-[#f7c02f]">Living Cinema.</span>
          </h2>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="p-8 rounded-2xl border border-white/15 bg-black/20 backdrop-blur-md hover:bg-black/35 hover:border-[#f7c02f]/50 transition-all duration-500 group shadow-2xl"
            >
              <span className="font-mono text-xs text-[#f7c02f] block mb-3">
                {p.num} · PILLAR
              </span>
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#f7c02f] transition-colors">
                {p.title}
              </h3>
              <p className="text-xs font-mono text-white/50 mb-4">
                {p.tagline}
              </p>
              <p className="text-sm text-white/80 leading-relaxed font-light">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

