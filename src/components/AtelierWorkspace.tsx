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
  kids: [
    {
      id: 'kids-organza',
      name: 'French Silk Organza (Hypoallergenic)',
      composition: '85% French Silk, 15% Organic Habotai',
      weight: '120 g/m²',
      origin: 'Woven in Lyon, France',
      pbrTexture: 'Translucent Soft Petal Sheen (0.68)'
    },
    {
      id: 'kids-velvet',
      name: 'Pure English Cotton Velvet (Non-Rigid)',
      composition: '100% Breathable English Cotton',
      weight: '310 g/m²',
      origin: 'Lancashire, England',
      pbrTexture: 'Plush Natural Pile & Soft Reflection'
    },
    {
      id: 'kids-tulle',
      name: 'Gossamer French Silk Tulle',
      composition: '70% Silk Tulle, 30% Bamboo-Silk',
      weight: '95 g/m²',
      origin: 'Lake Como, Italy',
      pbrTexture: 'Weightless Air Mesh Fluting'
    },
    {
      id: 'kids-banarasi',
      name: 'Varanasi Handloom Kadhwa Zari Brocade',
      composition: '80% Katan Silk, 20% Fine Metallic Zari',
      weight: '210 g/m²',
      origin: 'Varanasi Heritage Pit-Looms',
      pbrTexture: 'Handloom Floral Zari Couching'
    }
  ],
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
  kids: [
    { name: 'Warm Ivory', hex: '#EEE7DC' },
    { name: 'Dusty Rose', hex: '#D5B8B0' },
    { name: 'Powder Blue', hex: '#B9C9D5' },
    { name: 'Soft Butter', hex: '#E8D9A8' },
    { name: 'Forest Sage', hex: '#A8AE98' },
    { name: 'Royal Midnight', hex: '#131C2B' }
  ],
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
  const [gender, setGender] = useState<AtelierGender>('kids');
  const [selectedFabricId, setSelectedFabricId] = useState<string>('kids-organza');
  const [selectedColor, setSelectedColor] = useState<string>('Warm Ivory');
  const [selectedLapel, setSelectedLapel] = useState<string>('Scalloped Peter Pan Collar');
  const [selectedButton, setSelectedButton] = useState<string>('Freshwater Seed Pearls');
  const [activeCameraView, setActiveCameraView] = useState<GarmentCameraView>('front');
  const [monogram, setMonogram] = useState<string>('');
  const [isMadeToMeasure, setIsMadeToMeasure] = useState<boolean>(false);
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
  const fabrics = ATELIER_FABRICS[gender];
  const colors = COLORWAYS[gender];
  const currentFabric = fabrics.find((f) => f.id === selectedFabricId) || fabrics[0];

  const targetProduct: ProductRecord =
    STORE_PRODUCTS.find((p) => p.gender === gender) || STORE_PRODUCTS[0];

  const handleSwitchGender = (newGender: AtelierGender) => {
    setGender(newGender);
    if (newGender === 'kids') {
      setSelectedFabricId('kids-organza');
      setSelectedColor('Warm Ivory');
      setSelectedLapel('Scalloped Peter Pan Collar');
      setSelectedButton('Freshwater Seed Pearls');
    } else if (newGender === 'men') {
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
    const customNotes = isKids
      ? `Bespoke Child Creation: ${currentFabric.name} in ${selectedColor}. Silhouette: ${selectedLapel}. Accents: ${selectedButton}. ${
          monogram ? `Child Monogram: ${monogram}. ` : ''
        }${
          isMadeToMeasure
            ? `Bespoke Child Fit (Age: ${childAge}, Height: ${measurements.height}cm, Chest: ${measurements.chest}", Waist: ${measurements.waist}", Hem: ${measurements.shoulderToHem}") [2.5" Growth Allowance Included]`
            : `Standard Age Fit (${childAge})`
        }`
      : `Bespoke Adult Configuration: ${currentFabric.name} in ${selectedColor}. Lapel/Style: ${selectedLapel}. Buttons: ${selectedButton}. ${
          monogram ? `Monogram: ${monogram}. ` : ''
        }${
          isMadeToMeasure
            ? `Made-to-Measure (Chest: ${measurements.chest}", Waist: ${measurements.waist}", Hips: ${measurements.hips}", Height: ${measurements.height}cm)`
            : 'Standard Size'
        }`;

    cartService.addItem(
      targetProduct,
      isMadeToMeasure ? 'Made-to-Measure Bespoke' : targetProduct.sizes[0] || 'Standard',
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
    <div className={`atelier-workspace-root ${isKids ? 'kids-workspace' : isMen ? 'men-workspace' : 'women-workspace'}`}>
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
            className={`gender-tab ${isKids ? 'active' : ''}`}
            onClick={() => handleSwitchGender('kids')}
          >
            <Sparkles size={11} />
            <span>01 / KIDS COUTURE (FEATURED)</span>
          </button>
          <button
            type="button"
            className={`gender-tab ${isMen ? 'active' : ''}`}
            onClick={() => handleSwitchGender('men')}
          >
            <Scissors size={11} />
            <span>02 / MEN’S TAILORING</span>
          </button>
          <button
            type="button"
            className={`gender-tab ${!isKids && !isMen ? 'active' : ''}`}
            onClick={() => handleSwitchGender('women')}
          >
            <Sparkles size={11} />
            <span>03 / WOMEN’S COUTURE</span>
          </button>
        </div>

        <div className="status-actions">
          <button
            type="button"
            className="status-collection-btn"
            onClick={() => onNavigatePage(isKids ? 'kids' : isMen ? 'men' : 'women')}
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
            {isKids ? (
              <HeroCanvas
                gender="kids"
                scrollProgress={0.45}
                xrayMode="finished"
                forcedView={activeCameraView}
                isTurntableActive={true}
              />
            ) : isMen ? (
              <AtelierDualScene
                gender="men"
                isHovered={true}
                onExplore={() => onOpenProductDetail(targetProduct.id)}
              />
            ) : (
              <HeroCanvas
                gender="women"
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
              {isKids
                ? '01 / CHILDREN’S HAUTE COUTURE SPECIFICATION'
                : isMen
                ? '02 / BESPOKE BESPOKE ARCHITECTURE'
                : '03 / HAUTE COUTURE SPECIFICATION'}
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
              3. {isKids ? 'COLLAR & SILHOUETTE FORM:' : isMen ? 'LAPEL ARCHITECTURE:' : 'SILHOUETTE / BODICE FORM:'}
            </span>
            <div className="variant-options-row">
              {(isKids
                ? ['Scalloped Peter Pan Collar', 'Contoured Mandarin Stand', 'Ruffled Empire Bodice', 'Classic British Lapel']
                : isMen
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
              {(isKids
                ? ['Freshwater Seed Pearls', 'Natural Mother-of-Pearl', 'Faceted Brass Crests', 'Silk Covered Buttons']
                : isMen
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
              isKids ? (
                <div className="measurements-input-grid kids-measure-grid">
                  <div className="measure-field">
                    <label>Age Bracket</label>
                    <select
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      className="child-age-select"
                    >
                      {['2–3Y', '4–5Y', '6–7Y', '8–9Y', '10–12Y', '13–14Y'].map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                  <div className="measure-field">
                    <label>Child Height (cm)</label>
                    <input
                      type="text"
                      value={measurements.height}
                      onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                    />
                  </div>
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
                    <label>Shoulder to Hem (Inches)</label>
                    <input
                      type="text"
                      value={measurements.shoulderToHem}
                      onChange={(e) => setMeasurements({ ...measurements, shoulderToHem: e.target.value })}
                    />
                  </div>
                  <div className="kids-growth-notice">
                    <ShieldCheck size={12} />
                    <span>Includes 2.5-inch concealed French seam allowance for natural growth.</span>
                  </div>
                </div>
              ) : (
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
              )
            )}
          </div>

          {/* CONTROL SECTION 6: CUSTOM MONOGRAMMING */}
          <div className="control-section">
            <span className="section-label">
              6. {isKids ? 'CHILD SASH MONOGRAM (INITIALS / DATE):' : 'INTERNAL SILK MONOGRAM (OPTIONAL):'}
            </span>
            <input
              type="text"
              placeholder={isKids ? 'e.g. A.P. • 2026' : 'e.g. A.S. • 2026'}
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
