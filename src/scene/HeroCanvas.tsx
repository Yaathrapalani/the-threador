import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { StudioEnvironment } from './StudioEnvironment';
import { GlbGarmentLoader } from './GlbGarmentLoader';
import { ScrollCameraController } from './ScrollCameraController';
import type { ModelAssetInfo, XRayStage, GarmentCameraView, AtelierGender } from '../types';

interface HeroCanvasProps {
  gender?: AtelierGender;
  scrollProgress: number;
  xrayMode?: XRayStage;
  onStageChange?: (stage: 'A' | 'B' | 'C' | 'D' | 'E') => void;
  onAssetInfoChange?: (info: ModelAssetInfo) => void;
  forcedView?: GarmentCameraView | null;
  isTurntableActive?: boolean;
}

export function HeroCanvas({
  gender = 'kids',
  scrollProgress,
  xrayMode = 'finished',
  onStageChange,
  onAssetInfoChange,
  forcedView = null,
  isTurntableActive = false
}: HeroCanvasProps) {
  const garmentRigRef = useRef<THREE.Group>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  // WebGL support detection
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="webgl-fallback-container" role="img" aria-label="Haute Couture Mannequin Exhibition">
        <div className="webgl-fallback-card">
          <span className="fallback-badge">OFFLINE CANVAS / FALLBACK RENDERING</span>
          <h3>The Champagne Atelier Gown</h3>
          <p>Mulberry Silk Organza & River Pearl Couture Gown — Hand-Boned Bodice</p>
          <div className="fallback-metrics">
            <span>320 CRAFT HOURS</span>
            <span>42,000 STITCHES</span>
            <span>45 PEARLS</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-canvas-wrapper">
      <Canvas
        camera={{ position: [0, 0.4, 5.2], fov: 34, near: 0.1, far: 30 }}
        // 4K Ultra-Crisp Resolution Scaling: scales up to 2.5x pixel ratio on Retina & 4K displays
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 2, 2.5)]}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.12,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        {/* Luxury Haute Couture Studio Lighting */}
        <StudioEnvironment intensityMultiplier={1.15} rimColor="#f5e4cb" />

        {/* Master Camera Choreographer linked to GSAP ScrollTrigger & View Inspector */}
        <ScrollCameraController
          scrollProgress={scrollProgress}
          garmentGroupRef={garmentRigRef}
          onStageChange={onStageChange}
          forcedView={forcedView}
          isTurntableActive={isTurntableActive}
        />

        {/* Garment Rig: Mannequin + Couture Gown + GLB Loader Pipeline */}
        <group ref={garmentRigRef} position={[0, 0, 0]}>
          <GlbGarmentLoader
            gender={gender}
            xrayMode={xrayMode}
            onAssetInfoChange={onAssetInfoChange}
          />
        </group>
      </Canvas>
    </div>
  );
}
