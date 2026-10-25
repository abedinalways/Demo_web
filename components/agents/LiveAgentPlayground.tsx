"use client";

import React, { useState, useEffect, useRef } from "react";
import { Agent, sampleAgents } from "./AgentMarketplace";

interface Message {
  role: "user" | "agent" | "system" | "tool";
  content: string;
  toolCall?: { name: string; status: "running" | "done"; output?: string };
  downloadUrl?: string;
  fileName?: string;
  timestamp: string;
}

function createWelcomeMessages(agent: Agent): Message[] {
  return [
    {
      role: "system",
      content: `Initialized ${agent.name} in Private Sandbox. Models: ${agent.models}. Memory Store: Connected.`,
      timestamp: "12:00",
    },
    {
      role: "agent",
      content: `Hello! I am ${agent.name}. My autonomous tools and context window are primed. What task would you like me to execute today?`,
      timestamp: "12:00",
    },
  ];
}

export default function LiveAgentPlayground({
  isOpen,
  onClose,
  initialAgent,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialAgent?: Agent | null;
}) {
  const selectedAgent = initialAgent || sampleAgents[0];
  const [currentAgentId, setCurrentAgentId] = useState(selectedAgent.id);
  const activeAgent =
    sampleAgents.find((a) => a.id === currentAgentId) || selectedAgent;

  const [inputPrompt, setInputPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() =>
    createWelcomeMessages(activeAgent)
  );
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAgentChange = (newAgent: Agent) => {
    setCurrentAgentId(newAgent.id);
    setMessages(createWelcomeMessages(newAgent));
  };

  const executeTask = (promptText: string) => {
    if (!promptText.trim() || isRunning) return;

    const userMsg: Message = {
      role: "user",
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setIsRunning(true);

    // Multi-step realistic autonomous execution simulation
    setTimeout(() => {
      // Step 1: Tool Execution
      setMessages((prev) => [
        ...prev,
        {
          role: "tool",
          content: `Calling tool: ${activeAgent.tools[0]} with parameters: { target: "context", depth: "full" }`,
          toolCall: {
            name: activeAgent.tools[0],
            status: "running",
          },
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);

      setTimeout(() => {
        // Step 2: Tool Complete
        setMessages((prev) => [
          ...prev,
          {
            role: "tool",
            content: `Tool ${activeAgent.tools[0]} successfully executed. Found 4 vector cluster references and 0 critical blockers.`,
            toolCall: {
              name: activeAgent.tools[0],
              status: "done",
              output: "Status: 200 OK | Parsed 14,200 tokens",
            },
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);

        setTimeout(() => {
          // Step 3: Final Agent Output & Downloadable Artifact
          setMessages((prev) => [
            ...prev,
            {
              role: "agent",
              content: `Task executed autonomously! Here is the summary:\n\n1. Analyzed request under ${activeAgent.name} policy.\n2. Injected zero-leakage safety filters.\n3. Compiled full structural analysis and generated downloadable production artifact.`,
              downloadUrl: "#",
              fileName: `${activeAgent.id}-execution-result.json`,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
          setIsRunning(false);
        }, 1200);
      }, 1000);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[88vh] rounded-3xl bg-[#090c14] border border-[#00f2fe]/40 flex flex-col overflow-hidden shadow-2xl shadow-[#00f2fe]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Playground Top Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#0d111d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  {activeAgent.name}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/30">
                  SANDBOX ONLINE
                </span>
              </div>
              <div className="text-[11px] font-mono text-white/40">
                Workspace ID: ws_84920 · Isolated RAM: 16GB
              </div>
            </div>
          </div>

          {/* Agent Switcher Dropdown */}
          <div className="flex items-center gap-3">
            <select
              value={activeAgent.id}
              onChange={(e) => {
                const found = sampleAgents.find((a) => a.id === e.target.value);
                if (found) handleAgentChange(found);
              }}
              className="bg-black/50 border border-white/15 text-white text-xs font-mono rounded-lg px-3 py-1.5 focus:border-[#00f2fe] outline-none"
            >
              {sampleAgents.map((a) => (
                <option key={a.id} value={a.id} className="bg-[#090c14]">
                  {a.name} (${a.price}/mo)
                </option>
              ))}
            </select>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Chat / Execution Stream Window */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-xs">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                msg.role === "user"
                  ? "items-end"
                  : msg.role === "tool"
                  ? "items-center"
                  : msg.role === "system"
                  ? "items-center"
                  : "items-start"
              }`}
            >
              {msg.role === "system" && (
                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/50">
                  {msg.content}
                </div>
              )}

              {msg.role === "tool" && (
                <div className="w-full max-w-lg p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-purple-300 text-[11px] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    <span>{msg.content}</span>
                  </div>
                  {msg.toolCall?.output && (
                    <span className="text-[10px] text-emerald-400">
                      ✓ {msg.toolCall.output}
                    </span>
                  )}
                </div>
              )}

              {msg.role === "user" && (
                <div className="max-w-xl p-4 rounded-2xl rounded-tr-none bg-[#00f2fe] text-black font-sans text-sm font-medium shadow-lg shadow-[#00f2fe]/20">
                  <p>{msg.content}</p>
                  <span className="block text-[10px] font-mono text-black/60 text-right mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              )}

              {msg.role === "agent" && (
                <div className="max-w-xl p-4 rounded-2xl rounded-tl-none bg-[#121624] border border-white/10 text-white font-sans text-sm shadow-xl">
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#00f2fe]">
                    <span>⚡ {activeAgent.name}</span>
                    <span className="text-white/30">· {msg.timestamp}</span>
                  </div>
                  <div className="whitespace-pre-line text-white/80 leading-relaxed">
                    {msg.content}
                  </div>

                  {msg.fileName && (
                    <div className="mt-4 p-3 rounded-xl bg-white/5 border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                        <span>📦</span>
                        <span>{msg.fileName}</span>
                      </div>
                      <button
                        onClick={() =>
                          alert(`Simulated Download: ${msg.fileName} saved to disk.`)
                        }
                        className="px-3 py-1 rounded bg-emerald-500 text-black font-bold text-[10px] uppercase tracking-wider hover:bg-white transition-colors"
                      >
                        Download Result
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isRunning && (
            <div className="flex items-center gap-2 text-xs text-[#00f2fe] animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#00f2fe]" />
              <span>{activeAgent.name} is reasoning & executing tools...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-6 py-2 bg-[#0d111d] border-t border-white/5 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <span className="text-white/40 text-[10px] uppercase">Sample:</span>
          <button
            onClick={() => executeTask(activeAgent.samplePrompt)}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white truncate max-w-md transition-colors"
          >
            &quot;{activeAgent.samplePrompt}&quot;
          </button>
        </div>

        {/* Prompt Input Box */}
        <div className="p-4 bg-[#0d111d] border-t border-white/10 flex items-center gap-3">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") executeTask(inputPrompt);
            }}
            placeholder={`Instruct ${activeAgent.name}... (e.g. "Run test suite", "Audit smart contract")`}
            className="flex-1 bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:border-[#00f2fe] outline-none font-sans"
          />
          <button
            onClick={() => executeTask(inputPrompt)}
            disabled={isRunning || !inputPrompt.trim()}
            className="px-6 py-3 rounded-xl bg-[#00f2fe] text-black font-bold text-xs uppercase tracking-wider hover:bg-white disabled:opacity-40 disabled:hover:bg-[#00f2fe] transition-all"
          >
            Execute ⚡
          </button>
        </div>
      </div>
    </div>
  );
}

