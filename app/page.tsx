"use client";

import React from "react";
import LenisProvider from "@/components/smooth-scroll/LenisProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import DokmehLoader from "@/components/loader/DokmehLoader";
import Dokmeh3DScene from "@/components/canvas/Dokmeh3DScene";
import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import WhyUsPinnedSection from "@/components/why-us/WhyUsPinnedSection";
import WorksSection from "@/components/works/WorksSection";
import ServicesSection from "@/components/services/ServicesSection";
import StudioSection from "@/components/about/StudioSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <LenisProvider>
      {/* Interactive Magnetic Cursor */}
      <CustomCursor />

      {/* Dokmeh Signature Yellow Loader with Pixel Dissolve */}
      <DokmehLoader />

      {/* Main Experience Container */}
      <div className="relative min-h-screen bg-[#0d0d0d] text-[#f4f4f4]">
        {/* Authentic Dokmeh 3D Chrome Emblem + WebGL Liquid Ripple Video Background */}
        <Dokmeh3DScene />

        {/* Global Fixed Navigation */}
        <Navbar />

        {/* Page Content Layers */}
        <main className="relative z-10 flex flex-col w-full">
          {/* Hero Section */}
          <HeroSection />

          {/* Dokmeh Famous "Why Us" Pinned Stepper */}
          <WhyUsPinnedSection />

          {/* Selected Portfolio & Works Grid */}
          <WorksSection />

          {/* Capabilities & Interactive Services */}
          <ServicesSection />

          {/* Studio Manifesto & Marquee Ticker */}
          <StudioSection />

          {/* Giant Call-to-action & Footer */}
          <Footer />
        </main>
      </div>
    </LenisProvider>
  );
}
