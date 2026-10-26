"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

interface DokmehScrollDetail {
  progress?: number;
  scroll?: number;
  velocity?: number;
}

interface DokmehArtifactActionDetail {
  action?: "spin" | "launch" | "ground";
}

interface Keyframe {
  p: number;
  camPos: [number, number, number];
  camLookAt: [number, number, number];
  emblemPos: [number, number, number];
  emblemScale: number;
  emblemRotYOffset: number;
  skyTop: string;
  skyBottom: string;
  fogColor: string;
  fogDensity: number;
  sunColor: string;
  sunIntensity: number;
  sunPos: [number, number, number];
  warmBounceColor: string;
  warmBounceIntensity: number;
  embersOpacity: number;
}

// 6 Continuous 3D Stages configuration across mouse scroll
const KEYFRAMES: Keyframe[] = [
  // 1. Hero Section (Reeds video with fluid ripple & floating emblem)
  {
    p: 0.0,
    camPos: [0, 0, 5.2],
    camLookAt: [0, 0, 0],
    emblemPos: [0, 0.4, 0],
    emblemScale: 0.85,
    emblemRotYOffset: 0,
    skyTop: "#617380",
    skyBottom: "#a8b4bb",
    fogColor: "#a8b4bb",
    fogDensity: 0.035,
    sunColor: "#fff3dc",
    sunIntensity: 2.4,
    sunPos: [-6, 8, 3],
    warmBounceColor: "#ffd58a",
    warmBounceIntensity: 2.5,
    embersOpacity: 0.0,
  },
  // 2a. Why Us (Entrance - Metric 45+)
  {
    p: 0.18,
    camPos: [-0.65, -0.05, 4.8],
    camLookAt: [0.1, 0.0, 0],
    emblemPos: [0.45, 0.25, 0],
    emblemScale: 0.82,
    emblemRotYOffset: 0.5,
    skyTop: "#617380",
    skyBottom: "#a8b4bb",
    fogColor: "#a8b4bb",
    fogDensity: 0.035,
    sunColor: "#fff3dc",
    sunIntensity: 2.4,
    sunPos: [-6, 8, 3],
    warmBounceColor: "#ffd58a",
    warmBounceIntensity: 2.5,
    embersOpacity: 0.0,
  },
  // 2b. Sea Beach Touchdown (Shoreline contact & Golden Color Spread)
  {
    p: 0.38,
    camPos: [-0.4, 0.05, 4.4],
    camLookAt: [-0.3, -0.1, -1.0],
    emblemPos: [-0.65, -0.26, -0.8], // Swoops down to water & sand contact point!
    emblemScale: 0.92,
    emblemRotYOffset: 1.5,
    skyTop: "#566773",
    skyBottom: "#9ca7ae",
    fogColor: "#9ca7ae",
    fogDensity: 0.036,
    sunColor: "#ffe5b9",
    sunIntensity: 2.7,
    sunPos: [-3, 6, 4],
    warmBounceColor: "#ffd060",
    warmBounceIntensity: 3.2,
    embersOpacity: 0.0,
  },
  // 2c. Why Us (Climax: "WHY US?" - Centered with golden veins spreading across beach)
  {
    p: 0.48,
    camPos: [0.0, 0.22, 4.1],
    camLookAt: [0.0, 0.18, 0],
    emblemPos: [0.0, 0.35, 0], // Center stage behind WHY US?
    emblemScale: 1.0,
    emblemRotYOffset: 2.2,
    skyTop: "#50626e",
    skyBottom: "#96a3aa",
    fogColor: "#96a3aa",
    fogDensity: 0.038,
    sunColor: "#ffdcad",
    sunIntensity: 2.6,
    sunPos: [-2, 6, 4],
    warmBounceColor: "#ffcb66",
    warmBounceIntensity: 2.8,
    embersOpacity: 0.0,
  },
  // 3. Twilight Philosophy (Amber sunset horizon & long golden reflections)
  {
    p: 0.66,
    camPos: [-1.2, 0.42, 4.3],
    camLookAt: [0.25, 0.15, -0.4],
    emblemPos: [0.55, 0.25, 0.2],
    emblemScale: 0.88,
    emblemRotYOffset: 3.4,
    skyTop: "#1c2833",
    skyBottom: "#b86a38",
    fogColor: "#594a4c",
    fogDensity: 0.042,
    sunColor: "#ff8433",
    sunIntensity: 3.2,
    sunPos: [-8, 2.5, -1],
    warmBounceColor: "#ffa944",
    warmBounceIntensity: 3.0,
    embersOpacity: 0.35,
  },
  // 4. Midnight Capabilities (Cosmic midnight deep ocean & starlight embers)
  {
    p: 0.84,
    camPos: [1.1, 0.52, 4.2],
    camLookAt: [-0.2, 0.2, 0],
    emblemPos: [-0.5, 0.35, 0.1],
    emblemScale: 0.92,
    emblemRotYOffset: 4.8,
    skyTop: "#030811",
    skyBottom: "#0d2338",
    fogColor: "#08131e",
    fogDensity: 0.046,
    sunColor: "#7dd3fc",
    sunIntensity: 1.4,
    sunPos: [4, 8, 2],
    warmBounceColor: "#f59e0b",
    warmBounceIntensity: 3.5,
    embersOpacity: 0.85,
  },
  // 5. Footer Outro (Smoothly lands on beach ground & enters free interactive drag mode)
  {
    p: 1.0,
    camPos: [0.0, 0.55, 4.3],
    camLookAt: [0.0, -0.15, -0.5],
    emblemPos: [0.0, -0.32, 0], // Smoothly grounded on sand surface!
    emblemScale: 0.95,
    emblemRotYOffset: 6.28,
    skyTop: "#151433",
    skyBottom: "#eab308",
    fogColor: "#221c33",
    fogDensity: 0.035,
    sunColor: "#fef08a",
    sunIntensity: 2.8,
    sunPos: [0, 4, -4],
    warmBounceColor: "#fbbf24",
    warmBounceIntensity: 3.0,
    embersOpacity: 0.6,
  },
];

export default function Dokmeh3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2(new THREE.Color("#a8b4bb"), 0.035);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    // Performance optimization: clamp pixel ratio to guarantee 60fps on Retina/4K displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- Global Uniforms for Waves & Beach Golden Color Spread ---
    const globalTimeUniform = { value: 0 };
    const goldSpreadOriginUniform = { value: new THREE.Vector2(-0.65, -4.8) };
    const goldSpreadRadiusUniform = { value: 0.0 };
    const goldSpreadIntensityUniform = { value: 0.0 };

    // --- 1. Background Hero Video + Liquid Ripple Displacement Pass ---
    const video = document.createElement("video");
    video.src = "/assets/video/home-bg-desktop-v2.mp4";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.crossOrigin = "anonymous";
    video.play().catch(() => {});

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    // 2D Ripple Canvas for Interactive Fluid Simulation
    const rippleCanvas = document.createElement("canvas");
    rippleCanvas.width = 256;
    rippleCanvas.height = 256;
    const rippleCtx = rippleCanvas.getContext("2d");
    if (rippleCtx) {
      rippleCtx.fillStyle = "black";
      rippleCtx.fillRect(0, 0, 256, 256);
    }
    const displacementTexture = new THREE.CanvasTexture(rippleCanvas);

    const rippleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: videoTexture },
        uDisplacement: { value: displacementTexture },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uStrength: { value: 0.045 },
        uOpacity: { value: 1.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform sampler2D uDisplacement;
        uniform vec2 uResolution;
        uniform float uStrength;
        uniform float uOpacity;
        varying vec2 vUv;
        const float PI = 3.141592653589793238;

        void main() {
          vec4 disp = texture2D(uDisplacement, vUv);
          float theta = disp.r * 2.0 * PI;
          vec2 dir = vec2(sin(theta), cos(theta));
          vec2 uv = vUv + dir * disp.r * uStrength;
          vec4 color = texture2D(uTexture, uv);
          gl_FragColor = vec4(color.rgb, color.a * uOpacity);
        }
      `,
      depthWrite: false,
      depthTest: false,
    });

    const bgPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      rippleMaterial
    );
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.Camera();
    bgScene.add(bgPlane);

    // --- 2. Load Textures & HDR Environment Map ---
    const texLoader = new THREE.TextureLoader();
    const goldColorMap = texLoader.load(
      "/assets/materials/Metal048A_1K-JPG/Metal048A_1K-JPG_Color.webp"
    );
    const goldRoughMap = texLoader.load(
      "/assets/materials/Metal048A_1K-JPG/Metal048A_1K-JPG_Roughness.webp"
    );
    const goldNormalMap = texLoader.load(
      "/assets/materials/Metal048A_1K-JPG/Metal048A_1K-JPG_NormalGL.webp"
    );

    const sandColorMap = texLoader.load("/assets/img/why-us-sand.webp");
    sandColorMap.wrapS = THREE.RepeatWrapping;
    sandColorMap.wrapT = THREE.RepeatWrapping;
    sandColorMap.repeat.set(16, 16);

    const rgbeLoader = new RGBELoader();
    rgbeLoader.load("/assets/hdr/warm_reception_dinner_1k.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    // --- 3. 3D Beach Universe (Sky, Dark Sand, Ocean Waves, Mountains) ---
    const beachGroup = new THREE.Group();
    scene.add(beachGroup);
    beachGroup.position.set(0, -1.2, 0);

    // Dynamic Gradient Sky Hemisphere Dome
    const skyGeo = new THREE.SphereGeometry(60, 32, 16);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        uTop: { value: new THREE.Color("#617380") },
        uBottom: { value: new THREE.Color("#a8b4bb") },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uTop;
        uniform vec3 uBottom;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          gl_FragColor = vec4(mix(uBottom, uTop, max(pow(max(h, 0.0), 0.6), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide,
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    beachGroup.add(skyMesh);

    // Sand Pebble Shoreline Plane (With Dynamic Golden Color Spread Shader)
    const sandGeo = new THREE.PlaneGeometry(60, 60, 48, 48);
    sandGeo.rotateX(-Math.PI / 2);
    const sandMat = new THREE.MeshStandardMaterial({
      map: sandColorMap,
      roughness: 0.85,
      metalness: 0.1,
      color: 0x484848,
    });

    sandMat.onBeforeCompile = (shader) => {
      shader.uniforms.uGoldOrigin = goldSpreadOriginUniform;
      shader.uniforms.uGoldRadius = goldSpreadRadiusUniform;
      shader.uniforms.uGoldIntensity = goldSpreadIntensityUniform;
      shader.uniforms.uTime = globalTimeUniform;

      shader.vertexShader = `
        varying vec3 vWorldPos;
        ${shader.vertexShader}
      `.replace(
        "#include <worldpos_vertex>",
        `
        #include <worldpos_vertex>
        vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
        `
      );

      shader.fragmentShader = `
        uniform vec2 uGoldOrigin;
        uniform float uGoldRadius;
        uniform float uGoldIntensity;
        uniform float uTime;
        varying vec3 vWorldPos;
        ${shader.fragmentShader}
      `.replace(
        "#include <dithering_fragment>",
        `
        #include <dithering_fragment>
        if (uGoldIntensity > 0.001) {
          float dist = length(vWorldPos.xz - uGoldOrigin);
          // Expanding golden shockwave ring
          float wave = smoothstep(2.5, 0.0, abs(dist - uGoldRadius)) * 2.8;
          // Golden infusion bleed behind the wave
          float fill = 1.0 - smoothstep(0.0, uGoldRadius, dist);
          float shimmer = sin(dist * 4.0 - uTime * 3.0) * 0.25 + 0.75;
          float total = (wave * 1.5 + fill * shimmer) * uGoldIntensity;
          vec3 goldColor = vec3(1.0, 0.84, 0.25);
          gl_FragColor.rgb += goldColor * clamp(total, 0.0, 2.5);
        }
        `
      );
    };

    const sandMesh = new THREE.Mesh(sandGeo, sandMat);
    sandMesh.position.set(0, -0.4, -6);
    beachGroup.add(sandMesh);

    // Ocean Water Plane (GPU Shader Waves + Golden Infusion Ripples)
    const waterGeo = new THREE.PlaneGeometry(45, 45, 48, 48);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x243a44,
      roughness: 0.15,
      metalness: 0.82,
      transparent: true,
      opacity: 0.94,
    });

    waterMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = globalTimeUniform;
      shader.uniforms.uGoldOrigin = goldSpreadOriginUniform;
      shader.uniforms.uGoldRadius = goldSpreadRadiusUniform;
      shader.uniforms.uGoldIntensity = goldSpreadIntensityUniform;

      shader.vertexShader = `
        uniform float uTime;
        varying vec3 vWorldPos;
        ${shader.vertexShader}
      `.replace(
        "#include <begin_vertex>",
        `
        #include <begin_vertex>
        float wave = sin(position.x * 0.8 + uTime * 1.8) * 0.05 + cos(position.y * 0.6 + uTime * 1.4) * 0.04;
        transformed.z += wave;
        `
      ).replace(
        "#include <worldpos_vertex>",
        `
        #include <worldpos_vertex>
        vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
        `
      );

      shader.fragmentShader = `
        uniform vec2 uGoldOrigin;
        uniform float uGoldRadius;
        uniform float uGoldIntensity;
        uniform float uTime;
        varying vec3 vWorldPos;
        ${shader.fragmentShader}
      `.replace(
        "#include <dithering_fragment>",
        `
        #include <dithering_fragment>
        if (uGoldIntensity > 0.001) {
          float dist = length(vWorldPos.xz - uGoldOrigin);
          float wave = smoothstep(2.5, 0.0, abs(dist - uGoldRadius)) * 3.2;
          float fill = 1.0 - smoothstep(0.0, uGoldRadius, dist);
          float shimmer = sin(dist * 3.5 - uTime * 4.0) * 0.3 + 0.7;
          float total = (wave * 1.8 + fill * shimmer) * uGoldIntensity;
          vec3 goldGleam = vec3(1.0, 0.88, 0.35);
          gl_FragColor.rgb += goldGleam * clamp(total, 0.0, 2.8);
        }
        `
      );
    };

    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.set(-11, -0.36, -6);
    waterMesh.rotation.y = 0.08;
    beachGroup.add(waterMesh);

    // Golden Shockwave Ring on Shoreline
    const shockwaveGeo = new THREE.RingGeometry(0.1, 1.4, 64);
    shockwaveGeo.rotateX(-Math.PI / 2);
    const shockwaveMat = new THREE.ShaderMaterial({
      uniforms: {
        uIntensity: goldSpreadIntensityUniform,
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uIntensity;
        varying vec2 vUv;
        void main() {
          float d = abs(length(vUv - 0.5) * 2.0 - 0.8);
          float alpha = smoothstep(0.4, 0.0, d) * uIntensity;
          vec3 col = vec3(1.0, 0.86, 0.32);
          gl_FragColor = vec4(col, alpha * 0.9);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.position.set(-0.65, -0.37, -4.8);
    beachGroup.add(shockwaveMesh);

    // Scattered Gold Nuggets & Coastal Rocks
    const rockGeo = new THREE.DodecahedronGeometry(0.14, 1);
    const goldNuggetMat = new THREE.MeshStandardMaterial({
      map: goldColorMap,
      roughnessMap: goldRoughMap,
      normalMap: goldNormalMap,
      metalness: 0.96,
      roughness: 0.22,
      color: 0xffd700,
    });
    const blackStoneMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.8,
      metalness: 0.1,
    });

    for (let i = 0; i < 48; i++) {
      const isGold = Math.random() > 0.45;
      const rock = new THREE.Mesh(
        rockGeo,
        isGold ? goldNuggetMat : blackStoneMat
      );
      const rx = (Math.random() - 0.5) * 18 - 2;
      const rz = -Math.random() * 14 - 2;
      const s = Math.random() * 0.8 + 0.4;
      rock.scale.set(s, s * 0.6, s);
      rock.position.set(rx, -0.34, rz);
      rock.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      beachGroup.add(rock);
    }

    // Load Coastal Mountains GLB
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
    );
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load("/assets/models/why-us-coast.glb", (gltf) => {
      const coastModel = gltf.scene;
      coastModel.scale.set(18, 14, 18);
      coastModel.position.set(4, -0.8, -20);
      coastModel.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          m.material = new THREE.MeshStandardMaterial({
            color: 0x5a6369,
            roughness: 0.9,
            metalness: 0.1,
          });
        }
      });
      beachGroup.add(coastModel);
    });

    // Ground Contact Shadow on Sand (For Footer Smooth Landing)
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const gradient = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.8)");
      gradient.addColorStop(0.4, "rgba(0, 0, 0, 0.4)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx.fillStyle = gradient;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(1.2, 1.2);
    shadowGeo.rotateX(-Math.PI / 2);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, contactShadowMat);
    contactShadow.position.set(0, -0.38, 0);
    beachGroup.add(contactShadow);

    // --- 4. Central 3D Dokmeh Arrow Emblem ---
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);
    emblemGroup.position.set(0, 0.4, 0);

    // Hammered Gold Material (From Dokmeh Metal048A asset)
    const goldMaterial = new THREE.MeshStandardMaterial({
      map: goldColorMap,
      roughnessMap: goldRoughMap,
      normalMap: goldNormalMap,
      roughness: 0.22,
      metalness: 0.96,
      color: 0xf5cf4d,
      side: THREE.DoubleSide,
    });

    gltfLoader.load(
      "/assets/models/dokmeh-obj.glb",
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = goldMaterial;
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const targetScale = 2.1 / maxDim;
        model.scale.setScalar(targetScale);

        emblemGroup.add(model);
      },
      undefined,
      (err) => {
        console.warn("Using procedural 3D arrows fallback:", err);
        const shape = new THREE.Shape();
        shape.moveTo(-0.8, -1.0);
        shape.lineTo(0.4, 0.0);
        shape.lineTo(-0.8, 1.0);
        shape.lineTo(-0.3, 1.0);
        shape.lineTo(0.9, 0.0);
        shape.lineTo(-0.3, -1.0);
        shape.closePath();

        const geo = new THREE.ExtrudeGeometry(shape, {
          depth: 0.35,
          bevelEnabled: true,
          bevelThickness: 0.08,
          bevelSize: 0.08,
          bevelSegments: 5,
        });
        geo.center();
        geo.scale(0.75, 0.75, 0.75);

        const mesh1 = new THREE.Mesh(geo, goldMaterial);
        mesh1.position.set(-0.35, 0, 0);
        const mesh2 = new THREE.Mesh(geo.clone(), goldMaterial);
        mesh2.position.set(0.35, 0, -0.2);

        emblemGroup.add(mesh1);
        emblemGroup.add(mesh2);
      }
    );

    // --- 5. Starlight Bioluminescent Embers Particle Field ---
    const emberCount = 280;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberSpeeds = new Float32Array(emberCount);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 16;
      emberPositions[i * 3 + 1] = Math.random() * 8 - 1;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      emberSpeeds[i] = Math.random() * 0.015 + 0.005;
    }
    emberGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(emberPositions, 3)
    );

    const emberMat = new THREE.PointsMaterial({
      color: 0xf7c02f,
      size: 0.08,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const emberPoints = new THREE.Points(emberGeo, emberMat);
    scene.add(emberPoints);

    // --- 6. Lights ---
    const hemiLight = new THREE.HemisphereLight("#dce6ec", "#55524c", 2.2);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight("#fff3dc", 2.4);
    sunLight.position.set(-6, 8, 3);
    scene.add(sunLight);

    const warmBounce = new THREE.PointLight("#ffd58a", 2.5, 12);
    warmBounce.position.set(2, 1, 3);
    scene.add(warmBounce);

    // --- Temporary Variables for Zero-GC RAF Calculations ---
    const _colorA = new THREE.Color();
    const _colorB = new THREE.Color();
    const _lookAt = new THREE.Vector3();

    // Keyframe Interpolator for Smooth Universe Progression
    const interpolateKeyframe = (progress: number) => {
      const p = Math.max(0, Math.min(1, progress));
      let idx = 0;
      for (let i = 0; i < KEYFRAMES.length - 1; i++) {
        if (p >= KEYFRAMES[i].p && p <= KEYFRAMES[i + 1].p) {
          idx = i;
          break;
        }
      }
      const k0 = KEYFRAMES[idx];
      const k1 = KEYFRAMES[idx + 1] || k0;
      const range = k1.p - k0.p;
      const t = range > 0.0001 ? (p - k0.p) / range : 0;

      // Camera Position
      const camX = THREE.MathUtils.lerp(k0.camPos[0], k1.camPos[0], t);
      const camY = THREE.MathUtils.lerp(k0.camPos[1], k1.camPos[1], t);
      const camZ = THREE.MathUtils.lerp(k0.camPos[2], k1.camPos[2], t);

      // Camera LookAt
      const lookX = THREE.MathUtils.lerp(k0.camLookAt[0], k1.camLookAt[0], t);
      const lookY = THREE.MathUtils.lerp(k0.camLookAt[1], k1.camLookAt[1], t);
      const lookZ = THREE.MathUtils.lerp(k0.camLookAt[2], k1.camLookAt[2], t);

      // Emblem Position & Scale
      const embX = THREE.MathUtils.lerp(k0.emblemPos[0], k1.emblemPos[0], t);
      const embY = THREE.MathUtils.lerp(k0.emblemPos[1], k1.emblemPos[1], t);
      const embZ = THREE.MathUtils.lerp(k0.emblemPos[2], k1.emblemPos[2], t);
      const embScale = THREE.MathUtils.lerp(k0.emblemScale, k1.emblemScale, t);
      const embRotY = THREE.MathUtils.lerp(
        k0.emblemRotYOffset,
        k1.emblemRotYOffset,
        t
      );

      // Sky Shader Colors
      _colorA.set(k0.skyTop);
      _colorB.set(k1.skyTop);
      _colorA.lerp(_colorB, t);
      skyMat.uniforms.uTop.value.copy(_colorA);

      _colorA.set(k0.skyBottom);
      _colorB.set(k1.skyBottom);
      _colorA.lerp(_colorB, t);
      skyMat.uniforms.uBottom.value.copy(_colorA);

      // Fog Color & Density
      _colorA.set(k0.fogColor);
      _colorB.set(k1.fogColor);
      _colorA.lerp(_colorB, t);
      fog.color.copy(_colorA);
      fog.density = THREE.MathUtils.lerp(k0.fogDensity, k1.fogDensity, t);

      // Sun Light
      _colorA.set(k0.sunColor);
      _colorB.set(k1.sunColor);
      _colorA.lerp(_colorB, t);
      sunLight.color.copy(_colorA);
      sunLight.intensity = THREE.MathUtils.lerp(
        k0.sunIntensity,
        k1.sunIntensity,
        t
      );
      sunLight.position.set(
        THREE.MathUtils.lerp(k0.sunPos[0], k1.sunPos[0], t),
        THREE.MathUtils.lerp(k0.sunPos[1], k1.sunPos[1], t),
        THREE.MathUtils.lerp(k0.sunPos[2], k1.sunPos[2], t)
      );

      // Warm Bounce
      _colorA.set(k0.warmBounceColor);
      _colorB.set(k1.warmBounceColor);
      _colorA.lerp(_colorB, t);
      warmBounce.color.copy(_colorA);
      warmBounce.intensity = THREE.MathUtils.lerp(
        k0.warmBounceIntensity,
        k1.warmBounceIntensity,
        t
      );

      // Embers Opacity
      emberMat.opacity = THREE.MathUtils.lerp(
        k0.embersOpacity,
        k1.embersOpacity,
        t
      );

      return {
        camX,
        camY,
        camZ,
        lookX,
        lookY,
        lookZ,
        embX,
        embY,
        embZ,
        embScale,
        embRotY,
      };
    };

    // --- Interactive Mouse Dragging & Steering Controller ---
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let currentDragX = 0;
    let currentDragY = 0;
    let targetDragX = 0;
    let targetDragY = 0;
    let spinVelocity = 0;

    const onPointerDown = (e: PointerEvent) => {
      // Allow normal clicking on buttons and links
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, textarea")) return;

      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;

      window.dispatchEvent(
        new CustomEvent("dokmeh-cursor", {
          detail: { text: "GRABBING", active: true },
        })
      );
    };

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;

      if (isDragging) {
        const deltaX = ((e.clientX - dragStartX) / window.innerWidth) * 5.5;
        const deltaY = -((e.clientY - dragStartY) / window.innerHeight) * 3.8;
        targetDragX += deltaX;
        targetDragY += deltaY;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      }

      const x = (e.clientX / window.innerWidth) * 256;
      const y = (e.clientY / window.innerHeight) * 256;
      if (ripples.length < 20) {
        ripples.push({ x, y, radius: 4, alpha: 1.0 });
      }
    };

    const onPointerUp = () => {
      if (isDragging) {
        isDragging = false;
        window.dispatchEvent(
          new CustomEvent("dokmeh-cursor", {
            detail: { text: "", active: false },
          })
        );
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Custom Artifact Action listener (Spin, Launch, Ground from UI)
    const onArtifactAction = (e: Event) => {
      const customEvent = e as CustomEvent<DokmehArtifactActionDetail>;
      const action = customEvent.detail?.action;
      if (action === "spin") {
        spinVelocity = 8.0;
      } else if (action === "launch") {
        targetDragY += 2.5;
        spinVelocity = 4.0;
      } else if (action === "ground") {
        targetDragX = 0;
        targetDragY = 0;
      }
    };
    window.addEventListener("dokmeh-artifact-action", onArtifactAction);

    // --- Mouse & Ripple Interaction ---
    const ripples: { x: number; y: number; radius: number; alpha: number }[] =
      [];
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let currentScrollProgress = 0;
    let targetScrollProgress = 0;

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress = docHeight > 0 ? scrollY / docHeight : 0;
    };
    window.addEventListener("scroll", onScroll);

    const onDokmehScroll = (e: Event) => {
      const customEvent = e as CustomEvent<DokmehScrollDetail>;
      if (customEvent.detail?.progress !== undefined) {
        targetScrollProgress = customEvent.detail.progress;
      }
    };
    window.addEventListener("dokmeh-scroll", onDokmehScroll);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      rippleMaterial.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };
    window.addEventListener("resize", onResize);

    // --- Animation Loop (Silky 60fps) ---
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      globalTimeUniform.value = elapsedTime;

      // 1. Bioluminescent Embers Gentle Upward Drift
      if (emberMat.opacity > 0.01) {
        const positions = emberGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < emberCount; i++) {
          positions[i * 3 + 1] += emberSpeeds[i];
          positions[i * 3] += Math.sin(elapsedTime * 0.5 + i) * 0.003;
          if (positions[i * 3 + 1] > 7.0) {
            positions[i * 3 + 1] = -1.0;
          }
        }
        emberGeo.attributes.position.needsUpdate = true;
      }

      // 2. Ripple Displacement Update (Only active during hero / interaction)
      if (rippleCtx && ripples.length > 0) {
        rippleCtx.fillStyle = "rgba(0, 0, 0, 0.08)";
        rippleCtx.fillRect(0, 0, 256, 256);

        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += 2.2;
          r.alpha *= 0.94;

          rippleCtx.beginPath();
          rippleCtx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          rippleCtx.strokeStyle = `rgba(255, 255, 255, ${r.alpha})`;
          rippleCtx.lineWidth = 3;
          rippleCtx.stroke();

          if (r.alpha < 0.02 || r.radius > 90) {
            ripples.splice(i, 1);
          }
        }
        displacementTexture.needsUpdate = true;
      }

      // 3. Smooth Mouse & Scroll Damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      currentScrollProgress +=
        (targetScrollProgress - currentScrollProgress) * 0.075;

      const p = currentScrollProgress;

      // Hero video plane fades out smoothly during stage 1 -> stage 2
      const heroFade = Math.max(0, 1 - p * 5.0);
      rippleMaterial.uniforms.uOpacity.value = heroFade;

      // 4. Sea Beach Golden Color Spread Calculation ("sea beach a gradually charay jabe")
      // As emblem swoops to beach shoreline around p = 0.35 - 0.58, golden color expands outward
      if (p >= 0.34 && p <= 0.62) {
        const spreadT = (p - 0.34) / 0.24;
        goldSpreadRadiusUniform.value = THREE.MathUtils.lerp(0.0, 28.0, spreadT);
        goldSpreadIntensityUniform.value = Math.sin(spreadT * Math.PI) * 1.5 + (spreadT > 0.4 ? 0.6 : 0.0);
        shockwaveMesh.scale.setScalar(Math.max(0.001, goldSpreadRadiusUniform.value * 0.7));
        shockwaveMesh.visible = goldSpreadIntensityUniform.value > 0.02;
      } else {
        goldSpreadIntensityUniform.value *= 0.92;
        shockwaveMesh.visible = goldSpreadIntensityUniform.value > 0.02;
      }

      // 5. Interpolate Full 3D Universe Keyframes
      const interp = interpolateKeyframe(p);

      // Camera Positioning with Mouse Parallax
      camera.position.x = interp.camX + mouseX * 0.22;
      camera.position.y = interp.camY + mouseY * 0.14;
      camera.position.z = interp.camZ;

      _lookAt.set(interp.lookX, interp.lookY, interp.lookZ);
      camera.lookAt(_lookAt);

      // 6. Interactive Drag & Free Movement Physics
      if (!isDragging) {
        if (p < 0.85) {
          // Outside footer: return to scroll path
          targetDragX *= 0.93;
          targetDragY *= 0.93;
        } else {
          // In footer: smooth ground settling damping
          targetDragY = Math.max(targetDragY * 0.95, -0.05);
        }
      }
      currentDragX += (targetDragX - currentDragX) * 0.12;
      currentDragY += (targetDragY - currentDragY) * 0.12;

      // Spin velocity decay
      spinVelocity *= 0.94;

      // Float wobble
      const floatY = Math.sin(elapsedTime * 1.4) * (p >= 0.92 ? 0.015 : 0.04);
      const floatRot = Math.cos(elapsedTime * 1.2) * 0.03;

      // Smooth Ground Contact Shadow (Touches down firmly in footer)
      if (p >= 0.84) {
        const groundT = Math.min(1, (p - 0.84) / 0.12);
        contactShadowMat.opacity = groundT * 0.75;
        contactShadow.position.x = interp.embX + currentDragX;
        contactShadow.position.z = interp.embZ;
      } else {
        contactShadowMat.opacity *= 0.9;
      }

      // Central Golden Arrow Emblem Continuous Transformation + User Drag
      emblemGroup.position.x = interp.embX + currentDragX + mouseX * 0.25;
      emblemGroup.position.y = interp.embY + currentDragY + floatY + mouseY * 0.18;
      emblemGroup.position.z = interp.embZ;

      // Tilting in direction of drag
      const dragTiltZ = THREE.MathUtils.clamp(-currentDragX * 0.25, -0.6, 0.6);
      const dragTiltX = THREE.MathUtils.clamp(currentDragY * 0.25, -0.5, 0.5);

      emblemGroup.rotation.y =
        elapsedTime * 0.25 + interp.embRotY + spinVelocity + mouseX * 0.35 + currentDragX * 0.3;
      emblemGroup.rotation.x = floatRot + dragTiltX + mouseY * 0.2;
      emblemGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.02 + dragTiltZ;

      emblemGroup.scale.setScalar(interp.embScale);

      // 7. Dual-Pass High-Performance Render
      renderer.autoClear = false;
      renderer.clear();
      if (heroFade > 0.001) {
        renderer.render(bgScene, bgCamera);
      }
      renderer.render(scene, camera);

      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("dokmeh-artifact-action", onArtifactAction);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("dokmeh-scroll", onDokmehScroll);

      video.pause();
      video.src = "";
      videoTexture.dispose();
      displacementTexture.dispose();
      rippleMaterial.dispose();
      goldMaterial.dispose();
      emberMat.dispose();
      emberGeo.dispose();
      shockwaveGeo.dispose();
      shockwaveMat.dispose();
      shadowGeo.dispose();
      contactShadowMat.dispose();
      shadowTex.dispose();
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
