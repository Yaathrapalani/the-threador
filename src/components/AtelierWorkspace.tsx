import { useState } from 'react';
import {
  Scissors,
  Sparkles,
  RotateCw,
  ShoppingBag,
  Eye,
  Check,
  ShieldCheck
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

interface FabricOption {
  id: string;
  name: string;
  composition: string;
  weight: string;
  origin: string;
  pbrTexture: string;
}

const ATELIER_FABRICS: Record<AtelierGender, FabricOption[]> = {
  women: [
    {
      id: 'mulberry-organza',
      name: '14mm Pure Mulberry Silk Organza',
      composition: '100% Organic Farmed Mulberry Silk',
      weight: '38 g/m²',
      origin: 'Woven in Lyon & Karnataka',
      pbrTexture: 'Translucent Physical Transmission (0.68)'
    },
    {
      id: 'silk-gazar',
      name: 'Triple-Ply High-Twist Silk Gazar',
      composition: '100% High-Twist Bombyx Mori Silk',
      weight: '120 g/m²',
      origin: 'Bangalore Weaving Guild',
      pbrTexture: 'Structured Matte Sculptural Sheen'
    },
    {
      id: 'banarasi-brocade',
      name: 'Handloom Kadwa Zari Brocade',
      composition: '75% Silk, 25% Silver-Gilt Wire',
      weight: '260 g/m²',
      origin: 'Varanasi Heritage Pit-Looms',
      pbrTexture: 'Relief Metallic Wire Couching'
    },
    {
      id: 'silk-faille',
      name: 'Heavy Silk Faille Core',
      composition: '100% Heavy Silk Foundation',
      weight: '185 g/m²',
      origin: 'Como, Italy',
      pbrTexture: 'Fine Ribbed Structural Foundation'
    }
  ],
  men: [
    {
      id: 'merino-150',
      name: 'Super 150s Australian Merino Wool Twill',
      composition: '90% Merino Wool, 10% Mulberry Silk',
      weight: '290 g/m²',
      origin: 'Woven in Biella, Italy',
      pbrTexture: '2/2 Cavalry Twill with Satin Sheen'
    },
    {
      id: 'shetland-wool',
      name: 'Double-Face Highland Shetland Wool',
      composition: '100% Heritage Highland Wool',
      weight: '480 g/m²',
      origin: 'Biella & Savile Row',
      pbrTexture: 'Heavyweight Broken Twill'
    },
    {
      id: 'matka-silk',
      name: 'Handspun Indigenous Raw Matka Silk',
      composition: '100% Organic Indian Matka Silk',
      weight: '340 g/m²',
      origin: 'Murshidabad, West Bengal',
      pbrTexture: 'Textured Slub Imperial Weave'
    },
    {
      id: 'silk-velvet',
      name: 'Deep-Pile Pure Silk Velvet',
      composition: '82% Mulberry Silk, 18% Rayon Core',
      weight: '410 g/m²',
      origin: 'Lucknow Atelier Archives',
      pbrTexture: 'Cut-Pile Lustrous Velvet'
    }
  ]
};

const COLORWAYS: Record<AtelierGender, { name: string; hex: string }[]> = {
  women: [
    { name: 'Warm Champagne Ivory', hex: '#fbf6ea' },
    { name: 'Oyster Nacre', hex: '#ede6d8' },
    { name: 'Imperial Mustard Gold', hex: '#c59d3f' },
    { name: 'Obsidian Noir', hex: '#121419' }
  ],
  men: [
    { name: 'Midnight Navy', hex: '#202f47' },
    { name: 'Obsidian Noir', hex: '#111317' },
    { name: 'Graphite Charcoal', hex: '#2c2e33' },
    { name: 'Royal Ink Blue', hex: '#16233b' }
  ]
};

export function AtelierWorkspace({
  onNavigatePage,
  onOpenCart,
  onOpenProductDetail
}: AtelierWorkspaceProps) {
  const [gender, setGender] = useState<AtelierGender>('women');
  const [selectedFabricId, setSelectedFabricId] = useState<string>('mulberry-organza');
  const [selectedColor, setSelectedColor] = useState<string>('Warm Champagne Ivory');
  const [selectedLapel, setSelectedLapel] = useState<string>('Sweetheart Sculptural Flute');
  const [selectedButton, setSelectedButton] = useState<string>('Freshwater River Pearls');
  const [activeCameraView, setActiveCameraView] = useState<GarmentCameraView>('front');
  const [monogram, setMonogram] = useState<string>('');
  const [isMadeToMeasure, setIsMadeToMeasure] = useState<boolean>(false);
  const [measurements, setMeasurements] = useState({
    chest: '38',
    waist: '30',
    hips: '40',
    height: '175'
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const isMen = gender === 'men';
  const fabrics = ATELIER_FABRICS[gender];
  const colors = COLORWAYS[gender];
  const currentFabric = fabrics.find((f) => f.id === selectedFabricId) || fabrics[0];

  const targetProduct: ProductRecord =
    STORE_PRODUCTS.find((p) => p.gender === gender) || STORE_PRODUCTS[0];

  const handleSwitchGender = (newGender: AtelierGender) => {
    setGender(newGender);
    if (newGender === 'men') {
      setSelectedFabricId('merino-150');
      setSelectedColor('Midnight Navy');
      setSelectedLapel('Silk Satin Peak Lapel');
      setSelectedButton('Polished Brass Crest');
    } else {
      setSelectedFabricId('mulberry-organza');
      setSelectedColor('Warm Champagne Ivory');
      setSelectedLapel('Sweetheart Sculptural Flute');
      setSelectedButton('Freshwater River Pearls');
    }
  };

  const handleAddToBag = () => {
    const customNotes = `Bespoke Configuration: ${currentFabric.name} in ${selectedColor}. Lapel/Style: ${selectedLapel}. Buttons: ${selectedButton}. ${
      monogram ? `Monogram: ${monogram}. ` : ''
    }${
      isMadeToMeasure
        ? `Made-to-Measure (Chest: ${measurements.chest}", Waist: ${measurements.waist}", Hips: ${measurements.hips}", Height: ${measurements.height}cm)`
        : 'Standard Size'
    }`;

    cartService.addItem(
      targetProduct,
      isMadeToMeasure ? 'Made-to-Measure' : targetProduct.sizes[0] || 'Standard',
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

  return (
    <div className={`atelier-workspace-root ${isMen ? 'men-workspace' : 'women-workspace'}`}>
      {/* 1. TOP ATELIER WORKSPACE STATUS BAR */}
      <header className="atelier-status-bar">
        <div className="status-brand-group">
          <span className="brand-wordmark">THE THREADOR ATELIER</span>
          <span className="brand-pipe">/</span>
          <span className="brand-suite-name">3D BESPOKE DESIGN SUITE</span>
        </div>

        <div className="status-gender-switch">
          <button
            type="button"
            className={`gender-tab ${!isMen ? 'active' : ''}`}
            onClick={() => handleSwitchGender('women')}
          >
            <Sparkles size={11} />
            <span>WOMEN’S COUTURE</span>
          </button>
          <button
            type="button"
            className={`gender-tab ${isMen ? 'active' : ''}`}
            onClick={() => handleSwitchGender('men')}
          >
            <Scissors size={11} />
            <span>MEN’S TAILORING</span>
          </button>
        </div>

        <div className="status-actions">
          <button
            type="button"
            className="status-collection-btn"
            onClick={() => onNavigatePage(isMen ? 'men' : 'women')}
          >
            <span>STORE ARCHIVE</span>
          </button>
        </div>
      </header>

      {/* 2. DUAL-PANE WORKSPACE: LEFT 3D VIEWPORT + RIGHT BESPOKE CONTROL SUITE */}
      <div className="atelier-main-workbench">
        {/* LEFT PANE: 3D INTERACTIVE VIEWPORT */}
        <div className="workbench-viewport-pane">
          <div className="viewport-canvas-container">
            {isMen ? (
              <AtelierDualScene
                gender="men"
                isHovered={true}
                onExplore={() => onOpenProductDetail(targetProduct.id)}
              />
            ) : (
              <HeroCanvas
                scrollProgress={0.45}
                xrayMode="finished"
                forcedView={activeCameraView}
                isTurntableActive={true}
              />
            )}

            {/* Camera Angle Presets Floating Dock */}
            <div className="camera-angle-presets-dock">
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
                  className={`angle-preset-btn ${activeCameraView === angle.id ? 'active' : ''}`}
                  onClick={() => setActiveCameraView(angle.id)}
                >
                  {angle.label}
                </button>
              ))}
            </div>

            {/* Interactive Viewport Hint */}
            <div className="viewport-interaction-badge">
              <RotateCw size={12} className="spin-slow" />
              <span>PBR REAL-TIME CANVASSING • 360° TURNTABLE ACTIVE</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: BESPOKE ATELIER DESIGN CONTROLS */}
        <div className="workbench-controls-pane">
          <div className="controls-header">
            <span className="controls-taxonomy">
              {isMen ? '01 / BESPOKE BESPOKE ARCHITECTURE' : '02 / HAUTE COUTURE SPECIFICATION'}
            </span>
            <h2 className="controls-title">{targetProduct.name}</h2>
            <p className="controls-desc">{targetProduct.description}</p>
          </div>

          <hr className="controls-divider" />

          {/* CONTROL SECTION 1: FABRIC SELECTION */}
          <div className="control-section">
            <span className="section-label">1. SELECT LUXURY FABRIC CORE:</span>
            <div className="fabric-cards-grid">
              {fabrics.map((fabric) => (
                <button
                  key={fabric.id}
                  type="button"
                  className={`fabric-select-card ${selectedFabricId === fabric.id ? 'active' : ''}`}
                  onClick={() => setSelectedFabricId(fabric.id)}
                >
                  <div className="fabric-card-header">
                    <span className="fabric-name">{fabric.name}</span>
                    {selectedFabricId === fabric.id && <Check size={12} className="check-icon" />}
                  </div>
                  <span className="fabric-provenance">{fabric.origin}</span>
                  <span className="fabric-weight">{fabric.weight} • {fabric.pbrTexture}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CONTROL SECTION 2: COLORWAY PALETTE */}
          <div className="control-section">
            <div className="section-label-row">
              <span className="section-label">2. ATELIER COLORWAY:</span>
              <span className="selected-color-name">{selectedColor}</span>
            </div>
            <div className="color-swatches-grid">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className={`color-pill-btn ${selectedColor === c.name ? 'active' : ''}`}
                  onClick={() => setSelectedColor(c.name)}
                >
                  <span className="color-dot" style={{ backgroundColor: c.hex }} />
                  <span className="color-text">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CONTROL SECTION 3: LAPEL / SILHOUETTE VARIANT */}
          <div className="control-section">
            <span className="section-label">
              3. {isMen ? 'LAPEL ARCHITECTURE:' : 'SILHOUETTE / BODICE FORM:'}
            </span>
            <div className="variant-options-row">
              {(isMen
                ? ['Silk Satin Peak Lapel', 'Notch Wool Lapel', 'Shawl Ceremonial Collar']
                : ['Sweetheart Sculptural Flute', 'Architectural Column', 'Plunging V-Neckline']
              ).map((style) => (
                <button
                  key={style}
                  type="button"
                  className={`variant-option-btn ${selectedLapel === style ? 'active' : ''}`}
                  onClick={() => setSelectedLapel(style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* CONTROL SECTION 4: BUTTONS & ACCENTS */}
          <div className="control-section">
            <span className="section-label">4. BUTTONS & EMBELLISHMENTS:</span>
            <div className="variant-options-row">
              {(isMen
                ? ['Polished Brass Crest', 'Carved Natural Horn', 'Concealed Silk Placket']
                : ['Freshwater River Pearls', 'Micro-Wire Gold Zardozi', 'Concealed Silk Loop']
              ).map((btn) => (
                <button
                  key={btn}
                  type="button"
                  className={`variant-option-btn ${selectedButton === btn ? 'active' : ''}`}
                  onClick={() => setSelectedButton(btn)}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* CONTROL SECTION 5: MADE-TO-MEASURE SPECIFICATION */}
          <div className="control-section">
            <div className="made-to-measure-toggle-row">
              <span className="section-label">5. SIZING SPECIFICATION:</span>
              <button
                type="button"
                className={`measure-toggle-pill ${isMadeToMeasure ? 'active' : ''}`}
                onClick={() => setIsMadeToMeasure((prev) => !prev)}
              >
                {isMadeToMeasure ? 'MADE-TO-MEASURE (ACTIVE)' : 'SWITCH TO MADE-TO-MEASURE'}
              </button>
            </div>

            {isMadeToMeasure && (
              <div className="measurements-input-grid">
                <div className="measure-field">
                  <label>Chest / Bust (Inches)</label>
                  <input
                    type="text"
                    value={measurements.chest}
                    onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                  />
                </div>
                <div className="measure-field">
                  <label>Natural Waist (Inches)</label>
                  <input
                    type="text"
                    value={measurements.waist}
                    onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                  />
                </div>
                <div className="measure-field">
                  <label>Hips (Inches)</label>
                  <input
                    type="text"
                    value={measurements.hips}
                    onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
                  />
                </div>
                <div className="measure-field">
                  <label>Total Height (cm)</label>
                  <input
                    type="text"
                    value={measurements.height}
                    onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>

          {/* CONTROL SECTION 6: CUSTOM MONOGRAMMING */}
          <div className="control-section">
            <span className="section-label">6. INTERNAL SILK MONOGRAM (OPTIONAL):</span>
            <input
              type="text"
              placeholder="e.g. A.S. • 2026"
              maxLength={16}
              value={monogram}
              onChange={(e) => setMonogram(e.target.value)}
              className="monogram-input"
            />
          </div>

          {/* 3. ATELIER SPECIFICATION SUMMARY CARD */}
          <div className="atelier-summary-card">
            <div className="summary-header">
              <ShieldCheck size={14} className="summary-icon" />
              <span>BESPOKE ATELIER SPECIFICATION SHEET</span>
            </div>
            <div className="summary-specs-list">
              <div className="spec-line">
                <span>Selected Fabric:</span>
                <strong>{currentFabric.name}</strong>
              </div>
              <div className="spec-line">
                <span>Colorway:</span>
                <strong>{selectedColor}</strong>
              </div>
              <div className="spec-line">
                <span>Handcraft Time:</span>
                <strong>{targetProduct.craftsmanshipHours} Atelier Hours</strong>
              </div>
              <div className="spec-line">
                <span>Total Investment:</span>
                <strong className="spec-price">₹{targetProduct.price.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="summary-actions-grid">
              <button
                type="button"
                className={`atelier-primary-action ${isSuccess ? 'success' : ''}`}
                onClick={handleAddToBag}
              >
                <ShoppingBag size={14} />
                <span>{isSuccess ? 'ADDED TO ATELIER BAG' : 'ADD BESPOKE ORDER TO BAG'}</span>
              </button>

              <button
                type="button"
                className="atelier-secondary-action"
                onClick={() => onOpenProductDetail(targetProduct.id)}
              >
                <Eye size={13} />
                <span>VIEW FULL PRODUCT DETAILS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
