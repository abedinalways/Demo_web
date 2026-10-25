"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    tl.fromTo(
      headlineRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.7"
      )
      .fromTo(
        bottomBarRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between items-center px-6 md:px-16 pt-28 pb-10 z-10 pointer-events-none select-none">
      {/* Reserved 3D Emblem Stage Space */}
      <div className="w-full h-36 md:h-48" aria-hidden="true" />

      {/* Main Agency Statement */}
      <div className="max-w-4xl mx-auto text-center pointer-events-auto">
        <h1
          ref={headlineRef}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.14] drop-shadow-lg"
        >
          We design <span className="text-[#f7c02f]">change-making</span> website
          experiences that finally match the business behind them.
        </h1>

        <div
          ref={ctaRef}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#works"
            data-cursor="VIEW"
            className="px-8 py-3.5 rounded-full bg-[#f7c02f] text-black font-bold text-xs tracking-wider uppercase hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-black/40"
          >
            Explore Projects
          </a>
          <a
            href="#why-us"
            data-cursor="DISCOVER"
            className="px-8 py-3.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white font-medium text-xs tracking-wider uppercase hover:bg-white/20 transition-all duration-300"
          >
            Why Dokmeh?
          </a>
        </div>
      </div>

      {/* Bottom Bar: Awards & Scroll Down Cue */}
      <div
        ref={bottomBarRef}
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto border-t border-white/10 pt-6 text-xs text-white/70 font-mono"
      >
        {/* Awards Showcase */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">AWWWARDS</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-[#f7c02f]">
              SITE OF THE DAY
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-white font-bold text-sm">CSSDA</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-white">
              SPECIAL KUDOS
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-white font-bold text-sm">CSS WINNER</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-[#f7c02f]">
              STAR OF THE DAY
            </span>
          </div>
        </div>

        {/* Scroll Cue */}
        <a
          href="#why-us"
          data-cursor="SCROLL"
          className="flex items-center gap-2 hover:text-[#f7c02f] transition-colors group"
        >
          <span className="tracking-widest uppercase text-[11px]">
            Scroll to explore
          </span>
          <span className="inline-block transform group-hover:translate-y-1 transition-transform duration-300 text-[#f7c02f]">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
