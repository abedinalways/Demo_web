"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    tl.fromTo(
      headlineRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    ).fromTo(
      bottomBarRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between items-center px-6 md:px-16 pt-24 pb-10 z-10 pointer-events-none select-none">
      {/* Reserved 3D Emblem Stage Space */}
      <div className="w-full h-32 md:h-44" aria-hidden="true" />

      {/* Main Agency Statement */}
      <div className="max-w-4xl mx-auto text-center pointer-events-auto">
        <h1
          ref={headlineRef}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-lg"
        >
          We design <span className="text-[#f7c02f]">change-making</span> website
          experiences that finally match the business behind them.
        </h1>
      </div>

      {/* Bottom Bar: Awards & Scroll Down Cue */}
      <div
        ref={bottomBarRef}
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto border-t border-white/20 pt-6 text-xs text-white/80 font-mono"
      >
        {/* Awards Badges */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">AWWWARDS</span>
            <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] text-[#f7c02f]">
              SITE OF THE DAY
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-white font-bold text-sm">CSSDA</span>
            <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] text-white">
              SPECIAL KUDOS
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-white font-bold text-sm">CSS WINNER</span>
            <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] text-[#f7c02f]">
              STAR OF THE DAY
            </span>
          </div>
        </div>

        {/* Scroll Cue */}
        <a
          href="#why-us"
          data-cursor="SCROLL"
          className="flex items-center gap-2 text-white hover:text-[#f7c02f] transition-colors group"
        >
          <span className="tracking-widest uppercase text-[11px] font-bold">
            Scroll to explore universe
          </span>
          <span className="inline-block transform group-hover:translate-y-1 transition-transform duration-300 text-[#f7c02f]">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
