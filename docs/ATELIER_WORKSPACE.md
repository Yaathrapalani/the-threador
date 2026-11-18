# THE THREADOR — 3D ATELIER WORKSPACE ARCHITECTURE
**Version:** 3.0.0 • Reference-Led Dark Laboratory & Precision Customizer  
**Repository:** `https://github.com/Yaathrapalani/the-threador`  
**Component:** `src/components/AtelierWorkspace.tsx`  
**Scene Engine:** Three.js / React Three Fiber (`src/scene/HeroCanvas.tsx`, `src/scene/AtelierDualScene.tsx`)

---

## 1. Overview & Architectural Layout

The 3D Atelier Workspace transforms the client experience into a high-end digital couture garment laboratory (inspired by THREADLAB's dark fashion-manufacturing and interactive customization interface).

The workspace is organized into a **3-column grid plus bottom toolbar** structure:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              TOP BAR: ATELIER TELEMETRY                                │
├───────────────────┬────────────────────────────────────────────────┬───────────────────┤
│    LEFT PANEL     │                CENTER VIEWPORT                 │    RIGHT PANEL    │
│  (TECHNICAL CAD)  │               (3D WEBGL ENGINE)                │ (CONFIGURATION    │
│                   │                                                │     DOSSIER)      │
│ • Blueprint SVG   │ • Three.js Canvas (Kids, Women, Men)           │ • Live Price Calc │
│   CAD Preview     │ • Camera HUD Presets (Front, 3/4, Profile,     │ • Artisan Hours   │
│ • Material Swatch │   Rear, Macro, Seams)                          │ • Stitch Density  │
│   Gallery         │ • Studio Lighting (Violet, High-Contrast,      │ • Sizing & Growth │
│ • Category Filter │   Neutral)                                     │   Allowance       │
│ • Tactile Metrics │ • Turntable 360° Rotation Engine               │ • Add to Bag &    │
│                   │ • Expanding Bottom Toolbar (7 Modes)           │   WhatsApp VIP    │
├───────────────────┴────────────────────────────────────────────────┴───────────────────┤
│            BOTTOM TOOLBAR: [MODEL] [COLOUR] [FABRIC] [PATTERN] [FIT] [ACCENTS] [CUSTOM] │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Interactive Feature Matrix Across Universes

| Feature | Kids Little Universe | Men's Architectural | Women's Haute Couture |
| :--- | :--- | :--- | :--- |
| **Foundation Silhouette** | Celestia Organza Gown / Matka Kurta | Savile Double-Breasted / Royal Bandhgala | Bias-Cut Slip Gown / A-Line Brocade |
| **Material Swatches** | Mulberry Silk Organza, English Velvet, Bamboo Tulle | Super 150s Merino Wool, Varanasi Brocade | Lyon Silk Organza, Silk Faille, Silk Satin |
| **Tailoring Engineering** | +2.5" Hidden French Seam Growth Buffer | Full Floating Horsehair Canvas & Padded Lapel | Hand-Boned Silk Corsetry Core |
| **Tactile Metrics** | Hypoallergenic Index 100%, Friction Zero | 320 GSM Structural Drape Index | 48 GSM Weightless Floating Radial Drift |
| **Bespoke Monograms** | "Initials + Year" on inner silk sash | Undercollar monogram in gold thread | Inner waist ribbon embroidery |

---

## 3. Viewport Controls & Lighting Modes

### 3.1 Camera Presets
The center viewport HUD features 6 instantaneous camera presets:
1. `FRONT`: Orthographic-aligned full-body frontal elevation.
2. `3/4`: Three-quarter perspective highlighting volume, lapel roll, and drape.
3. `PROFILE`: Side profile framing posture, train length, and collar curvature.
4. `REAR`: Rear perspective displaying back pleating, closures, and sash ties.
5. `MACRO`: Extreme close-up with shallow depth-of-field emphasizing hand-embroidered metallic zari relief.
6. `SEAMS`: Pediatric inspection view focusing on internal hand-felled French seams and hemline buffers.

### 3.2 Studio Lighting Environments
- `VIOLET`: Reference-led dark couture atmospheric violet lighting with deep obsidian shadows and luminous rim highlights.
- `HIGH-CONTRAST`: Directional fashion runway key-light casting sharp structural shadows.
- `NEUTRAL`: 5500K balanced daylight studio lighting for precise textile color matching.

---

## 4. Expanding 7-Mode Bottom Toolbar

The bottom toolbar houses 7 contextual customization modes:
1. **MODEL:** Select between foundational silhouettes for Kids, Men, or Women.
2. **COLOUR:** Browse and apply the Botanical Silk Palette (The Colour Garden).
3. **FABRIC:** Filter through single-origin textiles (Mulberry Silk Organza, English Velvet, Bamboo Tulle, Varanasi Brocade, Wool-Silk).
4. **PATTERN:** Configure weave pattern scales (Plain, Brocade Buttas, Pin-check).
5. **FIT:** Select age brackets (`2–4Y`, `4–6Y`, `6–8Y`, `8–10Y`, `10–14Y`) or input bespoke anatomical chest/height measurements.
6. **ACCENTS:** Choose button types (Carved Mother-of-Pearl, Natural Horn, Antique Brass) and embellishment trims.
7. **CUSTOM:** Input personal bespoke monogram text and select placement location.

---

## 5. Live Dossier & Concierge Transmission

The right panel dynamically computes and displays:
- **Base Price + Add-on Upgrades = Total Investment**
- **Artisan Metrics:** Direct display of handcraft hours (e.g., `48H HANDCRAFT`) and micro-stitch counts (e.g., `18,500 STITCHES`).
- **Growth Allowance Guarantee:** Standard inclusion of 2.5" hidden French seams at zero additional charge.
- **Instant Actions:**
  - `ADD CONFIGURATION TO BAG`: Persists the customized order in `cartService` with complete bespoke attributes.
  - `REQUEST WHATSAPP CONCIERGE QUOTE`: Generates an encrypted markdown specification dossier and opens an instant direct chat with a Master Tailor via `https://wa.me/919488323412`.
