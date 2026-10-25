"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function AIBootLoader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusLog, setStatusLog] = useState("CONNECTING TO NEURAL MESH...");
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const logs = [
      "SYNAPSE OS v4.2 KERNEL BOOT...",
      "LOADING THREE.JS QUANTUM GRAPHICS ENGINE...",
      "SPAWNING AUTONOMOUS AGENT ORCHESTRATOR...",
      "SYNCING VECTOR EMBEDDINGS & MEMORY NODES...",
      "ESTABLISHING ENCRYPTED WORKSPACE BRIDGE...",
      "ALL SYSTEMS OPTIMAL. SYSTEM READY.",
    ];

    const finishLoading = () => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setIsLoaded(true);
            if (onCompleteRef.current) {
              onCompleteRef.current();
            }
          },
        });
      }
    };

    const triggerPixelTransition = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        finishLoading();
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        finishLoading();
        return;
      }

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const blockSize = Math.max(28, Math.floor(window.innerWidth / 32));
      const cols = Math.ceil(canvas.width / blockSize);
      const rows = Math.ceil(canvas.height / blockSize);
      const totalBlocks = cols * rows;

      const blocks: { x: number; y: number; delay: number }[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dx = c - cols / 2;
          const dy = r - rows / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          blocks.push({
            x: c * blockSize,
            y: r * blockSize,
            delay: dist * 0.025 + Math.random() * 0.12,
          });
        }
      }

      blocks.sort((a, b) => a.delay - b.delay);

      const animObj = { progress: 0 };
      gsap.to(animObj, {
        progress: 1,
        duration: 0.9,
        ease: "power2.inOut",
        onUpdate: () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const threshold = animObj.progress;
          ctx.fillStyle = "#00f2fe";

          for (let i = 0; i < totalBlocks; i++) {
            const b = blocks[i];
            if (b.delay > threshold) {
              ctx.fillRect(b.x, b.y, blockSize + 1, blockSize + 1);
            }
          }
        },
        onComplete: finishLoading,
      });
    };

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 9) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setStatusLog("ALL SYSTEMS OPTIMAL. INITIALIZING INTERFACE.");
        triggerPixelTransition();
      } else {
        setProgress(current);
        const logIdx = Math.min(
          Math.floor((current / 100) * logs.length),
          logs.length - 1
        );
        setStatusLog(logs[logIdx]);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (isLoaded) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col justify-between items-center bg-[#06070b] p-8 text-white select-none pointer-events-auto"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Top Header */}
      <div className="w-full flex justify-between items-center text-xs tracking-widest font-mono uppercase text-white/60 relative z-20">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
          SYNAPSE OS · AI AGENT PLATFORM
        </span>
        <span className="text-[#00f2fe]">STABLE KERNEL v4.2</span>
      </div>

      {/* Center Hologram Emblem */}
      <div className="relative z-20 flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-[#00f2fe]/40 border-dashed animate-[spin_8s_linear_infinite] flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#a855f7]/60 animate-ping" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center font-mono font-black text-lg md:text-xl text-[#00f2fe]">
            AI
          </div>
        </div>

        <div className="text-center">
          <div className="font-mono text-xs tracking-widest uppercase font-semibold text-[#a855f7] mb-2">
            Autonomous Commercial Platform
          </div>
          <div className="text-3xl md:text-6xl font-black tracking-tighter text-white">
            NEXUS <span className="text-[#00f2fe]">AGENTS</span>
          </div>
        </div>
      </div>

      {/* Bottom Progress & Logs */}
      <div className="w-full max-w-md relative z-20 flex flex-col gap-3">
        <div className="flex justify-between items-center font-mono text-xs text-white/70">
          <span className="truncate pr-4 text-[#00f2fe]">{statusLog}</span>
          <span className="font-bold text-white">{progress}%</span>
        </div>
        <div className="w-full h-[3px] bg-white/10 overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[#00f2fe] via-[#a855f7] to-[#f7c02f] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

