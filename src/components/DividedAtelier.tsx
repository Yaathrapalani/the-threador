import { useState, useRef, useCallback, useEffect } from 'react';
import { Scissors, Sparkles, ArrowRight, BookOpen, Drama } from 'lucide-react';
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
    // Enforce strict bounds: 20% to 80%
    const clamped = Math.min(Math.max(percent, 20), 80);
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
      setSplitRatio((prev) => Math.max(prev - 2, 20));
    } else if (e.key === 'ArrowRight') {
      setSplitRatio((prev) => Math.min(prev + 2, 80));
    } else if (e.key === 'Home') {
      setSplitRatio(50);
    }
  };

  // Prevent drag state sticking
  useEffect(() => {
    const handleGlobalUp = () => setIsDragging(false);
    window.addEventListener('pointerup', handleGlobalUp);
    return () => window.removeEventListener('pointerup', handleGlobalUp);
  }, []);

  return (
    <section className="divided-atelier-section minimalist-atelier" id="split-experience">
      {/* Discreet Overhead Title Overlay */}
      <div className="atelier-overhead-pill" aria-hidden="true">
        <span className="duality-dot" />
        <span className="duality-text">PART III — THE LIVING FABRIC OF DUALITY</span>
        <span className="duality-sep">•</span>
        <span className="duality-hint">DRAG DIVIDER TO EXPLORE (MEN {splitRatio}% / WOMEN {100 - splitRatio}%)</span>
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
            STRUCTURE & FORM
        ========================================= */}
        <div
          className="atelier-chamber chamber-men"
          style={{ width: `${splitRatio}%` }}
        >
          {/* Chamber Header */}
          <div className="chamber-header">
            <div className="taxonomy-tag">
              <Scissors size={13} />
              <span>01 / MEN</span>
            </div>
            <span className="chamber-discipline">STRUCTURE & TAILORING</span>
          </div>

          {/* 3D Independent Tailored Scene */}
          <div className="chamber-canvas-wrap">
            <AtelierDualScene
              gender="men"
              isHovered={splitRatio > 50}
              onExplore={() => onSelectCollection('men')}
            />
          </div>

          {/* Chamber Minimalist Floating Footer Card */}
          <div className="chamber-floating-card men-card">
            <span className="card-garment-title">THE TAILORED BLAZER</span>
            <p className="card-garment-desc">
              Midnight Navy Australian merino wool, hand-padded satin peak lapels, floating horsehair canvas.
            </p>
            <button
              type="button"
              className="card-action-btn"
              onClick={() => onNavigatePage('course')}
            >
              <BookOpen size={12} />
              <span>FASHION EDUCATION PROGRAMMES</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* =========================================
            ARCHITECTURAL VERTICAL DIVIDER
            Draggable hairline with golden circular pill
        ========================================= */}
        <div
          className={`architectural-divider ${isDragging ? 'is-dragging' : ''}`}
          style={{ left: `${splitRatio}%` }}
          onPointerDown={handlePointerDown}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="separator"
          aria-valuenow={splitRatio}
          aria-valuemin={20}
          aria-valuemax={80}
          aria-label="Interactive Men and Women Divider. Drag horizontally or use arrow keys."
        >
          <div className="divider-line" />
          <div className="divider-drag-handle" title="Drag to balance Men / Women ateliers">
            <span className="handle-percent-text">{splitRatio}%</span>
          </div>
        </div>

        {/* =========================================
            RIGHT CHAMBER: 02 / WOMEN
            MOVEMENT & DRAPE
        ========================================= */}
        <div
          className="atelier-chamber chamber-women"
          style={{ width: `${100 - splitRatio}%` }}
        >
          {/* Chamber Header */}
          <div className="chamber-header">
            <div className="taxonomy-tag">
              <Sparkles size={13} />
              <span>02 / WOMEN</span>
            </div>
            <span className="chamber-discipline">COUTURE & FLUID DRAPE</span>
          </div>

          {/* 3D Independent Couture Scene */}
          <div className="chamber-canvas-wrap">
            <AtelierDualScene
              gender="women"
              isHovered={splitRatio < 50}
              onExplore={() => onSelectCollection('women')}
            />
          </div>

          {/* Chamber Minimalist Floating Footer Card */}
          <div className="chamber-floating-card women-card">
            <span className="card-garment-title">THE ATELIER GOWN</span>
            <p className="card-garment-desc">
              Layered translucent mulberry silk organza, hand-embroidered botanical zardozi, freshwater river pearls.
            </p>
            <button
              type="button"
              className="card-action-btn"
              onClick={() => onNavigatePage('annual-day')}
            >
              <Drama size={12} />
              <span>ANNUAL DAY COSTUME ATELIER</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
