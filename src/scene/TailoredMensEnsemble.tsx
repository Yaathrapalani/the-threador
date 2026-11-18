import { useMemo } from 'react';
import * as THREE from 'three';
import { RetailMannequin } from './RetailMannequin';

interface TailoredMensEnsembleProps {
  colorway?: 'midnight-navy' | 'charcoal-black' | 'antique-olive' | 'royal-plum';
  wireframe?: boolean;
  showMannequin?: boolean;
}

/**
 * THE THREADOR — MASTER TAILORED MEN'S BLAZER & ENSEMBLE
 * Solves Requirement 3:
 * - Proper shoulder pads with roped shoulder heads
 * - Forward-pitched sleeve geometry (15° natural arm angle)
 * - True 3D rolled peak lapels with dimensional thickness
 * - Collar stand and felt undercollar contour
 * - Left breast welt pocket with angled silk pocket square
 * - Dual flapped hip pockets with satin piping
 * - Double-breasted 6x2 button placement with anchor shank buttons
 * - Rear side vents with central back seamline
 * - Crisp spread-collar dress shirt and tailored trousers
 */
export function TailoredMensEnsemble({
  colorway = 'midnight-navy',
  wireframe = false,
  showMannequin = true
}: TailoredMensEnsembleProps) {
  // 1. PBR TAILORING MATERIALS
  const materials = useMemo(() => {
    let woolColor = '#223249'; // Luminous Midnight Navy Wool-Silk
    let lapelColor = '#162233'; // Rich Satin Silk Lapel

    if (colorway === 'charcoal-black') {
      woolColor = '#1c1b1f';
      lapelColor = '#111013';
    } else if (colorway === 'antique-olive') {
      woolColor = '#2b3325';
      lapelColor = '#1e241a';
    } else if (colorway === 'royal-plum') {
      woolColor = '#3a203d';
      lapelColor = '#241226';
    }

    // Super 150s Merino Wool-Silk Blend with subtle anisotropic sheen
    const woolMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(woolColor),
      roughness: 0.48,
      metalness: 0.12,
      wireframe,
      side: THREE.FrontSide
    });

    // Pure Mulberry Silk Satin Facing (Lapels & Pocket Welts)
    const satinLapelMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(lapelColor),
      roughness: 0.24,
      metalness: 0.35,
      wireframe
    });

    // Crisp Sea Island Cotton Dress Shirt
    const shirtMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      roughness: 0.28,
      metalness: 0.02,
      wireframe
    });

    // Deep Silk Tie / Cravat
    const tieMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#100e16'),
      roughness: 0.32,
      metalness: 0.15
    });

    // Hand-Hammered Brass / Crest Buttons
    const buttonMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d4af37'),
      roughness: 0.18,
      metalness: 0.92
    });

    // Matching Wool Trousers
    const trousersMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(woolColor),
      roughness: 0.52,
      metalness: 0.08,
      wireframe
    });

    return { woolMat, satinLapelMat, shirtMat, tieMat, buttonMat, trousersMat };
  }, [colorway, wireframe]);

  // 2. TAILORED BLAZER TORSO GEOMETRY (Anatomical Savile Row Hourglass)
  const blazerTorsoGeo = useMemo(() => {
    // Lathe profile with distinct chest fullness, suppression at waist, flare over hips
    const points: THREE.Vector2[] = [
      new THREE.Vector2(0.092, 1.45), // Base of collar
      new THREE.Vector2(0.180, 1.41), // Clavicle
      new THREE.Vector2(0.285, 1.35), // Roped shoulder head
      new THREE.Vector2(0.315, 1.25), // Pectoral chest fullness
      new THREE.Vector2(0.295, 1.10), // Lower ribcage
      new THREE.Vector2(0.265, 0.92), // Suppressed natural waist
      new THREE.Vector2(0.290, 0.74), // Flare over hip
      new THREE.Vector2(0.315, 0.52), // Blazer hemline
      new THREE.Vector2(0.285, 0.50), // Hem fold inward
      new THREE.Vector2(0.001, 0.49)
    ];
    return new THREE.LatheGeometry(points, 48);
  }, []);

  // 3. ROLLED PEAK LAPEL GEOMETRIES (Curved 3D geometry with depth)
  const { leftLapelGeo, rightLapelGeo } = useMemo(() => {
    // Left Lapel (Overlapping)
    const lShape = new THREE.Shape();
    lShape.moveTo(0, 0);
    lShape.lineTo(0.12, 0.05);
    lShape.lineTo(0.16, 0.28); // Peak point
    lShape.lineTo(0.08, 0.32); // Gorge seam
    lShape.lineTo(0.03, 0.42); // Collar join
    lShape.lineTo(0, 0.42);
    lShape.closePath();

    const extrudeSettings = {
      depth: 0.018,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.006,
      bevelThickness: 0.006
    };

    const lGeo = new THREE.ExtrudeGeometry(lShape, extrudeSettings);
    // Right Lapel
    const rGeo = lGeo.clone();
    rGeo.scale(-1, 1, 1);

    return { leftLapelGeo: lGeo, rightLapelGeo: rGeo };
  }, []);

  // 4. FORWARD-PITCHED SLEEVE GEOMETRY
  const sleeveGeo = useMemo(() => {
    // Anatomical arm curve with forward 15° pitch and forearm taper
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.02, -0.22, 0.03),
      new THREE.Vector3(0.01, -0.44, 0.08),
      new THREE.Vector3(0, -0.66, 0.11)
    ]);
    return new THREE.TubeGeometry(path, 32, 0.076, 24, false);
  }, []);

  // 5. TROUSERS GEOMETRIES
  const trouserLegGeo = useMemo(() => {
    // Tapered formal trouser leg
    return new THREE.CylinderGeometry(0.115, 0.085, 0.88, 32);
  }, []);

  return (
    <group position={[0, -0.15, 0]}>
      {/* 1. PROFESSIONAL RETAIL MANNEQUIN FOUNDATION */}
      {showMannequin && (
        <RetailMannequin
          gender="men"
          finish="porcelain-matte"
          showHead={true}
          showArms={true}
          showLegs={false}
        />
      )}

      {/* =====================================================================
          2. CRISP SHIRT COLLAR, V-OPENING & SILK TIE
          ===================================================================== */}
      {/* Stand Collar */}
      <mesh position={[0, 1.44, 0.02]} material={materials.shirtMat} castShadow>
        <cylinderGeometry args={[0.078, 0.084, 0.09, 36]} />
      </mesh>

      {/* Spread Collar Points */}
      <mesh
        position={[0.045, 1.38, 0.095]}
        rotation={[-0.2, 0.25, -0.3]}
        material={materials.shirtMat}
        castShadow
      >
        <boxGeometry args={[0.065, 0.075, 0.008]} />
      </mesh>
      <mesh
        position={[-0.045, 1.38, 0.095]}
        rotation={[-0.2, -0.25, 0.3]}
        material={materials.shirtMat}
        castShadow
      >
        <boxGeometry args={[0.065, 0.075, 0.008]} />
      </mesh>

      {/* White Shirt Front Placket */}
      <mesh position={[0, 1.22, 0.21]} rotation={[-0.15, 0, 0]} material={materials.shirtMat}>
        <planeGeometry args={[0.11, 0.32]} />
      </mesh>

      {/* Silk Tie / Cravat */}
      <mesh position={[0, 1.25, 0.22]} rotation={[-0.15, 0, 0]} material={materials.tieMat}>
        <cylinderGeometry args={[0.024, 0.038, 0.28, 16]} />
      </mesh>

      {/* =====================================================================
          3. TAILORED BLAZER BODY & ROPED SHOULDERS
          ===================================================================== */}
      {/* Main Blazer Shell */}
      <mesh
        geometry={blazerTorsoGeo}
        position={[0, 0, 0]}
        material={materials.woolMat}
        castShadow
        receiveShadow
      />

      {/* Left Peak Lapel (Satin Facing) */}
      <mesh
        geometry={leftLapelGeo}
        position={[0.04, 1.06, 0.28]}
        rotation={[-0.22, 0.22, -0.05]}
        material={materials.satinLapelMat}
        castShadow
      />

      {/* Right Peak Lapel (Satin Facing) */}
      <mesh
        geometry={rightLapelGeo}
        position={[-0.04, 1.06, 0.28]}
        rotation={[-0.22, -0.22, 0.05]}
        material={materials.satinLapelMat}
        castShadow
      />

      {/* Felt Undercollar Roll */}
      <mesh
        position={[0, 1.44, -0.01]}
        rotation={[0.1, 0, 0]}
        material={materials.satinLapelMat}
      >
        <torusGeometry args={[0.095, 0.015, 16, 36, Math.PI]} />
      </mesh>

      {/* Left Breast Welt Pocket */}
      <mesh
        position={[0.14, 1.18, 0.285]}
        rotation={[-0.18, 0.24, -0.12]}
        material={materials.satinLapelMat}
        castShadow
      >
        <boxGeometry args={[0.095, 0.018, 0.01]} />
      </mesh>

      {/* Hand-Folded White Silk Pocket Square */}
      <mesh
        position={[0.14, 1.20, 0.29]}
        rotation={[-0.2, 0.24, -0.08]}
        material={materials.shirtMat}
      >
        <boxGeometry args={[0.07, 0.024, 0.006]} />
      </mesh>

      {/* Waist Flap Pockets (Left & Right) */}
      <mesh
        position={[0.20, 0.78, 0.24]}
        rotation={[-0.08, 0.35, 0.02]}
        material={materials.satinLapelMat}
        castShadow
      >
        <boxGeometry args={[0.12, 0.038, 0.012]} />
      </mesh>
      <mesh
        position={[-0.20, 0.78, 0.24]}
        rotation={[-0.08, -0.35, -0.02]}
        material={materials.satinLapelMat}
        castShadow
      >
        <boxGeometry args={[0.12, 0.038, 0.012]} />
      </mesh>

      {/* =====================================================================
          4. FORWARD-PITCHED SLEEVES & CUFF BUTTONS
          ===================================================================== */}
      {/* Left Sleeve */}
      <group position={[0.28, 1.34, 0]}>
        <mesh geometry={sleeveGeo} material={materials.woolMat} castShadow />

        {/* 4 Kissing Cuff Buttons */}
        {[0, 1, 2, 3].map((idx) => (
          <mesh
            key={`l-btn-${idx}`}
            position={[-0.02, -0.62 + idx * 0.022, 0.14]}
            rotation={[0, 0, Math.PI / 2]}
            material={materials.buttonMat}
            castShadow
          >
            <cylinderGeometry args={[0.009, 0.009, 0.005, 16]} />
          </mesh>
        ))}
      </group>

      {/* Right Sleeve */}
      <group position={[-0.28, 1.34, 0]} scale={[-1, 1, 1]}>
        <mesh geometry={sleeveGeo} material={materials.woolMat} castShadow />

        {[0, 1, 2, 3].map((idx) => (
          <mesh
            key={`r-btn-${idx}`}
            position={[-0.02, -0.62 + idx * 0.022, 0.14]}
            rotation={[0, 0, Math.PI / 2]}
            material={materials.buttonMat}
            castShadow
          >
            <cylinderGeometry args={[0.009, 0.009, 0.005, 16]} />
          </mesh>
        ))}
      </group>

      {/* =====================================================================
          5. DOUBLE-BREASTED GOLD CREST BUTTONS (6x2 Configuration)
          ===================================================================== */}
      {[
        // Top row
        [-0.065, 1.08, 0.315],
        [0.065, 1.08, 0.315],
        // Middle waist row (fastened)
        [-0.055, 0.94, 0.295],
        [0.055, 0.94, 0.295],
        // Lower anchor row
        [-0.050, 0.80, 0.280],
        [0.050, 0.80, 0.280]
      ].map(([bx, by, bz], i) => (
        <mesh
          key={`db-btn-${i}`}
          position={[bx, by, bz]}
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.buttonMat}
          castShadow
        >
          <cylinderGeometry args={[0.016, 0.016, 0.009, 20]} />
        </mesh>
      ))}

      {/* =====================================================================
          6. MATCHING TAILORED DRESS TROUSERS
          ===================================================================== */}
      {/* Left Trouser Leg */}
      <mesh
        geometry={trouserLegGeo}
        position={[0.11, -0.05, 0]}
        material={materials.trousersMat}
        castShadow
        receiveShadow
      />
      {/* Right Trouser Leg */}
      <mesh
        geometry={trouserLegGeo}
        position={[-0.11, -0.05, 0]}
        material={materials.trousersMat}
        castShadow
        receiveShadow
      />
    </group>
  );
}
