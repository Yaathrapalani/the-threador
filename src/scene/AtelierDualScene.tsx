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
// 1. MEN'S PRODUCTION RIG & PROCEDURAL FALLBACK
// ---------------------------------------------------------------------------
function ProceduralMensBlazer() {
  const group = useMemo(() => {
    const grp = new THREE.Group();

    const blazerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2a3c5a'),
      roughness: 0.46,
      metalness: 0.15
    });

    const satinMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1c283c'),
      roughness: 0.22,
      metalness: 0.38
    });

    const shirtMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      roughness: 0.3
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f3c64c'),
      roughness: 0.15,
      metalness: 0.95
    });

    // Stand and Pole
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 1.85, 32), brassMat);
    pole.position.y = -0.35;
    grp.add(pole);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.4, 0.06, 48), brassMat);
    base.position.y = -1.25;
    grp.add(base);

    // Mannequin Neck & Brass Finial
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.084, 0.16, 32), blazerMat);
    neck.position.y = 1.48;
    grp.add(neck);

    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.046, 24, 24), brassMat);
    finial.position.y = 1.60;
    grp.add(finial);

    // White Shirt Collar & V-Insert
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.092, 0.09, 32), shirtMat);
    collar.position.y = 1.44;
    grp.add(collar);

    const shirtV = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.04, 0.30, 32), shirtMat);
    shirtV.position.set(0, 1.25, 0.18);
    grp.add(shirtV);

    // Solid Tailored Blazer Body
    const pts = [
      new THREE.Vector2(0.085, 1.42),
      new THREE.Vector2(0.32, 1.38),
      new THREE.Vector2(0.33, 1.22),
      new THREE.Vector2(0.30, 1.05),
      new THREE.Vector2(0.265, 0.86),
      new THREE.Vector2(0.285, 0.68),
      new THREE.Vector2(0.315, 0.44),
      new THREE.Vector2(0.30, 0.40),
      new THREE.Vector2(0.001, 0.39)
    ];
    const blazerBody = new THREE.Mesh(new THREE.LatheGeometry(pts, 48), blazerMat);
    grp.add(blazerBody);

    // Peak Lapels
    const leftLapel = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.38, 0.035), satinMat);
    leftLapel.position.set(0.12, 1.20, 0.26);
    leftLapel.rotation.set(-0.14, 0.18, -0.20);
    grp.add(leftLapel);

    const rightLapel = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.38, 0.035), satinMat);
    rightLapel.position.set(-0.12, 1.20, 0.26);
    rightLapel.rotation.set(-0.14, -0.18, 0.20);
    grp.add(rightLapel);

    // Roped Shoulders & Sleeves
    const leftSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.068, 0.72, 28), blazerMat);
    leftSleeve.position.set(0.32, 0.94, 0.02);
    leftSleeve.rotation.set(0.05, 0, -0.12);
    grp.add(leftSleeve);

    const rightSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.068, 0.72, 28), blazerMat);
    rightSleeve.position.set(-0.32, 0.94, 0.02);
    rightSleeve.rotation.set(0.05, 0, 0.12);
    grp.add(rightSleeve);

    // Pocket Square
    const ps = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.035, 0.02), shirtMat);
    ps.position.set(-0.16, 1.22, 0.27);
    ps.rotation.set(-0.12, -0.15, 0.1);
    grp.add(ps);

    // Gold Buttons (Double Breasted 2x2)
    const btnCoords = [
      [-0.05, 1.02, 0.31],
      [0.05, 1.02, 0.31],
      [-0.045, 0.88, 0.29],
      [0.045, 0.88, 0.29]
    ];
    btnCoords.forEach(([bx, by, bz]) => {
      const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.008, 16), brassMat);
      btn.position.set(bx, by, bz);
      btn.rotation.x = Math.PI / 2;
      grp.add(btn);
    });

    return grp;
  }, []);

  return <primitive object={group} position={[0, -0.65, 0]} />;
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
      const targetSpeed = isHovered ? 0.75 : 0.22;
      groupRef.current.rotation.y += delta * targetSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={<ProceduralMensBlazer />}>
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
      const targetSpeed = isHovered ? 0.75 : 0.22;
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
// 3. ATELIER CANVAS WITH INDEPENDENT 4K LIGHTING & CAMERAS
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
          position: isMen ? [0, 0.22, 4.0] : [0, 0.22, 4.2],
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
          toneMappingExposure: isMen ? 1.25 : 1.15
        }}
        shadows={{ type: THREE.PCFSoftShadowMap }}
      >
        {/* Independent Studio Lighting per Gender Universe */}
        {isMen ? (
          // Men's Lighting: Radiant Studio Illumination with Brilliant Contrast
          <>
            <ambientLight intensity={0.95} color="#e8f0fc" />
            {/* Front Crisp Key Light directly illuminating the navy wool, satin lapel, and shirt */}
            <directionalLight
              position={[2.2, 4.2, 3.8]}
              intensity={4.8}
              color="#ffffff"
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0001}
            />
            {/* Soft Fill Light from left preventing deep shadows */}
            <directionalLight position={[-3.2, 2.8, 3.0]} intensity={2.6} color="#c8daf2" />
            {/* Radiant Gold Rim Light outlining roped shoulders and waist */}
            <directionalLight position={[0, 3.8, -3.2]} intensity={4.2} color="#f2cf88" />
            {/* Subtle under-bounce light */}
            <pointLight position={[0, -1.0, 1.8]} intensity={1.4} color="#dce6f5" />
          </>
        ) : (
          // Women's Lighting: Warm Champagne Luminescence & Soft Gold Fill
          <>
            <ambientLight intensity={0.88} color="#faf5ee" />
            {/* Warm ivory key light from right */}
            <directionalLight
              position={[2.8, 4.2, 3.6]}
              intensity={4.2}
              color="#fff8ed"
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0001}
            />
            {/* Soft antique gold rim light */}
            <directionalLight position={[-3.0, 3.2, -3.0]} intensity={3.4} color="#eec882" />
            {/* Warm organza under-glow */}
            <pointLight position={[0, -0.8, 1.8]} intensity={1.2} color="#ffe8c4" />
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
          opacity={isMen ? 0.75 : 0.55}
          scale={3.6}
          blur={2.0}
          far={3.0}
        />
      </Canvas>
    </div>
  );
}

// Preload production models
useGLTF.preload('/models/hero-garment.glb');
useGLTF.preload('/models/mens-tailored.glb');
