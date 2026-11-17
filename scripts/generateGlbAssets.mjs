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

console.log('--- Generating The Threador Production 3D GLB Assets (4K Minimalist Luxury Edition) ---');

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
// 1. HERO COUTURE GOWN & MANNEQUIN (THREADOR-W-001) - 4K Haute Couture
// ==============================================================================
function buildHeroGownScene() {
  const scene = new THREE.Scene();
  scene.name = 'TheThreador_HeroCoutureGown_W001';

  const mannequinGroup = new THREE.Group();
  mannequinGroup.name = 'ParisianMannequin';

  // French Linen Canvas Dressform
  const linenMat = new THREE.MeshStandardMaterial({
    name: 'FrenchLinen_Canvas',
    color: new THREE.Color('#ede8de'),
    roughness: 0.78,
    metalness: 0.02
  });

  // Brushed Warm Champagne Brass
  const brassMat = new THREE.MeshStandardMaterial({
    name: 'SatinBrushed_Brass',
    color: new THREE.Color('#d4af37'),
    roughness: 0.22,
    metalness: 0.88
  });

  // Matte Ebonized Cast Plinth
  const baseMat = new THREE.MeshStandardMaterial({
    name: 'CastIron_Matte',
    color: new THREE.Color('#1a1816'),
    roughness: 0.38,
    metalness: 0.7
  });

  // Pedestal Plinth & Central Column
  const basePlinth = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.38, 0.05, 64), baseMat);
  basePlinth.position.y = -1.25;
  mannequinGroup.add(basePlinth);

  const baseTrim = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.012, 16, 64), brassMat);
  baseTrim.position.y = -1.22;
  baseTrim.rotation.x = Math.PI / 2;
  mannequinGroup.add(baseTrim);

  const verticalPole = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.8, 36), brassMat);
  verticalPole.position.y = -0.35;
  mannequinGroup.add(verticalPole);

  const knurledCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.08, 32), brassMat);
  knurledCollar.position.y = -0.25;
  mannequinGroup.add(knurledCollar);

  // Anatomically proportioned Parisian Dressform Torso
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
  const torsoGeo = new THREE.LatheGeometry(torsoPoints, 64);
  const torsoMesh = new THREE.Mesh(torsoGeo, linenMat);
  mannequinGroup.add(torsoMesh);

  // Neck Collar & Finial
  const neckCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.082, 0.02, 36), brassMat);
  neckCollar.position.y = 1.45;
  mannequinGroup.add(neckCollar);

  const neckSpindle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.075, 0.12, 36), brassMat);
  neckSpindle.position.y = 1.54;
  mannequinGroup.add(neckSpindle);

  const finialBall = new THREE.Mesh(new THREE.SphereGeometry(0.048, 32, 32), brassMat);
  finialBall.position.y = 1.62;
  mannequinGroup.add(finialBall);

  scene.add(mannequinGroup);

  // Haute Couture Garment (Bodice, Double-tier Fluted Organza, Zari Embroidery, Pearls)
  const garmentGroup = new THREE.Group();
  garmentGroup.name = 'CoutureGarment_ChampagneGown';

  const bodiceMat = new THREE.MeshStandardMaterial({
    name: 'SilkFaille_Champagne',
    color: new THREE.Color('#fcf8ef'),
    roughness: 0.38,
    metalness: 0.04
  });

  const organzaMat = new THREE.MeshPhysicalMaterial({
    name: 'MulberryOrganza_Translucent',
    color: new THREE.Color('#fbf6eb'),
    transmission: 0.68,
    opacity: 0.96,
    transparent: true,
    roughness: 0.24,
    ior: 1.48,
    thickness: 0.6,
    side: THREE.DoubleSide
  });

  const goldEmbroideryMat = new THREE.MeshStandardMaterial({
    name: 'ZariGold_Thread',
    color: new THREE.Color('#d4af37'),
    roughness: 0.28,
    metalness: 0.75
  });

  const pearlMat = new THREE.MeshStandardMaterial({
    name: 'Nacre_FreshwaterPearl',
    color: new THREE.Color('#fffef9'),
    roughness: 0.12,
    metalness: 0.1
  });

  // Bodice Mesh with sweetheart contour
  const bodicePoints = [
    new THREE.Vector2(0.19, 0.80),
    new THREE.Vector2(0.195, 0.86),
    new THREE.Vector2(0.235, 0.98),
    new THREE.Vector2(0.278, 1.12),
    new THREE.Vector2(0.265, 1.22),
    new THREE.Vector2(0.245, 1.28)
  ];
  const bodiceMesh = new THREE.Mesh(new THREE.LatheGeometry(bodicePoints, 64), bodiceMat);
  garmentGroup.add(bodiceMesh);

  // Sweetheart neckline gold piping
  const neckTrim = new THREE.Mesh(new THREE.TorusGeometry(0.255, 0.008, 16, 64), goldEmbroideryMat);
  neckTrim.position.y = 1.26;
  neckTrim.rotation.x = Math.PI / 2;
  garmentGroup.add(neckTrim);

  // Fluted Organza Skirt
  const radialSegments = 84;
  const heightSegments = 40;
  const positions = [];
  const uvs = [];
  const indices = [];

  const height = 1.68;
  const topRadius = 0.19;

  for (let yIdx = 0; yIdx <= heightSegments; yIdx++) {
    const v = yIdx / heightSegments;
    const y = 0.80 - v * height;
    const flare = Math.pow(v, 1.65);
    const baseRadius = topRadius + flare * 0.78;

    for (let xIdx = 0; xIdx <= radialSegments; xIdx++) {
      const u = xIdx / radialSegments;
      const angle = u * Math.PI * 2;
      const foldDisplacement =
        Math.sin(angle * 7) * 0.068 * flare +
        Math.cos(angle * 14 - v * 2) * 0.028 * flare +
        Math.sin(angle * 21) * 0.014 * flare;

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
  const tierHgtSeg = 24;

  for (let yIdx = 0; yIdx <= tierHgtSeg; yIdx++) {
    const v = yIdx / tierHgtSeg;
    const y = 0.80 - v * tierHeight;
    const flare = Math.pow(v, 1.4);
    const baseRadius = topRadius + 0.005 + flare * 0.44;

    for (let xIdx = 0; xIdx <= tierRadSeg; xIdx++) {
      const u = xIdx / tierRadSeg;
      const angle = u * Math.PI * 2;
      const fold = Math.sin(angle * 9 + 0.4) * 0.048 * flare;
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

  // 45 Hand-placed pearl cabochons
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
// 2. MEN'S LUXURY TAILORED BLAZER (THREADOR-M-001) - 4K High Definition
// ==============================================================================
function buildMensTailoredScene() {
  const scene = new THREE.Scene();
  scene.name = 'TheThreador_MensTailoredBlazer_M001';

  const group = new THREE.Group();
  group.name = 'MensTailoredBlazerRig';

  // Luxury PBR Materials - Rich Midnight Navy with Lustrous Sheen
  const blazerBodyMat = new THREE.MeshStandardMaterial({
    name: 'MidnightNavy_WoolSilk',
    color: new THREE.Color('#2a3c5a'), // Luminous Midnight Navy (distinct and visible against dark studio backgrounds)
    roughness: 0.46,
    metalness: 0.15
  });

  const lapelSatinMat = new THREE.MeshStandardMaterial({
    name: 'MidnightSatin_Lapel',
    color: new THREE.Color('#1c283c'), // Gleaming silk satin lapel contrast
    roughness: 0.22,
    metalness: 0.38
  });

  const shirtLinenMat = new THREE.MeshStandardMaterial({
    name: 'CrispWhite_DressShirt',
    color: new THREE.Color('#ffffff'), // Crisp pure white shirt / mannequin collar
    roughness: 0.3,
    metalness: 0.02
  });

  const pocketSquareMat = new THREE.MeshStandardMaterial({
    name: 'IvorySilk_PocketSquare',
    color: new THREE.Color('#ffffff'), // Pure white silk pocket square
    roughness: 0.18,
    metalness: 0.05
  });

  const goldButtonMat = new THREE.MeshStandardMaterial({
    name: 'PolishedBrass_BlazerButtons',
    color: new THREE.Color('#f3c64c'), // Gleaming gold crest buttons
    roughness: 0.15,
    metalness: 0.95
  });

  const standMat = new THREE.MeshStandardMaterial({
    name: 'WalnutBrass_MannequinStand',
    color: new THREE.Color('#1c1917'),
    roughness: 0.4,
    metalness: 0.65
  });

  const standBrassMat = new THREE.MeshStandardMaterial({
    name: 'BrushedBrass_Fittings',
    color: new THREE.Color('#d4af37'),
    roughness: 0.25,
    metalness: 0.88
  });

  // Stand and base plinth
  const basePlinth = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.40, 0.06, 64), standMat);
  basePlinth.position.y = -1.25;
  group.add(basePlinth);

  const baseTrim = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.012, 16, 64), standBrassMat);
  baseTrim.position.y = -1.22;
  baseTrim.rotation.x = Math.PI / 2;
  group.add(baseTrim);

  const verticalPole = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 1.85, 36), standBrassMat);
  verticalPole.position.y = -0.35;
  group.add(verticalPole);

  // 1. Mannequin Neck & Brass Finial
  const mannequinNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.084, 0.16, 36), standMat);
  mannequinNeck.position.y = 1.48;
  group.add(mannequinNeck);

  const finialBall = new THREE.Mesh(new THREE.SphereGeometry(0.046, 32, 32), standBrassMat);
  finialBall.position.y = 1.60;
  group.add(finialBall);

  // Crisp White Dress Shirt Collar (Visible at the neck)
  const shirtCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.092, 0.09, 36), shirtLinenMat);
  shirtCollar.position.y = 1.44;
  group.add(shirtCollar);

  // White Shirt Front Chest V-Panel (Recessed behind blazer opening)
  const shirtChestV = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.04, 0.32, 32), shirtLinenMat);
  shirtChestV.position.set(0, 1.25, 0.18);
  group.add(shirtChestV);

  // Silk Black/Navy Bowtie at collar
  const bowtieCenter = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.025, 0.025), lapelSatinMat);
  bowtieCenter.position.set(0, 1.42, 0.23);
  group.add(bowtieCenter);

  const bowtieLeft = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.07, 4), lapelSatinMat);
  bowtieLeft.position.set(0.045, 1.42, 0.22);
  bowtieLeft.rotation.z = -Math.PI / 2;
  group.add(bowtieLeft);

  const bowtieRight = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.07, 4), lapelSatinMat);
  bowtieRight.position.set(-0.045, 1.42, 0.22);
  bowtieRight.rotation.z = Math.PI / 2;
  group.add(bowtieRight);

  // 2. Structured Tailored Blazer Main Body (SOLID Midnight Navy Wool)
  const blazerTorsoPoints = [
    new THREE.Vector2(0.085, 1.42),
    new THREE.Vector2(0.32, 1.38), // Broad roped shoulder line
    new THREE.Vector2(0.33, 1.22), // Athletic chest
    new THREE.Vector2(0.30, 1.05), // Mid torso
    new THREE.Vector2(0.265, 0.86), // Pinched waist suppression
    new THREE.Vector2(0.285, 0.68), // Hip taper
    new THREE.Vector2(0.315, 0.44), // Bottom hem flare
    new THREE.Vector2(0.30, 0.40), // Hem turn
    new THREE.Vector2(0.001, 0.39) // Base closure
  ];
  const blazerMesh = new THREE.Mesh(new THREE.LatheGeometry(blazerTorsoPoints, 64), blazerBodyMat);
  group.add(blazerMesh);

  // 3. Silk Satin Peak Lapels (Angled 3D Plates)
  // Left Lapel
  const leftLapel = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.38, 0.035), lapelSatinMat);
  leftLapel.position.set(0.12, 1.20, 0.26);
  leftLapel.rotation.set(-0.14, 0.18, -0.20);
  group.add(leftLapel);

  // Left Peak Arrow
  const leftPeak = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.10, 4), lapelSatinMat);
  leftPeak.position.set(0.18, 1.36, 0.25);
  leftPeak.rotation.set(-0.1, 0.1, -0.55);
  group.add(leftPeak);

  // Right Lapel
  const rightLapel = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.38, 0.035), lapelSatinMat);
  rightLapel.position.set(-0.12, 1.20, 0.26);
  rightLapel.rotation.set(-0.14, -0.18, 0.20);
  group.add(rightLapel);

  // Right Peak Arrow
  const rightPeak = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.10, 4), lapelSatinMat);
  rightPeak.position.set(-0.18, 1.36, 0.25);
  rightPeak.rotation.set(-0.1, -0.1, 0.55);
  group.add(rightPeak);

  // 4. Roped Shoulders & Tailored Sleeves (Solid Midnight Navy Wool)
  // Left Sleeve
  const leftShoulderRope = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.016, 16, 36), blazerBodyMat);
  leftShoulderRope.position.set(0.30, 1.34, 0.01);
  leftShoulderRope.rotation.set(0, Math.PI / 2, 0.15);
  group.add(leftShoulderRope);

  const leftSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.068, 0.72, 32), blazerBodyMat);
  leftSleeve.position.set(0.32, 0.94, 0.02);
  leftSleeve.rotation.set(0.05, 0, -0.12);
  group.add(leftSleeve);

  // Right Sleeve
  const rightShoulderRope = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.016, 16, 36), blazerBodyMat);
  rightShoulderRope.position.set(-0.30, 1.34, 0.01);
  rightShoulderRope.rotation.set(0, Math.PI / 2, -0.15);
  group.add(rightShoulderRope);

  const rightSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.068, 0.72, 32), blazerBodyMat);
  rightSleeve.position.set(-0.32, 0.94, 0.02);
  rightSleeve.rotation.set(0.05, 0, 0.12);
  group.add(rightSleeve);

  // 5. Breast Pocket with Crisp White Silk Pocket Square
  const breastPocket = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.02, 0.025), lapelSatinMat);
  breastPocket.position.set(-0.16, 1.22, 0.27);
  breastPocket.rotation.set(-0.12, -0.14, -0.05);
  group.add(breastPocket);

  const pocketSquare = new THREE.Mesh(new THREE.ConeGeometry(0.038, 0.065, 4), pocketSquareMat);
  pocketSquare.position.set(-0.16, 1.25, 0.27);
  pocketSquare.rotation.set(-0.1, 0, -0.15);
  group.add(pocketSquare);

  // 6. Double-Breasted Brass Crest Buttons (4 Buttons in 2x2 grid)
  const blazerBtnGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.008, 20);
  const buttonCoords = [
    [-0.05, 1.02, 0.31],
    [0.05, 1.02, 0.31],
    [-0.045, 0.88, 0.29],
    [0.045, 0.88, 0.29]
  ];
  buttonCoords.forEach(([bx, by, bz]) => {
    const btn = new THREE.Mesh(blazerBtnGeo, goldButtonMat);
    btn.position.set(bx, by, bz);
    btn.rotation.x = Math.PI / 2;
    group.add(btn);
  });

  // 7. Hip Flap Pockets (Left & Right)
  const leftFlap = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.028, 0.035), blazerBodyMat);
  leftFlap.position.set(0.18, 0.68, 0.25);
  leftFlap.rotation.set(-0.1, 0.15, 0.04);
  group.add(leftFlap);

  const rightFlap = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.028, 0.035), blazerBodyMat);
  rightFlap.position.set(-0.18, 0.68, 0.25);
  rightFlap.rotation.set(-0.1, -0.15, -0.04);
  group.add(rightFlap);

  // Sleeve Cuff Buttons (4 kissing buttons per sleeve)
  const cuffBtnGeo = new THREE.CylinderGeometry(0.009, 0.009, 0.005, 16);
  for (let i = 0; i < 4; i++) {
    const offset = i * 0.022;
    // Left cuff
    const lBtn = new THREE.Mesh(cuffBtnGeo, goldButtonMat);
    lBtn.position.set(0.38, 0.62 + offset, 0.04);
    lBtn.rotation.set(0, 0, Math.PI / 2);
    group.add(lBtn);

    // Right cuff
    const rBtn = new THREE.Mesh(cuffBtnGeo, goldButtonMat);
    rBtn.position.set(-0.38, 0.62 + offset, 0.04);
    rBtn.rotation.set(0, 0, -Math.PI / 2);
    group.add(rBtn);
  }

  scene.add(group);
  return scene;
}

// Execute Generation
async function run() {
  try {
    const heroScene = buildHeroGownScene();
    await exportSceneToGlb(heroScene, path.join(modelsDir, 'hero-garment.glb'));

    const mensScene = buildMensTailoredScene();
    await exportSceneToGlb(mensScene, path.join(modelsDir, 'mens-tailored.glb'));

    console.log('✓ All 4K production GLB models generated successfully.');
  } catch (err) {
    console.error('Failed to generate GLB models:', err);
    process.exit(1);
  }
}

run();
