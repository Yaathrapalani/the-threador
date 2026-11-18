# THE THREADOR — REALISTIC 3D MANNEQUIN & GARMENT ENGINEERING PIPELINE
**Version:** 3.5.0 • Flagship Retail Mannequin & Cinematic Showroom Edition  
**Repository:** `https://github.com/Yaathrapalani/the-threador`  
**Core Components:** 
- `src/scene/RetailMannequin.tsx`
- `src/scene/TailoredMensEnsemble.tsx`
- `src/scene/AtelierWomensGown.tsx`
- `src/scene/KidsHeirloomEnsemble.tsx`
- `src/scene/HeroCanvas.tsx`
- `src/scene/ScrollCameraController.tsx`
- `src/scene/StudioEnvironment.tsx`
- `src/scene/GlbGarmentLoader.tsx`

---

## 1. Executive Summary & Quality Directive

This pipeline achieves full compliance with the luxury fashion flagship reconstruction directive, solving previous geometric simplifications and delivering museum-grade retail display quality:

1. **Professional Retail Mannequin System (Reference 2):** Seamless, faceless porcelain-matte display forms with elegant human proportions, anatomical neck-to-shoulder transitions, natural deltoids, articulated arms, refined mannequin hands, and heavy architectural display plinths with brushed champagne brass fittings.
2. **True Garment Tailoring & Construction (References 1, 3, 4):**
   - **MEN:** Super 150s Merino wool-silk tailored blazer with roped shoulder heads, forward-pitched sleeves (15° anatomical pitch), 3D rolled peak lapels with silk satin facing, left breast welt pocket with folded silk pocket square, dual hip flap pockets, 6x2 double-breasted brass crest buttons, kissing cuff buttons, and tailored dress trousers.
   - **WOMEN:** Sculptural haute couture evening gown with hand-boned silk faille corset bodice, sweetheart neckline with satin binding, basque waist transition, multi-frequency undulating organic silk organza skirt (not a stiff cone), underlaid Habotai silk foundation slip, and 48 hand-anchored freshwater river pearls.
   - **KIDS:** Authentic juvenile scale (6–8Y scale) with triple-tier fluttering Mulberry silk organza skirt, scalloped Peter Pan collar in Habotai silk, back bow sash, seed pearl buttons, and 2.5" hidden French growth seam allowances.
3. **Automatic 7-Stage Cinematic Camera Choreography:** Replaces unnecessary manual click-to-zoom controls with a smooth, scroll-driven sequence gliding from Arrival through Approach, Detail Revelation, Controlled Orbit, Macro Weave, Return, and Collection Transition.

---

## 2. Anatomical Mannequin Architecture (`RetailMannequin.tsx`)

### 2.1 Visual Characteristics & Reference Alignment
Following **Reference 2 (Faceless white fashion mannequin)**:
- **Head:** Faceless, egg-shaped anatomical form with tapered jawline and clean chin contour. Free of artificial caricature or low-poly artifacts.
- **Neck:** Natural cylindrical column expanding smoothly into the clavicle and trapezius slope.
- **Torso Proportions:**
  - **Men:** Broad athletic shoulders (0.285m half-width), defined pectoral chest, natural waist taper, and athletic hip line.
  - **Women:** Slender shoulder slope (0.235m half-width), defined bust apex, wasp waist (0.180m radius), and feminine hip flare (0.258m radius).
  - **Kids:** Juvenile proportions (0.185m half-width, 1.22m height scale), larger head-to-body ratio (1:6), shorter torso, and relaxed natural stance.
- **Arms & Hands:** Upper arm, articulated elbow joint, forearm angled gently inward (0.24 rad), and refined stylized mannequin hands with elongated fingers.
- **Display Plinth:** Heavy cylindrical display plinth in matte obsidian (`#141219`) with a satin champagne brass trim ring (`#d4af37`) and vertical stabilization rod.

---

## 3. Garment Engineering & PBR Material Physics

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          REALISTIC GARMENT MATRIX                           │
│                                                                             │
│  [MEN: TAILORED BLAZER]          [WOMEN: ATELIER GOWN]                      │
│  ├── Roped Shoulder Heads        ├── Sweetheart Corset Bodice               │
│  ├── Forward-Pitched Sleeves     ├── Basque Waist Transition                │
│  ├── Rolled Peak Lapels          ├── Multi-Frequency Undulating Organza     │
│  ├── Double-Breasted 6x2 Crest   ├── 48 Freshwater River Pearls             │
│  └── Matching Tailored Trousers  └── Underlaid Habotai Silk Slip            │
│                                                                             │
│  [KIDS: HEIRLOOM GOWN]           [RETAIL DISPLAY MANNEQUIN]                 │
│  ├── Triple-Tier Organza Skirt   ├── Faceless Sculptural Retail Head        │
│  ├── Scalloped Peter Pan Collar  ├── Anatomical Neck & Trapezius Slope      │
│  ├── Silk Sash & Back Bow        ├── Natural Arm Posture & Refined Hands    │
│  └── 2.5" Hidden French Seams    └── Architectural Display Plinth           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Men's Tailoring Specifications
- **Blazer Body:** Lathe-profiled solid wool-silk shell with anatomical chest fullness, waist suppression, and flare over the hips.
- **Lapels:** Rolled 3D peak lapels extruded with bevel thickness (0.018m depth, 0.006m bevel) in pure silk satin facing (`roughness: 0.24, metalness: 0.35`).
- **Sleeves:** Catmull-Rom curved tube geometry pitched forward at 15°, terminating in wrist cuffs with 4 kissing brass crest buttons.
- **Trousers:** Tapered formal trouser legs mounted under the blazer hem.

### 3.2 Women's Couture Specifications
- **Bodice Core:** Anatomically contoured silk faille corset with sweetheart neckline, bustier cups, and 8 vertical boning channel seamlines.
- **Organza Skirt:** Multi-frequency wave formula:
  $$\Delta r = \sin(6\theta + 0.2)\cdot 0.082\cdot v^{1.75} + \cos(12\theta - 2.2v)\cdot 0.035\cdot v^{1.75} + \sin(18\theta + v)\cdot 0.016\cdot v^{1.75}$$
  Producing realistic, heavy, undulating organza folds that sway naturally in idle rotation.
- **Physical Shader:** `THREE.MeshPhysicalMaterial` with `transmission: 0.68`, `ior: 1.48`, `thickness: 0.75`, and `sheen: 1.0`.

---

## 4. Automatic 7-Stage Cinematic Camera Sequence (`ScrollCameraController.tsx`)

Replaces manual click-to-zoom controls with a smooth, continuous sequence:

| Stage | Normalized Scroll | Camera Position | Look-At Target | Narrative Revelation |
| :--- | :--- | :--- | :--- | :--- |
| **Stage 1: Arrival** | `0.00 – 0.16` | `[0, 0.38, 5.2]` | `[0, 0.18, 0]` | Complete silhouette framed in luxury showroom |
| **Stage 2: Approach** | `0.16 – 0.32` | `[0.25, 0.48, 3.6]` | `[0, 0.28, 0]` | Camera glides smoothly forward into medium shot |
| **Stage 3: Detail Revelation** | `0.32 – 0.52` | `[0.28, 0.58, 1.85]` | `[0.04, 0.52, 0.12]` | High focus on collar, shoulder, lapel & bodice |
| **Stage 4: Controlled Orbit** | `0.52 – 0.70` | `[-0.65, 0.42, 2.75]` | `[0, 0.24, 0]` | Smooth 3/4 turn, side profile, and rear reveal |
| **Stage 5: Macro Presentation** | `0.70 – 0.85` | `[-0.12, 0.42, 1.45]` | `[-0.04, 0.40, 0.22]`| Extreme micro focus on stitches, pearls, crests |
| **Stage 6: Return** | `0.85 – 0.94` | `[0, 0.42, 5.0]` | `[0, 0.20, 0]` | Smooth pull back to complete architectural silhouette |
| **Stage 7: Collection Transition** | `0.94 – 1.00` | `[0, 0.42, 5.0]` | `[0, 0.20, 0]` | Continuous glide into product collection showcase |

---

## 5. Architectural Studio Lighting (`StudioEnvironment.tsx`)

- **Architectural Key Light:** Warm 5500K spotlight (`#fffaf0`, intensity: 95) with soft PCF shadow casting, ensuring light garments retain crisp textile detail.
- **Atmospheric Fill:** Controlled electric violet fill (`#7042a6`, intensity: 1.4) maintaining the dark couture spatial depth.
- **Warm Side Fill:** Neutral soft studio fill (`#f2dfcd`, intensity: 1.1) preventing harsh voids.
- **Rim Light:** Specular edge light (`#f5e4cb`, intensity: 2.8) catching translucent organza and roped shoulder rolls.
- **Pedestal Grounding:** Soft contact shadow (`opacity: 0.72, scale: 7.0, blur: 2.2`) anchoring the mannequin plinth.
