# THE THREADOR — Technical Architecture & System Design

## 1. System Overview

THE THREADOR is a luxury digital fashion and textile commerce platform built with React 19, TypeScript, Vite, Tailwind CSS, Three.js, React Three Fiber (R3F), and React Three Drei.

The application serves dual operational requirements:
1. **Haute Couture & Bespoke Tailoring Commerce Platform**: A world-class luxury digital showcase for bespoke Menswear and Womenswear with dedicated storefronts, interactive 3D ateliers, 1080p cinematic reveals, and full shopping bag / quotation workflows.
2. **Educational & Costume Atelier Services**: Comprehensive enquiry and enrolment journeys for School Annual Day theatrical costume productions and Parent Certification courses in couture craft and textile science.

```
                                  +--------------------------------------------------+
                                  |                    App.tsx                       |
                                  |      Active Page Router & Modal Controller       |
                                  +--------------------------------------------------+
                                          |                     |
                  +-----------------------+                     +-----------------------+
                  |                                                                     |
        +-------------------+                                                 +-------------------+
        |     Header.tsx    |                                                 | ShoppingBagDrawer |
        | Men / Women / 3D  |                                                 | Cart Persistence  |
        | Atelier / Bag     |                                                 | Quotation Modal   |
        +-------------------+                                                 +-------------------+
                  |
    +-------------+-------------------------------------------------------------------------------+
    |             |                     |                     |                     |             |
+-------+   +-----------+         +-----------+         +-------------+       +-----------+ +-----------+
| Home  |   | Men Store |         |Women Store|         |ProductDetail|       |3D Atelier | |Annual Day |
| Hero  |   | Filter /  |         | Gown /    |         | 3D / Video  |       |Live 3D PBR| | & Courses |
| Reveal|   | Sort /    |         | Cape /    |         | Specs / Bag |       |Config /   | | Enrolment |
| Split |   | Quick-Add |         | Quick-Add |         | WhatsApp    |       |Monogram   | | Forms     |
+-------+   +-----------+         +-----------+         +-------------+       +-----------+ +-----------+
```

---

## 2. Directory Structure

```
story-behind-what-we-wear/
├── public/
│   └── assets/
│       ├── videos/
│       │   ├── womens-couture-reveal-1080p.mp4      # 1080p master women's reveal (5.3MB)
│       │   ├── mens-tailored-reveal-1080p.mp4       # 1080p master men's reveal (10.1MB)
│       │   ├── threador-campaign-film-1080p.mp4     # 1080p architectural split showcase (4.5MB)
│       │   └── frames/                              # High-res extracted frame contact sheets
│       │       ├── womens-01s.jpg
│       │       ├── womens-frame-05s.jpg
│       │       ├── womens-09s.jpg
│       │       ├── mens-01s.jpg
│       │       ├── mens-frame-05s.jpg
│       │       ├── mens-09s.jpg
│       │       ├── campaign-01s.jpg
│       │       ├── campaign-frame-05s.jpg
│       │       └── campaign-09s.jpg
├── src/
│   ├── components/
│   │   ├── Header.tsx                               # Luxury navigation with live bag counter
│   │   ├── MinimalistHero.tsx                       # 4K minimalist hero with rotating 3D garment
│   │   ├── ScrollGarmentCinematic.tsx               # 6-phase scrubbing video & Three.js canvas
│   │   ├── DividedAtelier.tsx                       # Interactive resizable Men/Women split-screen
│   │   ├── StoreCollectionPage.tsx                  # Dedicated storefront for Men & Women
│   │   ├── ProductDetailPage.tsx                    # Luxury PDP with 3D/Video tabs & Add-to-Bag
│   │   ├── AtelierWorkspace.tsx                     # Bespoke 3D design studio (fabrics, buttons, monogram)
│   │   ├── ShoppingBagDrawer.tsx                    # Sliding bag drawer with checkout quotation
│   │   ├── GarmentXRaySection.tsx                   # Interactive structural garment X-Ray
│   │   ├── AnnualDaySection.tsx                     # School costume atelier enquiry workflow
│   │   ├── CourseEnrolmentSection.tsx               # Parent certification enrolment workflow
│   │   ├── LuxuryFooter.tsx                         # Global editorial footer
│   │   └── ...
│   ├── scene/
│   │   ├── HeroCanvas.tsx                           # Minimalist hero Three.js canvas
│   │   ├── AtelierCanvas.tsx                        # Resizable divided atelier Three.js canvas
│   │   ├── CoutureMannequin.tsx                     # Procedural realistic luxury mannequin
│   │   ├── CoutureGown.tsx                          # Champagne organza gown with botanical embroidery
│   │   ├── MensBlazerMannequin.tsx                  # Midnight navy bespoke tailored double-breasted blazer
│   │   └── studioLighting.ts                        # Multi-point studio lighting & HDRI environment
│   ├── data/
│   │   └── storeProducts.ts                         # Complete product catalog (Men & Women)
│   ├── services/
│   │   └── cartService.ts                           # LocalStorage cart state manager & event bus
│   ├── types/
│   │   └── index.ts                                 # TypeScript interfaces & domain types
│   ├── styles/
│   │   └── global.css                               # Luxury editorial typography & design system
│   ├── App.tsx                                      # Root orchestrator & route coordinator
│   └── main.tsx                                     # Application entrypoint
├── docs/                                            # Technical & production documentation
└── README.md                                        # Master production documentation
```

---

## 3. Core Subsystems

### 3.1. Unified State & Route Orchestration
The application implements client-side state routing without heavy external dependencies:
- `activePage`: Controlled centrally in `App.tsx` (`home | men | women | collections | product-detail | atelier | annual-day | course | gallery | about | contact`).
- `selectedProductId`: Directs the `ProductDetailPage` to load complete luxury specifications, 3D interactive mannequin representations, and 1080p preview reels.
- `atelierTarget`: Pre-configures `AtelierWorkspace` to either Menswear or Womenswear with tailored PBR fabric palettes and structural choices.

### 3.2. E-Commerce Cart & Customization Pipeline
- **Cart Management (`cartService.ts`)**: Persists across browser sessions using `localStorage` under key `the-threador-cart`.
- **Event Bus Dispatching**: Emits `the-threador-cart-update` on any item add, quantity update, or clearance, automatically refreshing badges across `Header` and `ShoppingBagDrawer`.
- **Bespoke Tailoring Payload**: Each cart item retains bespoke choices (`monogram`, `fabricId`, `lapelStyle`, `chestMeasurement`, `sleeveLength`, etc.) passed seamlessly to the checkout quotation modal.

### 3.3. Dual Visual Engine: 1080p Cinema + WebGL 3D
- **1080p Video Mode**: Utilizes master campaign reels captured at 24fps 1080p with scrubbed playback corresponding to scroll progress.
- **Interactive Three.js Mode**: Instant toggling into full WebGL 3D Canvas with OrbitControls, custom studio key/fill/rim lighting, and realistic PBR materials (translucency, sheen, anisotropic normal maps).

---

## 4. Performance & Cross-Browser Standards
- **Lazy Evaluation**: Off-screen 3D canvases pause rendering when unmounted or out of viewport.
- **Responsive Layout**: Designed mobile-first with adaptive touch dragging on split-screen dividers and fluid 4K typography.
- **Accessible Interactions**: ARIA attributes, semantic buttons, keyboard-navigable dialogs, and high-contrast colorways.
