import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface KidsOccasionDressProps {
  colorway?: string;
  wireframe?: boolean;
  roughness?: number;
  sheen?: number;
  showEmbroidery?: boolean;
  showPearls?: boolean;
}

/**
 * KidsOccasionDress
 * Authentic 3D haute couture children's celebration organza dress.
 * Proportioned specifically for the child dressform (approx 6–8Y):
 * - Scalloped Peter Pan collar
 * - Delicately gathered puff cap sleeves
 * - High empire waist with pure silk satin sash
 * - Multi-tiered flared organza skirt with soft natural buoyancy
 * - Hand-embroidered botanical floral vine relief
 * - Freshwater seed pearl embellishments
 */
export function KidsOccasionDress({
  colorway = '#F7F4EF',
  wireframe = false,
  roughness = 0.32,
  sheen = 0.85,
  showEmbroidery = true,
  showPearls = true
}: KidsOccasionDressProps) {
  const skirtRef = useRef<THREE.Group>(null);
  const ribbonRef = useRef<THREE.Mesh>(null);

  // PBR Materials for Children's Haute Couture Dress
  const materials = useMemo(() => {
    // 1. French Silk Organza Base
    const organzaMat = new THREE.MeshStandardMaterial({
      color: colorway,
      roughness: roughness,
      metalness: 0.04,
      transparent: true,
      opacity: 0.94,
      wireframe: wireframe,
      side: THREE.DoubleSide
    });

    // 2. Pure Silk Satin Ribbon Sash
    const satinSashMat = new THREE.MeshStandardMaterial({
      color: '#C7AA83', // Champagne gold accent
      roughness: 0.22,
      metalness: 0.18,
      wireframe: wireframe
    });

    // 3. Embroidered Botanical Gold Thread
    const embroideryMat = new THREE.MeshStandardMaterial({
      color: '#D4AF37',
      metalness: 0.82,
      roughness: 0.35,
      wireframe: wireframe
    });

    // 4. Freshwater Seed Pearls
    const pearlMat = new THREE.MeshStandardMaterial({
      color: '#FFFDF9',
      roughness: 0.12,
      metalness: 0.08
    });

    // 5. Scalloped Peter Pan Collar (Fine Silk Cotton)
    const collarMat = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.45,
      metalness: 0.02
    });

    return { organzaMat, satinSashMat, embroideryMat, pearlMat, collarMat };
  }, [colorway, wireframe, roughness, sheen]);

  // Bodice lathe geometry fitted to child mannequin
  const bodiceGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [
      new THREE.Vector2(0.085, 1.03), // Neck base
      new THREE.Vector2(0.198, 0.96), // Shoulder
      new THREE.Vector2(0.208, 0.88), // Upper chest
      new THREE.Vector2(0.202, 0.78), // Mid chest
      new THREE.Vector2(0.195, 0.70), // Empire waistline seam
      new THREE.Vector2(0.001, 0.70)  // Inward bottom
    ];
    return new THREE.LatheGeometry(points, 40);
  }, []);

  // Multi-tier flared organza skirt geometry
  const skirtGeometries = useMemo(() => {
    // Tier 1: Upper flare from empire waist
    const t1Points: THREE.Vector2[] = [
      new THREE.Vector2(0.196, 0.70),
      new THREE.Vector2(0.245, 0.58),
      new THREE.Vector2(0.315, 0.44),
      new THREE.Vector2(0.001, 0.44)
    ];
    const tier1 = new THREE.LatheGeometry(t1Points, 48);

    // Tier 2: Mid voluminous bell flare
    const t2Points: THREE.Vector2[] = [
      new THREE.Vector2(0.290, 0.46),
      new THREE.Vector2(0.380, 0.32),
      new THREE.Vector2(0.465, 0.16),
      new THREE.Vector2(0.001, 0.16)
    ];
    const tier2 = new THREE.LatheGeometry(t2Points, 48);

    // Tier 3: Scalloped outer hemline flare
    const t3Points: THREE.Vector2[] = [
      new THREE.Vector2(0.435, 0.20),
      new THREE.Vector2(0.530, 0.05),
      new THREE.Vector2(0.595, -0.10),
      new THREE.Vector2(0.001, -0.10)
    ];
    const tier3 = new THREE.LatheGeometry(t3Points, 48);

    return { tier1, tier2, tier3 };
  }, []);

  // Subtle breathing and natural skirt sway
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (skirtRef.current) {
      skirtRef.current.rotation.y = Math.sin(t * 0.6) * 0.015;
      skirtRef.current.position.y = Math.sin(t * 1.2) * 0.003;
    }
    if (ribbonRef.current) {
      ribbonRef.current.rotation.z = Math.sin(t * 0.8) * 0.025;
    }
  });

  return (
    <group position={[0, -0.15, 0]}>
      {/* 1. EMPIRE WAIST BODICE */}
      <mesh
        geometry={bodiceGeometry}
        material={materials.organzaMat}
        castShadow
        receiveShadow
      />

      {/* 2. SCALLOPED PETER PAN COLLAR */}
      <group position={[0, 1.01, 0.02]}>
        {/* Left Collar Leaf */}
        <mesh position={[-0.07, 0, 0.06]} rotation={[-0.2, -0.3, 0.1]} material={materials.collarMat}>
          <cylinderGeometry args={[0.075, 0.085, 0.008, 24, 1, false, 0, Math.PI * 1.1]} />
        </mesh>
        {/* Right Collar Leaf */}
        <mesh position={[0.07, 0, 0.06]} rotation={[-0.2, 0.3, -0.1]} material={materials.collarMat}>
          <cylinderGeometry args={[0.075, 0.085, 0.008, 24, 1, false, Math.PI * 0.9, Math.PI * 1.1]} />
        </mesh>
      </group>

      {/* 3. DELICATE PUFF CAP SLEEVES */}
      {/* Left Puff Sleeve */}
      <mesh position={[-0.22, 0.94, 0]} rotation={[0, 0, -0.35]} material={materials.organzaMat}>
        <sphereGeometry args={[0.075, 24, 24]} />
      </mesh>
      {/* Right Puff Sleeve */}
      <mesh position={[0.22, 0.94, 0]} rotation={[0, 0, 0.35]} material={materials.organzaMat}>
        <sphereGeometry args={[0.075, 24, 24]} />
      </mesh>

      {/* 4. SILK SATIN SASH & BOW AT EMPIRE WAIST */}
      <mesh position={[0, 0.70, 0]} material={materials.satinSashMat}>
        <cylinderGeometry args={[0.198, 0.198, 0.038, 36]} />
      </mesh>
      {/* Back Bow Knot */}
      <mesh ref={ribbonRef} position={[0, 0.70, -0.20]} material={materials.satinSashMat}>
        <boxGeometry args={[0.12, 0.05, 0.025]} />
      </mesh>

      {/* 5. MULTI-TIERED GATHERED ORGANZA SKIRT */}
      <group ref={skirtRef}>
        <mesh geometry={skirtGeometries.tier1} material={materials.organzaMat} castShadow />
        <mesh geometry={skirtGeometries.tier2} material={materials.organzaMat} castShadow />
        <mesh geometry={skirtGeometries.tier3} material={materials.organzaMat} castShadow receiveShadow />

        {/* Scalloped hemline accent trim ring */}
        <mesh position={[0, -0.09, 0]} material={materials.satinSashMat}>
          <torusGeometry args={[0.59, 0.006, 12, 48]} />
        </mesh>
      </group>

      {/* 6. BOTANICAL EMBROIDERY RELIEF (GOLD THREADWORK) */}
      {showEmbroidery && (
        <group position={[0, 0.84, 0.195]}>
          {/* Central Stem */}
          <mesh material={materials.embroideryMat}>
            <cylinderGeometry args={[0.002, 0.002, 0.16, 12]} />
          </mesh>
          {/* Delicate Floral Leaves */}
          <mesh position={[-0.035, 0.04, 0.005]} rotation={[0, 0, 0.6]} material={materials.embroideryMat}>
            <sphereGeometry args={[0.012, 12, 12]} />
          </mesh>
          <mesh position={[0.035, 0.02, 0.005]} rotation={[0, 0, -0.6]} material={materials.embroideryMat}>
            <sphereGeometry args={[0.012, 12, 12]} />
          </mesh>
          <mesh position={[-0.028, -0.04, 0.005]} rotation={[0, 0, 0.5]} material={materials.embroideryMat}>
            <sphereGeometry args={[0.010, 12, 12]} />
          </mesh>
          <mesh position={[0.028, -0.03, 0.005]} rotation={[0, 0, -0.5]} material={materials.embroideryMat}>
            <sphereGeometry args={[0.010, 12, 12]} />
          </mesh>
        </group>
      )}

      {/* 7. FRESHWATER RIVER SEED PEARLS */}
      {showPearls && (
        <group position={[0, 0, 0.202]}>
          <mesh position={[0, 0.98, 0]} material={materials.pearlMat}>
            <sphereGeometry args={[0.0055, 16, 16]} />
          </mesh>
          <mesh position={[0, 0.92, 0]} material={materials.pearlMat}>
            <sphereGeometry args={[0.0055, 16, 16]} />
          </mesh>
          <mesh position={[0, 0.86, 0]} material={materials.pearlMat}>
            <sphereGeometry args={[0.0055, 16, 16]} />
          </mesh>
          <mesh position={[0, 0.80, 0]} material={materials.pearlMat}>
            <sphereGeometry args={[0.0055, 16, 16]} />
          </mesh>
          <mesh position={[0, 0.74, 0]} material={materials.pearlMat}>
            <sphereGeometry args={[0.0055, 16, 16]} />
          </mesh>
        </group>
      )}
    </group>
  );
}

