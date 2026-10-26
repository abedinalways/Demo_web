"use client";

import React from "react";

export default function OutroSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const triggerArtifact = (action: "spin" | "launch" | "ground") => {
    window.dispatchEvent(
      new CustomEvent("dokmeh-artifact-action", { detail: { action } })
    );
  };

  return (
    <section
      id="contact"
      className="relative min-h-[110svh] w-full flex flex-col justify-between overflow-hidden z-20 px-6 sm:px-12 md:px-20 pointer-events-none select-none pt-28 pb-12"
    >
      {/* Center Statement & Action */}
      <div className="max-w-5xl w-full mx-auto my-auto text-center pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-[#f7c02f] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f7c02f]" />
          Horizon · Let&apos;s Collaborate
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white leading-[1.04] mb-8 drop-shadow-2xl">
          Let&apos;s Build Something <br />
          <span className="text-[#f7c02f]">Unforgettable.</span>
        </h2>

        <p className="max-w-xl mx-auto text-white/75 text-base sm:text-lg font-light leading-relaxed mb-10">
          Ready to push past conventional boundaries? Let&apos;s create a bespoke 3D cinematic universe tailored to elevate your brand to global acclaim.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
          <a
            href="mailto:hi@dokmeh.com"
            className="px-8 py-4 rounded-full bg-[#f7c02f] text-black font-semibold text-sm tracking-wider uppercase hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl flex items-center gap-3 group"
          >
            <span>Start A Conversation</span>
            <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="px-6 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/80 hover:text-white hover:bg-white/15 hover:border-white/40 text-sm font-mono tracking-wider uppercase transition-all duration-300"
          >
            ↑ Back to Top
          </button>
        </div>

        {/* Interactive Grounded 3D Artifact Controller Capsule */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-2 px-5 rounded-2xl border border-[#f7c02f]/30 bg-black/40 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#f7c02f]">
            <span className="w-2 h-2 rounded-full bg-[#f7c02f] animate-pulse" />
            <span className="font-semibold tracking-wider uppercase">
              ARTIFACT GROUNDED · DRAG TO MOVE ANYWHERE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => triggerArtifact("spin")}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#f7c02f] hover:text-black transition-all text-xs font-mono text-white/90 border border-white/10"
            >
              ↺ Spin
            </button>
            <button
              type="button"
              onClick={() => triggerArtifact("launch")}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#f7c02f] hover:text-black transition-all text-xs font-mono text-white/90 border border-white/10"
            >
              ↑ Launch
            </button>
            <button
              type="button"
              onClick={() => triggerArtifact("ground")}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#f7c02f] hover:text-black transition-all text-xs font-mono text-white/90 border border-white/10"
            >
              ↓ Ground
            </button>
          </div>
        </div>
      </div>

      {/* Reserved 3D Ground Staging Height */}
      <div className="w-full h-16 pointer-events-none" aria-hidden="true" />

      {/* Dokmeh Signature Bottom Bar */}
      <div className="w-full max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ALL SYSTEMS NOMINAL · 60 FPS ENGINE</span>
        </div>

        <div className="flex items-center gap-6">
          <span>DOKMEH STUDIO © 2025</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </section>
  );
}
