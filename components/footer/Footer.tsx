"use client";

import React from "react";
import { useLenisContext } from "../smooth-scroll/LenisProvider";

export default function Footer() {
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
    <footer
      id="contact"
      className="relative z-20 bg-[#080808] text-white pt-32 pb-16 px-6 md:px-16 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Giant Call-to-action */}
        <div className="mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-widest text-[#f7c02f] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f7c02f]" />
            Have an ambitious project?
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-8">
            LET&apos;S <span className="text-[#f7c02f]">TALK.</span>
          </h2>
          <a
            href="mailto:hi@hidokmeh.com"
            data-cursor="EMAIL"
            className="text-2xl sm:text-4xl md:text-5xl font-mono text-white/80 hover:text-[#f7c02f] transition-colors border-b-2 border-white/20 hover:border-[#f7c02f] pb-2 inline-block"
          >
            hi@hidokmeh.com
          </a>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-16 border-t border-white/10">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f7c02f]" />
              DOKMEH AGENCY
            </div>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              Tehran, Iran · Global creative web studio shaping next-generation
              interactive digital experiences.
            </p>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-4">
              Navigation
            </div>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#works" className="hover:text-[#f7c02f] transition-colors">
                  Selected Works
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#f7c02f] transition-colors">
                  Why Dokmeh?
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#f7c02f] transition-colors">
                  Capabilities & Services
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-[#f7c02f] transition-colors">
                  Studio Story
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-4">
              Socials & Recognition
            </div>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href="https://www.awwwards.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#f7c02f] transition-colors"
                >
                  Awwwards Profile ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.cssdesignawards.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#f7c02f] transition-colors"
                >
                  CSS Design Awards ↗
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#f7c02f] transition-colors"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#f7c02f] transition-colors"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              data-cursor="TOP"
              className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-[#f7c02f] hover:text-black hover:border-[#f7c02f] transition-all duration-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2 group"
            >
              <span>Back to Top</span>
              <span className="group-hover:-translate-y-1 transition-transform">
                ↑
              </span>
            </button>

            <div className="mt-8 md:mt-0 text-left md:text-right font-mono text-xs text-white/40">
              © 2025 Dokmeh Agency. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
