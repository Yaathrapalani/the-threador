# THE THREADOR — 3D ATELIER WORKSPACE ARCHITECTURE
**Version:** 2.4.0 • Luxury Digital Flagship Edition  
**Repository:** `https://github.com/Yaathrapalani/the-threador`  
**Component:** `src/components/AtelierWorkspace.tsx`  
**Scene Engine:** Three.js / React Three Fiber (`src/scene/HeroCanvas.tsx`, `src/scene/AtelierDualScene.tsx`)

---

## 1. Overview & Purpose

The 3D Atelier Workspace is THE THREADOR's flagship interactive customizer. It transitions the client from a passive observer into an active co-creator, allowing bespoke personalization across all three fashion universes:
- **Children's Luxury Fashion (`gender: 'kids'`)**
- **Women's Haute Couture (`gender: 'women'`)**
- **Men's Architectural Tailoring (`gender: 'men'`)**

---

## 2. Interactive Feature Matrix

| Feature | Kids Atelier | Women's Atelier | Men's Atelier |
| :--- | :--- | :--- | :--- |
| **PBR Fabric Swatching** | Heirloom Mulberry Silk, Cotton Velvet, Linen | Lyon Silk Organza, Silk Faille, Silk Satin | Super 150s Merino, Banarasi Brocade, Barathea |
| **Colorway Palettes** | Champagne, Powder Blue, Dusty Rose, Soft Butter | Champagne Ivory, Deep Cocoa, Ink Charcoal, Dusty Rose | Midnight Charcoal, Deep Navy, Espresso Brown, Antique Olive |
| **Collar / Lapel Variations** | Scalloped Peter Pan, Mandarin Stand | Sweetheart Neckline, Sculptural High Arch | Peak Satin Lapel, Shawl Collar, Notch |
| **Embellishment Options** | Freshwater Seed Pearls, Zardozi Gold Vines | 45 Graduated River Pearls, Lotus Wire Couching | Cast Brass Crests, Antique Horn Buttons |
| **Bespoke Monogramming** | Child Initials on Inner Silk Waist Sash | Atelier Date & Monogram on Internal Lining | Hand-Embroidered Monogram on Undercollar |
| **Growth & Fit Controls** | 2.5" Hidden Seam Allowance, Growth Expansion | Made-to-Measure Corset Contouring | Savile Row Bespoke Anatomical Drop |

---

## 3. Child Bespoke & Growth Allowance Controls

Unlike conventional adult customizers, the Children's Atelier features specialized pediatric tailoring options:

```typescript
// Customization State Schema (AtelierWorkspace.tsx)
interface ChildCustomizationConfig {
  ageBracket: '2-4Y' | '4-6Y' | '6-8Y' | '8-10Y' | '10-14Y';
  monogramInitials: string;               // Max 3 characters
  monogramPlacement: 'inner-sash' | 'lining' | 'hem';
  growthAllowance: boolean;              // Adds 2.5" hidden French seams
  hypoallergenicLining: boolean;          // 100% organic mulberry silk
  customMeasurements: {
    chestCircumferenceCm: number;
    shoulderToFloorCm: number;
    torsoLengthCm: number;
  };
}
```

---

## 4. Camera Presets & Orbit Controls

The Atelier provides 4 instant camera presets:
1. **Full Elevation (`preset: 'front'`):** Camera at `[0, 0, 4.2]` framing the full silhouette from pedestal to crown.
2. **Collar & Neckline (`preset: 'neckline'`):** Camera zooms to `[0, 0.7, 1.8]` focusing on Peter Pan collar scallops and silk zipper guard.
3. **Embroidery Macro (`preset: 'bodice'`):** Camera positioned at `[0, 0.2, 1.4]` with grazing light to highlight metallic zardozi relief and seed pearl anchors.
4. **Skirt Drape (`preset: 'skirt'`):** Low-angle framing at `[0, -0.6, 2.2]` displaying multi-tier organza buoyancy and internal hem buffers.

---

## 5. Direct Quotation & Cart Integration

Once configured, the user can either:
- **Add Bespoke Commission to Cart:** Generates a unique customized cart item stored with serial configuration parameters.
- **Request Private Atelier Consultation:** Launches a dedicated consultation modal with WhatsApp concierge direct routing and formal quotation generation.
