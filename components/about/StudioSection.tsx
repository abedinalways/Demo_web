"use client";

import React from "react";

const clients = [
  "NEXTOFFICE",
  "CEDRUS",
  "PAADIRAN",
  "PAKSHOMA",
  "ROYAL JEANS",
  "FARHO",
  "ROOYDAAD",
  "DESIGN KKI",
  "MASOUD ROSTAMI",
  "DORR",
];

export default function StudioSection() {
  return (
    <section
      id="studio"
      className="relative min-h-screen py-32 z-20 bg-[#0d0d0d] overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Leadership Quote & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-widest text-[#f7c02f] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f7c02f]" />
              The Studio
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Fifteen years at the forefront of Iranian digital culture.
            </h2>
            <div className="font-mono text-xs text-white/50 uppercase tracking-wider">
              Tehran, Iran · Global Operations
            </div>
          </div>

          <div className="lg:col-span-7 border-l border-white/15 pl-8 sm:pl-12">
            <blockquote className="text-xl sm:text-2xl text-white/90 font-light leading-relaxed italic mb-8">
              &ldquo;We don&apos;t just build websites to convey information; we craft
              digital landmarks that define the cultural authority of the businesses
              behind them.&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f7c02f] flex items-center justify-center font-bold text-black text-lg">
                FK
              </div>
              <div>
                <div className="font-bold text-white text-base">
                  Farzad Kafaei
                </div>
                <div className="text-xs font-mono text-[#f7c02f]">
                  Founder & Creative Director · Dokmeh
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Client Ticker / Marquee */}
      <div className="relative w-full py-8 bg-white/5 border-y border-white/10 select-none overflow-hidden">
        <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-12 text-2xl md:text-4xl font-black text-white/30 tracking-wider">
          {[...clients, ...clients].map((client, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="hover:text-[#f7c02f] transition-colors cursor-pointer">
                {client}
              </span>
              <span className="text-[#f7c02f] text-sm font-mono">✦</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

