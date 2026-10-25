"use client";

import React from "react";
import LenisProvider from "@/components/smooth-scroll/LenisProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import DokmehLoader from "@/components/loader/DokmehLoader";
import Dokmeh3DScene from "@/components/canvas/Dokmeh3DScene";
import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import WhyUsPinnedSection from "@/components/why-us/WhyUsPinnedSection";

export default function Home() {
  return (
    <LenisProvider>
      {/* Interactive Magnetic Cursor */}
      <CustomCursor />

      {/* Dokmeh Signature Yellow Loader with Pixel Dissolve */}
      <DokmehLoader />

      {/* Main Experience Container - Transparent / Light Fog (No Black Background) */}
      <div className="relative min-h-screen text-[#ffffff]">
        {/* Fullscreen 3D Universe moving in sync with mouse scroll */}
        <Dokmeh3DScene />

        {/* Dokmeh Signature Yellow Capsule Header */}
        <Navbar />

        {/* Continuous 3D Scroll Journey Layers */}
        <main className="relative z-10 flex flex-col w-full">
          {/* Section 1: Hero Experience (Sky, Reeds, Liquid Ripple & Floating 3D Emblem) */}
          <HeroSection />

          {/* Section 2: Cinematic 3D Beach Universe (Camera swoops through 45+ -> 350+ -> 15+ -> WHY US?) */}
          <WhyUsPinnedSection />
        </main>
      </div>
    </LenisProvider>
  );
}
