import { useState, useMemo } from 'react';
import {
  Scissors,
  Sparkles,
  RotateCw,
  ShoppingBag,
  Check,
  ShieldCheck,
  Maximize2,
  Minimize2,
  Sun,
  Layers,
  Palette,
  Sliders,
  Ruler,
  Tag,
  MessageCircle,
  Cpu
} from 'lucide-react';
import { HeroCanvas } from '../scene/HeroCanvas';
import { AtelierDualScene } from '../scene/AtelierDualScene';
import { STORE_PRODUCTS } from '../data/storeProducts';
import { cartService } from '../services/cartService';
import type { AtelierGender, PageId, GarmentCameraView, ProductRecord } from '../types';

interface AtelierWorkspaceProps {
  onNavigatePage: (page: PageId) => void;
  onOpenCart: () => void;
  onOpenProductDetail: (productId: string) => void;
}

type BottomTabId = 'model' | 'colour' | 'fabric' | 'pattern' | 'fit' | 'accessories' | 'custom';
type LightingPreset = 'violet-atmosphere' | 'high-contrast' | 'museum-neutral';

interface FabricOption {
  id: string;
  name: string;
  category: 'silk' | 'velvet' | 'wool' | 'brocade';
  composition: string;
  weight: string;
  origin: string;
  pbrTexture: string;
  swatchHex: string;
  tactileFeel: string;
}

const ATELIER_FABRICS: Record<AtelierGender, FabricOption[]> = {
  kids: [
    {
      id: 'kids-organza',
      name: 'Mulberry Silk Organza (Hypoallergenic)',
      category: 'silk',
      composition: '85% French Silk, 15% Organic Habotai',
      weight: '120 g/m²',
      origin: 'Lyon & Karnataka Guilds',
      pbrTexture: 'Translucent Petal Sheen (Roughness: 0.28, Trans: 0.65)',
      swatchHex: '#EEE7DC',
      tactileFeel: 'Crisp, airy, zero friction against sensitive skin'
    },
    {
      id: 'kids-velvet',
      name: 'Pure English Cotton Velvet (Non-Rigid)',
      category: 'velvet',
      composition: '100% Breathable English Cotton',
      weight: '310 g/m²',
      origin: 'Lancashire, England',
      pbrTexture: 'Plush Natural Pile (Sheen: 0.95, Roughness: 0.85)',
      swatchHex: '#1C2630',
      tactileFeel: 'Deep plush velvet with directional light luster'
    },
    {
      id: 'kids-tulle',
      name: 'Gossamer Bamboo-Silk Tulle',
      category: 'silk',
      composition: '70% Silk Tulle, 30% Bamboo-Silk',
      weight: '95 g/m²',
      origin: 'Como, Italy',
      pbrTexture: 'Weightless Air Mesh Fluting',
      swatchHex: '#D5B8B0',
      tactileFeel: 'Featherlight float with bounce and drape'
    },
    {
      id: 'kids-banarasi',
      name: 'Varanasi Handloom Kadhwa Zari Brocade',
      category: 'brocade',
      composition: '80% Katan Silk, 20% Fine Metallic Zari',
      weight: '210 g/m²',
      origin: 'Varanasi Heritage Pit-Looms',
      pbrTexture: 'Handloom Floral Zari Couching (Metal: 0.88)',
      swatchHex: '#C59D3F',
      tactileFeel: 'Flexible heirloom weave lined in smooth silk'
    }
  ],
  women: [
    {
      id: 'mulberry-organza',
      name: '14mm Pure Mulberry Silk Organza',
      category: 'silk',
      composition: '100% Organic Farmed Mulberry Silk',
      weight: '38 g/m²',
      origin: 'Lyon & Bangalore Guilds',
      pbrTexture: 'Translucent Physical Transmission (0.68)',
      swatchHex: '#F4ECE1',
      tactileFeel: 'Crisp, transparent bias drape'
    },
    {
      id: 'silk-gazar',
      name: 'Triple-Ply High-Twist Silk Gazar',
      category: 'silk',
      composition: '100% High-Twist Bombyx Mori Silk',
      weight: '120 g/m²',
      origin: 'Bangalore Weaving Guild',
      pbrTexture: 'Structured Matte Sculptural Sheen',
      swatchHex: '#EEE7DC',
      tactileFeel: 'Architectural body with firm memory'
    },
    {
      id: 'banarasi-brocade',
      name: 'Handloom Kadwa Zari Brocade',
      category: 'brocade',
      composition: '75% Silk, 25% Silver-Gilt Wire',
      weight: '260 g/m²',
      origin: 'Varanasi Heritage Pit-Looms',
      pbrTexture: 'Relief Metallic Wire Couching',
      swatchHex: '#C59D3F',
      tactileFeel: 'Substantial, metallic reflection'
    },
    {
      id: 'silk-faille',
      name: 'Heavy Silk Faille Foundation',
      category: 'silk',
      composition: '100% Heavy Silk Foundation',
      weight: '185 g/m²',
      origin: 'Como, Italy',
      pbrTexture: 'Fine Ribbed Structural Foundation',
      swatchHex: '#201B27',
      tactileFeel: 'Rigid corset foundation backing'
    }
  ],
  men: [
    {
      id: 'merino-150',
      name: 'Super 150s Australian Merino Wool Twill',
      category: 'wool',
      composition: '90% Merino Wool, 10% Mulberry Silk',
      weight: '290 g/m²',
      origin: 'Biella, Italy',
      pbrTexture: '2/2 Cavalry Twill (Roughness: 0.72, Sheen: 0.35)',
      swatchHex: '#100C18',
      tactileFeel: 'Dry, fluid drape with deep light absorption'
    },
    {
      id: 'shetland-wool',
      name: 'Double-Face Highland Shetland Wool',
      category: 'wool',
      composition: '100% Heritage Highland Wool',
      weight: '480 g/m²',
      origin: 'Biella & Savile Row',
      pbrTexture: 'Heavyweight Broken Twill',
      swatchHex: '#21132C',
      tactileFeel: 'Warm, substantial architectural weight'
    },
    {
      id: 'matka-silk',
      name: 'Handspun Indigenous Raw Matka Silk',
      category: 'silk',
      composition: '100% Organic Indian Matka Silk',
      weight: '340 g/m²',
      origin: 'Murshidabad, West Bengal',
      pbrTexture: 'Textured Slub Imperial Weave',
      swatchHex: '#302A38',
      tactileFeel: 'Granular, organic natural raw silk'
    },
    {
      id: 'silk-velvet',
      name: 'Deep-Pile Pure Silk Velvet',
      category: 'velvet',
      composition: '82% Mulberry Silk, 18% Rayon Core',
      weight: '410 g/m²',
      origin: 'Lucknow Atelier Archives',
      pbrTexture: 'Cut-Pile Lustrous Velvet',
      swatchHex: '#17131D',
      tactileFeel: 'Supple royal velvet with dramatic luster'
    }
  ]
};

const COLORWAYS: Record<AtelierGender, { name: string; hex: string; lab: string }[]> = {
  kids: [
    { name: 'Warm Ivory', hex: '#EEE7DC', lab: 'L91 A2 B6' },
    { name: 'Powder Blue', hex: '#8EA8C3', lab: 'L68 A-4 B-18' },
    { name: 'Dusty Rose', hex: '#C49A9B', lab: 'L65 A16 B7' },
    { name: 'Soft Butter', hex: '#E8D595', lab: 'L84 A-2 B34' },
    { name: 'Gentle Lavender', hex: '#B5A0D0', lab: 'L67 A14 B-20' },
    { name: 'Obsidian Midnight', hex: '#100C18', lab: 'L5 A3 B-6' }
  ],
  women: [
    { name: 'Warm Champagne Ivory', hex: '#F4ECE1', lab: 'L93 A1 B7' },
    { name: 'Electric Violet Dust', hex: '#7042A6', lab: 'L36 A40 B-44' },
    { name: 'Deep Aubergine', hex: '#21132C', lab: 'L10 A15 B-12' },
    { name: 'Obsidian Noir', hex: '#08070C', lab: 'L3 A1 B-3' }
  ],
  men: [
    { name: 'Midnight Charcoal', hex: '#100C18', lab: 'L5 A2 B-5' },
    { name: 'Deep Navy Barathea', hex: '#131A26', lab: 'L10 A-2 B-9' },
    { name: 'Deep Aubergine Flannel', hex: '#21132C', lab: 'L10 A15 B-12' },
    { name: 'Graphite Ink', hex: '#1C1920', lab: 'L11 A1 B-3' }
  ]
};

export function AtelierWorkspace({
  onNavigatePage,
  onOpenCart,
  onOpenProductDetail
}: AtelierWorkspaceProps) {
  const [gender, setGender] = useState<AtelierGender>('kids');
  const [activeBottomTab, setActiveBottomTab] = useState<BottomTabId>('model');
  const [selectedFabricId, setSelectedFabricId] = useState<string>('kids-organza');
  const [selectedFabricCategory, setSelectedFabricCategory] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('Warm Ivory');
  const [selectedPattern, setSelectedPattern] = useState<string>('Botanical Couching');
  const [selectedLapel, setSelectedLapel] = useState<string>('Scalloped Peter Pan Collar');
  const [selectedButton, setSelectedButton] = useState<string>('Freshwater Seed Pearls');
  const [cameraView, setCameraView] = useState<GarmentCameraView>('front');
  const [lightingMode, setLightingMode] = useState<LightingPreset>('violet-atmosphere');
  const [isTurntableActive, setIsTurntableActive] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [monogram, setMonogram] = useState<string>('');
  const [isMadeToMeasure, setIsMadeToMeasure] = useState<boolean>(false);
  const [growthAllowance, setGrowthAllowance] = useState<boolean>(true);
  const [hypoallergenicLining, setHypoallergenicLining] = useState<boolean>(true);
  const [childAge, setChildAge] = useState<string>('6–7Y');
  const [measurements, setMeasurements] = useState({
    chest: '24',
    waist: '22',
    hips: '26',
    height: '122',
    shoulderToHem: '28'
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const isKids = gender === 'kids';
  const isMen = gender === 'men';
  const allFabrics = ATELIER_FABRICS[gender];
  const colors = COLORWAYS[gender];

  const filteredFabrics = useMemo(() => {
    if (selectedFabricCategory === 'all') return allFabrics;
    return allFabrics.filter((f) => f.category === selectedFabricCategory);
  }, [allFabrics, selectedFabricCategory]);

  const currentFabric = allFabrics.find((f) => f.id === selectedFabricId) || allFabrics[0];
  const currentColorObj = colors.find((c) => c.name === selectedColor) || colors[0];

  const targetProduct: ProductRecord =
    STORE_PRODUCTS.find((p) => p.gender === gender) || STORE_PRODUCTS[0];

  const handleSwitchGender = (newGender: AtelierGender) => {
    setGender(newGender);
    setSelectedFabricCategory('all');
    if (newGender === 'kids') {
      setSelectedFabricId('kids-organza');
      setSelectedColor('Warm Ivory');
      setSelectedLapel('Scalloped Peter Pan Collar');
      setSelectedButton('Freshwater Seed Pearls');
      setSelectedPattern('Botanical Couching');
    } else if (newGender === 'men') {
      setSelectedFabricId('merino-150');
      setSelectedColor('Midnight Charcoal');
      setSelectedLapel('Silk Satin Peak Lapel');
      setSelectedButton('Polished Brass Crest');
      setSelectedPattern('Twill Weave');
    } else {
      setSelectedFabricId('mulberry-organza');
      setSelectedColor('Warm Champagne Ivory');
      setSelectedLapel('Sweetheart Sculptural Flute');
      setSelectedButton('Freshwater River Pearls');
      setSelectedPattern('Botanical Couching');
    }
  };

  const calculatedPrice = useMemo(() => {
    let base = targetProduct.price;
    if (selectedFabricId === 'kids-banarasi' || selectedFabricId === 'banarasi-brocade') base += 6000;
    if (isMadeToMeasure) base += 4500;
    if (monogram.trim().length > 0) base += 1500;
    return base;
  }, [targetProduct.price, selectedFabricId, isMadeToMeasure, monogram]);

  const handleAddToBag = () => {
    const customNotes = isKids
      ? `Dark Couture Child Bespoke: ${currentFabric.name} in ${selectedColor} (${currentColorObj.hex}). Pattern: ${selectedPattern}. Silhouette: ${selectedLapel}. Accents: ${selectedButton}. ${
          monogram ? `Child Monogram: [${monogram}]. ` : ''
        }${
          isMadeToMeasure
            ? `Bespoke Child Dimensions (Age: ${childAge}, Height: ${measurements.height}cm, Chest: ${measurements.chest}", Waist: ${measurements.waist}", Hem: ${measurements.shoulderToHem}") [2.5" Growth Seam: ${growthAllowance ? 'YES' : 'NO'}, Hypoallergenic Silk: ${hypoallergenicLining ? 'YES' : 'NO'}]`
            : `Standard Age Specification (${childAge}) [2.5" Growth Seam Included]`
        }`
      : `Dark Couture Bespoke Configuration: ${currentFabric.name} in ${selectedColor} (${currentColorObj.hex}). Pattern: ${selectedPattern}. Lapel/Style: ${selectedLapel}. Buttons: ${selectedButton}. ${
          monogram ? `Monogram: [${monogram}]. ` : ''
        }${
          isMadeToMeasure
            ? `Made-to-Measure (Chest: ${measurements.chest}", Waist: ${measurements.waist}", Hips: ${measurements.hips}", Height: ${measurements.height}cm)`
            : 'Standard Size Specification'
        }`;

    const customizedProduct: ProductRecord = {
      ...targetProduct,
      price: calculatedPrice
    };

    cartService.addItem(
      customizedProduct,
      isMadeToMeasure ? 'Bespoke Made-to-Measure' : targetProduct.sizes[0] || 'Standard',
      selectedColor,
      currentFabric.name,
      customNotes,
      1
    );

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onOpenCart();
    }, 600);
  };

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `Hello The Threador Atelier, I would like to request a bespoke quotation for:\n\n• Collection: ${gender.toUpperCase()}\n• Garment: ${targetProduct.name}\n• Fabric: ${currentFabric.name} (${currentFabric.origin})\n• Colorway: ${selectedColor} (${currentColorObj.hex})\n• Pattern: ${selectedPattern}\n• Lapel/Collar: ${selectedLapel}\n• Embellishment: ${selectedButton}\n• Fit: ${isMadeToMeasure ? `Made-to-Measure (Age ${childAge})` : 'Standard'}\n• Estimated Cost: ₹${calculatedPrice.toLocaleString('en-IN')}\n\nPlease advise on production schedule and private consultation.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div
      className={`atelier-laboratory-root ${
        isFullscreen ? 'laboratory-fullscreen' : ''
      } ${isKids ? 'lab-kids' : isMen ? 'lab-men' : 'lab-women'}`}
    >
      {/* 1. TOP TECHNICAL STATUS & TELEMETRY BAR */}
      <header className="lab-status-bar">
        <div className="lab-brand-cluster">
          <span className="lab-terminal-tag">ATELIER // LAB_V2.4</span>
          <span className="lab-brand-title">THE THREADOR DIGITAL COUTURE ATELIER</span>
        </div>

        {/* Universe Selector */}
        <div className="lab-universe-switch" role="tablist" aria-label="Fashion Collection Universe">
          <button
            type="button"
            className={`universe-tab ${isKids ? 'active' : ''}`}
            onClick={() => handleSwitchGender('kids')}
          >
            <Sparkles size={11} className="tab-icon" />
            <span>01 / KIDS: HEIRLOOM (PRINCIPAL)</span>
          </button>
          <button
            type="button"
            className={`universe-tab ${isMen ? 'active' : ''}`}
            onClick={() => handleSwitchGender('men')}
          >
            <Scissors size={11} className="tab-icon" />
            <span>02 / MEN: TAILORING</span>
          </button>
          <button
            type="button"
            className={`universe-tab ${!isKids && !isMen ? 'active' : ''}`}
            onClick={() => handleSwitchGender('women')}
          >
            <Sparkles size={11} className="tab-icon" />
            <span>03 / WOMEN: COUTURE</span>
          </button>
        </div>

        {/* Right Utility Actions */}
        <div className="lab-telemetry-cluster">
          <span className="telemetry-pill">
            <Cpu size={11} className="text-acid-lime" />
            <span>PBR WEBGL 2.0 // HIGH-CRI</span>
          </span>

          <button
            type="button"
            className="lab-icon-btn"
            onClick={() => setIsFullscreen((prev) => !prev)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Laboratory'}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>

          <button
            type="button"
            className="lab-archive-btn"
            onClick={() => onNavigatePage(isKids ? 'kids' : isMen ? 'men' : 'women')}
          >
            <span>STORE ARCHIVE</span>
          </button>
        </div>
      </header>

      {/* 2. THREE-PANEL ARCHITECTURE: LEFT TECHNICAL SPECS + CENTER 3D VIEWPORT + RIGHT CONFIG DOSSIER */}
      <div className="lab-main-workbench">
        {/* =========================================================================
            LEFT PANEL: GARMENT PREVIEW & MATERIAL GALLERY
        ========================================================================= */}
        <aside className="lab-left-panel" aria-label="Fabric & Technical Material Library">
          <div className="panel-header">
            <span className="panel-taxonomy">01 / TECHNICAL SPECIFICATION</span>
            <h3 className="panel-title">{targetProduct.name}</h3>
            <p className="panel-desc">{targetProduct.subtitle}</p>
          </div>

          {/* Technical Blueprint Wireframe Preview Card */}
          <div className="lab-blueprint-card">
            <div className="blueprint-grid-header">
              <span className="bp-coord">CAD_REF: #THR-{targetProduct.id}</span>
              <span className="bp-scale">SCALE 1:5.2</span>
            </div>
            <div className="blueprint-visual">
              <div className="bp-mannequin-wireframe">
                <div className="bp-neck-notch" />
                <div className="bp-shoulder-line" />
                <div className="bp-waist-axis" />
                <div className="bp-hem-sweep" />
              </div>
              <div className="bp-annotation top-right">
                <span>COLLAR: {selectedLapel.slice(0, 16)}</span>
              </div>
              <div className="bp-annotation mid-left">
                <span>FABRIC: {currentFabric.category.toUpperCase()}</span>
              </div>
              <div className="bp-annotation bottom-right">
                <span>ALLOWANCE: 2.5" FRENCH</span>
              </div>
            </div>
            <div className="blueprint-footer">
              <span>PATTERN PIECES: {targetProduct.materials?.weight ? '28' : '38'}</span>
              <span className="text-acid-lime">CRAFT: {targetProduct.craftsmanshipHours}H</span>
            </div>
          </div>

          {/* Material Category Filter Tabs */}
          <div className="material-category-dock">
            <span className="material-dock-label">FABRIC CATEGORY:</span>
            <div className="category-chips">
              {(['all', 'silk', 'velvet', 'wool', 'brocade'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-chip ${selectedFabricCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedFabricCategory(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Material List Cards */}
          <div className="lab-material-gallery">
            {filteredFabrics.map((fabric) => (
              <button
                key={fabric.id}
                type="button"
                className={`material-item-card ${selectedFabricId === fabric.id ? 'active' : ''}`}
                onClick={() => setSelectedFabricId(fabric.id)}
              >
                <div className="material-chip-swatch" style={{ backgroundColor: fabric.swatchHex }}>
                  {selectedFabricId === fabric.id && <Check size={11} className="swatch-check" />}
                </div>

                <div className="material-meta-col">
                  <div className="material-name-row">
                    <span className="material-title">{fabric.name}</span>
                    <span className="material-weight-badge">{fabric.weight}</span>
                  </div>
                  <span className="material-composition">{fabric.composition}</span>
                  <span className="material-provenance">{fabric.origin}</span>
                  <span className="material-tactile">{fabric.tactileFeel}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* =========================================================================
            CENTRE VIEWPORT: INTERACTIVE 3D GARMENT + DARK GRID ENVIRONMENT
        ========================================================================= */}
        <main className="lab-center-viewport" role="main" aria-label="Interactive 3D Garment Viewport">
          {/* Subtle Technical Coordinates HUD */}
          <div className="lab-viewport-hud">
            <div className="hud-metric-pill">
              <span className="dot-live" />
              <span>LIVE_PBR_CANVAS // {currentFabric.pbrTexture.slice(0, 24)}</span>
            </div>
            <div className="hud-metric-pill">
              <span>LIGHTING: {lightingMode.toUpperCase().replace('-', ' ')}</span>
            </div>
            <div className="hud-metric-pill">
              <span>VIEW: {cameraView.toUpperCase()}</span>
            </div>
          </div>

          {/* Real-time 3D Canvas */}
          <div className="lab-canvas-container">
            {isKids ? (
              <HeroCanvas
                gender="kids"
                scrollProgress={0.45}
                xrayMode="finished"
                forcedView={cameraView}
                isTurntableActive={isTurntableActive}
              />
            ) : isMen ? (
              <AtelierDualScene
                gender="men"
                isHovered={isTurntableActive}
                onExplore={() => onOpenProductDetail(targetProduct.id)}
              />
            ) : (
              <HeroCanvas
                gender="women"
                scrollProgress={0.45}
                xrayMode="finished"
                forcedView={cameraView}
                isTurntableActive={isTurntableActive}
              />
            )}

            {/* Overlaid Camera Angle Controls */}
            <div className="lab-camera-dock" aria-label="Camera Presets">
              {(
                [
                  { id: 'front', label: 'FRONT' },
                  { id: 'threeQuarter', label: '3/4 PROFILE' },
                  { id: 'side', label: 'PROFILE' },
                  { id: 'back', label: 'REAR SPINE' },
                  { id: 'macro', label: 'MACRO WEAVE' },
                  { id: 'stitching', label: 'SEAMS' }
                ] as const
              ).map((angle) => (
                <button
                  key={angle.id}
                  type="button"
                  className={`camera-angle-pill ${cameraView === angle.id ? 'active' : ''}`}
                  onClick={() => setCameraView(angle.id)}
                >
                  {angle.label}
                </button>
              ))}
            </div>

            {/* Top-Right Viewport Tools: Lighting & Turntable Toggle */}
            <div className="lab-viewport-tools">
              <button
                type="button"
                className={`tool-pill ${isTurntableActive ? 'active' : ''}`}
                onClick={() => setIsTurntableActive((prev) => !prev)}
                title="Toggle 360° Turntable Rotation"
              >
                <RotateCw size={12} className={isTurntableActive ? 'spin-slow' : ''} />
                <span>TURNTABLE {isTurntableActive ? 'ON' : 'PAUSED'}</span>
              </button>

              <div className="lighting-preset-group">
                <Sun size={12} className="tool-icon" />
                <button
                  type="button"
                  className={`light-btn ${lightingMode === 'violet-atmosphere' ? 'active' : ''}`}
                  onClick={() => setLightingMode('violet-atmosphere')}
                  title="Dark Aubergine / Electric Violet Atmospheric Studio"
                >
                  VIOLET
                </button>
                <button
                  type="button"
                  className={`light-btn ${lightingMode === 'high-contrast' ? 'active' : ''}`}
                  onClick={() => setLightingMode('high-contrast')}
                  title="Sculptural High-Contrast Rim Light"
                >
                  HIGH-CONTRAST
                </button>
                <button
                  type="button"
                  className={`light-btn ${lightingMode === 'museum-neutral' ? 'active' : ''}`}
                  onClick={() => setLightingMode('museum-neutral')}
                  title="Crisp Gallery Neutral Illumination"
                >
                  NEUTRAL
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================================
              BOTTOM TECHNICAL TOOLBAR & CONTEXTUAL CONFIGURATION TRAY
          ========================================================================= */}
          <nav className="lab-bottom-toolbar-container" aria-label="Garment Configuration Parameters">
            {/* Active Parameter Interactive Tray (Expands when tab is clicked) */}
            <div className="lab-contextual-tray">
              {activeBottomTab === 'model' && (
                <div className="tray-content-row">
                  <span className="tray-eyebrow">MODEL SILHOUETTE:</span>
                  <div className="tray-buttons-group">
                    <button
                      type="button"
                      className={`tray-select-btn ${gender === 'kids' ? 'active' : ''}`}
                      onClick={() => handleSwitchGender('kids')}
                    >
                      <Sparkles size={11} />
                      <span>HEIRLOOM CHILD OCCASION DRESS (~6–8Y)</span>
                    </button>
                    <button
                      type="button"
                      className={`tray-select-btn ${gender === 'men' ? 'active' : ''}`}
                      onClick={() => handleSwitchGender('men')}
                    >
                      <Scissors size={11} />
                      <span>ARCHITECTURAL DOUBLE-BREASTED BLAZER</span>
                    </button>
                    <button
                      type="button"
                      className={`tray-select-btn ${gender === 'women' ? 'active' : ''}`}
                      onClick={() => handleSwitchGender('women')}
                    >
                      <Sparkles size={11} />
                      <span>BIAS-CUT SILK ORGANZA COUTURE GOWN</span>
                    </button>
                  </div>
                </div>
              )}

              {activeBottomTab === 'colour' && (
                <div className="tray-content-row">
                  <span className="tray-eyebrow">TECHNICAL COLORWAY PALETTE:</span>
                  <div className="tray-swatches-group">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        className={`tray-color-pill ${selectedColor === c.name ? 'active' : ''}`}
                        onClick={() => setSelectedColor(c.name)}
                      >
                        <span className="pill-dot" style={{ backgroundColor: c.hex }} />
                        <span className="pill-label">{c.name}</span>
                        <span className="pill-hex">{c.hex}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeBottomTab === 'fabric' && (
                <div className="tray-content-row">
                  <span className="tray-eyebrow">ACTIVE PBR TEXTILE:</span>
                  <div className="tray-buttons-group">
                    {allFabrics.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        className={`tray-select-btn ${selectedFabricId === f.id ? 'active' : ''}`}
                        onClick={() => setSelectedFabricId(f.id)}
                      >
                        <span className="pill-dot" style={{ backgroundColor: f.swatchHex }} />
                        <span>{f.name}</span>
                        <span className="text-acid-lime">[{f.weight}]</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeBottomTab === 'pattern' && (
                <div className="tray-content-row">
                  <span className="tray-eyebrow">WEAVE & EMBROIDERY PATTERN:</span>
                  <div className="tray-buttons-group">
                    {[
                      'Botanical Couching',
                      'Varanasi Floral Zardozi',
                      'Solid Natural Organza',
                      'Twill Micro-Weave'
                    ].map((pat) => (
                      <button
                        key={pat}
                        type="button"
                        className={`tray-select-btn ${selectedPattern === pat ? 'active' : ''}`}
                        onClick={() => setSelectedPattern(pat)}
                      >
                        <span>{pat}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeBottomTab === 'fit' && (
                <div className="tray-content-row fit-row">
                  <div className="fit-toggle-cluster">
                    <button
                      type="button"
                      className={`tray-select-btn ${!isMadeToMeasure ? 'active' : ''}`}
                      onClick={() => setIsMadeToMeasure(false)}
                    >
                      <span>STANDARD AGE FIT ({childAge})</span>
                    </button>
                    <button
                      type="button"
                      className={`tray-select-btn ${isMadeToMeasure ? 'active' : ''}`}
                      onClick={() => setIsMadeToMeasure(true)}
                    >
                      <Ruler size={11} />
                      <span>BESPOKE MEASUREMENTS</span>
                    </button>
                  </div>

                  {isKids && !isMadeToMeasure && (
                    <div className="tray-age-pills" style={{ display: 'flex', gap: '6px' }}>
                      {['2–4Y', '4–6Y', '6–8Y', '8–10Y', '10–14Y'].map((age) => (
                        <button
                          key={age}
                          type="button"
                          className={`tray-select-btn ${childAge === age ? 'active' : ''}`}
                          onClick={() => setChildAge(age)}
                        >
                          <span>{age}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {isKids && (
                    <div className="growth-toggle-box">
                      <label className="growth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={growthAllowance}
                          onChange={(e) => setGrowthAllowance(e.target.checked)}
                        />
                        <span>INCORPORATE 2.5" HIDDEN FRENCH SEAM GROWTH ALLOWANCE</span>
                      </label>
                    </div>
                  )}

                  {isMadeToMeasure && (
                    <div className="tray-measurements-inline">
                      <div className="m-input-group">
                        <label>CHEST (IN)</label>
                        <input
                          type="number"
                          value={measurements.chest}
                          onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                        />
                      </div>
                      <div className="m-input-group">
                        <label>WAIST (IN)</label>
                        <input
                          type="number"
                          value={measurements.waist}
                          onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                        />
                      </div>
                      <div className="m-input-group">
                        <label>HEIGHT (CM)</label>
                        <input
                          type="number"
                          value={measurements.height}
                          onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                        />
                      </div>
                      <div className="m-input-group">
                        <label>HEM LENGTH (IN)</label>
                        <input
                          type="number"
                          value={measurements.shoulderToHem}
                          onChange={(e) => setMeasurements({ ...measurements, shoulderToHem: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeBottomTab === 'accessories' && (
                <div className="tray-content-row">
                  <span className="tray-eyebrow">EMBELLISHMENTS & ACCENTS:</span>
                  <div className="tray-buttons-group">
                    {(isKids
                      ? [
                          'Freshwater Seed Pearls',
                          'Carved Mother-of-Pearl',
                          'Fine Zari Placket Piping',
                          'Silk Organza Waist Sash'
                        ]
                      : isMen
                      ? [
                          'Polished Brass Crest',
                          'Kissing Horn Buttons',
                          'Silk Satin Lapel Facing',
                          'Hand-Rolled Pocket Square'
                        ]
                      : [
                          'Freshwater River Pearls',
                          'Aari Gold Couching',
                          'Silk Faille Core Boning',
                          'Covered Loop Closure'
                        ]
                    ).map((acc) => (
                      <button
                        key={acc}
                        type="button"
                        className={`tray-select-btn ${selectedButton === acc ? 'active' : ''}`}
                        onClick={() => setSelectedButton(acc)}
                      >
                        <span>{acc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeBottomTab === 'custom' && (
                <div className="tray-content-row custom-details-row">
                  <div className="monogram-box">
                    <span className="tray-eyebrow">BESPOKE EMBROIDERED INITIALS / MONOGRAM:</span>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="e.g. A.P."
                      value={monogram}
                      onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                      className="tray-monogram-input"
                    />
                    <span className="monogram-caption">Embroidered onto internal silk sash in champagne cord</span>
                  </div>

                  {isKids && (
                    <label className="growth-checkbox-label">
                      <input
                        type="checkbox"
                        checked={hypoallergenicLining}
                        onChange={(e) => setHypoallergenicLining(e.target.checked)}
                      />
                      <span>100% ORGANIC MULBERRY SILK HYPOALLERGENIC LINING</span>
                    </label>
                  )}
                </div>
              )}
            </div>

            {/* The 7 Primary Technical Tabs */}
            <div className="lab-bottom-toolbar">
              {[
                { id: 'model', label: '01 / MODEL', icon: Layers },
                { id: 'colour', label: '02 / COLOUR', icon: Palette },
                { id: 'fabric', label: '03 / FABRIC', icon: Sliders },
                { id: 'pattern', label: '04 / PATTERN', icon: Sparkles },
                { id: 'fit', label: '05 / FIT', icon: Ruler },
                { id: 'accessories', label: '06 / ACCENTS', icon: Tag },
                { id: 'custom', label: '07 / CUSTOM', icon: Scissors }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`lab-toolbar-tab ${activeBottomTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveBottomTab(tab.id as BottomTabId)}
                  >
                    <IconComponent size={12} className="tab-icon" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </main>

        {/* =========================================================================
            RIGHT PANEL: CONFIGURATION SUMMARY, ARTISAN METRICS & COMMERCE
        ========================================================================= */}
        <aside className="lab-right-panel" aria-label="Configuration Summary & Quotation">
          <div className="panel-header">
            <span className="panel-taxonomy">02 / LIVE CONFIGURATION DOSSIER</span>
            <div className="dossier-status-row">
              <span className="dossier-status-pill">STATUS: VERIFIED CAD READY</span>
              <span className="text-acid-lime font-mono">₹{calculatedPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Configuration Summary Table */}
          <div className="dossier-spec-table">
            <div className="spec-row">
              <span className="spec-label">GARMENT:</span>
              <span className="spec-value">{targetProduct.name}</span>
            </div>

            <div className="spec-row">
              <span className="spec-label">COLLECTION:</span>
              <span className="spec-value text-acid-lime">{gender.toUpperCase()}</span>
            </div>

            <div className="spec-row">
              <span className="spec-label">CORE TEXTILE:</span>
              <span className="spec-value">{currentFabric.name}</span>
            </div>

            <div className="spec-row">
              <span className="spec-label">WEAVE PROVENANCE:</span>
              <span className="spec-value">{currentFabric.origin}</span>
            </div>

            <div className="spec-row">
              <span className="spec-label">COLORWAY:</span>
              <span className="spec-value color-badge-value">
                <span className="swatch-tiny" style={{ backgroundColor: currentColorObj.hex }} />
                <span>{selectedColor} ({currentColorObj.hex})</span>
              </span>
            </div>

            <div className="spec-row">
              <span className="spec-label">PATTERN WEAVE:</span>
              <span className="spec-value">{selectedPattern}</span>
            </div>

            <div className="spec-row">
              <span className="spec-label">COLLAR / LAPEL:</span>
              <span className="spec-value">{selectedLapel}</span>
            </div>

            <div className="spec-row">
              <span className="spec-label">EMBELLISHMENT:</span>
              <span className="spec-value">{selectedButton}</span>
            </div>

            <div className="spec-row">
              <span className="spec-label">SPECIFICATION FIT:</span>
              <span className="spec-value">
                {isMadeToMeasure ? `Bespoke Dimensions (${childAge})` : `Standard ${childAge}`}
              </span>
            </div>

            {isKids && (
              <>
                <div className="spec-row">
                  <span className="spec-label">GROWTH ALLOWANCE:</span>
                  <span className="spec-value text-acid-lime">
                    {growthAllowance ? '2.5" HIDDEN FRENCH SEAMS' : 'STANDARD'}
                  </span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">INNER LINING:</span>
                  <span className="spec-value">
                    {hypoallergenicLining ? '100% ORGANIC MULBERRY SILK' : 'SILK HABOTAI'}
                  </span>
                </div>
              </>
            )}

            {monogram.trim().length > 0 && (
              <div className="spec-row">
                <span className="spec-label">CUSTOM MONOGRAM:</span>
                <span className="spec-value font-mono text-acid-lime">{monogram}</span>
              </div>
            )}
          </div>

          {/* Certified Handcraft Transparency Card */}
          <div className="lab-craft-metrics-box">
            <div className="craft-box-header">
              <ShieldCheck size={13} className="text-acid-lime" />
              <span>CERTIFIED ARTISAN CRAFTSMANSHIP</span>
            </div>
            <div className="craft-metrics-dual">
              <div className="c-metric">
                <span className="c-num">{targetProduct.craftsmanshipHours}H</span>
                <span className="c-label">WORKSHOP HANDCRAFT</span>
              </div>
              <div className="c-metric">
                <span className="c-num">{targetProduct.stitchCount || '22,000'}</span>
                <span className="c-label">MICRO STITCHES</span>
              </div>
            </div>
          </div>

          {/* Actions Column */}
          <div className="dossier-actions-column">
            <button
              type="button"
              className={`lab-primary-action-btn ${isSuccess ? 'success' : ''}`}
              onClick={handleAddToBag}
            >
              <ShoppingBag size={14} />
              <span>{isSuccess ? 'ADDED TO BAG ✓' : `ADD BESPOKE TO BAG • ₹${calculatedPrice.toLocaleString('en-IN')}`}</span>
            </button>

            <button
              type="button"
              className="lab-whatsapp-quote-btn"
              onClick={handleWhatsAppQuote}
            >
              <MessageCircle size={14} />
              <span>REQUEST PRIVATE ATELIER QUOTATION</span>
            </button>

            <p className="lab-guarantee-note">
              Every garment is individually cut and hand-tailored in single-origin ateliers. Lead time: {targetProduct.leadTimeWeeks} weeks.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
