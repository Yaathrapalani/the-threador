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
  phaseLetter: string;
  title: string;
  headline: string;
  body: string;
  craftMetrics: string;
  focusPoint: string;
}

const KIDS_PHASES: RevealPhase[] = [
  {
    phaseIndex: 1,
    phaseLetter: 'A',
    phaseCode: 'PHASE A — FULL SILHOUETTE',
    title: 'Heirloom Child Stance',
    headline: 'Sculpted for Joyful Poise & Unrestricted Play.',
    body: 'Engineered on authentic 6–8Y child anatomical proportions (~1:5.2 head-to-body scale). Natural unpinched waist, soft shoulder drape, and balanced negative space designed for celebratory grace.',
    craftMetrics: '1,120 MM Silhouette • 28 Master Pattern Cuts',
    focusPoint: 'Full Proportion & Stance'
  },
  {
    phaseIndex: 2,
    phaseLetter: 'B',
    phaseCode: 'PHASE B — CAMERA APPROACH',
    title: 'Peter Pan Neckline & Silk Collar',
    headline: 'Double-Faced Hypoallergenic Mulberry Silk Framing.',
    body: 'Approaching the tender collarline: 100% organic mulberry silk lining with zero synthetic additives, preventing neck irritation with soft curved scallops and tagless construction.',
    craftMetrics: '100% Hypoallergenic Silk • Hand-Turned Scallops',
    focusPoint: 'Neckline & Sensitive Skin Shield'
  },
  {
    phaseIndex: 3,
    phaseLetter: 'C',
    phaseCode: 'PHASE C — CONTROLLED ORBIT',
    title: 'Harmonic Radial 360° Profile',
    headline: 'Weightless Volume Across Every Perspective.',
    body: 'A gentle 360° revolution reveals the triple-tier buoyant organza skirt. The high empire waistline allows complete freedom for running, twirling, and natural childhood motion.',
    craftMetrics: '360° Balanced Volume • Empire Cut',
    focusPoint: 'Silhouette in Motion'
  },
  {
    phaseIndex: 4,
    phaseLetter: 'D',
    phaseCode: 'PHASE D — CONSTRUCTION REVEAL',
    title: 'Internal Heirloom Seams & 2.5" Growth Allowance',
    headline: 'Crafted to Grow Across Family Milestones.',
    body: 'Architectural insight reveals generous 2.5-inch hidden internal French seam allowances and internal hem let-down buffers, allowing the heirloom to expand naturally over multiple years.',
    craftMetrics: '2.5" Seam Buffer • Internal French Seams',
    focusPoint: 'Heirloom Longevity Engineering'
  },
  {
    phaseIndex: 5,
    phaseLetter: 'E',
    phaseCode: 'PHASE E — MACRO INSPECTION',
    title: 'Seed Pearls & Botanical Flora Zardozi',
    headline: 'Freshwater Pearls & Delicate Gold Vine Couching.',
    body: 'Macro magnification: 36 genuine freshwater river seed pearls individually hand-anchored with reinforced silk cord alongside flexible gold wire climbing rose and jasmine tendrils.',
    craftMetrics: '36 Natural Seed Pearls • 22,000 Micro-Stitches',
    focusPoint: 'Placket Pearls & Floral Couching'
  },
  {
    phaseIndex: 6,
    phaseLetter: 'F',
    phaseCode: 'PHASE F — RETURN TO COMPLETE GARMENT',
    title: 'The Harmonious Heirloom Ensemble',
    headline: 'Elegance, Durability & Gentle Movement Realigned.',
    body: 'The perspective expands back to the complete composition. Natural champagne and soft ivory tones coalesce under warm museum illumination, ready for memorable celebrations.',
    craftMetrics: '85 Artisan Workshop Hours • Master Tailor Finish',
    focusPoint: 'Complete Heirloom Harmony'
  },
  {
    phaseIndex: 7,
    phaseLetter: 'G',
    phaseCode: 'PHASE G — TRANSITION INTO ATELIER & STORE',
    title: 'Personalize in the 3D Atelier',
    headline: 'Bespoke Measurements, Monograms & Silk Colorways.',
    body: 'Transition from viewing into bespoke creation. Select heirloom fabrics, order made-to-measure child sizing, or embroider custom monograms onto the inner silk sash.',
    craftMetrics: 'Bespoke Child Made-to-Measure Enabled',
    focusPoint: 'Digital Atelier & Direct Order'
  }
];

const WOMEN_PHASES: RevealPhase[] = [
  {
    phaseIndex: 1,
    phaseLetter: 'A',
    phaseCode: 'PHASE A — FULL SILHOUETTE',
    title: 'Architectural Column & Bias Drop',
    headline: 'Conceived in Champagne Ivory Silk Organza.',
    body: 'The gown emerges within the limestone gallery. Generous negative space, natural gravitational drop of 38 metres of custom-woven Lyon silk organza cut on a 45° true bias.',
    craftMetrics: '1,750 MM Silhouette • 38 Pattern Pieces',
    focusPoint: 'Full Body Stance & Gravity'
  },
  {
    phaseIndex: 2,
    phaseLetter: 'B',
    phaseCode: 'PHASE B — CAMERA APPROACH',
    title: 'Corset Core & Sweetheart Arch',
    headline: 'Ten Spiral Steel Boning Channels.',
    body: 'Approaching the bodice apex: 10 continuous spiral steel boning channels contour to 0.5mm precision, supporting the natural waist without constricting movement.',
    craftMetrics: '10 Boning Channels • Silk Faille Foundation',
    focusPoint: 'Bodice Contour & Waisting'
  },
  {
    phaseIndex: 3,
    phaseLetter: 'C',
    phaseCode: 'PHASE C — CONTROLLED ORBIT',
    title: 'Fluid Three-Quarter Sweep',
    headline: 'Radial Petal Fluting & Sculpted Flare.',
    body: 'Smooth turntable orbit showcases the cascading asymmetric organza tiers draping over the hips, balancing sculptural volume with ethereal translucency.',
    craftMetrics: '45° Bias Cut • 38m Silk Organza',
    focusPoint: 'Fluting & Asymmetric Tiers'
  },
  {
    phaseIndex: 4,
    phaseLetter: 'D',
    phaseCode: 'PHASE D — CONSTRUCTION REVEAL',
    title: 'Hand-Felled Seams & Horsehair Hem',
    headline: 'Invisible Interior Support Architecture.',
    body: 'Exposing the structural core: hand-felled silk seams, interior grosgrain waist stay, and double-layered horsehair braid hem ensuring structural trumpet sweep.',
    craftMetrics: 'Grosgrain Stay • Horsehair Braid',
    focusPoint: 'Internal Atelier Structuring'
  },
  {
    phaseIndex: 5,
    phaseLetter: 'E',
    phaseCode: 'PHASE E — MACRO INSPECTION',
    title: 'Zardozi Wire Couching & Freshwater Pearls',
    headline: 'Ascending Lotus Filaments & River Pearls.',
    body: 'Macro artisan study: master aari artisans couch genuine metallic zari wire in ascending vine tendrils, punctuated by 45 hand-anchored freshwater river pearls.',
    craftMetrics: '428,000 Micro Stitches • 45 Freshwater Pearls',
    focusPoint: 'Metallic Threadwork & Pearls'
  },
  {
    phaseIndex: 6,
    phaseLetter: 'F',
    phaseCode: 'PHASE F — RETURN TO COMPLETE GARMENT',
    title: 'The Complete Couture Vision',
    headline: 'Poise, Light Reflection & Harmonic Proportion.',
    body: 'The camera recedes to encompass the full 2.4-metre sweep train and luminous champagne organza tiers under multi-directional studio illumination.',
    craftMetrics: '210 Artisan Hours • Single-Atelier Origin',
    focusPoint: 'Full Silhouette & Train Sweep'
  },
  {
    phaseIndex: 7,
    phaseLetter: 'G',
    phaseCode: 'PHASE G — TRANSITION INTO ATELIER & STORE',
    title: 'Commission Your Bespoke Couture',
    headline: 'Step into the 3D Atelier or Acquire the Piece.',
    body: 'Engage with the real-time 3D Atelier workspace to customize necklines, fabric lusters, and bespoke anatomical fittings, or initiate boutique acquisition.',
    craftMetrics: 'Haute Couture Made-to-Measure Active',
    focusPoint: 'Digital Atelier & Commission'
  }
];

const MEN_PHASES: RevealPhase[] = [
  {
    phaseIndex: 1,
    phaseLetter: 'A',
    phaseCode: 'PHASE A — FULL SILHOUETTE',
    title: 'Sovereign Tailored Stance',
    headline: 'The Unbroken Vertical Line.',
    body: 'The double-breasted tailored blazer stands poised on a charcoal dressform in soft daylight. Roped shoulders and balanced waist suppression define timeless architectural authority.',
    craftMetrics: 'Super 150s Merino • Architectural Drop',
    focusPoint: 'Full Tailored Posture'
  },
  {
    phaseIndex: 2,
    phaseLetter: 'B',
    phaseCode: 'PHASE B — CAMERA APPROACH',
    title: 'Peak Lapel & Silk Gorge Roll',
    headline: 'Silk Satin Facing & Hand-Guided AMF Stitching.',
    body: 'Approaching the upper chest: 45° angle satin peak lapels roll gracefully over the chest, bordered by continuous hand-guided 0.5mm AMF pick-stitching along the silk gorge.',
    craftMetrics: '18 Stitches / Inch • Pure Silk Satin Facing',
    focusPoint: 'Lapel Apex & Collar Roll'
  },
  {
    phaseIndex: 3,
    phaseLetter: 'C',
    phaseCode: 'PHASE C — CONTROLLED ORBIT',
    title: 'Roped Sleevehead & Rear Balance',
    headline: 'Flawless Back Drape & Double Rear Vents.',
    body: 'Controlled orbit reveals the clean line of the roped sleevehead, the suppression of the side seams, and twin rear vents engineered for effortless movement.',
    craftMetrics: 'Con Rollino Shoulder • Dual 9" Vents',
    focusPoint: 'Sleeve Head & Back Balance'
  },
  {
    phaseIndex: 4,
    phaseLetter: 'D',
    phaseCode: 'PHASE D — CONSTRUCTION REVEAL',
    title: 'Floating Horsehair Canvas Core',
    headline: 'Zero Fusibles • Anatomical Memory.',
    body: 'Internal construction exposed: hand-padded unbleached Mongolian horsehair chest canvas floats freely between face fabric and cupro lining, molding uniquely to the wearer.',
    craftMetrics: '3,200 Pad Stitches • Full Floating Canvas',
    focusPoint: 'Canvas Foundation & Chest Piece'
  },
  {
    phaseIndex: 5,
    phaseLetter: 'E',
    phaseCode: 'PHASE E — MACRO INSPECTION',
    title: 'Cast Brass Crests & Surgeon\'s Cuffs',
    headline: 'Bespoke Milled Buttons & Working Buttonholes.',
    body: 'Macro inspection of the double-breasted placket: cast brass buttons with antique patina, accompanied by genuine functional kissing horn cuff buttonholes cut by hand.',
    craftMetrics: '4 Cast Brass Crests • 4 Kissing Horn Cuffs',
    focusPoint: 'Crest Buttons & Hand Buttonholes'
  },
  {
    phaseIndex: 6,
    phaseLetter: 'F',
    phaseCode: 'PHASE F — RETURN TO COMPLETE GARMENT',
    title: 'Architectural Tailoring Unified',
    headline: 'Weight, Form & Savile Row Discipline.',
    body: 'Camera settles back into full elevation. The garment embodies structural precision, pristine drape, and quiet confidence suitable for gallery, boardroom, or gala.',
    craftMetrics: '120 Handcraft Hours • English & Varanasi Mills',
    focusPoint: 'Complete Architectural Blazer'
  },
  {
    phaseIndex: 7,
    phaseLetter: 'G',
    phaseCode: 'PHASE G — TRANSITION INTO ATELIER & STORE',
    title: 'Enter the Bespoke Tailoring Suite',
    headline: 'Personalize Cloth, Lapels & Made-to-Measure.',
    body: 'Explore cloth options in the 3D Atelier—from midnight barathea to Banarasi brocade—fine-tune button choices, or request made-to-measure tailoring.',
    craftMetrics: 'Bespoke Savile Row Cut Enabled',
    focusPoint: 'Digital Tailoring Workspace'
  }
];

export function ScrollGarmentCinematic({
  initialGender = 'kids',
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

  const phases =
    selectedGender === 'kids'
      ? KIDS_PHASES
      : selectedGender === 'women'
      ? WOMEN_PHASES
      : MEN_PHASES;
  const currentPhase = phases[activePhaseIndex] || phases[0];

  const videoSrc =
    selectedGender === 'men'
      ? '/assets/videos/mens-tailored-reveal-1080p.mp4'
      : '/assets/videos/womens-couture-reveal-1080p.mp4';

  const productId =
    selectedGender === 'kids'
      ? 'THREADOR-K-001'
      : selectedGender === 'women'
      ? 'THREADOR-W-001'
      : 'THREADOR-M-001';

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
            className={`gender-switch-btn ${selectedGender === 'kids' ? 'active' : ''}`}
            onClick={() => handleSwitchGender('kids')}
          >
            <Sparkles size={11} />
            <span>01 / KIDS: HEIRLOOM COUTURE</span>
          </button>
          <button
            type="button"
            className={`gender-switch-btn ${selectedGender === 'women' ? 'active' : ''}`}
            onClick={() => handleSwitchGender('women')}
          >
            <Sparkles size={11} />
            <span>02 / WOMEN: ATELIER GOWN</span>
          </button>
          <button
            type="button"
            className={`gender-switch-btn ${selectedGender === 'men' ? 'active' : ''}`}
            onClick={() => handleSwitchGender('men')}
          >
            <Scissors size={11} />
            <span>03 / MEN: TAILORED BLAZER</span>
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
            {selectedGender === 'kids' ? (
              <HeroCanvas
                gender="kids"
                scrollProgress={0.45}
                xrayMode="finished"
                forcedView={null}
                isTurntableActive={true}
              />
            ) : selectedGender === 'women' ? (
              <HeroCanvas
                gender="women"
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
                title={`${p.phaseCode} - ${p.title}`}
              >
                <span className="step-num">{p.phaseLetter}</span>
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
