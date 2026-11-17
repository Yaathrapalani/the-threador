import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { GarmentCameraView } from '../types';
import { GARMENT_REGISTRY } from '../data/garmentRegistry';

interface ScrollCameraControllerProps {
  scrollProgress: number; // Normalized 0 to 1 across hero story scroll
  garmentGroupRef: React.RefObject<THREE.Group | null>;
  onStageChange?: (stage: 'A' | 'B' | 'C' | 'D' | 'E') => void;
  forcedView?: GarmentCameraView | null;
  isTurntableActive?: boolean;
}

export function ScrollCameraController({
  scrollProgress,
  garmentGroupRef,
  onStageChange,
  forcedView = null,
  isTurntableActive = false
}: ScrollCameraControllerProps) {
  const { camera, size } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0.2, 0));
  const lastReportedStage = useRef<'A' | 'B' | 'C' | 'D' | 'E'>('A');

  useFrame((_, delta) => {
    // Dynamic aspect-ratio responsive camera distance compensation
    const aspect = size.width / Math.max(size.height, 1);
    const aspectCorrection = aspect < 1 ? Math.max(1.15, 1.55 / aspect) : 1.0;

    const targetPos = new THREE.Vector3();
    const targetLook = new THREE.Vector3();
    let targetRotationY = 0;
    let stage: 'A' | 'B' | 'C' | 'D' | 'E' = 'A';

    // -------------------------------------------------------------
    // 1. FORCED VIEW INSPECTOR MODE (When user clicks one of 6 views)
    // -------------------------------------------------------------
    if (forcedView) {
      const views = GARMENT_REGISTRY['THREADOR-W-001'].cameraViews;
      const v = views[forcedView] || views.front;

      targetPos.set(
        v.position[0],
        v.position[1],
        v.position[2] * aspectCorrection
      );
      targetLook.set(v.target[0], v.target[1], v.target[2]);

      // Turntable spin when enabled
      if (isTurntableActive && garmentGroupRef.current) {
        garmentGroupRef.current.rotation.y += delta * 0.45;
        targetRotationY = garmentGroupRef.current.rotation.y;
      } else {
        targetRotationY = 0;
      }
    } else {
      // -------------------------------------------------------------
      // 2. MASTER GSAP SCROLL-DRIVEN TIMELINE (Deterministic bidirectional)
      // -------------------------------------------------------------
      const p = Math.min(Math.max(scrollProgress, 0), 1);

      if (p < 0.22) {
        // STAGE A: Full Garment Introduction
        stage = 'A';
        const localP = p / 0.22;
        targetPos.set(0, 0.35, 5.2 * aspectCorrection);
        targetLook.set(0, 0.15, 0);
        targetRotationY = localP * 0.45;
      } else if (p < 0.48) {
        // STAGE B: Garment 360° Rotation
        stage = 'B';
        const localP = (p - 0.22) / (0.48 - 0.22);
        targetPos.set(
          Math.sin(localP * Math.PI * 0.5) * 0.7,
          0.35 + Math.sin(localP * Math.PI) * 0.15,
          (4.9 - localP * 0.2) * aspectCorrection
        );
        targetLook.set(0, 0.18, 0);
        targetRotationY = 0.45 + localP * Math.PI * 1.85;
      } else if (p < 0.72) {
        // STAGE C: Fabric Macro Inspection
        stage = 'C';
        const localP = (p - 0.48) / (0.72 - 0.48);
        const startPos = new THREE.Vector3(0.7, 0.45, 4.7 * aspectCorrection);
        const macroPos = new THREE.Vector3(-0.28, -0.18, 1.35 * Math.min(aspectCorrection, 1.25));

        targetPos.lerpVectors(startPos, macroPos, THREE.MathUtils.smoothstep(localP, 0, 1));
        targetLook.lerpVectors(
          new THREE.Vector3(0, 0.18, 0),
          new THREE.Vector3(-0.12, -0.25, 0.42),
          THREE.MathUtils.smoothstep(localP, 0, 1)
        );
        targetRotationY = 0.45 + Math.PI * 1.85 + localP * 0.35;
      } else if (p < 0.88) {
        // STAGE D: Craftsmanship & Corsetry Boning Details
        stage = 'D';
        const localP = (p - 0.72) / (0.88 - 0.72);
        const macroStart = new THREE.Vector3(-0.28, -0.18, 1.35 * Math.min(aspectCorrection, 1.25));
        const corsetPos = new THREE.Vector3(0.35, 0.38, 1.75 * Math.min(aspectCorrection, 1.2));

        targetPos.lerpVectors(macroStart, corsetPos, THREE.MathUtils.smoothstep(localP, 0, 1));
        targetLook.lerpVectors(
          new THREE.Vector3(-0.12, -0.25, 0.42),
          new THREE.Vector3(0.02, 0.36, 0.0),
          THREE.MathUtils.smoothstep(localP, 0, 1)
        );
        targetRotationY = 0.45 + Math.PI * 1.85 + 0.35 - localP * 0.4;
      } else {
        // STAGE E: Brand Philosophy & Divided Atelier Transition
        stage = 'E';
        const localP = (p - 0.88) / 0.12;
        const corsetPos = new THREE.Vector3(0.35, 0.38, 1.75 * Math.min(aspectCorrection, 1.2));
        const widePos = new THREE.Vector3(0, 0.45, 5.0 * aspectCorrection);

        targetPos.lerpVectors(corsetPos, widePos, THREE.MathUtils.smoothstep(localP, 0, 1));
        targetLook.lerpVectors(
          new THREE.Vector3(0.02, 0.36, 0.0),
          new THREE.Vector3(0, 0.20, 0),
          THREE.MathUtils.smoothstep(localP, 0, 1)
        );
        targetRotationY = 0.45 + Math.PI * 1.85 - 0.05 + localP * 0.2;
      }

      if (isTurntableActive && garmentGroupRef.current) {
        garmentGroupRef.current.rotation.y += delta * 0.45;
        targetRotationY = garmentGroupRef.current.rotation.y;
      }
    }

    // Report stage changes to UI callbacks
    if (stage !== lastReportedStage.current) {
      lastReportedStage.current = stage;
      onStageChange?.(stage);
    }

    // Silky damping interpolation (60 FPS temporal stability)
    const lerpSpeed = Math.min(delta * 6.5, 0.25);
    camera.position.lerp(targetPos, lerpSpeed);
    currentLookAt.current.lerp(targetLook, lerpSpeed);
    camera.lookAt(currentLookAt.current);

    // Apply rotation to garment group if available
    if (garmentGroupRef.current && !isTurntableActive) {
      garmentGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        garmentGroupRef.current.rotation.y,
        targetRotationY,
        lerpSpeed
      );
    }
  });

  return null;
}
