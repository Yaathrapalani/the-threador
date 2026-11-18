# THE THREADOR — SCROLL ANIMATION & CINEMATIC SYSTEM
**Version:** 2.4.0 • Luxury Digital Flagship Edition  
**Repository:** `https://github.com/Yaathrapalani/the-threador`  
**Components:** `src/components/ScrollGarmentCinematic.tsx`, `src/scene/HeroCanvas.tsx`, `src/components/Header.tsx`

---

## 1. Architecture Overview

THE THREADOR's interactive experience is governed by a unified scroll choreography system that orchestrates camera perspective, lighting, asset rotation, and editorial annotations.

```
                  ┌─────────────────────────────────────────┐
                  │        Lenis Smooth Scroll Engine       │
                  └────────────────────┬────────────────────┘
                                       │ Normalized Scroll Delta
                  ┌────────────────────▼────────────────────┐
                  │       GSAP ScrollTrigger Timeline       │
                  └──────┬───────────────────────────┬──────┘
                         │                           │
          ┌──────────────▼──────────┐ ┌──────────────▼──────────┐
          │  1080p Video Scrubbing  │ │ Three.js WebGL Orbit    │
          │  Cinematic Frame Sync   │ │ Real-Time Mesh Rotation │
          └─────────────────────────┘ └─────────────────────────┘
```

---

## 2. The 7-Phase Choreographed Reveal

The signature scroll reveal sequence (`ScrollGarmentCinematic.tsx`) is structured across 7 distinct phases across all three fashion universes (Kids, Women, Men):

| Phase | Designation | Camera Choreography | Technical & Craft Focus |
| :--- | :--- | :--- | :--- |
| **Phase A** | **Full Silhouette** | Full elevation, stationary camera, wide aspect ratio | Full silhouette proportions, negative space balance, authentic anatomical dressform stance |
| **Phase B** | **Camera Approach** | Smooth Dolly-in along Z-axis (`z: 4.5 -> 2.2`) | Neckline construction, collar roll, sensitive skin protection, floating canvas |
| **Phase C** | **Controlled Orbit** | 360° turntable yaw rotation (`0° -> 180°`) | Flared skirt tiers, side suppression, sleeve head drape, radial volume balance |
| **Phase D** | **Construction Reveal** | X-Ray transparency blend, interior cutaway | 2.5" hidden seam allowances, floating horsehair canvas, spiral boning channels |
| **Phase E** | **Macro Inspection** | Extreme macro zoom (`FOV: 22°`, `z: 1.2`) | Real metallic zardozi couching, freshwater seed pearls, 0.5mm AMF pick-stitching |
| **Phase F** | **Return to Complete Garment** | Receding dolly to three-quarter heroic angle | Full garment lighting harmony, train sweep, balanced overall silhouette |
| **Phase G** | **Transition into Atelier & Store** | UI dock expansion, interactive 3D controls enabled | Seamless entry into live 3D Atelier customizer or direct bespoke commission |

---

## 3. Video & 3D Synchronization Engine

### 3.1 Dual-Mode Operation
Users can seamlessly toggle between two viewing modes at any point during inspection:
1. **Cinematic 1080p Master Film:** Playback of high-definition 60fps turntable films (`womens-couture-reveal-1080p.mp4` and `mens-tailored-reveal-1080p.mp4`), frame-synchronized to scroll progress and timeline scrubbing.
2. **Interactive 3D WebGL Canvas:** True real-time Three.js scene enabling arbitrary mouse/touch rotation, pan, zoom, and live material swatching.

### 3.2 Time Scrubbing Mathematics
```typescript
const handleTimeUpdate = useCallback(() => {
  if (!videoRef.current) return;
  const duration = videoRef.current.duration || 10;
  const currentTime = videoRef.current.currentTime;
  const p = currentTime / duration;
  setScrubProgress(p);

  // Map progress [0, 1] into 7 equal phases
  const calculatedPhase = Math.min(
    Math.floor(p * phases.length),
    phases.length - 1
  );
  if (calculatedPhase !== activePhaseIndex) {
    setActivePhaseIndex(calculatedPhase);
  }
}, [activePhaseIndex, phases.length]);
```

---

## 4. Performance Optimizations

- **RAF Throttling:** Lenis scroll listener updates camera matrices via `requestAnimationFrame` to ensure zero jank.
- **Hardware Video Acceleration:** Video elements use `playsinline`, `muted`, `preload="auto"`, and GPU-composited CSS transforms.
- **WebGL Frame Limiting:** When the 3D canvas is not in the active viewport or occluded by the video mode, Three.js rendering loops are paused or throttled to 30fps to preserve battery and GPU memory.
