# THE THREADOR — DESIGN SYSTEM SPECIFICATION
**Version:** 3.0.0 • Reference-Led Dark Couture & Technical Flagship Edition  
**Repository:** `https://github.com/Yaathrapalani/the-threador`  
**Stylesheet:** `src/styles/global.css`

---

## 1. Design Token Architecture

All design tokens are standardized as CSS custom properties under `:root` in `src/styles/global.css`.

### 1.1 Color Tokens
```css
:root {
  /* Dark Couture Spatial Envelopes */
  --color-obsidian: #08070C;
  --color-midnight: #100C18;
  --color-deep-aubergine: #21132C;
  --color-surface-elevated: #17131D;
  --color-surface-secondary: #201B27;

  /* Fashion-Technology Accents */
  --color-electric-violet: #7042A6;
  --color-muted-lilac: #A68CBF;
  --color-acid-lime: #B7E33B;

  /* Typography Contrast */
  --color-text-primary: #F1EEF4;
  --color-text-secondary: #B8B0C0;
  --color-text-muted: #817989;

  /* Hairline Borders */
  --color-border-subtle: #302A38;
  --color-border-strong: #494052;

  /* Status Indicators */
  --color-status-success: #A6CF68;
  --color-status-warning: #D8AD62;
  --color-status-error: #D77979;

  /* Botanical Silk Accents (The Colour Garden) */
  --color-powder-blue: #8EA8C3;
  --color-soft-butter: #E8D595;
  --color-dusty-rose: #C49A9B;
  --color-gentle-lavender: #B5A0D0;
  --color-muted-mint: #8FBCA4;
  --color-soft-coral: #D48B80;
  --color-warm-apricot: #DE9E7D;
  --color-royal-plum: #4A284D;

  /* Semantic UI Aliases */
  --bg-primary: var(--color-obsidian);
  --bg-secondary: var(--color-midnight);
  --bg-elevated: var(--color-surface-elevated);
  --text-primary: var(--color-text-primary);
  --text-secondary: var(--color-text-secondary);
  --text-tertiary: var(--color-text-muted);
  --border-subtle: var(--color-border-subtle);
  --border-strong: var(--color-border-strong);
  --accent-gold: var(--color-acid-lime);
}
```

### 1.2 Technical Grid Background
```css
.site-shell,
.kids-universe-root,
.hero-scroll-track,
.atelier-laboratory-root {
  background-color: var(--color-obsidian);
  background-image: 
    linear-gradient(rgba(112, 66, 166, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(112, 66, 166, 0.04) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

### 1.3 Hairline Borders & Geometry
- **Hairline Borders:** `1px solid var(--color-border-subtle)` (`#302A38`) for structural panels; `1px solid var(--color-border-strong)` (`#494052`) for interactive focus.
- **Radii:** Restrained architectural radii (`--radius-xs: 2px;`, `--radius-sm: 3px;`, `--radius-md: 4px;`).
- **Glassmorphism:** `backdrop-filter: blur(16px)` on dark surfaces (`rgba(16, 12, 24, 0.85)`).

---

## 2. Component Design Specifications

### 2.1 The Editorial Header (`Header.tsx`)
- Dark glass container (`rgba(8, 7, 12, 0.85)` with `backdrop-filter: blur(20px)` and hairline border).
- Brand monogram with acid-lime sub-tagline `"DIGITAL COUTURE ATELIER"`.
- Navigation pills with violet / acid-lime focus indicators.

### 2.2 3D Atelier Laboratory (`AtelierWorkspace.tsx`)
- **Left Panel (Blueprint & Swatches):** CAD vector blueprint, category filter pills (`ALL`, `SILK`, `VELVET`, `WOOL`, `BROCADE`), and tactile fiber data cards.
- **Center Viewport:** Real-time WebGL canvas with interactive HUD telemetry, 6 camera presets, 3 studio lighting modes, and expandable bottom toolbar.
- **Right Panel (Technical Dossier):** Real-time pricing calculations, artisan handcraft metrics, sizing selectors, and one-click WhatsApp dossier transmission.

### 2.3 Project Little Universe (`KidsLittleUniverse.tsx`)
- Two-audience switcher (`THE LITTLE WORLD` vs `THE PARENT'S ATELIER`).
- Occasion Explorer cards with emoji tokens and bespoke narratives.
- Botanical Silk Colour Garden flower pills.
- Fabric Observatory interactive tabs with breathability and sensory metrics.
- Floating child wishlist bar and friendly WhatsApp sharing handoff.
- Pediatric comfort banner highlighting 2.5" hidden French seams and hypoallergenic silk linings.
- Age-segmented product grid (`2–4Y`, `4–6Y`, `6–8Y`, `8–10Y`, `10–14Y`).

---

## 3. Responsive Breakpoints

- **Mobile (< 768px):** Single-column stacked layouts, horizontal scrolling pill rows, bottom toolbar collapsibility.
- **Tablet (768px – 1024px):** 2-column grids, compact sidebars.
- **Desktop (>= 1024px):** 3-panel technical workbench layout, 3-column product showcase, multi-tier grid systems.
