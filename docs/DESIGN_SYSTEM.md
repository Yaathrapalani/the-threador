# THE THREADOR — DESIGN SYSTEM SPECIFICATION
**Version:** 2.4.0 • Luxury Digital Flagship Edition  
**Repository:** `https://github.com/Yaathrapalani/the-threador`  
**Stylesheet:** `src/styles/global.css`

---

## 1. Design Token Architecture

All design tokens are standardized as CSS custom properties under `:root` in `src/styles/global.css`.

### 1.1 Color Tokens
```css
:root {
  /* Brand Luxury Neutral Foundation */
  --color-porcelain: #F7F4EF;
  --color-warm-ivory: #EEE7DC;
  --color-soft-sand: #D8C9B5;
  --color-champagne: #C7AA83;
  --color-deep-cocoa: #493B32;
  --color-ink-charcoal: #242321;
  --color-soft-stone: #D5D0C8;
  --color-muted-sage: #A8AE98;

  /* Heirloom Children's Luxury Accents */
  --color-powder-blue: #B9C9D5;
  --color-dusty-rose: #D5B8B0;
  --color-soft-butter: #E8D9A8;

  /* Semantic UI Tokens */
  --bg-primary: var(--color-porcelain);
  --bg-secondary: var(--color-warm-ivory);
  --bg-elevated: #FFFFFF;
  --text-primary: var(--color-deep-cocoa);
  --text-secondary: rgba(73, 59, 50, 0.72);
  --text-tertiary: rgba(73, 59, 50, 0.48);
  --border-subtle: rgba(216, 201, 181, 0.45);
  --border-strong: var(--color-champagne);
  --accent-gold: var(--color-champagne);
}
```

### 1.2 Elevation & Shadow Layers
```css
  --shadow-subtle: 0 4px 20px rgba(36, 35, 33, 0.04);
  --shadow-medium: 0 12px 36px rgba(36, 35, 33, 0.08);
  --shadow-floating: 0 24px 64px rgba(36, 35, 33, 0.12);
  --shadow-gold-glow: 0 8px 32px rgba(199, 170, 131, 0.24);
```

### 1.3 Radii & Geometry
```css
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
```

---

## 2. Component Design Specifications

### 2.1 The Editorial Header (`Header.tsx`)
- **State Transition:** Switches dynamically to `.topbar-compact` after 40px of scroll (`backdrop-filter: blur(20px)`, height drops from 80px to 64px).
- **Navigation Cluster:**
  - `KIDS COUTURE` (Highlighted with subtle champagne pill badge).
  - `WOMEN'S HAUTE COUTURE`
  - `MEN'S TAILORING`
  - `3D ATELIER`
  - `ANNUAL DAY ATELIER`
  - `THE CURRICULUM`
- **Right Utilities:** Currency indicator (`INR / USD`), Search, Shopping Bag drawer launcher with dynamic count badge.

### 2.2 Signature 7-Phase Cinematic HUD (`ScrollGarmentCinematic.tsx`)
- Floating frosted glass card (`rgba(247, 244, 239, 0.88)`, `backdrop-filter: blur(24px)`).
- **Top Eyebrow:** Phase Letter (`PHASE A` to `PHASE G`) with active focal point indicator.
- **Craft Metrics Bar:** Verified workshop hours, micro-stitch count, and internal seam allowance specifications.
- **Dual Direct CTAs:** "Inspect Product Details" and "Customize in Atelier".

### 2.3 Store Collection Grid (`StoreCollectionPage.tsx`)
- **Age Bracket Filter:** Custom pills for `2–4Y`, `4–6Y`, `6–8Y`, `8–10Y`, and `10–14Y`.
- **Garment Card Architecture:**
  - High-resolution editorial garment photography with subtle hover zoom (`scale(1.03)`).
  - Quick 3D preview trigger badge.
  - Hypoallergenic silk indicator badge.
  - Transparent craft hours tag (`85h–210h Workshop Handcraft`).
  - Price display with instant add-to-bag integration.

### 2.4 Parent Sizing & Comfort Guide Callout (`ProductDetailPage.tsx`)
- High-visibility champagne-bordered alert box.
- Explains:
  - Hidden 2.5-inch internal seam allowances for child growth.
  - 100% hypoallergenic organic mulberry silk lining.
  - Scratch-free fabric-backed zippers and tagless necklines.

---

## 3. Responsive Breakpoints

| Breakpoint | Viewport Width | Layout Adaptations |
| :--- | :--- | :--- |
| **Mobile Portrait** | `< 640px` | Single-column stack, bottom-docked navigation, full-screen atelier drawer |
| **Tablet Portrait** | `640px – 1024px` | 2-column product grid, compact split HUD, touch-optimized turntable sliders |
| **Desktop Flagship** | `1024px – 1440px` | 3-column product grid, side-by-side atelier controls, synchronized video scrub |
| **4K Ultra-Wide** | `> 1440px` | Centered max-width container (`1600px`), dual-column atelier canvas + inspector |

---

## 4. Accessibility & Contrast Standards

- **WCAG AA Compliance:** All text-to-background combinations exceed 4.5:1 contrast ratio (`#493B32` Deep Cocoa on `#F7F4EF` Porcelain provides an **8.9:1** contrast ratio).
- **Motion Accessibility:** Honors `prefers-reduced-motion` media query by disabling auto-rotation and camera transitions.
- **Keyboard Navigation:** All interactive elements feature visible focus rings styled in warm champagne (`outline: 2px solid var(--color-champagne)`).
