import { useMemo } from 'react';
import * as THREE from 'three';

interface KidsFestiveJacketProps {
  colorway?: string;
  wireframe?: boolean;
}

/**
 * KidsFestiveJacket
 * Tailored children's royal velvet bandhgala jacket (approx 6–8Y scale).
 * Proportioned with soft shoulders and relaxed armholes for boys' celebration wear.
 */
export function KidsFestiveJacket({
  colorway = '#131C2B', // Royal Midnight Navy
  wireframe = false
}: KidsFestiveJacketProps) {
  // PBR Materials for Kids' Royal Velvet Bandhgala
  const materials = useMemo(() => {
    // 1. Deep-pile English cotton velvet
    const velvetMat = new THREE.MeshStandardMaterial({
      color: colorway,
      roughness: 0.76,
      metalness: 0.05,
      wireframe: wireframe
    });

    // 2. Hand Zardozi Gold Piping & Collar Trim
    const zardoziMat = new THREE.MeshStandardMaterial({
      color: '#D4AF37',
      metalness: 0.88,
      roughness: 0.26,
      wireframe: wireframe
    });

    // 3. Faceted Antique Brass Crest Buttons
    const buttonMat = new THREE.MeshStandardMaterial({
      color: '#C7AA83',
      metalness: 0.92,
      roughness: 0.22
    });

    // 4. Pure Silk Pocket Square
    const silkSquareMat = new THREE.MeshStandardMaterial({
      color: '#EEE7DC',
      roughness: 0.35,
      metalness: 0.1
    });

    return { velvetMat, zardoziMat, buttonMat, silkSquareMat };
  }, [colorway, wireframe]);

  // Torso geometry tailored for child's posture
  const jacketTorsoGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [
      new THREE.Vector2(0.082, 1.05), // Collar stand base
      new THREE.Vector2(0.198, 0.98), // Shoulder seam
      new THREE.Vector2(0.208, 0.90), // Chest
      new THREE.Vector2(0.202, 0.75), // Mid-torso
      new THREE.Vector2(0.205, 0.58), // Lower waist
      new THREE.Vector2(0.218, 0.38), // Jacket hem flare
      new THREE.Vector2(0.001, 0.38)  // Center bottom
    ];
    return new THREE.LatheGeometry(points, 40);
  }, []);

  return (
    <group position={[0, -0.15, 0]}>
      {/* 1. MAIN JACKET TORSO */}
      <mesh
        geometry={jacketTorsoGeometry}
        material={materials.velvetMat}
        castShadow
        receiveShadow
      />

      {/* 2. CONTOURED MANDARIN COLLAR STAND */}
      <group position={[0, 1.05, 0]}>
        <mesh material={materials.velvetMat}>
          <cylinderGeometry args={[0.078, 0.082, 0.045, 32]} />
        </mesh>
        {/* Gold Zardozi Collar Piping */}
        <mesh position={[0, 0.022, 0]} material={materials.zardoziMat}>
          <torusGeometry args={[0.078, 0.0035, 12, 32]} />
        </mesh>
      </group>

      {/* 3. STRUCTURED SOFT SHOULDERS & SLEEVES */}
      {/* Left Sleeve */}
      <mesh position={[-0.22, 0.78, 0]} rotation={[0, 0, -0.15]} material={materials.velvetMat} castShadow>
        <cylinderGeometry args={[0.058, 0.048, 0.42, 24]} />
      </mesh>
      {/* Right Sleeve */}
      <mesh position={[0.22, 0.78, 0]} rotation={[0, 0, 0.15]} material={materials.velvetMat} castShadow>
        <cylinderGeometry args={[0.058, 0.048, 0.42, 24]} />
      </mesh>

      {/* 4. CONCEALED FRONT PLACKET WITH BUTTONS */}
      <mesh position={[0, 0.70, 0.204]} material={materials.zardoziMat}>
        <boxGeometry args={[0.012, 0.65, 0.004]} />
      </mesh>

      {/* 5. SEVEN FACETED CREST BUTTONS */}
      {[0.98, 0.90, 0.82, 0.74, 0.66, 0.58, 0.50].map((yPos, idx) => (
        <mesh key={idx} position={[0, yPos, 0.208]} rotation={[Math.PI / 2, 0, 0]} material={materials.buttonMat}>
          <cylinderGeometry args={[0.0075, 0.0075, 0.004, 16]} />
        </mesh>
      ))}

      {/* 6. BREAST WELT POCKET & SILK POCKET SQUARE */}
      <group position={[0.088, 0.88, 0.198]} rotation={[0, 0.2, 0]}>
        <mesh material={materials.velvetMat}>
          <boxGeometry args={[0.065, 0.012, 0.008]} />
        </mesh>
        {/* Folded Ivory Silk Square Peak */}
        <mesh position={[0, 0.014, 0]} rotation={[0, Math.PI / 4, 0]} material={materials.silkSquareMat}>
          <coneGeometry args={[0.018, 0.024, 4]} />
        </mesh>
      </group>
    </group>
  );
}
