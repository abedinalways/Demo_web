"use client";

import React from "react";
import { useLenisContext } from "../smooth-scroll/LenisProvider";

export default function AIFooter() {
  const { getLenis } = useLenisContext();

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative z-20 bg-[#040508] text-white pt-28 pb-16 px-6 md:px-16 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Giant Call to Action */}
        <div className="mb-20 pb-16 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f2fe]/30 bg-[#00f2fe]/10 text-xs font-mono uppercase tracking-widest text-[#00f2fe] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse" />
            Empower Your Business Today
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            DEPLOY YOUR <br />
            <span className="text-[#00f2fe]">AGENT FLEET.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl font-light mb-8">
            Join forward-thinking engineering teams, financial institutions, and
            creatives orchestrating autonomous AI intelligence.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#marketplace"
              className="px-8 py-3.5 rounded-full bg-[#00f2fe] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-xl shadow-[#00f2fe]/20"
            >
              Browse 140+ Agents
            </a>
            <a
              href="#pricing"
              className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-medium text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Review Pricing Plans
            </a>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe]" />
              NEXUS.AI CLOUD
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-mono">
              The premier commercial marketplace and private sandbox runtime for
              autonomous AI agents. Built with Next.js, Three.js, and GSAP.
            </p>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-4">
              Platform
            </div>
            <ul className="space-y-2 text-xs font-mono text-white/70">
              <li>
                <a href="#marketplace" className="hover:text-[#00f2fe] transition-colors">
                  Agent Marketplace
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-[#00f2fe] transition-colors">
                  Multi-Agent Architecture
                </a>
              </li>
              <li>
                <a href="#workspace" className="hover:text-[#00f2fe] transition-colors">
                  Customer Workspace
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#00f2fe] transition-colors">
                  Subscription Plans
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-4">
              Security & Compliance
            </div>
            <ul className="space-y-2 text-xs font-mono text-white/70">
              <li>
                <span className="text-emerald-400">✓ SOC-2 Type II Certified</span>
              </li>
              <li>
                <span className="text-emerald-400">✓ HIPAA Ready Sandboxes</span>
              </li>
              <li>
                <span className="text-emerald-400">✓ AES-256 Vector Vault</span>
              </li>
              <li>
                <span className="text-emerald-400">✓ Zero Data Retention</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              data-cursor="TOP"
              className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-[#00f2fe] hover:text-black hover:border-[#00f2fe] transition-all duration-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2 group"
            >
              <span>Back to Top</span>
              <span className="group-hover:-translate-y-1 transition-transform">
                ↑
              </span>
            </button>

            <div className="mt-8 md:mt-0 text-left md:text-right font-mono text-xs text-white/40">
              © 2025 NEXUS AI Inc. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

