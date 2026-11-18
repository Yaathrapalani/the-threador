# THE THREADOR
### World-Class Children's Luxury Fashion House, Men's & Women's Bespoke Collections, and 3D Atelier

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r182-black.svg)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38b2ac.svg)](https://tailwindcss.com/)

> **"Clothing, considered."**  
> *"A little imagination. A lot of craftsmanship."*

---

## 1. Executive Summary & Brand Positioning

**THE THREADOR** is a complete, production-grade luxury fashion destination curated around **Children's Luxury Fashion (Project Little Universe)** as its primary commercial and visual focus, supported by independent and equally respected **MEN'S ARCHITECTURAL TAILORING** and **WOMEN'S HAUTE COUTURE** collections.

Following a reference-led visual transformation inspired by dark fashion laboratories (such as THREADLAB), the entire platform is unified under a dark couture / fashion-technology design foundation: deep obsidian spatial envelopes, atmospheric electric violet depth, hairline technical grid frameworks, and restrained acid-lime telemetry accents.

### Key Platform Deliverables:
1. **Project Little Universe (`KidsLittleUniverse.tsx` / `/kids`)**:
   - **Two-Audience Switcher:** Seamlessly toggles between **The Little World** (child and family discovery via wonder, occasions, botanical silk colors) and **The Parent’s Atelier** (pediatric skin ergonomics, 2.5" hidden French growth allowances, and parent sizing guides).
   - **The Occasion Explorer:** Specialized storytelling for Milestone Birthdays, Ceremonial Weddings, Festive Traditions, and School Annual Day Arts.
   - **The Colour Garden:** 9 nature-inspired botanical silk shades (Powder Blue, Soft Butter, Dusty Rose, Gentle Lavender, Muted Mint, Soft Coral, Warm Apricot, Royal Plum).
   - **The Fabric Observatory:** Interactive exploration of Mulberry Silk Organza, English Cotton Velvet, Bamboo-Silk Tulle, and Varanasi Kadhwa Zari Brocade with live sensory and breathability telemetry.
   - **Child Wishlist & Friendly Handoff:** Children collect favorite garments and share them with parents over WhatsApp with zero commercial pressure.
   - **Pediatric Tailoring Standards:** Standard inclusion of 2.5-inch hidden French growth seams, tagless laser-printed necklines, and 100% hypoallergenic organic mulberry silk linings.
2. **3D Atelier Laboratory (`AtelierWorkspace.tsx` / `/atelier`)**:
   - High-end dark technical garment laboratory featuring a **3-panel + bottom toolbar architecture**.
   - **Left Panel:** Technical Garment Blueprint CAD preview, Material Swatch Gallery with category filtering (`ALL`, `SILK`, `VELVET`, `WOOL`, `BROCADE`), and tactile fiber physics.
   - **Center Viewport:** Real-time Three.js Canvas, HUD telemetry, 6 camera presets (`FRONT`, `3/4`, `PROFILE`, `REAR`, `MACRO`, `SEAMS`), turntable auto-rotation, 3 studio lighting modes (`VIOLET`, `HIGH-CONTRAST`, `NEUTRAL`), and expanding bottom toolbar with 7 configuration modes (`MODEL`, `COLOUR`, `FABRIC`, `PATTERN`, `FIT`, `ACCENTS`, `CUSTOM`).
   - **Right Panel:** Live Configuration Specification Dossier, real-time pricing calculation, artisan metrics (hours & stitches), Add-to-Bag, and direct WhatsApp concierge quote action.
3. **Independent MEN & WOMEN Collections**: Complete storefronts (`/men` and `/women`) with dedicated product dossiers, filtering, and bespoke sizing.
4. **Cinematic Scroll Experience (`ScrollGarmentCinematic.tsx`)**: 7-phase reveal supporting KIDS, MEN, and WOMEN with synchronized 1080p video scrub and instant toggling into interactive 3D WebGL inspection.
5. **Institutional Service Gateways**:
   - **School Annual Day Costume Atelier (`/annual-day`):** Full-scale costume production, batch tailoring, and institutional logistics.
   - **Parent Certification: Textile Science (`/course`):** 8-Grade progressive curriculum for parents and students exploring natural fibers, indigenous weaving looms, and textile history.

---

## 2. Dark Couture Master Color System

| Token | Hex | Semantic Role |
| :--- | :--- | :--- |
| `Obsidian` | `#08070C` | Primary foundational background |
| `Midnight` | `#100C18` | Elevated containers & modal surfaces |
| `Deep Aubergine` | `#21132C` | Atmospheric gradient depth |
| `Surface Elevated` | `#17131D` | Interactive card & dock surfaces |
| `Surface Secondary`| `#201B27` | Hover states & nested trays |
| `Electric Violet` | `#7042A6` | Atmospheric lighting bounce & active borders |
| `Muted Lilac` | `#A68CBF` | Secondary typography & soft accents |
| `Acid Lime` | `#B7E33B` | High-precision telemetry, CTA buttons, status badges |
| `Text Primary` | `#F1EEF4` | High-contrast crisp typography |
| `Text Secondary` | `#B8B0C0` | Soft readable editorial text |
| `Border Subtle` | `#302A38` | 1px hairline boundary |
| `Border Strong` | `#494052` | Focused card & active tab boundaries |

---

## 3. Platform Architecture & Documentation Suite

```
story-behind-what-we-wear/
├── docs/                                            # Complete technical & production documentation suite
│   ├── BRAND_GUIDELINES.md                          # Master brand identity, dark couture philosophy & tone
│   ├── DESIGN_SYSTEM.md                             # Color tokens, technical grid & component specifications
│   ├── ATELIER_WORKSPACE.md                         # 3D technical laboratory architecture & bottom toolbar
│   ├── KIDS_BRAND_STRATEGY.md                       # Project Little Universe brand charter & positioning
│   ├── KIDS_DEVELOPMENTAL_RESEARCH.md               # Pediatric ergonomics, dermal barriers & center-of-gravity
│   ├── KIDS_DESIGN_SYSTEM.md                        # Kids tokens, botanical silk palette & component specs
│   ├── KIDS_FASHION_CURATORIAL_GUIDE.md             # Silhouettes, heirloom narratives & occasion storytelling
│   ├── KIDS_GARMENT_STANDARDS.md                    # 2.5" hidden French seams, thread tolerances & stitch density
│   ├── KIDS_MATERIAL_LIBRARY.md                     # Certified natural fibers, sensory profiles & OEKO-TEX
│   ├── KIDS_USER_RESEARCH.md                        # Personas, decision journeys & pediatric friction points
│   ├── KIDS_PRIVACY_AND_SAFETY.md                   # COPPA, GDPR-K, zero data harvesting & child digital safety
│   ├── KIDS_PRODUCT_SAFETY.md                       # ASTM F963 pull tests, choking hazards & flammability
│   ├── KIDS_3D_PIPELINE.md                          # Juvenile mannequins, PBR transmission shaders & WebGL
│   ├── KIDS_COMMERCE_ARCHITECTURE.md                # Pricing formulas, artisan hours & omnichannel checkout
│   ├── KIDS_CONNECTOR_INTEGRATIONS.md               # WhatsApp API, Razorpay webhooks & Google Flow MCP
│   ├── KIDS_ACCESSIBILITY.md                        # WCAG 2.2 AA compliance, ARIA landmarks & reduced motion
│   ├── 3D_GARMENT_PIPELINE.md                       # Procedural geometry, PBR materials & lighting rig
│   ├── ECOMMERCE.md                                 # Product catalog schema, cart service & quotation lifecycle
│   ├── ECOMMERCE_WORKFLOW.md                        # Commercial workflows & quotation lifecycle
│   ├── SCROLL_ANIMATION_SYSTEM.md                   # 7-Phase reveal choreography & dual video/3D sync engine
│   ├── VIDEO_ASSET_PIPELINE.md                      # 1080p video specifications & scroll scrubbing engine
│   └── DEPLOYMENT.md                                # Build commands, CDN strategy & security boundaries
├── public/
│   ├── assets/
│   │   ├── videos/                                  # 1080p Master Video Assets
│   │   │   ├── womens-couture-reveal-1080p.mp4      # 1080p 24fps master women's reveal (5.3MB)
│   │   │   ├── mens-tailored-reveal-1080p.mp4       # 1080p 24fps master men's reveal (10.1MB)
│   │   │   ├── threador-campaign-film-1080p.mp4     # 1080p 24fps architectural split showcase (4.5MB)
│   │   │   └── frames/                              # High-resolution extracted keyframe contact sheets
├── src/
│   ├── components/
│   │   ├── Header.tsx                               # Luxury navigation featuring prominent KIDS COUTURE
│   │   ├── HeroSection.tsx                          # 4K hero with rotating Children's Couture Dress
│   │   ├── KidsLittleUniverse.tsx                   # Project Little Universe flagship (The Little World & Parent Atelier)
│   │   ├── ScrollGarmentCinematic.tsx               # 7-phase reveal (Phases A–G) supporting KIDS, MEN & WOMEN
│   │   ├── DividedAtelier.tsx                       # Interactive resizable split-screen
│   │   ├── StoreCollectionPage.tsx                  # Dedicated storefront for Kids, Men & Women
│   │   ├── ProductDetailPage.tsx                    # Luxury PDP with 3D/Video tabs & Parent Guide
│   │   ├── AtelierWorkspace.tsx                     # 3D Bespoke design studio laboratory (Kids, Men, Women)
│   │   ├── ShoppingBagDrawer.tsx                    # Sliding bag drawer with checkout quotation
│   │   ├── GarmentXRaySection.tsx                   # Interactive structural garment X-Ray
│   │   ├── AnnualDaySection.tsx                     # School costume atelier enquiry workflow
│   │   ├── CourseEnrolmentSection.tsx               # Parent certification enrolment workflow
│   │   └── ...
│   ├── scene/
│   │   ├── HeroCanvas.tsx                           # Master hero Three.js canvas (Kids, Men, Women)
│   │   ├── KidsMannequin.tsx                        # Anatomical child-proportioned haute couture dressform
│   │   ├── KidsOccasionDress.tsx                    # 3D children's celebration organza dress with seed pearls
│   │   ├── KidsFestiveJacket.tsx                    # 3D boys' tailored velvet bandhgala with zardozi collar
│   │   ├── CoutureMannequin.tsx                     # Parisian adult woman mannequin
│   │   ├── CoutureGown.tsx                          # Champagne organza gown with botanical embroidery
│   │   ├── AtelierDualScene.tsx                     # Dual-scene WebGL viewport (Kids, Men, Women)
│   │   └── studioLighting.ts                        # Multi-point studio lighting & HDRI environment
│   ├── data/
│   │   └── storeProducts.ts                         # Complete product catalog (6 Kids, 4 Men, 4 Women)
│   ├── services/
│   │   └── cartService.ts                           # LocalStorage cart state manager & event bus
│   ├── types/
│   │   └── index.ts                                 # TypeScript interfaces & domain types
│   ├── styles/
│   │   └── global.css                               # Complete Dark Couture design tokens & components
```

---

## 4. Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/Yaathrapalani/the-threador.git
cd the-threador

# Install dependencies
npm install

# Start development server
npm run dev
# The application runs at http://localhost:3000/
```

### Production Build
```bash
# Type check and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 5. License & Provenance
Crafted for **THE THREADOR** • Digital Haute Couture Atelier & Cultural Textile Archive.
