import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { AtelierGender } from '../types';

interface AtelierCanvasProps {
  gender: AtelierGender;
  isHovered: boolean;
  onExplore: (gender: AtelierGender) => void;
}

// ---------------------------------------------------------------------------
// 1. MEN'S PRODUCTION RIG (Loads mens-tailored.glb with procedural fallback)
// ---------------------------------------------------------------------------
function MensGlbModel() {
  const { scene } = useGLTF('/models/mens-tailored.glb');
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  return <primitive object={clonedScene} position={[0, -0.65, 0]} />;
}

function MensTailoredRig({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetSpeed = isHovered ? 0.85 : 0.20;
      groupRef.current.rotation.y += delta * targetSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <MensGlbModel />
      </Suspense>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 2. WOMEN'S PRODUCTION RIG (Loads hero-garment.glb with procedural fallback)
// ---------------------------------------------------------------------------
function WomensGlbModel() {
  const { scene } = useGLTF('/models/hero-garment.glb');
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  return <primitive object={clonedScene} position={[0, -0.65, 0]} />;
}

function WomensCoutureRig({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetSpeed = isHovered ? 0.85 : 0.20;
      groupRef.current.rotation.y += delta * targetSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <WomensGlbModel />
      </Suspense>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3. ATELIER CANVAS WITH INDEPENDENT LIGHTING & CAMERAS
// ---------------------------------------------------------------------------
export function AtelierDualScene({ gender, isHovered, onExplore }: AtelierCanvasProps) {
  const isMen = gender === 'men';

  return (
    <div
      className={`atelier-viewport-wrapper ${isMen ? 'men-viewport' : 'women-viewport'}`}
      onClick={() => onExplore(gender)}
      role="region"
      aria-label={`${isMen ? "Men's Structured Atelier" : "Women's Couture Atelier"} 3D Viewport`}
    >
      <Canvas
        camera={{
          position: isMen ? [-0.1, 0.25, 3.85] : [0.1, 0.25, 3.85],
          fov: 34,
          near: 0.1,
          far: 25
        }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true
        }}
      >
        {/* Independent Lighting per Gender Universe */}
        {isMen ? (
          // Men's Lighting: Chiaroscuro high-contrast architectural illumination
          <>
            <ambientLight intensity={0.55} color="#d6d0c4" />
            {/* Cool key light from left */}
            <directionalLight
              position={[-3.5, 4.2, 3.0]}
              intensity={2.4}
              color="#e6dcce"
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0001}
            />
            {/* Deep ink cool rim light */}
            <directionalLight position={[3.2, 2.5, -2.8]} intensity={1.6} color="#7998b3" />
            {/* Subtle under-bounce light */}
            <pointLight position={[0, -1.0, 1.5]} intensity={0.4} color="#8a7c6a" />
          </>
        ) : (
          // Women's Lighting: Warm champagne luminescence & soft gold fill
          <>
            <ambientLight intensity={0.65} color="#f4efe6" />
            {/* Warm ivory key light from right */}
            <directionalLight
              position={[3.5, 4.2, 3.2]}
              intensity={2.8}
              color="#fff7eb"
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0001}
            />
            {/* Soft antique gold rim light */}
            <directionalLight position={[-3.0, 2.8, -2.5]} intensity={1.8} color="#e5c88c" />
            {/* Warm organza under-glow */}
            <pointLight position={[0, -0.8, 1.6]} intensity={0.5} color="#ffecd1" />
          </>
        )}

        {/* 3D Garment Rig */}
        {isMen ? (
          <MensTailoredRig isHovered={isHovered} />
        ) : (
          <WomensCoutureRig isHovered={isHovered} />
        )}

        {/* Floor Contact Shadows */}
        <ContactShadows
          position={[0, -1.95, 0]}
          opacity={isMen ? 0.65 : 0.45}
          scale={3.6}
          blur={2.2}
          far={3.0}
        />
      </Canvas>
    </div>
  );
}
