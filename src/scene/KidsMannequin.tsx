import { useMemo } from 'react';
import * as THREE from 'three';

interface KidsMannequinProps {
  finish?: 'porcelain-linen' | 'warm-ivory' | 'ebonized';
  showStandOnly?: boolean;
}

/**
 * KidsMannequin
 * Authentic child-proportioned haute couture dressform (approx. 6–8Y scale).
 * Designed with genuine anatomical child proportions:
 * - Natural unpinched waist
 * - Gentle chest contour without adult bust definition
 * - Softer rounded shoulder slope
 * - Authentic Parisian child couture stand with brushed champagne brass fittings
 */
export function KidsMannequin({
  finish = 'porcelain-linen',
  showStandOnly = false
}: KidsMannequinProps) {
  // PBR Materials for Children's Haute Couture Mannequin
  const materials = useMemo(() => {
    const isEbonized = finish === 'ebonized';

    // Tailored child couture linen canvas
    const linenMat = new THREE.MeshStandardMaterial({
      color: isEbonized ? '#22201E' : '#F7F4EF',
      roughness: 0.88,
      metalness: 0.02,
      bumpScale: 0.015
    });

    // Satin-brushed champagne brass hardware
    const brassMat = new THREE.MeshStandardMaterial({
      color: isEbonized ? '#493B32' : '#C7AA83',
      metalness: 0.85,
      roughness: 0.25
    });

    // Cast bronze pedestal base
    const baseMat = new THREE.MeshStandardMaterial({
      color: isEbonized ? '#161413' : '#322B25',
      metalness: 0.6,
      roughness: 0.42
    });

    return { linenMat, brassMat, baseMat };
  }, [finish]);

  // Child-specific lathe contour points
  // Shorter, gentle cylindrical child anatomy without adult bust or wasp waist
  const childTorsoGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [
      new THREE.Vector2(0.001, 1.08), // Neck top
      new THREE.Vector2(0.062, 1.06), // Neck collar
      new THREE.Vector2(0.095, 1.02), // Gentle collarbone
      new THREE.Vector2(0.185, 0.95), // Soft rounded shoulder slope
      new THREE.Vector2(0.195, 0.88), // Upper youthful chest
      new THREE.Vector2(0.190, 0.78), // Mid chest (flat/natural child contour)
      new THREE.Vector2(0.182, 0.68), // Natural child waist (unpinched)
      new THREE.Vector2(0.192, 0.56), // Soft hip curve
      new THREE.Vector2(0.198, 0.42), // Lower pelvis curve
      new THREE.Vector2(0.150, 0.32), // Inward taper
      new THREE.Vector2(0.001, 0.30)  // Base center
    ];

    return new THREE.LatheGeometry(points, 48);
  }, []);

  return (
    <group position={[0, -0.15, 0]}>
      {/* 1. DRESSFORM TORSO (CHILD SPECIFICATION) */}
      {!showStandOnly && (
        <group>
          {/* Main child torso */}
          <mesh
            geometry={childTorsoGeometry}
            material={materials.linenMat}
            castShadow
            receiveShadow
          />

          {/* Neck brass finial & acorn cap */}
          <mesh position={[0, 1.10, 0]} material={materials.brassMat}>
            <cylinderGeometry args={[0.045, 0.055, 0.04, 32]} />
          </mesh>
          <mesh position={[0, 1.135, 0]} material={materials.brassMat}>
            <sphereGeometry args={[0.032, 24, 24]} />
          </mesh>

          {/* Armscye shoulder caps (left & right) */}
          <mesh position={[-0.185, 0.94, 0]} rotation={[0, 0, Math.PI / 4]} material={materials.brassMat}>
            <cylinderGeometry args={[0.04, 0.04, 0.015, 24]} />
          </mesh>
          <mesh position={[0.185, 0.94, 0]} rotation={[0, 0, -Math.PI / 4]} material={materials.brassMat}>
            <cylinderGeometry args={[0.04, 0.04, 0.015, 24]} />
          </mesh>

          {/* Couture style tape lines (subtle dark thread markings for child proportion guidelines) */}
          <mesh position={[0, 0.72, 0]} material={materials.brassMat}>
            <torusGeometry args={[0.183, 0.002, 16, 48]} />
          </mesh>
        </group>
      )}

      {/* 2. ARCHITECTURAL PEDESTAL & STAND */}
      {/* Central brass riser pole */}
      <mesh position={[0, -0.18, 0]} material={materials.brassMat}>
        <cylinderGeometry args={[0.018, 0.018, 0.95, 24]} />
      </mesh>

      {/* Decorative height-adjustment collar ring */}
      <mesh position={[0, 0.28, 0]} material={materials.brassMat}>
        <torusGeometry args={[0.035, 0.012, 16, 32]} />
      </mesh>

      {/* Heavy cast-iron tri-cornered child boutique base */}
      <mesh position={[0, -0.66, 0]} material={materials.baseMat} receiveShadow>
        <cylinderGeometry args={[0.26, 0.32, 0.04, 32]} />
      </mesh>
      <mesh position={[0, -0.63, 0]} material={materials.brassMat}>
        <cylinderGeometry args={[0.08, 0.12, 0.025, 32]} />
      </mesh>
    </group>
  );
}

