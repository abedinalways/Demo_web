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

export default function Dokmeh3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const fogColor = new THREE.Color("#a8b4bb");
    scene.fog = new THREE.FogExp2(fogColor, 0.035);

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

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

    // Sky Hemisphere Dome
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

    // Sand Pebble Shoreline Plane
    const sandGeo = new THREE.PlaneGeometry(60, 60, 64, 64);
    sandGeo.rotateX(-Math.PI / 2);
    const sandMat = new THREE.MeshStandardMaterial({
      map: sandColorMap,
      roughness: 0.85,
      metalness: 0.1,
      color: 0x484848,
    });
    const sandMesh = new THREE.Mesh(sandGeo, sandMat);
    sandMesh.position.set(0, -0.4, -6);
    beachGroup.add(sandMesh);

    // Ocean Water Plane (Reflective & Wave Motion)
    const waterGeo = new THREE.PlaneGeometry(45, 45, 48, 48);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x243a44,
      roughness: 0.15,
      metalness: 0.82,
      transparent: true,
      opacity: 0.94,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.set(-11, -0.36, -6);
    waterMesh.rotation.y = 0.08;
    beachGroup.add(waterMesh);

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

    for (let i = 0; i < 50; i++) {
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
        const targetScale = 2.8 / maxDim;
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

        const mesh1 = new THREE.Mesh(geo, goldMaterial);
        mesh1.position.set(-0.35, 0, 0);
        const mesh2 = new THREE.Mesh(geo.clone(), goldMaterial);
        mesh2.position.set(0.35, 0, -0.2);

        emblemGroup.add(mesh1);
        emblemGroup.add(mesh2);
      }
    );

    // --- 5. Lights ---
    const hemiLight = new THREE.HemisphereLight("#dce6ec", "#55524c", 2.2);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight("#fff3dc", 2.4);
    sunLight.position.set(-6, 8, 3);
    scene.add(sunLight);

    const warmBounce = new THREE.PointLight("#ffd58a", 2.5, 10);
    warmBounce.position.set(2, 1, 3);
    scene.add(warmBounce);

    // --- Mouse & Ripple Interaction ---
    const ripples: { x: number; y: number; radius: number; alpha: number }[] =
      [];
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let currentScrollProgress = 0;
    let targetScrollProgress = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;

      const x = (e.clientX / window.innerWidth) * 256;
      const y = (e.clientY / window.innerHeight) * 256;
      if (ripples.length < 25) {
        ripples.push({ x, y, radius: 4, alpha: 1.0 });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

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

    // --- Animation Loop ---
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // 1. Water Wave Motion
      const posAttr = waterGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const u = posAttr.getX(i);
        const v = posAttr.getY(i);
        const z =
          Math.sin(u * 0.8 + elapsedTime * 1.8) * 0.05 +
          Math.cos(v * 0.6 + elapsedTime * 1.4) * 0.04;
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;

      // 2. Ripple Displacement Update
      if (rippleCtx) {
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

      // 3. Smooth Mouse & Scroll Lerping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      currentScrollProgress +=
        (targetScrollProgress - currentScrollProgress) * 0.08;

      const p = currentScrollProgress;

      // 4. Hero Section -> 3D Beach Continuous Camera Journey
      // When at scroll 0: Hero video is full opacity
      // As you scroll (0 -> 0.25): Hero video dissolves away, revealing the 3D beach world!
      const heroFade = Math.max(0, 1 - p * 4.0);
      rippleMaterial.uniforms.uOpacity.value = heroFade;

      // Continuous Camera Choreography across the scroll:
      // Stage 0 (Hero): camera (0, 0, 5.2)
      // Stage 1 (45+): camera (-0.8, -0.05, 4.8)
      // Stage 2 (350+): camera (0.8, 0.15, 4.3)
      // Stage 3 (15+): camera (-0.3, 0.25, 4.0)
      // Stage 4 (WHY US?): camera (0, 0.35, 3.5) -> Centers directly on the 3D emblem!
      let targetCamX = 0;
      let targetCamY = 0;
      let targetCamZ = 5.2;

      if (p <= 0.25) {
        const t = p / 0.25;
        targetCamX = THREE.MathUtils.lerp(0, -0.8, t);
        targetCamY = THREE.MathUtils.lerp(0, -0.05, t);
        targetCamZ = THREE.MathUtils.lerp(5.2, 4.8, t);
      } else if (p <= 0.5) {
        const t = (p - 0.25) / 0.25;
        targetCamX = THREE.MathUtils.lerp(-0.8, 0.8, t);
        targetCamY = THREE.MathUtils.lerp(-0.05, 0.15, t);
        targetCamZ = THREE.MathUtils.lerp(4.8, 4.3, t);
      } else if (p <= 0.75) {
        const t = (p - 0.5) / 0.25;
        targetCamX = THREE.MathUtils.lerp(0.8, -0.3, t);
        targetCamY = THREE.MathUtils.lerp(0.15, 0.25, t);
        targetCamZ = THREE.MathUtils.lerp(4.3, 4.0, t);
      } else {
        const t = (p - 0.75) / 0.25;
        targetCamX = THREE.MathUtils.lerp(-0.3, 0.0, t);
        targetCamY = THREE.MathUtils.lerp(0.25, 0.35, t);
        targetCamZ = THREE.MathUtils.lerp(4.0, 3.5, t);
      }

      camera.position.x = targetCamX + mouseX * 0.25;
      camera.position.y = targetCamY + mouseY * 0.15;
      camera.position.z = targetCamZ;
      camera.lookAt(0, targetCamY * 0.5, 0);

      // Central Golden Arrow Emblem Continuous Transformation
      const floatY = Math.sin(elapsedTime * 1.4) * 0.05;
      const floatRot = Math.cos(elapsedTime * 1.2) * 0.03;

      // Emblem moves in sync with the scroll
      let targetEmblemX = 0;
      let targetEmblemY = 0.4;
      let targetEmblemScale = 1.0;
      const targetEmblemRotY = p * Math.PI * 1.5;

      if (p <= 0.25) {
        const t = p / 0.25;
        targetEmblemX = THREE.MathUtils.lerp(0, 0.4, t);
        targetEmblemY = THREE.MathUtils.lerp(0.4, 0.25, t);
        targetEmblemScale = THREE.MathUtils.lerp(1.0, 0.95, t);
      } else if (p <= 0.5) {
        const t = (p - 0.25) / 0.25;
        targetEmblemX = THREE.MathUtils.lerp(0.4, -0.4, t);
        targetEmblemY = THREE.MathUtils.lerp(0.25, 0.3, t);
        targetEmblemScale = THREE.MathUtils.lerp(0.95, 1.05, t);
      } else if (p <= 0.75) {
        const t = (p - 0.5) / 0.25;
        targetEmblemX = THREE.MathUtils.lerp(-0.4, 0.2, t);
        targetEmblemY = THREE.MathUtils.lerp(0.3, 0.35, t);
        targetEmblemScale = THREE.MathUtils.lerp(1.05, 1.1, t);
      } else {
        const t = (p - 0.75) / 0.25;
        targetEmblemX = THREE.MathUtils.lerp(0.2, 0.0, t); // EXACT CENTER for "WHY US?"
        targetEmblemY = THREE.MathUtils.lerp(0.35, 0.35, t);
        targetEmblemScale = THREE.MathUtils.lerp(1.1, 1.22, t);
      }

      emblemGroup.position.x = targetEmblemX + mouseX * 0.3;
      emblemGroup.position.y = targetEmblemY + floatY + mouseY * 0.2;
      emblemGroup.position.z = 0;

      emblemGroup.rotation.y =
        elapsedTime * 0.25 + targetEmblemRotY + mouseX * 0.35;
      emblemGroup.rotation.x = floatRot + mouseY * 0.2;
      emblemGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.02;

      emblemGroup.scale.setScalar(targetEmblemScale);

      // 5. Render
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
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("dokmeh-scroll", onDokmehScroll);

      video.pause();
      video.src = "";
      videoTexture.dispose();
      displacementTexture.dispose();
      rippleMaterial.dispose();
      goldMaterial.dispose();
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
