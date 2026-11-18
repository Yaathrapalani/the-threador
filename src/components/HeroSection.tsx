import { useState } from 'react';
import { ArrowDown, Sliders, ChevronUp, Drama, Sparkles, Scissors, RotateCw } from 'lucide-react';
import { HeroCanvas } from '../scene/HeroCanvas';
import { GarmentViewInspector } from './GarmentViewInspector';
import type { ModelAssetInfo, PageId, GarmentCameraView, AtelierGender } from '../types';

interface HeroSectionProps {
  scrollProgress: number;
  stage: 'A' | 'B' | 'C' | 'D' | 'E';
  onStageChange: (stage: 'A' | 'B' | 'C' | 'D' | 'E') => void;
  assetInfo: ModelAssetInfo;
  onAssetInfoChange: (info: ModelAssetInfo) => void;
  onJumpToXRay: () => void;
  onNavigatePage: (page: PageId) => void;
}

const SHOWROOM_COLLECTIONS: {
  id: AtelierGender;
  label: string;
  tagline: string;
  description: string;
}[] = [
  {
    id: 'kids',
    label: 'KIDS HEIRLOOM',
    tagline: 'PROJECT LITTLE UNIVERSE // PRINCIPAL COLLECTION',
    description: 'Triple-tier mulberry silk organza celebration gowns with 2.5" hidden French growth seams.'
  },
  {
    id: 'women',
    label: 'WOMEN’S ATELIER',
    tagline: 'SCULPTURAL HAUTE COUTURE',
    description: 'Bias-cut Lyon silk organza and hand-boned silk faille corset with 48 freshwater river pearls.'
  },
  {
    id: 'men',
    label: 'MEN’S TAILORING',
    tagline: 'ARCHITECTURAL SAVILE ROW',
    description: 'Super 150s Merino wool-silk blazer with roped shoulders, rolled peak lapels, and brass crest buttons.'
  }
];

export function HeroSection({
  scrollProgress,
  stage,
  onStageChange,
  assetInfo,
  onAssetInfoChange,
  onNavigatePage
}: HeroSectionProps) {
  // Showroom Collection State (Kids by default as Principal Collection)
  const [activeShowroomGender, setActiveShowroomGender] = useState<AtelierGender>('kids');

  // Manual Inspector state (Discreet and optional; default is automatic cinematic scroll)
  const [activeView, setActiveView] = useState<GarmentCameraView>('front');
  const [isManualViewMode, setIsManualViewMode] = useState<boolean>(false);
  const [isTurntableActive, setIsTurntableActive] = useState<boolean>(false);
  const [showInspectorPanel, setShowInspectorPanel] = useState<boolean>(false);

  const handleSelectInspectorView = (view: GarmentCameraView) => {
    setActiveView(view);
    setIsManualViewMode(true);
  };

  const handleToggleTurntable = () => {
    setIsTurntableActive((prev) => !prev);
  };

  const handleReturnToScroll = () => {
    setIsManualViewMode(false);
  };

  const currentCollection = SHOWROOM_COLLECTIONS.find((c) => c.id === activeShowroomGender) || SHOWROOM_COLLECTIONS[0];

  // Map 0..1 scroll to 7 human-readable cinematic stages
  const getCinematicStageLabel = (p: number) => {
    if (p < 0.16) return { name: 'STAGE 1: ARRIVAL', desc: 'Full Mannequin & Silhouette Framed' };
    if (p < 0.32) return { name: 'STAGE 2: APPROACH', desc: 'Camera Glides Toward Garment' };
    if (p < 0.52) return { name: 'STAGE 3: DETAIL REVELATION', desc: 'Lapel, Collar, Bodice & Stitching' };
    if (p < 0.70) return { name: 'STAGE 4: CONTROLLED ORBIT', desc: '3/4 Turn & Rear Silhouette Reveal' };
    if (p < 0.85) return { name: 'STAGE 5: MACRO PRESENTATION', desc: 'Micro-Fiber Weave & Pearls' };
    if (p < 0.94) return { name: 'STAGE 6: RETURN', desc: 'Smooth Pull Back to Complete Form' };
    return { name: 'STAGE 7: COLLECTION TRANSITION', desc: 'Entering Curated Storefront' };
  };

  const currentStageInfo = getCinematicStageLabel(scrollProgress);

  return (
    <section className="hero-viewport minimalist-hero showroom-hero" id="hero">
      {/* 1. 3D HERO CANVAS - 4K Architectural Showroom Viewport with Realistic Mannequin & Garment */}
      <div className="hero-scene-container">
        <HeroCanvas
          gender={activeShowroomGender}
          scrollProgress={scrollProgress}
          xrayMode="finished"
          onStageChange={onStageChange}
          onAssetInfoChange={onAssetInfoChange}
          forcedView={isManualViewMode ? activeView : null}
          isTurntableActive={isTurntableActive}
        />
      </div>

      {/* 2. SHOWROOM COLLECTION SELECTOR DOCK (Top Center) */}
      <div className="showroom-collection-dock" role="tablist" aria-label="Showroom Collection Selector">
        {SHOWROOM_COLLECTIONS.map((col) => {
          const isActive = activeShowroomGender === col.id;
          return (
            <button
              key={col.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`showroom-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveShowroomGender(col.id)}
            >
              <span className="dock-bullet" />
              <span className="dock-label">{col.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. MINIMALIST LUXURY EDITORIAL HEADER (Pure negative space, monumental serif) */}
      <div className="minimalist-hero-content">
        <div className="hero-monumental-header">
          <div className="hero-tag-cluster">
            <span className="hero-haute-tag">THE THREADOR • DIGITAL COUTURE SHOWROOM</span>
            <span className="showroom-gender-badge">{currentCollection.tagline}</span>
          </div>

          <h1 className="hero-monumental-title">
            The Story Behind<br />
            <i>What We Wear.</i>
          </h1>

          <p className="hero-monumental-subtitle">
            {currentCollection.description}
          </p>

          {/* Discreet Luxury Collection Gateways */}
          <div className="hero-luxury-pathways">
            <button
              type="button"
              className="luxury-pathway-pill kids-pathway-pill primary"
              onClick={() => onNavigatePage(activeShowroomGender === 'kids' ? 'kids' : activeShowroomGender === 'men' ? 'men' : 'women')}
            >
              <Sparkles size={12} />
              <span>EXPLORE {activeShowroomGender.toUpperCase()} COLLECTION</span>
            </button>

            <button
              type="button"
              className="luxury-pathway-pill secondary"
              onClick={() => onNavigatePage('atelier')}
            >
              <Scissors size={12} />
              <span>3D BESPOKE ATELIER</span>
            </button>

            <button
              type="button"
              className="luxury-pathway-pill tertiary"
              onClick={() => onNavigatePage('annual-day')}
            >
              <Drama size={12} />
              <span>ANNUAL DAY</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. AUTOMATIC CINEMATIC PROGRESSION HUD (Replaces Click-to-Zoom with zero friction) */}
      <div className="hero-cinematic-telemetry-hud">
        <div className="telemetry-inner-card">
          <div className="telemetry-status-row">
            <span className="telemetry-live-dot" />
            <span className="telemetry-stage-name">{currentStageInfo.name}</span>
            <span className="telemetry-pct">{Math.round(scrollProgress * 100)}%</span>
          </div>
          <span className="telemetry-desc">{currentStageInfo.desc}</span>
        </div>
      </div>

      {/* 5. DISCREET ACCESSIBLE INSPECTOR & TURNTABLE CONTROLS */}
      <div className="hero-floating-controls">
        <div className="controls-button-group">
          <button
            type="button"
            className={`turntable-quick-btn ${isTurntableActive ? 'active' : ''}`}
            onClick={handleToggleTurntable}
            title={isTurntableActive ? 'Pause Turntable' : 'Auto 360° Turntable'}
          >
            <RotateCw size={12} className={isTurntableActive ? 'spinning-icon' : ''} />
            <span>{isTurntableActive ? 'PAUSE ROTATION' : '360° TURNTABLE'}</span>
          </button>

          <button
            type="button"
            className={`inspector-toggle-pill ${showInspectorPanel ? 'active' : ''}`}
            onClick={() => setShowInspectorPanel((prev) => !prev)}
            aria-expanded={showInspectorPanel}
            title="Toggle Manual Angle Inspection"
          >
            <Sliders size={12} />
            <span>{showInspectorPanel ? 'CLOSE CONTROLS' : 'MANUAL ANGLES'}</span>
            <ChevronUp size={12} className={`toggle-chevron ${showInspectorPanel ? 'open' : ''}`} />
          </button>
        </div>

        {showInspectorPanel && (
          <div className="minimalist-inspector-drawer">
            <div className="drawer-reset-row">
              <span className="drawer-view-label">
                {isManualViewMode ? `VIEW: ${activeView.toUpperCase()}` : `SCENE ${stage}`} • {assetInfo.status === 'external-glb-loaded' ? '4K PRODUCTION GLB' : 'ATELIER RIG'}
              </span>
              {isManualViewMode && (
                <button
                  type="button"
                  className="drawer-return-btn"
                  onClick={handleReturnToScroll}
                >
                  RESUME CINEMATIC SCROLL
                </button>
              )}
            </div>
            <GarmentViewInspector
              currentView={activeView}
              onSelectView={handleSelectInspectorView}
              isTurntableActive={isTurntableActive}
              onToggleTurntable={handleToggleTurntable}
              garmentId={activeShowroomGender === 'men' ? 'THREADOR-M-001' : activeShowroomGender === 'women' ? 'THREADOR-W-001' : 'THREADOR-K-001'}
            />
          </div>
        )}
      </div>

      {/* 6. REFINED MINIMALIST SCROLL PROMPT */}
      <div className="hero-minimalist-scroll-cue">
        <span className="scroll-hairline" />
        <span className="scroll-cue-text">SCROLL TO EXPERIENCE CINEMATIC TOUR</span>
        <ArrowDown size={12} className="scroll-arrow-subtle" />
      </div>
    </section>
  );
}
