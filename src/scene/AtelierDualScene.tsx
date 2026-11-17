import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { AtelierGender } from '../types';

interface AtelierCanvasProps {
  gender: AtelierGender;
  isHovered: boolean;
  onExplore: (gender: AtelierGender) => void;
}

function MensTailoredRig({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Faster, responsive turn on hover; subtle gentle turn otherwise
      const targetSpeed = isHovered ? 0.95 : 0.22;
      groupRef.current.rotation.y += delta * targetSpeed;
    }
  });

  const materials = useMemo(() => {
    // Tailored Charcoal Shetland Wool
    const woolMat = new THREE.MeshStandardMaterial({
      color: '#1a1918',
      roughness: 0.88,
      metalness: 0.05
    });

    // Horn buttons
    const hornMat = new THREE.MeshStandardMaterial({
      color: '#342f2b',
      roughness: 0.35,
      metalness: 0.1
    });

    // Dark walnut / steel stand
    const standMat = new THREE.MeshStandardMaterial({
      color: '#141312',
      roughness: 0.5,
      metalness: 0.7
    });

    return { woolMat, hornMat, standMat };
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.65, 0]}>
      {/* Stand */}
      <mesh position={[0, -1.25, 0]} material={materials.standMat}>
        <cylinderGeometry args={[0.32, 0.35, 0.05, 36]} />
      </mesh>
      <mesh position={[0, -0.35, 0]} material={materials.standMat}>
        <cylinderGeometry args={[0.02, 0.02, 1.8, 24]} />
      </mesh>

      {/* Architectural Tailored Greatcoat Silhouette */}
      {/* Shoulders & Chest */}
      <mesh position={[0, 0.92, 0]} castShadow material={materials.woolMat}>
        <boxGeometry args={[0.62, 0.55, 0.32]} />
      </mesh>
      {/* Lapels */}
      <mesh position={[0.13, 1.0, 0.17]} rotation={[0, 0.2, -0.1]} material={materials.woolMat}>
        <boxGeometry args={[0.12, 0.42, 0.04]} />
      </mesh>
      <mesh position={[-0.13, 1.0, 0.17]} rotation={[0, -0.2, 0.1]} material={materials.woolMat}>
        <boxGeometry args={[0.12, 0.42, 0.04]} />
      </mesh>

      {/* Structured Coat Body descending downwards */}
      <mesh position={[0, 0.18, 0]} castShadow material={materials.woolMat}>
        <cylinderGeometry args={[0.29, 0.36, 1.05, 32]} />
      </mesh>
      {/* Lower Hem Drape */}
      <mesh position={[0, -0.52, 0]} castShadow material={materials.woolMat}>
        <cylinderGeometry args={[0.36, 0.42, 0.75, 32]} />
      </mesh>

      {/* Carved Horn Buttons */}
      {[-0.08, 0.18, 0.44].map((y, i) => (
        <mesh
          key={i}
          position={[0.06, y + 0.35, 0.18]}
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.hornMat}
        >
          <cylinderGeometry args={[0.014, 0.014, 0.008, 16]} />
        </mesh>
      ))}

      {/* Collar & Neck Block */}
      <mesh position={[0, 1.25, 0]} material={materials.standMat}>
        <cylinderGeometry args={[0.08, 0.09, 0.14, 24]} />
      </mesh>
    </group>
  );
}

function WomensCoutureRig({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetSpeed = isHovered ? 0.95 : 0.22;
      groupRef.current.rotation.y += delta * targetSpeed;
    }
  });

  const materials = useMemo(() => {
    // Warm Ivory Silk Crêpe
    const silkMat = new THREE.MeshPhysicalMaterial({
      color: '#f6f1e6',
      roughness: 0.38,
      metalness: 0.04,
      sheen: 0.85,
      sheenColor: new THREE.Color('#fff2dd'),
      clearcoat: 0.25
    });

    // Brushed gold brass stand
    const brassMat = new THREE.MeshStandardMaterial({
      color: '#c9ad79',
      roughness: 0.3,
      metalness: 0.85
    });

    return { silkMat, brassMat };
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.65, 0]}>
      {/* Stand */}
      <mesh position={[0, -1.25, 0]} material={materials.brassMat}>
        <cylinderGeometry args={[0.3, 0.34, 0.05, 36]} />
      </mesh>
      <mesh position={[0, -0.35, 0]} material={materials.brassMat}>
        <cylinderGeometry args={[0.018, 0.018, 1.8, 24]} />
      </mesh>

      {/* Feminine Sculptural Drape Column */}
      {/* Contoured Torso */}
      <mesh position={[0, 0.85, 0]} castShadow material={materials.silkMat}>
        <cylinderGeometry args={[0.18, 0.16, 0.65, 32]} />
      </mesh>
      {/* Fluted Column Skirt */}
      <mesh position={[0, 0.05, 0]} castShadow material={materials.silkMat}>
        <cylinderGeometry args={[0.16, 0.38, 1.25, 48]} />
      </mesh>
      {/* Flared Floor Pool */}
      <mesh position={[0, -0.68, 0]} castShadow material={materials.silkMat}>
        <cylinderGeometry args={[0.38, 0.48, 0.38, 48]} />
      </mesh>

      {/* Turned brass finial */}
      <mesh position={[0, 1.35, 0]} material={materials.brassMat}>
        <sphereGeometry args={[0.045, 20, 20]} />
      </mesh>
    </group>
  );
}

export function AtelierDualScene({ gender, isHovered }: AtelierCanvasProps) {
  const isMen = gender === 'men';

  return (
    <Canvas
      camera={{ position: [0, 0.2, 3.8], fov: 32 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lighting tailored to gender atelier */}
      <ambientLight intensity={isMen ? 0.5 : 0.75} color={isMen ? '#edf0f2' : '#fef8ee'} />
      <directionalLight
        position={isMen ? [-3, 4, 3] : [3, 4, 3]}
        intensity={isMen ? 2.5 : 2.2}
        color={isMen ? '#e5ebf0' : '#fff4e3'}
      />
      <directionalLight
        position={[0, 2, -3]}
        intensity={1.2}
        color={isMen ? '#8ba2b8' : '#e0ca9d'}
      />

      <Float speed={1.2} rotationIntensity={0.01} floatIntensity={0.04}>
        {isMen ? (
          <MensTailoredRig isHovered={isHovered} />
        ) : (
          <WomensCoutureRig isHovered={isHovered} />
        )}
      </Float>

      <ContactShadows
        position={[0, -1.92, 0]}
        opacity={0.55}
        scale={4.8}
        blur={2}
        far={3.8}
        color={isMen ? '#0d1014' : '#2b231d'}
      />
    </Canvas>
  );
}

