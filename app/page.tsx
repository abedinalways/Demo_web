"use client";

import React from "react";
import LenisProvider from "@/components/smooth-scroll/LenisProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import DokmehLoader from "@/components/loader/DokmehLoader";
import Dokmeh3DScene from "@/components/canvas/Dokmeh3DScene";
import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import WhyUsPinnedSection from "@/components/why-us/WhyUsPinnedSection";
import PhilosophySection from "@/components/philosophy/PhilosophySection";
import CapabilitiesSection from "@/components/capabilities/CapabilitiesSection";
import OutroSection from "@/components/outro/OutroSection";

export default function Home() {
  return (
    <LenisProvider>
      {/* Interactive Magnetic Cursor */}
      <CustomCursor />

      {/* Dokmeh Signature Yellow Loader with Pixel Dissolve */}
      <DokmehLoader />

      {/* Main Experience Container - Transparent / Light Fog (No Black Background) */}
      <div className="relative min-h-screen text-[#ffffff]">
        {/* Fullscreen 3D Universe moving seamlessly in sync with mouse scroll */}
        <Dokmeh3DScene />

        {/* Dokmeh Signature Yellow Capsule Header */}
        <Navbar />

        {/* Continuous 5-Stage 3D Cinematic Scroll Journey */}
        <main className="relative z-10 flex flex-col w-full">
          {/* Stage 1: Hero Experience (Sky, Reeds, Liquid Ripple & Floating 3D Emblem) */}
          <HeroSection />

          {/* Stage 2: Coastal 3D Universe (Camera swoops through 45+ -> 350+ -> 15+ -> "WHY US?") */}
          <WhyUsPinnedSection />

          {/* Stage 3: Twilight Realm (Amber Sunset Horizon & 3 Pillars of Craft) */}
          <PhilosophySection />

          {/* Stage 4: Midnight Deep Ocean (Cosmic Starlight Embers & 4 Core Capabilities) */}
          <CapabilitiesSection />

          {/* Stage 5: Infinite Horizon & Dawn Ascent (Grand Statement & Call To Action) */}
          <OutroSection />
        </main>
      </div>
    </LenisProvider>
  );
}
