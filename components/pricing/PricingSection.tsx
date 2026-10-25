"use client";

import React, { useState } from "react";

const plans = [
  {
    name: "Starter Fleet",
    badge: "Individuals & Creators",
    priceMonthly: 49,
    priceAnnual: 39,
    description:
      "Ideal for solo founders and technical creators needing specialized agents for day-to-day coding, research, and analysis.",
    features: [
      "2 Concurrent Active Agents",
      "2,000,000 Tokens Included / mo",
      "Standard Isolated Vector Memory",
      "Live Web Browsing & Tool Access",
      "Community & Discord Support",
      "Standard Inference Routing",
    ],
    ctaText: "Start Starter Fleet",
    accent: "#3b82f6",
    popular: false,
  },
  {
    name: "Pro Autonomous",
    badge: "Most Popular",
    priceMonthly: 149,
    priceAnnual: 119,
    description:
      "For high-growth software teams and scaling businesses deploying multi-agent swarms with persistent memory and code execution.",
    features: [
      "6 Concurrent Active Agents",
      "10,000,000 Tokens Included / mo",
      "Encrypted Multi-tenant Vector Store",
      "Full MicroVM Code Sandbox & CLI",
      "Automated Git PR & CI/CD Pipelines",
      "Priority Inference Queue (Sub-50ms)",
      "Automated Stripe Invoicing & Team Seats",
    ],
    ctaText: "Deploy Pro Workspace",
    accent: "#00f2fe",
    popular: true,
  },
  {
    name: "Enterprise Sovereign",
    badge: "Custom Scale",
    priceMonthly: 499,
    priceAnnual: 399,
    description:
      "Dedicated multi-agent infrastructure with bespoke model fine-tuning, VPC deployment, and zero-data retention guarantees.",
    features: [
      "Unlimited Concurrent Agent Swarms",
      "Uncapped Metered Token Throughput",
      "Dedicated Sovereign VPC Sandbox",
      "Custom LoRA & Fine-Tuned Agent Weights",
      "SOC-2 Type II & HIPAA Compliance Pack",
      "Dedicated 24/7 Solutions Architect",
      "Custom Enterprise SLA (99.99%)",
    ],
    ctaText: "Contact Enterprise Desk",
    accent: "#a855f7",
    popular: false,
  },
];

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section
      id="pricing"
      className="relative min-h-screen py-32 px-6 md:px-16 z-20 bg-[#06070b] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f2fe]/30 bg-[#00f2fe]/10 text-xs font-mono uppercase tracking-widest text-[#00f2fe] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse" />
            Transparent Commercial Licensing
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6">
            Predictable Plans for <br />
            <span className="text-[#00f2fe]">Autonomous Scale</span>
          </h2>
          <p className="text-base text-white/60 font-light">
            Every plan includes isolated sandboxing, persistent memory, and native
            tool integrations. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Billing Interval Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-full transition-all ${
                !isAnnual
                  ? "bg-[#00f2fe] text-black font-bold shadow-md shadow-[#00f2fe]/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                isAnnual
                  ? "bg-[#00f2fe] text-black font-bold shadow-md shadow-[#00f2fe]/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded-full bg-black/40 text-[9px] text-[#00f2fe]">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 border ${
                  plan.popular
                    ? "bg-[#0d1222] border-[#00f2fe] shadow-2xl shadow-[#00f2fe]/15 scale-105 z-10"
                    : "bg-[#0b0e1a]/80 border-white/10 hover:border-white/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00f2fe] text-black text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg">
                    RECOMMENDED CHOICE
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase text-white/50">
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-white/10">
                    <span className="text-5xl font-black text-white">
                      ${price}
                    </span>
                    <span className="text-xs font-mono text-white/50">
                      / month {isAnnual ? "(billed annually)" : ""}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-[10px] font-mono uppercase text-[#00f2fe] tracking-wider mb-2">
                      Included Capabilities
                    </div>
                    {plan.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-white/80 font-mono"
                      >
                        <span className="text-[#00f2fe] mt-0.5">✓</span>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() =>
                    alert(
                      `Selected Plan: ${plan.name} at $${price}/mo (${
                        isAnnual ? "Annual" : "Monthly"
                      }). Integrating with Stripe Checkout.`
                    )
                  }
                  data-cursor="CHECKOUT"
                  className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    plan.popular
                      ? "bg-[#00f2fe] text-black hover:bg-white hover:shadow-xl hover:shadow-[#00f2fe]/20"
                      : "border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black"
                  }`}
                >
                  {plan.ctaText} →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

