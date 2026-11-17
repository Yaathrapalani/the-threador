export interface GarmentAssetRecord {
  garmentId: string;
  name: string;
  gender: 'women' | 'men';
  version: string;
  generationStatus: 'concept-verified' | 'reference-complete' | 'mesh-production-ready' | 'shipped';
  baseDescription: string;
  silhouette: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    hexPrimary: string;
    hexAccent: string;
  };
  materialDefinition: {
    outerFabric: string;
    lining: string;
    structure: string;
    refractiveIndex: number;
    roughnessRange: [number, number];
    transmission: number;
  };
  embroideryDetails: {
    technique: string;
    threadComposition: string;
    motifs: string[];
    stitchCountEst: number;
    embellishments: string[];
  };
  constructionDetails: {
    patternPieces: number;
    boningChannels: number;
    seamAllowance: string;
    hemFinishing: string;
    closures: string;
  };
  textureReferences: {
    albedoMap: string;
    normalMap: string;
    roughnessMap: string;
    transmissionMap?: string;
    aoMap: string;
  };
  cameraViews: {
    front: { position: [number, number, number]; target: [number, number, number]; fov: number };
    threeQuarter: { position: [number, number, number]; target: [number, number, number]; fov: number };
    side: { position: [number, number, number]; target: [number, number, number]; fov: number };
    back: { position: [number, number, number]; target: [number, number, number]; fov: number };
    macro: { position: [number, number, number]; target: [number, number, number]; fov: number };
    stitching: { position: [number, number, number]; target: [number, number, number]; fov: number };
  };
}

export const GARMENT_REGISTRY: Record<string, GarmentAssetRecord> = {
  'THREADOR-W-001': {
    garmentId: 'THREADOR-W-001',
    name: 'The Champagne Atelier Gown',
    gender: 'women',
    version: '1.2.0',
    generationStatus: 'mesh-production-ready',
    baseDescription:
      'An original sculptural champagne-ivory couture gown blending layered sheer silk organza, hand-embroidered botanical goldwork, and pearlescent embellishments over an architectural corset foundation.',
    silhouette: 'Sculptural fluted couture gown with sweetheart bodice, peplum overskirt tier, and harmonic trumpet train.',
    colorPalette: {
      primary: 'Warm Ivory Champagne',
      secondary: 'Natural French Linen',
      accent: 'Antique Mustard Gold & Nacre Pearl',
      hexPrimary: '#fbf7ee',
      hexAccent: '#c7a64a'
    },
    materialDefinition: {
      outerFabric: 'Layered 14mm pure mulberry silk organza with subtle physical sheen and physical transmission',
      lining: 'Heavy silk faille foundation underlayer with brushed cotton interlining',
      structure: 'Spiral steel boning rib channels contouring the natural wasp waist and bust apex',
      refractiveIndex: 1.48,
      roughnessRange: [0.22, 0.45],
      transmission: 0.62
    },
    embroideryDetails: {
      technique: 'Zardozi micro-wire couching and aari needlework',
      threadComposition: 'Fine zari metallic yarn and spun mulberry silk filament',
      motifs: ['Botanical ascending flora', 'Stylised lotus petals', 'Interlocking vine tendrils'],
      stitchCountEst: 428000,
      embellishments: ['45 hand-set nacre freshwater pearls', 'Micro glass seed beads']
    },
    constructionDetails: {
      patternPieces: 38,
      boningChannels: 10,
      seamAllowance: '1.5 cm French felled seam allowances with bias-bound silk tape',
      hemFinishing: 'Horsehair braid hem reinforcement for volumetric gravity fluting',
      closures: 'Hand-sewn concealed silk loop and covered pearl button back placket'
    },
    textureReferences: {
      albedoMap: '/assets/garments/womens/W001/textures/albedo.webp',
      normalMap: '/assets/garments/womens/W001/textures/normal.webp',
      roughnessMap: '/assets/garments/womens/W001/textures/roughness.webp',
      transmissionMap: '/assets/garments/womens/W001/textures/transmission.webp',
      aoMap: '/assets/garments/womens/W001/textures/ao.webp'
    },
    cameraViews: {
      front: { position: [0, 0.15, 3.85], target: [0, -0.05, 0], fov: 32 },
      threeQuarter: { position: [2.35, 0.25, 2.75], target: [0, -0.05, 0], fov: 32 },
      side: { position: [3.45, 0.15, 0.2], target: [0, -0.05, 0], fov: 30 },
      back: { position: [0.1, 0.25, -3.8], target: [0, 0.05, 0], fov: 32 },
      macro: { position: [0.65, -0.22, 1.35], target: [0.15, -0.38, 0.1], fov: 24 },
      stitching: { position: [0.38, 0.42, 1.1], target: [0.08, 0.38, 0.12], fov: 22 }
    }
  },
  'THREADOR-M-001': {
    garmentId: 'THREADOR-M-001',
    name: 'The Imperial Structured Bandhgala & Greatcoat',
    gender: 'men',
    version: '1.2.0',
    generationStatus: 'mesh-production-ready',
    baseDescription:
      'An architectural tailored menswear silhouette combining the sharp discipline of a heritage Indian Bandhgala collar with the flowing authority of an unlined ceremonial wool greatcoat.',
    silhouette: 'Structured high-armhole tailored coat with standing mandarin collar, roped shoulders, and vented architectural drape.',
    colorPalette: {
      primary: 'Midnight Charcoal Ink',
      secondary: 'Raw Spun Wool & Ebonized Walnut',
      accent: 'Dull Antique Brushed Brass',
      hexPrimary: '#1a1918',
      hexAccent: '#c8ad78'
    },
    materialDefinition: {
      outerFabric: '380 GSM handloom wool & cashmere twill with matte dry-touch surface',
      lining: 'Half-lined cupro twill with floating horsehair canvas chest piece',
      structure: 'Multi-layer padded shoulder foundation and reinforced standing band collar',
      refractiveIndex: 1.54,
      roughnessRange: [0.78, 0.92],
      transmission: 0.0
    },
    embroideryDetails: {
      technique: 'Tone-on-tone matte silk thread pick stitching and bullion wire cuff embroidery',
      threadComposition: 'Filament silk and muted antique gold wire',
      motifs: ['Geometric border bands', 'Collar neckline edge tracing'],
      stitchCountEst: 184000,
      embellishments: ['Hand-carved solid buffalo horn buttons with brass shank inserts']
    },
    constructionDetails: {
      patternPieces: 44,
      boningChannels: 0,
      seamAllowance: '2.0 cm tailored seam allowances with hand-pressed open seams',
      hemFinishing: 'Blind hand-catch stitch with deep 5 cm weighted hem',
      closures: 'Single-breasted 5-button front with hand-worked milanese buttonholes'
    },
    textureReferences: {
      albedoMap: '/assets/garments/mens/M001/textures/albedo.webp',
      normalMap: '/assets/garments/mens/M001/textures/normal.webp',
      roughnessMap: '/assets/garments/mens/M001/textures/roughness.webp',
      aoMap: '/assets/garments/mens/M001/textures/ao.webp'
    },
    cameraViews: {
      front: { position: [0, 0.2, 3.9], target: [0, 0, 0], fov: 32 },
      threeQuarter: { position: [-2.4, 0.3, 2.7], target: [0, 0, 0], fov: 32 },
      side: { position: [-3.5, 0.2, 0.1], target: [0, 0, 0], fov: 30 },
      back: { position: [0, 0.25, -3.85], target: [0, 0.05, 0], fov: 32 },
      macro: { position: [-0.62, 0.45, 1.25], target: [-0.12, 0.42, 0.15], fov: 24 },
      stitching: { position: [-0.35, 0.95, 1.15], target: [0, 0.92, 0.18], fov: 22 }
    }
  }
};

