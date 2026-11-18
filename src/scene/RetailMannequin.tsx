import { useMemo } from 'react';
import * as THREE from 'three';
import type { AtelierGender } from '../types';

export type MannequinFinish = 'porcelain-matte' | 'satin-white' | 'matte-graphite' | 'linen-brass';

interface RetailMannequinProps {
  gender?: AtelierGender;
  finish?: MannequinFinish;
  showHead?: boolean;
  showArms?: boolean;
  showLegs?: boolean;
  scale?: number;
}

/**
 * THE THREADOR — PROFESSIONAL RETAIL DISPLAY MANNEQUIN SYSTEM
 * Recreates the visual qualities of Reference 2:
 * - Smooth, faceless sculptural head with elegant human proportions
 * - Realistic neck-to-shoulder transition and natural trapezius slope
 * - Anatomically proportioned male, female, and juvenile torsos
 * - Natural arm positioning with refined mannequin hands
 * - Museum-grade display plinth with brass / obsidian hardware
 */
export function RetailMannequin({
  gender = 'women',
  finish = 'porcelain-matte',
  showHead = true,
  showArms = true,
  showLegs = true,
  scale = 1.0
}: RetailMannequinProps) {
  // 1. PBR DISPLAY FINISH MATERIALS
  const materials = useMemo(() => {
    let mainColor = '#f5f2eb'; // Porcelain matte ivory (default)
    let roughness = 0.62;
    let metalness = 0.02;

    if (finish === 'satin-white') {
      mainColor = '#fdfdfd';
      roughness = 0.35;
      metalness = 0.05;
    } else if (finish === 'matte-graphite') {
      mainColor = '#1d1b22';
      roughness = 0.75;
      metalness = 0.12;
    } else if (finish === 'linen-brass') {
      mainColor = '#ede8dd';
      roughness = 0.82;
      metalness = 0.02;
    }

    const bodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(mainColor),
      roughness,
      metalness,
      bumpScale: 0.005
    });

    const standHardwareMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d4af37'), // Satin champagne brass
      roughness: 0.22,
      metalness: 0.9
    });

    const plinthMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(finish === 'matte-graphite' ? '#121115' : '#18141f'),
      roughness: 0.45,
      metalness: 0.3
    });

    return { bodyMat, standHardwareMat, plinthMat };
  }, [finish]);

  // 2. ANATOMICAL HEAD & NECK GEOMETRY
  // Faceless egg-shaped retail mannequin head with refined jawline taper
  const { headGeo, neckGeo } = useMemo(() => {
    const isMale = gender === 'men';
    const isKid = gender === 'kids';

    // Scale factors for head
    const headRadiusX = isKid ? 0.092 : isMale ? 0.098 : 0.088;
    const headRadiusY = isKid ? 0.115 : isMale ? 0.132 : 0.125;

    // Head profile using Lathe geometry for smooth, seamless silhouette
    const headPoints: THREE.Vector2[] = [];
    const steps = 32;
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI; // 0 to PI
      const y = Math.cos(theta) * headRadiusY;
      // Anatomical profile: wider at temples/cranium, tapering toward chin
      const craniumTaper = y > 0 ? 1.0 : THREE.MathUtils.lerp(1.0, 0.65, Math.abs(y) / headRadiusY);
      const r = Math.sin(theta) * headRadiusX * craniumTaper;
      headPoints.push(new THREE.Vector2(Math.max(0.001, r), y));
    }
    const hGeo = new THREE.LatheGeometry(headPoints, 48);

    // Neck: graceful column expanding into trapezius and clavicle
    const neckTopR = isKid ? 0.048 : isMale ? 0.062 : 0.050;
    const neckBaseR = isKid ? 0.068 : isMale ? 0.088 : 0.072;
    const neckHeight = isKid ? 0.09 : isMale ? 0.12 : 0.13;
    const nGeo = new THREE.CylinderGeometry(neckTopR, neckBaseR, neckHeight, 36);

    return { headGeo: hGeo, neckGeo: nGeo };
  }, [gender]);

  // 3. ANATOMICAL TORSO GEOMETRIES
  const torsoGeo = useMemo(() => {
    const isMale = gender === 'men';
    const isKid = gender === 'kids';

    let points: THREE.Vector2[];

    if (isMale) {
      // Men's retail mannequin: broad shoulders, athletic chest, defined ribcage, subtle waist taper
      points = [
        new THREE.Vector2(0.001, 1.48), // Neck join
        new THREE.Vector2(0.082, 1.45), // Neck base
        new THREE.Vector2(0.165, 1.40), // Clavicle hollow
        new THREE.Vector2(0.265, 1.34), // Shoulder slope
        new THREE.Vector2(0.290, 1.28), // Deltoid cap
        new THREE.Vector2(0.285, 1.15), // Pectoral chest
        new THREE.Vector2(0.260, 1.00), // Ribcage
        new THREE.Vector2(0.235, 0.82), // Athletic waist
        new THREE.Vector2(0.245, 0.66), // Iliac crest
        new THREE.Vector2(0.255, 0.52), // Hip
        new THREE.Vector2(0.220, 0.38), // Pelvis base
        new THREE.Vector2(0.001, 0.36)
      ];
    } else if (isKid) {
      // Kids 6–8Y scale: soft juvenile torso, gentle chest, natural posture
      points = [
        new THREE.Vector2(0.001, 1.22),
        new THREE.Vector2(0.065, 1.20),
        new THREE.Vector2(0.125, 1.16),
        new THREE.Vector2(0.185, 1.12), // Compact shoulder width
        new THREE.Vector2(0.195, 1.05),
        new THREE.Vector2(0.190, 0.95), // Gentle chest
        new THREE.Vector2(0.185, 0.82),
        new THREE.Vector2(0.180, 0.70), // Subtle waist
        new THREE.Vector2(0.190, 0.58), // Hip
        new THREE.Vector2(0.170, 0.46),
        new THREE.Vector2(0.001, 0.44)
      ];
    } else {
      // Women's retail mannequin: elegant shoulder slope, bust apex, wasp waist, feminine hip flare
      points = [
        new THREE.Vector2(0.001, 1.48), // Neck join
        new THREE.Vector2(0.070, 1.45), // Neck base
        new THREE.Vector2(0.125, 1.39), // Collarbone slope
        new THREE.Vector2(0.225, 1.32), // Refined shoulder slope
        new THREE.Vector2(0.245, 1.24), // Upper bust
        new THREE.Vector2(0.265, 1.13), // Bust apex
        new THREE.Vector2(0.220, 0.98), // Lower ribcage
        new THREE.Vector2(0.180, 0.82), // Wasp waist
        new THREE.Vector2(0.210, 0.68), // High hip curve
        new THREE.Vector2(0.258, 0.52), // Full hip
        new THREE.Vector2(0.230, 0.36), // Pelvis
        new THREE.Vector2(0.001, 0.34)
      ];
    }

    return new THREE.LatheGeometry(points, 48);
  }, [gender]);

  // 4. LIMB GEOMETRIES (Shoulder Deltoids, Arms, and Hands)
  const armGeometry = useMemo(() => {
    const isMale = gender === 'men';
    const isKid = gender === 'kids';

    const rUpper = isKid ? 0.038 : isMale ? 0.058 : 0.046;
    const rLower = isKid ? 0.032 : isMale ? 0.048 : 0.038;
    const rWrist = isKid ? 0.024 : isMale ? 0.036 : 0.028;

    // Upper arm
    const upperGeo = new THREE.CylinderGeometry(rUpper, rLower, isKid ? 0.28 : 0.38, 24);
    // Forearm
    const foreGeo = new THREE.CylinderGeometry(rLower, rWrist, isKid ? 0.24 : 0.34, 24);
    // Elbow joint sphere
    const elbowGeo = new THREE.SphereGeometry(rLower * 1.05, 16, 16);
    // Hand: refined sculptural mannequin hand
    const palmGeo = new THREE.BoxGeometry(rWrist * 1.6, isKid ? 0.08 : 0.12, rWrist * 0.7);

    return { upperGeo, foreGeo, elbowGeo, palmGeo };
  }, [gender]);

  // 5. LEG & STAND GEOMETRY
  const legGeometry = useMemo(() => {
    const isMale = gender === 'men';
    const isKid = gender === 'kids';

    const rThigh = isKid ? 0.055 : isMale ? 0.082 : 0.072;
    const rKnee = isKid ? 0.044 : isMale ? 0.062 : 0.052;
    const rCalf = isKid ? 0.048 : isMale ? 0.068 : 0.056;
    const rAnkle = isKid ? 0.028 : isMale ? 0.038 : 0.032;

    const thighGeo = new THREE.CylinderGeometry(rThigh, rKnee, isKid ? 0.32 : 0.44, 24);
    const kneeGeo = new THREE.SphereGeometry(rKnee * 1.05, 16, 16);
    const calfGeo = new THREE.CylinderGeometry(rCalf, rAnkle, isKid ? 0.30 : 0.42, 24);

    return { thighGeo, kneeGeo, calfGeo };
  }, [gender]);

  const isMale = gender === 'men';
  const isKid = gender === 'kids';

  // Heights configuration
  const shoulderY = isKid ? 1.12 : isMale ? 1.34 : 1.32;
  const shoulderX = isKid ? 0.185 : isMale ? 0.285 : 0.235;
  const headY = isKid ? 1.35 : isMale ? 1.66 : 1.64;
  const neckY = isKid ? 1.24 : isMale ? 1.51 : 1.51;

  return (
    <group scale={scale}>
      {/* =====================================================================
          1. SCULPTURAL FACELESS RETAIL MANNEQUIN HEAD & NECK
          ===================================================================== */}
      {showHead && (
        <group position={[0, 0, 0]}>
          {/* Head: smoothly proportioned faceless mannequin */}
          <mesh
            geometry={headGeo}
            position={[0, headY, 0.015]}
            castShadow
            receiveShadow
            material={materials.bodyMat}
          />

          {/* Neck: clean anatomical column */}
          <mesh
            geometry={neckGeo}
            position={[0, neckY, 0.005]}
            castShadow
            receiveShadow
            material={materials.bodyMat}
          />
        </group>
      )}

      {/* =====================================================================
          2. ANATOMICAL TORSO
          ===================================================================== */}
      <mesh
        geometry={torsoGeo}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
        material={materials.bodyMat}
      />

      {/* =====================================================================
          3. ARTICULATED MANNEQUIN ARMS & REFINED HANDS
          ===================================================================== */}
      {showArms && (
        <group>
          {/* Left Arm (Relaxed natural mannequin posture) */}
          <group position={[shoulderX, shoulderY, 0]}>
            {/* Shoulder Deltoid Joint */}
            <mesh
              castShadow
              material={materials.bodyMat}
              position={[0, 0, 0]}
            >
              <sphereGeometry args={[isKid ? 0.042 : isMale ? 0.065 : 0.052, 20, 20]} />
            </mesh>

            {/* Upper Arm */}
            <group rotation={[0.08, 0, -0.12]}>
              <mesh
                geometry={armGeometry.upperGeo}
                position={[0, isKid ? -0.14 : -0.19, 0]}
                castShadow
                receiveShadow
                material={materials.bodyMat}
              />

              {/* Elbow Joint */}
              <group position={[0, isKid ? -0.28 : -0.38, 0]}>
                <mesh geometry={armGeometry.elbowGeo} castShadow material={materials.bodyMat} />

                {/* Forearm angled gently inward */}
                <group rotation={[0.18, 0, 0.1]}>
                  <mesh
                    geometry={armGeometry.foreGeo}
                    position={[0, isKid ? -0.12 : -0.17, 0]}
                    castShadow
                    receiveShadow
                    material={materials.bodyMat}
                  />

                  {/* Refined Hand */}
                  <mesh
                    geometry={armGeometry.palmGeo}
                    position={[0, isKid ? -0.26 : -0.36, 0.01]}
                    rotation={[-0.1, 0, -0.05]}
                    castShadow
                    material={materials.bodyMat}
                  />
                </group>
              </group>
            </group>
          </group>

          {/* Right Arm (Mirror posture) */}
          <group position={[-shoulderX, shoulderY, 0]}>
            <mesh castShadow material={materials.bodyMat}>
              <sphereGeometry args={[isKid ? 0.042 : isMale ? 0.065 : 0.052, 20, 20]} />
            </mesh>

            <group rotation={[0.08, 0, 0.12]}>
              <mesh
                geometry={armGeometry.upperGeo}
                position={[0, isKid ? -0.14 : -0.19, 0]}
                castShadow
                receiveShadow
                material={materials.bodyMat}
              />

              <group position={[0, isKid ? -0.28 : -0.38, 0]}>
                <mesh geometry={armGeometry.elbowGeo} castShadow material={materials.bodyMat} />

                <group rotation={[0.18, 0, -0.1]}>
                  <mesh
                    geometry={armGeometry.foreGeo}
                    position={[0, isKid ? -0.12 : -0.17, 0]}
                    castShadow
                    receiveShadow
                    material={materials.bodyMat}
                  />

                  <mesh
                    geometry={armGeometry.palmGeo}
                    position={[0, isKid ? -0.26 : -0.36, 0.01]}
                    rotation={[-0.1, 0, 0.05]}
                    castShadow
                    material={materials.bodyMat}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      )}

      {/* =====================================================================
          4. LEGS & LOWER BODY (Where full mannequin is displayed)
          ===================================================================== */}
      {showLegs && (
        <group position={[0, 0, 0]}>
          {/* Left Leg */}
          <group position={[isKid ? 0.07 : isMale ? 0.11 : 0.09, 0.36, 0]}>
            <mesh
              geometry={legGeometry.thighGeo}
              position={[0, isKid ? -0.16 : -0.22, 0]}
              castShadow
              receiveShadow
              material={materials.bodyMat}
            />
            <mesh
              geometry={legGeometry.kneeGeo}
              position={[0, isKid ? -0.32 : -0.44, 0]}
              castShadow
              material={materials.bodyMat}
            />
            <mesh
              geometry={legGeometry.calfGeo}
              position={[0, isKid ? -0.47 : -0.65, 0]}
              castShadow
              receiveShadow
              material={materials.bodyMat}
            />
          </group>

          {/* Right Leg */}
          <group position={[isKid ? -0.07 : isMale ? -0.11 : -0.09, 0.36, 0]}>
            <mesh
              geometry={legGeometry.thighGeo}
              position={[0, isKid ? -0.16 : -0.22, 0]}
              castShadow
              receiveShadow
              material={materials.bodyMat}
            />
            <mesh
              geometry={legGeometry.kneeGeo}
              position={[0, isKid ? -0.32 : -0.44, 0]}
              castShadow
              material={materials.bodyMat}
            />
            <mesh
              geometry={legGeometry.calfGeo}
              position={[0, isKid ? -0.47 : -0.65, 0]}
              castShadow
              receiveShadow
              material={materials.bodyMat}
            />
          </group>
        </group>
      )}

      {/* =====================================================================
          5. ARCHITECTURAL SHOWROOM DISPLAY PLINTH
          ===================================================================== */}
      <group position={[0, -0.65, 0]}>
        {/* Heavy display pedestal base */}
        <mesh position={[0, -0.55, 0]} castShadow receiveShadow material={materials.plinthMat}>
          <cylinderGeometry args={[0.38, 0.42, 0.06, 64]} />
        </mesh>

        {/* Satin Champagne Brass Trim Ring */}
        <mesh position={[0, -0.518, 0]} castShadow material={materials.standHardwareMat}>
          <torusGeometry args={[0.36, 0.009, 16, 64]} />
        </mesh>

        {/* Vertical support rod behind mannequin */}
        <mesh position={[0, 0.15, -0.15]} castShadow material={materials.standHardwareMat}>
          <cylinderGeometry args={[0.018, 0.018, 1.35, 32]} />
        </mesh>
      </group>
    </group>
  );
}
