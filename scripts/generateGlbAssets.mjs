// Polyfill FileReader before importing Three.js modules
class NodeFileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (typeof this.onloadend === 'function') {
        this.onloadend();
      }
      if (typeof this.onload === 'function') {
        this.onload({ target: this });
      }
    });
  }
}
globalThis.FileReader = NodeFileReader;

import fs from 'node:fs';
import path from 'node:path';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('--- Generating The Threador Production 3D GLB Assets ---');

const modelsDir = path.resolve('public/models');
fs.mkdirSync(modelsDir, { recursive: true });

function exportSceneToGlb(scene, outputPath) {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (gltf) => {
        if (gltf instanceof ArrayBuffer) {
          fs.writeFileSync(outputPath, Buffer.from(gltf));
          const sizeKb = (fs.statSync(outputPath).size / 1024).toFixed(1);
          console.log(`✓ Exported: ${outputPath} (${sizeKb} KB)`);
          resolve(outputPath);
        } else {
          console.error('Expected ArrayBuffer for binary GLB, got JSON');
          reject(new Error('GLTF is not binary'));
        }
      },
      (error) => {
        console.error(`Error exporting ${outputPath}:`, error);
        reject(error);
      },
      { binary: true, embedImages: true }
    );
  });
}

// ==============================================================================
// 1. HERO COUTURE GOWN & MANNEQUIN (THREADOR-W-001)
// ==============================================================================
function buildHeroGownScene() {
  const scene = new THREE.Scene();
  scene.name = 'TheThreador_HeroCoutureGown_W001';

  // 1.1 Parisian Couture Dressform Mannequin
  const mannequinGroup = new THREE.Group();
  mannequinGroup.name = 'ParisianMannequin';

  const linenMat = new THREE.MeshStandardMaterial({
    name: 'FrenchLinen_Canvas',
    color: new THREE.Color('#ede7dc'),
    roughness: 0.82,
    metalness: 0.04
  });

  const brassMat = new THREE.MeshStandardMaterial({
    name: 'SatinBrushed_Brass',
    color: new THREE.Color('#c8ad78'),
    roughness: 0.28,
    metalness: 0.88
  });

  const baseMat = new THREE.MeshStandardMaterial({
    name: 'CastIron_Matte',
    color: new THREE.Color('#221f1c'),
    roughness: 0.42,
    metalness: 0.65
  });

  // Base and Pole
  const basePlinth = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.38, 0.05, 48), baseMat);
  basePlinth.position.y = -1.25;
  mannequinGroup.add(basePlinth);

  const baseTrim = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.012, 16, 48), brassMat);
  baseTrim.position.y = -1.22;
  baseTrim.rotation.x = Math.PI / 2;
  mannequinGroup.add(baseTrim);

  const verticalPole = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.8, 32), brassMat);
  verticalPole.position.y = -0.35;
  mannequinGroup.add(verticalPole);

  const knurledCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.08, 24), brassMat);
  knurledCollar.position.y = -0.25;
  mannequinGroup.add(knurledCollar);

  // Anatomically proportioned Torso Profile
  const torsoPoints = [
    new THREE.Vector2(0.001, 1.48),
    new THREE.Vector2(0.075, 1.45),
    new THREE.Vector2(0.12, 1.38),
    new THREE.Vector2(0.24, 1.30),
    new THREE.Vector2(0.26, 1.22),
    new THREE.Vector2(0.275, 1.12),
    new THREE.Vector2(0.23, 0.98),
    new THREE.Vector2(0.185, 0.82),
    new THREE.Vector2(0.21, 0.68),
    new THREE.Vector2(0.265, 0.52),
    new THREE.Vector2(0.24, 0.36),
    new THREE.Vector2(0.16, 0.22),
    new THREE.Vector2(0.001, 0.20)
  ];
  const torsoGeo = new THREE.LatheGeometry(torsoPoints, 48);
  const torsoMesh = new THREE.Mesh(torsoGeo, linenMat);
  mannequinGroup.add(torsoMesh);

  // Neck Finial
  const neckCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.082, 0.02, 32), brassMat);
  neckCollar.position.y = 1.45;
  mannequinGroup.add(neckCollar);

  const neckSpindle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.075, 0.12, 32), brassMat);
  neckSpindle.position.y = 1.54;
  mannequinGroup.add(neckSpindle);

  const finialBall = new THREE.Mesh(new THREE.SphereGeometry(0.048, 24, 24), brassMat);
  finialBall.position.y = 1.62;
  mannequinGroup.add(finialBall);

  scene.add(mannequinGroup);

  // 1.2 The Haute Couture Garment (Bodice, Organza Fluted Skirt, Peplum, Pearls, Boning)
  const garmentGroup = new THREE.Group();
  garmentGroup.name = 'CoutureGarment_ChampagneGown';

  // Bodice Material
  const bodiceMat = new THREE.MeshStandardMaterial({
    name: 'SilkFaille_Champagne',
    color: new THREE.Color('#f9f5ed'),
    roughness: 0.42,
    metalness: 0.04
  });

  // Translucent Organza Skirt Material
  const organzaMat = new THREE.MeshPhysicalMaterial({
    name: 'MulberryOrganza_Translucent',
    color: new THREE.Color('#fbf7ee'),
    transmission: 0.65,
    opacity: 0.95,
    transparent: true,
    roughness: 0.28,
    ior: 1.48,
    thickness: 0.5,
    side: THREE.DoubleSide
  });

  const goldEmbroideryMat = new THREE.MeshStandardMaterial({
    name: 'ZariGold_Thread',
    color: new THREE.Color('#c9ab6e'),
    roughness: 0.32,
    metalness: 0.65
  });

  const pearlMat = new THREE.MeshStandardMaterial({
    name: 'Nacre_FreshwaterPearl',
    color: new THREE.Color('#fffef9'),
    roughness: 0.14,
    metalness: 0.1
  });

  // Bodice Mesh
  const bodicePoints = [
    new THREE.Vector2(0.19, 0.80),
    new THREE.Vector2(0.195, 0.86),
    new THREE.Vector2(0.235, 0.98),
    new THREE.Vector2(0.278, 1.12),
    new THREE.Vector2(0.265, 1.22),
    new THREE.Vector2(0.245, 1.28)
  ];
  const bodiceMesh = new THREE.Mesh(new THREE.LatheGeometry(bodicePoints, 48), bodiceMat);
  garmentGroup.add(bodiceMesh);

  // Sweetheart neckline trim
  const neckTrim = new THREE.Mesh(new THREE.TorusGeometry(0.255, 0.008, 16, 48), goldEmbroideryMat);
  neckTrim.position.y = 1.26;
  neckTrim.rotation.x = Math.PI / 2;
  garmentGroup.add(neckTrim);

  // Parametric Fluted Organza Main Skirt
  const radialSegments = 72;
  const heightSegments = 36;
  const positions = [];
  const uvs = [];
  const indices = [];

  const height = 1.68;
  const topRadius = 0.19;

  for (let yIdx = 0; yIdx <= heightSegments; yIdx++) {
    const v = yIdx / heightSegments;
    const y = 0.80 - v * height;
    const flare = Math.pow(v, 1.65);
    const baseRadius = topRadius + flare * 0.76;

    for (let xIdx = 0; xIdx <= radialSegments; xIdx++) {
      const u = xIdx / radialSegments;
      const angle = u * Math.PI * 2;
      const foldDisplacement =
        Math.sin(angle * 7) * 0.065 * flare +
        Math.cos(angle * 14 - v * 2) * 0.025 * flare +
        Math.sin(angle * 21) * 0.012 * flare;

      const r = Math.max(0.01, baseRadius + foldDisplacement);
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

  const skirtGeo = new THREE.BufferGeometry();
  skirtGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  skirtGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  skirtGeo.setIndex(indices);
  skirtGeo.computeVertexNormals();

  const skirtMesh = new THREE.Mesh(skirtGeo, organzaMat);
  garmentGroup.add(skirtMesh);

  // Peplum Tier
  const tierPositions = [];
  const tierIndices = [];
  const tierHeight = 0.82;
  const tierRadSeg = 64;
  const tierHgtSeg = 20;

  for (let yIdx = 0; yIdx <= tierHgtSeg; yIdx++) {
    const v = yIdx / tierHgtSeg;
    const y = 0.80 - v * tierHeight;
    const flare = Math.pow(v, 1.4);
    const baseRadius = topRadius + 0.005 + flare * 0.44;

    for (let xIdx = 0; xIdx <= tierRadSeg; xIdx++) {
      const u = xIdx / tierRadSeg;
      const angle = u * Math.PI * 2;
      const fold = Math.sin(angle * 9 + 0.4) * 0.045 * flare;
      const r = baseRadius + fold;
      tierPositions.push(Math.cos(angle) * r, y, Math.sin(angle) * r);
    }
  }

  const tierStride = tierRadSeg + 1;
  for (let y = 0; y < tierHgtSeg; y++) {
    for (let x = 0; x < tierRadSeg; x++) {
      const a = y * tierStride + x;
      const b = (y + 1) * tierStride + x;
      const c = (y + 1) * tierStride + (x + 1);
      const d = y * tierStride + (x + 1);
      tierIndices.push(a, b, d);
      tierIndices.push(b, c, d);
    }
  }

  const tierGeo = new THREE.BufferGeometry();
  tierGeo.setAttribute('position', new THREE.Float32BufferAttribute(tierPositions, 3));
  tierGeo.setIndex(tierIndices);
  tierGeo.computeVertexNormals();

  const tierMesh = new THREE.Mesh(tierGeo, organzaMat);
  garmentGroup.add(tierMesh);

  // 45 Pearls distributed on bodice and overskirt
  const pearlGeo = new THREE.SphereGeometry(0.012, 16, 16);
  for (let i = 0; i < 45; i++) {
    const pMesh = new THREE.Mesh(pearlGeo, pearlMat);
    const phi = (i / 45) * Math.PI * 2;
    const vNorm = (i % 15) / 15;
    const y = 1.15 - vNorm * 0.65;
    const r = 0.20 + vNorm * 0.12;
    pMesh.position.set(Math.cos(phi) * r, y, Math.sin(phi) * r);
    garmentGroup.add(pMesh);
  }

  scene.add(garmentGroup);
  return scene;
}

// ==============================================================================
// 2. MEN'S TAILORED BANDHGALA & GREATCOAT (THREADOR-M-001)
// ==============================================================================
function buildMensTailoredScene() {
  const scene = new THREE.Scene();
  scene.name = 'TheThreador_MensTailoredBandhgala_M001';

  const group = new THREE.Group();
  group.name = 'MensTailoredRig';

  // Materials
  const woolMat = new THREE.MeshStandardMaterial({
    name: 'ShetlandWool_CharcoalInk',
    color: new THREE.Color('#1a1918'),
    roughness: 0.88,
    metalness: 0.05
  });

  const hornMat = new THREE.MeshStandardMaterial({
    name: 'BuffaloHorn_Carved',
    color: new THREE.Color('#342f2b'),
    roughness: 0.32,
    metalness: 0.1
  });

  const brassTrimMat = new THREE.MeshStandardMaterial({
    name: 'DullBrass_Hardware',
    color: new THREE.Color('#c8ad78'),
    roughness: 0.35,
    metalness: 0.85
  });

  const standMat = new THREE.MeshStandardMaterial({
    name: 'WalnutSteel_Base',
    color: new THREE.Color('#141312'),
    roughness: 0.5,
    metalness: 0.7
  });

  // Stand and base
  const basePlinth = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.38, 0.06, 48), standMat);
  basePlinth.position.y = -1.25;
  group.add(basePlinth);

  const verticalPole = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 1.85, 32), standMat);
  verticalPole.position.y = -0.35;
  group.add(verticalPole);

  // Tailored Masculine Torso Lathe (Broader chest, athletic taper, straight back)
  const mensTorsoPoints = [
    new THREE.Vector2(0.001, 1.52),
    new THREE.Vector2(0.085, 1.48),
    new THREE.Vector2(0.14, 1.42),
    new THREE.Vector2(0.32, 1.34),
    new THREE.Vector2(0.315, 1.20),
    new THREE.Vector2(0.29, 1.05),
    new THREE.Vector2(0.245, 0.85),
    new THREE.Vector2(0.26, 0.65),
    new THREE.Vector2(0.24, 0.45),
    new THREE.Vector2(0.18, 0.28),
    new THREE.Vector2(0.001, 0.26)
  ];
  const torsoMesh = new THREE.Mesh(new THREE.LatheGeometry(mensTorsoPoints, 48), woolMat);
  group.add(torsoMesh);

  // Standing Mandarin / Bandhgala Collar with Gold Edge Piping
  const collarMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.098, 0.085, 36), woolMat);
  collarMesh.position.y = 1.47;
  group.add(collarMesh);

  const collarPiping = new THREE.Mesh(new THREE.TorusGeometry(0.096, 0.006, 16, 36), brassTrimMat);
  collarPiping.position.y = 1.51;
  collarPiping.rotation.x = Math.PI / 2;
  group.add(collarPiping);

  // Tailored Structured Shoulders
  const leftShoulderPad = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.04, 0.24), woolMat);
  leftShoulderPad.position.set(0.26, 1.33, 0);
  leftShoulderPad.rotation.z = -0.15;
  group.add(leftShoulderPad);

  const rightShoulderPad = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.04, 0.24), woolMat);
  rightShoulderPad.position.set(-0.26, 1.33, 0);
  rightShoulderPad.rotation.z = 0.15;
  group.add(rightShoulderPad);

  // Tailored Greatcoat Sleeves
  const leftSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.065, 0.68, 24), woolMat);
  leftSleeve.position.set(0.31, 0.98, 0.02);
  leftSleeve.rotation.z = -0.12;
  group.add(leftSleeve);

  const rightSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.065, 0.68, 24), woolMat);
  rightSleeve.position.set(-0.31, 0.98, 0.02);
  rightSleeve.rotation.z = 0.12;
  group.add(rightSleeve);

  // Greatcoat Flared Skirt Panels
  const coatPoints = [
    new THREE.Vector2(0.245, 0.85),
    new THREE.Vector2(0.265, 0.65),
    new THREE.Vector2(0.31, 0.35),
    new THREE.Vector2(0.36, 0.0),
    new THREE.Vector2(0.42, -0.45),
    new THREE.Vector2(0.46, -0.85)
  ];
  const coatSkirt = new THREE.Mesh(new THREE.LatheGeometry(coatPoints, 48), woolMat);
  group.add(coatSkirt);

  // 5 Carved Buffalo Horn Buttons on placket
  const buttonGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.008, 24);
  const buttonY = [1.32, 1.20, 1.08, 0.96, 0.84];
  buttonY.forEach((y) => {
    const btn = new THREE.Mesh(buttonGeo, hornMat);
    btn.position.set(0.045, y, 0.28 - (1.32 - y) * 0.08);
    btn.rotation.x = Math.PI / 2;
    group.add(btn);
  });

  // Chest Pocket Welt
  const pocketWelt = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.022, 0.015), woolMat);
  pocketWelt.position.set(0.14, 1.18, 0.26);
  pocketWelt.rotation.z = 0.05;
  group.add(pocketWelt);

  scene.add(group);
  return scene;
}

async function run() {
  try {
    const heroScene = buildHeroGownScene();
    await exportSceneToGlb(heroScene, path.join(modelsDir, 'hero-garment.glb'));

    const mensScene = buildMensTailoredScene();
    await exportSceneToGlb(mensScene, path.join(modelsDir, 'mens-tailored.glb'));

    console.log('✓ All 3D production GLB models generated successfully.');
  } catch (err) {
    console.error('Failed to generate GLB models:', err);
    process.exit(1);
  }
}

run();
