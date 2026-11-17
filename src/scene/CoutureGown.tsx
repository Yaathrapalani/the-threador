import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { XRayStage } from '../types';

interface CoutureGownProps {
  stage?: 'A' | 'B' | 'C' | 'D' | 'E';
  xrayMode?: XRayStage;
  xrayProgress?: number; // 0 (finished) -> 1 (construction) -> 2 (textile)
}

export function CoutureGown({
  xrayMode = 'finished'
}: CoutureGownProps) {
  const organzaRef = useRef<THREE.Mesh>(null);
  const vinesGroupRef = useRef<THREE.Group>(null);

  // Subtle natural fabric breathing animation in idle/rotation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (organzaRef.current) {
      organzaRef.current.rotation.y = Math.sin(t * 0.5) * 0.015;
    }
  });

  // 1. PBR MATERIALS FOR HAUTE COUTURE FABRIC
  const materials = useMemo(() => {
    const isConstruction = xrayMode === 'construction';
    const isTextile = xrayMode === 'textile';

    // Bodice Silk Faille Material
    const bodiceMat = new THREE.MeshPhysicalMaterial({
      color: isConstruction ? '#1f272e' : isTextile ? '#2b231c' : '#f9f5ed',
      roughness: isConstruction ? 0.9 : 0.42,
      metalness: 0.04,
      clearcoat: isConstruction ? 0 : 0.35,
      clearcoatRoughness: 0.25,
      sheen: 0.85,
      sheenColor: new THREE.Color('#fff2dd'),
      sheenRoughness: 0.35,
      wireframe: isConstruction,
      side: THREE.DoubleSide
    });

    // Outer Translucent Silk Organza Skirt
    const organzaMat = new THREE.MeshPhysicalMaterial({
      color: isConstruction ? '#384654' : isTextile ? '#3a2d24' : '#fbf7ee',
      transmission: isConstruction ? 0.85 : 0.62, // Real physical transmission through sheer organza
      opacity: isConstruction ? 0.35 : 0.96,
      transparent: true,
      roughness: 0.26,
      ior: 1.48, // Silk refractive index
      thickness: 0.6,
      sheen: 1.0,
      sheenColor: new THREE.Color('#faebd0'),
      sheenRoughness: 0.28,
      wireframe: isConstruction,
      side: THREE.DoubleSide
    });

    // Underskirt foundation layer
    const underskirtMat = new THREE.MeshStandardMaterial({
      color: isConstruction ? '#14181c' : '#ede2d0',
      roughness: 0.72,
      wireframe: isConstruction,
      side: THREE.DoubleSide
    });

    // Botanical Gold & Silk Embroidery Thread
    const embroideryMat = new THREE.MeshStandardMaterial({
      color: isTextile ? '#e8b858' : '#c9ab6e',
      roughness: 0.32,
      metalness: isTextile ? 0.75 : 0.48,
      wireframe: false
    });

    // Pearl Cabochon Nacre Material
    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: '#fffef9',
      roughness: 0.12,
      metalness: 0.08,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
      sheen: 0.9,
      sheenColor: new THREE.Color('#ffeed9')
    });

    // Internal Boning / Pattern Seamlines Material (for X-Ray)
    const boningMat = new THREE.MeshStandardMaterial({
      color: isConstruction ? '#58d5d3' : '#c7ab77',
      metalness: isConstruction ? 0.9 : 0.6,
      roughness: 0.25,
      emissive: isConstruction ? new THREE.Color('#10383b') : new THREE.Color(0),
      emissiveIntensity: isConstruction ? 0.8 : 0
    });

    return {
      bodiceMat,
      organzaMat,
      underskirtMat,
      embroideryMat,
      pearlMat,
      boningMat
    };
  }, [xrayMode]);

  // 2. CORSET BODICE GEOMETRY (Anatomically contoured to waist & bust)
  const bodiceGeometry = useMemo(() => {
    // Generate curved profile from waist to neckline
    const points: THREE.Vector2[] = [
      new THREE.Vector2(0.19, 0.80),  // Waistline seam
      new THREE.Vector2(0.195, 0.86), // Low rib
      new THREE.Vector2(0.235, 0.98), // Mid ribcage
      new THREE.Vector2(0.278, 1.12), // Bust apex
      new THREE.Vector2(0.265, 1.22), // Sweetheart dip curve
      new THREE.Vector2(0.245, 1.28)  // Upper edge piping
    ];
    return new THREE.LatheGeometry(points, 48);
  }, []);

  // 3. PARAMETRIC FLUTED ORGANZA SKIRT GEOMETRY (Natural gravity folds)
  const organzaSkirtGeometry = useMemo(() => {
    const radialSegments = 72;
    const heightSegments = 36;
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    const height = 1.68; // Length of the skirt
    const topRadius = 0.19; // Meets bodice waist

    for (let yIdx = 0; yIdx <= heightSegments; yIdx++) {
      const v = yIdx / heightSegments;
      const y = 0.80 - v * height; // Extends from waist (0.80) to floor (-0.88)

      // Bell curve trumpet flare
      const flare = Math.pow(v, 1.65);
      const baseRadius = topRadius + flare * 0.76;

      for (let xIdx = 0; xIdx <= radialSegments; xIdx++) {
        const u = xIdx / radialSegments;
        const angle = u * Math.PI * 2;

        // Mathematical harmonic fluting folds (haute couture draping)
        const foldDisplacement =
          Math.sin(angle * 7) * 0.065 * flare +
          Math.cos(angle * 14 - v * 2) * 0.025 * flare +
          Math.sin(angle * 21) * 0.012 * flare;

        const r = Math.max(0.01, baseRadius + foldDisplacement);
        const px = Math.cos(angle) * r;
        const pz = Math.sin(angle) * r;

        positions.push(px, y, pz);
        uvs.push(u, v);
      }
    }

    const rowStride = radialSegments + 1;
    for (let yIdx = 0; yIdx < heightSegments; yIdx++) {
      for (let xIdx = 0; xIdx < radialSegments; xIdx++) {
        const a = yIdx * rowStride + xIdx;
        const b = (yIdx + 1) * rowStride + xIdx;
        const c = (yIdx + 1) * rowStride + (xIdx + 1);
        const d = yIdx * rowStride + (xIdx + 1);

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }, []);

  // 4. SECOND ORGANZA TIER (Petal overlay for dimensional depth)
  const organzaTierGeometry = useMemo(() => {
    const radialSegments = 64;
    const heightSegments = 24;
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    const height = 0.85; // Shorter overskirt peplum tier
    const topRadius = 0.192;

    for (let yIdx = 0; yIdx <= heightSegments; yIdx++) {
      const v = yIdx / heightSegments;
      const y = 0.80 - v * height;
      const flare = Math.pow(v, 1.4);
      const baseRadius = topRadius + flare * 0.44;

      for (let xIdx = 0; xIdx <= radialSegments; xIdx++) {
        const u = xIdx / radialSegments;
        const angle = u * Math.PI * 2;
        const foldDisplacement = Math.sin(angle * 9 + 0.4) * 0.045 * flare;
        const r = baseRadius + foldDisplacement;

        positions.push(Math.cos(angle) * r, y, Math.sin(angle) * r);
        uvs.push(u, v);
      }
    }

    const stride = radialSegments + 1;
    for (let y = 0; y < heightSegments; y++) {
      for (let x = 0; x < radialSegments; x++) {
        const a = y * stride + x;
        const b = (y + 1) * stride + x;
        const c = (y + 1) * stride + (x + 1);
        const d = y * stride + (x + 1);
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // 5. UNDERSKIRT INNER FOUNDATION
  const underskirtGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.188, 0.65, 1.62, 48, 1, true);
  }, []);

  // 6. 3D STRUCTURAL CORSETRY BONING RIBS (8 channels catching light)
  const boningRibs = useMemo(() => {
    const ribs: { position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }[] = [];
    const count = 10;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 0.22;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      ribs.push({
        position: [x, 1.04, z],
        rotation: [0, -angle, 0],
        scale: [1, 1, 1]
      });
    }
    return ribs;
  }, []);

  // 7. BOTANICAL EMBROIDERY SPLINES & LEAF APPLIQUÉS
  const { embroideryTubes, pearlPositions } = useMemo(() => {
    const tubes: THREE.TubeGeometry[] = [];
    const pearls: [number, number, number][] = [];

    // Curve 1: Bodice asymmetrical botanical vine wrapping from shoulder diagonally across bust to waist
    const vinePoints1 = [
      new THREE.Vector3(0.08, 1.27, 0.22),
      new THREE.Vector3(0.18, 1.20, 0.20),
      new THREE.Vector3(0.24, 1.10, 0.16),
      new THREE.Vector3(0.22, 0.98, 0.14),
      new THREE.Vector3(0.12, 0.88, 0.18),
      new THREE.Vector3(0.02, 0.81, 0.20),
      new THREE.Vector3(-0.09, 0.72, 0.24),
      new THREE.Vector3(-0.16, 0.58, 0.31),
      new THREE.Vector3(-0.21, 0.38, 0.42),
      new THREE.Vector3(-0.25, 0.10, 0.56),
      new THREE.Vector3(-0.28, -0.22, 0.68)
    ];
    const curve1 = new THREE.CatmullRomCurve3(vinePoints1);
    tubes.push(new THREE.TubeGeometry(curve1, 80, 0.0055, 8, false));

    // Curve 2: Branching secondary vine
    const vinePoints2 = [
      new THREE.Vector3(0.18, 1.20, 0.20),
      new THREE.Vector3(0.05, 1.14, 0.26),
      new THREE.Vector3(-0.06, 1.05, 0.25),
      new THREE.Vector3(-0.14, 0.94, 0.21),
      new THREE.Vector3(-0.08, 0.82, 0.19),
      new THREE.Vector3(0.06, 0.74, 0.26),
      new THREE.Vector3(0.16, 0.56, 0.35),
      new THREE.Vector3(0.22, 0.28, 0.48),
      new THREE.Vector3(0.26, -0.05, 0.60)
    ];
    const curve2 = new THREE.CatmullRomCurve3(vinePoints2);
    tubes.push(new THREE.TubeGeometry(curve2, 70, 0.0045, 8, false));

    // Curve 3: Waistline border garland
    const vinePoints3 = [
      new THREE.Vector3(-0.18, 0.80, 0.04),
      new THREE.Vector3(-0.14, 0.79, 0.15),
      new THREE.Vector3(0.0, 0.79, 0.20),
      new THREE.Vector3(0.14, 0.79, 0.15),
      new THREE.Vector3(0.18, 0.80, 0.04)
    ];
    const curve3 = new THREE.CatmullRomCurve3(vinePoints3);
    tubes.push(new THREE.TubeGeometry(curve3, 40, 0.004, 8, false));

    // Extract discrete pearl positions along curves (45 discrete pearl cabochons)
    const samplePoints1 = curve1.getPoints(24);
    samplePoints1.forEach((pt, idx) => {
      if (idx % 2 === 0) {
        // Offset pearl slightly outward from vine surface
        const normal = pt.clone().normalize().multiplyScalar(0.006);
        pearls.push([pt.x + normal.x, pt.y + normal.y, pt.z + normal.z]);
      }
    });

    const samplePoints2 = curve2.getPoints(18);
    samplePoints2.forEach((pt, idx) => {
      if (idx % 2 === 1) {
        const normal = pt.clone().normalize().multiplyScalar(0.006);
        pearls.push([pt.x + normal.x, pt.y + normal.y, pt.z + normal.z]);
      }
    });

    // Sweetheart neckline pearl trimming
    for (let i = 0; i < 16; i++) {
      const u = i / 15;
      const angle = (u - 0.5) * Math.PI * 0.75;
      const px = Math.sin(angle) * 0.25;
      const py = 1.26 - Math.abs(px) * 0.2;
      const pz = Math.cos(angle) * 0.25;
      pearls.push([px, py, pz]);
    }

    return { embroideryTubes: tubes, pearlPositions: pearls };
  }, []);

  return (
    <group position={[0, -0.65, 0]}>
      {/* 1. CORSET BODICE */}
      <mesh
        geometry={bodiceGeometry}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
        material={materials.bodiceMat}
      />

      {/* Sweetheart neckline hand-rolled piping */}
      <mesh position={[0, 1.27, 0]} material={materials.embroideryMat}>
        <torusGeometry args={[0.25, 0.006, 12, 48, Math.PI]} />
      </mesh>

      {/* 2. INNER FOUNDATION UNDERSKIRT */}
      <mesh
        geometry={underskirtGeometry}
        position={[0, 0.01, 0]}
        castShadow
        receiveShadow
        material={materials.underskirtMat}
      />

      {/* 3. PRIMARY CASCADE FLUTED ORGANZA SKIRT */}
      <mesh
        ref={organzaRef}
        geometry={organzaSkirtGeometry}
        position={[0, 0, 0]}
        castShadow
        material={materials.organzaMat}
      />

      {/* 4. MID-TIER ORGANZA PEPLUM OVERLAY */}
      <mesh
        geometry={organzaTierGeometry}
        position={[0, 0, 0]}
        castShadow
        material={materials.organzaMat}
      />

      {/* 5. STRUCTURAL BONING CHANNELS (Catching specular highlights / Glowing in X-Ray) */}
      <group>
        {boningRibs.map((rib, i) => (
          <mesh
            key={i}
            position={rib.position}
            rotation={rib.rotation}
            castShadow
            material={materials.boningMat}
          >
            <cylinderGeometry args={[0.0035, 0.0035, 0.44, 12]} />
          </mesh>
        ))}
      </group>

      {/* 6. BOTANICAL EMBROIDERY APPLIQUÉ VINES */}
      <group ref={vinesGroupRef}>
        {embroideryTubes.map((geom, idx) => (
          <mesh
            key={idx}
            geometry={geom}
            castShadow
            material={materials.embroideryMat}
          />
        ))}
      </group>

      {/* 7. INDIVIDUAL RIVER PEARL CABOCHONS (Real 3D spheres catching light) */}
      <group>
        {pearlPositions.map((pos, idx) => (
          <mesh
            key={idx}
            position={pos}
            castShadow
            material={materials.pearlMat}
          >
            <sphereGeometry args={[idx % 3 === 0 ? 0.011 : 0.008, 16, 16]} />
          </mesh>
        ))}
      </group>

      {/* 8. X-RAY CONSTRUCTION METRICS & PATTERN GRAINLINES */}
      {xrayMode === 'construction' && (
        <group>
          {/* Seam line circles at waist, hip, knee */}
          <mesh position={[0, 0.80, 0]}>
            <torusGeometry args={[0.20, 0.002, 8, 48]} />
            <meshBasicMaterial color="#58d5d3" />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <torusGeometry args={[0.34, 0.002, 8, 48]} />
            <meshBasicMaterial color="#58d5d3" />
          </mesh>
          <mesh position={[0, -0.30, 0]}>
            <torusGeometry args={[0.62, 0.002, 8, 48]} />
            <meshBasicMaterial color="#58d5d3" />
          </mesh>
        </group>
      )}

      {/* 9. TEXTILE MACRO WEAVE TENSION LATTICE */}
      {xrayMode === 'textile' && (
        <group position={[0, 0.25, 0.45]}>
          {/* Detailed micro-thread grid indicator */}
          <gridHelper args={[0.6, 24, '#c9ab6e', '#8a7246']} rotation={[Math.PI / 6, 0, 0]} />
        </group>
      )}
    </group>
  );
}

