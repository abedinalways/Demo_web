"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const architectureSteps = [
  {
    step: "01",
    tag: "Core Engine",
    title: "Multi-Agent Swarm Orchestration",
    metric: "40ms",
    metricLabel: "Inter-agent latency",
    description:
      "Agents don't operate in silos. Our distributed orchestrator coordinates multiple specialized agents—passing state, code reviews, and verification steps in milliseconds.",
    highlights: ["Deterministic Agent Handoffs", "Parallelized Task Execution", "Automatic Failure Fallbacks"],
  },
  {
    step: "02",
    tag: "Security & Memory",
    title: "Isolated Vector Memory Sandboxes",
    metric: "100%",
    metricLabel: "Tenant Data Isolation",
    description:
      "Every client gets an encrypted private sandbox. Agent memories and internal company knowledge are isolated with AES-256 and never leak into foundation model retraining sets.",
    highlights: ["SOC-2 Type II Compliant", "Ephemeral Execution Pods", "Zero Data Retention Toggle"],
  },
  {
    step: "03",
    tag: "Tool Execution",
    title: "Secure Cloud Tool Execution Runtimes",
    metric: "500+",
    metricLabel: "Integrated APIs & Toolkits",
    description:
      "Agents have hands. They execute code in isolated microVMs, query live SQL databases, run web crawlers, and call third-party SaaS APIs with fine-grained RBAC permissions.",
    highlights: ["MicroVM Code Sandboxing", "Live Internet Access", "Secure OAuth2 Credential Vault"],
  },
  {
    step: "04",
    tag: "Commercialization",
    title: "Metering, Billing & Stripe Infrastructure",
    metric: "Real-time",
    metricLabel: "Token & Compute Tracking",
    description:
      "Full commercial monetization suite out of the box. Supports per-seat subscriptions, prepaid compute credits, metered API consumption, and automated invoices.",
    highlights: ["Stripe Checkout & Customer Portal", "Per-agent Usage Limits", "Automated Overuse Alerts"],
  },
];

export default function PinnedArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = gsap.utils.toArray<HTMLElement>(".arch-card");

    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${cards.length * 85}%`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const stepIndex = Math.min(
          Math.floor(self.progress * cards.length),
          cards.length - 1
        );
        setActiveStep(stepIndex);
      },
    });

    cards.forEach((card, index) => {
      if (index === 0) return;
      gsap.fromTo(
        card,
        {
          yPercent: 120,
          opacity: 0,
          scale: 0.9,
        },
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: () => `top+=${(index - 0.7) * (window.innerHeight * 0.85)} top`,
            end: () => `top+=${index * (window.innerHeight * 0.85)} top`,
            scrub: true,
          },
        }
      );
    });

    return () => {
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, []);

  return (
    <section
      id="architecture"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-[#06070b] overflow-hidden z-20 px-6 md:px-16"
    >
      <div className="absolute inset-0 sci-fi-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f2fe]/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Side Stepper Tabs */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-5 z-30">
        {architectureSteps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className="flex items-center gap-3 text-left group"
          >
            <div
              className={`h-2 transition-all duration-300 rounded-full ${
                activeStep === idx
                  ? "w-8 bg-[#00f2fe] shadow-md shadow-[#00f2fe]"
                  : "w-2 bg-white/20 group-hover:bg-white/50"
              }`}
            />
            <span
              className={`font-mono text-xs transition-colors duration-300 ${
                activeStep === idx ? "text-[#00f2fe] font-bold" : "text-white/30"
              }`}
            >
              {s.step} · {s.tag}
            </span>
          </button>
        ))}
      </div>

      {/* Main Architecture Card Stack */}
      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
        {architectureSteps.map((item, idx) => (
          <div
            key={idx}
            className={`arch-card absolute inset-0 rounded-3xl p-8 md:p-12 flex flex-col justify-between border border-white/15 bg-[#0b0e1a]/95 backdrop-blur-2xl shadow-2xl transition-all duration-500 ${
              idx === 0 ? "z-10" : `z-${(idx + 1) * 10}`
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#00f2fe] block mb-1">
                  Architecture Layer {item.step}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white">
                  {item.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-mono font-black text-[#a855f7] block">
                  {item.metric}
                </span>
                <span className="text-[10px] font-mono uppercase text-white/50">
                  {item.metricLabel}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="my-6">
              <p className="text-base sm:text-lg text-white/70 max-w-2xl font-light leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {item.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/90 flex items-center gap-2"
                  >
                    <span className="text-[#00f2fe]">⚡</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-white/40">
              <span>NEXUS ENTERPRISE SPECIFICATION</span>
              <span className="text-[#00f2fe]">SCROLL DOWN TO PROGRESS ↓</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

