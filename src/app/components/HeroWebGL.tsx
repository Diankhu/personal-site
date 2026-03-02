"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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

        // film grain
        float g = hash(p * (350.0 + 30.0 * sin(t))) - 0.5;
        col += vec3(g * 0.02);

        // subtle sun glow
        vec2 sunPos = vec2(0.78, 0.82);
        float d = distance(vUv, sunPos);
        float sun = smoothstep(0.35, 0.0, d);
        col += vec3(0.10, 0.12, 0.08) * sun;

        // vignette
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

function PetalAtlasLayer({
  count,
  windRef,
  tilesUsed,
  gridSize,
}: {
  count: number;
  windRef: React.MutableRefObject<number>;
  tilesUsed: number; // you have 9
  gridSize: number; // 4 (4x4 atlas)
}) {
  const { camera } = useThree();

  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const petalsRef = useRef<PetalState[]>(makePetals(count, true));
  const dummyRef = useRef<THREE.Object3D>(new THREE.Object3D());

  const curvedGeo = useMemo(() => makeCurvedPetalGeometry(), []);

  // Per-instance tile selection (0..tilesUsed-1)
  const tileAttr = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.floor(rand(i * 91.7 + 0.17) * tilesUsed);
    }
    return new THREE.InstancedBufferAttribute(arr, 1);
  }, [count, tilesUsed]);

  const material = useMemo(() => {
    const tex = new THREE.TextureLoader().load("/petals/petals_atlas.png");
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearMipMapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 8;
    tex.needsUpdate = true;

    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uMap: { value: tex },
        uGrid: { value: gridSize },
      },
      vertexShader: `
        attribute float aTile;
        varying vec2 vUv;

        uniform float uGrid;

        void main() {
          float tile = floor(aTile + 0.5);
          float gx = uGrid;
          float tx = mod(tile, gx);
          float tyImg = floor(tile / gx);
          float ty = (gx - 1.0) - tyImg; // <-- flip Y (image rows -> UV rows)

          vec2 cell = vec2(1.0 / gx, 1.0 / gx);

          // small inset to prevent edge bleeding
          float pad = 0.0025;
          vec2 uvInset = uv * (1.0 - 2.0 * pad) + pad;

          vUv = uvInset * cell + vec2(tx, ty) * cell;

          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uMap;
        varying vec2 vUv;

        void main() {
          vec4 c = texture2D(uMap, vUv);

          // kill empty atlas cells + soft edges
          if (c.a < 0.04) discard;

          // small boost so petals read on bright sky
          c.rgb = mix(c.rgb, c.rgb * 1.06, 0.6);

          gl_FragColor = c;
        }
      `,
    });
  }, [gridSize]);

  React.useEffect(() => {
    return () => {
      curvedGeo.dispose();
      material.uniforms.uMap.value.dispose();
      material.dispose();
    };
  }, [curvedGeo, material]);

  React.useEffect(() => {
    const m = meshRef.current;
    if (!m) return;
    const g = m.geometry as THREE.InstancedBufferGeometry;
    g.setAttribute("aTile", tileAttr);
  }, [tileAttr]);

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

    const baseTrickle = 0.45;

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

          p.vel.set(
            (rand(p.seed + 4) - 0.5) * 0.16,
            -0.32 - rand(p.seed + 5) * 0.5,
            (rand(p.seed + 6) - 0.5) * 0.1,
          );

          p.scale = 0.07 + rand(p.seed + 7) * 0.11;
        } else {
          dummy.position.set(0, -999, 0);
          dummy.updateMatrix();
          m.setMatrixAt(i, dummy.matrix);
          continue;
        }
      }

      const flutter = Math.sin(now * 2.2 + p.seed) * 0.18;

      p.vel.x += (windX + flutter) * dt * 0.28;
      p.vel.y += windY * dt * 0.08;

      p.vel.multiplyScalar(0.995);
      p.pos.addScaledVector(p.vel, dt);

      p.rot.z += (p.rotVel.z + flutter * 0.6) * dt;

      if (p.pos.y < bottomY || p.pos.x < leftX || p.pos.x > rightX) {
        p.active = false;
        p.respawnIn = baseTrickle + rand(p.seed + now * 3.0) * 2.0;
      }

      dummy.position.copy(p.pos);

      // billboard toward camera, keep Z spin
      dummy.quaternion.copy(camera.quaternion);
      dummy.rotation.z += p.rot.z;

      const squish = 0.72 + 0.28 * Math.sin(now * 1.6 + p.seed);
      dummy.scale.set(p.scale * 1.35, p.scale * squish * 1.05, p.scale);

      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }

    m.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[curvedGeo, material, count]} />;
}

function Petals({ windRef }: { windRef: React.MutableRefObject<number> }) {
  // You have 5 tiles used in a 4x4 atlas.
  return (
    <PetalAtlasLayer windRef={windRef} count={360} tilesUsed={5} gridSize={4} />
  );
}

export default function HeroWebGL() {
  const windRef = useRef<number>(0.9);

  return (
    <section style={{ height: "100vh", width: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
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
