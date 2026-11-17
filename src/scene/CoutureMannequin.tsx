import { useMemo } from 'react';
import * as THREE from 'three';

interface CoutureMannequinProps {
  finish?: 'linen-brass' | 'charcoal-noir' | 'raw-canvas';
  showStandOnly?: boolean;
}

export function CoutureMannequin({
  finish = 'linen-brass',
  showStandOnly = false
}: CoutureMannequinProps) {
  // PBR materials for the luxury mannequin
  const materials = useMemo(() => {
    const isNoir = finish === 'charcoal-noir';

    // Tailored French couture linen canvas for the dressform
    const linenMat = new THREE.MeshStandardMaterial({
      color: isNoir ? '#201e1c' : '#ede7dc',
      roughness: 0.82,
      metalness: 0.04,
      bumpScale: 0.02
    });

    // Satin-brushed champagne brass hardware
    const brassMat = new THREE.MeshStandardMaterial({
      color: isNoir ? '#4a443c' : '#c8ad78',
      metalness: 0.88,
      roughness: 0.28
    });

    // Ebonized cast steel / matte base
    const baseMat = new THREE.MeshStandardMaterial({
      color: isNoir ? '#121110' : '#221f1c',
      metalness: 0.65,
      roughness: 0.4
    });

    return { linenMat, brassMat, baseMat };
  }, [finish]);

  // Torso lathe geometry for realistic Parisian dressform silhouette
  const torsoGeometry = useMemo(() => {
    // Generate curved profile points: neck -> shoulder -> bust -> wasp waist -> hips -> lower pelvis
    const points: THREE.Vector2[] = [
      new THREE.Vector2(0.001, 1.48), // Neck top
      new THREE.Vector2(0.075, 1.45), // Neck base
      new THREE.Vector2(0.12, 1.38),  // Collarbone slope
      new THREE.Vector2(0.24, 1.30),  // Shoulder slope
      new THREE.Vector2(0.26, 1.22),  // Upper chest
      new THREE.Vector2(0.275, 1.12), // Bust apex
      new THREE.Vector2(0.23, 0.98),  // Ribcage contour
      new THREE.Vector2(0.185, 0.82), // Wasp waist
      new THREE.Vector2(0.21, 0.68),  // High hip curve
      new THREE.Vector2(0.265, 0.52), // Full hip
      new THREE.Vector2(0.24, 0.36),  // Lower pelvis
      new THREE.Vector2(0.16, 0.22),  // Inward taper
      new THREE.Vector2(0.001, 0.20)  // Base center
    ];

    return new THREE.LatheGeometry(points, 48);
  }, []);

  return (
    <group position={[0, -0.65, 0]}>
      {/* 1. PEDESTAL STAND & BASE */}
      {/* Heavy cast base plinth */}
      <mesh position={[0, -1.25, 0]} castShadow receiveShadow material={materials.baseMat}>
        <cylinderGeometry args={[0.34, 0.38, 0.05, 48]} />
      </mesh>

      {/* Decorative brass accent ring on base */}
      <mesh position={[0, -1.22, 0]} castShadow material={materials.brassMat}>
        <torusGeometry args={[0.32, 0.012, 16, 48]} />
      </mesh>

      {/* Central architectural vertical pole */}
      <mesh position={[0, -0.35, 0]} castShadow material={materials.brassMat}>
        <cylinderGeometry args={[0.022, 0.022, 1.8, 32]} />
      </mesh>

      {/* Height adjustment knurled collar */}
      <mesh position={[0, -0.25, 0]} castShadow material={materials.brassMat}>
        <cylinderGeometry args={[0.038, 0.038, 0.08, 24]} />
      </mesh>

      {/* Horizontal locking pin */}
      <mesh position={[0, -0.25, 0]} rotation={[0, 0, Math.PI / 2]} castShadow material={materials.brassMat}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 16]} />
      </mesh>

      {!showStandOnly && (
        <>
          {/* 2. DRESSFORM TORSO */}
          <mesh
            geometry={torsoGeometry}
            position={[0, 0, 0]}
            castShadow
            receiveShadow
            material={materials.linenMat}
          />

          {/* Neck base brass trim ring */}
          <mesh position={[0, 1.45, 0]} castShadow material={materials.brassMat}>
            <cylinderGeometry args={[0.08, 0.082, 0.02, 32]} />
          </mesh>

          {/* Turned neck finial cap */}
          <mesh position={[0, 1.54, 0]} castShadow material={materials.brassMat}>
            <cylinderGeometry args={[0.04, 0.075, 0.12, 32]} />
          </mesh>
          <mesh position={[0, 1.62, 0]} castShadow material={materials.brassMat}>
            <sphereGeometry args={[0.048, 24, 24]} />
          </mesh>

          {/* Torso bottom finish plate */}
          <mesh position={[0, 0.20, 0]} material={materials.baseMat}>
            <cylinderGeometry args={[0.165, 0.165, 0.02, 32]} />
          </mesh>
        </>
      )}
    </group>
  );
}

