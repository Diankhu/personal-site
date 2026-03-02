"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x));
}

function WindyBackground() {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);

  const material = useMemo(() => {
    const uniforms = {
      uTime: { value: 0 },
      uStrength: { value: 0.35 }, // wind intensity (we’ll later drive this with scroll)
      uColorTop: { value: new THREE.Color("#d9f1ff") },
      uColorBottom: { value: new THREE.Color("#a8ddff") },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Simple fake “wind” using layered sin waves (fast + looks good)
    const fragmentShader = `
      precision highp float;

      varying vec2 vUv;
      uniform float uTime;
      uniform float uStrength;
      uniform vec3 uColorTop;
      uniform vec3 uColorBottom;

      float wave(vec2 p, float t) {
        float w1 = sin((p.y * 6.0 + t * 0.9) + sin(p.x * 3.0 + t * 0.7));
        float w2 = sin((p.y * 10.0 - t * 1.3) + cos(p.x * 4.0 - t * 0.9));
        return (w1 * 0.6 + w2 * 0.4);
      }

      void main() {
        // base vertical gradient
        vec3 col = mix(uColorBottom, uColorTop, vUv.y);

        // subtle moving haze bands
        float t = uTime;
        vec2 p = vUv;

        float w = wave(p, t);
        float haze = smoothstep(0.15, 0.85, vUv.y) * (0.08 + 0.10 * uStrength);
        float band = w * haze;

        // add soft highlights that drift sideways
        float highlight = 0.5 + 0.5 * sin((p.x * 2.0 + t * 0.35) + band * 2.0);
        highlight = pow(highlight, 2.0) * 0.06 * (0.6 + uStrength);

        col += vec3(band * 0.25) + vec3(highlight);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: false,
    });

    return mat;
  }, []);

  useFrame((_, delta) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms as {
      uTime: { value: number };
      uStrength: { value: number };
    };

    // stable time step
    u.uTime.value += Math.min(0.05, delta);
    u.uStrength.value = clamp01(u.uStrength.value);
  });

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[20, 20]} />
      <primitive object={material} ref={matRef} attach="material" />
    </mesh>
  );
}

export default function HeroWebGL() {
  return (
    <section style={{ height: "100vh", width: "100%", position: "relative" }}>
      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          pointerEvents: "auto",
          padding: 24,
          textAlign: "center",
        }}
      >
        <h1
          style={{ margin: 0, fontSize: 64, fontWeight: 800, color: "#0a1622" }}
        >
          Tyler W
        </h1>
        <p
          style={{ marginTop: 14, color: "rgba(10,22,34,0.72)", maxWidth: 720 }}
        >
          Full-stack engineer building clean UIs and production systems.
        </p>

        <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
          <button style={btnPrimary}>View Projects</button>
          <button style={btnSecondary}>Contact</button>
        </div>
      </div>

      {/* WebGL Background */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
      >
        <WindyBackground />
      </Canvas>
    </section>
  );
}

const btnPrimary: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.08)",
  background: "rgba(255,255,255,0.55)",
  cursor: "pointer",
};

const btnSecondary: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.08)",
  background: "rgba(255,255,255,0.35)",
  cursor: "pointer",
};
