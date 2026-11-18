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

console.log('--- Generating The Threador Flagship 3D GLB Assets (Realistic Mannequin & Garment Systems) ---');

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
// SHARED: RETAIL DISPLAY MANNEQUIN BUILDER (Reference 2: Faceless White Display)
// ==============================================================================
function createRetailMannequin({
  gender = 'women',
  finish = 'porcelain-matte'
}) {
  const grp = new THREE.Group();
  grp.name = `${gender}_RetailMannequin_DisplayForm`;

  const isMale = gender === 'men';
  const isKid = gender === 'kids';

  // Porcelain Matte White Finish Material
  const mannequinMat = new THREE.MeshStandardMaterial({
    name: 'PorcelainMatte_DisplaySurface',
    color: new THREE.Color('#f5f2ec'),
    roughness: 0.62,
    metalness: 0.02
  });

  const standBrassMat = new THREE.MeshStandardMaterial({
    name: 'ChampagneBrass_Hardware',
    color: new THREE.Color('#d4af37'),
    roughness: 0.22,
    metalness: 0.90
  });

  const plinthMat = new THREE.MeshStandardMaterial({
    name: 'MatteObsidian_Plinth',
    color: new THREE.Color('#141219'),
    roughness: 0.42,
    metalness: 0.35
  });

  // 1. Faceless Anatomical Retail Head
  const headRadiusX = isKid ? 0.092 : isMale ? 0.098 : 0.088;
  const headRadiusY = isKid ? 0.115 : isMale ? 0.132 : 0.125;
  const headPoints = [];
  const steps = 32;
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI;
    const y = Math.cos(theta) * headRadiusY;
    const craniumTaper = y > 0 ? 1.0 : THREE.MathUtils.lerp(1.0, 0.65, Math.abs(y) / headRadiusY);
    const r = Math.sin(theta) * headRadiusX * craniumTaper;
    headPoints.push(new THREE.Vector2(Math.max(0.001, r), y));
  }
  const headGeo = new THREE.LatheGeometry(headPoints, 48);
  const headY = isKid ? 1.35 : isMale ? 1.66 : 1.64;
  const headMesh = new THREE.Mesh(headGeo, mannequinMat);
  headMesh.name = 'Mannequin_Head';
  headMesh.position.set(0, headY, 0.015);
  grp.add(headMesh);

  // 2. Natural Neck
  const neckTopR = isKid ? 0.048 : isMale ? 0.062 : 0.050;
  const neckBaseR = isKid ? 0.068 : isMale ? 0.088 : 0.072;
  const neckHeight = isKid ? 0.09 : isMale ? 0.12 : 0.13;
  const neckGeo = new THREE.CylinderGeometry(neckTopR, neckBaseR, neckHeight, 36);
  const neckY = isKid ? 1.24 : isMale ? 1.51 : 1.51;
  const neckMesh = new THREE.Mesh(neckGeo, mannequinMat);
  neckMesh.name = 'Mannequin_Neck';
  neckMesh.position.set(0, neckY, 0.005);
  grp.add(neckMesh);

  // 3. Anatomical Torso
  let torsoPoints;
  if (isMale) {
    torsoPoints = [
      new THREE.Vector2(0.001, 1.48),
      new THREE.Vector2(0.082, 1.45),
      new THREE.Vector2(0.165, 1.40),
      new THREE.Vector2(0.265, 1.34),
      new THREE.Vector2(0.290, 1.28),
      new THREE.Vector2(0.285, 1.15),
      new THREE.Vector2(0.260, 1.00),
      new THREE.Vector2(0.235, 0.82),
      new THREE.Vector2(0.245, 0.66),
      new THREE.Vector2(0.255, 0.52),
      new THREE.Vector2(0.220, 0.38),
      new THREE.Vector2(0.001, 0.36)
    ];
  } else if (isKid) {
    torsoPoints = [
      new THREE.Vector2(0.001, 1.22),
      new THREE.Vector2(0.065, 1.20),
      new THREE.Vector2(0.125, 1.16),
      new THREE.Vector2(0.185, 1.12),
      new THREE.Vector2(0.195, 1.05),
      new THREE.Vector2(0.190, 0.95),
      new THREE.Vector2(0.185, 0.82),
      new THREE.Vector2(0.180, 0.70),
      new THREE.Vector2(0.190, 0.58),
      new THREE.Vector2(0.170, 0.46),
      new THREE.Vector2(0.001, 0.44)
    ];
  } else {
    torsoPoints = [
      new THREE.Vector2(0.001, 1.48),
      new THREE.Vector2(0.070, 1.45),
      new THREE.Vector2(0.125, 1.39),
      new THREE.Vector2(0.225, 1.32),
      new THREE.Vector2(0.245, 1.24),
      new THREE.Vector2(0.265, 1.13),
      new THREE.Vector2(0.220, 0.98),
      new THREE.Vector2(0.180, 0.82),
      new THREE.Vector2(0.210, 0.68),
      new THREE.Vector2(0.258, 0.52),
      new THREE.Vector2(0.230, 0.36),
      new THREE.Vector2(0.001, 0.34)
    ];
  }
  const torsoMesh = new THREE.Mesh(new THREE.LatheGeometry(torsoPoints, 48), mannequinMat);
  torsoMesh.name = 'Mannequin_Torso';
  grp.add(torsoMesh);

  // 4. Arms & Hands
  const shoulderX = isKid ? 0.185 : isMale ? 0.285 : 0.235;
  const shoulderY = isKid ? 1.12 : isMale ? 1.34 : 1.32;
  const rUpper = isKid ? 0.038 : isMale ? 0.058 : 0.046;
  const rLower = isKid ? 0.032 : isMale ? 0.048 : 0.038;
  const rWrist = isKid ? 0.024 : isMale ? 0.036 : 0.028;

  const upperGeo = new THREE.CylinderGeometry(rUpper, rLower, isKid ? 0.28 : 0.38, 24);
  const foreGeo = new THREE.CylinderGeometry(rLower, rWrist, isKid ? 0.24 : 0.34, 24);
  const handGeo = new THREE.BoxGeometry(rWrist * 1.6, isKid ? 0.08 : 0.12, rWrist * 0.7);

  // Left Arm
  const leftArm = new THREE.Group();
  leftArm.name = 'LeftArm';
  leftArm.position.set(shoulderX, shoulderY, 0);
  const lUpper = new THREE.Mesh(upperGeo, mannequinMat);
  lUpper.position.set(0, isKid ? -0.14 : -0.19, 0);
  lUpper.rotation.set(0.08, 0, -0.12);
  leftArm.add(lUpper);

  const lFore = new THREE.Mesh(foreGeo, mannequinMat);
  lFore.position.set(0.03, isKid ? -0.38 : -0.52, 0.05);
  lFore.rotation.set(0.24, 0, 0.08);
  leftArm.add(lFore);

  const lHand = new THREE.Mesh(handGeo, mannequinMat);
  lHand.position.set(0.04, isKid ? -0.50 : -0.70, 0.08);
  leftArm.add(lHand);
  grp.add(leftArm);

  // Right Arm
  const rightArm = new THREE.Group();
  rightArm.name = 'RightArm';
  rightArm.position.set(-shoulderX, shoulderY, 0);
  const rUpperMesh = new THREE.Mesh(upperGeo, mannequinMat);
  rUpperMesh.position.set(0, isKid ? -0.14 : -0.19, 0);
  rUpperMesh.rotation.set(0.08, 0, 0.12);
  rightArm.add(rUpperMesh);

  const rFore = new THREE.Mesh(foreGeo, mannequinMat);
  rFore.position.set(-0.03, isKid ? -0.38 : -0.52, 0.05);
  rFore.rotation.set(0.24, 0, -0.08);
  rightArm.add(rFore);

  const rHand = new THREE.Mesh(handGeo, mannequinMat);
  rHand.position.set(-0.04, isKid ? -0.50 : -0.70, 0.08);
  rightArm.add(rHand);
  grp.add(rightArm);

  // 5. Museum Display Pedestal & Support Hardware
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.42, 0.06, 64), plinthMat);
  plinth.name = 'DisplayPlinth';
  plinth.position.y = -1.25;
  grp.add(plinth);

  const plinthRing = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.010, 16, 64), standBrassMat);
  plinthRing.position.y = -1.218;
  plinthRing.rotation.x = Math.PI / 2;
  grp.add(plinthRing);

  const supportRod = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.45, 32), standBrassMat);
  supportRod.position.set(0, -0.52, -0.12);
  grp.add(supportRod);

  return grp;
}

// ==============================================================================
// 1. HERO COUTURE GOWN SCENE (WOMEN)
// ==============================================================================
function buildHeroGownScene() {
  const scene = new THREE.Scene();
  scene.name = 'TheThreador_WomensCoutureGown_W001';

  // Mount Retail Mannequin
  const mannequin = createRetailMannequin({ gender: 'women' });
  scene.add(mannequin);

  // Garment Group
  const gown = new THREE.Group();
  gown.name = 'CoutureGarment_ChampagneGown';

  // PBR Silk Materials
  const bodiceMat = new THREE.MeshStandardMaterial({
    name: 'SilkFaille_ChampagneBodice',
    color: new THREE.Color('#fcf8ee'),
    roughness: 0.38,
    metalness: 0.04
  });

  const organzaMat = new THREE.MeshPhysicalMaterial({
    name: 'MulberryOrganza_SheerSkirt',
    color: new THREE.Color('#fdfaf2'),
    transmission: 0.68,
    opacity: 0.94,
    transparent: true,
    roughness: 0.22,
    ior: 1.48,
    thickness: 0.75,
    sheen: 1.0,
    sheenColor: new THREE.Color('#fff4df'),
    sheenRoughness: 0.32,
    side: THREE.DoubleSide
  });

  const underskirtMat = new THREE.MeshStandardMaterial({
    name: 'HabotaiSilk_Underskirt',
    color: new THREE.Color('#ede4d3'),
    roughness: 0.58,
    metalness: 0.05,
    side: THREE.DoubleSide
  });

  const goldZariMat = new THREE.MeshStandardMaterial({
    name: 'ZariGold_BotanicalEmbroidery',
    color: new THREE.Color('#d4af37'),
    roughness: 0.26,
    metalness: 0.82
  });

  const pearlMat = new THREE.MeshPhysicalMaterial({
    name: 'FreshwaterRiverPearl_Nacre',
    color: new THREE.Color('#fffef8'),
    roughness: 0.12,
    metalness: 0.08,
    clearcoat: 0.95
  });

  // Bodice with Basque Waist & Sweetheart Arch
  const bodicePoints = [
    new THREE.Vector2(0.182, 0.78),
    new THREE.Vector2(0.188, 0.86),
    new THREE.Vector2(0.225, 0.98),
    new THREE.Vector2(0.268, 1.13),
    new THREE.Vector2(0.255, 1.22),
    new THREE.Vector2(0.238, 1.28)
  ];
  const bodiceMesh = new THREE.Mesh(new THREE.LatheGeometry(bodicePoints, 64), bodiceMat);
  bodiceMesh.name = 'Bodice';
  gown.add(bodiceMesh);

  // Sweetheart Trim Ring
  const neckTrim = new THREE.Mesh(new THREE.TorusGeometry(0.245, 0.007, 16, 64), goldZariMat);
  neckTrim.position.y = 1.27;
  neckTrim.rotation.x = Math.PI / 2;
  gown.add(neckTrim);

  // Basque Waist Trim
  const waistTrim = new THREE.Mesh(new THREE.TorusGeometry(0.186, 0.008, 16, 64), goldZariMat);
  waistTrim.position.y = 0.78;
  waistTrim.rotation.x = Math.PI / 2;
  gown.add(waistTrim);

  // Underskirt Foundation
  const underPoints = [
    new THREE.Vector2(0.180, 0.77),
    new THREE.Vector2(0.240, 0.40),
    new THREE.Vector2(0.380, 0.00),
    new THREE.Vector2(0.560, -0.45),
    new THREE.Vector2(0.720, -0.92)
  ];
  const underskirtMesh = new THREE.Mesh(new THREE.LatheGeometry(underPoints, 48), underskirtMat);
  underskirtMesh.name = 'Underskirt';
  gown.add(underskirtMesh);

  // Multi-Frequency Undulating Organza Over-Skirt
  const radialSegments = 96;
  const heightSegments = 48;
  const pos = [];
  const uvs = [];
  const indices = [];
  const height = 1.72;
  const topRadius = 0.184;

  for (let yIdx = 0; yIdx <= heightSegments; yIdx++) {
    const v = yIdx / heightSegments;
    const y = 0.78 - v * height;
    const flare = Math.pow(v, 1.75);
    const baseRadius = topRadius + flare * 0.82;

    for (let xIdx = 0; xIdx <= radialSegments; xIdx++) {
      const u = xIdx / radialSegments;
      const angle = u * Math.PI * 2;
      const fold =
        Math.sin(angle * 6 + 0.2) * 0.082 * flare +
        Math.cos(angle * 12 - v * 2.2) * 0.035 * flare +
        Math.sin(angle * 18 + v) * 0.016 * flare;

      const r = Math.max(0.01, baseRadius + fold);
      pos.push(Math.cos(angle) * r, y, Math.sin(angle) * r);
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
  skirtGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  skirtGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  skirtGeo.setIndex(indices);
  skirtGeo.computeVertexNormals();

  const skirtMesh = new THREE.Mesh(skirtGeo, organzaMat);
  skirtMesh.name = 'OrganzaSkirt';
  gown.add(skirtMesh);

  // 48 Hand-Anchored River Pearls
  for (let i = 0; i < 48; i++) {
    const phi = (i / 48) * Math.PI * 2;
    const vNorm = (i % 16) / 16;
    const y = 1.18 - vNorm * 0.75;
    const r = 0.19 + vNorm * 0.16 + (i % 2 === 0 ? 0.015 : -0.01);
    const pMesh = new THREE.Mesh(new THREE.SphereGeometry(0.011, 16, 16), pearlMat);
    pMesh.name = `Pearl_${i}`;
    pMesh.position.set(Math.cos(phi) * r, y, Math.sin(phi) * r);
    gown.add(pMesh);
  }

  scene.add(gown);
  return scene;
}

// ==============================================================================
// 2. MEN'S MASTER TAILORED BLAZER & ENSEMBLE SCENE
// ==============================================================================
function buildMensTailoredScene() {
  const scene = new THREE.Scene();
  scene.name = 'TheThreador_MensTailoredBlazer_M001';

  // Mount Male Retail Mannequin
  const mannequin = createRetailMannequin({ gender: 'men' });
  scene.add(mannequin);

  const group = new THREE.Group();
  group.name = 'TailoredBlazerEnsemble';

  // Materials
  const woolMat = new THREE.MeshStandardMaterial({
    name: 'Super150s_MidnightWool',
    color: new THREE.Color('#223249'),
    roughness: 0.48,
    metalness: 0.12
  });

  const satinLapelMat = new THREE.MeshStandardMaterial({
    name: 'MulberrySatin_Facing',
    color: new THREE.Color('#162233'),
    roughness: 0.24,
    metalness: 0.35
  });

  const shirtMat = new THREE.MeshStandardMaterial({
    name: 'SeaIslandCotton_Shirt',
    color: new THREE.Color('#ffffff'),
    roughness: 0.28,
    metalness: 0.02
  });

  const tieMat = new THREE.MeshStandardMaterial({
    name: 'SilkSatin_Cravat',
    color: new THREE.Color('#100e16'),
    roughness: 0.32,
    metalness: 0.15
  });

  const goldButtonMat = new THREE.MeshStandardMaterial({
    name: 'PolishedBrass_CrestButtons',
    color: new THREE.Color('#d4af37'),
    roughness: 0.18,
    metalness: 0.92
  });

  // Shirt Collar & Placket
  const shirtCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.078, 0.084, 0.09, 36), shirtMat);
  shirtCollar.name = 'ShirtCollar';
  shirtCollar.position.set(0, 1.44, 0.02);
  group.add(shirtCollar);

  const tie = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.038, 0.28, 16), tieMat);
  tie.name = 'SilkTie';
  tie.position.set(0, 1.25, 0.22);
  tie.rotation.x = -0.15;
  group.add(tie);

  // Tailored Blazer Torso Shell (Savile Row Silhouette)
  const blazerPoints = [
    new THREE.Vector2(0.092, 1.45),
    new THREE.Vector2(0.180, 1.41),
    new THREE.Vector2(0.285, 1.35),
    new THREE.Vector2(0.315, 1.25),
    new THREE.Vector2(0.295, 1.10),
    new THREE.Vector2(0.265, 0.92),
    new THREE.Vector2(0.290, 0.74),
    new THREE.Vector2(0.315, 0.52),
    new THREE.Vector2(0.285, 0.50),
    new THREE.Vector2(0.001, 0.49)
  ];
  const blazerMesh = new THREE.Mesh(new THREE.LatheGeometry(blazerPoints, 64), woolMat);
  blazerMesh.name = 'BlazerShell';
  group.add(blazerMesh);

  // Rolled Peak Lapels
  const lShape = new THREE.Shape();
  lShape.moveTo(0, 0);
  lShape.lineTo(0.12, 0.05);
  lShape.lineTo(0.16, 0.28);
  lShape.lineTo(0.08, 0.32);
  lShape.lineTo(0.03, 0.42);
  lShape.lineTo(0.03, 0.42);
  lShape.closePath();

  const extrudeSettings = { depth: 0.018, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.006, bevelThickness: 0.006 };
  const leftLapelGeo = new THREE.ExtrudeGeometry(lShape, extrudeSettings);
  const leftLapel = new THREE.Mesh(leftLapelGeo, satinLapelMat);
  leftLapel.name = 'LeftLapel';
  leftLapel.position.set(0.04, 1.06, 0.28);
  leftLapel.rotation.set(-0.22, 0.22, -0.05);
  group.add(leftLapel);

  const rightLapelGeo = leftLapelGeo.clone();
  rightLapelGeo.scale(-1, 1, 1);
  const rightLapel = new THREE.Mesh(rightLapelGeo, satinLapelMat);
  rightLapel.name = 'RightLapel';
  rightLapel.position.set(-0.04, 1.06, 0.28);
  rightLapel.rotation.set(-0.22, -0.22, 0.05);
  group.add(rightLapel);

  // Left Welt Pocket with Folded Silk Pocket Square
  const welt = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.018, 0.01), satinLapelMat);
  welt.name = 'BreastPocketWelt';
  welt.position.set(0.14, 1.18, 0.285);
  welt.rotation.set(-0.18, 0.24, -0.12);
  group.add(welt);

  const pocketSquare = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.024, 0.006), shirtMat);
  pocketSquare.name = 'PocketSquare';
  pocketSquare.position.set(0.14, 1.20, 0.29);
  pocketSquare.rotation.set(-0.2, 0.24, -0.08);
  group.add(pocketSquare);

  // Flap Pockets
  const leftFlap = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.028, 0.035), satinLapelMat);
  leftFlap.name = 'LeftPocketFlap';
  leftFlap.position.set(0.20, 0.78, 0.24);
  leftFlap.rotation.set(-0.08, 0.35, 0.02);
  group.add(leftFlap);

  const rightFlap = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.028, 0.035), satinLapelMat);
  rightFlap.name = 'RightPocketFlap';
  rightFlap.position.set(-0.20, 0.78, 0.24);
  rightFlap.rotation.set(-0.08, -0.35, -0.02);
  group.add(rightFlap);

  // Forward-Pitched Sleeves
  const sleevePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.02, -0.22, 0.03),
    new THREE.Vector3(0.01, -0.44, 0.08),
    new THREE.Vector3(0, -0.66, 0.11)
  ]);
  const sleeveGeo = new THREE.TubeGeometry(sleevePath, 32, 0.076, 24, false);

  const leftSleeve = new THREE.Mesh(sleeveGeo, woolMat);
  leftSleeve.name = 'LeftSleeve';
  leftSleeve.position.set(0.28, 1.34, 0);
  group.add(leftSleeve);

  const rightSleeve = leftSleeve.clone();
  rightSleeve.name = 'RightSleeve';
  rightSleeve.position.set(-0.28, 1.34, 0);
  rightSleeve.scale.set(-1, 1, 1);
  group.add(rightSleeve);

  // Double-Breasted Crest Buttons (6x2)
  const btnGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.009, 20);
  const btnCoords = [
    [-0.065, 1.08, 0.315], [0.065, 1.08, 0.315],
    [-0.055, 0.94, 0.295], [0.055, 0.94, 0.295],
    [-0.050, 0.80, 0.280], [0.050, 0.80, 0.280]
  ];
  btnCoords.forEach(([bx, by, bz], i) => {
    const btn = new THREE.Mesh(btnGeo, goldButtonMat);
    btn.name = `BlazerButton_${i}`;
    btn.position.set(bx, by, bz);
    btn.rotation.x = Math.PI / 2;
    group.add(btn);
  });

  // Matching Tailored Trousers
  const trouserGeo = new THREE.CylinderGeometry(0.115, 0.085, 0.88, 32);
  const leftTrouser = new THREE.Mesh(trouserGeo, woolMat);
  leftTrouser.name = 'LeftTrouser';
  leftTrouser.position.set(0.11, -0.05, 0);
  group.add(leftTrouser);

  const rightTrouser = new THREE.Mesh(trouserGeo, woolMat);
  rightTrouser.name = 'RightTrouser';
  rightTrouser.position.set(-0.11, -0.05, 0);
  group.add(rightTrouser);

  scene.add(group);
  return scene;
}

// ==============================================================================
// 3. CHILDREN'S HEIRLOOM CELEBRATION ENSEMBLE SCENE (KIDS)
// ==============================================================================
function buildKidsHeirloomScene() {
  const scene = new THREE.Scene();
  scene.name = 'TheThreador_KidsCelebrationGown_K001';

  // Mount Juvenile Retail Mannequin
  const mannequin = createRetailMannequin({ gender: 'kids' });
  scene.add(mannequin);

  const kidsGroup = new THREE.Group();
  kidsGroup.name = 'KidsHeirloomEnsemble';

  // Materials
  const bodiceMat = new THREE.MeshStandardMaterial({
    name: 'MulberrySilk_PowderBlue',
    color: new THREE.Color('#8ea8c3'),
    roughness: 0.42,
    metalness: 0.05
  });

  const organzaMat = new THREE.MeshPhysicalMaterial({
    name: 'SilkOrganza_TierFlounce',
    color: new THREE.Color('#a8c0d6'),
    transmission: 0.65,
    opacity: 0.94,
    transparent: true,
    roughness: 0.25,
    ior: 1.45,
    thickness: 0.5,
    side: THREE.DoubleSide
  });

  const collarMat = new THREE.MeshStandardMaterial({
    name: 'HabotaiSilk_PeterPanCollar',
    color: new THREE.Color('#fdfcf7'),
    roughness: 0.35,
    metalness: 0.02
  });

  const goldRibbonMat = new THREE.MeshStandardMaterial({
    name: 'ZariSashRibbon',
    color: new THREE.Color('#d4af37'),
    roughness: 0.24,
    metalness: 0.8
  });

  const pearlMat = new THREE.MeshPhysicalMaterial({
    name: 'SeedPearl_Buttons',
    color: new THREE.Color('#fffef9'),
    roughness: 0.15,
    metalness: 0.08
  });

  // Juvenile Bodice
  const bodicePoints = [
    new THREE.Vector2(0.065, 1.20),
    new THREE.Vector2(0.125, 1.16),
    new THREE.Vector2(0.185, 1.11),
    new THREE.Vector2(0.198, 1.02),
    new THREE.Vector2(0.190, 0.90),
    new THREE.Vector2(0.185, 0.78),
    new THREE.Vector2(0.001, 0.77)
  ];
  const bodiceMesh = new THREE.Mesh(new THREE.LatheGeometry(bodicePoints, 48), bodiceMat);
  bodiceMesh.name = 'KidsBodice';
  kidsGroup.add(bodiceMesh);

  // Peter Pan Scalloped Collar
  const leftCollar = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.055, 0.008), collarMat);
  leftCollar.position.set(0.06, 1.18, 0.08);
  leftCollar.rotation.set(-0.3, 0.2, -0.15);
  kidsGroup.add(leftCollar);

  const rightCollar = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.055, 0.008), collarMat);
  rightCollar.position.set(-0.06, 1.18, 0.08);
  rightCollar.rotation.set(-0.3, -0.2, 0.15);
  kidsGroup.add(rightCollar);

  // Seed Pearl Buttons
  [1.12, 1.02, 0.92].forEach((y) => {
    const btn = new THREE.Mesh(new THREE.SphereGeometry(0.008, 16, 16), pearlMat);
    btn.position.set(0, y, 0.198);
    kidsGroup.add(btn);
  });

  // Waist Sash & Bow
  const sashRing = new THREE.Mesh(new THREE.TorusGeometry(0.188, 0.012, 16, 64), goldRibbonMat);
  sashRing.position.y = 0.78;
  sashRing.rotation.x = Math.PI / 2;
  kidsGroup.add(sashRing);

  // Triple-Tier Organza Flounces
  const buildTier = (topY, height, baseR, flareR, waves) => {
    const radSegs = 64;
    const hgtSegs = 16;
    const pos = [];
    const idxs = [];

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

  const t1 = new THREE.Mesh(buildTier(0.78, 0.28, 0.188, 0.16, 7), organzaMat);
  t1.name = 'Tier1';
  kidsGroup.add(t1);

  const t2 = new THREE.Mesh(buildTier(0.68, 0.38, 0.210, 0.24, 9), organzaMat);
  t2.name = 'Tier2';
  kidsGroup.add(t2);

  const t3 = new THREE.Mesh(buildTier(0.55, 0.52, 0.240, 0.34, 11), organzaMat);
  t3.name = 'Tier3';
  kidsGroup.add(t3);

  scene.add(kidsGroup);
  return scene;
}

// Execute Generation
async function run() {
  try {
    const heroScene = buildHeroGownScene();
    await exportSceneToGlb(heroScene, path.join(modelsDir, 'hero-garment.glb'));

    const mensScene = buildMensTailoredScene();
    await exportSceneToGlb(mensScene, path.join(modelsDir, 'mens-tailored.glb'));

    const kidsScene = buildKidsHeirloomScene();
    await exportSceneToGlb(kidsScene, path.join(modelsDir, 'kids-heirloom.glb'));

    console.log('✓ All 3 flagship production GLB models exported successfully with realistic retail mannequins.');
  } catch (err) {
    console.error('Failed to generate GLB models:', err);
    process.exit(1);
  }
}

run();
