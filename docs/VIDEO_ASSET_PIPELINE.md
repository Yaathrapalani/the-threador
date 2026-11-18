# THE THREADOR — 1080p Cinematic Video Asset Pipeline & Architecture

## 1. Executive Summary

THE THREADOR integrates high-definition 1080p cinematic video assets directly into a scroll-scrubbed interactive storytelling canvas. This document details the video asset inventory, video codec profiles, contact sheet frames, scroll scrubbing synchronization mechanisms, and the seamless dual-mode handoff between 1080p cinema and WebGL 3D rendering.

---

## 2. Master 1080p Video Inventory

The production deployment embeds three 1080p master films located in `public/assets/videos/`:

| Asset File | Resolution | FPS | Codec | Size | Duration | Visual Narrative |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `womens-couture-reveal-1080p.mp4` | 1920 x 1080 | 24 | H.264 / AAC | 5.3 MB | 10.0 s | Full-length rotating couture mannequin in champagne organza gown with botanical embroidery, river pearls, and cascading train. |
| `mens-tailored-reveal-1080p.mp4` | 1920 x 1080 | 24 | H.264 / AAC | 10.1 MB | 10.0 s | Architectural double-breasted midnight navy bespoke blazer with peak lapels, hand AMF pick-stitching, horn buttons, and tailored sleeve cuffs. |
| `threador-campaign-film-1080p.mp4` | 1920 x 1080 | 24 | H.264 / AAC | 4.5 MB | 10.0 s | The Threador editorial campaign film showcasing dual Men and Women mannequins divided by an architectural brass seam in a neoclassical hall. |

*Note: Original raw assets remain preserved in the repository root as archival reference copies.*

---

## 3. High-Resolution Extracted Contact Sheet Frames

To guarantee instantaneous rendering prior to video buffering and provide fallback preview cards, 9 representative keyframes were extracted using FFmpeg at `q:v 2` (equivalent to 95%+ JPEG quality) and stored in `public/assets/videos/frames/`:

1. **Womenswear Couture Gown Series:**
   - `womens-01s.jpg` — Silhouette & Opening Contour (0.00s - 1.67s): Minimalist negative space framing full silhouette.
   - `womens-frame-05s.jpg` — Corset Structure & Macro Embroidery (3.33s - 5.00s): Close-up of layered organza and botanical gold thread.
   - `womens-09s.jpg` — River Pearl Button Placket & Train (6.67s - 10.00s): Full 360-degree rotation showing cascading hemline.

2. **Menswear Tailored Blazer Series:**
   - `mens-01s.jpg` — Double-Breasted Silhouette & Drop-8 Stance (0.00s - 1.67s): Crisp architectural drape against midnight background.
   - `mens-frame-05s.jpg` — Peak Lapels & AMF Hand Pick-Stitching (3.33s - 5.00s): Macro focus on silk buttonhole and hand-stitched edges.
   - `mens-09s.jpg` — Horn Buttons & Tailored Sleeve Head (6.67s - 10.00s): Dynamic turn highlighting sleeve pitch and back vent drape.

3. **Campaign Architectural Split Series:**
   - `campaign-01s.jpg` — Neoclassical Atelier Entryway.
   - `campaign-frame-05s.jpg` — Dual Mannequin Split Staging.
   - `campaign-09s.jpg` — Haute Couture Fabric Swatches & Lighting Shift.

---

## 4. Scroll-Driven Scrubbing Architecture

The video playback engine in `src/components/ScrollGarmentCinematic.tsx` synchronizes video playback with scroll and slider interactions:

```typescript
// Scrubbing algorithm
const handleProgressUpdate = (targetProgress: number) => {
  setProgress(targetProgress);
  if (videoRef.current && Number.isFinite(videoRef.current.duration)) {
    videoRef.current.currentTime = targetProgress * videoRef.current.duration;
  }
};
```

### 6-Phase Reveal Sequence
Both Menswear and Womenswear are mapped onto a 6-phase luxury craft progression:
- **Phase 01: The Silhouette** (0.00 - 0.16) — Master line, silhouette stance, shoulder pitch.
- **Phase 02: Structural Bodice / Shoulders** (0.17 - 0.33) — Internal horsehair canvas / spiral steel boning.
- **Phase 03: Botanical Embroidery / Peak Lapels** (0.34 - 0.50) — High-definition threadwork and AMF pick-stitching.
- **Phase 04: Macro River Pearls / Horn Accents** (0.51 - 0.67) — Hand-anchored natural river pearls / genuine horn buttons.
- **Phase 05: Cascading Train / Functional Cuffs** (0.68 - 0.84) — Weighted horsehair hem / surgeon's functional cuff buttonholes.
- **Phase 06: Complete Haute Creation** (0.85 - 1.00) — Direct call-to-actions to either configure in the 3D Atelier or purchase in Store.

---

## 5. Dual Engine Transition (1080p Video ↔ Three.js WebGL)

Visitors can switch seamlessly between two visual rendering modes:
- **Cinema Mode (1080p Film)**: Delivers hyper-realistic, studio-lit video footage with buttery smooth scroll scrubbing.
- **3D Mode (Interactive WebGL Canvas)**: Mounts a Three.js canvas with OrbitControls allowing unrestricted 360° inspection, zoom into micro-textures, and live lighting adjustments.

Both modes share the identical craft HUD status overlay, phase selector, and immediate links to the bespoke tailoring atelier.

