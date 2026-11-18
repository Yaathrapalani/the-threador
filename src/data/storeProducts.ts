import type { ProductRecord } from '../types';

export const STORE_PRODUCTS: ProductRecord[] = [
  // =========================================================================
  // 1. KIDS LUXURY HAUTE COUTURE & OCCASION WEAR (PRIMARY COLLECTION)
  // =========================================================================
  {
    id: 'THREADOR-K-001',
    name: 'The Petit Fleur Heirloom Silk Organza Gown',
    subtitle: 'Hand-Pleated French Silk Organza with Botanical Gold Thread & Freshwater Seed Pearls',
    gender: 'kids',
    category: 'Occasion Wear',
    ageGroup: '2–12 Years & Bespoke',
    price: 38000,
    currency: 'INR',
    leadTimeWeeks: 3,
    craftsmanshipHours: 110,
    stitchCount: '22,000 Micro Stitches',
    silhouette: 'Empire waist with soft organza cap sleeves, scalloped neckline, and triple-tiered cascading skirt',
    primaryFabric: 'French Silk Organza in Warm Champagne Ivory',
    lining: '100% Hypoallergenic Organic Mulberry Silk Muslin',
    hypoallergenic: true,
    growAllowance: '2.5-inch hidden French seam allowance for graceful growth',
    parentGuide: 'Constructed with zero scratchy seams. The inner lining is pure unbleached organic silk against sensitive young skin. Features a concealed soft nylon zipper with protective silk backing guard.',
    details: [
      'Layered sculptural organza petals engineered with natural buoyancy',
      'Petite hand-sewn freshwater river seed pearls along front placket and cuffs',
      'Hand-embroidered botanical floral vine motifs in metallic gold and soft rose silk thread',
      'Detachable silk grosgrain sash with hand-finished bow',
      'Generous 2.5-inch inner seam and hem allowance to extend garment life across growth milestones'
    ],
    materials: {
      composition: '85% French Silk Organza, 15% Mulberry Silk Habotai Lining',
      weight: '120 g/m²',
      provenance: 'Woven in Lyon, France; hand-embroidered by Threador Master Artisans in Lucknow',
      weave: 'Ultra-Fine Plain Organza Weave'
    },
    sizes: ['2–3Y', '4–5Y', '6–7Y', '8–9Y', '10–12Y', 'Bespoke Child Sizing'],
    colors: [
      { name: 'Warm Ivory', hex: '#EEE7DC' },
      { name: 'Dusty Rose', hex: '#D5B8B0' },
      { name: 'Powder Blue', hex: '#B9C9D5' },
      { name: 'Soft Butter', hex: '#E8D9A8' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/womens-01s.jpg',
      thumbnail: '/assets/videos/frames/womens-frame-05s.jpg',
      videoUrl: '/assets/videos/womens-couture-reveal-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/womens-09s.jpg',
      additionalImages: [
        '/assets/videos/frames/womens-01s.jpg',
        '/assets/videos/frames/womens-frame-02s.jpg',
        '/assets/videos/frames/womens-frame-05s.jpg',
        '/assets/videos/frames/womens-09s.jpg'
      ]
    },
    modelPath: '/models/hero-garment.glb',
    isCustomizable: true,
    availability: 'Made to Order',
    description:
      'The signature centerpiece of The Threador Children’s Atelier. Conceived for weddings, birthdays, and monumental family celebrations. Light as morning air, this heirloom gown respects the joyful movement of childhood while delivering the uncompromising craftsmanship of traditional French haute couture.'
  },
  {
    id: 'THREADOR-K-002',
    name: 'The Little Prince Royal Velvet Bandhgala',
    subtitle: 'Deep-Pile English Cotton Velvet with Hand Zardozi Collar & Faceted Brass Buttons',
    gender: 'kids',
    category: 'Celebration Wear',
    ageGroup: '3–14 Years & Bespoke',
    price: 42000,
    currency: 'INR',
    leadTimeWeeks: 3,
    craftsmanshipHours: 125,
    stitchCount: '26,000 Hand Stitches',
    silhouette: 'Relaxed pagoda shoulders with soft contoured mandarin collar designed for children’s comfort',
    primaryFabric: 'Pure English Cotton Velvet (Soft & Flexible)',
    lining: 'Pure Breathable Mulberry Silk Habotai',
    hypoallergenic: true,
    growAllowance: '2-inch sleeve hem and side-seam adjustment buffer',
    parentGuide: 'Constructed with flexible, soft internal haircloth rather than stiff industrial canvas. Allows full arm movement and play comfort without creasing.',
    details: [
      'Micro-zardozi hand-stitched collar featuring traditional floral arabesque motifs',
      'Custom cast antique brass crest buttons with smooth, rounded child-safe backs',
      'Double piped besom pockets cut on an exact 45° angle',
      'Comfort-cut armholes designed specifically for active children',
      'Folded champagne silk pocket square permanently anchored to inner breast welt'
    ],
    materials: {
      composition: '100% English Cotton Velvet Shell, 100% Mulberry Silk Lining',
      weight: '310 g/m²',
      provenance: 'Woven in Lancashire, UK; hand-tailored in Mumbai',
      weave: 'Deep-Pile Cotton Velvet Weave'
    },
    sizes: ['3–4Y', '5–6Y', '7–8Y', '9–10Y', '11–12Y', '13–14Y', 'Bespoke Child Sizing'],
    colors: [
      { name: 'Royal Midnight', hex: '#131C2B' },
      { name: 'Deep Wine', hex: '#4A202A' },
      { name: 'Forest Sage', hex: '#5A6351' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/mens-01s.jpg',
      thumbnail: '/assets/videos/frames/mens-frame-05s.jpg',
      videoUrl: '/assets/videos/mens-tailored-reveal-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/mens-09s.jpg',
      additionalImages: [
        '/assets/videos/frames/mens-01s.jpg',
        '/assets/videos/frames/mens-frame-02s.jpg',
        '/assets/videos/frames/mens-frame-05s.jpg',
        '/assets/videos/frames/mens-09s.jpg'
      ]
    },
    modelPath: '/models/mens-tailored.glb',
    isCustomizable: true,
    availability: 'Made to Order',
    description:
      'A majestic celebration piece designed for young dignitaries. Crafted from plush English cotton velvet with hand-sewn metallic zardozi embroidery along the collar, this bandhgala balances stately elegance with natural, uninhibited boyhood comfort.'
  },
  {
    id: 'THREADOR-K-003',
    name: 'The Ceremonial Tiered Silk Tulle Occasion Dress',
    subtitle: 'Layered French Silk Tulle with Hand-Embroidered Garden Flora & Mother-of-Pearl Buttons',
    gender: 'kids',
    category: 'Occasion Wear',
    ageGroup: '2–10 Years',
    price: 34000,
    currency: 'INR',
    leadTimeWeeks: 3,
    craftsmanshipHours: 95,
    stitchCount: '19,500 Hand Stitches',
    silhouette: 'Sleeveless ballerina bodice with delicate ruffled neckline and four-tiered featherweight tulle skirt',
    primaryFabric: 'French Silk Tulle with Satin Organza Base',
    lining: 'Pure Organic Bamboo-Silk Breathable Lining',
    hypoallergenic: true,
    growAllowance: '2-inch adjustable shoulder tie and side gusset allowance',
    parentGuide: 'Ultra-lightweight and airy. The tiered tulle floats naturally without requiring stiff scratchy crinolines underneath.',
    details: [
      'Four layers of gossamer silk tulle hand-gathered for ethereal volume',
      'Scattered micro-embroidered wildflower petals in dusty rose and soft butter silk thread',
      'Natural polished Australian mother-of-pearl buttons along back closure',
      'Wide double-faced silk satin ribbon sash tied at the spine',
      'Completely tagless interior with embroidered sizing label'
    ],
    materials: {
      composition: '70% Silk Tulle, 30% Bamboo-Silk Lining',
      weight: '95 g/m²',
      provenance: 'Fabric milled in Lake Como, Italy; embellished in Bengaluru',
      weave: 'Fine Hexagonal Silk Mesh'
    },
    sizes: ['2–3Y', '4–5Y', '6–7Y', '8–10Y', 'Bespoke Child Sizing'],
    colors: [
      { name: 'Soft Butter', hex: '#E8D9A8' },
      { name: 'Dusty Rose', hex: '#D5B8B0' },
      { name: 'Porcelain White', hex: '#F7F4EF' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/womens-01s.jpg',
      thumbnail: '/assets/videos/frames/womens-frame-02s.jpg',
      videoUrl: '/assets/videos/womens-couture-reveal-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/womens-frame-05s.jpg',
      additionalImages: [
        '/assets/videos/frames/womens-01s.jpg',
        '/assets/videos/frames/womens-frame-02s.jpg',
        '/assets/videos/frames/womens-frame-05s.jpg'
      ]
    },
    modelPath: '/models/hero-garment.glb',
    isCustomizable: true,
    availability: 'Made to Order',
    description:
      'Conceived for flower girls, summer galas, and momentous milestone portraits. The Ceremonial Tiered Dress delivers whimsical grace without compromising on haute couture tailoring standards.'
  },
  {
    id: 'THREADOR-K-004',
    name: 'The Junior Savile Double-Breasted Wool Blazer',
    subtitle: 'Fine Lightweight Merino Flannel with Floating Soft Canvas & Crest Buttons',
    gender: 'kids',
    category: 'Formal Tailoring',
    ageGroup: '4–14 Years',
    price: 39000,
    currency: 'INR',
    leadTimeWeeks: 3,
    craftsmanshipHours: 115,
    stitchCount: '24,000 Hand Stitches',
    silhouette: 'Classic British double-breasted 4x2 cut proportioned specifically for boys with relaxed armscye',
    primaryFabric: 'Super 130s Lightweight Merino Wool Flannel',
    lining: 'Pure Cotton-Cupro Bemberg with Hand-Pick Stitching',
    hypoallergenic: true,
    growAllowance: '2.5-inch cuff let-out and generous back vent buffer',
    parentGuide: 'A genuine bespoke blazer scaled for boys. It features functioning surgeon cuffs that can be lengthened by our master tailors as your child grows.',
    details: [
      'Genuine floating soft canvas chest piece designed for youthful posture',
      'Wide peak lapels with hand-stitched AMF pick detailing',
      'Polished antique gold crest buttons',
      'Dual rear vents for effortless movement and sitting comfort',
      'Internal secret ticket pocket tailored with contrast silk piping'
    ],
    materials: {
      composition: '100% Super 130s Merino Wool, 100% Bemberg Cupro Lining',
      weight: '260 g/m²',
      provenance: 'Spun in Huddersfield, England; hand-cut in Delhi Atelier',
      weave: '2/1 Fine Twill Flannel'
    },
    sizes: ['4–5Y', '6–7Y', '8–9Y', '10–12Y', '13–14Y', 'Bespoke Child Sizing'],
    colors: [
      { name: 'Ink Charcoal', hex: '#242321' },
      { name: 'Deep Navy', hex: '#131C2B' },
      { name: 'Soft Sand Camel', hex: '#D8C9B5' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/mens-01s.jpg',
      thumbnail: '/assets/videos/frames/mens-frame-05s.jpg',
      videoUrl: '/assets/videos/mens-tailored-reveal-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/mens-09s.jpg',
      additionalImages: [
        '/assets/videos/frames/mens-01s.jpg',
        '/assets/videos/frames/mens-frame-02s.jpg',
        '/assets/videos/frames/mens-frame-05s.jpg',
        '/assets/videos/frames/mens-09s.jpg'
      ]
    },
    modelPath: '/models/mens-tailored.glb',
    isCustomizable: true,
    availability: 'Made to Order',
    description:
      'Imparting the enduring discipline of Savile Row to the next generation. Designed to make young gentlemen feel poised, confident, and impeccably dressed for formal events and prize-giving ceremonies.'
  },
  {
    id: 'THREADOR-K-005',
    name: 'The Banarasi Brocade Heirloom Anarkali & Capelet',
    subtitle: 'Handloom Pure Katan Silk Zari Brocade with Detachable Embroidered Capelet',
    gender: 'kids',
    category: 'Celebration Wear',
    ageGroup: '3–12 Years',
    price: 46000,
    currency: 'INR',
    leadTimeWeeks: 4,
    craftsmanshipHours: 140,
    stitchCount: '31,000 Hand Stitches',
    silhouette: '16-kali flaring kalidar silhouette with scalloped hemline and featherweight capelet',
    primaryFabric: 'Handwoven Varanasi Katan Silk with Fine Gold Zari',
    lining: 'Ultra-Fine Mulmul Cotton (Hypoallergenic)',
    hypoallergenic: true,
    growAllowance: '3-inch concealed hem allowance and expandable side panels',
    parentGuide: 'Woven on traditional pit-looms in Varanasi. Backed completely with featherlight organic mulmul cotton to ensure no metallic threads ever touch the child’s skin.',
    details: [
      'Authentic handloom floral kadhwa zari motifs woven into pure katan silk',
      'Detachable organza capelet with delicate hand-beaded pearl border',
      'Hand-made latkan tassels crafted with silk floss and river pearls',
      'Adjustable soft drawstring waist paired with hidden elastic comfort band',
      'Includes matching unlined dupatta and churidar trousers'
    ],
    materials: {
      composition: '80% Pure Katan Silk, 20% Tested Metallic Zari; 100% Mulmul Cotton Lining',
      weight: '210 g/m²',
      provenance: 'Handwoven in Varanasi; tailored in Jaipur',
      weave: 'Traditional Kadhwa Jacquard Brocade'
    },
    sizes: ['3–4Y', '5–6Y', '7–8Y', '9–10Y', '11–12Y', 'Bespoke Child Sizing'],
    colors: [
      { name: 'Dusty Rose & Gold', hex: '#D5B8B0' },
      { name: 'Powder Blue & Silver', hex: '#B9C9D5' },
      { name: 'Champagne Ivory', hex: '#EEE7DC' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/womens-01s.jpg',
      thumbnail: '/assets/videos/frames/womens-frame-05s.jpg',
      videoUrl: '/assets/videos/womens-couture-reveal-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/womens-09s.jpg',
      additionalImages: [
        '/assets/videos/frames/womens-01s.jpg',
        '/assets/videos/frames/womens-frame-05s.jpg',
        '/assets/videos/frames/womens-09s.jpg'
      ]
    },
    modelPath: '/models/hero-garment.glb',
    isCustomizable: true,
    availability: 'Made to Order',
    description:
      'A masterwork of Indian textile heritage, scaled for young celebrants. The Banarasi Heirloom Anarkali connects children directly to the living craft traditions of ancient Benares with luminous grace and unmatched comfort.'
  },
  {
    id: 'THREADOR-K-006',
    name: 'The Heritage Handspun Matka Silk Kurta & Nehru Waistcoat',
    subtitle: 'Indigenous Handloom Matka Silk Kurta with Zardozi-Embroidered Linen Waistcoat',
    gender: 'kids',
    category: 'Celebration Wear',
    ageGroup: '2–14 Years',
    price: 32000,
    currency: 'INR',
    leadTimeWeeks: 3,
    craftsmanshipHours: 85,
    stitchCount: '18,000 Hand Stitches',
    silhouette: 'Relaxed A-line kurta with side vents paired with structured single-breasted waistcoat',
    primaryFabric: 'Handspun Indigenous Matka Silk & Pure Irish Linen',
    lining: 'Pure Breathable Organic Cotton Sheeting',
    hypoallergenic: true,
    growAllowance: '2-inch side seam expansion and adjustable waistcoat back belt',
    parentGuide: 'Naturally temperature-regulating handspun silk. Stays cool during daytime festivities and warm during evening celebrations.',
    details: [
      'Mandarin collar kurta with genuine mother-of-pearl buttons',
      'Structured waistcoat with botanical zardozi hand embroidery along collar stand',
      'Hand-rolled silk piping along all jacket edges',
      'Concealed elastic waistband in matching silk churidar trousers',
      'Ultra-soft organic cotton neckband preventing friction or redness'
    ],
    materials: {
      composition: '60% Handspun Matka Silk, 40% Pure Linen; 100% Cotton Lining',
      weight: '220 g/m²',
      provenance: 'Handspun in Bhagalpur, Bihar; tailored in Mumbai',
      weave: 'Textured Handloom Plain Weave'
    },
    sizes: ['2–3Y', '4–5Y', '6–7Y', '8–9Y', '10–12Y', '13–14Y', 'Bespoke Child Sizing'],
    colors: [
      { name: 'Soft Sand & Sage', hex: '#D8C9B5' },
      { name: 'Warm Ivory & Gold', hex: '#EEE7DC' },
      { name: 'Royal Midnight', hex: '#131C2B' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/mens-01s.jpg',
      thumbnail: '/assets/videos/frames/mens-frame-02s.jpg',
      videoUrl: '/assets/videos/mens-tailored-reveal-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/mens-01s.jpg',
      additionalImages: [
        '/assets/videos/frames/mens-01s.jpg',
        '/assets/videos/frames/mens-frame-02s.jpg',
        '/assets/videos/frames/mens-frame-05s.jpg'
      ]
    },
    modelPath: '/models/mens-tailored.glb',
    isCustomizable: true,
    availability: 'Made to Order',
    description:
      'Understated luxury rooted in natural Indian fibers. Designed for festive rituals, Diwali gatherings, and family weddings with an emphasis on effortless elegance and all-day child comfort.'
  },

  // =========================================================================
  // 2. MEN'S LUXURY TAILORED COLLECTION
  // =========================================================================
  {
    id: 'THREADOR-M-001',
    name: 'The Midnight Tailored Blazer',
    subtitle: 'Double-Breasted Super 150s Merino Wool with Silk Satin Peak Lapels',
    gender: 'men',
    category: 'Blazers',
    price: 48000,
    currency: 'INR',
    leadTimeWeeks: 3,
    craftsmanshipHours: 145,
    stitchCount: '28,000 Hand Stitches',
    silhouette: 'Double-breasted architectural torso with broad roped shoulders and pinched waist suppression',
    primaryFabric: 'Super 150s Australian Merino Wool Twill',
    lining: 'Cupro Bemberg Jacquard Silk with Hand-Pick Stitching',
    details: [
      'Hand-padded floating canvas constructed from unbleached Mongolian horsehair',
      'Silk satin peak lapels cut with 0.5mm precision drop',
      'Four double-breasted polished brass crest buttons in geometric 2x2 stance',
      'Hand-set breast welt pocket with folded ivory silk pocket square',
      'Functional kissing cuff buttons on Surgeon’s cuffs'
    ],
    materials: {
      composition: '90% Super 150s Merino Wool, 10% Mulberry Silk Facing',
      weight: '290 g/m²',
      provenance: 'Woven in Biella, Italy; tailored by Threador Master Cutters in Mumbai',
      weave: '2/2 Fine Cavalry Twill Weave'
    },
    sizes: ['38R', '40R', '42R', '44R', '46R', 'Made-to-Measure'],
    colors: [
      { name: 'Midnight Navy', hex: '#202f47' },
      { name: 'Obsidian Noir', hex: '#111317' },
      { name: 'Graphite Charcoal', hex: '#2c2e33' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/mens-01s.jpg',
      thumbnail: '/assets/videos/frames/mens-frame-05s.jpg',
      videoUrl: '/assets/videos/mens-tailored-reveal-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/mens-09s.jpg',
      additionalImages: [
        '/assets/videos/frames/mens-01s.jpg',
        '/assets/videos/frames/mens-frame-02s.jpg',
        '/assets/videos/frames/mens-frame-05s.jpg',
        '/assets/videos/frames/mens-09s.jpg'
      ]
    },
    modelPath: '/models/mens-tailored.glb',
    isCustomizable: true,
    availability: 'Made to Order',
    description:
      'The foundational statement of The Threador Men’s Atelier. Conceived with an unbroken vertical posture and bespoke anatomical memory. By eschewing rigid synthetic fusibles in favor of floating horsehair canvas and hand-padded lapels, this blazer contours naturally to the wearer’s form with every passage of time.'
  },
  {
    id: 'THREADOR-M-002',
    name: 'The Heritage Silk Bandhgala',
    subtitle: 'Hand-Quilted Raw Matka Silk with Antique Brass Piping',
    gender: 'men',
    category: 'Bandhgalas',
    price: 56000,
    currency: 'INR',
    leadTimeWeeks: 4,
    craftsmanshipHours: 160,
    stitchCount: '32,000 Hand Stitches',
    silhouette: 'High-stand mandarin collar with tailored chest and structured pagoda shoulders',
    primaryFabric: 'Indigenous Handspun Raw Matka Silk',
    lining: 'Pure Mulberry Silk Habotai',
    details: [
      'Reinforced Mandarin collar contoured to the cervical vertebrae',
      'Concealed placket with 7 bespoke antique brass buttons',
      'Double piped besom pockets cut on an exact 45° angle',
      'Hand-stitched silk lining with interior passport pocket'
    ],
    materials: {
      composition: '100% Handloom Indian Matka Silk',
      weight: '340 g/m²',
      provenance: 'Spun in Murshidabad, West Bengal; constructed at The Threador Atelier',
      weave: 'Irregular Slub Weave'
    },
    sizes: ['38R', '40R', '42R', '44R', 'Made-to-Measure'],
    colors: [
      { name: 'Royal Ink Navy', hex: '#16233b' },
      { name: 'Raw Ochre Gold', hex: '#b59344' },
      { name: 'Ivory Natural', hex: '#f0ece1' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/mens-09s.jpg',
      thumbnail: '/assets/videos/frames/campaign-01s.jpg',
      videoUrl: '/assets/videos/mens-tailored-reveal-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/mens-frame-05s.jpg',
      additionalImages: [
        '/assets/videos/frames/mens-09s.jpg',
        '/assets/videos/frames/campaign-01s.jpg'
      ]
    },
    modelPath: '/models/mens-tailored.glb',
    isCustomizable: true,
    availability: 'Made to Order',
    description:
      'A masterwork honoring royal Indian ceremonial attire. Crafted from textured handloom Matka silk, this Bandhgala strikes a harmonious balance between imperial solemnity and contemporary minimalist architecture.'
  },
  {
    id: 'THREADOR-M-003',
    name: 'The Architectural Greatcoat',
    subtitle: 'Unbleached Double-Face Shetland Wool & Horsehair Canvas',
    gender: 'men',
    category: 'Suits & Formalwear',
    price: 74000,
    currency: 'INR',
    leadTimeWeeks: 4,
    craftsmanshipHours: 185,
    stitchCount: '18,500 Hand Stitches',
    silhouette: 'Extended structured shoulder with ankle-grazing vertical drape',
    primaryFabric: 'Double-Face Highland Shetland Wool',
    lining: 'Cupro Silk Sateen',
    details: [
      'Hand-padded floating chest canvas with 3,200 individual pad stitches',
      'Solid horn buttons hand-carved and fire-polished',
      'Pick-stitched storm storm flap with concealed magnet closure',
      'Full inverted pleat back vent allowing fluid kinetic stride'
    ],
    materials: {
      composition: '100% Heritage Highland Wool',
      weight: '480 g/m²',
      provenance: 'Woven in Biella, Italy; finished at The Threador Atelier',
      weave: '2/2 Broken Twill'
    },
    sizes: ['38L', '40L', '42L', '44L', 'Made-to-Measure'],
    colors: [
      { name: 'Midnight Noir', hex: '#0e1116' },
      { name: 'Deep Slate', hex: '#222831' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/mens-frame-02s.jpg',
      thumbnail: '/assets/videos/frames/mens-01s.jpg',
      videoUrl: '/assets/videos/mens-tailored-reveal-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/mens-09s.jpg',
      additionalImages: [
        '/assets/videos/frames/mens-frame-02s.jpg',
        '/assets/videos/frames/mens-01s.jpg'
      ]
    },
    isCustomizable: true,
    availability: 'Atelier Exclusive',
    description:
      'Engineered with an architectural verticality. The heavyweight double-face Shetland wool retains a sculptural silhouette even in extreme movement, embodying the timeless power of classical tailoring.'
  },
  {
    id: 'THREADOR-M-004',
    name: 'The Ceremonial Zardozi Achkan',
    subtitle: 'Black Silk Velvet with Micro-Wire Gold Aari Embroidery',
    gender: 'men',
    category: 'Occasion Wear',
    price: 92000,
    currency: 'INR',
    leadTimeWeeks: 5,
    craftsmanshipHours: 240,
    stitchCount: '120,000 Micro-Wire Stitches',
    silhouette: 'Knee-length flared skirt with contoured waist and standing collar',
    primaryFabric: 'Pure Silk Velvet',
    lining: 'Heavy Silk Twill',
    details: [
      'Genuine metallic zari gold wire couched by master aari artisans',
      'Concealed hook-and-eye front closure with ornamental jeweled buttons',
      'Deep side vents engineered for seated comfort during ceremonies',
      'Reinforced internal canvas preventing velvet sagging over time'
    ],
    materials: {
      composition: '82% Mulberry Silk, 18% Rayon Velvet Base; Real Gold Thread',
      weight: '410 g/m²',
      provenance: 'Embroidered by 4th-generation Zardozi masters in Lucknow',
      weave: 'Woven Cut-Pile Velvet'
    },
    sizes: ['38R', '40R', '42R', 'Made-to-Measure'],
    colors: [
      { name: 'Obsidian Noir', hex: '#090a0d' },
      { name: 'Midnight Navy', hex: '#111b2b' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/campaign-frame-05s.jpg',
      thumbnail: '/assets/videos/frames/mens-09s.jpg',
      videoUrl: '/assets/videos/threador-campaign-film-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/campaign-01s.jpg',
      additionalImages: [
        '/assets/videos/frames/campaign-frame-05s.jpg',
        '/assets/videos/frames/mens-09s.jpg'
      ]
    },
    isCustomizable: true,
    availability: 'Bespoke Only',
    description:
      'An exceptional heir of Indian royal couture. Each centimeter of the collar and cuff embroidery requires 8 hours of painstaking hand needlework with fine metallic wire, celebrating historical textile grandeur.'
  },

  // =========================================================================
  // WOMEN'S HAUTE COUTURE COLLECTION
  // =========================================================================
  {
    id: 'THREADOR-W-001',
    name: 'The Champagne Atelier Gown',
    subtitle: 'Layered Translucent Silk Organza with Botanical Goldwork & River Pearls',
    gender: 'women',
    category: 'Couture Gowns',
    price: 125000,
    currency: 'INR',
    leadTimeWeeks: 4,
    craftsmanshipHours: 320,
    stitchCount: '428,000 Artisan Stitches',
    silhouette: 'Sculptural fluted couture gown with sweetheart bodice, peplum tier, and harmonic trumpet train',
    primaryFabric: '14mm Pure Mulberry Silk Organza',
    lining: 'Heavy Silk Faille Foundation with Brushed Cotton Interlining',
    details: [
      'Hand-moulded spiral steel boning channels contoured to 0.5mm precision',
      '38 individual pattern pieces cut entirely on a 45° geometric bias',
      '45 hand-set nacre freshwater river pearls graduated along the hip fluting',
      'Micro-wire zardozi gold filum couching depicting ascending botanical flora',
      'Concealed loop-and-pearl button rear spine closure'
    ],
    materials: {
      composition: '100% Organically Farmed Mulberry Silk, Natural Pearl Inlay',
      weight: '38 g/m² (organza) / 185 g/m² (faille core)',
      provenance: 'Woven in Karnataka & Lyon; embroidered at The Threador Atelier',
      weave: 'Open-Plain Organza Weave over Structural Faille Foundation'
    },
    sizes: ['XS', 'S', 'M', 'L', 'Made-to-Measure'],
    colors: [
      { name: 'Warm Champagne Ivory', hex: '#fbf6ea' },
      { name: 'Oyster Nacre', hex: '#ede6d8' },
      { name: 'Antique Rose Silk', hex: '#e8dbd1' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/womens-01s.jpg',
      thumbnail: '/assets/videos/frames/womens-frame-05s.jpg',
      videoUrl: '/assets/videos/womens-couture-reveal-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/womens-09s.jpg',
      additionalImages: [
        '/assets/videos/frames/womens-01s.jpg',
        '/assets/videos/frames/womens-frame-02s.jpg',
        '/assets/videos/frames/womens-frame-05s.jpg',
        '/assets/videos/frames/womens-09s.jpg'
      ]
    },
    modelPath: '/models/hero-garment.glb',
    isCustomizable: true,
    availability: 'Made to Order',
    description:
      'The definitive centerpiece of The Threador Haute Couture Atelier. Conceived as an architectural poem in champagne ivory, this gown harmonizes a structured hand-boned corset with weightless cascading organza tiers, adorned with delicate botanical threadwork and luminous river pearls.'
  },
  {
    id: 'THREADOR-W-002',
    name: 'The Tiered Fluted Peplum Gown',
    subtitle: 'Triple-Ply Silk Gazar with Sculptural Trumpet Hemline',
    gender: 'women',
    category: 'Couture Gowns',
    price: 98000,
    currency: 'INR',
    leadTimeWeeks: 4,
    craftsmanshipHours: 260,
    stitchCount: '65,000 Hand Stitches',
    silhouette: 'Architectural column bodice transitioning to voluminous multi-tiered trumpet flutes',
    primaryFabric: 'Triple-Ply Mulberry Silk Gazar',
    lining: 'Lightweight Habotai Silk',
    details: [
      'Horsehair braid reinforced hems providing natural gravitational fluting',
      'Dual-tier architectural peplum overlay echoing classical temple columns',
      'Strapless interior bustier foundation with plush silicone grip tape',
      'Invisible side zipper with hand-stitched reinforcement tacking'
    ],
    materials: {
      composition: '100% Pure Mulberry Silk Gazar',
      weight: '120 g/m²',
      provenance: 'Woven in Bangalore, India; finished at The Threador Atelier',
      weave: 'High-Twist Dense Gazar Weave'
    },
    sizes: ['XS', 'S', 'M', 'L', 'Made-to-Measure'],
    colors: [
      { name: 'Champagne Ivory', hex: '#faf4e8' },
      { name: 'Golden Sand', hex: '#dfcca5' },
      { name: 'Obsidian Noir', hex: '#141416' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/womens-09s.jpg',
      thumbnail: '/assets/videos/frames/campaign-09s.jpg',
      videoUrl: '/assets/videos/womens-couture-reveal-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/womens-01s.jpg',
      additionalImages: [
        '/assets/videos/frames/womens-09s.jpg',
        '/assets/videos/frames/campaign-09s.jpg'
      ]
    },
    modelPath: '/models/hero-garment.glb',
    isCustomizable: true,
    availability: 'Made to Order',
    description:
      'A study in tension and release. High-twist silk gazar creates firm architectural lines across the décolletage before liberating into a swirling dance of fluted organza peplums around the knees and floor.'
  },
  {
    id: 'THREADOR-W-003',
    name: 'The Botanical Zardozi Evening Dress',
    subtitle: 'Pure Silk Crepe de Chine with Ascending Lotus Tendrils',
    gender: 'women',
    category: 'Dresses',
    price: 85000,
    currency: 'INR',
    leadTimeWeeks: 3,
    craftsmanshipHours: 210,
    stitchCount: '185,000 Metallic Filaments',
    silhouette: 'Sleeveless column silhouette with contoured empire waist and low back',
    primaryFabric: 'Pure Silk Crepe de Chine',
    lining: 'Mulberry Silk Georgette',
    details: [
      'Ascending floral vines rendered in real metallic zari yarn',
      'Micro glass seed bead embellishments catching amber studio light',
      'Seamless bias-cut torso with natural kinetic drape',
      'Delicate rolled baby hems hand-stitched at 18 stitches per inch'
    ],
    materials: {
      composition: '100% Silk Crepe; Pure Metallic Zari Thread',
      weight: '90 g/m²',
      provenance: 'Hand-embroidered in Varanasi, India',
      weave: 'Crepe Weave'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Ivory Champagne', hex: '#fcf8ee' },
      { name: 'Midnight Emerald', hex: '#1a332a' },
      { name: 'Imperial Navy', hex: '#18243b' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/womens-frame-05s.jpg',
      thumbnail: '/assets/videos/frames/womens-01s.jpg',
      videoUrl: '/assets/videos/womens-couture-reveal-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/womens-frame-02s.jpg',
      additionalImages: [
        '/assets/videos/frames/womens-frame-05s.jpg',
        '/assets/videos/frames/womens-01s.jpg'
      ]
    },
    isCustomizable: true,
    availability: 'Made to Order',
    description:
      'Inspired by ancient Sanskrit floral poetry. The weightless silk crepe contours closely to the body while gold-leaf zardozi stems wind their way from the hem to the neckline like living flora.'
  },
  {
    id: 'THREADOR-W-004',
    name: 'The Banarasi Stage Cape',
    subtitle: 'Handloom Kadwa Brocade with Magnetic Sovereign Collar',
    gender: 'women',
    category: 'Occasion Wear',
    price: 62000,
    currency: 'INR',
    leadTimeWeeks: 3,
    craftsmanshipHours: 140,
    stitchCount: '48,000 Loom Passes',
    silhouette: 'Floor-sweeping dramatic cape with standing regal collar and curved shoulder drape',
    primaryFabric: 'Handloom Banarasi Kadhwa Brocade',
    lining: 'Heavy Silk Twill',
    details: [
      'Authentic Kadwa weaving technique where each gold motif is engraved individually',
      'Concealed neodymium magnetic neck fastening',
      'Arm slits encased in tonal silk grosgrain binding',
      'Weighted hem bars ensuring majestic theatrical drape during motion'
    ],
    materials: {
      composition: '75% Mulberry Silk, 25% Tested Silver-Gilt Zari',
      weight: '260 g/m²',
      provenance: 'Woven on heritage pit-looms in Varanasi, Uttar Pradesh',
      weave: 'Kadhwa Brocade Weave'
    },
    sizes: ['Free Size / Custom'],
    colors: [
      { name: 'Mustard Gold & Ivory', hex: '#c59d3f' },
      { name: 'Midnight Navy & Copper', hex: '#1c283f' }
    ],
    featuredMedia: {
      heroImage: '/assets/videos/frames/campaign-09s.jpg',
      thumbnail: '/assets/videos/frames/campaign-frame-05s.jpg',
      videoUrl: '/assets/videos/threador-campaign-film-1080p.mp4',
      videoFramePreview: '/assets/videos/frames/campaign-01s.jpg',
      additionalImages: [
        '/assets/videos/frames/campaign-09s.jpg',
        '/assets/videos/frames/campaign-frame-05s.jpg'
      ]
    },
    isCustomizable: true,
    availability: 'Atelier Exclusive',
    description:
      'Bridging stage theatricality with haute couture dignity. Conceived originally for grand annual theatrical productions, this sovereign cape transforms any evening ensemble into an extraordinary regal statement.'
  }
];

