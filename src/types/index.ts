export type AtelierGender = 'men' | 'women';

export type XRayStage = 'finished' | 'construction' | 'textile';

export type PageId = 'home' | 'about' | 'annual-day' | 'course' | 'gallery' | 'contact';

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
