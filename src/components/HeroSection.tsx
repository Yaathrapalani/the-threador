import { useState } from 'react';
import { ArrowDown, Maximize2, BookOpen, Drama, Compass, Sliders } from 'lucide-react';
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

const SCENE_DESCRIPTIONS: Record<
  'A' | 'B' | 'C' | 'D' | 'E',
  { sceneTag: string; headlinePart1: string; headlineEm: string; subtext: string }
> = {
  A: {
    sceneTag: 'SCENE 01 — THE REVEAL',
    headlinePart1: 'Every thread has a ',
    headlineEm: 'beginning.',
    subtext: 'Before it becomes something we wear, it begins in the soil, the weaver’s shuttle, and the artisan’s patience.'
  },
  B: {
    sceneTag: 'SCENE 02 — THE 360° ROTATION',
    headlinePart1: 'Sculpted on a true ',
    headlineEm: 'bias.',
    subtext: 'Turn through front, profile, and rear draping. Notice how the open-weave silk organza aligns with anatomical grace.'
  },
  C: {
    sceneTag: 'SCENE 03 — THE FABRIC MACRO',
    headlinePart1: 'Feel the story in the ',
    headlineEm: 'weave.',
    subtext: 'Extreme macro perspective: Triple-ply mulberry silk gazar, hand-anchored river seed pearls, and spun gold zardozi filaments.'
  },
  D: {
    sceneTag: 'SCENE 04 — THE TRANSFORMATION',
    headlinePart1: 'From raw fiber to ',
    headlineEm: 'couture.',
    subtext: 'Deconstructing the internal spiral boning, floating horsehair canvas, and 42,000 continuous tension silk stitches.'
  },
  E: {
    sceneTag: 'SCENE 05 — THE PHILOSOPHY',
    headlinePart1: 'What if every child knew ',
    headlineEm: 'the story?',
    subtext: 'Connecting young minds to Indian textiles, indigenous crafts, and stage costume arts. Descend into the duality of form.'
  }
};

export function HeroSection({
  scrollProgress,
  stage,
  onStageChange,
  assetInfo,
  onAssetInfoChange,
  onJumpToXRay,
  onNavigatePage
}: HeroSectionProps) {
  const currentScene = SCENE_DESCRIPTIONS[stage];

  // Garment Detail Inspection pipeline state
  const [activeView, setActiveView] = useState<GarmentCameraView>('front');
  const [isManualViewMode, setIsManualViewMode] = useState<boolean>(false);
  const [isTurntableActive, setIsTurntableActive] = useState<boolean>(false);

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
    <section className="hero-viewport" id="hero">
      {/* 1. TECHNICAL ATELIER METRIC GRID */}
      <div className="technical-grid-bg" aria-hidden="true">
        <div className="grid-axis-vertical left" />
        <div className="grid-axis-vertical right" />
        <div className="grid-axis-horizontal top" />
        <div className="grid-axis-horizontal bottom" />

        <div className="metric-tick tick-top-left">
          <span>THE THREADOR • ATELIER FORME</span>
          <span>ORIGIN: INDIA TEXTILE ARCHIVE</span>
        </div>
        <div className="metric-tick tick-top-right">
          <span>SILHOUETTE: 1,750 MM</span>
          <span>DISCIPLINE: FASHION EDUCATION & COSTUME</span>
        </div>
        <div className="metric-tick tick-bottom-left">
          <span>CORE PHILOSOPHY: SOIL TO STAGE</span>
          <span>FIBER: KHADI, MULBERRY SILK & ZARDOZI</span>
        </div>
        <div className="metric-tick tick-bottom-right">
          <span>
            {isManualViewMode ? `INSPECTOR: ${activeView.toUpperCase()}` : `STAGE: ${stage}`}
          </span>
          <span>MESH: {assetInfo.status === 'external-glb-loaded' ? 'PRODUCTION GLB' : 'PROCEDURAL RIG'} ({Math.round(scrollProgress * 100)}%)</span>
        </div>
      </div>

      {/* 2. 3D HERO CANVAS (Supports both GSAP scroll and Manual 6-View Inspector) */}
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

      {/* 3. DYNAMIC SCENE EDITORIAL OVERLAY */}
      <div className="hero-editorial-overlay">
        <div className="editorial-stage-badge">
          <span className="stage-code">
            {isManualViewMode ? `ANGLE INSPECTOR — ${activeView.toUpperCase()}` : currentScene.sceneTag}
          </span>
          <div className="stage-progress-pills">
            {(['A', 'B', 'C', 'D', 'E'] as const).map((s) => (
              <span
                key={s}
                className={`stage-pill ${stage === s ? 'active' : ''}`}
                title={`Scene ${s}`}
              />
            ))}
          </div>

          {isManualViewMode && (
            <button
              type="button"
              className="return-scroll-btn"
              onClick={handleReturnToScroll}
              title="Return to scroll-driven timeline"
            >
              <Compass size={11} />
              <span>RETURN TO SCROLL</span>
            </button>
          )}
        </div>

        <h1 className="hero-headline">
          {currentScene.headlinePart1}
          <i>{currentScene.headlineEm}</i>
        </h1>

        <p className="hero-narrative">{currentScene.subtext}</p>

        {/* Strategic Business Pathway CTAs */}
        <div className="hero-quick-actions">
          <button
            type="button"
            className="editorial-action-btn primary"
            onClick={() => onNavigatePage('course')}
          >
            <BookOpen size={13} />
            <span>LEARN: FASHION EDUCATION</span>
          </button>
          <button
            type="button"
            className="editorial-action-btn primary"
            onClick={() => onNavigatePage('annual-day')}
          >
            <Drama size={13} />
            <span>CREATE: ANNUAL DAY COSTUMES</span>
          </button>
          <button
            type="button"
            className="editorial-action-btn secondary"
            onClick={onJumpToXRay}
          >
            <Maximize2 size={13} />
            <span>X-RAY DECONSTRUCTION</span>
          </button>
        </div>

        {/* 4. GARMENT DETAIL INSPECTION BAR (Phase 5 Canonical 6-View Pipeline) */}
        <div className="hero-inspector-mount">
          <div className="inspector-mount-header">
            <span className="inspector-mount-tag">
              <Sliders size={12} className="inline-icon" />
              MULTI-ANGLE GARMENT INSPECTION PIPELINE
            </span>
          </div>
          <GarmentViewInspector
            currentView={activeView}
            onSelectView={handleSelectInspectorView}
            isTurntableActive={isTurntableActive}
            onToggleTurntable={handleToggleTurntable}
            garmentId="THREADOR-W-001"
          />
        </div>

        {/* 5. Scroll Prompt */}
        <div className="hero-scroll-cue">
          <span className="scroll-cue-text">SCROLL TO ROTATE & UNRAVEL CRAFTSMANSHIP</span>
          <ArrowDown size={14} className="scroll-arrow-icon" />
        </div>
      </div>
    </section>
  );
}
