import { useState, useRef, useCallback, useEffect } from 'react';
import { Scissors, Sparkles, Sliders, RotateCcw, ArrowRight, BookOpen, Drama } from 'lucide-react';
import { AtelierDualScene } from '../scene/AtelierDualScene';
import type { AtelierGender, PageId } from '../types';

interface DividedAtelierProps {
  onNavigatePage: (page: PageId) => void;
  onSelectCollection: (atelier: AtelierGender) => void;
}

export function DividedAtelier({ onNavigatePage, onSelectCollection }: DividedAtelierProps) {
  const [splitRatio, setSplitRatio] = useState<number>(50); // 50% split default
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dragging logic for the central architectural divider
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    const percent = Math.round(relativeX * 100);
    // Enforce strict bounds: 25% to 75%
    const clamped = Math.min(Math.max(percent, 25), 75);
    setSplitRatio(clamped);
  }, [isDragging]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already lost
    }
  }, []);

  // Keyboard navigation for divider accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSplitRatio((prev) => Math.max(prev - 2, 25));
    } else if (e.key === 'ArrowRight') {
      setSplitRatio((prev) => Math.min(prev + 2, 75));
    } else if (e.key === 'Home') {
      setSplitRatio(50);
    }
  };

  // Prevent scroll gestures when dragging
  useEffect(() => {
    const handleGlobalUp = () => setIsDragging(false);
    window.addEventListener('pointerup', handleGlobalUp);
    return () => window.removeEventListener('pointerup', handleGlobalUp);
  }, []);

  return (
    <section className="divided-atelier-section" id="split-experience">
      <div className="section-intro">
        <div className="section-badge-row">
          <span className="eyebrow">PART III — SIGNATURE COUTURE DUALITY</span>
          <span className="brand-pill">INTERACTIVE 3D SPLIT-SCREEN</span>
        </div>
        <h2 className="section-title">
          The Living Fabric <i>of Duality.</i>
        </h2>
        <p className="section-sub">
          Drag the central architectural divider or use the slider controls below to resize and inspect
          the dual philosophies of form and fluid movement.
        </p>

        {/* Interactive Resizing Controls Bar (Per Prompt Specification) */}
        <div className="divider-control-bar">
          <div className="control-slider-group">
            <Sliders size={14} className="control-icon" />
            <span className="control-label">DIVIDER BALANCE:</span>
            <input
              type="range"
              min="25"
              max="75"
              step="1"
              value={splitRatio}
              onChange={(e) => setSplitRatio(Number(e.target.value))}
              className="split-range-input"
              aria-label="Adjust Men/Women divider split percentage"
            />
            <span className="ratio-display">
              {splitRatio}% MEN / {100 - splitRatio}% WOMEN
            </span>
          </div>

          <div className="preset-buttons-group">
            <button
              type="button"
              className={`preset-btn ${splitRatio === 75 ? 'active' : ''}`}
              onClick={() => setSplitRatio(75)}
              title="Expand Men's Atelier to 75%"
            >
              EMPHASISE MEN (75/25)
            </button>
            <button
              type="button"
              className={`preset-btn ${splitRatio === 50 ? 'active' : ''}`}
              onClick={() => setSplitRatio(50)}
              title="Reset divider to equal 50/50 balance"
            >
              <RotateCcw size={12} className="inline-icon" /> RESET 50/50
            </button>
            <button
              type="button"
              className={`preset-btn ${splitRatio === 25 ? 'active' : ''}`}
              onClick={() => setSplitRatio(25)}
              title="Expand Women's Atelier to 75%"
            >
              EMPHASISE WOMEN (25/75)
            </button>
          </div>
        </div>
      </div>

      {/* Full-Viewport Interactive Resizable Split Container */}
      <div
        ref={containerRef}
        className={`atelier-split-container ${isDragging ? 'dragging-active' : ''}`}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* =========================================
            LEFT CHAMBER: 01 / MEN
            STRUCTURE / FORM
        ========================================= */}
        <div
          className="atelier-chamber chamber-men"
          style={{ width: `${splitRatio}%` }}
        >
          {/* Chamber Header & Taxonomy */}
          <div className="chamber-header">
            <div className="taxonomy-tag">
              <Scissors size={13} />
              <span>01 / MEN</span>
            </div>
            <span className="chamber-discipline">STRUCTURE / FORM</span>
          </div>

          {/* 3D Independent Tailored Scene */}
          <div className="chamber-canvas-wrap">
            <AtelierDualScene
              gender="men"
              isHovered={splitRatio > 50}
              onExplore={() => onSelectCollection('men')}
            />
          </div>

          {/* Chamber Editorial & Strategic Conversion Pathway */}
          <div className="chamber-editorial">
            <span className="chamber-season">BESPOKE ARCHITECTURE & SHARP CANVAS</span>
            <h3 className="chamber-headline">
              The Architecture<br />of <i>Form.</i>
            </h3>
            <p className="chamber-body">
              Engineered with floating natural horsehair canvas and zero synthetic fusible interlinings.
              Precision pad-stitching creates anatomical memory that contours to the body over time.
            </p>

            <div className="chamber-pathway-box">
              <div className="pathway-header">
                <BookOpen size={14} className="pathway-icon" />
                <span>BUSINESS PATHWAY: LEARN</span>
              </div>
              <p>
                Teach children how structured garments are built from fiber to floating canvas.
                Our hands-on school programs demystify pattern drafting and tailoring mechanics.
              </p>
              <button
                type="button"
                className="pathway-action-btn"
                onClick={() => onNavigatePage('course')}
              >
                <span>EXPLORE EDUCATION PROGRAMS</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================
            ARCHITECTURAL VERTICAL DIVIDER
            Draggable, responsive, with keyboard accessibility
        ========================================= */}
        <div
          className={`architectural-divider ${isDragging ? 'is-dragging' : ''}`}
          style={{ left: `${splitRatio}%` }}
          onPointerDown={handlePointerDown}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="separator"
          aria-valuenow={splitRatio}
          aria-valuemin={25}
          aria-valuemax={75}
          aria-label="Interactive Men and Women Divider. Drag horizontally or use arrow keys."
        >
          <div className="divider-line" />
          <div className="divider-drag-handle" title="Drag to resize Men / Women chambers">
            <div className="drag-grip-dots">
              <span /><span /><span />
            </div>
            <span className="handle-percent-text">
              {splitRatio} / {100 - splitRatio}
            </span>
          </div>
        </div>

        {/* =========================================
            RIGHT CHAMBER: 02 / WOMEN
            MOVEMENT / EXPRESSION
        ========================================= */}
        <div
          className="atelier-chamber chamber-women"
          style={{ width: `${100 - splitRatio}%` }}
        >
          {/* Chamber Header & Taxonomy */}
          <div className="chamber-header">
            <div className="taxonomy-tag">
              <Sparkles size={13} />
              <span>02 / WOMEN</span>
            </div>
            <span className="chamber-discipline">MOVEMENT / EXPRESSION</span>
          </div>

          {/* 3D Independent Couture Scene */}
          <div className="chamber-canvas-wrap">
            <AtelierDualScene
              gender="women"
              isHovered={splitRatio < 50}
              onExplore={() => onSelectCollection('women')}
            />
          </div>

          {/* Chamber Editorial & Strategic Conversion Pathway */}
          <div className="chamber-editorial">
            <span className="chamber-season">HAUTE COUTURE FLUIDITÉ & INDIAN SILK</span>
            <h3 className="chamber-headline">
              The Poetry<br />of <i>Drape.</i>
            </h3>
            <p className="chamber-body">
              Cut entirely on a 45° geometric bias, allowing mulberry silk organza to flow with organic
              grace. Layered petals, botanical zardozi threads, and river pearls celebrate kinetic expression.
            </p>

            <div className="chamber-pathway-box">
              <div className="pathway-header">
                <Drama size={14} className="pathway-icon" />
                <span>BUSINESS PATHWAY: CREATE</span>
              </div>
              <p>
                From school auditoriums to grand dance productions, our costume atelier brings stage
                dreams to life with custom choreography, themes, and illuminating costumes.
              </p>
              <button
                type="button"
                className="pathway-action-btn create-variant"
                onClick={() => onNavigatePage('annual-day')}
              >
                <span>EXPLORE ANNUAL DAY ATELIER</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
