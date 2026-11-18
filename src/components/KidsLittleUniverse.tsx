import { useState, useMemo } from 'react';
import {
  Sparkles,
  Heart,
  Share2,
  SlidersHorizontal,
  ShieldCheck,
  Clock,
  ArrowRight,
  Eye,
  ShoppingBag,
  Ruler,
  Feather,
  Drama,
  BookOpen
} from 'lucide-react';
import { STORE_PRODUCTS } from '../data/storeProducts';
import { cartService } from '../services/cartService';
import type { ProductRecord, PageId } from '../types';

interface KidsLittleUniverseProps {
  onSelectProduct: (productId: string) => void;
  onNavigatePage: (page: PageId) => void;
  onOpenCart: () => void;
}

type AudienceMode = 'little-world' | 'parent-atelier';

interface OccasionStory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconTag: string;
}

const OCCASIONS: OccasionStory[] = [
  {
    id: 'all',
    title: 'All Moments',
    subtitle: 'The Complete Universe',
    description: 'Every heirloom garment tailored for childhood celebration.',
    iconTag: '✨'
  },
  {
    id: 'celebration',
    title: 'Celebration & Birthday',
    subtitle: 'Milestone Joy',
    description: 'Triple-tier organza gowns and festive velvet bandhgalas for memorable birthdays.',
    iconTag: '🎂'
  },
  {
    id: 'wedding',
    title: 'Family Occasion & Wedding',
    subtitle: 'Ceremonial Elegance',
    description: 'Flower girl organza dresses, junior Savile double-breasted blazers, and brocade anarkalis.',
    iconTag: '🌸'
  },
  {
    id: 'festive',
    title: 'Festive & Heritage',
    subtitle: 'Traditional Wonder',
    description: 'Handspun Matka silk kurtas, Banarasi zari brocade, and heritage Nehru waistcoats.',
    iconTag: '🪔'
  },
  {
    id: 'stage',
    title: 'Stage & Annual Day',
    subtitle: 'Theatrical Performance',
    description: 'Costume atelier productions, period theatrical pieces, and choir ceremonial capes.',
    iconTag: '🎭'
  }
];

const COLOUR_GARDEN = [
  { id: 'all', name: 'All Colours', hex: '#F1EEF4' },
  { id: 'powder-blue', name: 'Powder Blue', hex: '#8EA8C3', story: 'Like morning sky over spring meadows' },
  { id: 'soft-butter', name: 'Soft Butter Yellow', hex: '#E8D595', story: 'Warm afternoon sunlight on tussar silk' },
  { id: 'dusty-rose', name: 'Dusty Rose', hex: '#C49A9B', story: 'Gentle rose petals in temple gardens' },
  { id: 'lavender', name: 'Gentle Lavender', hex: '#B5A0D0', story: 'Twilight mist over hillsides' },
  { id: 'mint', name: 'Muted Mint', hex: '#8FBCA4', story: 'Cool river mint leaves after rain' },
  { id: 'coral', name: 'Soft Coral', hex: '#D48B80', story: 'Celebration warmth and joyful laughter' },
  { id: 'apricot', name: 'Warm Apricot', hex: '#DE9E7D', story: 'Sweet summer harvest glow' },
  { id: 'plum', name: 'Deep Royal Plum', hex: '#4A284D', story: 'Rich evening velvet under gallery chandeliers' }
];

const FABRIC_OBSERVATORY = [
  {
    id: 'silk-organza',
    name: 'Mulberry Silk Organza',
    feel: 'Airy, crisp, weightless float',
    breathability: 'Very High (100% natural mulberry)',
    sensoryTouch: 'Smooth, zero friction against skin',
    longevity: 'Features 2.5" hidden French growth seam',
    story: 'Spun from natural Bombyx mori cocoons and cut on a 45° bias so it ripples gently with every step.'
  },
  {
    id: 'cotton-velvet',
    name: 'English Cotton Velvet',
    feel: 'Plush, supple, non-rigid softness',
    breathability: 'High (100% breathable organic cotton)',
    sensoryTouch: 'Deep velvety pile with calming tactile texture',
    longevity: 'Reinforced stress points for active movement',
    story: 'Woven in heritage mills with an organic cotton pile that absorbs and reflects ambient studio light.'
  },
  {
    id: 'bamboo-tulle',
    name: 'Gossamer Bamboo-Silk Tulle',
    feel: 'Soft cloud-like volume with zero itch',
    breathability: 'Maximum (Air-permeable hexagonal weave)',
    sensoryTouch: 'Featherlight against arms and neck',
    longevity: 'Hand-felled hemline buffers',
    story: 'Engineered specifically without stiff nylon netting, providing dramatic volume while remaining gentle.'
  },
  {
    id: 'banarasi-zari',
    name: 'Varanasi Handloom Kadhwa Zari',
    feel: 'Supple heirloom brocade lined in Habotai silk',
    breathability: 'Medium-High (Natural silk foundation)',
    sensoryTouch: 'All metallic gold wires are couched on top; interior is 100% smooth silk',
    longevity: 'Heirloom preservation quality',
    story: 'Woven on Varanasi heritage pit-looms by master weavers using hand-guided silver and gold zari threads.'
  }
];

const EDITORIAL_EDITS = [
  'All Edits',
  'The Celebration Edit',
  'The Little Occasion Collection',
  'The Festive Edit',
  'The Ceremony Collection',
  'The Stage & Performance Edit'
];

export function KidsLittleUniverse({
  onSelectProduct,
  onNavigatePage,
  onOpenCart
}: KidsLittleUniverseProps) {
  const [audienceMode, setAudienceMode] = useState<AudienceMode>('little-world');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [selectedColour, setSelectedColour] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedEdit, setSelectedEdit] = useState<string>('All Edits');
  const [selectedFabricTab, setSelectedFabricTab] = useState<string>('silk-organza');
  const [childWishlist, setChildWishlist] = useState<string[]>([]);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showSizeModal, setShowSizeModal] = useState<boolean>(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const kidsProducts = useMemo(() => {
    return STORE_PRODUCTS.filter((p) => p.gender === 'kids');
  }, []);

  const displayedProducts = useMemo(() => {
    let list = kidsProducts;

    // Filter by Age
    if (selectedAge !== 'all') {
      list = list.filter((p) => {
        if (!p.ageGroup) return true;
        if (selectedAge === '2–4Y') return p.ageGroup.includes('2') || p.ageGroup.includes('3') || p.ageGroup.includes('4');
        if (selectedAge === '4–6Y') return p.ageGroup.includes('4') || p.ageGroup.includes('5') || p.ageGroup.includes('6');
        if (selectedAge === '6–8Y') return p.ageGroup.includes('6') || p.ageGroup.includes('7') || p.ageGroup.includes('8');
        if (selectedAge === '8–10Y') return p.ageGroup.includes('8') || p.ageGroup.includes('9') || p.ageGroup.includes('10');
        if (selectedAge === '10–14Y') return p.ageGroup.includes('10') || p.ageGroup.includes('12') || p.ageGroup.includes('14');
        return true;
      });
    }

    // Filter by Occasion (Little World Mode)
    if (selectedOccasion !== 'all') {
      list = list.filter((p) => {
        const text = (p.name + ' ' + p.subtitle + ' ' + p.description).toLowerCase();
        if (selectedOccasion === 'celebration') return text.includes('gown') || text.includes('dress') || text.includes('celebration');
        if (selectedOccasion === 'wedding') return text.includes('wedding') || text.includes('occasion') || text.includes('blazer');
        if (selectedOccasion === 'festive') return text.includes('festive') || text.includes('kurta') || text.includes('brocade') || text.includes('bandhgala');
        if (selectedOccasion === 'stage') return text.includes('cape') || text.includes('ceremonial') || text.includes('stage');
        return true;
      });
    }

    // Filter by Colour (Colour Garden)
    if (selectedColour !== 'all') {
      list = list.filter((p) => {
        return p.colors?.some((c) => {
          const cName = c.name.toLowerCase();
          if (selectedColour === 'powder-blue') return cName.includes('blue');
          if (selectedColour === 'soft-butter') return cName.includes('butter') || cName.includes('gold');
          if (selectedColour === 'dusty-rose') return cName.includes('rose');
          if (selectedColour === 'lavender') return cName.includes('lavender') || cName.includes('violet');
          if (selectedColour === 'mint') return cName.includes('sage') || cName.includes('mint');
          if (selectedColour === 'coral') return cName.includes('coral') || cName.includes('peach');
          if (selectedColour === 'plum') return cName.includes('midnight') || cName.includes('plum');
          return true;
        });
      });
    }

    // Filter by Editorial Edit (Parent Atelier Mode)
    if (selectedEdit !== 'All Edits') {
      list = list.filter((p) => {
        const text = (p.name + ' ' + p.subtitle + ' ' + p.description).toLowerCase();
        if (selectedEdit === 'The Celebration Edit') return text.includes('gown') || text.includes('dress');
        if (selectedEdit === 'The Little Occasion Collection') return text.includes('blazer') || text.includes('occasion');
        if (selectedEdit === 'The Festive Edit') return text.includes('bandhgala') || text.includes('kurta');
        if (selectedEdit === 'The Ceremony Collection') return text.includes('anarkali') || text.includes('brocade');
        if (selectedEdit === 'The Stage & Performance Edit') return text.includes('ceremonial') || text.includes('cape');
        return true;
      });
    }

    return list;
  }, [kidsProducts, selectedAge, selectedOccasion, selectedColour, selectedEdit]);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChildWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleQuickAdd = (product: ProductRecord, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || '6–7Y';
    const defaultColor = product.colors[0]?.name || 'Warm Ivory';
    cartService.addItem(
      product,
      defaultSize,
      defaultColor,
      product.primaryFabric,
      `Heirloom Children's Garment (${defaultSize}) • 2.5" Growth Allowance & Hypoallergenic Silk Lining Included`,
      1
    );
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
      onOpenCart();
    }, 600);
  };

  const activeFabricDetail = FABRIC_OBSERVATORY.find((f) => f.id === selectedFabricTab) || FABRIC_OBSERVATORY[0];

  return (
    <div className="kids-universe-root">
      {/* 1. HERO MASTHEAD: PROJECT LITTLE UNIVERSE */}
      <section className="kids-universe-hero">
        <div className="kids-hero-inner">
          <div className="kids-taxonomy-cluster">
            <span className="universe-tag">PROJECT LITTLE UNIVERSE // PRINCIPAL COLLECTION</span>
            <span className="universe-philosophy">"A little imagination. A lot of craftsmanship."</span>
          </div>

          <h1 className="kids-monumental-headline">
            Clothing, <i>considered</i> for childhood wonder.
          </h1>

          <p className="kids-editorial-lead">
            Heirloom children’s occasionwear conceived without cartoonish clichés, cheap synthetic trims, or disposable fast-fashion shortcuts. 
            Engineered on authentic child proportions with 100% hypoallergenic organic mulberry silk linings and hidden 2.5-inch growth allowances.
          </p>

          {/* TWO-AUDIENCE MODE SWITCHER */}
          <div className="audience-mode-switcher-container" role="tablist" aria-label="Audience Experience Selector">
            <button
              type="button"
              className={`mode-switch-btn ${audienceMode === 'little-world' ? 'active' : ''}`}
              onClick={() => setAudienceMode('little-world')}
            >
              <Sparkles size={13} className="mode-icon" />
              <div className="btn-text-col">
                <span className="btn-title">THE LITTLE WORLD</span>
                <span className="btn-sub">Imaginative Discovery • Colours & Stories</span>
              </div>
            </button>

            <button
              type="button"
              className={`mode-switch-btn ${audienceMode === 'parent-atelier' ? 'active' : ''}`}
              onClick={() => setAudienceMode('parent-atelier')}
            >
              <ShieldCheck size={13} className="mode-icon" />
              <div className="btn-text-col">
                <span className="btn-title">THE PARENT’S ATELIER</span>
                <span className="btn-sub">Craftsmanship • Growth Sizing • Sizing Guide</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXPERIENCE A: THE LITTLE WORLD (CHILD & FAMILY DISCOVERY)
      ========================================================================= */}
      {audienceMode === 'little-world' && (
        <div className="little-world-experience">
          {/* A1. THE OCCASION EXPLORER */}
          <section className="little-world-section">
            <div className="section-overhead">
              <span className="sub-badge">CHAPTER 01 // DISCOVERY</span>
              <h2 className="section-title">The Occasion Explorer</h2>
              <p className="section-desc">What special celebration are we dressing for?</p>
            </div>

            <div className="occasion-cards-strip">
              {OCCASIONS.map((occ) => (
                <button
                  key={occ.id}
                  type="button"
                  className={`occasion-card ${selectedOccasion === occ.id ? 'active' : ''}`}
                  onClick={() => setSelectedOccasion(occ.id)}
                >
                  <span className="occ-emoji">{occ.iconTag}</span>
                  <span className="occ-title">{occ.title}</span>
                  <span className="occ-sub">{occ.subtitle}</span>
                  <p className="occ-desc">{occ.description}</p>
                </button>
              ))}
            </div>
          </section>

          {/* A2. THE COLOUR GARDEN */}
          <section className="little-world-section">
            <div className="section-overhead">
              <span className="sub-badge">CHAPTER 02 // PALETTES</span>
              <h2 className="section-title">The Colour Garden</h2>
              <p className="section-desc">Select a favourite shade from our natural silk and botanical dye palette.</p>
            </div>

            <div className="colour-garden-row">
              {COLOUR_GARDEN.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`colour-flower-pill ${selectedColour === c.id ? 'active' : ''}`}
                  onClick={() => setSelectedColour(c.id)}
                  title={c.story || c.name}
                >
                  <span className="flower-petal-dot" style={{ backgroundColor: c.hex }} />
                  <span className="flower-name">{c.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* A3. THE FABRIC OBSERVATORY */}
          <section className="little-world-section fabric-observatory-section">
            <div className="section-overhead">
              <span className="sub-badge">CHAPTER 03 // SENSORY TEXTILES</span>
              <h2 className="section-title">The Fabric Observatory</h2>
              <p className="section-desc">Touch, breathability and natural comfort for delicate skin.</p>
            </div>

            <div className="observatory-grid">
              <div className="fabric-selector-column">
                {FABRIC_OBSERVATORY.map((fab) => (
                  <button
                    key={fab.id}
                    type="button"
                    className={`observatory-tab-btn ${selectedFabricTab === fab.id ? 'active' : ''}`}
                    onClick={() => setSelectedFabricTab(fab.id)}
                  >
                    <Feather size={12} className="fab-icon" />
                    <span>{fab.name}</span>
                  </button>
                ))}
              </div>

              <div className="fabric-story-display-card">
                <div className="card-top-row">
                  <h3 className="fab-title">{activeFabricDetail.name}</h3>
                  <span className="fab-tagless">100% SENSORY TESTED</span>
                </div>

                <p className="fab-narrative">{activeFabricDetail.story}</p>

                <div className="fab-metrics-quad">
                  <div className="m-box">
                    <span className="m-label">TACTILE FEEL</span>
                    <span className="m-val">{activeFabricDetail.feel}</span>
                  </div>
                  <div className="m-box">
                    <span className="m-label">BREATHABILITY</span>
                    <span className="m-val">{activeFabricDetail.breathability}</span>
                  </div>
                  <div className="m-box">
                    <span className="m-label">SKIN CONTACT</span>
                    <span className="m-val">{activeFabricDetail.sensoryTouch}</span>
                  </div>
                  <div className="m-box">
                    <span className="m-label">HEIRLOOM DURATION</span>
                    <span className="m-val text-acid-lime">{activeFabricDetail.longevity}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* A4. CHILD FAVOURITES TRAY & FRIENDLY PARENT HANDOFF */}
          {childWishlist.length > 0 && (
            <div className="child-wishlist-floating-bar">
              <div className="wishlist-counter">
                <Heart size={14} className="text-acid-lime fill-current" />
                <span>MY FAVOURITE STORIES ({childWishlist.length})</span>
              </div>
              <button
                type="button"
                className="share-with-parent-btn"
                onClick={() => setShowShareModal(true)}
              >
                <Share2 size={13} />
                <span>SHOW MUM & DAD MY FAVOURITES</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          EXPERIENCE B: THE PARENT'S ATELIER (CRAFT, FIT & SIZING)
      ========================================================================= */}
      {audienceMode === 'parent-atelier' && (
        <div className="parent-atelier-experience">
          {/* P1. PEDIATRIC COMFORT & GROWTH LONGEVITY CALLOUT */}
          <section className="parent-comfort-banner">
            <div className="comfort-banner-card">
              <div className="banner-icon-badge">
                <ShieldCheck size={20} className="text-acid-lime" />
              </div>
              <div className="banner-info-body">
                <span className="banner-tag">PEDIATRIC TAILORING STANDARDS & HEIRLOOM EXPANSION</span>
                <h3 className="banner-title">Crafted with 2.5-Inch Hidden French Seams to Grow With Your Child</h3>
                <p className="banner-text">
                  Children grow quickly, but heirloom garments should last across family milestones. Every piece in The Threador Kids collection 
                  features internal hand-felled French seam allowances and let-down hem buffers that can be let out by 2.5 inches. 
                  Lined exclusively in 100% pure organic mulberry silk with zero synthetic tags to guarantee gentle comfort.
                </p>
                <div className="banner-actions-row">
                  <button
                    type="button"
                    className="size-guide-action-btn"
                    onClick={() => setShowSizeModal(true)}
                  >
                    <Ruler size={12} />
                    <span>OPEN PARENT SIZE & MEASURING GUIDE</span>
                  </button>
                  <button
                    type="button"
                    className="custom-atelier-action-btn"
                    onClick={() => onNavigatePage('atelier')}
                  >
                    <SlidersHorizontal size={12} />
                    <span>CUSTOMIZE MEASUREMENTS IN 3D ATELIER</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* P2. AGE-SEGMENTED FILTERING DOCK */}
          <section className="parent-filters-dock">
            <div className="filter-block">
              <span className="filter-title">AGE BRACKET:</span>
              <div className="age-pills-row">
                {[
                  { id: 'all', label: 'All Ages' },
                  { id: '2–4Y', label: '2–4Y Infants & Toddlers' },
                  { id: '4–6Y', label: '4–6Y Little Children' },
                  { id: '6–8Y', label: '6–8Y Young Children' },
                  { id: '8–10Y', label: '8–10Y Pre-Teens' },
                  { id: '10–14Y', label: '10–14Y Teenagers' }
                ].map((age) => (
                  <button
                    key={age.id}
                    type="button"
                    className={`age-pill-btn ${selectedAge === age.id ? 'active' : ''}`}
                    onClick={() => setSelectedAge(age.id)}
                  >
                    <span>{age.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-block">
              <span className="filter-title">EDITORIAL EDITS:</span>
              <div className="edits-pills-row">
                {EDITORIAL_EDITS.map((edit) => (
                  <button
                    key={edit}
                    type="button"
                    className={`edit-pill-btn ${selectedEdit === edit ? 'active' : ''}`}
                    onClick={() => setSelectedEdit(edit)}
                  >
                    <span>{edit}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          THE LIVING GARMENT SHOWCASE (GRID OF CURATED KIDS PRODUCTS)
      ========================================================================= */}
      <section className="kids-products-showcase-section">
        <div className="showcase-header-bar">
          <div className="showcase-title-group">
            <span className="count-pill">{displayedProducts.length} HEIRLOOM CREATIONS</span>
            <span className="results-caption">Single-Origin Atelier Tailoring</span>
          </div>

          <button
            type="button"
            className="direct-atelier-launch-btn"
            onClick={() => onNavigatePage('atelier')}
          >
            <Sparkles size={12} className="text-acid-lime" />
            <span>OPEN 3D BESPOKE ATELIER WORKSPACE</span>
          </button>
        </div>

        <div className="kids-products-grid">
          {displayedProducts.map((product) => {
            const isFavourited = childWishlist.includes(product.id);
            const isAdded = addedProductId === product.id;

            return (
              <article
                key={product.id}
                className="kids-product-card"
                onClick={() => onSelectProduct(product.id)}
              >
                {/* Media Container */}
                <div className="card-media-wrapper">
                  <img
                    src={product.featuredMedia?.thumbnail || product.featuredMedia?.heroImage}
                    alt={product.name}
                    className="card-img"
                    loading="lazy"
                  />

                  {/* Badges Overlay */}
                  <div className="card-top-badges">
                    <span className="age-tag">{product.ageGroup || '6–8Y Scale'}</span>
                    <span className="craft-hours-tag">
                      <Clock size={10} />
                      <span>{product.craftsmanshipHours}H HANDCRAFT</span>
                    </span>
                  </div>

                  {/* Heart / Wishlist Toggle */}
                  <button
                    type="button"
                    className={`wishlist-heart-btn ${isFavourited ? 'loved' : ''}`}
                    onClick={(e) => toggleWishlist(product.id, e)}
                    aria-label={`Save ${product.name} to favourites`}
                  >
                    <Heart size={14} />
                  </button>

                  {/* Hover Quick Action Buttons */}
                  <div className="card-hover-actions">
                    <button
                      type="button"
                      className="quick-inspect-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product.id);
                      }}
                    >
                      <Eye size={12} />
                      <span>INSPECT DETAILS</span>
                    </button>

                    <button
                      type="button"
                      className={`quick-add-action ${isAdded ? 'added' : ''}`}
                      onClick={(e) => handleQuickAdd(product, e)}
                    >
                      <ShoppingBag size={12} />
                      <span>{isAdded ? 'ADDED ✓' : 'QUICK ADD'}</span>
                    </button>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="card-content-body">
                  <div className="card-meta-line">
                    <span className="silk-lining-badge">100% ORGANIC SILK LINED</span>
                    <span className="growth-badge">2.5" GROWTH BUFFER</span>
                  </div>

                  <h3 className="card-product-title">{product.name}</h3>
                  <p className="card-product-subtitle">{product.subtitle}</p>

                  <div className="card-price-row">
                    <span className="card-price">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="card-lead-time">Lead time: {product.leadTimeWeeks} weeks</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          INSTITUTIONAL SERVICE GATEWAYS: ANNUAL DAY & PARENT CERTIFICATION
      ========================================================================= */}
      <section className="kids-institutional-gateways">
        <div className="gateway-card annual-day-gateway">
          <div className="gateway-icon-wrap">
            <Drama size={22} className="text-acid-lime" />
          </div>
          <span className="gateway-tax">INSTITUTIONAL ATELIER SERVICE</span>
          <h3 className="gateway-title">School Annual Day Theatrical Costumes</h3>
          <p className="gateway-desc">
            Full-scale costume production for school theatrical performances, cultural annual days, and choir groups. 
            Custom design, batch tailoring, and institutional logistics.
          </p>
          <button
            type="button"
            className="gateway-btn"
            onClick={() => onNavigatePage('annual-day')}
          >
            <span>ENQUIRE FOR YOUR SCHOOL</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="gateway-card course-gateway">
          <div className="gateway-icon-wrap">
            <BookOpen size={22} className="text-muted-lilac" />
          </div>
          <span className="gateway-tax">FASHION EDUCATION CURRICULUM</span>
          <h3 className="gateway-title">Parent Certification: Textile Science</h3>
          <p className="gateway-desc">
            8-Grade progressive curriculum for parents and students exploring natural fibers, indigenous weaving looms, 
            pattern construction, and cultural textile history.
          </p>
          <button
            type="button"
            className="gateway-btn"
            onClick={() => onNavigatePage('course')}
          >
            <span>VIEW CURRICULUM & ENROL</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* =========================================================================
          SHARE WITH PARENT MODAL (FRIENDLY HANDOFF)
      ========================================================================= */}
      {showShareModal && (
        <div className="kids-modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="kids-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <span className="dialog-eyebrow">A LITTLE IMAGINATION • SHARED</span>
              <h3 className="dialog-title">Share Your Favourite Stories with Your Parents</h3>
            </div>
            <p className="dialog-lead">
              You’ve collected {childWishlist.length} favourite garment{childWishlist.length > 1 ? 's' : ''}! 
              You can send your choices directly to your parents via WhatsApp or email to explore together.
            </p>

            <div className="modal-wishlist-preview">
              {childWishlist.map((id) => {
                const item = kidsProducts.find((p) => p.id === id);
                if (!item) return null;
                return (
                  <div key={id} className="preview-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                );
              })}
            </div>

            <div className="dialog-actions">
              <button
                type="button"
                className="dialog-share-btn"
                onClick={() => {
                  const names = childWishlist
                    .map((id) => kidsProducts.find((p) => p.id === id)?.name)
                    .filter(Boolean)
                    .join(', ');
                  const text = encodeURIComponent(
                    `Hi Mum and Dad! I explored The Threador Kids and fell in love with these pieces: ${names}. Can we look at them together?`
                  );
                  window.open(`https://wa.me/?text=${text}`, '_blank');
                  setShowShareModal(false);
                }}
              >
                <span>SHARE VIA WHATSAPP</span>
              </button>
              <button
                type="button"
                className="dialog-close-btn"
                onClick={() => setShowShareModal(false)}
              >
                <span>CLOSE</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PARENT MEASURING & SIZE GUIDE MODAL
      ========================================================================= */}
      {showSizeModal && (
        <div className="kids-modal-overlay" onClick={() => setShowSizeModal(false)}>
          <div className="kids-modal-dialog size-guide-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <span className="dialog-eyebrow">THE THREADOR ATELIER // SIZING STANDARDS</span>
              <h3 className="dialog-title">Parent Sizing & Growth Measuring Guide</h3>
            </div>

            <div className="size-table-container">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>Age Bracket</th>
                    <th>Height (cm)</th>
                    <th>Chest (in)</th>
                    <th>Waist (in)</th>
                    <th>Growth Buffer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>2–4Y</strong> (Toddler)</td>
                    <td>92–104 cm</td>
                    <td>21–22 in</td>
                    <td>20–21 in</td>
                    <td>+2.5 in internal French seam</td>
                  </tr>
                  <tr>
                    <td><strong>4–6Y</strong> (Little Child)</td>
                    <td>104–116 cm</td>
                    <td>22–24 in</td>
                    <td>21–22 in</td>
                    <td>+2.5 in internal French seam</td>
                  </tr>
                  <tr>
                    <td><strong>6–8Y</strong> (Young Child)</td>
                    <td>116–128 cm</td>
                    <td>24–26 in</td>
                    <td>22–23.5 in</td>
                    <td>+2.5 in internal French seam</td>
                  </tr>
                  <tr>
                    <td><strong>8–10Y</strong> (Pre-Teen)</td>
                    <td>128–140 cm</td>
                    <td>26–28 in</td>
                    <td>23.5–25 in</td>
                    <td>+2.5 in internal French seam</td>
                  </tr>
                  <tr>
                    <td><strong>10–14Y</strong> (Teenager)</td>
                    <td>140–158 cm</td>
                    <td>28–32 in</td>
                    <td>25–28 in</td>
                    <td>+2.5 in internal French seam</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="dialog-actions">
              <button
                type="button"
                className="dialog-share-btn"
                onClick={() => {
                  setShowSizeModal(false);
                  onNavigatePage('atelier');
                }}
              >
                <span>INPUT EXACT BESPOKE MEASUREMENTS IN 3D ATELIER</span>
              </button>
              <button
                type="button"
                className="dialog-close-btn"
                onClick={() => setShowSizeModal(false)}
              >
                <span>CLOSE</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
