import { useState } from 'react';
import { Cpu, ZoomIn, CheckCircle2 } from 'lucide-react';
import { XRayGarmentViewer } from '../scene/XRayGarmentViewer';
import type { XRayStage } from '../types';

export function GarmentXRaySection() {
  const [activeStage, setActiveStage] = useState<XRayStage>('finished');

  return (
    <section className="xray-section" id="xray">
      <div className="xray-header-bar">
        <div className="xray-tag">
          <Cpu size={14} />
          <span>SECTION 03 — 3D DECONSTRUCTION MATRIX</span>
        </div>
        <h2 className="xray-title">
          Garment <i>X-Ray.</i>
        </h2>
        <p className="xray-description">
          A physical deconstruction through real 3D geometry and material transitions.
          Inspect the outer skin, internal boning framework, and micro-textile filaments.
        </p>
      </div>

      {/* 3D X-Ray Inspection Viewport */}
      <div className="xray-viewport-container">
        {/* Layer Selector Tabs */}
        <div className="xray-layer-controls">
          <button
            type="button"
            className={`layer-btn ${activeStage === 'finished' ? 'active' : ''}`}
            onClick={() => setActiveStage('finished')}
          >
            <span className="layer-step">01</span>
            <div className="layer-info">
              <span className="layer-name">FINISHED GARMENT</span>
              <span className="layer-sub">PBR Silk Organza & Pearls</span>
            </div>
            {activeStage === 'finished' && <CheckCircle2 size={14} className="check-icon" />}
          </button>

          <button
            type="button"
            className={`layer-btn ${activeStage === 'construction' ? 'active' : ''}`}
            onClick={() => setActiveStage('construction')}
          >
            <span className="layer-step">02</span>
            <div className="layer-info">
              <span className="layer-name">CONSTRUCTION & BONING</span>
              <span className="layer-sub">Internal Chassis & Pattern Seams</span>
            </div>
            {activeStage === 'construction' && <CheckCircle2 size={14} className="check-icon" />}
          </button>

          <button
            type="button"
            className={`layer-btn ${activeStage === 'textile' ? 'active' : ''}`}
            onClick={() => setActiveStage('textile')}
          >
            <span className="layer-step">03</span>
            <div className="layer-info">
              <span className="layer-name">TEXTILE & EMBROIDERY</span>
              <span className="layer-sub">Macro Weave & Pearl Anchors</span>
            </div>
            {activeStage === 'textile' && <CheckCircle2 size={14} className="check-icon" />}
          </button>
        </div>

        {/* 3D Canvas */}
        <div className="xray-canvas-stage">
          <XRayGarmentViewer stage={activeStage} />

          {/* Interactive Hint */}
          <div className="canvas-interactive-hint">
            <ZoomIn size={13} />
            <span>DRAG TO ORBIT 360° — CAMERA AUTO-FRAMES SELECTED LAYER</span>
          </div>
        </div>

        {/* Live Technical Telemetry Panel */}
        <div className="xray-telemetry-panel">
          <div className="telemetry-header">
            <span className="telemetry-badge">LIVE 3D LAYER TELEMETRY</span>
            <span className="telemetry-id">ID: ARCH-COUTURE-07</span>
          </div>

          {activeStage === 'finished' && (
            <div className="telemetry-content">
              <h4>LAYER 01: EXTERNAL COUTURE COMPOSITION</h4>
              <p>
                Triple-ply translucent Mulberry silk organza sculpted over an opaque silk faille core.
                Dual-sided fluting harmonics produce organic drape folds with physical gravity.
              </p>
              <div className="telemetry-specs-grid">
                <div className="spec-card">
                  <span className="spec-label">FABRIC TRANSMISSION</span>
                  <span className="spec-value">62% Sheer Silk</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">SURFACE ROUGHNESS</span>
                  <span className="spec-value">0.26 Peau de Soie</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">TOTAL CRAFT HOURS</span>
                  <span className="spec-value">320 Hours</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">EMBELLISHMENTS</span>
                  <span className="spec-value">8,400 Seed Pearls</span>
                </div>
              </div>
            </div>
          )}

          {activeStage === 'construction' && (
            <div className="telemetry-content construction-theme">
              <h4>LAYER 02: STRUCTURAL FOUNDATION & CORSETRY</h4>
              <p>
                Reveals the internal structural armature. 10 contoured spiral steel boning ribs
                provide architectural posture without restricting natural breathing movement.
              </p>
              <div className="telemetry-specs-grid">
                <div className="spec-card">
                  <span className="spec-label">BONING CHANNELS</span>
                  <span className="spec-value">10 Spiral Ribs (0.5mm)</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">PATTERN PIECES</span>
                  <span className="spec-value">28 Bias-Cut Cuts</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">CANVAS FOUNDATION</span>
                  <span className="spec-value">Triple-Ply French Linen</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">INTERNAL SEAM ALLOWANCE</span>
                  <span className="spec-value">12 mm French Bound</span>
                </div>
              </div>
            </div>
          )}

          {activeStage === 'textile' && (
            <div className="telemetry-content textile-theme">
              <h4>LAYER 03: MACRO WEAVE & EMBROIDERY MICROSTRUCTURE</h4>
              <p>
                Microscopic inspection of the botanical embroidery vines. Continuous filament silk
                threads interwoven with spun gold metallic thread and hand-anchored pearl nodes.
              </p>
              <div className="telemetry-specs-grid">
                <div className="spec-card">
                  <span className="spec-label">WEFT DENSITY</span>
                  <span className="spec-value">38 g/m² Lyon Organza</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">METALLIC FILUM</span>
                  <span className="spec-value">24-Karat Spun Gold</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">HAND STITCHES</span>
                  <span className="spec-value">42,000+ Continuous</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">PEARL ANCHOR TENSION</span>
                  <span className="spec-value">Triple-Pass Silk Knots</span>
                </div>
              </div>
            </div>
          )}

          <div className="telemetry-footer">
            <span className="note">REAL 3D SHADER TRANSITION — NO FLAT IMAGE OVERLAYS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

