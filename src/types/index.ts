export type AtelierGender = 'kids' | 'men' | 'women';

export type XRayStage = 'finished' | 'construction' | 'textile';

export type GarmentCameraView = 'front' | 'threeQuarter' | 'side' | 'back' | 'macro' | 'stitching';

export type PageId =
  | 'home'
  | 'kids'
  | 'men'
  | 'women'
  | 'collections'
  | 'product-detail'
  | 'atelier'
  | 'annual-day'
  | 'course'
  | 'gallery'
  | 'about'
  | 'contact';

export interface GarmentStory {
  id: string;
  name: string;
  atelier: AtelierGender;
  season: string;
  silhouette: string;
  fabric: string;
  craftsmanshipHours: number;
  origin: string;
  leadArtisan: string;
  description: string;
  details: string[];
  materials: {
    composition: string;
    weight: string;
    provenance: string;
    weave: string;
  };
  metrics: {
    handStitches: string;
    patternPieces: number;
    pearlCount?: number;
  };
}

export interface ModelAssetInfo {
  isExternalGlb: boolean;
  modelPath: string;
  vertexCount: number;
  triangles: number;
  shaderTechnique: string;
  status: 'procedural-couture-active' | 'external-glb-loaded' | 'fallback-active';
}

export interface ProductRecord {
  id: string;
  name: string;
  subtitle: string;
  gender: AtelierGender;
  category: string;
  ageGroup?: string;
  price: number;
  currency: string;
  leadTimeWeeks: number;
  craftsmanshipHours: number;
  stitchCount: string;
  silhouette: string;
  primaryFabric: string;
  lining: string;
  hypoallergenic?: boolean;
  growAllowance?: string;
  parentGuide?: string;
  details: string[];
  materials: {
    composition: string;
    weight: string;
    provenance: string;
    weave: string;
  };
  sizes: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  featuredMedia: {
    heroImage: string;
    thumbnail: string;
    videoUrl?: string;
    videoFramePreview?: string;
    additionalImages: string[];
  };
  modelPath?: string;
  isCustomizable: boolean;
  availability: 'Made to Order' | 'Atelier Exclusive' | 'Bespoke Only';
  description: string;
}

export interface CartItem {
  id: string; // unique cart item id (e.g. productId-size-color-timestamp)
  product: ProductRecord;
  selectedSize: string;
  selectedColor: string;
  selectedFabric?: string;
  customNotes?: string;
  quantity: number;
  addedAt: number;
}

export interface AtelierCustomizationConfig {
  garmentId: string;
  gender: AtelierGender;
  fabricId: string;
  fabricName: string;
  colorName: string;
  colorHex: string;
  lapelStyle: string;
  collarStyle?: string;
  buttonStyle: string;
  liningStyle: string;
  monogramText: string;
  measurementsType: 'standard' | 'made-to-measure';
  size: string;
  childAge?: string;
  childHeightCm?: string;
  shoulderToHemInches?: string;
  clientNotes: string;
}

export interface AnnualDayLead {
  id: string;
  timestamp: string;
  schoolName: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  studentsCount: string;
  eventDate: string;
  themeIdeas: string;
  status: 'new' | 'reviewed' | 'contacted';
}

export interface CourseEnrolmentLead {
  id: string;
  timestamp: string;
  parentName: string;
  childName: string;
  grade: 'grades-1-3' | 'grades-4-6' | 'grades-7-8';
  phone: string;
  email: string;
  batch: 'weekend' | 'after-school';
  referralSource: string;
  status: 'new' | 'reviewed' | 'contacted';
}

export interface GeneralInquiryLead {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  inquiryType: 'school' | 'parent' | 'general';
  message: string;
  status: 'new' | 'reviewed' | 'contacted';
}

export interface CostumeItem {
  id: string;
  title: string;
  category: 'annual-day' | 'dance' | 'cultural' | 'sports' | 'uniform';
  description: string;
  image: string;
  theme: string;
  tags: string[];
}
