import { Camera, Eye, RotateCw, ZoomIn, Sparkles, Scissors, Layers } from 'lucide-react';
import type { GarmentCameraView } from '../types';
import { GARMENT_REGISTRY } from '../data/garmentRegistry';

interface GarmentViewInspectorProps {
  currentView: GarmentCameraView;
  onSelectView: (view: GarmentCameraView) => void;
  isTurntableActive?: boolean;
  onToggleTurntable?: () => void;
  garmentId?: string;
}

const VIEW_METADATA: Record<
  GarmentCameraView,
  { label: string; sub: string; icon: typeof Camera; desc: string; fov: string }
> = {
  front: {
    label: '01 / FRONT',
    sub: 'Full Composition',
    icon: Camera,
    desc: 'Centred full-body couture silhouette and waistline balance.',
    fov: '50mm Studio Prime (32° FOV)'
  },
  threeQuarter: {
    label: '02 / 3/4 VIEW',
    sub: 'Volume & Folds',
    icon: Eye,
    desc: 'Reveals layered organza fluting, depth harmonics, and lateral drape.',
    fov: '50mm Studio Prime (32° FOV)'
  },
  side: {
    label: '03 / PROFILE',
    sub: 'Corset Curvature',
    icon: Layers,
    desc: 'Anatomical sweetheart bustline, wasp waist contour, and train projection.',
    fov: '65mm Editorial Lens (30° FOV)'
  },
  back: {
    label: '04 / REAR',
    sub: 'Closure & Structure',
    icon: RotateCw,
    desc: 'Concealed silk loop placket, covered pearl buttons, and spine boning.',
    fov: '50mm Studio Prime (32° FOV)'
  },
  macro: {
    label: '05 / MACRO',
    sub: 'Textile & Zari Weave',
    icon: ZoomIn,
    desc: 'Mulberry silk organza weave structure and micro-wire couching.',
    fov: '90mm Macro Telephoto (24° FOV)'
  },
  stitching: {
    label: '06 / STITCHING',
    sub: 'Artisan Seams',
    icon: Scissors,
    desc: 'French felled seams, bias-bound tape, and hand-worked milanese loops.',
    fov: '105mm Macro Prime (22° FOV)'
  }
};

export function GarmentViewInspector({
  currentView,
  onSelectView,
  isTurntableActive = false,
  onToggleTurntable,
  garmentId = 'THREADOR-W-001'
}: GarmentViewInspectorProps) {
  const meta = VIEW_METADATA[currentView];
  const record = GARMENT_REGISTRY[garmentId] || GARMENT_REGISTRY['THREADOR-W-001'];

  return (
    <div className="garment-view-inspector-bar" aria-label="Garment View Inspection Pipeline">
      {/* 1. Header & Active Angle Telemetry */}
      <div className="inspector-telemetry-header">
        <div className="telemetry-badge-group">
          <span className="live-lens-tag">
            <Camera size={12} className="inline-icon" />
            OPTICAL LENS: {meta.fov}
          </span>
          <span className="live-angle-name">{meta.label} — {meta.sub.toUpperCase()}</span>
        </div>

        <p className="telemetry-angle-desc">{meta.desc}</p>
      </div>

      {/* 2. Canonical Angle Selector Buttons */}
      <div className="inspector-views-grid" role="tablist">
        {(Object.keys(VIEW_METADATA) as GarmentCameraView[]).map((viewKey) => {
          const item = VIEW_METADATA[viewKey];
          const Icon = item.icon;
          const isActive = currentView === viewKey;

          return (
            <button
              key={viewKey}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`inspector-view-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectView(viewKey)}
            >
              <Icon size={14} className="pill-icon" />
              <div className="pill-text-group">
                <span className="pill-label">{item.label}</span>
                <span className="pill-sub">{item.sub}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Turntable & Craftsmanship Footer */}
      <div className="inspector-bottom-controls">
        <div className="craft-spec-item">
          <span className="spec-label">ESTIMATED STITCHES:</span>
          <span className="spec-value">{record.embroideryDetails.stitchCountEst.toLocaleString()} Hand Stitches</span>
        </div>

        {onToggleTurntable && (
          <button
            type="button"
            className={`turntable-toggle-btn ${isTurntableActive ? 'active' : ''}`}
            onClick={onToggleTurntable}
            aria-pressed={isTurntableActive}
          >
            <RotateCw size={13} className={isTurntableActive ? 'spin-icon' : ''} />
            <span>{isTurntableActive ? 'PAUSE 360° TURNTABLE' : 'AUTO 360° TURNTABLE'}</span>
          </button>
        )}

        <div className="craft-spec-item">
          <span className="spec-label">CRAFTSMANSHIP:</span>
          <span className="spec-value">
            <Sparkles size={11} className="inline-sparkle" />
            {record.embroideryDetails.technique}
          </span>
        </div>
      </div>
    </div>
  );
}

