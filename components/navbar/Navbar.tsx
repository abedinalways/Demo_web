"use client";

import React, { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Signature Dokmeh Yellow Capsule Header */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between select-none">
        <div className="flex items-center p-1 pl-4 pr-1 rounded-xl bg-[#f7c02f] shadow-2xl shadow-black/40 border border-black/10">
          {/* Logo Mark & Name */}
          <a
            href="#"
            data-cursor="DOKMEH"
            className="flex items-center gap-2.5 mr-6 text-black"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 3l10 9-10 9V3z" />
              <path d="M12 3l10 9-10 9V3z" opacity="0.65" />
            </svg>
            <span className="font-extrabold text-sm tracking-tight">Dokmeh</span>
          </a>

          {/* Menu Button Capsule */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            data-cursor="MENU"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#202020] text-white hover:bg-black transition-colors text-xs font-bold"
          >
            <span>Menu</span>
            <span className="text-sm">☰</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Sliding Navigation Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-10 md:p-20 text-white animate-fade-in"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex justify-between items-center border-b border-white/10 pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#f7c02f]">
              Dokmeh Studio Navigation
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            <a
              href="#hero"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#f7c02f] transition-colors"
            >
              01 · Universe
            </a>
            <a
              href="#why-us"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#f7c02f] transition-colors"
            >
              02 · Why Us
            </a>
            <a
              href="#philosophy"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#f7c02f] transition-colors"
            >
              03 · Philosophy
            </a>
            <a
              href="#capabilities"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#f7c02f] transition-colors"
            >
              04 · Capabilities
            </a>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#f7c02f] transition-colors"
            >
              05 · Contact
            </a>
          </nav>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 border-t border-white/10 font-mono text-xs text-white/50">
            <span>TEHRAN · GLOBAL CREATIVE AGENCY</span>
            <span>AWWWARDS & CSSDA WINNER</span>
          </div>
        </div>
      )}
    </>
  );
}
