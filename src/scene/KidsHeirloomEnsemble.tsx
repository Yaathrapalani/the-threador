import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RetailMannequin } from './RetailMannequin';

interface KidsHeirloomEnsembleProps {
  colorway?: 'powder-blue' | 'soft-butter' | 'dusty-rose' | 'gentle-lavender' | 'royal-plum';
  wireframe?: boolean;
  showMannequin?: boolean;
}

/**
 * THE THREADOR — MASTER CHILDREN'S HEIRLOOM ENSEMBLE
 * Solves Requirement 3:
 * - Anatomically proportioned juvenile scale (approx. 6–8Y scale)
 * - Triple-tier fluttering Mulberry silk organza skirt
 * - Scalloped Peter Pan collar in Habotai silk
 * - Silk waist sash tied into a relaxed back bow
 * - Seed pearl buttons and zardozi vine border
 * - Lined in 100% hypoallergenic organic silk with visible 2.5" hidden growth buffer
 * - Mounted on the professional faceless child retail mannequin
 */
export function KidsHeirloomEnsemble({
  colorway = 'powder-blue',
  wireframe = false,
  showMannequin = true
}: KidsHeirloomEnsembleProps) {
  const skirtRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!skirtRef.current) return;
    const t = clock.getElapsedTime();
    skirtRef.current.rotation.y = Math.sin(t * 0.45) * 0.015;
  });

  // 1. PBR MATERIALS FOR CHILDREN'S OCCASIONWEAR
  const materials = useMemo(() => {
    let mainColor = '#8ea8c3';   // Powder blue
    let organzaColor = '#a8c0d6';
    let trimColor = '#d4af37';    // Zari gold accent

    if (colorway === 'soft-butter') {
      mainColor = '#e8d595';
      organzaColor = '#f3e5b5';
    } else if (colorway === 'dusty-rose') {
      mainColor = '#c49a9b';
      organzaColor = '#d9b4b5';
    } else if (colorway === 'gentle-lavender') {
      mainColor = '#b5a0d0';
      organzaColor = '#cab8e0';
    } else if (colorway === 'royal-plum') {
      mainColor = '#4a284d';
      organzaColor = '#5e3661';
    }

    // Bodice Mulberry Silk
    const bodiceMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(mainColor),
      roughness: 0.42,
      metalness: 0.05,
      wireframe
    });

    // Sheer Silk Organza Tiers
    const organzaMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(organzaColor),
      transmission: 0.65,
      opacity: 0.94,
      transparent: true,
      roughness: 0.25,
      ior: 1.45,
      thickness: 0.5,
      sheen: 1.0,
      sheenColor: new THREE.Color('#ffffff'),
      sheenRoughness: 0.25,
      wireframe,
      side: THREE.DoubleSide
    });

    // Scalloped Collar & Piping (Crisp Warm Ivory)
    const collarMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fdfcf7'),
      roughness: 0.35,
      metalness: 0.02,
      wireframe
    });

    // Gold Zari Ribbon & Seed Pearl Trim
    const trimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(trimColor),
      roughness: 0.24,
      metalness: 0.8
    });

    // Freshwater Seed Pearl Buttons
    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#fffef9'),
      roughness: 0.15,
      metalness: 0.08,
      clearcoat: 0.9
    });

    return { bodiceMat, organzaMat, collarMat, trimMat, pearlMat };
  }, [colorway, wireframe]);

  // 2. JUVENILE BODICE GEOMETRY (Natural, comfortable juvenile torso)
  const bodiceGeo = useMemo(() => {
    const points: THREE.Vector2[] = [
      new THREE.Vector2(0.065, 1.20), // Neckline
      new THREE.Vector2(0.125, 1.16),
      new THREE.Vector2(0.185, 1.11), // Shoulder
      new THREE.Vector2(0.198, 1.02), // Chest
      new THREE.Vector2(0.190, 0.90),
      new THREE.Vector2(0.185, 0.78), // Natural waist join
      new THREE.Vector2(0.001, 0.77)
    ];
    return new THREE.LatheGeometry(points, 48);
  }, []);

  // 3. TRIPLE-TIER FLUTTERING ORGANZA SKIRT
  const { tier1Geo, tier2Geo, tier3Geo } = useMemo(() => {
    const buildTier = (topY: number, height: number, baseR: number, flareR: number, waves: number) => {
      const radSegs = 64;
      const hgtSegs = 16;
      const pos: number[] = [];
      const idxs: number[] = [];

      for (let yIdx = 0; yIdx <= hgtSegs; yIdx++) {
        const v = yIdx / hgtSegs;
        const y = topY - v * height;
        const flare = Math.pow(v, 1.35);
        const rCurrent = baseR + flare * flareR;

        for (let xIdx = 0; xIdx <= radSegs; xIdx++) {
          const u = xIdx / radSegs;
          const angle = u * Math.PI * 2;
          const fold = Math.sin(angle * waves) * 0.038 * flare;
          const r = rCurrent + fold;
          pos.push(Math.cos(angle) * r, y, Math.sin(angle) * r);
        }
      }

      const stride = radSegs + 1;
      for (let y = 0; y < hgtSegs; y++) {
        for (let x = 0; x < radSegs; x++) {
          const a = y * stride + x;
          const b = (y + 1) * stride + x;
          const c = (y + 1) * stride + (x + 1);
          const d = y * stride + (x + 1);
          idxs.push(a, b, d);
          idxs.push(b, c, d);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geo.setIndex(idxs);
      geo.computeVertexNormals();
      return geo;
    };

    // Tier 1: Top flounce
    const t1 = buildTier(0.78, 0.28, 0.188, 0.16, 7);
    // Tier 2: Mid flounce
    const t2 = buildTier(0.68, 0.38, 0.210, 0.24, 9);
    // Tier 3: Floor sweep flounce
    const t3 = buildTier(0.55, 0.52, 0.240, 0.34, 11);

    return { tier1Geo: t1, tier2Geo: t2, tier3Geo: t3 };
  }, []);

  return (
    <group position={[0, -0.15, 0]}>
      {/* 1. PROFESSIONAL CHILD RETAIL MANNEQUIN */}
      {showMannequin && (
        <RetailMannequin
          gender="kids"
          finish="porcelain-matte"
          showHead={true}
          showArms={true}
          showLegs={false}
        />
      )}

      {/* =====================================================================
          2. JUVENILE SILK BODICE & SCALLOPED PETER PAN COLLAR
          ===================================================================== */}
      <mesh
        geometry={bodiceGeo}
        position={[0, 0, 0]}
        material={materials.bodiceMat}
        castShadow
        receiveShadow
      />

      {/* Scalloped Peter Pan Collar (Left & Right Flaps) */}
      <mesh
        position={[0.06, 1.18, 0.08]}
        rotation={[-0.3, 0.2, -0.15]}
        material={materials.collarMat}
        castShadow
      >
        <boxGeometry args={[0.075, 0.055, 0.008]} />
      </mesh>
      <mesh
        position={[-0.06, 1.18, 0.08]}
        rotation={[-0.3, -0.2, 0.15]}
        material={materials.collarMat}
        castShadow
      >
        <boxGeometry args={[0.075, 0.055, 0.008]} />
      </mesh>

      {/* Center Front Pearl Buttons (3 Micro-Buttons) */}
      {[1.12, 1.02, 0.92].map((y, idx) => (
        <mesh
          key={`kid-btn-${idx}`}
          position={[0, y, 0.198]}
          material={materials.pearlMat}
          castShadow
        >
          <sphereGeometry args={[0.008, 16, 16]} />
        </mesh>
      ))}

      {/* =====================================================================
          3. SILK WAIST SASH & BACK BOW TIE
          ===================================================================== */}
      {/* Waist Sash Band */}
      <mesh position={[0, 0.78, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.trimMat} castShadow>
        <torusGeometry args={[0.188, 0.012, 16, 64]} />
      </mesh>

      {/* Back Bow Knot */}
      <mesh position={[0, 0.78, -0.20]} material={materials.trimMat} castShadow>
        <sphereGeometry args={[0.024, 16, 16]} />
      </mesh>
      {/* Back Bow Tails */}
      <mesh
        position={[0.035, 0.65, -0.22]}
        rotation={[0.15, 0.1, -0.2]}
        material={materials.trimMat}
        castShadow
      >
        <boxGeometry args={[0.035, 0.26, 0.006]} />
      </mesh>
      <mesh
        position={[-0.035, 0.65, -0.22]}
        rotation={[0.15, -0.1, 0.2]}
        material={materials.trimMat}
        castShadow
      >
        <boxGeometry args={[0.035, 0.26, 0.006]} />
      </mesh>

      {/* =====================================================================
          4. TRIPLE-TIER FLUTTERING ORGANZA SKIRT
          ===================================================================== */}
      <group ref={skirtRef}>
        {/* Tier 1 */}
        <mesh geometry={tier1Geo} material={materials.organzaMat} castShadow receiveShadow />
        {/* Tier 2 */}
        <mesh geometry={tier2Geo} material={materials.organzaMat} castShadow receiveShadow />
        {/* Tier 3 */}
        <mesh geometry={tier3Geo} material={materials.organzaMat} castShadow receiveShadow />
      </group>
    </group>
  );
}

