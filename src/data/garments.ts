import type { GarmentStory } from '../types';

export const HERO_GARMENT: GarmentStory = {
  id: 'haute-couture-01',
  name: 'L’Aura de Soie No. 07',
  atelier: 'women',
  season: 'Couture Automne / Hiver',
  silhouette: 'Sculptural Fluted Trumpet with Tiered Organza Petals',
  fabric: 'Triple-Ply Mulberry Silk Gazar & Sheer Organza',
  craftsmanshipHours: 320,
  origin: 'Lyon & Paris Atelier',
  leadArtisan: 'Maître Brodeur Claire Valmont',
  description:
    'Conceived as an architectural poem in champagne ivory. The gown unites a structural hand-boned corset with weightless cascading organza tiers, embellished with micro-botanical threadwork and river-pearl cabochons.',
  details: [
    'Hand-moulded spiral boning channels contoured to 0.5mm precision',
    '38 metres of custom-woven Lyon silk organza cut on a 45° bias',
    '8,400 hand-sewn seed pearls graduated in 3 distinct calibres',
    'Micro-stitching with continuous tension silk filum'
  ],
  materials: {
    composition: '100% Organically Farmed Mulberry Silk, Natural Pearl Inlay',
    weight: '38 g/m² (organza) / 185 g/m² (faille core)',
    provenance: 'Weft spun in Como; woven in Lyon; finished at Rue Vivienne',
    weave: 'Open-plain organza weave over structural faille foundation'
  },
  metrics: {
    handStitches: '42,000+',
    patternPieces: 28,
    pearlCount: 8400
  }
};

export const MENS_COLLECTION: GarmentStory[] = [
  {
    id: 'men-01',
    name: 'The Architectural Greatcoat',
    atelier: 'men',
    season: 'Atelier Tailoring N° 12',
    silhouette: 'Extended Structured Shoulder & Floor-Length Drape',
    fabric: 'Unbleached Double-Face Shetland Wool & Horsehair Canvas',
    craftsmanshipHours: 185,
    origin: 'Savile Row & Biella Atelier',
    leadArtisan: 'Head Cutter Marcus Vance',
    description:
      'Engineered with an unbroken vertical line. Internal floating canvas constructed from natural horsehair delivers structural memory without rigid synthetic interlinings.',
    details: [
      'Hand-padded floating chest canvas with 3,200 pad stitches',
      'Horn buttons carved from ethically sourced Scottish highland stag',
      'Internal pick-stitched pocket flaps and silk-lined armholes',
      'Continuous rear vent with concealed button storm-closure'
    ],
    materials: {
      composition: '100% Heritage Highland Wool, Cupro Silk Lining',
      weight: '480 g/m²',
      provenance: 'Woven in Biella, Italy; cut on Savile Row, London',
      weave: '2/2 Broken Twill weave'
    },
    metrics: {
      handStitches: '18,500',
      patternPieces: 36
    }
  },
  {
    id: 'men-02',
    name: 'The Drape Trench & Sartorial Smock',
    atelier: 'men',
    season: 'Atelier Tailoring N° 14',
    silhouette: 'Raglan Storm Shield with Cinched Technical Belt',
    fabric: 'High-Density Giza Cotton Gabardine (Water-Repellent)',
    craftsmanshipHours: 110,
    origin: 'Lancashire & Milan Atelier',
    leadArtisan: 'Senior Tailor Andrea Rossi',
    description:
      'A technical study in rainwear elegance. Spun from ultra-long staple Egyptian Giza cotton woven so tightly that rain beads naturally on its surface without fluorochemical coatings.',
    details: [
      'Inverted pleat rear storm shield for thermal dispersion',
      'Hand-bound seam allowances encased in tonal silk grosgrain',
      'Magnetic buckle hardware milled from single billet matte titanium',
      'Convertible storm collar with throat latch'
    ],
    materials: {
      composition: '100% Giza 87 Extra-Long Staple Cotton',
      weight: '320 g/m²',
      provenance: 'Spun in Alexandria; woven in Lancashire, UK',
      weave: 'Steep-angle 63° Gabardine twill'
    },
    metrics: {
      handStitches: '11,200',
      patternPieces: 42
    }
  }
];

export const WOMENS_COLLECTION: GarmentStory[] = [
  {
    id: 'women-01',
    name: 'L’Aura de Soie No. 07',
    atelier: 'women',
    season: 'Couture Automne / Hiver',
    silhouette: 'Sculptural Fluted Trumpet with Tiered Organza Petals',
    fabric: 'Triple-Ply Mulberry Silk Gazar & Sheer Organza',
    craftsmanshipHours: 320,
    origin: 'Lyon & Paris Atelier',
    leadArtisan: 'Maître Brodeur Claire Valmont',
    description:
      'The centerpiece couture gown featuring hand-boned anatomical foundation and multi-tiered diaphanous silk fluting with river pearl embellishment.',
    details: [
      'Hand-moulded spiral boning channels contoured to 0.5mm precision',
      '38 metres of custom-woven Lyon silk organza cut on a 45° bias',
      '8,400 hand-sewn seed pearls graduated in 3 distinct calibres',
      'Micro-stitching with continuous tension silk filum'
    ],
    materials: {
      composition: '100% Organically Farmed Mulberry Silk, Natural Pearl Inlay',
      weight: '38 g/m² (organza) / 185 g/m² (faille core)',
      provenance: 'Weft spun in Como; woven in Lyon; finished at Rue Vivienne',
      weave: 'Open-plain organza weave over structural faille foundation'
    },
    metrics: {
      handStitches: '42,000+',
      patternPieces: 28,
      pearlCount: 8400
    }
  },
  {
    id: 'women-02',
    name: 'Sculpted Column of Crêpe de Chine',
    atelier: 'women',
    season: 'Couture Automne / Hiver',
    silhouette: 'Bias-Cut Architectural Column with Geometrical Cowl',
    fabric: 'Heavyweight Sand-Washed Silk Crêpe de Chine',
    craftsmanshipHours: 160,
    origin: 'Como & Kyoto Atelier',
    leadArtisan: 'Pattern Master Yoko Tanaka',
    description:
      'Cut entirely on a true 45-degree geometric bias, allowing the natural elasticity of woven silk to mold around the human silhouette without darts or visible seams.',
    details: [
      'Zero-waste pattern layout nested on a single bolt of woven silk',
      'French rolled hand hems measuring 1.2mm in width',
      'Invisible side closure fastened with hand-covered silk loop buttons',
      'Soft sand-wash finish yielding an ultra-matte peau de pêche tactile hand'
    ],
    materials: {
      composition: '100% Raw Spun Silk Crêpe',
      weight: '160 g/m²',
      provenance: 'Milled in Kyoto; dyed with mineral iron-ash in Como',
      weave: 'High-twist crepe twist 3,000 TPM'
    },
    metrics: {
      handStitches: '14,800',
      patternPieces: 8
    }
  }
];

