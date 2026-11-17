import type { CostumeItem } from '../types';

export const THREADOR_BRAND = {
  name: 'THE THREADOR',
  tagline: 'MY STORY, THREADED.',
  corePhilosophy: 'What if every child grew up knowing the story behind what they wear?',
  supportingPhilosophy: 'The land. The material. The maker. The culture. The industry.',
  positioning: 'Fashion education rooted in India. Connecting children with Indian textiles, materials, crafts, making processes, fashion industries and contemporary design.',
  pillars: {
    learn: {
      id: 'learn',
      title: 'LEARN — Fashion Education & School Programs',
      lead: 'A structured, hands-on curriculum connecting classrooms to Indian heritage textiles, material science, pattern making, and sustainable design thinking.'
    },
    create: {
      id: 'create',
      title: 'CREATE — Costume Atelier & Annual Day Experiences',
      lead: 'Complete stage-to-applause costume design for schools and academies. Custom themes, choreography, music, props, and hand-crafted stage wear.'
    }
  },
  foundations: [
    {
      num: '01',
      title: 'CULTURE',
      tag: 'Know where we come from.',
      description: 'Understanding the indigenous textile heritage of India — from the ancient cotton vats of the Indus Valley to the woven silks of Kanchipuram and Varanasi.'
    },
    {
      num: '02',
      title: 'MATERIAL',
      tag: 'Know what the land gives us.',
      description: 'Soil-to-skin awareness: Khadi, organic long-staple cotton, Ahimsa non-violent silk, banana fiber, and naturally cultivated vegetable dyes.'
    },
    {
      num: '03',
      title: 'MAKING',
      tag: 'Know how things are made.',
      description: 'Hands-on tactile mastery: Handloom weaving mechanics, wooden block printing, natural vat fermentation, pattern drafting, and stitch tension.'
    },
    {
      num: '04',
      title: 'INDUSTRY',
      tag: 'Know the ecosystem.',
      description: 'Deconstructing modern fashion: Mills, artisans, supply chains, ethical manufacturing, zero-waste design, and circular economic cycles.'
    },
    {
      num: '05',
      title: 'CREATION',
      tag: 'Take Indian knowledge forward.',
      description: 'Empowering children to become contemporary makers: translating traditional craft knowledge into avant-garde global silhouettes and sustainable solutions.'
    }
  ],
  curriculum: [
    {
      stage: 'STAGE 01',
      grades: 'GRADES 1–3',
      code: 'DISCOVER',
      headline: 'Observe, touch, match and explore.',
      focus: 'Tactile sensory awareness and story connection',
      modules: [
        'Colours and patterns from nature and flora',
        'Materials around us (bark, leaf, thread, fleece)',
        'Stories of clothing and childhood garments',
        'Simple making: finger weaving, clay prints, and knot craft'
      ],
      outcome: 'Sensory textile literacy and wonder for natural materials'
    },
    {
      stage: 'STAGE 02',
      grades: 'GRADES 4–6',
      code: 'EXPLORE',
      headline: 'Research, experiment and construct.',
      focus: 'Process discovery and regional textile geography',
      modules: [
        'Regional Indian textiles (Ikat, Jamdani, Bandhani, Chanderi)',
        'Fibre to fabric transformation science',
        'Techniques and tools: hand shuttles, mordants, block carving',
        'Design challenges: Zero-waste fabric cutting'
      ],
      outcome: 'Technical craft awareness, scientific inquiry, and environmental empathy'
    },
    {
      stage: 'STAGE 03',
      grades: 'GRADES 7–8',
      code: 'CREATE',
      headline: 'Design, build and communicate.',
      focus: 'Portfolio development, 3D draping, and industry synthesis',
      modules: [
        'Design development: Moodboards to draped 3D prototypes',
        'Garment construction: Seam allowance, bias cut, and boning',
        'Brand and storytelling: Communicating provenance',
        'Industry & entrepreneurship: Sustainable atelier business'
      ],
      outcome: 'A real student design portfolio and confident creative autonomy'
    }
  ],
  outcomes: [
    { title: 'Cultural Literacy', desc: 'Deep pride and contextual understanding of Indian textile traditions and artisanal communities.' },
    { title: 'Material Awareness', desc: 'Ability to identify pure natural fibers versus synthetic petrochemical textiles and their environmental footprint.' },
    { title: 'Making Skills', desc: 'Practical dexterity in hand stitching, block printing, pattern cutting, and 3D draping.' },
    { title: 'Industry Awareness', desc: 'Understanding fashion ecosystems, ethical supply chains, and circular design.' },
    { title: 'Creative Confidence', desc: 'Translating personal voice and lived culture into wearable, expressive forms.' },
    { title: 'A Tangible Portfolio', desc: 'Documented prototypes, sketches, and textile experiments for school and academic recognition.' }
  ],
  annualDayServices: [
    {
      num: '01',
      title: 'CONCEPT & THEME',
      desc: 'Original stage themes celebrating Indian culture, world history, mythology, literature, and futuristic narratives tailored to school values.'
    },
    {
      num: '02',
      title: 'CHOREOGRAPHY',
      desc: 'Seamless movement design from classical Indian forms (Kathak, Bharatanatyam, Folk) to contemporary expressive dance.'
    },
    {
      num: '03',
      title: 'MUSIC & VISUALS',
      desc: 'Custom studio soundtracks, narration, voiceover production, and dynamic cinematic LED backdrop visuals.'
    },
    {
      num: '04',
      title: 'COSTUMES & SETS',
      desc: 'Custom-tailored stage garments, headpieces, theatrical props, and backdrop set architecture made to illuminate under stage lighting.'
    }
  ],
  portfolioCategories: [
    { id: 'all', label: 'All Atelier Work' },
    { id: 'annual-day', label: 'Annual Day Costumes' },
    { id: 'dance', label: 'Dance Academy' },
    { id: 'cultural', label: 'Cultural & Historic Shows' },
    { id: 'sports', label: 'Sports & Event Wear' },
    { id: 'uniform', label: 'Bespoke School Uniforms' }
  ]
};

export const SAMPLE_COSTUMES: CostumeItem[] = [
  {
    id: 'costume-01',
    title: 'The Royal Nawabs of Awadh',
    category: 'cultural',
    theme: 'Mughal & Awadhi Heritage',
    description: 'Gold-zardozi embroidered angrakhas crafted in ivory raw silk with royal emerald brocade sashes.',
    image: 'cultural-awadh',
    tags: ['Zardozi', 'Raw Silk', 'Heritage Brocade']
  },
  {
    id: 'costume-02',
    title: 'Sufi Whirling Dervishes',
    category: 'dance',
    theme: 'Mystical Harmony',
    description: 'Layered pleated skirts in heavy unbleached cotton that bloom into concentric circles during motion.',
    image: 'dance-sufi',
    tags: ['Circular Flare', 'Pleated Cotton', 'Stage Flow']
  },
  {
    id: 'costume-03',
    title: 'Solar Dynasty Warriors',
    category: 'annual-day',
    theme: 'Epic of the Sun',
    description: 'Sculptured copper-foil chest armor over mustard raw silk dhotis with metallic head crests.',
    image: 'annual-warrior',
    tags: ['Sculpted Armor', 'Raw Silk', 'Stage Light']
  },
  {
    id: 'costume-04',
    title: 'Rhythms of Kathakali & Theyyam',
    category: 'cultural',
    theme: 'Temple Lore of Kerala',
    description: 'Intricately tiered scarlet skirts with painted geometric motifs and structural halo headpieces.',
    image: 'cultural-theyyam',
    tags: ['Temple Art', 'Layered Canvasing', 'Hand-Painted']
  },
  {
    id: 'costume-05',
    title: 'Contemporary Fluid Ensemble',
    category: 'dance',
    theme: 'Elements in Motion',
    description: 'Dip-dyed indigo and turmeric silk scarves over structured midnight-navy unitards.',
    image: 'dance-fluid',
    tags: ['Natural Indigo', 'Chiffon Drape', 'Modern Ballet']
  },
  {
    id: 'costume-06',
    title: 'Bespoke Academy Blazer & Trousers',
    category: 'uniform',
    theme: 'School Identity',
    description: 'Midnight navy merino blend blazer with antique gold crest embroidery and custom brass buttons.',
    image: 'uniform-blazer',
    tags: ['Wool Blend', 'Gold Crest', 'Savile Tailoring']
  }
];

