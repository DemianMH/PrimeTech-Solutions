"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Points } from "three";

const COUNT = 2600;

function Swarm({ duration }: { duration: number }) {
  const ref = useRef<Points>(null);
  const start = useRef<number | null>(null);

  // Cada partícula viaja de una posición dispersa a la superficie de una esfera con anillo.
  const { from, to, positions } = useMemo(() => {
    const from = new Float32Array(COUNT * 3);
    const to = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 14 + Math.random() * 18;
      const a = Math.random() * Math.PI * 2;
      const b = Math.acos(2 * Math.random() - 1);
      from.set([r * Math.sin(b) * Math.cos(a), r * Math.sin(b) * Math.sin(a), r * Math.cos(b) - 10], i * 3);
      if (i % 4 === 0) {
        // anillo orbital
        const t = Math.random() * Math.PI * 2;
        const rr = 2.6 + Math.random() * 0.08;
        to.set([Math.cos(t) * rr, Math.sin(t) * rr * 0.28, Math.sin(t) * rr * 0.6], i * 3);
      } else {
        const t = Math.random() * Math.PI * 2;
        const p = Math.acos(2 * Math.random() - 1);
        const rr = 1.35;
        to.set([rr * Math.sin(p) * Math.cos(t), rr * Math.sin(p) * Math.sin(t), rr * Math.cos(p)], i * 3);
      }
    }
    return { from, to, positions: from.slice() };
  }, []);

  useFrame(({ clock }) => {
    const points = ref.current;
    if (!points) return;
    if (start.current === null) start.current = clock.getElapsedTime();
    const raw = Math.min(1, ((clock.getElapsedTime() - start.current) * 1000) / (duration * 0.85));
    const eased = 1 - Math.pow(1 - raw, 4);
    const attr = points.geometry.attributes.position;
    const array = attr.array as Float32Array;
    for (let i = 0; i < array.length; i++) array[i] = from[i] + (to[i] - from[i]) * eased;
    attr.needsUpdate = true;
    points.rotation.y = clock.getElapsedTime() * 0.35;
    points.rotation.x = 0.25;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#8fd3ff" transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function IntroParticles({ duration }: { duration: number }) {
  return (
    <Canvas className="intro-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 45 }} gl={{ alpha: true }}>
      <Swarm duration={duration} />
    </Canvas>
  );
}
