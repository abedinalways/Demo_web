"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface DokmehScrollDetail {
  progress?: number;
  scroll?: number;
  velocity?: number;
}

export default function Hero3DExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0d0d0d, 0.05);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- 3D Objects: Dokmeh Geometric Emblem ---
    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Dokmeh Prism / Octahedron Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a,
      emissive: 0x111111,
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // 2. Outer Yellow Glowing Wireframe Cage
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xf7c02f,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireMesh = new THREE.Mesh(coreGeometry.clone(), wireMaterial);
    wireMesh.scale.setScalar(1.05);
    group.add(wireMesh);

    // 3. Surrounding Kinetic Orbital Rings (Dokmeh Golden Rings)
    const ringGeo = new THREE.TorusGeometry(2.4, 0.03, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf7c02f,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x755910,
    });

    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 4;
    ring2.scale.setScalar(1.15);
    group.add(ring2);

    // 4. Floating Atmospheric Dust Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 15;
      particlePositions[i + 1] = (Math.random() - 0.5) * 15;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xf7c02f,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const yellowLight = new THREE.PointLight(0xf7c02f, 35, 20);
    yellowLight.position.set(4, 4, 4);
    scene.add(yellowLight);

    const rimLight = new THREE.PointLight(0xffffff, 20, 20);
    rimLight.position.set(-4, -3, -2);
    scene.add(rimLight);

    // --- Mouse & Scroll State ---
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

    // Listen to custom Lenis event
    const onDokmehScroll = (e: Event) => {
      const customEvent = e as CustomEvent<DokmehScrollDetail>;
      if (customEvent.detail?.progress !== undefined) {
        scrollProgress = customEvent.detail.progress;
      }
    };
    window.addEventListener("dokmeh-scroll", onDokmehScroll);

    // --- Resize Handler ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // --- Animation Loop ---
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Base rotation + mouse tilt
      coreMesh.rotation.y = elapsedTime * 0.2 + mouseX * 0.5;
      coreMesh.rotation.x = elapsedTime * 0.15 + mouseY * 0.5;

      wireMesh.rotation.y = -elapsedTime * 0.25 - mouseX * 0.4;
      wireMesh.rotation.z = elapsedTime * 0.1;

      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.x = elapsedTime * 0.25;

      // Scroll-driven transforms (Dokmeh style morphing on scroll)
      const scrollFactor = Math.min(scrollProgress * 2.5, 1);
      group.position.y = -scrollFactor * 2.2 + mouseY * 0.3;
      group.position.x = mouseX * 0.4;
      group.rotation.y = elapsedTime * 0.2 + scrollProgress * Math.PI * 2;

      const dynamicScale = 1 + Math.sin(scrollProgress * Math.PI) * 0.3;
      group.scale.setScalar(dynamicScale);

      // Drift particles gently
      particles.rotation.y = elapsedTime * 0.03;

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

      coreGeometry.dispose();
      coreMaterial.dispose();
      wireMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

