# PROJECT LITTLE UNIVERSE — DESIGN SYSTEM & TOKENS
## The Threador | Luxury Children's Visual & Component Architecture

---

## 1. Design Token Architecture

The Threador Kids design system integrates seamlessly with the dark couture / fashion technology design foundation, employing deep obsidian environments with vibrant, nature-inspired botanical silk accents and precision acid-lime indicators.

### 1.1 Core Atmosphere Tokens

```css
:root {
  /* Dark Couture Foundation */
  --kids-bg-obsidian: #08070C;
  --kids-bg-midnight: #100C18;
  --kids-bg-aubergine: #21132C;
  --kids-surface-elevated: #17131D;
  --kids-surface-secondary: #201B27;
  
  /* Precision Fashion-Tech Accents */
  --kids-accent-violet: #7042A6;
  --kids-accent-lilac: #A68CBF;
  --kids-accent-lime: #B7E33B;
  
  /* High-Contrast Typography */
  --kids-text-primary: #F1EEF4;
  --kids-text-secondary: #B8B0C0;
  --kids-text-muted: #817989;
  
  /* Hairline Borders */
  --kids-border-subtle: #302A38;
  --kids-border-strong: #494052;
}
```

### 1.2 Botanical Silk Palette (The Colour Garden)

The botanical palette draws from natural vegetable dyes, wild tussar silks, and temple flower extracts:

| Token Name | Hex Code | Swatch Context | Inspiration & Material Association |
| :--- | :--- | :--- | :--- |
| `--color-powder-blue` | `#8EA8C3` | Light morning blue | Natural indigo vat dye over mulberry organza |
| `--color-soft-butter` | `#E8D595` | Warm sunlight gold | Raw unbleached tussar silk and turmeric tincture |
| `--color-dusty-rose` | `#C49A9B` | Gentle petal pink | Madder root and dried rose water infusion |
| `--color-gentle-lavender` | `#B5A0D0` | Twilight mist lilac | Wild Himalayan lavender flower extract |
| `--color-muted-mint` | `#8FBCA4` | Dewy leaf green | Eucalyptus and copper-bath vat dye |
| `--color-soft-coral` | `#D48B80` | Celebration warmth | Annatto seed dye over spun habotai silk |
| `--color-warm-apricot` | `#DE9E7D` | Harvest glow peach | Safflower and marigold petal brew |
| `--color-royal-plum` | `#4A284D` | Midnight velvet | Logwood bark and iron mordant over cotton velvet |

---

## 2. Typography Hierarchy

```
H1 Monumental:   Cormorant Garamond (Light / 300 / 32–52px / -0.02em letter-spacing)
H2 Chapter:       Cormorant Garamond (Regular / 400 / 24–30px)
H3 Section:       Cormorant Garamond (Medium / 500 / 18–22px)
Body Copy:        Inter / Sans (Regular / 400 / 13–15px / 1.65 line-height)
Technical Pills:  JetBrains Mono (Semi-bold / 600 / 8–10px / 0.12–0.18em tracking)
```

---

## 3. Component Specifications

### 3.1 Two-Audience Switcher (`.audience-mode-switcher-container`)
- Two segmented tabs toggle between **The Little World** (`little-world`) and **The Parent’s Atelier** (`parent-atelier`).
- Active tab displays a subtle linear gradient (`linear-gradient(135deg, rgba(112, 66, 166, 0.18), rgba(23, 19, 29, 0.95))`) with an electric violet border and acid-lime icon illumination.

### 3.2 Occasion Cards (`.occasion-card`)
- Aspect: Clean vertical card with an emoji token, serif title, monospace subtitle, and brief narrative.
- Interaction: On hover, elevates with a violet hairline border. On active selection, highlights with an acid-lime accent border and subtle glow.

### 3.3 Colour Garden Pills (`.colour-flower-pill`)
- Pill-shaped selector containing a 10px circular color dot and typography label.
- Supports tactile browsing for children and families.

### 3.4 Product Card Architecture (`.kids-product-card`)
- Aspect ratio: 4:5 image container with smooth scale-up zoom on hover.
- Top badges: Monospace age bracket pill (e.g., `6–8Y Scale`) and craftsmanship time (`48H HANDCRAFT`).
- Quick actions: Concealed on resting state; smoothly reveals `INSPECT DETAILS` and `QUICK ADD` buttons on hover.
- Quality guarantees: `100% ORGANIC SILK LINED` and `2.5" GROWTH BUFFER` micro-pills permanently visible in the footer.

### 3.5 Floating Wishlist Tray (`.child-wishlist-floating-bar`)
- Positioned fixed at the bottom center.
- Provides immediate visual feedback when children heart items without commercial pressure or checkout intimidation.
- Features a single high-contrast action button: `SHOW MUM & DAD MY FAVOURITES`, which opens the non-invasive sharing dialog.

---

## 4. Responsive Grid Breakpoints

- **Desktop (>= 1200px):** 3-column product grid, 5-column occasion strip, 2-column institutional split.
- **Tablet (768px – 1199px):** 2-column product grid, auto-wrap occasion cards, stacked fabric observatory.
- **Mobile (< 768px):** 1-column product cards, scrollable horizontal occasion strip, full-width modal dialogues.
