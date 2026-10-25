"use client";

import React, { useState } from "react";

export default function WorkspacePreview({
  onOpenPlayground,
}: {
  onOpenPlayground?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"customer" | "admin">("customer");

  return (
    <section
      id="workspace"
      className="relative min-h-screen py-32 px-6 md:px-16 z-20 bg-[#06070b] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10 text-xs font-mono uppercase tracking-widest text-[#a855f7] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
              Operational Interfaces
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
              Customer & <span className="text-[#a855f7]">Admin Portals</span>
            </h2>
            <p className="mt-3 text-white/60 max-w-xl text-base font-light">
              Explore the interfaces designed for end-customers commanding their
              agents, alongside the comprehensive administrator control center.
            </p>
          </div>

          {/* Persona Switcher Toggle */}
          <div className="flex p-1 rounded-full bg-white/5 border border-white/10">
            <button
              onClick={() => setActiveTab("customer")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 ${
                activeTab === "customer"
                  ? "bg-[#00f2fe] text-black shadow-lg shadow-[#00f2fe]/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Customer Workspace
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 ${
                activeTab === "admin"
                  ? "bg-[#a855f7] text-black shadow-lg shadow-[#a855f7]/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Admin Superpanel
            </button>
          </div>
        </div>

        {/* Dynamic Simulated Dashboard Mockup */}
        <div className="relative rounded-3xl border border-white/15 bg-[#0b0e1a]/95 backdrop-blur-2xl shadow-2xl overflow-hidden p-6 sm:p-10">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-white/40 pl-2">
                {activeTab === "customer"
                  ? "nexus.ai/app/workspace-sandbox-01"
                  : "nexus.ai/admin/system-telemetry"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-white/5 text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                ● REST & WS CONNECTED
              </span>
              <button
                onClick={onOpenPlayground}
                className="px-3 py-1 rounded bg-[#00f2fe] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                Launch Sandbox ⚡
              </button>
            </div>
          </div>

          {activeTab === "customer" ? (
            /* Customer Dashboard View */
            <div className="space-y-8">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-mono text-white/50 mb-1">
                    Active Agent Licenses
                  </div>
                  <div className="text-3xl font-black text-white">4 Deployed</div>
                  <div className="text-[11px] font-mono text-[#00f2fe] mt-2">
                    ↑ Apex, Sentinel, Omni, Quant
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-mono text-white/50 mb-1">
                    Monthly Token Usage
                  </div>
                  <div className="text-3xl font-black text-white">2.4M / 5M</div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-[#00f2fe] w-[48%]" />
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-mono text-white/50 mb-1">
                    Vector Memory Nodes
                  </div>
                  <div className="text-3xl font-black text-white">18,420</div>
                  <div className="text-[11px] font-mono text-emerald-400 mt-2">
                    ✓ Encrypted & Isolated
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-mono text-white/50 mb-1">
                    Generated Deliverables
                  </div>
                  <div className="text-3xl font-black text-white">142 Files</div>
                  <div className="text-[11px] font-mono text-purple-400 mt-2">
                    Downloadable Artifacts
                  </div>
                </div>
              </div>

              {/* Active Workspace Tasks Table */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Recent Autonomous Agent Jobs
                  </h4>
                  <span className="text-xs font-mono text-white/40">
                    Auto-refreshing (every 2s)
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-white/40 pb-2">
                        <th className="py-2">Agent</th>
                        <th className="py-2">Task Description</th>
                        <th className="py-2">Tools Invoked</th>
                        <th className="py-2">Status</th>
                        <th className="py-2 text-right">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white/80">
                      <tr>
                        <td className="py-3 font-bold text-[#00f2fe]">
                          Apex Architect
                        </td>
                        <td className="py-3 text-white">
                          Refactor Three.js Canvas Memory Lifecycle
                        </td>
                        <td className="py-3 text-white/50">AST Parser, Git PR</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Completed (1.4s)
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() =>
                              alert("Simulated File Download: refactor_diff.patch")
                            }
                            className="text-[#00f2fe] hover:underline"
                          >
                            Download PR ↗
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-bold text-[#a855f7]">
                          Sentinel Guard
                        </td>
                        <td className="py-3 text-white">
                          Penetration Test on Auth API Endpoints
                        </td>
                        <td className="py-3 text-white/50">Nmap, BurpSuite</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            0 Vulnerabilities
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() =>
                              alert("Simulated File Download: security_audit.pdf")
                            }
                            className="text-[#a855f7] hover:underline"
                          >
                            View Audit ↗
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-bold text-[#f7c02f]">
                          QuantPulse
                        </td>
                        <td className="py-3 text-white">
                          Analyze Q3 AI Hardware Supply Chain Index
                        </td>
                        <td className="py-3 text-white/50">Polygon.io, Pandas</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            In Progress (78%)
                          </span>
                        </td>
                        <td className="py-3 text-right text-white/40">
                          Streaming data...
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* Admin Superpanel View */
            <div className="space-y-8">
              {/* Revenue & Infrastructure Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-mono text-white/50 mb-1">
                    Monthly Recurring Revenue (MRR)
                  </div>
                  <div className="text-3xl font-black text-emerald-400">
                    $184,250
                  </div>
                  <div className="text-[11px] font-mono text-emerald-300 mt-2">
                    ↑ 28.4% vs last month
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-mono text-white/50 mb-1">
                    Active Customer Organizations
                  </div>
                  <div className="text-3xl font-black text-white">1,240</div>
                  <div className="text-[11px] font-mono text-white/50 mt-2">
                    98.6% Retention Rate
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-mono text-white/50 mb-1">
                    Inference & API Cost Margin
                  </div>
                  <div className="text-3xl font-black text-[#00f2fe]">78.2%</div>
                  <div className="text-[11px] font-mono text-white/50 mt-2">
                    Automated Cache Hit: 42%
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-mono text-white/50 mb-1">
                    System Health & Failover
                  </div>
                  <div className="text-3xl font-black text-white">99.99%</div>
                  <div className="text-[11px] font-mono text-emerald-400 mt-2">
                    0 Critical Incidents
                  </div>
                </div>
              </div>

              {/* Admin Agent Inventory & API Control */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Agent Fleet Manager (Add/Edit/Audit)
                    </h4>
                    <button
                      onClick={() => alert("Admin Action: Open Add New AI Agent Wizard")}
                      className="px-3 py-1 rounded bg-[#a855f7] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                    >
                      + Add New Agent
                    </button>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-white/5 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">Apex Architect v4.5</div>
                        <div className="text-white/40">Base: Claude 3.5 Sonnet · 420 active instances</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400">$33,180 MRR</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">ACTIVE</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">Sentinel CyberGuard</div>
                        <div className="text-white/40">Base: DeepSeek V3 + Mistral · 198 active instances</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400">$25,542 MRR</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">ACTIVE</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">OmniSearch DossierBot</div>
                        <div className="text-white/40">Base: Perplexity Sonar · 680 active instances</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400">$33,320 MRR</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4">
                    Live System Telemetry
                  </h4>
                  <div className="space-y-3 font-mono text-xs text-white/60">
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span>Anthropic API Route:</span>
                      <span className="text-emerald-400">HEALTHY (18ms)</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span>OpenAI Gateway:</span>
                      <span className="text-emerald-400">HEALTHY (22ms)</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span>Pinecone Vector Index:</span>
                      <span className="text-emerald-400">SYNCED (99.9%)</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span>Stripe Webhook Listeners:</span>
                      <span className="text-emerald-400">LISTENING</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sandboxed microVM Pods:</span>
                      <span className="text-[#00f2fe]">128 / 500 Used</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

