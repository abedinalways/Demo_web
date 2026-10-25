"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function DokmehLoader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const finishLoading = () => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
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

      const blockSize = Math.max(30, Math.floor(window.innerWidth / 30));
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
            delay: dist * 0.03 + Math.random() * 0.15,
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
          ctx.fillStyle = "#f7c02f";

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
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        triggerPixelTransition();
      } else {
        setProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (isLoaded) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col justify-between items-center bg-[#f7c02f] p-8 text-black select-none pointer-events-auto"
    >
      {/* Pixel Dissolve Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Top Header in Loader */}
      <div className="w-full flex justify-between items-center text-xs tracking-widest font-mono uppercase font-semibold relative z-20">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          Dokmeh Studio
        </span>
        <span>Crafting Experiences</span>
      </div>

      {/* Center Logo & Emblem */}
      <div className="relative z-20 flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          <svg
            className="w-20 h-20 md:w-28 md:h-28 animate-pulse text-black"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="currentColor"
              strokeWidth="6"
              strokeDasharray="4 6"
            />
            <path
              d="M38 32 L62 50 L38 68 Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="text-center">
          <div className="font-mono text-xs tracking-widest uppercase font-semibold text-black/70 mb-1">
            Award-Winning Web Experience
          </div>
          <div className="text-3xl md:text-5xl font-extrabold tracking-tighter text-black">
            DOKMEH AGENCY
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar & Percentage */}
      <div className="w-full max-w-md relative z-20 flex flex-col gap-2">
        <div className="flex justify-between items-center font-mono text-sm font-bold">
          <span>INITIALIZING THREE.JS ENGINE</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-[3px] bg-black/15 overflow-hidden rounded-full">
          <div
            className="h-full bg-black transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

