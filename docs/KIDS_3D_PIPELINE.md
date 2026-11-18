# PROJECT LITTLE UNIVERSE — REAL-TIME 3D GARMENT PIPELINE
## Juvenile Mannequin Mesh, PBR Shaders, Sheer Fabric Transmission, and WebGL Optimizations

---

## 1. 3D Pipeline Architecture

The Threador 3D Atelier renders photorealistic juvenile garments in real time using Three.js, React Three Fiber (R3F), and Drei. The pipeline supports instant fabric swapping, camera framing, turntable rotation, and interactive growth adjustments.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          3D REAL-TIME ASSET PIPELINE                        │
│                                                                             │
│  [Blender CAD Source] ──► [Juvenile Anatomical Mesh] ──► [GLTF 2.0 / Draco] │
│                                                                     │       │
│                                                                     ▼       │
│  [Physical PBR Shaders] ◄── [Three.js MeshPhysicalMaterial] ◄───────┘       │
│   ├── Roughness / Metalness Maps (1024x1024)                                │
│   ├── Sheer Organza Transmission (thickness=0.8, ior=1.33)                  │
│   ├── Anisotropic Velvet Sheen (roughness=0.9, sheen=1.0)                   │
│   └── Couched Zari Normal Map (micro-relief 2K normal)                      │
│                                                                             │
│                                                                     ▼       │
│  [Cinematic Viewport] ──► [Studio Lighting: Violet / High-Contrast / Neutral│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Juvenile Mannequin Proportions & Mesh Geometry

Standard adult mannequins scaled down produce distorted, unnatural garments. The Threador utilizes proprietary juvenile mannequin geometries sculpted according to anthropometric studies of children aged 2 to 14:

| Dimension | Age 2–4Y Mannequin | Age 6–8Y Mannequin | Age 10–14Y Mannequin | Adult Mannequin (Comparison) |
| :--- | :--- | :--- | :--- | :--- |
| **Head-to-Body Ratio** | 1 : 5.0 | 1 : 6.0 | 1 : 7.0 | 1 : 8.0 |
| **Torso-to-Leg Ratio** | 1 : 1.1 | 1 : 1.35 | 1 : 1.55 | 1 : 1.8 |
| **Shoulder Slope** | 12° (Slightly rounded) | 14° (Natural posture) | 17° (Defined) | 22° (Sloped) |
| **Abdominal Profile** | Subtle infant lordosis | Neutral planar | Slender juvenile | Tapered V-profile |

---

## 3. Real-Time Physical Shader Specifications

Real-time rendering of complex textiles (organza, velvet, tulle, zari brocade) relies on `THREE.MeshPhysicalMaterial`:

### 3.1 Mulberry Silk Organza (Sheer Transmission Shader)
```javascript
const silkOrganzaMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#F1EEF4'),
  roughness: 0.25,
  metalness: 0.05,
  transmission: 0.72,       // Physically realistic glass/fabric transmission
  opacity: 1.0,
  transparent: true,
  ior: 1.33,                // Silk fiber refraction index
  thickness: 0.65,          // Sub-surface light scattering thickness
  specularIntensity: 0.8,
  specularColor: new THREE.Color('#FFFFFF'),
  clearcoat: 0.15,
  clearcoatRoughness: 0.1
});
```

### 3.2 English Cotton Velvet (Micro-Pile Sheen Shader)
```javascript
const velvetMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#21132C'),
  roughness: 0.88,
  metalness: 0.0,
  sheen: 1.0,               // High anisotropic fiber rim sheen
  sheenColor: new THREE.Color('#A68CBF'),
  sheenRoughness: 0.45
});
```

### 3.3 Varanasi Zari Brocade (Specular Normal Shader)
```javascript
const zariBrocadeMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#C9A84C'),
  roughness: 0.32,
  metalness: 0.78,          // Authentic metallic silver-gold wire reflection
  normalScale: new THREE.Vector2(1.5, 1.5) // Tactile relief of pit-loom weave
});
```

---

## 4. Performance & Memory Budget (60 FPS on Mobile)

- **Total Poly Count:** Maximum 45,000 triangles per assembled garment and mannequin.
- **Draw Calls:** Capped at 22 draw calls per frame by sharing material buffers and combining geometry meshes.
- **Texture Compression:** KTX2 / Basis Universal textures with 1024x1024 resolution for desktop and 512x512 for mobile WebGL contexts.
- **Shadow Cascades:** Single directional key light casting 1024x1024 soft PCF (Percentage-Closer Filtering) shadow; fill and rim lights are purely non-shadow-casting ambient and point sources.

