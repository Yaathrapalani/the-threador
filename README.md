# THE THREADOR
### Haute Couture 3D Experience, Fashion Education & Costume Atelier Rooted in India

> **"What if every child grew up knowing the story behind what they wear?"**  
> *The land. The material. The maker. The culture. The industry.*

---

## 1. Project Overview

**THE THREADOR** is a production-grade, immersive, interactive digital experience uniting luxury fashion storytelling, children's fashion education, and theatrical school costume production.

Rather than a conventional boutique website or an e-commerce catalog, THE THREADOR is conceived as a digital pavilion: a scroll-driven haute couture exhibition featuring real-time 3D WebGL garments, an interactive resizable MEN × WOMEN split-screen atelier, an interactive 3D Garment X-Ray deconstruction view, and dedicated institutional workflows for schools and parents.

---

## 2. Brand and Product Vision

### 2.1 The Philosophy
Rooted in India's unmatched textile heritage, The Threador answers a foundational question:  
*"What if every child grew up knowing the story behind what they wear?"*

The brand bridges the gap between historical artisanal craftsmanship (handloom, zardozi, natural dyeing) and modern fashion design through five foundational dimensions:
- **Culture:** The stories, rituals, and regional identities woven into Indian textiles.
- **Material:** From raw silk, organic cotton, and hand-spun yarn to structural organza.
- **Making:** The physical processes of spinning, weaving, pattern drafting, and embroidery.
- **Industry:** The economic and environmental realities of sustainable garment production.
- **Creation:** Empowering the next generation to design, stitch, and innovate.

### 2.2 The Two Commercial Pillars
1. **`LEARN` — Fashion Education & Certification Courses:**  
   Experiential fashion curricula designed for schools and private student cohorts across three grade brackets:
   - *Grades 1–3:* Discovering fabrics, tactile textures, and natural dyes.
   - *Grades 4–6:* Exploring garment construction, pattern drafting, and loom weaving.
   - *Grades 7–8:* Creating original wearable collections, zardozi workshops, and ethical design.
2. **`CREATE` — Costume Atelier & Annual Day Mega-Productions:**  
   "ONE STAGE. ONE MILLION DREAMS." Turnkey theatrical production services for prestigious educational institutions:
   - Creative theme ideation and script integration.
   - Stage choreography and movement dynamics.
   - Original musical scores and visual backdrop design.
   - Bespoke costume crafting, fittings, and full backstage wardrobe management for 200 to 2,000+ performers.

### 2.3 Brand Visual System
- **Midnight Navy:** `#102440` (Primary editorial canvas)
- **Deep Ink:** `#10131B` (Chiaroscuro depth and atmospheric shadows)
- **Warm Ivory:** `#F4F1E8` (Fine typography, highlights, and canvas linen)
- **Antique Mustard:** `#C7A64A` (Artisanal accents and focal interactive cues)
- **Heritage Green:** `#47785D` (Ecological foundation and handloom motifs)
- **Muted Stone:** `#D9D4C9` (Structural grids and measurement lines)

Refined high-contrast editorial serif headlines paired with precise geometric monospace/sans technical labels, custom thread-inspired cursor, and responsive layout.

---

## 3. Technology Stack

| Layer | Technologies | Purpose |
|---|---|---|
| **Core Framework** | React 19, TypeScript 5.8 | Component architecture and type-safe state coordination |
| **Build & Tooling** | Vite 7.3, PostCSS, ESLint | Instant HMR, optimized production tree-shaking and bundling |
| **3D & WebGL Engine** | Three.js (r182), React Three Fiber (R3F v9), Drei (v10) | Real-time scene graphing, PBR materials, custom shaders, and lighting |
| **Motion & Scroll** | GSAP 3, ScrollTrigger, Lenis | Scroll-synchronised 5-stage camera choreography, smooth inertia scrolling |
| **Icons & UI** | Lucide React | High-precision vector iconography |
| **Persistence** | Browser `localStorage` API | Zero-dependency client-side lead capture and inquiry persistence |
| **Checkout Architecture** | Razorpay SDK Scaffolding | Sandbox payment lifecycle with founder verification safeguards |

---

## 4. Project Architecture

The codebase follows a modular, feature-oriented structure with strict separation between scene rendering, business logic, and UI components:

```
story-behind-what-we-wear/
├── docs/
│   └── references/                      # Brand guidelines, brochures, and curriculum source PDFs
│       ├── The Threador (1).pdf
│       └── The Threador Brochure (A4 (Landscape)) (1).pdf
├── public/
│   └── models/                          # External 3D GLB drop slot
│       └── .gitkeep                     # Preserves directory for 'hero-garment.glb'
├── src/
│   ├── components/                      # UI view components and overlays
│   │   ├── AboutUsSection.tsx           # Page 02: Institutional provenance & vision
│   │   ├── AnnualDaySection.tsx         # Page 03: Theatrical production atelier
│   │   ├── AssetStatusModal.tsx         # 3D pipeline telemetry & GLB drop inspector
│   │   ├── CollectionSection.tsx        # Filterable living couture archive
│   │   ├── ContactSection.tsx           # Page 06: Contact channels & direct inquiry form
│   │   ├── DividedAtelier.tsx           # Resizable MEN × WOMEN split-screen
│   │   ├── EducationSection.tsx         # Page 04: Grade 1–8 curriculum & enrolment
│   │   ├── FloatingWhatsApp.tsx         # Persistent WhatsApp concierge
│   │   ├── Footer.tsx                   # Architectural atelier footer & manifesto
│   │   ├── GalleryPage.tsx              # Page 05: Stage, student & textile archive
│   │   ├── GarmentXRaySection.tsx       # 3D Garment X-Ray layer switcher & telemetry
│   │   ├── Header.tsx                   # Top navigation, FPS counter & asset badge
│   │   ├── HeroSection.tsx              # 5-stage scroll progress overlay & actions
│   │   └── PaymentModal.tsx             # Razorpay payment checkout architecture
│   ├── data/
│   │   ├── garments.ts                  # Garment dossiers, stitch counts, artisan metadata
│   │   └── threadorBrand.ts             # Brand foundations, curriculum, and costume data
│   ├── scene/                           # WebGL and Three.js scenes
│   │   ├── AtelierDualScene.tsx         # Dual 3D scenes for Men's & Women's split-screen
│   │   ├── CoutureGown.tsx              # Procedural champagne-ivory couture gown
│   │   ├── CoutureMannequin.tsx         # Parisian lathe mannequin with linen canvas
│   │   ├── GlbGarmentLoader.tsx         # External GLB hot-drop loader & fallback
│   │   ├── HeroCanvas.tsx               # Full-screen WebGL canvas with adaptive DPR
│   │   ├── ScrollCameraController.tsx   # 5-scene GSAP camera & rig rotation choreography
│   │   ├── StudioEnvironment.tsx        # PBR studio lighting & soft contact shadows
│   │   └── XRayGarmentViewer.tsx        # Deconstructed 3D viewer (Finished/Boning/Weave)
│   ├── services/
│   │   └── leadService.ts               # Lead storage, WhatsApp routing, and business config
│   ├── styles/
│   │   └── global.css                   # Complete haute couture design tokens and styling
│   ├── types/
│   │   └── index.ts                     # Strict TypeScript interfaces and domain models
│   ├── App.tsx                          # Master routing, Lenis init, and GSAP timeline
│   └── main.tsx                         # React 19 root bootstrap
├── .env.example                         # Environment variable documentation & templates
├── .gitignore                           # Exclusions for dependencies, build artifacts, secrets
├── CONTRIBUTING.md                      # Developer guidelines and contribution standards
├── index.html                           # HTML5 entry with meta tags and font preloads
├── package.json                         # Dependencies and build scripts
├── README.md                            # Comprehensive platform documentation
├── tsconfig.app.json                    # Application TypeScript config (Strict, verbatimModuleSyntax)
├── tsconfig.json                        # Root TypeScript project references
├── tsconfig.node.json                   # Node/Vite build tooling TypeScript config
└── vite.config.ts                       # Vite server configuration (Dedicated port 3000)
```

---

## 5. Installation Instructions

### 5.1 Prerequisites
- **Node.js:** `20.19+` or `22.12+` (LTS recommended)
- **npm:** `10+`
- **Modern Browser:** Chrome 110+, Safari 16+, Firefox 110+, or Edge with WebGL 2.0 support.

### 5.2 Clone and Install
```bash
# Clone the repository
git clone https://github.com/Yaathrapalani/the-threador.git

# Navigate into the project directory
cd the-threador

# Install all dependencies cleanly
npm install
```

---

## 6. Development Instructions

### 6.1 Start Local Development Server
```bash
npm run dev
```
The application will launch on:
- **Local URL:** `http://localhost:3000/`

*(Note: The server is explicitly locked to port 3000 with `strictPort: true` in `vite.config.ts` to avoid local port conflicts).*

### 6.2 Development Controls & Keybindings
- **Split-Screen Dragging:** Click and drag the central vertical brass divider in the Men × Women section, or use `ArrowLeft` / `ArrowRight` when focused.
- **Preset Dividers:** Use `[Emphasise Men (75/25)]`, `[Reset 50/50]`, and `[Emphasise Women (25/75)]` to jump smoothly between layouts.
- **Garment X-Ray:** Click between `01 Finished Form`, `02 Construction & Boning`, and `03 Macro Weave & Embroidery` to inspect real-time 3D geometry and shader transitions.
- **3D Telemetry Inspector:** Click the `[COUTURE 3D RIG]` badge in the header top bar to inspect live mesh stats, draw calls, and external model drop instructions.
- **Reduced Motion:** Click the motion button in the top bar to toggle between smooth inertia scrolling and standard accessible viewport scrolling.

---

## 7. Build Instructions

### 7.1 Production Build
Run the strict type checker and production bundler:
```bash
npm run build
```
This triggers:
1. `tsc -b`: Strict type compilation verifying all type imports under `verbatimModuleSyntax: true` and ensuring zero unused locals.
2. `vite build`: Production tree-shaking, CSS minification, and Rollup chunk generation into `dist/`.

### 7.2 Preview the Production Build Locally
```bash
npm run preview
```
Serves the generated `dist/` directory locally on `http://localhost:4173/` for production verification.

---

## 8. Environment Variable Documentation

The project includes a `.env.example` file with documented environment variables:

| Variable | Description | Default / Example |
|---|---|---|
| `VITE_APP_TITLE` | Brand title displayed in browser tabs and meta tags | `"THE THREADOR"` |
| `VITE_APP_DESCRIPTION` | Editorial meta description for search previews | `"Haute Couture 3D Experience..."` |
| `VITE_WHATSAPP_NUMBER` | Official WhatsApp concierge routing number (digits only) | `"919876543210"` |
| `VITE_CONTACT_EMAIL` | Official atelier contact email | `"connect@thethreador.com"` |
| `VITE_RAZORPAY_KEY_ID` | Razorpay Merchant Key ID (sandbox/live) | `"rzp_test_placeholder_key_id"` |
| `VITE_HERO_GARMENT_GLB_PATH` | Relative path to external GLB model asset | `"/models/hero-garment.glb"` |
| `VITE_PORT` | Local dev server port | `3000` |

To override defaults locally:
```bash
cp .env.example .env.local
```
*(Never commit `.env.local` to Git; it is strictly excluded in `.gitignore`).*

---

## 9. Asset Organisation

### 9.1 Procedural 3D Garments (Zero-Download Default)
To ensure immediate opening load times and zero network blocking, the platform features a bespoke procedural 3D couture gown and dressform:
- **Dressform:** [CoutureMannequin.tsx](file:///c:/Users/Administrator/Downloads/story-behind-what-we-wear/src/scene/CoutureMannequin.tsx) — Lathe geometry silhouette with French linen canvas texture and brushed brass hardware.
- **Couture Gown:** [CoutureGown.tsx](file:///c:/Users/Administrator/Downloads/story-behind-what-we-wear/src/scene/CoutureGown.tsx) — Dual-tier translucent organza skirt with harmonic fluting equations, sweetheart bodice, botanical spline embroidery, and 45 3D pearl cabochons.
- **Telemetry:** 16,840 vertices, 31,250 triangles, instantaneous 0 ms initialization.

### 9.2 External Production 3D GLB Integration
When a bespoke scanned or modeled 3D asset is ready to be dropped into production:
1. Export the garment from Blender, Marvelous Designer, or CLO3D in Binary GLTF format (`.glb`).
2. Optimize with Draco or Meshopt geometry compression and KTX2/Basis textures.
3. Save the file to:
   ```
   public/models/hero-garment.glb
   ```
4. The [GlbGarmentLoader.tsx](file:///c:/Users/Administrator/Downloads/story-behind-what-we-wear/src/scene/GlbGarmentLoader.tsx) automatically detects the asset, swaps the procedural mannequin with the high-poly GLB, and updates the telemetry in [AssetStatusModal.tsx](file:///c:/Users/Administrator/Downloads/story-behind-what-we-wear/src/components/AssetStatusModal.tsx).

---

## 10. Deployment Preparation

The project is structured as a static Single-Page Application (SPA) ready for deployment on any modern edge platform (Vercel, Netlify, Cloudflare Pages, AWS S3 + CloudFront, or GitHub Pages):

1. **Build Command:** `npm run build`
2. **Output Directory:** `dist`
3. **SPA Routing:** Ensure your edge provider redirects all route requests to `/index.html`.
4. **MIME Types:** Ensure `.glb`, `.gltf`, and `.wasm` MIME types are served with `model/gltf-binary` and `application/wasm` headers.
5. **CORS Headers:** Allow cross-origin access for WebGL assets and external font stylesheets.

---

## 11. Current Implementation Status

All six required views, 3D scenes, split-screen mechanics, and conversion pipelines are fully functional:

- [x] **Opening Cinematic Hero:** Full-viewport 3D mannequin, studio lighting, PBR materials, contact shadows.
- [x] **5-Stage GSAP Scroll Choreography:** Synchronized reveal, 360° rotation, fabric macro zoom, craftsmanship narrative, and collection transition.
- [x] **Interactive Resizable MEN × WOMEN Split-Screen:** Draggable central brass divider, 25%–75% clamping, keyboard navigation, preset jump buttons (`75/25`, `50/50`, `25/75`), dual 3D viewports, and conversion pathway boxes (`LEARN` / `CREATE`).
- [x] **The Garment X-Ray:** 3 synchronised 3D layer states (`01 Finished Form`, `02 Construction & Boning`, `03 Macro Weave & Embroidery`) with real wireframe/shader transitions and live telemetry.
- [x] **Page 01 — Home:** Complete master journey integration.
- [x] **Page 02 — About Us:** Institutional provenance, creed, founder vision, and 5 foundations.
- [x] **Page 03 — Annual Day Costumes:** Theatrical atelier hero, 4-phase turnkey services, filterable costume portfolio, interactive lightbox, and validated school booking form.
- [x] **Page 04 — Certification Course:** 3 grade cohorts, learning outcomes, and validated parent enrolment form.
- [x] **Page 05 — Gallery:** Curated media archive (Stage Costumes, Handloom, Zardozi) with responsive lightbox.
- [x] **Page 06 — Contact:** Direct channels, WhatsApp desk, email, studio hubs, dual pathway CTAs, and validated inquiry form.
- [x] **Lead Persistence Service:** Verified storage of leads in browser `localStorage` with unique ID generation.
- [x] **Floating WhatsApp Concierge:** Persistent interactive widget with contextual prefilled messaging.
- [x] **Razorpay Architecture Scaffolding:** Tested payment lifecycle with explicit founder-approval protection.

---

## 12. Known Limitations and Pending Production Assets

In accordance with strict luxury brand governance and editorial honesty:
1. **Production 3D Mesh Slot:** The opening hero and X-Ray viewer currently render a high-fidelity procedural 3D couture gown (16,840 vertices, 31,250 triangles). A studio-scanned photogrammetry/CAD mesh can be placed at `public/models/hero-garment.glb` when finalized.
2. **Founder Merchant Credentials:** Live online tuition fee processing through Razorpay is intentionally held in sandbox mode until the founder supplies verified Razorpay Key IDs and seasonal fee tables.
3. **Studio Physical Addresses:** Studio addresses for New Delhi and Mumbai are marked as appointment-only pending verified commercial lease onboarding.
4. **Photography Assets:** The portfolio and gallery currently use curated Unsplash high-fashion editorial imagery representing handloom weaving, zardozi workshops, and theatrical performances. These can be replaced with proprietary school production photography as seasons conclude.

---

## License

All original brand assets, curriculum concepts, and editorial content are proprietary to **THE THREADOR**.  
Source code is licensed under the MIT License.
