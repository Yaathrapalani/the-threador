# THE THREADOR — Technical Architecture & System Design

## 1. System Overview

THE THREADOR is a luxury digital fashion and textile commerce platform built with React 19, TypeScript, Vite, Tailwind CSS, Three.js, React Three Fiber (R3F), and React Three Drei.

The application serves dual operational requirements:
1. **Haute Couture & Bespoke Fashion Commerce Platform**: A world-class luxury digital showcase with **Children's Luxury Fashion** as the primary commercial and visual focus, supported by independent and equally respected **MEN'S ARCHITECTURAL TAILORING** and **WOMEN'S COUTURE** collections. Features dedicated storefronts, interactive 3D ateliers, 1080p cinematic reveals, and full shopping bag / quotation workflows.
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
        | Kids / Men /      |                                                 | Cart Persistence  |
        | Women / 3D Atelier|                                                 | Quotation Modal   |
        +-------------------+                                                 +-------------------+
                  |
    +-------------+-----------------------------------------------------------------------------------------------+
    |             |                     |                     |                     |               |             |
+-------+   +-----------+         +-----------+         +-----------+         +-------------+ +-----------+ +-----------+
| Home  |   |Kids Store |         | Men Store |         |Women Store|         |ProductDetail| |3D Atelier | |Annual Day |
| Hero  |   | Occasion /|         | Filter /  |         | Gown /    |         | 3D / Video  | |Live 3D PBR| | & Courses |
| Reveal|   | Sizing /  |         | Sort /    |         | Cape /    |         | Specs / Bag | |Config /   | | Enrolment |
| Split |   | Quick-Add |         | Quick-Add |         | Quick-Add |         | WhatsApp    | |Monogram   | | Forms     |
+-------+   +-----------+         +-----------+         +-----------+         +-------------+ +-----------+ +-----------+
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
├── src/
│   ├── components/
│   │   ├── Header.tsx                               # Luxury navigation featuring prominent KIDS COUTURE
│   │   ├── HeroSection.tsx                          # 4K hero with rotating Children's Couture Dress
│   │   ├── ScrollGarmentCinematic.tsx               # 6-phase reveal supporting KIDS, MEN & WOMEN
│   │   ├── DividedAtelier.tsx                       # Interactive resizable split-screen
│   │   ├── StoreCollectionPage.tsx                  # Dedicated storefront for Kids, Men & Women
│   │   ├── ProductDetailPage.tsx                    # Luxury PDP with 3D/Video tabs & Parent Guide
│   │   ├── AtelierWorkspace.tsx                     # 3D Bespoke design studio (Kids, Men, Women)
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
│   │   └── global.css                               # Luxury editorial typography & design system
│   ├── App.tsx                                      # Root orchestrator & route coordinator
│   └── main.tsx                                     # Application entrypoint
├── docs/                                            # Technical & production documentation
└── README.md                                        # Master production documentation
```

---

## 3. Brand Colour System Design Tokens

| Token | Hex | Semantic Role |
| :--- | :--- | :--- |
| `Porcelain` | `#F7F4EF` | Primary editorial background |
| `Warm Ivory` | `#EEE7DC` | Secondary backgrounds & cards |
| `Soft Sand` | `#D8C9B5` | Supporting surfaces & borders |
| `Champagne` | `#C7AA83` | Restrained luxury accent |
| `Deep Cocoa` | `#493B32` | Warm text accent |
| `Ink Charcoal`| `#242321` | Primary typography |
| `Muted Sage` | `#A8AE98` | Restrained secondary accent |
| `Dusty Rose` | `#D5B8B0` | Children's couture accent |
| `Powder Blue`| `#B9C9D5` | Children's couture accent |
| `Soft Butter`| `#E8D9A8` | Children's couture accent |
