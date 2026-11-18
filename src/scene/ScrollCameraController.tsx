import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { GarmentCameraView } from '../types';

interface ScrollCameraControllerProps {
  scrollProgress: number; // Normalized 0 to 1 across hero story scroll
  garmentGroupRef: React.RefObject<THREE.Group | null>;
  onStageChange?: (stage: 'A' | 'B' | 'C' | 'D' | 'E') => void;
  forcedView?: GarmentCameraView | null;
  isTurntableActive?: boolean;
}

/**
 * THE THREADOR — MASTER CINEMATIC 7-STAGE CAMERA CHOREOGRAPHER
 * Implements Section 5 of the Directive:
 * - Stage 1 (0.00 – 0.16): Arrival (Full silhouette framed in showroom)
 * - Stage 2 (0.16 – 0.30): Approach (Smooth physical approach toward garment)
 * - Stage 3 (0.30 – 0.50): Detail Revelation (Collar, shoulder, lapel, buttons, bodice)
 * - Stage 4 (0.50 – 0.68): Controlled Orbit (3/4, side profile, and rear reveal)
 * - Stage 5 (0.68 – 0.82): Macro Presentation (Micro-texture, zari threads, pearls, seams)
 * - Stage 6 (0.82 – 0.92): Return (Smooth pull back to complete silhouette)
 * - Stage 7 (0.92 – 1.00): Collection Transition (Continuous glide into collections)
 */
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
    const aspectCorrection = aspect < 1 ? Math.max(1.18, 1.62 / aspect) : 1.0;

    const targetPos = new THREE.Vector3();
    const targetLook = new THREE.Vector3();
    let targetRotationY = 0;
    let stage: 'A' | 'B' | 'C' | 'D' | 'E' = 'A';

    // -------------------------------------------------------------
    // 1. ACCESSIBLE FORCED VIEW OVERRIDE (If manually requested)
    // -------------------------------------------------------------
    if (forcedView) {
      if (forcedView === 'threeQuarter') {
        targetPos.set(1.4, 0.45, 3.8 * aspectCorrection);
        targetLook.set(0, 0.25, 0);
        targetRotationY = Math.PI * 0.28;
      } else if (forcedView === 'side') {
        targetPos.set(2.8, 0.40, 2.0 * aspectCorrection);
        targetLook.set(0, 0.25, 0);
        targetRotationY = Math.PI * 0.5;
      } else if (forcedView === 'back') {
        targetPos.set(0, 0.45, -4.2 * aspectCorrection);
        targetLook.set(0, 0.25, 0);
        targetRotationY = Math.PI;
      } else if (forcedView === 'macro') {
        targetPos.set(-0.20, 0.12, 1.45 * Math.min(aspectCorrection, 1.25));
        targetLook.set(-0.06, 0.05, 0.22);
      } else if (forcedView === 'stitching') {
        targetPos.set(0.18, 0.42, 1.65 * Math.min(aspectCorrection, 1.2));
        targetLook.set(0, 0.36, 0.12);
      } else {
        // 'front'
        targetPos.set(0, 0.40, 5.0 * aspectCorrection);
        targetLook.set(0, 0.15, 0);
      }

      if (isTurntableActive && garmentGroupRef.current) {
        garmentGroupRef.current.rotation.y += delta * 0.4;
        targetRotationY = garmentGroupRef.current.rotation.y;
      }
    } else {
      // -------------------------------------------------------------
      // 2. AUTOMATIC CHOREOGRAPHED CINEMATIC SEQUENCE (Scroll-Driven)
      // -------------------------------------------------------------
      const p = Math.min(Math.max(scrollProgress, 0), 1);

      if (p < 0.16) {
        // STAGE 1: ARRIVAL — Full silhouette framed in luxury showroom
        stage = 'A';
        const t = p / 0.16;
        targetPos.set(0, 0.38, 5.2 * aspectCorrection);
        targetLook.set(0, 0.18, 0);
        targetRotationY = t * 0.22;
      } else if (p < 0.32) {
        // STAGE 2: APPROACH — Physically gliding forward into medium shot
        stage = 'B';
        const t = (p - 0.16) / (0.32 - 0.16);
        const smoothT = THREE.MathUtils.smoothstep(t, 0, 1);
        const p1 = new THREE.Vector3(0, 0.38, 5.2 * aspectCorrection);
        const p2 = new THREE.Vector3(0.25, 0.48, 3.6 * aspectCorrection);
        targetPos.lerpVectors(p1, p2, smoothT);
        targetLook.set(0, 0.28, 0);
        targetRotationY = 0.22 + smoothT * 0.35;
      } else if (p < 0.52) {
        // STAGE 3: DETAIL REVELATION — Close inspection of collar, shoulder, lapel & bodice
        stage = 'C';
        const t = (p - 0.32) / (0.52 - 0.32);
        const smoothT = THREE.MathUtils.smoothstep(t, 0, 1);
        const p2 = new THREE.Vector3(0.25, 0.48, 3.6 * aspectCorrection);
        const p3 = new THREE.Vector3(0.28, 0.58, 1.85 * Math.min(aspectCorrection, 1.25));
        targetPos.lerpVectors(p2, p3, smoothT);

        const l2 = new THREE.Vector3(0, 0.28, 0);
        const l3 = new THREE.Vector3(0.04, 0.52, 0.12);
        targetLook.lerpVectors(l2, l3, smoothT);
        targetRotationY = 0.57 + smoothT * 0.42;
      } else if (p < 0.70) {
        // STAGE 4: CONTROLLED ORBIT — Smooth 3/4 turn, side profile, and rear silhouette
        stage = 'D';
        const t = (p - 0.52) / (0.70 - 0.52);
        const smoothT = THREE.MathUtils.smoothstep(t, 0, 1);
        const p3 = new THREE.Vector3(0.28, 0.58, 1.85 * Math.min(aspectCorrection, 1.25));
        const p4 = new THREE.Vector3(-0.65, 0.42, 2.75 * aspectCorrection);
        targetPos.lerpVectors(p3, p4, smoothT);

        const l3 = new THREE.Vector3(0.04, 0.52, 0.12);
        const l4 = new THREE.Vector3(0, 0.24, 0);
        targetLook.lerpVectors(l3, l4, smoothT);
        targetRotationY = 0.99 + smoothT * Math.PI * 1.25;
      } else if (p < 0.85) {
        // STAGE 5: MACRO PRESENTATION — Extreme micro focus on lapel roll, zari threads, pearls & hand seams
        stage = 'D';
        const t = (p - 0.70) / (0.85 - 0.70);
        const smoothT = THREE.MathUtils.smoothstep(t, 0, 1);
        const p4 = new THREE.Vector3(-0.65, 0.42, 2.75 * aspectCorrection);
        const p5 = new THREE.Vector3(-0.12, 0.42, 1.45 * Math.min(aspectCorrection, 1.25));
        targetPos.lerpVectors(p4, p5, smoothT);

        const l4 = new THREE.Vector3(0, 0.24, 0);
        const l5 = new THREE.Vector3(-0.04, 0.40, 0.22);
        targetLook.lerpVectors(l4, l5, smoothT);
        targetRotationY = 0.99 + Math.PI * 1.25 + smoothT * 0.35;
      } else if (p < 0.94) {
        // STAGE 6: RETURN — Smooth pull back to the full architectural silhouette
        stage = 'E';
        const t = (p - 0.85) / (0.94 - 0.85);
        const smoothT = THREE.MathUtils.smoothstep(t, 0, 1);
        const p5 = new THREE.Vector3(-0.12, 0.42, 1.45 * Math.min(aspectCorrection, 1.25));
        const p6 = new THREE.Vector3(0, 0.42, 5.0 * aspectCorrection);
        targetPos.lerpVectors(p5, p6, smoothT);

        const l5 = new THREE.Vector3(-0.04, 0.40, 0.22);
        const l6 = new THREE.Vector3(0, 0.20, 0);
        targetLook.lerpVectors(l5, l6, smoothT);
        targetRotationY = 0.99 + Math.PI * 1.25 + 0.35 + smoothT * (Math.PI * 2 - (0.99 + Math.PI * 1.25 + 0.35));
      } else {
        // STAGE 7: COLLECTION TRANSITION — Continuous glide into collections
        stage = 'E';
        targetPos.set(0, 0.42, 5.0 * aspectCorrection);
        targetLook.set(0, 0.20, 0);
        targetRotationY = Math.PI * 2;
      }

      if (isTurntableActive && garmentGroupRef.current) {
        garmentGroupRef.current.rotation.y += delta * 0.4;
        targetRotationY = garmentGroupRef.current.rotation.y;
      }
    }

    // Report stage changes to callbacks
    if (stage !== lastReportedStage.current) {
      lastReportedStage.current = stage;
      onStageChange?.(stage);
    }

    // 60 FPS temporal stabilization interpolation
    const lerpSpeed = Math.min(delta * 5.8, 0.22);
    camera.position.lerp(targetPos, lerpSpeed);
    currentLookAt.current.lerp(targetLook, lerpSpeed);
    camera.lookAt(currentLookAt.current);

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
