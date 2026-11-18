# THE THREADOR — MASTER BRAND & VISUAL GUIDELINES
**Version:** 3.0.0 • Reference-Led Dark Couture & Digital Flagship Edition  
**Repository:** `https://github.com/Yaathrapalani/the-threador`  
**Brand Philosophy:** *"Clothing, considered."*  
**Kids Universe Manifesto:** *"A little imagination. A lot of craftsmanship."*

---

## 1. Brand Positioning & Architecture

THE THREADOR is a global haute couture house, digital fashion atelier, and textile research laboratory rooted in an ethos of intentionality, ancestral craftsmanship, and quiet luxury. 

Following the reference-led dark couture and fashion-technology transformation, THE THREADOR unifies high fashion with technical precision: deep obsidian atmospheres, atmospheric electric violet illumination, hairline technical grid frameworks, and ultra-restrained acid-lime telemetry accents.

Within this unified dark luxury universe, **The Threador Kids (Project Little Universe)** stands as the preeminent, principal collection, flanked by equally rigorous, independent **Men’s Architectural Tailoring** and **Women’s Haute Couture** divisions.

```
                                      THE THREADOR
                                "Clothing, considered."
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
   PROJECT LITTLE UNIVERSE        MEN'S ARCHITECTURAL TAILORING      WOMEN'S HAUTE COUTURE
   Children's Haute Couture       Savile Row & Royal Bandhgala       Sculptural Eveningwear
   (Primary Centerpiece)          (Super 150s Merino & Velvet)       (Bias-Cut Organza & Brocade)
```

---

## 2. Core Pillars of the Brand

1. **Dark Couture Aesthetic (Inspired by Advanced Fashion Laboratories):**
   - Deep obsidian (`#08070C`) and midnight (`#100C18`) spatial envelopes.
   - Atmospheric electric violet (`#7042A6`) and muted lilac (`#A68CBF`) depth gradients.
   - Restrained acid-lime (`#B7E33B`) precision indicators, HUD callouts, and technical badges.
   - Delicate technical grid overlays (`32px x 32px` hairline rules).

2. **Project Little Universe (The Principal Collection):**
   - Refined, joyful heirloom occasionwear engineered without cartoonish clichés, cheap synthetic trims, or fast-fashion shortcuts.
   - Two-audience architecture: **The Little World** (child discovery through wonder, occasions, colors) and **The Parent’s Atelier** (pediatric skin safety, growth allowances, and tailoring dossiers).
   - Standard 2.5-inch hidden French growth seams and 100% hypoallergenic organic mulberry silk linings.

3. **Men's Architectural Authority:**
   - Sharp, vertical discipline combining Savile Row structure with Indian heritage handlooms (Matka silk, structured cotton velvet, full floating canvas).

4. **Women's Sculptural Couture:**
   - Weightless bias-cut Lyon silk organza, hand-boned corsetry, and authentic aari/zardozi gold couching with river pearls.

---

## 3. The Master Color System (Design Tokens)

### 3.1 Dark Couture Spatial Foundations
- **Obsidian (`#08070C`):** Foundational canvas; absorbs glare and directs intense focus to illuminated 3D garments.
- **Midnight (`#100C18`):** Elevated container, modal backdrop, and card interior tone.
- **Deep Aubergine (`#21132C`):** Atmospheric depth gradient and hero halo glow.
- **Surface Elevated (`#17131D`):** Primary interactive card, dock, and panel surface.
- **Surface Secondary (`#201B27`):** Hover states, nested trays, and secondary widgets.

### 3.2 Fashion-Technology Accents
- **Electric Violet (`#7042A6`):** Atmospheric aura, primary active border, and lighting bounce.
- **Muted Lilac (`#A68CBF`):** Secondary typography, soft decorative outlines, and subtitles.
- **Acid Lime (`#B7E33B`):** High-precision telemetry, live status pings, CTA buttons, and micro-badges.

### 3.3 Text & Typographic Contrast
- **Text Primary (`#F1EEF4`):** Crisp high-contrast off-white with subtle warm undertone (17.4:1 contrast).
- **Text Secondary (`#B8B0C0`):** Soft readable grey-lavender for editorial descriptions (10.8:1 contrast).
- **Text Muted (`#817989`):** Technical labels, metadata, and timestamps (4.8:1 contrast).

### 3.4 Hairline Borders
- **Subtle Border (`#302A38`):** 1px hairline boundary separating panels and grid lines.
- **Strong Border (`#494052`):** Focused card borders, active tabs, and modal boundaries.

### 3.5 Botanical Silk Accents (The Colour Garden)
- **Powder Blue (`#8EA8C3`):** Natural indigo vat dye over mulberry organza.
- **Soft Butter (`#E8D595`):** Raw unbleached tussar silk and turmeric tincture.
- **Dusty Rose (`#C49A9B`):** Madder root and dried rose water infusion.
- **Gentle Lavender (`#B5A0D0`):** Wild Himalayan lavender flower extract.
- **Muted Mint (`#8FBCA4`):** Eucalyptus and copper-bath vat dye.
- **Soft Coral (`#D48B80`):** Annatto seed dye over spun habotai silk.
- **Warm Apricot (`#DE9E7D`):** Safflower and marigold petal brew.
- **Royal Plum (`#4A284D`):** Logwood bark and iron mordant over cotton velvet.

---

## 4. Typography Hierarchy

| Style Role | Font Family | Fallback | Sizing & Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Monumental Display** | `Cormorant Garamond` | `Didot`, serif | 32–64px / Light (300) | Editorial hero headlines, collection titles |
| **Technical Body / UI** | `Inter` | `system-ui`, sans-serif | 12–15px / Regular (400) | Navigation links, product copy, dialogs |
| **Atelier Telemetry** | `JetBrains Mono` | `SF Mono`, monospace | 8–10px / Semi-bold (600) | Stitch counts, craft hours, HUD metrics |

---

## 5. 3D Atelier Workspace Experience

The 3D Atelier operates as an advanced technical fashion laboratory structured into a 3-panel display:
- **Left Panel:** Technical Garment Blueprint CAD preview, Material Gallery with filter tabs (`ALL`, `SILK`, `VELVET`, `WOOL`, `BROCADE`), and tactile physical metrics.
- **Center Viewport:** 3D WebGL Canvas (`HeroCanvas` / `AtelierDualScene`), HUD telemetry, camera presets (`FRONT`, `3/4`, `PROFILE`, `REAR`, `MACRO`, `SEAMS`), turntable toggle, 3 studio lighting modes (`VIOLET`, `HIGH-CONTRAST`, `NEUTRAL`), and bottom toolbar with 7 configuration modes (`MODEL`, `COLOUR`, `FABRIC`, `PATTERN`, `FIT`, `ACCENTS`, `CUSTOM`).
- **Right Panel:** Live Configuration Specification Dossier, real-time pricing calculation, artisan metrics (hours & stitches), Add-to-Bag, and WhatsApp concierge quote action.

---

## 6. Prohibited Visual Tropes

- **NO** bright comic colors (#FF0000, #00FF00, #0000FF).
- **NO** cartoon characters, animal mascots, or childish icons.
- **NO** garish starburst discount badges or countdown panic timers.
- **NO** unstyled default HTML form elements or generic bootstrap layouts.
- **NO** fake static images masquerading as interactive 3D viewports.
