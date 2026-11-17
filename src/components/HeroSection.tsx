import { useState } from 'react';
import { ArrowDown, Sliders, ChevronUp, BookOpen, Drama } from 'lucide-react';
import { HeroCanvas } from '../scene/HeroCanvas';
import { GarmentViewInspector } from './GarmentViewInspector';
import type { ModelAssetInfo, PageId, GarmentCameraView } from '../types';

interface HeroSectionProps {
  scrollProgress: number;
  stage: 'A' | 'B' | 'C' | 'D' | 'E';
  onStageChange: (stage: 'A' | 'B' | 'C' | 'D' | 'E') => void;
  assetInfo: ModelAssetInfo;
  onAssetInfoChange: (info: ModelAssetInfo) => void;
  onJumpToXRay: () => void;
  onNavigatePage: (page: PageId) => void;
}

export function HeroSection({
  scrollProgress,
  stage,
  onStageChange,
  assetInfo,
  onAssetInfoChange,
  onNavigatePage
}: HeroSectionProps) {
  // Garment Detail Inspection pipeline state (discreet minimalist drawer)
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

  return (
    <section className="hero-viewport minimalist-hero" id="hero">
      {/* 1. 3D HERO CANVAS - 4K Crisp Haute Couture Centerpiece */}
      <div className="hero-scene-container">
        <HeroCanvas
          scrollProgress={scrollProgress}
          xrayMode="finished"
          onStageChange={onStageChange}
          onAssetInfoChange={onAssetInfoChange}
          forcedView={isManualViewMode ? activeView : null}
          isTurntableActive={isTurntableActive}
        />
      </div>

      {/* 2. MINIMALIST LUXURY EDITORIAL HEADER (Pure negative space, monumental serif) */}
      <div className="minimalist-hero-content">
        <div className="hero-monumental-header">
          <span className="hero-haute-tag">THE THREADOR • HAUTE COUTURE ATELIER</span>
          <h1 className="hero-monumental-title">
            The Story Behind<br />
            <i>What We Wear.</i>
          </h1>
          <p className="hero-monumental-subtitle">
            What if every child grew up knowing how a thread transforms from soil into silk,
            structure, and stage? An extraordinary convergence of Indian textile arts and digital couture.
          </p>

          {/* Discreet Luxury Pathways */}
          <div className="hero-luxury-pathways">
            <button
              type="button"
              className="luxury-pathway-pill primary"
              onClick={() => onNavigatePage('annual-day')}
            >
              <Drama size={13} />
              <span>ANNUAL DAY COSTUMES</span>
            </button>

            <button
              type="button"
              className="luxury-pathway-pill secondary"
              onClick={() => onNavigatePage('course')}
            >
              <BookOpen size={13} />
              <span>FASHION EDUCATION</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. DISCREET MULTI-ANGLE INSPECTOR PILL (Unobtrusive floating control) */}
      <div className="hero-floating-controls">
        <button
          type="button"
          className={`inspector-toggle-pill ${showInspectorPanel ? 'active' : ''}`}
          onClick={() => setShowInspectorPanel((prev) => !prev)}
          aria-expanded={showInspectorPanel}
          title="Toggle 3D Multi-Angle Garment Inspector"
        >
          <Sliders size={12} />
          <span>{showInspectorPanel ? 'HIDE INSPECTOR' : 'INSPECT 3D SILHOUETTE'}</span>
          <ChevronUp size={12} className={`toggle-chevron ${showInspectorPanel ? 'open' : ''}`} />
        </button>

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
                  RESUME SCROLL
                </button>
              )}
            </div>
            <GarmentViewInspector
              currentView={activeView}
              onSelectView={handleSelectInspectorView}
              isTurntableActive={isTurntableActive}
              onToggleTurntable={handleToggleTurntable}
              garmentId="THREADOR-W-001"
            />
          </div>
        )}
      </div>

      {/* 4. REFINED MINIMALIST SCROLL PROMPT */}
      <div className="hero-minimalist-scroll-cue">
        <span className="scroll-hairline" />
        <span className="scroll-cue-text">SCROLL TO DISCOVER</span>
        <ArrowDown size={12} className="scroll-arrow-subtle" />
      </div>
    </section>
  );
}
