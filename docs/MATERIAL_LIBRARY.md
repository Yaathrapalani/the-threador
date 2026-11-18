# THE THREADOR — PBR MATERIAL & TEXTILE LIBRARY
**Version:** 2.4.0 • Luxury Digital Flagship Edition  
**Repository:** `https://github.com/Yaathrapalani/the-threador`  
**Engine:** Three.js / React Three Fiber / Drei

---

## 1. Overview & Rendering Philosophy

THE THREADOR rejects flat unlit shaders or pre-baked video loops masquerading as 3D. Garments are rendered in true WebGL using Three.js Physically Based Rendering (`MeshStandardMaterial` and `MeshPhysicalMaterial`) configured with micro-surface roughness, transmission, sheen, and metallic reflectivity to emulate authentic luxury textiles.

---

## 2. Textile Material Registry

### 2.1 Lyon Silk Organza (`silk-organza`)
- **Usage:** Women's Couture Gown (`CoutureGown.tsx`), Kids' Celebration Dress Tiers (`KidsOccasionDress.tsx`)
- **Visual Character:** Translucent, crisp, weightless, catching ambient light with ethereal soft diffusion.
- **Three.js Shader Parameters:**
  ```typescript
  {
    color: '#F4ECE1',             // Champagne ivory tint
    roughness: 0.28,              // Soft diffused specular highlight
    metalness: 0.08,              // Subtle organic sheen
    transmission: 0.65,           // Light passthrough for translucent organza
    opacity: 0.88,
    transparent: true,
    depthWrite: false,            // Prevents alpha sorting artifacts
    ior: 1.45,                    // Index of refraction for silk fibers
    thickness: 0.5                // Micro-thickness for subsurface diffusion
  }
  ```

### 2.2 Super 150s Merino Wool (`merino-twill`)
- **Usage:** Men's Tailored Blazers (`ProceduralMensBlazer`)
- **Visual Character:** Dense, matte, deep light-absorbing weave with subtle diagonal twill structure and high shape retention.
- **Three.js Shader Parameters:**
  ```typescript
  {
    color: '#242321',             // Ink charcoal or navy barathea
    roughness: 0.72,              // High light scattering, zero plastic gloss
    metalness: 0.04,              // Organic fiber reflection
    sheen: 0.35,                  // Subtle fiber bloom along grazing angles
    sheenRoughness: 0.5,
    sheenColor: '#3A3835'
  }
  ```

### 2.3 Cotton Velvet (`cotton-velvet`)
- **Usage:** Boys' Festive Bandhgala Jacket (`KidsFestiveJacket.tsx`)
- **Visual Character:** Deep plush pile with directional light sheen and rich shadow saturation.
- **Three.js Shader Parameters:**
  ```typescript
  {
    color: '#1C2630',             // Royal midnight or deep emerald
    roughness: 0.85,              // Deep matte body
    metalness: 0.02,
    sheen: 0.95,                  // Intense retro-reflective pile highlight
    sheenRoughness: 0.25,
    sheenColor: '#6B879E'         // Luminous velvet bloom
  }
  ```

### 2.4 Metallic Zardozi / Varanasi Zari (`gold-zari`)
- **Usage:** Bodice Vine Embroidery (`KidsOccasionDress.tsx`, `CoutureGown.tsx`), Piping Trim (`KidsFestiveJacket.tsx`)
- **Visual Character:** Real couched metallic wire; warm amber-gold specular luster with microscopic relief.
- **Three.js Shader Parameters:**
  ```typescript
  {
    color: '#E0BA62',             // Antique champagne gold
    roughness: 0.22,              // Gleaming metallic filament
    metalness: 0.88,              // Conductive metal reflection
    clearcoat: 0.4,
    clearcoatRoughness: 0.15
  }
  ```

### 2.5 Freshwater River Seed Pearls (`river-pearl`)
- **Usage:** Placket buttons, corset waist fluting, child collar closures.
- **Visual Character:** Natural nacreous iridescence, milky translucency, smooth polished dome.
- **Three.js Shader Parameters:**
  ```typescript
  {
    color: '#FCF9F3',             // Natural warm pearl white
    roughness: 0.18,              // Polished nacre reflection
    metalness: 0.15,
    clearcoat: 0.85,              // Wet pearl luster
    clearcoatRoughness: 0.08
  }
  ```

### 2.6 Milled Cast Brass (`cast-brass`)
- **Usage:** Dressform stands, pedestals, double-breasted crest buttons.
- **Visual Character:** Weighty, hand-turned architectural bronze with antique satin brush.
- **Three.js Shader Parameters:**
  ```typescript
  {
    color: '#B5965A',
    roughness: 0.38,
    metalness: 0.82
  }
  ```

---

## 3. Lighting Environments

Three custom multi-point lighting rigs are implemented in `src/scene/`:

1. **Child Couture Light Rig (`KidsCoutureRig`):**
   - Key: Soft champagne directional light (`#FFF5E4`, intensity `1.8`, 45° elevation).
   - Fill: Diffused warm sky dome (`#F7F4EF`, intensity `0.9`).
   - Rim: Cool rim kick (`#E2EEF8`, intensity `1.2`) to highlight translucent organza edges.
2. **Men's Architectural Rig (`MensTailoringRig`):**
   - High-contrast directional lighting emphasizing shoulder pads, lapel roll, and waist suppression.
3. **Women's Gallery Rig (`WomensCoutureRig`):**
   - Multi-bounce gallery lighting with soft floor shadows and ambient occlusion.
