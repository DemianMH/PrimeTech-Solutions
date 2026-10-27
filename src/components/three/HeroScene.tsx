"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, MeshDistortMaterial, RoundedBox, Sparkles, Stars, Torus } from "@react-three/drei";
import type { Group, Mesh } from "three";

export type OrbitService = {
  slug: string;
  label: string;
  color: string;
  shape: "screen" | "chat" | "bolt" | "camera" | "cloud" | "rack";
};

type SceneProps = {
  services: OrbitService[];
  active: boolean;
  reducedMotion: boolean;
};

/** Pequeños objetos 3D que representan cada servicio. */
function ServiceGlyph({ shape, color }: { shape: OrbitService["shape"]; color: string }) {
  const material = <meshStandardMaterial color={color} metalness={0.35} roughness={0.25} emissive={color} emissiveIntensity={0.25} />;
  switch (shape) {
    case "screen":
      return (
        <group>
          <RoundedBox args={[0.62, 0.4, 0.05]} radius={0.04}>{material}</RoundedBox>
          <mesh position={[0, -0.27, 0]}>
            <boxGeometry args={[0.08, 0.14, 0.04]} />
            {material}
          </mesh>
        </group>
      );
    case "chat":
      return (
        <group>
          <RoundedBox args={[0.58, 0.4, 0.14]} radius={0.12}>{material}</RoundedBox>
          <mesh position={[-0.16, -0.24, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.14, 0.14, 0.12]} />
            {material}
          </mesh>
        </group>
      );
    case "bolt":
      return (
        <mesh rotation={[0, 0, 0.3]}>
          <octahedronGeometry args={[0.3, 0]} />
          {material}
        </mesh>
      );
    case "camera":
      return (
        <group rotation={[0, 0, -0.2]}>
          <RoundedBox args={[0.56, 0.24, 0.24]} radius={0.06}>{material}</RoundedBox>
          <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.08, 24]} />
            <meshStandardMaterial color="#0b1020" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      );
    case "cloud":
      return (
        <group>
          {[[-0.18, 0, 0, 0.17], [0.02, 0.08, 0, 0.22], [0.22, 0, 0, 0.16]].map(([x, y, z, r]) => (
            <mesh key={`${x}`} position={[x, y, z]}>
              <sphereGeometry args={[r, 24, 24]} />
              {material}
            </mesh>
          ))}
        </group>
      );
    case "rack":
      return (
        <group>
          {[0.16, 0, -0.16].map((y) => (
            <RoundedBox key={y} args={[0.5, 0.12, 0.3]} radius={0.03} position={[0, y, 0]}>{material}</RoundedBox>
          ))}
        </group>
      );
  }
}

function OrbitNode({ service, index, total }: { service: OrbitService; index: number; total: number }) {
  const router = useRouter();
  const ref = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const radius = index % 2 === 0 ? 2.45 : 2.05;
  const tilt = index % 2 === 0 ? 0.32 : -0.24;
  const offset = (index / total) * Math.PI * 2;
  const speed = 0.16 + (index % 3) * 0.03;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius * tilt, Math.sin(t) * radius * 0.55);
    const target = hovered ? 1.35 : 1;
    const scale = ref.current.scale.x;
    ref.current.scale.setScalar(scale + (target - scale) * 0.12);
    ref.current.rotation.y += 0.01;
  });

  return (
    <group
      ref={ref}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
      onClick={() => router.push(`/servicios/${service.slug}`)}
    >
      <ServiceGlyph shape={service.shape} color={service.color} />
      <Html center distanceFactor={7} position={[0, -0.48, 0]} zIndexRange={[20, 0]}>
        <span className={`orbit-chip ${hovered ? "is-hover" : ""}`} style={{ ["--chip" as string]: service.color }}>
          {service.label}
        </span>
      </Html>
    </group>
  );
}

function Core() {
  const shell = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (shell.current) {
      shell.current.rotation.y += delta * 0.18;
      shell.current.rotation.x += delta * 0.07;
    }
  });
  return (
    <group>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[0.95, 12]} />
          <MeshDistortMaterial color="#2a5bff" emissive="#1236c9" emissiveIntensity={0.55} roughness={0.12} metalness={0.4} distort={0.32} speed={1.6} />
        </mesh>
      </Float>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.32, 1]} />
        <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.22} />
      </mesh>
      <Torus args={[2.45, 0.006, 8, 160]} rotation={[Math.PI / 2 - 0.32, 0, 0]}>
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </Torus>
      <Torus args={[2.05, 0.006, 8, 160]} rotation={[Math.PI / 2 + 0.24, 0, 0]}>
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} />
      </Torus>
    </group>
  );
}

/** Inclina toda la escena siguiendo el puntero, con suavizado. */
function PointerRig({ children, reducedMotion }: { children: React.ReactNode; reducedMotion: boolean }) {
  const ref = useRef<Group>(null);
  // En pantallas angostas la escena se acerca para ocupar el ancho disponible.
  const narrow = useThree((state) => state.size.width < 520);
  // A pantalla completa en escritorio el núcleo se desplaza a la derecha, junto al texto.
  const wide = useThree((state) => state.size.width > 1000);
  useFrame(({ pointer }) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += (pointer.x * 0.35 - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (-pointer.y * 0.2 - ref.current.rotation.x) * 0.05;
  });
  return (
    <group ref={ref} scale={narrow ? 0.98 : 0.78} position={[wide ? 1.9 : 0, narrow ? -0.2 : 0, 0]}>
      {children}
    </group>
  );
}

export default function HeroScene({ services, active, reducedMotion }: SceneProps) {
  const nodes = useMemo(() => services, [services]);
  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 7.6], fov: 42 }}
      frameloop={active && !reducedMotion ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-4, -2, 2]} intensity={14} color="#22d3ee" />
      <pointLight position={[3, -3, -2]} intensity={10} color="#a855f7" />
      <PointerRig reducedMotion={reducedMotion}>
        <Core />
        {nodes.map((service, index) => (
          <OrbitNode key={service.slug} service={service} index={index} total={nodes.length} />
        ))}
      </PointerRig>
      <Stars radius={60} depth={40} count={1800} factor={3} saturation={0} fade speed={0.6} />
      <Sparkles count={70} scale={[9, 5, 4]} size={2.2} speed={0.35} color="#9cc9ff" opacity={0.7} />
    </Canvas>
  );
}
