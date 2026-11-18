# THE THREADOR — 3D Garment Engineering & Three.js WebGL Pipeline

## 1. Overview & Rendering Philosophy

THE THREADOR implements a production-grade 3D WebGL pipeline built on Three.js, React Three Fiber (R3F), and Drei. The pipeline achieves museum-grade realism across three distinct collections: **KIDS (Primary)**, **MEN**, and **WOMEN**.

---

## 2. Garment Asset Architecture

### 2.1. Children's Luxury Collection (Primary Focus)

#### A. Authentic Child-Proportioned Couture Mannequin (`src/scene/KidsMannequin.tsx`)
Unlike scaled-down adult models, the child dressform is anatomically engineered specifically for children (approx. 6–8 year old scale):
- **Natural Child Proportions**: 1:5.2 head-to-body proportion ratio, softer rounded shoulder slopes, shorter cylindrical torso, and natural unpinched waist.
- **Museum Stand**: Cast bronze pedestal base with brushed champagne brass riser pole and height-adjustment collar ring.
- **Finish**: Fine French porcelain linen canvas with subtle weave bump.

#### B. The Petit Fleur Heirloom Silk Organza Gown (`src/scene/KidsOccasionDress.tsx`)
- **Bodice & Collar**: Scalloped double-faced Peter Pan collar, empire waistline, and delicate puff cap sleeves.
- **Buoyant Skirt**: Triple-tiered organza bell flare with harmonic natural gravity, subtle breathing displacement, and a wide silk satin sash with spine bow.
- **Embellishments**: Micro gold-wire botanical vine relief and 36 hand-anchored freshwater river seed pearls along the front placket.
- **PBR Specifications**: `roughness: 0.32`, `metalness: 0.04`, `opacity: 0.94`, `sheen: 0.85`.

#### C. The Little Prince Royal Velvet Bandhgala (`src/scene/KidsFestiveJacket.tsx`)
- **Structure**: Contoured mandarin collar stand with gold zardozi piping, soft pagoda shoulders, seven faceted crest buttons, and breast welt pocket with folded ivory silk square.

---

### 2.2. Menswear: The Savile-Inspired Tailored Blazer (`src/scene/AtelierDualScene.tsx`)
- **Construction**: Floating unbleached Mongolian horsehair canvas, structured drop-8 stance, wide silk satin peak lapels, and 0.5mm AMF hand-stitched borders.
- **Buttons & Cuffs**: Double-breasted 6x2 brass crest placement and functioning surgeon's cuffs.

---

### 2.3. Womenswear: The Haute Couture Champagne Gown (`src/scene/CoutureGown.tsx`)
- **Silhouette**: French silk organza cut on a 45° bias, ten continuous spiral steel boning channels, botanical aari embroidery, and 45 natural freshwater river pearls.

---

## 3. Studio Lighting Rig & Environment

- **Kids Lighting**: Luminous champagne daylight (4200K, intensity: 4.4) paired with gentle powder blue and soft butter bounce fills.
- **Men's Lighting**: High-contrast directional illumination (5400K, intensity: 4.8) defining roped shoulders and lapel fold depth.
- **Women's Lighting**: Warm golden chiaroscuro (3800K, intensity: 4.2) highlighting organza translucency and pearl iridescence.
