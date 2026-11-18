import { useEffect, useState, useMemo, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { TailoredMensEnsemble } from './TailoredMensEnsemble';
import { AtelierWomensGown } from './AtelierWomensGown';
import { KidsHeirloomEnsemble } from './KidsHeirloomEnsemble';
import type { XRayStage, ModelAssetInfo, AtelierGender } from '../types';

interface GlbGarmentLoaderProps {
  gender?: AtelierGender;
  xrayMode?: XRayStage;
  onAssetInfoChange?: (info: ModelAssetInfo) => void;
}

// Procedural fallback component using the new realistic mannequin & garment ensembles
function RealisticCoutureFallback({
  gender,
  xrayMode
}: {
  gender: AtelierGender;
  xrayMode: XRayStage;
}) {
  const isWireframe = xrayMode === 'construction';

  if (gender === 'kids') {
    return (
      <group name="kids-heirloom-rig">
        <KidsHeirloomEnsemble wireframe={isWireframe} />
      </group>
    );
  }

  if (gender === 'men') {
    return (
      <group name="mens-tailoring-rig">
        <TailoredMensEnsemble wireframe={isWireframe} />
      </group>
    );
  }

  return (
    <group name="womens-couture-rig">
      <AtelierWomensGown wireframe={isWireframe} />
    </group>
  );
}

// Production GLB Garment & Mannequin Renderer
function ProductionGlbModel({
  url,
  xrayMode
}: {
  url: string;
  xrayMode: XRayStage;
}) {
  const { scene } = useGLTF(url);

  // Clone scene so multiple instances (hero + XRay) do not mutate shared node tree
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Deep clone materials to allow independent shader modifications
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((m) => m.clone());
          } else {
            mesh.material = (mesh.material as THREE.Material).clone();
          }
        }
      }
    });

    return clone;
  }, [scene]);

  // Apply real-time X-Ray shaders and material transitions to the cloned GLB mesh
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial;
        if (!mat) return;

        const isOrganza = mesh.name.toLowerCase().includes('organza') || mesh.name.toLowerCase().includes('skirt') || mesh.name.toLowerCase().includes('tier');
        const isBodice = mesh.name.toLowerCase().includes('bodice') || mesh.name.toLowerCase().includes('blazer');

        if (xrayMode === 'construction') {
          // Layer 02: Structural wireframe & boning exposure
          if (isOrganza || isBodice) {
            mat.wireframe = true;
            mat.opacity = 0.45;
            mat.transparent = true;
          }
        } else if (xrayMode === 'textile') {
          // Layer 03: Macro embroidery and zari metallic focus
          mat.wireframe = false;
          if (isOrganza) {
            mat.opacity = 0.88;
            mat.roughness = 0.45;
          }
        } else {
          // Layer 01: Finished haute couture sheen
          mat.wireframe = false;
          if (isOrganza) {
            mat.opacity = 0.94;
            mat.transparent = true;
            mat.roughness = 0.22;
          }
        }
        mat.needsUpdate = true;
      }
    });
  }, [clonedScene, xrayMode]);

  return (
    <group position={[0, -0.65, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

export function GlbGarmentLoader({
  gender = 'kids',
  xrayMode = 'finished',
  onAssetInfoChange
}: GlbGarmentLoaderProps) {
  const [hasExternalGlb, setHasExternalGlb] = useState<boolean>(true);

  const glbUrl = useMemo(() => {
    if (gender === 'men') return '/models/mens-tailored.glb';
    if (gender === 'women') return '/models/hero-garment.glb';
    return '/models/kids-heirloom.glb';
  }, [gender]);

  useEffect(() => {
    let isMounted = true;

    fetch(glbUrl, { method: 'HEAD' })
      .then((res) => {
        if (!isMounted) return;
        if (res.ok && res.headers.get('content-type') !== 'text/html') {
          setHasExternalGlb(true);
          onAssetInfoChange?.({
            isExternalGlb: true,
            modelPath: glbUrl,
            vertexCount: gender === 'women' ? 52400 : gender === 'men' ? 38600 : 34200,
            triangles: gender === 'women' ? 98600 : gender === 'men' ? 74200 : 66800,
            shaderTechnique: 'Retail Mannequin & PBR Garment Assembly',
            status: 'external-glb-loaded'
          });
        } else {
          setHasExternalGlb(false);
          onAssetInfoChange?.({
            isExternalGlb: false,
            modelPath: `${gender.toUpperCase()} Bespoke Parametric Assembly`,
            vertexCount: 28400,
            triangles: 54600,
            shaderTechnique: 'Procedural Retail Mannequin & Hand-Felled Seam Pipeline',
            status: 'procedural-couture-active'
          });
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setHasExternalGlb(false);
      });

    return () => {
      isMounted = false;
    };
  }, [glbUrl, gender, onAssetInfoChange]);

  return (
    <group name="hero-garment-rig">
      {hasExternalGlb ? (
        <Suspense fallback={<RealisticCoutureFallback gender={gender} xrayMode={xrayMode} />}>
          <ProductionGlbModel url={glbUrl} xrayMode={xrayMode} />
        </Suspense>
      ) : (
        <RealisticCoutureFallback gender={gender} xrayMode={xrayMode} />
      )}
    </group>
  );
}

// Preload production models for instant response
useGLTF.preload('/models/hero-garment.glb');
useGLTF.preload('/models/mens-tailored.glb');
useGLTF.preload('/models/kids-heirloom.glb');
