"use client";

import React, { useState } from "react";

const services = [
  {
    num: "01",
    title: "Websites & Creative Development",
    tags: ["Three.js", "WebGL", "GSAP Motion", "Headless CMS", "Performance"],
    description:
      "We build immersive, award-winning web platforms that redefine standard browsing. Combining cinematic 3D graphics with instant sub-second load times.",
  },
  {
    num: "02",
    title: "Product Design (UI / UX)",
    tags: ["Design Systems", "Design Audits", "Micro-interactions", "Prototypes"],
    description:
      "From complex enterprise tools to intuitive mobile applications, we engineer user interfaces that convert curiosity into lasting customer loyalty.",
  },
  {
    num: "03",
    title: "E-Commerce Experiences",
    tags: ["Bespoke Storefronts", "3D Product Configurators", "Shopify Plus"],
    description:
      "High-fashion and luxury brand e-commerce engineered for conversion. We translate tactile physical products into irresistible digital buying journeys.",
  },
  {
    num: "04",
    title: "Brand Identity & Art Direction",
    tags: ["Visual Identity", "3D Motion", "Typography", "Editorial Books"],
    description:
      "A complete visual signature tailored for contemporary culture. We shape logos, color systems, and motion guidelines that set market trends.",
  },
  {
    num: "05",
    title: "Creative Direction & Spatial Motion",
    tags: ["CGI", "Interactive Installations", "Kinetic Typography"],
    description:
      "Transcending screens to craft memorable multi-sensory experiences across physical exhibits, interactive retail spaces, and digital realms.",
  },
];

export default function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative min-h-screen py-32 px-6 md:px-16 z-20 bg-[#0d0d0d] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-widest text-[#f7c02f] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f7c02f]" />
              Our Capabilities
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Studio <span className="text-[#f7c02f]">Services</span>
            </h2>
          </div>
          <p className="text-base text-white/60 max-w-md font-light leading-relaxed">
            Bridging the gap between conceptual elegance and uncompromising
            computational engineering.
          </p>
        </div>

        {/* Services List with Hover Reveal */}
        <div className="divide-y divide-white/10">
          {services.map((service, idx) => (
            <div
              key={service.num}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              data-cursor="CAPABILITY"
              className="py-12 group transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Number & Title */}
                <div className="flex items-center gap-6 sm:gap-12">
                  <span className="font-mono text-lg text-white/30 group-hover:text-[#f7c02f] transition-colors">
                    {service.num}
                  </span>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white group-hover:text-[#f7c02f] group-hover:translate-x-3 transition-all duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Arrow Icon */}
                <div className="hidden lg:flex w-12 h-12 rounded-full border border-white/20 items-center justify-center text-white group-hover:bg-[#f7c02f] group-hover:text-black group-hover:border-[#f7c02f] transition-all duration-300">
                  <span className="text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </div>
              </div>

              {/* Collapsible / Expanding Details */}
              <div
                className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                  hoveredIdx === idx
                    ? "grid-rows-[1fr] opacity-100 pt-6"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-12 sm:pl-24 pr-4">
                    <p className="text-white/70 max-w-xl text-base font-light leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-full bg-white/10 text-white/80 font-mono text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

