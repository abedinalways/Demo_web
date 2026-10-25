"use client";

import React, { useState } from "react";

export interface Agent {
  id: string;
  name: string;
  badge: string;
  category: "Engineering" | "Data & Research" | "Security" | "Marketing" | "Operations";
  price: number;
  rating: number;
  tasksCompleted: string;
  models: string;
  description: string;
  capabilities: string[];
  tools: string[];
  accentColor: string;
  samplePrompt: string;
}

export const sampleAgents: Agent[] = [
  {
    id: "apex-architect",
    name: "Apex Architect v4.5",
    badge: "Most Popular",
    category: "Engineering",
    price: 79,
    rating: 4.96,
    tasksCompleted: "48,200+",
    models: "Claude 3.5 Sonnet + GPT-4o",
    description:
      "Autonomous senior software engineer agent capable of analyzing complex repositories, writing full production code, debugging edge cases, and generating test suites.",
    capabilities: [
      "Full Codebase Context Window",
      "Automated Git PR & Code Review",
      "Docker & Cloud Deployment Generation",
      "Multi-file Refactoring Engine",
    ],
    tools: ["GitHub API", "Bash Sandbox", "Postgres Runner", "AST Parser"],
    accentColor: "#00f2fe",
    samplePrompt: "Audit this Next.js repository for memory leaks and optimize Three.js render loops.",
  },
  {
    id: "sentinel-guard",
    name: "Sentinel CyberGuard",
    badge: "Enterprise Grade",
    category: "Security",
    price: 129,
    rating: 4.98,
    tasksCompleted: "19,450+",
    models: "Fine-tuned DeepSeek V3 + Mistral Large",
    description:
      "Autonomous cybersecurity sentry scanning APIs, smart contracts, and cloud infrastructure for CVE zero-days, injection exploits, and compliance drift.",
    capabilities: [
      "Real-time Smart Contract Audit",
      "Automated Penetration Testing",
      "SOC-2 & GDPR Compliance Verification",
      "Immediate Vulnerability Patch Proposal",
    ],
    tools: ["Nmap", "Slither", "BurpSuite API", "CloudTrail Monitor"],
    accentColor: "#a855f7",
    samplePrompt: "Run an automated vulnerability scan on our payment gateway endpoints.",
  },
  {
    id: "omni-researcher",
    name: "OmniSearch DossierBot",
    badge: "High Efficiency",
    category: "Data & Research",
    price: 49,
    rating: 4.92,
    tasksCompleted: "62,100+",
    models: "Perplexity Sonar + GPT-4o Search",
    description:
      "Autonomous deep-research agent that searches academic libraries, live web indexes, and patent registries to produce structured 20-page intelligence dossiers.",
    capabilities: [
      "Multi-source Fact Cross-Checking",
      "PDF & Financial Report Extraction",
      "Interactive Chart & Graph Generation",
      "Automated Citation Verification",
    ],
    tools: ["Web Scraper", "ArXiv API", "Semantic Vector DB", "Pandas"],
    accentColor: "#3b82f6",
    samplePrompt: "Compile a market landscape report on commercial humanoid robotics with financial projections.",
  },
  {
    id: "quant-pulse",
    name: "QuantPulse Analyst",
    badge: "Algorithmic",
    category: "Data & Research",
    price: 99,
    rating: 4.94,
    tasksCompleted: "34,800+",
    models: "Llama 3 70B Financial + Claude 3.5",
    description:
      "High-frequency market intelligence agent monitoring global macro trends, order book depth, SEC 10-K filings, and social sentiment shifts in real time.",
    capabilities: [
      "SEC Filing Anomaly Detection",
      "Real-time Sentiment Scoring",
      "Backtested Portfolio Simulation",
      "Risk Mitigation Alerts",
    ],
    tools: ["Bloomberg API", "Python Statsmodels", "Polygon.io", "FRED"],
    accentColor: "#f7c02f",
    samplePrompt: "Analyze the correlation between semiconductor supply chain indices and Fed rate decisions.",
  },
  {
    id: "growth-copywriter",
    name: "GrowthEngine CopyAgent",
    badge: "High Conversion",
    category: "Marketing",
    price: 39,
    rating: 4.89,
    tasksCompleted: "95,400+",
    models: "GPT-4o Mini + Custom Brand LoRA",
    description:
      "Data-backed conversion copywriter generating high-intent landing page copy, multi-channel ad variants, and psychological email sequences that maximize ROAS.",
    capabilities: [
      "A/B Variant Matrix Generation",
      "Tone of Voice Calibration",
      "Competitor Ad Library Analysis",
      "High-converting Hook Architectures",
    ],
    tools: ["Meta Ad API", "Google Analytics 4", "Semrush API", "Figma Sync"],
    accentColor: "#ec4899",
    samplePrompt: "Generate 5 high-converting ad angles targeting B2B SaaS CTOs for our AI agent platform.",
  },
  {
    id: "ops-conductor",
    name: "SupportSwarm Operator",
    badge: "Autonomous 24/7",
    category: "Operations",
    price: 89,
    rating: 4.95,
    tasksCompleted: "112,000+",
    models: "Claude 3.5 Haiku + Custom RAG",
    description:
      "Autonomous customer success engineer resolving Tier-1 through Tier-3 technical support tickets, generating SQL bug reports, and handling client inquiries.",
    capabilities: [
      "Deterministic Action Triggers",
      "CRM & Zendesk Auto-Sync",
      "Multi-lingual Native Translation",
      "Human-in-the-Loop Escalation",
    ],
    tools: ["Zendesk API", "Stripe API", "Slack Webhooks", "Linear API"],
    accentColor: "#10b981",
    samplePrompt: "Handle user refund request according to company policy SLA and update billing record.",
  },
];

const categories = [
  "All",
  "Engineering",
  "Data & Research",
  "Security",
  "Marketing",
  "Operations",
];

export default function AgentMarketplace({
  onSelectAgentForDemo,
}: {
  onSelectAgentForDemo?: (agent: Agent) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAgentDetail, setSelectedAgentDetail] = useState<Agent | null>(null);

  const filteredAgents =
    selectedCategory === "All"
      ? sampleAgents
      : sampleAgents.filter((a) => a.category === selectedCategory);

  return (
    <section
      id="marketplace"
      className="relative min-h-screen py-32 px-6 md:px-16 z-20 bg-[#06070b] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Marketplace Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f2fe]/30 bg-[#00f2fe]/10 text-xs font-mono uppercase tracking-widest text-[#00f2fe] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse" />
              Verified Commercial Fleet
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
              Agent <span className="text-[#00f2fe]">Marketplace</span>
            </h2>
            <p className="mt-3 text-white/60 max-w-xl text-base font-light">
              Browse pre-configured, production-hardened AI agents ready to be
              deployed to your private encrypted workspace in under 60 seconds.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                data-cursor="FILTER"
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#00f2fe] text-black font-bold scale-105 shadow-lg shadow-[#00f2fe]/25"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="group relative rounded-3xl p-7 border border-white/10 bg-[#0d101b]/80 backdrop-blur-xl flex flex-col justify-between transition-all duration-400 hover:border-[#00f2fe]/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#00f2fe]/10"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold"
                    style={{
                      backgroundColor: `${agent.accentColor}20`,
                      color: agent.accentColor,
                      border: `1px solid ${agent.accentColor}40`,
                    }}
                  >
                    {agent.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-white/70">
                    <span className="text-[#f7c02f]">★</span>
                    <span className="font-bold text-white">{agent.rating}</span>
                    <span className="text-white/40">({agent.tasksCompleted})</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-[#00f2fe] transition-colors mb-1">
                  {agent.name}
                </h3>

                <div className="text-xs font-mono text-white/40 mb-4 flex items-center gap-2">
                  <span>Engine: {agent.models}</span>
                </div>

                <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
                  {agent.description}
                </p>

                {/* Capabilities Chips */}
                <div className="space-y-2 mb-6">
                  {agent.capabilities.slice(0, 3).map((cap, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-white/80 font-mono"
                    >
                      <span className="text-[#00f2fe]">✓</span>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Pricing & Action */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-white/40">
                    Subscription
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white">
                      ${agent.price}
                    </span>
                    <span className="text-xs font-mono text-white/50">/month</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onSelectAgentForDemo) onSelectAgentForDemo(agent);
                    }}
                    data-cursor="TEST"
                    className="px-4 py-2 rounded-full border border-[#00f2fe]/40 bg-[#00f2fe]/10 hover:bg-[#00f2fe] text-[#00f2fe] hover:text-black font-bold text-xs uppercase tracking-wider transition-all duration-300"
                  >
                    Test Live ⚡
                  </button>
                  <button
                    onClick={() => setSelectedAgentDetail(agent)}
                    data-cursor="DETAILS"
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Agent Deep-Dive Modal */}
      {selectedAgentDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl"
          onClick={() => setSelectedAgentDetail(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0d101b] border border-[#00f2fe]/30 p-8 sm:p-12 shadow-2xl shadow-[#00f2fe]/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAgentDetail(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                style={{
                  backgroundColor: `${selectedAgentDetail.accentColor}20`,
                  color: selectedAgentDetail.accentColor,
                }}
              >
                {selectedAgentDetail.category} · {selectedAgentDetail.badge}
              </span>
              <span className="text-xs font-mono text-white/50">
                Model: {selectedAgentDetail.models}
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white mb-3">
              {selectedAgentDetail.name}
            </h3>

            <p className="text-base text-white/70 leading-relaxed font-light mb-8">
              {selectedAgentDetail.description}
            </p>

            {/* Core Capabilities */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#00f2fe] mb-3">
                Autonomous Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedAgentDetail.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white/90 font-mono flex items-center gap-2"
                  >
                    <span className="text-[#00f2fe]">◆</span>
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Tools & APIs */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#a855f7] mb-3">
                Native Tool Integrations
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedAgentDetail.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-xs font-mono text-white/80"
                  >
                    ⚡ {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-white/40 block">
                  Commercial License
                </span>
                <span className="text-3xl font-black text-white">
                  ${selectedAgentDetail.price}
                  <span className="text-sm font-mono text-white/50">/month</span>
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const agent = selectedAgentDetail;
                    setSelectedAgentDetail(null);
                    if (onSelectAgentForDemo) onSelectAgentForDemo(agent);
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#00f2fe] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
                >
                  Test in Playground ⚡
                </button>
                <button
                  onClick={() => {
                    alert(
                      `Ready for checkout: Subscribe to ${selectedAgentDetail.name} at $${selectedAgentDetail.price}/mo.`
                    );
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-gradient-to-r from-[#a855f7] to-[#f7c02f] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                >
                  Purchase License
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

