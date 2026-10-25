"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface DokmehScrollDetail {
  progress?: number;
  scroll?: number;
  velocity?: number;
}

export default function Cinematic3DHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [agentMode, setAgentMode] = useState<"neural" | "sentinel" | "quantum">("neural");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070b, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // --- Central 3D Quantum Agent Group ---
    const agentGroup = new THREE.Group();
    scene.add(agentGroup);

    // 1. Multifaceted Quantum Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x090e18,
      emissive: 0x001528,
      roughness: 0.1,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    agentGroup.add(coreMesh);

    // 2. Holographic Cyan Lattice Wireframe
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(coreGeometry.clone(), wireMaterial);
    wireMesh.scale.setScalar(1.08);
    agentGroup.add(wireMesh);

    // 3. Inner Pulsing Core (Energy Chamber)
    const innerGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    agentGroup.add(innerMesh);

    // 4. Multi-Axis Synchrotron Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(2.5, 0.02, 16, 120);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x005577,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    agentGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.02, 16, 120);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x4c1d95,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    agentGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(3.1, 0.015, 16, 120);
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: 0xf7c02f,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x755910,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.z = Math.PI / 5;
    agentGroup.add(ring3);

    // 5. Neural Node Constellation (Synaptic Connections)
    const nodeCount = 35;
    const nodeGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
    const nodes: THREE.Mesh[] = [];
    const nodePositions: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4
      );
      nodePositions.push(pos);
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.copy(pos);
      agentGroup.add(mesh);
      nodes.push(mesh);
    }

    // Dynamic Line Connections between nearby nodes
    const maxLines = 40;
    const linePositions = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.2,
    });
    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    agentGroup.add(lineMesh);

    // 6. Atmospheric Floating Data Particles
    const particleCount = 250;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Dynamic Point Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f2fe, 45, 20);
    cyanLight.position.set(4, 3, 4);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 35, 20);
    purpleLight.position.set(-4, -3, 3);
    scene.add(purpleLight);

    const amberLight = new THREE.PointLight(0xf7c02f, 25, 20);
    amberLight.position.set(0, 5, -2);
    scene.add(amberLight);

    // --- State & Interaction Variables ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollProgress = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;
    };
    window.addEventListener("scroll", onScroll);

    const onDokmehScroll = (e: Event) => {
      const customEvent = e as CustomEvent<DokmehScrollDetail>;
      if (customEvent.detail?.progress !== undefined) {
        scrollProgress = customEvent.detail.progress;
      }
    };
    window.addEventListener("dokmeh-scroll", onDokmehScroll);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // --- Listen to Agent Mode Switch Event ---
    const onAgentSwitch = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode: "neural" | "sentinel" | "quantum" }>;
      const mode = customEvent.detail?.mode || "neural";
      setAgentMode(mode);

      if (mode === "neural") {
        wireMaterial.color.setHex(0x00f2fe);
        cyanLight.color.setHex(0x00f2fe);
        ringMat1.color.setHex(0x00f2fe);
      } else if (mode === "sentinel") {
        wireMaterial.color.setHex(0xa855f7);
        cyanLight.color.setHex(0xa855f7);
        ringMat1.color.setHex(0xa855f7);
      } else if (mode === "quantum") {
        wireMaterial.color.setHex(0xf7c02f);
        cyanLight.color.setHex(0xf7c02f);
        ringMat1.color.setHex(0xf7c02f);
      }
    };
    window.addEventListener("switch-agent-3d", onAgentSwitch);

    // --- Animation Loop ---
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Base Core Rotations
      coreMesh.rotation.y = elapsedTime * 0.25 + mouseX * 0.4;
      coreMesh.rotation.x = elapsedTime * 0.15 + mouseY * 0.4;

      wireMesh.rotation.y = -elapsedTime * 0.3 - mouseX * 0.3;
      wireMesh.rotation.z = elapsedTime * 0.2;

      innerMesh.rotation.y = elapsedTime * 0.4;
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.08;
      innerMesh.scale.setScalar(pulse);

      // Ring Rotations
      ring1.rotation.z = elapsedTime * 0.35;
      ring2.rotation.x = elapsedTime * 0.28;
      ring3.rotation.y = -elapsedTime * 0.22;

      // Pulse Synaptic Lines
      let lineIdx = 0;
      const lineArray = lineGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < nodes.length && lineIdx < maxLines * 6; i++) {
        for (let j = i + 1; j < nodes.length && lineIdx < maxLines * 6; j++) {
          const dist = nodePositions[i].distanceTo(nodePositions[j]);
          if (dist < 2.4) {
            lineArray[lineIdx++] = nodePositions[i].x;
            lineArray[lineIdx++] = nodePositions[i].y;
            lineArray[lineIdx++] = nodePositions[i].z;
            lineArray[lineIdx++] = nodePositions[j].x;
            lineArray[lineIdx++] = nodePositions[j].y;
            lineArray[lineIdx++] = nodePositions[j].z;
          }
        }
      }
      lineGeo.attributes.position.needsUpdate = true;

      // Scroll-driven position and scale transitions
      const scrollFactor = Math.min(scrollProgress * 2.2, 1);
      agentGroup.position.y = -scrollFactor * 2.8 + mouseY * 0.3;
      agentGroup.position.x = mouseX * 0.4;
      agentGroup.rotation.y = elapsedTime * 0.15 + scrollProgress * Math.PI * 2;

      const dynamicScale = 1 + Math.sin(scrollProgress * Math.PI) * 0.35;
      agentGroup.scale.setScalar(dynamicScale);

      // Particle Drift
      particles.rotation.y = elapsedTime * 0.025;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("dokmeh-scroll", onDokmehScroll);
      window.removeEventListener("switch-agent-3d", onAgentSwitch);

      coreGeometry.dispose();
      coreMaterial.dispose();
      wireMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const triggerModeChange = (mode: "neural" | "sentinel" | "quantum") => {
    setAgentMode(mode);
    window.dispatchEvent(
      new CustomEvent("switch-agent-3d", { detail: { mode } })
    );
  };

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      />

      {/* Interactive 3D Hologram Mode Switcher Widget */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-xs font-mono">
        <span className="px-3 py-1 text-white/50 uppercase text-[10px] tracking-wider">
          3D Core:
        </span>
        <button
          onClick={() => triggerModeChange("neural")}
          data-cursor="NEURAL"
          className={`px-3 py-1 rounded-full transition-all duration-300 ${
            agentMode === "neural"
              ? "bg-[#00f2fe] text-black font-bold shadow-lg shadow-[#00f2fe]/30"
              : "text-white/70 hover:text-white"
          }`}
        >
          Neural Bot
        </button>
        <button
          onClick={() => triggerModeChange("sentinel")}
          data-cursor="SENTINEL"
          className={`px-3 py-1 rounded-full transition-all duration-300 ${
            agentMode === "sentinel"
              ? "bg-[#a855f7] text-black font-bold shadow-lg shadow-[#a855f7]/30"
              : "text-white/70 hover:text-white"
          }`}
        >
          Sentinel
        </button>
        <button
          onClick={() => triggerModeChange("quantum")}
          data-cursor="QUANTUM"
          className={`px-3 py-1 rounded-full transition-all duration-300 ${
            agentMode === "quantum"
              ? "bg-[#f7c02f] text-black font-bold shadow-lg shadow-[#f7c02f]/30"
              : "text-white/70 hover:text-white"
          }`}
        >
          Quantum Quant
        </button>
      </div>
    </>
  );
}

