# THE THREADOR — 3D Garment Engineering & Three.js WebGL Pipeline

## 1. Overview & Rendering Philosophy

THE THREADOR implements a production-grade 3D WebGL pipeline built on Three.js, React Three Fiber (R3F), and Drei. The pipeline achieves museum-grade realism without relying on multi-hundred-megabyte raw CAD assets, combining procedural geometry, physically based rendering (PBR) shader parameters, multi-source studio lighting, and smooth camera choreography.

---

## 2. Garment Asset Architecture

### 2.1. Womenswear: The Haute Couture Champagne Gown (`src/scene/CoutureGown.tsx`)
The gown is engineered as a layered sculptural silhouette consisting of:
1. **Architectural Inner Bodice:**
   - Sculpted corset silhouette with tailored waist pinch.
   - PBR Material: Champagne silk organza base with subtle transmission (`roughness: 0.28`, `metalness: 0.05`, `sheen: 0.85`, `sheenColor: #FDFBF7`).
2. **Volumetric Layered Skirt & Train:**
   - Layered petal meshes generating natural folds, cascading volume, and natural gravity falloff.
   - Dynamic vertex wind displacement subtly breathing with time-elapsed animation.
3. **Botanical Embroidery & River Pearl Embellishments:**
   - 3D procedural metallic gold thread relief following organic botanical vines.
   - Hand-placed river pearl instances with high clearcoat reflection (`clearcoat: 0.95`, `clearcoatRoughness: 0.08`).

### 2.2. Menswear: The Savile-Inspired Tailored Blazer (`src/scene/MensBlazerMannequin.tsx`)
The men's silhouette delivers crisp, architectural tailoring:
1. **Double-Breasted Torso & Shoulder Construction:**
   - Structured drop-8 stance with roped sleeve heads and floating horsehair chest canvas.
   - PBR Material: Midnight navy Super 150s Merino wool with fine twill normal structure (`roughness: 0.72`, `metalness: 0.02`, `sheen: 0.45`).
2. **Peak Lapels & Hand AMF Pick-Stitching:**
   - Wide 4.25-inch peak lapels with subtle dimensional offset.
   - Hand-stitched AMF edge simulation along lapel borders and pocket flaps.
3. **Real Horn Buttons & Dual Vent Tailoring:**
   - Double-breasted 6x2 button placement with natural polished horn specular response.
   - Working 4-button functional surgeon's cuffs.

### 2.3. Realistic Couture Mannequin (`src/scene/CoutureMannequin.tsx`)
- Matte charcoal / warm graphite museum-grade finish.
- Minimalist editorial proportions (elongated neck, streamlined anatomical contours, no distracting facial features).
- Brushed champagne brass articulation rings at neck and shoulder junctions.

---

## 3. Lighting & Studio Environment (`src/scene/studioLighting.ts`)

To avoid flat unconvincing renders, the Three.js viewport utilizes a bespoke 5-point studio lighting rig:
- **Key Light:** Warm directional light (3800K, intensity: 2.2) positioned at 45° elevation to create soft volumetric shadows in fabric drape folds.
- **Fill Light:** Cool soft ambient fill (5400K, intensity: 1.1) softening contrast and revealing embroidery details in shadow areas.
- **Back/Rim Light:** Sharp high-angle rim light (4200K, intensity: 2.8) outlining silhouette contours and accentuating organza translucency and wool shoulder roll.
- **Under-Glow Light:** Subtle warm bounce (intensity: 0.4) mimicking reflection from warm limestone gallery flooring.
- **Top Down Accent:** Narrow spotlight emphasizing shoulder line and collar craft.

---

## 4. Camera Choreography & Angle Presets

The interactive 3D ateliers (`HeroCanvas`, `AtelierCanvas`, `AtelierWorkspace`) support four calibrated luxury camera angles:
1. **Front Full View (`front`):** Camera at `[0, 0, 4.8]` — Perfect symmetrical editorial framing of the complete garment.
2. **Shoulder & Lapel Macro (`detail`):** Camera at `[0.3, 0.6, 2.2]` — Focus on lapel pick-stitching, collar stand, and bodice embroidery.
3. **Profile Stance (`side`):** Camera at `[3.2, 0.2, 2.8]` — Inspection of side drape, waist suppression, and sleeve pitch.
4. **Train & Back Vent (`back`):** Camera at `[0, -0.2, -4.6]` — View of cascading train, back seam symmetry, and dual jacket vents.

Smooth easing and damping (`lerp` factors between 0.05 and 0.08) prevent jarring jumps, ensuring an effortless luxury navigation feel.
