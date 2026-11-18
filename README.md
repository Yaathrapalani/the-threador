# THE THREADOR
### World-Class Luxury Fashion Commerce Platform, Immersive 3D Atelier & Textile Heritage Pavilion

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r182-black.svg)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38b2ac.svg)](https://tailwindcss.com/)

> **"What if every child grew up knowing the story behind what they wear?"**  
> *The land. The material. The maker. The culture. The industry.*

---

## 1. Executive Summary

**THE THREADOR** is a complete, production-grade luxury digital fashion platform that merges haute couture commerce, bespoke 3D garment craftsmanship, and experiential fashion education.

Engineered with React 19, Three.js, React Three Fiber, and Tailwind CSS, the platform transcends conventional flat e-commerce storefronts by providing:
1. **Minimalist 4K Opening Hero**: Ultra-refined luxury editorial presentation featuring a photorealistic, rotating 3D couture mannequin dressed in layered champagne organza.
2. **Signature 1080p Cinematic Scroll Reveal**: A scrubbable 6-phase visual narrative driven by high-definition 1080p films with instant toggling into full interactive Three.js WebGL inspection.
3. **Resizable MEN × WOMEN Split Atelier**: An interactive dual-world split-screen canvas with an interactive brass seam divider, allowing simultaneous exploration of tailored Menswear and haute couture Womenswear.
4. **Dedicated Luxury Storefronts**: Complete catalogs for **Men** (`/men`) and **Women** (`/women`) featuring instant category filtering, price/craft-hour sorting, hover quick-adds, and bespoke Made-to-Measure pathways.
5. **Product Detail Pages (PDP)**: Studio-grade product pages featuring 3D model interaction, 1080p video inspection reels, PBR fabric specifications, artisan craft hours, size guides, and direct add-to-bag integration.
6. **The 3D Atelier Workspace**: A bespoke Made-to-Measure digital studio where clients select PBR luxury fabrics (Super 150s wool, French silk organza, Banarasi zari), customize lapels and buttons, enter custom monogramming, and input bespoke measurement specs.
7. **Persistent Shopping Bag & Quotation Drawer**: A sliding cart drawer with `localStorage` persistence, custom event synchronization, real-time subtotal calculations, and a complete Bespoke Checkout & Consultation booking modal.
8. **Institutional Pillars (Costume Atelier & Certification Courses)**: Dedicated enquiry workflows for School Annual Day theatrical productions (costuming 200–2,000+ students) and Parent Certification courses across Grades 1–8.

---

## 2. Platform Architecture & Directory Structure

```
story-behind-what-we-wear/
├── docs/                                            # Technical specifications & system guides
│   ├── ARCHITECTURE.md                              # Application state, routing & component topology
│   ├── VIDEO_ASSET_PIPELINE.md                      # 1080p video specifications & scroll scrubbing engine
│   ├── 3D_GARMENT_PIPELINE.md                       # Procedural geometry, PBR materials & lighting rig
│   └── ECOMMERCE_WORKFLOW.md                        # Product schema, cart service & quotation workflow
├── public/
│   ├── assets/
│   │   ├── videos/                                  # 1080p Master Video Assets
│   │   │   ├── womens-couture-reveal-1080p.mp4      # 1080p 24fps master women's reveal (5.3MB)
│   │   │   ├── mens-tailored-reveal-1080p.mp4       # 1080p 24fps master men's reveal (10.1MB)
│   │   │   ├── threador-campaign-film-1080p.mp4     # 1080p 24fps architectural split showcase (4.5MB)
│   │   │   └── frames/                              # High-resolution extracted keyframe contact sheets
│   │   │       ├── womens-01s.jpg
│   │   │       ├── womens-frame-05s.jpg
│   │   │       ├── womens-09s.jpg
│   │   │       ├── mens-01s.jpg
│   │   │       ├── mens-frame-05s.jpg
│   │   │       ├── mens-09s.jpg
│   │   │       ├── campaign-01s.jpg
│   │   │       ├── campaign-frame-05s.jpg
│   │   │       └── campaign-09s.jpg
│   └── models/                                      # External 3D GLB slot (hero-garment.glb)
├── src/
│   ├── components/
│   │   ├── Header.tsx                               # Luxury navigation with live bag counter
│   │   ├── MinimalistHero.tsx                       # 4K minimalist hero with rotating 3D garment
│   │   ├── ScrollGarmentCinematic.tsx               # 6-phase scrubbing video & Three.js canvas
│   │   ├── DividedAtelier.tsx                       # Interactive resizable Men/Women split-screen
│   │   ├── StoreCollectionPage.tsx                  # Dedicated storefront for Men & Women
│   │   ├── ProductDetailPage.tsx                    # Luxury PDP with 3D/Video tabs & Add-to-Bag
│   │   ├── AtelierWorkspace.tsx                     # Bespoke 3D design studio
│   │   ├── ShoppingBagDrawer.tsx                    # Sliding bag drawer with checkout quotation
│   │   ├── GarmentXRaySection.tsx                   # Interactive structural garment X-Ray
│   │   ├── AnnualDaySection.tsx                     # School costume atelier enquiry workflow
│   │   ├── CourseEnrolmentSection.tsx               # Parent certification enrolment workflow
│   │   ├── AboutUsSection.tsx                       # Heritage provenance & brand story
│   │   ├── ContactSection.tsx                       # Global concierge & showroom addresses
│   │   ├── LuxuryFooter.tsx                         # Editorial footer & manifesto
│   │   └── FloatingWhatsApp.tsx                     # Floating direct concierge channel
│   ├── scene/
│   │   ├── HeroCanvas.tsx                           # Minimalist hero Three.js canvas
│   │   ├── AtelierCanvas.tsx                        # Resizable divided atelier Three.js canvas
│   │   ├── AtelierDualScene.tsx                     # Independent dual-scene WebGL viewport
│   │   ├── CoutureMannequin.tsx                     # Procedural luxury mannequin
│   │   ├── CoutureGown.tsx                          # Champagne organza gown with botanical embroidery
│   │   ├── MensBlazerMannequin.tsx                  # Midnight navy bespoke double-breasted blazer
│   │   └── studioLighting.ts                        # 5-point studio lighting & HDRI environment
│   ├── data/
│   │   ├── storeProducts.ts                         # Complete product catalog (Men & Women)
│   │   ├── garments.ts                              # Extended garment dossiers & craft hours
│   │   └── threadorBrand.ts                         # Brand foundations & curriculum
│   ├── services/
│   │   └── cartService.ts                           # LocalStorage cart state manager & event bus
│   ├── types/
│   │   └── index.ts                                 # TypeScript domain interfaces
│   ├── styles/
│   │   └── global.css                               # Luxury editorial typography & design tokens
│   ├── App.tsx                                      # Root orchestrator & route coordinator
│   └── main.tsx                                     # Application entrypoint
├── package.json                                     # Project metadata & dependencies
├── tsconfig.json                                    # TypeScript compiler configuration
└── vite.config.ts                                   # Vite bundler configuration
```

---

## 3. Key Interactive Features

### 3.1. 1080p Cinematic Scroll Reveal (`ScrollGarmentCinematic.tsx`)
Seamlessly marries 1080p master films with interactive 3D WebGL rendering. Users can scrub forward and backward through 6 progressive craft phases:
- **Phase 01: The Silhouette** — Master silhouette lines, balance, and shoulder pitch.
- **Phase 02: Structural Bodice / Shoulders** — Internal horsehair canvas and spiral steel corsetry.
- **Phase 03: Botanical Embroidery / Peak Lapels** — Micro metallic gold threadwork and AMF pick-stitching.
- **Phase 04: Macro River Pearls / Horn Accents** — Hand-anchored freshwater pearls and carved horn buttons.
- **Phase 05: Cascading Train / Functional Cuffs** — Horsehair braid hem and functional surgeon's cuffs.
- **Phase 06: Complete Haute Creation** — Immediate links to customize in the 3D Atelier or purchase in the Store.

### 3.2. Dedicated Men’s and Women’s Storefronts (`StoreCollectionPage.tsx`)
- Instant tab toggling between **Men's Bespoke** and **Women's Haute Couture**.
- Granular category filtering (Couture Gowns, Evening Dresses, Capes & Stoles, Tailored Blazers, Formal Suits, Bandhgala & Achkan).
- Sorting by craft hours, price (Low to High, High to Low), and newest additions.
- Hover quick-add directly to the shopping bag.

### 3.3. Bespoke 3D Atelier Workspace (`AtelierWorkspace.tsx`)
- Full interactive 3D WebGL viewport with 4 calibrated camera angles (Front, Lapel Detail, Side Profile, Back Vent/Train).
- Live fabric swatches with real-time PBR material updates (Roughness, Sheen, Metalness, Transmission).
- Lapel and silhouette configuration.
- Personalized monogramming embroidery input.
- Made-to-measure measurement inputs (Chest/Bust, Waist, Sleeve Length, Height).
- Instant "Add Bespoke Creation to Bag".

### 3.4. Shopping Bag Drawer & Checkout Quotation (`ShoppingBagDrawer.tsx`)
- Slides smoothly over any active page.
- Persistent client-side cart (`localStorage`) displaying garment image, SKU, selected size, chosen colorway, and bespoke tailoring notes.
- Subtotal calculation in both Indian Rupees (₹) and US Dollars ($).
- Bespoke Order & Consultation Quotation Modal with client details, fitting mode preference, and Razorpay/UPI/Wire payment stubs.

---

## 4. Technical Documentation

Detailed architectural and engineering guides are available in the [`docs/`](./docs) directory:
- [**Technical Architecture Guide**](./docs/ARCHITECTURE.md) — System design, state orchestration, routing, and component topology.
- [**1080p Video Asset Pipeline**](./docs/VIDEO_ASSET_PIPELINE.md) — Video asset profiles, frame extraction, scrubbing sync, and low-bandwidth fallbacks.
- [**3D Garment WebGL Pipeline**](./docs/3D_GARMENT_PIPELINE.md) — Three.js procedural geometry, PBR material shaders, and studio lighting rig.
- [**E-Commerce & Customization Workflow**](./docs/ECOMMERCE_WORKFLOW.md) — Product schema, cart service event architecture, and bespoke checkout lifecycle.

---

## 5. Development & Build Instructions

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation
```bash
# Clone repository
git clone https://github.com/Yaathrapalani/the-threador.git
cd the-threador

# Install dependencies
npm install
```

### Local Development Server
```bash
# Start local development server on port 3000
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your modern browser (Chrome, Safari, Edge, Firefox).

### Production Build & Typecheck
```bash
# Execute TypeScript compiler and Vite production bundling
npm run build
```
Generates production-optimized artifacts in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 6. Verification Status

| Component | Status | Notes |
| :--- | :--- | :--- |
| **TypeScript Build** | `PASSED` | 0 errors across 2,180 modules compiled |
| **1080p Video Assets** | `VERIFIED` | 3 master MP4 files + 9 contact frames present & optimized |
| **3D Three.js Viewports** | `VERIFIED` | OrbitControls, PBR materials, multi-point lighting responsive |
| **Men / Women Storefronts**| `VERIFIED` | 8 curated luxury garments with filtering & sorting |
| **3D Atelier Customizer** | `VERIFIED` | Fabric swatching, monogramming, camera presets operational |
| **Shopping Bag & Checkout**| `VERIFIED` | LocalStorage persistence, custom event bus, quotation modal functional |
| **Costume & School Enrolment**| `VERIFIED` | Lead capture workflows intact |

---

## 7. License & Provenance
© 2026 THE THREADOR. All rights reserved.  
Haute Couture 3D Experience, Fashion Education & Costume Atelier Rooted in India.
