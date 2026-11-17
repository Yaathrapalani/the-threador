import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface StudioEnvironmentProps {
  intensityMultiplier?: number;
  rimColor?: string;
}

export function StudioEnvironment({
  intensityMultiplier = 1.0,
  rimColor = '#f5e4cb'
}: StudioEnvironmentProps) {
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const keyLightRef = useRef<THREE.SpotLight>(null);

  // Subtle breathing animation for studio ambient lighting
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.4;
    if (rimLightRef.current) {
      rimLightRef.current.intensity = 1.8 * intensityMultiplier + Math.sin(t) * 0.15;
    }
  });

  return (
    <>
      {/* Warm ambient studio base */}
      <ambientLight intensity={0.7 * intensityMultiplier} color="#fbf7f0" />

      {/* Primary Key Light: Sculptural warm studio spotlight casting soft shadow */}
      <spotLight
        ref={keyLightRef}
        position={[3.8, 6.2, 4.5]}
        angle={0.48}
        penumbra={0.85}
        intensity={80 * intensityMultiplier}
        color="#fff5e8"
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Fill Light: Soft neutral studio fill preventing deep black voids */}
      <directionalLight
        position={[-4.5, 3.2, 2.5]}
        intensity={1.2 * intensityMultiplier}
        color="#e8e4df"
      />

      {/* Rim / Hair Light: Crisp specular back edge catching translucent organza and threads */}
      <directionalLight
        ref={rimLightRef}
        position={[0, 4.5, -4.5]}
        intensity={2.2 * intensityMultiplier}
        color={rimColor}
      />

      {/* Subtle floor bounce light for natural fabric under-glow */}
      <directionalLight
        position={[0, -2, 2]}
        intensity={0.45 * intensityMultiplier}
        color="#edd9c2"
      />

      {/* Ground Contact Shadow for grounding the mannequin pedestal */}
      <ContactShadows
        position={[0, -1.95, 0]}
        opacity={0.65}
        scale={6.5}
        blur={2.4}
        far={4.5}
        resolution={1024}
        color="#2b2520"
      />
    </>
  );
}

