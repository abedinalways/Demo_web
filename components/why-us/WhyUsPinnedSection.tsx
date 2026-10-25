"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: 1,
    number: "45+",
    caption: "Globally recognized awards\n(Awwwards, CSSDA, CSSW)",
    copy: null,
  },
  {
    step: 2,
    number: "350+",
    caption: "Projects delivered\n(across 10+ countries)",
    copy: null,
  },
  {
    step: 3,
    number: "15+",
    caption: "Years of combined craft\n(design · code · motion)",
    copy: null,
  },
  {
    step: 4,
    number: "WHY US?",
    caption: null,
    copy: "Dokmeh is an award-winning web design agency in Tehran with over 15 years of experience and more than 40 international awards. We combine strategy, creative design, user experience, and technology to build fast, distinctive, and results-driven websites that reflect the true value of your brand.",
  },
];

export default function WhyUsPinnedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Pin the why-us section across 4 steps
    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const stepIdx = Math.min(
          Math.floor(self.progress * steps.length),
          steps.length - 1
        );
        setActiveStep(stepIdx);
      },
    });

    return () => {
      pinTrigger.kill();
    };
  }, []);

  return (
    <section
      id="why-us"
      ref={containerRef}
      data-beach-stage="true"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden z-20 px-8 md:px-20 pointer-events-none select-none"
    >
      {/* Stepper Dot Navigation (Top Right) */}
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-auto z-30">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className="flex items-center gap-2 group"
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                activeStep === i
                  ? "w-3 h-3 bg-[#f7c02f] ring-4 ring-[#f7c02f]/30"
                  : "w-2 h-2 bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Dynamic 4-Step Narrative Layout (Overlaying 3D Beach Scene) */}
      <div className="relative w-full max-w-7xl h-full min-h-[70vh] flex items-center justify-between">
        {activeStep < 3 ? (
          /* Steps 1, 2, 3: Number & Caption */
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 animate-fade-in pointer-events-auto">
            {/* Massive Metric Number */}
            <div className="flex-1">
              <h2 className="text-7xl sm:text-9xl md:text-[160px] font-bold tracking-tighter text-white leading-none drop-shadow-2xl">
                {steps[activeStep].number}
              </h2>
            </div>

            {/* Empty Center Space (Showcases 3D Golden Arrows in Middle) */}
            <div className="w-48 md:w-80 h-48 md:h-80" aria-hidden="true" />

            {/* Metric Caption */}
            <div className="flex-1 text-left md:text-right">
              <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white/90 leading-snug drop-shadow-lg whitespace-pre-line">
                {steps[activeStep].caption}
              </p>
            </div>
          </div>
        ) : (
          /* Step 4: "WHY US?" (The Exact Match to User's Uploaded Screenshot) */
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 animate-fade-in pointer-events-auto">
            {/* Left: Giant "WHY US?" Headline */}
            <div className="flex-1">
              <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-bold tracking-tight text-white leading-none drop-shadow-2xl">
                WHY US?
              </h2>
            </div>

            {/* Center: Open Stage for the 3D Golden Emblem */}
            <div className="w-48 lg:w-96 h-48 lg:h-96" aria-hidden="true" />

            {/* Right: Studio Philosophy Statement */}
            <div className="flex-1 max-w-lg">
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-normal drop-shadow-lg text-left">
                {steps[3].copy}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
