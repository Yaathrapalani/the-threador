import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { TailoredMensEnsemble } from './TailoredMensEnsemble';
import { AtelierWomensGown } from './AtelierWomensGown';
import { KidsHeirloomEnsemble } from './KidsHeirloomEnsemble';
import type { AtelierGender } from '../types';

interface AtelierCanvasProps {
  gender: AtelierGender;
  isHovered: boolean;
  onExplore: (gender: AtelierGender) => void;
}

// ---------------------------------------------------------------------------
// 0. KIDS' HAUTE COUTURE RIG (PRIMARY COLLECTION)
// ---------------------------------------------------------------------------
function KidsGlbModel() {
  const { scene } = useGLTF('/models/kids-heirloom.glb');
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

function KidsCoutureRig({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetSpeed = isHovered ? 0.35 : 0.15;
    groupRef.current.rotation.y += delta * targetSpeed;
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={<KidsHeirloomEnsemble />}>
        <KidsGlbModel />
      </Suspense>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 1. MEN'S PRODUCTION RIG & PROCEDURAL FALLBACK
// ---------------------------------------------------------------------------
export function ProceduralMensBlazer() {
  return <TailoredMensEnsemble />;
}

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
      const targetSpeed = isHovered ? 0.45 : 0.18;
      groupRef.current.rotation.y += delta * targetSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={<TailoredMensEnsemble />}>
        <MensGlbModel />
      </Suspense>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 2. WOMEN'S PRODUCTION RIG
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
      const targetSpeed = isHovered ? 0.45 : 0.18;
      groupRef.current.rotation.y += delta * targetSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={<AtelierWomensGown />}>
        <WomensGlbModel />
      </Suspense>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3. ATELIER CANVAS WITH INDEPENDENT 4K LIGHTING & CAMERAS
// ---------------------------------------------------------------------------
export function AtelierDualScene({ gender, isHovered, onExplore }: AtelierCanvasProps) {
  const isMen = gender === 'men';
  const isKids = gender === 'kids';

  return (
    <div
      className={`atelier-viewport-wrapper ${isKids ? 'kids-viewport' : isMen ? 'men-viewport' : 'women-viewport'}`}
      onClick={() => onExplore(gender)}
      role="region"
      aria-label={`${isKids ? "Children's Haute Couture" : isMen ? "Men's Structured Atelier" : "Women's Couture Atelier"} 3D Viewport`}
    >
      <Canvas
        camera={{
          position: isKids ? [0, 0.15, 3.8] : isMen ? [0, 0.22, 4.0] : [0, 0.22, 4.2],
          fov: 33,
          near: 0.1,
          far: 25
        }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 2, 2.5)]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isKids ? 1.20 : isMen ? 1.25 : 1.15
        }}
        shadows={{ type: THREE.PCFSoftShadowMap }}
      >
        {/* Independent Studio Lighting per Collection Universe */}
        {isKids ? (
          // Kids' Lighting: Warm, luminous, soft champagne and delicate powder tones
          <>
            <ambientLight intensity={0.92} color="#fbf7f2" />
            <directionalLight
              position={[2.5, 3.8, 3.5]}
              intensity={4.4}
              color="#fff9f0"
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0001}
            />
            <directionalLight position={[-2.8, 2.6, 2.8]} intensity={2.4} color="#e5eef7" />
            <directionalLight position={[0, 3.5, -3.0]} intensity={3.6} color="#e8d9a8" />
            <pointLight position={[0, -0.6, 1.6]} intensity={1.1} color="#fceeed" />
          </>
        ) : isMen ? (
          // Men's Lighting: Radiant Studio Illumination with Brilliant Contrast
          <>
            <ambientLight intensity={0.95} color="#e8f0fc" />
            <directionalLight
              position={[2.2, 4.2, 3.8]}
              intensity={4.8}
              color="#ffffff"
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0001}
            />
            <directionalLight position={[-3.2, 2.8, 3.0]} intensity={2.6} color="#c8daf2" />
            <directionalLight position={[0, 3.8, -3.2]} intensity={4.2} color="#f2cf88" />
            <pointLight position={[0, -1.0, 1.8]} intensity={1.4} color="#dce6f5" />
          </>
        ) : (
          // Women's Lighting: Warm Champagne Luminescence & Soft Gold Fill
          <>
            <ambientLight intensity={0.88} color="#faf5ee" />
            <directionalLight
              position={[2.8, 4.2, 3.6]}
              intensity={4.2}
              color="#fff8ed"
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0001}
            />
            <directionalLight position={[-2.6, 2.4, 2.6]} intensity={2.2} color="#f7e8d5" />
            <directionalLight position={[0, 3.6, -3.0]} intensity={3.8} color="#d4af37" />
            <pointLight position={[0, -0.8, 1.8]} intensity={1.2} color="#fff2db" />
          </>
        )}

        {/* Dynamic Shadow Grounding */}
        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.65}
          scale={4.5}
          blur={1.8}
          far={3.0}
        />

        {/* 3D Model Mounting */}
        {isKids ? (
          <KidsCoutureRig isHovered={isHovered} />
        ) : isMen ? (
          <MensTailoredRig isHovered={isHovered} />
        ) : (
          <WomensCoutureRig isHovered={isHovered} />
        )}
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/kids-heirloom.glb');
useGLTF.preload('/models/mens-tailored.glb');
useGLTF.preload('/models/hero-garment.glb');
