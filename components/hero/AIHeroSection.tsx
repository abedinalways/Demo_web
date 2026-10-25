"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AIHeroSection({
  onOpenPlayground,
}: {
  onOpenPlayground?: () => void;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    tl.fromTo(
      headlineRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" }
    ).fromTo(
      metricsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between items-center px-6 md:px-16 pt-36 pb-12 z-10 pointer-events-none select-none"
    >
      <div />

      {/* Main Pitch */}
      <div className="max-w-5xl mx-auto text-center pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f2fe]/30 bg-[#00f2fe]/10 backdrop-blur-md mb-6 text-xs font-mono uppercase tracking-widest text-[#00f2fe]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-ping" />
          Next-Gen AI Agent Commercial Infrastructure
        </div>

        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08]"
        >
          Discover, Deploy & <br />
          <span className="bg-gradient-to-r from-[#00f2fe] via-[#a855f7] to-[#f7c02f] bg-clip-text text-transparent">
            Command AI Agents.
          </span>
        </h1>

        <p className="mt-8 text-base md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
          The premier commercial marketplace and private workspace for specialized
          autonomous AI agents. Purchase, configure, and orchestrate intelligent
          workers with persistent memory and tool execution.
        </p>

        {/* Hero CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#marketplace"
            data-cursor="BROWSE"
            className="px-8 py-3.5 rounded-full bg-[#00f2fe] text-black font-bold text-xs uppercase tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-[#00f2fe]/20"
          >
            Explore Agent Fleet
          </a>
          <button
            onClick={onOpenPlayground}
            data-cursor="TEST LIVE"
            className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium text-xs uppercase tracking-wider hover:bg-white/10 hover:border-[#00f2fe]/50 transition-all duration-300 flex items-center gap-2"
          >
            <span>Live Interactive Demo</span>
            <span className="text-[#00f2fe]">⚡</span>
          </button>
        </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div
        ref={metricsRef}
        className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto border-t border-white/10 pt-6 text-xs text-white/60 font-mono"
      >
        {/* Real-time Telemetry */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div>
            <span className="text-white font-bold text-base block font-sans">
              99.8%
            </span>
            <span className="text-[10px] text-white/40 uppercase">
              Task Completion SLA
            </span>
          </div>
          <div className="hidden sm:block h-6 w-[1px] bg-white/10" />
          <div>
            <span className="text-[#00f2fe] font-bold text-base block font-sans">
              42ms
            </span>
            <span className="text-[10px] text-white/40 uppercase">
              Average Inference Latency
            </span>
          </div>
          <div className="hidden sm:block h-6 w-[1px] bg-white/10" />
          <div>
            <span className="text-[#a855f7] font-bold text-base block font-sans">
              140+
            </span>
            <span className="text-[10px] text-white/40 uppercase">
              Certified Commercial Agents
            </span>
          </div>
          <div className="hidden md:block h-6 w-[1px] bg-white/10" />
          <div className="hidden md:block">
            <span className="text-[#f7c02f] font-bold text-base block font-sans">
              SOC-2 Type II
            </span>
            <span className="text-[10px] text-white/40 uppercase">
              Isolated Customer Sandboxes
            </span>
          </div>
        </div>

        {/* Scroll Cue */}
        <a
          href="#marketplace"
          data-cursor="EXPLORE"
          className="flex items-center gap-2 hover:text-[#00f2fe] transition-colors group"
        >
          <span className="tracking-widest uppercase text-[11px]">
            Scroll to Marketplace
          </span>
          <span className="inline-block transform group-hover:translate-y-1 transition-transform duration-300 text-[#00f2fe]">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}

