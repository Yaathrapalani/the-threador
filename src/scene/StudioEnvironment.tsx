import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface StudioEnvironmentProps {
  intensityMultiplier?: number;
  rimColor?: string;
  theme?: 'dark-couture' | 'warm-atelier' | 'violet-gallery';
}

/**
 * THE THREADOR — CINEMATIC ARCHITECTURAL SHOWROOM LIGHTING RIG
 * Implements Section 4 & Reference 3/4:
 * - Warm architectural key spotlight ensuring white and light-coloured garments retain crisp detail
 * - Deep controlled violet atmospheric bounce supporting the dark couture spatial depth
 * - Champagne gold rim specular highlights defining the mannequin silhouette and sheer organza edges
 * - Soft floor contact shadow grounding the display pedestal
 */
export function StudioEnvironment({
  intensityMultiplier = 1.15,
  rimColor = '#f5e4cb',
  theme = 'dark-couture'
}: StudioEnvironmentProps) {
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const keyLightRef = useRef<THREE.SpotLight>(null);

  // Subtle breathing animation for studio ambient lighting
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.35;
    if (rimLightRef.current) {
      rimLightRef.current.intensity = 2.4 * intensityMultiplier + Math.sin(t) * 0.15;
    }
  });

  return (
    <>
      {/* 1. Controlled Atmospheric Base (Violet depth tone) */}
      <ambientLight
        intensity={0.65 * intensityMultiplier}
        color={theme === 'dark-couture' ? '#21132c' : '#f5efe6'}
      />

      {/* 2. Primary Architectural Key Light (Warm 5500K daylight key preserving white garment textures) */}
      <spotLight
        ref={keyLightRef}
        position={[3.8, 6.4, 4.8]}
        angle={0.44}
        penumbra={0.82}
        intensity={95 * intensityMultiplier}
        color="#fffaf0"
        castShadow
        shadow-bias={-0.00008}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* 3. Soft Studio Fill Light (Prevents harsh shadows without washing out silhouettes) */}
      <directionalLight
        position={[-4.2, 3.4, 2.6]}
        intensity={1.4 * intensityMultiplier}
        color="#7042a6" // Violet bounce
      />

      {/* 4. Warm Side Fill (Boutique architectural warmth) */}
      <directionalLight
        position={[-1.8, 2.0, 3.8]}
        intensity={1.1 * intensityMultiplier}
        color="#f2dfcd"
      />

      {/* 5. Rim / Specular Hair Light (Glints off shoulder caps, lapels, and translucent organza) */}
      <directionalLight
        ref={rimLightRef}
        position={[0, 4.8, -4.5]}
        intensity={2.8 * intensityMultiplier}
        color={rimColor}
      />

      {/* 6. Subtle Floor Bounce Light (Under-glow for hemline drape and pedestal) */}
      <directionalLight
        position={[0, -2.2, 2.2]}
        intensity={0.5 * intensityMultiplier}
        color="#e8cf98"
      />

      {/* 7. Ground Contact Shadow for grounding the retail mannequin plinth */}
      <ContactShadows
        position={[0, -1.92, 0]}
        opacity={0.72}
        scale={7.0}
        blur={2.2}
        far={4.8}
        resolution={1024}
        color="#0a080e"
      />
    </>
  );
}
