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
    scene.fog = new THREE.FogExp2("#a8b4bb", 0.035);

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.5);

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
    sandColorMap.repeat.set(12, 12);

    const rgbeLoader = new RGBELoader();
    rgbeLoader.load("/assets/hdr/warm_reception_dinner_1k.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    // --- 3. Beach Universe (Coastal Mountains, Dark Sand & Ocean) ---
    const beachGroup = new THREE.Group();
    scene.add(beachGroup);
    beachGroup.position.set(0, -1.2, 0);

    // Sky Dome Gradient Background
    const skyGeo = new THREE.SphereGeometry(45, 32, 15);
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

    // Sand Pebble Terrain Plane
    const sandGeo = new THREE.PlaneGeometry(50, 50, 64, 64);
    sandGeo.rotateX(-Math.PI / 2);
    const sandMat = new THREE.MeshStandardMaterial({
      map: sandColorMap,
      roughness: 0.85,
      metalness: 0.1,
      color: 0x484848,
    });
    const sandMesh = new THREE.Mesh(sandGeo, sandMat);
    sandMesh.position.set(0, -0.4, -5);
    beachGroup.add(sandMesh);

    // Ocean Water Plane (Reflective & Wave Motion)
    const waterGeo = new THREE.PlaneGeometry(40, 40, 48, 48);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x243a44,
      roughness: 0.15,
      metalness: 0.8,
      transparent: true,
      opacity: 0.92,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.set(-10, -0.36, -5);
    waterMesh.rotation.y = 0.08;
    beachGroup.add(waterMesh);

    // Scattered Gold Nuggets & Coastal Rocks along Shoreline
    const rockGeo = new THREE.DodecahedronGeometry(0.12, 1);
    const goldNuggetMat = new THREE.MeshStandardMaterial({
      map: goldColorMap,
      roughnessMap: goldRoughMap,
      normalMap: goldNormalMap,
      metalness: 0.95,
      roughness: 0.25,
      color: 0xffd700,
    });
    const blackStoneMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.8,
      metalness: 0.1,
    });

    for (let i = 0; i < 45; i++) {
      const isGold = Math.random() > 0.45;
      const rock = new THREE.Mesh(
        rockGeo,
        isGold ? goldNuggetMat : blackStoneMat
      );
      const rx = (Math.random() - 0.5) * 16 - 2;
      const rz = -Math.random() * 12 - 2;
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

    // Load Coastal Mountain Cliffs GLB
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
    );
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load("/assets/models/why-us-coast.glb", (gltf) => {
      const coastModel = gltf.scene;
      coastModel.scale.set(16, 12, 16);
      coastModel.position.set(4, -0.8, -18);
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

    // Hammered Gold Material (From Dokmeh assets Metal048A)
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
    let scrollProgress = 0;

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

      // 1. Water Wave Vertex Motion
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

      // 3. Smooth Mouse Lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // 4. Hero vs Beach Universe Transition on Scroll
      // When at the very top (Hero), video ripple is visible
      // As you scroll down (Why Us Beach section), video fades completely and 3D beach camera takes over
      const heroFade = Math.max(0, 1 - scrollProgress * 3.2);
      rippleMaterial.uniforms.uOpacity.value = heroFade;

      // Camera transitions into the Beach landscape
      // As you scroll down towards "WHY US?", camera drops down and angles forward
      const beachActive = Math.min(scrollProgress * 2.5, 1);
      camera.position.y = THREE.MathUtils.lerp(0, 0.4, beachActive) + mouseY * 0.15;
      camera.position.x = mouseX * 0.3;
      camera.position.z = THREE.MathUtils.lerp(5.5, 4.4, beachActive);

      // Central Golden Arrow Emblem Transforms
      const floatY = Math.sin(elapsedTime * 1.4) * 0.06;
      const floatRot = Math.cos(elapsedTime * 1.2) * 0.04;

      // As user scrolls towards "WHY US?", emblem positions right in the center (matching the screenshot!)
      emblemGroup.position.x = mouseX * 0.3;
      emblemGroup.position.y = 0.3 + floatY + mouseY * 0.2;
      emblemGroup.position.z = THREE.MathUtils.lerp(0, 0.3, beachActive);

      // Emblem slowly orbits and catches the warm sunlight reflections
      emblemGroup.rotation.y = elapsedTime * 0.3 + mouseX * 0.4;
      emblemGroup.rotation.x = floatRot + mouseY * 0.25;
      emblemGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.03;

      const dynamicScale = THREE.MathUtils.lerp(1.0, 1.15, beachActive);
      emblemGroup.scale.setScalar(dynamicScale);

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
