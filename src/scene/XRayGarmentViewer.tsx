import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { CoutureMannequin } from './CoutureMannequin';
import { CoutureGown } from './CoutureGown';
import type { XRayStage } from '../types';

interface XRayGarmentViewerProps {
  stage: XRayStage;
}

function DynamicXRayCamera({ stage }: { stage: XRayStage }) {
  const targetPos = useRef(new THREE.Vector3(0, 0.4, 4.2));
  const targetLook = useRef(new THREE.Vector3(0, 0.2, 0));

  useFrame(({ camera }, delta) => {
    if (stage === 'finished') {
      targetPos.current.set(0, 0.35, 4.4);
      targetLook.current.set(0, 0.15, 0);
    } else if (stage === 'construction') {
      // 3/4 elevated angle inspecting pattern seams & corsetry boning
      targetPos.current.set(1.4, 0.65, 3.2);
      targetLook.current.set(0, 0.35, 0);
    } else if (stage === 'textile') {
      // Macro close-up on embroidery and organza weave
      targetPos.current.set(-0.25, -0.15, 1.45);
      targetLook.current.set(-0.1, -0.22, 0.4);
    }

    const lerpSpeed = Math.min(delta * 4.5, 0.2);
    camera.position.lerp(targetPos.current, lerpSpeed);
    camera.lookAt(targetLook.current);
  });

  return null;
}

function RotatingXRayRig({ stage }: { stage: XRayStage }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Gentle continuous rotation to showcase dimensional geometry
      groupRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      <CoutureMannequin
        finish={stage === 'construction' ? 'charcoal-noir' : 'linen-brass'}
      />
      <CoutureGown xrayMode={stage} />
    </group>
  );
}

export function XRayGarmentViewer({ stage }: XRayGarmentViewerProps) {
  const isConstruction = stage === 'construction';

  return (
    <Canvas
      camera={{ position: [0, 0.4, 4.2], fov: 34 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={isConstruction ? 0.35 : 0.75} color="#fbf7f0" />
      <directionalLight
        position={[3, 5, 4]}
        intensity={isConstruction ? 1.5 : 2.4}
        color={isConstruction ? '#b8e6ea' : '#fff4e5'}
      />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={1.0}
        color={isConstruction ? '#58d5d3' : '#dfceba'}
      />

      <DynamicXRayCamera stage={stage} />
      <RotatingXRayRig stage={stage} />

      <ContactShadows
        position={[0, -1.95, 0]}
        opacity={0.6}
        scale={5.5}
        blur={2}
        far={4.0}
        color={isConstruction ? '#0e262b' : '#2b231c'}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}

