import type { ProductRecord } from '../types';

export const STORE_PRODUCTS: ProductRecord[] = [
  // =========================================================================
  // MEN'S LUXURY TAILORED COLLECTION
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
