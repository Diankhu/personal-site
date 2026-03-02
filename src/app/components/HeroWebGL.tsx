"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type PetalState = {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  rot: THREE.Euler;
  rotVel: THREE.Vector3;
  scale: number;
  seed: number;
  active: boolean;
  respawnIn: number;
};

function rand(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function WindyBackground({
  windRef,
}: {
  windRef: React.MutableRefObject<number>;
}) {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);

  const material = useMemo(() => {
    const uniforms = {
      uTime: { value: 0 },
      uStrength: { value: 0.9 },
      uColorTop: { value: new THREE.Color("#e9f8ff") },
      uColorBottom: { value: new THREE.Color("#86cdfc") },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;

      varying vec2 vUv;
      uniform float uTime;
      uniform float uStrength;
      uniform vec3 uColorTop;
      uniform vec3 uColorBottom;

      float hash(vec2 p){
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a, b, u.x) + (c - a)*u.y*(1.0-u.x) + (d - b)*u.x*u.y;
      }

      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        for(int i = 0; i < 5; i++){
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec3 col = mix(uColorBottom, uColorTop, vUv.y);

        float t = uTime;
        vec2 p = vUv;

        vec2 flow = vec2(0.35, 0.18) * t;

        float n1 = fbm(p * vec2(2.8, 4.2) + flow);
        float n2 = fbm(p * vec2(7.0, 10.0) - flow * 1.35);

        float haze = (n1 * 0.58 + n2 * 0.42);

        float streak = smoothstep(0.38, 0.98, haze + (p.x * 0.30));
        float streak2 = smoothstep(0.50, 0.995, haze + (p.x * 0.62));

        float strength = uStrength;

        float mist = (haze - 0.5) * (0.28 + 0.45 * strength);
        float bright = (streak * 0.16 + streak2 * 0.10) * (0.45 + strength);

        col += vec3(mist) + vec3(bright);

        float g = hash(p * (350.0 + 30.0 * sin(t))) - 0.5;
        col += vec3(g * 0.02);

        float dx = vUv.x - 0.5;
        float dy = vUv.y - 0.5;
        float vig = smoothstep(0.95, 0.25, sqrt(dx*dx + dy*dy));
        col = mix(col * 0.92, col, vig);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: false,
    });
  }, []);

  useFrame((_, delta) => {
    if (!matRef.current) return;

    const u = matRef.current.uniforms as {
      uTime: { value: number };
      uStrength: { value: number };
    };

    u.uTime.value += Math.min(0.05, delta);

    const t = u.uTime.value;
    const gust = 0.25 * Math.sin(t * 0.6) + 0.18 * Math.sin(t * 1.35 + 1.2);
    const strength = 0.85 + gust;
    u.uStrength.value = strength;

    windRef.current = strength;
  });

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[20, 20]} />
      <primitive object={material} ref={matRef} attach="material" />
    </mesh>
  );
}

function makePetalTextureVariant(variant: 0 | 1 | 2): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.translate(size / 2, size / 2);

  const topY = -92 + variant * 3;
  const bottomY = 112 - variant * 4;

  const rightA = 76 + variant * 6;
  const rightB = 96 - variant * 4;
  const leftA = -92 + variant * 2;
  const leftB = -70 - variant * 6;

  const tipX = variant === 1 ? 6 : variant === 2 ? -7 : 0;

  ctx.beginPath();
  ctx.moveTo(tipX, topY);

  ctx.bezierCurveTo(
    rightA,
    lerp(topY, 0, 0.3),
    rightB,
    lerp(topY, 0, 0.72),
    12,
    bottomY,
  );

  ctx.bezierCurveTo(
    leftA,
    lerp(topY, 0, 0.78),
    leftB,
    lerp(topY, 0, 0.22),
    tipX,
    topY,
  );

  ctx.closePath();

  const base = ctx.createRadialGradient(-28, -50, 8, 0, 10, 200);
  base.addColorStop(0.0, "rgba(255,248,252,0.98)");
  base.addColorStop(0.25, "rgba(255,214,235,0.96)");
  base.addColorStop(0.55, "rgba(255,160,205,0.86)");
  base.addColorStop(1.0, "rgba(255,150,200,0.00)");

  ctx.fillStyle = base;
  ctx.fill();

  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.28;
  const edge = ctx.createRadialGradient(0, 55, 55, 0, 55, 185);
  edge.addColorStop(0.0, "rgba(255,160,205,0.0)");
  edge.addColorStop(0.72, "rgba(255,120,185,0.14)");
  edge.addColorStop(1.0, "rgba(255,80,165,0.34)");
  ctx.fillStyle = edge;
  ctx.fillRect(-size / 2, -size / 2, size, size);

  ctx.globalCompositeOperation = "source-atop";
  ctx.lineCap = "round";

  const veinAlpha = variant === 2 ? 0.22 : 0.18;
  const veinCount = variant === 0 ? 5 : variant === 1 ? 6 : 7;

  for (let i = 0; i < veinCount; i++) {
    const t = i / (veinCount - 1);
    const x0 = lerp(-52, 52, t) + (variant === 1 ? 4 : 0);
    const w = lerp(1.2, 2.6, 1 - Math.abs(t - 0.5) * 2);

    ctx.globalAlpha = veinAlpha * (0.35 + 0.65 * (1 - Math.abs(t - 0.5) * 2));
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = w;

    ctx.beginPath();
    ctx.moveTo(x0 * 0.2, topY + 18);
    ctx.quadraticCurveTo(x0 * 0.35, 0, x0 * 0.12, bottomY - 10);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.22;
  const sheen = ctx.createRadialGradient(-45, -60, 18, -10, -10, 155);
  sheen.addColorStop(0, "rgba(255,255,255,0.75)");
  sheen.addColorStop(1, "rgba(255,255,255,0.0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(-size / 2, -size / 2, size, size);

  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.14;
  for (let y = -size / 2; y < size / 2; y += 2) {
    for (let x = -size / 2; x < size / 2; x += 2) {
      const n = Math.sin((x * 12.9898 + y * 78.233) * 0.02) * 43758.5453;
      const f = n - Math.floor(n);
      if (f > 0.92) {
        ctx.fillStyle = `rgba(255,255,255,${(f - 0.92) * 0.6})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearMipMapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

function makePetals(count: number, initialBurst: boolean): PetalState[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = i * 13.37 + 0.123;

    const active = initialBurst ? rand(seed + 100) > 0.18 : false;
    const y = initialBurst ? rand(seed + 2) * 10 - 2 : 6 + rand(seed + 2) * 4;

    return {
      pos: new THREE.Vector3(
        (rand(seed + 1) - 0.5) * 12,
        y,
        (rand(seed + 3) - 0.5) * 2,
      ),
      vel: new THREE.Vector3(
        (rand(seed + 4) - 0.5) * 0.18,
        -0.35 - rand(seed + 5) * 0.55,
        (rand(seed + 6) - 0.5) * 0.12,
      ),
      rot: new THREE.Euler(
        rand(seed + 8) * Math.PI,
        rand(seed + 9) * Math.PI,
        rand(seed + 10) * Math.PI,
      ),
      rotVel: new THREE.Vector3(
        (rand(seed + 11) - 0.5) * 2.0,
        (rand(seed + 12) - 0.5) * 2.0,
        (rand(seed + 13) - 0.5) * 2.0,
      ),
      scale: 0.06 + rand(seed + 7) * 0.1,
      seed,
      active,
      respawnIn: active ? 0 : 0.2 + rand(seed + 200) * 2.0,
    };
  });
}

function makeCurvedPetalGeometry(): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(1, 1, 16, 16);
  const pos = geo.getAttribute("position") as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);

    const cup = x * x * 0.28;
    const curl = (y + 0.5) * 0.1;

    const taper = 1.0 - Math.max(0, y) * 0.25;
    pos.setX(i, x * taper);

    pos.setZ(i, cup + curl);
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

function PetalLayer({
  count,
  windRef,
  variant,
}: {
  count: number;
  windRef: React.MutableRefObject<number>;
  variant: 0 | 1 | 2;
}) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);

  const petalsRef = useRef<PetalState[]>(makePetals(count, true));
  const dummyRef = useRef<THREE.Object3D>(new THREE.Object3D());
  const baseColorRef = useRef<THREE.Color>(new THREE.Color("#ffd1e6"));
  const texRef = useRef<THREE.CanvasTexture | null>(null);

  const curvedGeo = useMemo(() => makeCurvedPetalGeometry(), []);

  React.useEffect(() => {
    return () => {
      curvedGeo.dispose();
    };
  }, [curvedGeo]);

  React.useEffect(() => {
    texRef.current = makePetalTextureVariant(variant);
    return () => {
      texRef.current?.dispose();
      texRef.current = null;
    };
  }, [variant]);

  React.useEffect(() => {
    petalsRef.current = makePetals(count, true);
  }, [count]);

  useFrame((_, delta) => {
    const m = meshRef.current;
    if (!m) return;

    const petals = petalsRef.current;
    const dummy = dummyRef.current;

    const dt = Math.min(0.033, delta);
    const now = performance.now() * 0.001;

    const wind = windRef.current;
    const windX = 0.22 * wind;
    const windY = 0.01 * wind;

    const bottomY = -7.0;
    const leftX = -10.5;
    const rightX = 10.5;

    const mat = m.material;

    if (
      (mat instanceof THREE.MeshStandardMaterial ||
        mat instanceof THREE.MeshPhysicalMaterial) &&
      texRef.current &&
      mat.map !== texRef.current
    ) {
      mat.map = texRef.current;
      mat.alphaMap = texRef.current;
      mat.transparent = true;
      mat.depthWrite = false;
      mat.needsUpdate = true;
    }

    const baseTrickle = variant === 0 ? 0.55 : variant === 1 ? 0.45 : 0.35;

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];

      if (!p.active) {
        p.respawnIn -= dt;
        if (p.respawnIn <= 0) {
          p.active = true;

          p.pos.set(
            (rand(p.seed + now) - 0.5) * 12,
            6.5 + rand(p.seed + 99) * 4,
            (rand(p.seed + 3) - 0.5) * 2,
          );

          const speedMul = variant === 0 ? 1.0 : variant === 1 ? 0.85 : 0.7;

          p.vel.set(
            (rand(p.seed + 4) - 0.5) * 0.16,
            (-0.32 - rand(p.seed + 5) * 0.5) * speedMul,
            (rand(p.seed + 6) - 0.5) * 0.1,
          );

          const s = 0.06 + rand(p.seed + 7) * 0.1;
          p.scale = s * (variant === 0 ? 1.05 : variant === 1 ? 0.92 : 0.8);
        }

        dummy.position.set(0, -999, 0);
        dummy.updateMatrix();
        m.setMatrixAt(i, dummy.matrix);
        continue;
      }

      const flutter = Math.sin(now * 2.2 + p.seed) * 0.18;

      p.vel.x += (windX + flutter) * dt * 0.28;
      p.vel.y += windY * dt * 0.08;

      p.vel.multiplyScalar(0.995);
      p.pos.addScaledVector(p.vel, dt);

      p.rot.x += p.rotVel.x * dt;
      p.rot.y += p.rotVel.y * dt;
      p.rot.z += (p.rotVel.z + flutter * 0.6) * dt;

      if (p.pos.y < bottomY || p.pos.x < leftX || p.pos.x > rightX) {
        p.active = false;
        p.respawnIn = baseTrickle + rand(p.seed + now * 3.0) * 2.0;
      }

      dummy.position.copy(p.pos);
      dummy.rotation.copy(p.rot);

      const squish = 0.72 + 0.28 * Math.sin(now * 1.6 + p.seed);
      dummy.scale.set(p.scale * 1.25, p.scale * squish, p.scale);

      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }

    m.instanceMatrix.needsUpdate = true;

    if (
      mat instanceof THREE.MeshStandardMaterial ||
      mat instanceof THREE.MeshPhysicalMaterial
    ) {
      const pulse = 0.02 * Math.sin(now * 0.9);
      mat.color.copy(baseColorRef.current).offsetHSL(0, 0, pulse);

      mat.emissive = new THREE.Color("#ffb6d6");
      mat.emissiveIntensity = 0.05;

      mat.roughness = 0.88;
      mat.metalness = 0.0;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[curvedGeo, undefined, count]}>
      <meshPhysicalMaterial
        color={"#ffd1e6"}
        transparent
        opacity={0.95}
        roughness={0.85}
        metalness={0.0}
        depthWrite={false}
        side={THREE.DoubleSide}
        transmission={0.25}
        thickness={0.2}
        ior={1.1}
        emissive={"#ffb6d6"}
        emissiveIntensity={0.05}
      />
    </instancedMesh>
  );
}

function Petals({ windRef }: { windRef: React.MutableRefObject<number> }) {
  return (
    <>
      <PetalLayer windRef={windRef} variant={0} count={140} />
      <PetalLayer windRef={windRef} variant={1} count={140} />
      <PetalLayer windRef={windRef} variant={2} count={120} />
    </>
  );
}

export default function HeroWebGL() {
  const windRef = useRef<number>(0.9);

  return (
    <section style={{ height: "100vh", width: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 2]} intensity={0.6} />
        <WindyBackground windRef={windRef} />
        <Petals windRef={windRef} />
      </Canvas>
    </section>
  );
}
