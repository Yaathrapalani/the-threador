import { useState, useRef, useCallback } from 'react';
import { Play, Pause, RotateCw, Sparkles, Scissors, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import { HeroCanvas } from '../scene/HeroCanvas';
import { AtelierDualScene } from '../scene/AtelierDualScene';
import type { AtelierGender, PageId } from '../types';

interface ScrollGarmentCinematicProps {
  initialGender?: AtelierGender;
  onNavigatePage: (page: PageId) => void;
  onOpenProductDetail: (productId: string) => void;
}

interface RevealPhase {
  phaseIndex: number;
  phaseCode: string;
  title: string;
  headline: string;
  body: string;
  craftMetrics: string;
  focusPoint: string;
}

const WOMEN_PHASES: RevealPhase[] = [
  {
    phaseIndex: 1,
    phaseCode: 'PHASE 01 — ARCHITECTURAL SILHOUETTE',
    title: 'The Full Silhouette',
    headline: 'Conceived in Champagne Ivory.',
    body: 'The gown emerges within the limestone gallery. Notice the generous negative space, natural gravitational drop of 38 metres of custom-woven Lyon silk organza cut on a 45° bias.',
    craftMetrics: '1,750 MM Silhouette • 38 Pattern Pieces',
    focusPoint: 'Full Body Proportion'
  },
  {
    phaseIndex: 2,
    phaseCode: 'PHASE 02 — THE CORSET FOUNDATION',
    title: 'Anatomical Architecture',
    headline: 'Hand-Moulded Spiral Boning.',
    body: 'Approaching the core: ten continuous spiral steel boning channels contour to 0.5mm precision, supporting the natural waist without constricting movement.',
    craftMetrics: '10 Boning Channels • Silk Faille Core',
    focusPoint: 'Waist & Bodice Apex'
  },
  {
    phaseIndex: 3,
    phaseCode: 'PHASE 03 — METALLIC EMBROIDERY',
    title: 'Botanical Zardozi Couching',
    headline: 'Ascending Lotus Filaments.',
    body: 'Extreme artisan focus: master aari artisans couch genuine metallic zari wire in ascending vine tendrils, catching studio illumination with warm amber luster.',
    craftMetrics: '428,000 Micro Stitches • Real Gold Wire',
    focusPoint: 'Sweetheart Neckline'
  },
  {
    phaseIndex: 4,
    phaseCode: 'PHASE 04 — RIVER PEARL EMBELLISHMENT',
    title: 'Nacre River Pearls',
    headline: '45 Hand-Anchored River Pearls.',
    body: 'Freshwater pearls graduated in three distinct calibres are individually hand-tacked along the hip fluting, cascading into the weightless peplum tier.',
    craftMetrics: '45 Freshwater Pearls • Pure Silk Thread',
    focusPoint: 'Hip Fluting & Petals'
  },
  {
    phaseIndex: 5,
    phaseCode: 'PHASE 05 — REAR BUTTON PLACKET',
    title: 'The Spine & Cascading Train',
    headline: 'Covered Pearl Loop Closure.',
    body: 'The mannequin rotates into three-quarter and rear profile, revealing the hand-bound silk loop placket and horsehair-reinforced harmonic trumpet train.',
    craftMetrics: '2.4 Metre Sweep • Horsehair Braid Hem',
    focusPoint: 'Rear Placket & Train'
  },
  {
    phaseIndex: 6,
    phaseCode: 'PHASE 06 — ATELIER INTEGRATION',
    title: 'From Vision to Creation',
    headline: 'Enter the Interactive 3D Atelier.',
    body: 'Seamlessly transition from cinematic reveal into your personal digital workspace. Rotate in 360°, inspect individual seams, or customize fabrics and bespoke measurements.',
    craftMetrics: 'Ready for Bespoke Made-to-Measure',
    focusPoint: 'Full Interactive Canvas'
  }
];

const MEN_PHASES: RevealPhase[] = [
  {
    phaseIndex: 1,
    phaseCode: 'PHASE 01 — POSTURAL ARCHITECTURE',
    title: 'The Sovereign Silhouette',
    headline: 'The Unbroken Vertical Line.',
    body: 'The tailored blazer stands poised on a charcoal stand in soft daylight. Broad roped shoulders and athletic waist suppression create a silhouette of timeless authority.',
    craftMetrics: 'Double-Breasted Drop • Super 150s Merino',
    focusPoint: 'Full Mannequin Stance'
  },
  {
    phaseIndex: 2,
    phaseCode: 'PHASE 02 — ROPE SHOULDER & CHEST',
    title: 'Internal Floating Canvas',
    headline: 'Floating Horsehair Canvas.',
    body: 'Zero synthetic fusibles. Hand-padded unbleached Mongolian horsehair canvas delivers anatomical memory that molds uniquely to the wearer’s body over decades.',
    craftMetrics: '3,200 Pad Stitches • Floating Interlining',
    focusPoint: 'Chest Apex & Shoulder Head'
  },
  {
    phaseIndex: 3,
    phaseCode: 'PHASE 03 — SATIN PEAK LAPEL',
    title: 'Satin Peak Lapel & AMF Stitching',
    headline: '0.5mm AMF Pick-Stitching.',
    body: 'Macro precision: silk satin peak lapels cut on an exact 45° angle, bordered by continuous hand-guided AMF pick-stitching along the silk gorge and collar roll.',
    craftMetrics: '18 Stitches / Inch • Pure Silk Facing',
    focusPoint: 'Peak Lapel & Collar'
  },
  {
    phaseIndex: 4,
    phaseCode: 'PHASE 04 — BREAST POCKET & BUTTONS',
    title: 'Pocket Welt & Brass Crests',
    headline: '4 Double-Breasted Brass Buttons.',
    body: 'A hand-set chest welt pocket cradles a folded crisp white silk pocket square. Four heavy polished brass crest buttons gleam in balanced 2x2 symmetry.',
    craftMetrics: 'Bespoke Milled Brass • Hand-Rolled Silk',
    focusPoint: 'Chest Welt & Placket'
  },
  {
    phaseIndex: 5,
    phaseCode: 'PHASE 05 — SURGEON’S CUFFS & DRAPE',
    title: 'Functional Kissing Cuffs',
    headline: 'Four Kissing Horn Buttons.',
    body: 'The camera pulls back to a three-quarter study of the tailored sleeve drape, showcasing surgeon’s functional buttonholes and subtle waist suppression.',
    craftMetrics: '4 Kissing Cuff Buttons • Double Rear Vent',
    focusPoint: 'Sleeve Cuff & Waist Flare'
  },
  {
    phaseIndex: 6,
    phaseCode: 'PHASE 06 — ATELIER INTEGRATION',
    title: 'Bespoke Tailoring Suite',
    headline: 'Inspect in Real-Time 3D.',
    body: 'Transition directly to the interactive 3D tailoring suite. Examine Pad-stitching, switch between English twill and Banarasi brocades, or request made-to-measure tailoring.',
    craftMetrics: 'Bespoke Made-to-Measure Available',
    focusPoint: 'Interactive Tailoring Canvas'
  }
];

export function ScrollGarmentCinematic({
  initialGender = 'women',
  onNavigatePage,
  onOpenProductDetail
}: ScrollGarmentCinematicProps) {
  const [selectedGender, setSelectedGender] = useState<AtelierGender>(initialGender);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [scrubProgress, setScrubProgress] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const phases = selectedGender === 'women' ? WOMEN_PHASES : MEN_PHASES;
  const currentPhase = phases[activePhaseIndex] || phases[0];

  const videoSrc =
    selectedGender === 'women'
      ? '/assets/videos/womens-couture-reveal-1080p.mp4'
      : '/assets/videos/mens-tailored-reveal-1080p.mp4';

  const productId = selectedGender === 'women' ? 'THREADOR-W-001' : 'THREADOR-M-001';

  // Synchronise video playback to manual phase selection
  const handleSelectPhase = (index: number) => {
    setActivePhaseIndex(index);
    const targetTime = (index / (phases.length - 1)) * 9.5;
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  // Switch between Women's Gown and Men's Blazer
  const handleSwitchGender = (gender: AtelierGender) => {
    setSelectedGender(gender);
    setActivePhaseIndex(0);
    setIs3DMode(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  // Toggle video playback
  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  // Track video time to update active phase dynamically
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    const duration = videoRef.current.duration || 10;
    const currentTime = videoRef.current.currentTime;
    const p = currentTime / duration;
    setScrubProgress(p);

    const calculatedPhase = Math.min(
      Math.floor(p * phases.length),
      phases.length - 1
    );
    if (calculatedPhase !== activePhaseIndex) {
      setActivePhaseIndex(calculatedPhase);
    }
  }, [activePhaseIndex, phases.length]);

  return (
    <section className="scroll-garment-cinematic-section" ref={trackRef} id="cinematic-reveal">
      {/* 1. TOP EDITORIAL BAR: GENDER UNIVERSE TOGGLE & STATUS */}
      <div className="cinematic-overhead-bar">
        <div className="cinematic-brand-tag">
          <Sparkles size={13} className="sparkle-icon" />
          <span>SIGNATURE CINEMATIC EXPERIENCE • 1080P MASTER REVEAL</span>
        </div>

        <div className="cinematic-gender-switch">
          <button
            type="button"
            className={`gender-switch-btn ${selectedGender === 'women' ? 'active' : ''}`}
            onClick={() => handleSwitchGender('women')}
          >
            <Sparkles size={11} />
            <span>01 / WOMEN: THE ATELIER GOWN</span>
          </button>
          <button
            type="button"
            className={`gender-switch-btn ${selectedGender === 'men' ? 'active' : ''}`}
            onClick={() => handleSwitchGender('men')}
          >
            <Scissors size={11} />
            <span>02 / MEN: THE TAILORED BLAZER</span>
          </button>
        </div>

        <div className="cinematic-mode-toggle">
          <button
            type="button"
            className={`mode-toggle-btn ${!is3DMode ? 'active' : ''}`}
            onClick={() => setIs3DMode(false)}
            title="Switch to 1080p Cinematic Film"
          >
            <Play size={11} />
            <span>CINEMATIC FILM</span>
          </button>
          <button
            type="button"
            className={`mode-toggle-btn ${is3DMode ? 'active' : ''}`}
            onClick={() => setIs3DMode(true)}
            title="Switch to Interactive 3D WebGL Canvas"
          >
            <RotateCw size={11} />
            <span>INTERACTIVE 3D</span>
          </button>
        </div>
      </div>

      {/* 2. THE MAIN MEDIA STAGE: 1080P VIDEO SCRUBBER OR INTERACTIVE 3D CANVAS */}
      <div className="cinematic-media-stage">
        {!is3DMode ? (
          <div className="video-viewport-wrapper">
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              playsInline
              loop
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              className="cinematic-video-element"
            />
            {/* Subtle Gradient Vignette */}
            <div className="cinematic-vignette-overlay" aria-hidden="true" />
          </div>
        ) : (
          <div className="three-viewport-wrapper">
            {selectedGender === 'women' ? (
              <HeroCanvas
                scrollProgress={0.45}
                xrayMode="finished"
                forcedView={null}
                isTurntableActive={true}
              />
            ) : (
              <AtelierDualScene
                gender="men"
                isHovered={true}
                onExplore={() => onOpenProductDetail(productId)}
              />
            )}
            <div className="three-interactive-hint">
              <RotateCw size={12} className="spin-slow" />
              <span>DRAG TO ROTATE 360° • PINCH TO ZOOM</span>
            </div>
          </div>
        )}

        {/* 3. CRAFTSMANSHIP HUD OVERLAY (FLOATING EDITORIAL CARD) */}
        <div className="cinematic-craft-hud">
          <div className="hud-phase-badge">
            <span className="phase-pill">{currentPhase.phaseCode}</span>
            <span className="phase-focus">FOCUS: {currentPhase.focusPoint}</span>
          </div>

          <h2 className="hud-phase-title">{currentPhase.title}</h2>
          <h3 className="hud-phase-headline">{currentPhase.headline}</h3>
          <p className="hud-phase-body">{currentPhase.body}</p>

          <div className="hud-metrics-row">
            <ShieldCheck size={13} className="hud-metric-icon" />
            <span>{currentPhase.craftMetrics}</span>
          </div>

          <div className="hud-actions-row">
            <button
              type="button"
              className="hud-action-btn primary"
              onClick={() => onOpenProductDetail(productId)}
            >
              <span>INSPECT PRODUCT DETAILS</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              className="hud-action-btn secondary"
              onClick={() => onNavigatePage('atelier')}
            >
              <span>CUSTOMIZE IN ATELIER</span>
            </button>
          </div>
        </div>

        {/* 4. PHASE PROGRESS TIMELINE SELECTOR */}
        <div className="cinematic-timeline-dock">
          <div className="timeline-controls-left">
            {!is3DMode && (
              <button
                type="button"
                className="playback-toggle-btn"
                onClick={handleTogglePlay}
                aria-label={isVideoPlaying ? 'Pause cinematic film' : 'Play cinematic film'}
              >
                {isVideoPlaying ? <Pause size={13} /> : <Play size={13} />}
              </button>
            )}
            <span className="scrub-time-label">
              {Math.round(scrubProgress * 100)}% CRAFT REVEAL
            </span>
          </div>

          <div className="timeline-phase-pills">
            {phases.map((p, idx) => (
              <button
                key={p.phaseIndex}
                type="button"
                className={`timeline-step-btn ${idx === activePhaseIndex ? 'active' : ''}`}
                onClick={() => handleSelectPhase(idx)}
                title={p.title}
              >
                <span className="step-num">0{p.phaseIndex}</span>
                <span className="step-name">{p.title}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="timeline-3d-shortcut"
            onClick={() => setIs3DMode((prev) => !prev)}
          >
            <Eye size={12} />
            <span>{is3DMode ? 'EXIT 3D' : 'ENTER 360° 3D'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
