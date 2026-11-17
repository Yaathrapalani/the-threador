import { X, Cpu, CheckCircle2, AlertCircle, FileCode } from 'lucide-react';
import type { ModelAssetInfo } from '../types';

interface AssetStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetInfo: ModelAssetInfo;
}

export function AssetStatusModal({ isOpen, onClose, assetInfo }: AssetStatusModalProps) {
  if (!isOpen) return null;

  return (
    <div className="asset-modal-backdrop" onClick={onClose}>
      <div
        className="asset-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="asset-modal-header">
          <div className="modal-title-group">
            <Cpu size={16} className="modal-icon" />
            <div>
              <h3>3D Asset Architecture & Pipeline Inspector</h3>
              <p>Technical art-direction status for Three.js & WebGL rendering</p>
            </div>
          </div>
          <button
            type="button"
            className="close-modal-btn"
            onClick={onClose}
            aria-label="Close Inspector"
          >
            <X size={18} />
          </button>
        </div>

        <div className="asset-modal-body">
          {/* Active Status Card */}
          <div className={`status-summary-card ${assetInfo.isExternalGlb ? 'prod' : 'prototype'}`}>
            <div className="summary-status-header">
              <span className="summary-dot" />
              <span className="summary-title">
                {assetInfo.isExternalGlb
                  ? 'PRODUCTION GLB PIPELINE ACTIVE'
                  : 'BESPOKE HAUTE COUTURE 3D PROTOTYPE ACTIVE'}
              </span>
            </div>
            <p className="summary-desc">
              {assetInfo.isExternalGlb
                ? 'External model loaded from public/models/hero-garment.glb with complete PBR material binding.'
                : 'Active scene is rendered with our bespoke procedural haute couture dressform: dual-ply translucent silk organza, parametric drape fluting, 10 structural boning ribs, botanical embroidery splines, and 45 discrete 3D pearl cabochons.'}
            </p>
          </div>

          {/* Technical Telemetry */}
          <div className="technical-telemetry-grid">
            <div className="telemetry-stat">
              <span className="stat-label">ASSET SOURCE</span>
              <span className="stat-value">{assetInfo.modelPath}</span>
            </div>
            <div className="telemetry-stat">
              <span className="stat-label">TRIANGLE COUNT</span>
              <span className="stat-value">{assetInfo.triangles.toLocaleString()} TRIS</span>
            </div>
            <div className="telemetry-stat">
              <span className="stat-label">VERTEX COUNT</span>
              <span className="stat-value">{assetInfo.vertexCount.toLocaleString()} VERTS</span>
            </div>
            <div className="telemetry-stat">
              <span className="stat-label">SHADER PIPELINE</span>
              <span className="stat-value">{assetInfo.shaderTechnique}</span>
            </div>
          </div>

          {/* Production Asset Pipeline Guidelines */}
          <div className="pipeline-guidelines-section">
            <h4>
              <FileCode size={14} className="inline-icon" /> PRODUCTION ASSET DROP SPECIFICATION
            </h4>
            <p>
              To replace the procedural couture prototype with your studio-scanned or Blender-modelled
              couture asset, place the optimized file at:
            </p>
            <div className="code-block-box">
              <code>public/models/hero-garment.glb</code>
            </div>

            <div className="pipeline-requirements-list">
              <div className="req-item">
                <CheckCircle2 size={13} className="req-check" />
                <div>
                  <strong>Mesh Compression:</strong> Draco or Meshopt geometry compression
                  (target &lt; 8 MB for 60 FPS mobile WebGL).
                </div>
              </div>
              <div className="req-item">
                <CheckCircle2 size={13} className="req-check" />
                <div>
                  <strong>Texture Maps:</strong> KTX2 / Basis Universal compressed textures
                  (2048×2048 base color, roughness/metallic ORM, normal, and clearcoat/sheen).
                </div>
              </div>
              <div className="req-item">
                <CheckCircle2 size={13} className="req-check" />
                <div>
                  <strong>PBR Materials:</strong> Standard glTF 2.0 PBR with <code>KHR_materials_transmission</code>{' '}
                  for silk organza translucency and <code>KHR_materials_sheen</code> for couture silk luster.
                </div>
              </div>
              <div className="req-item">
                <AlertCircle size={13} className="req-warn" />
                <div>
                  <strong>Integrity Rule:</strong> The scene automatically hot-detects the presence of{' '}
                  <code>hero-garment.glb</code> and switches seamlessly without modifying application code.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="asset-modal-footer">
          <button type="button" className="modal-primary-btn" onClick={onClose}>
            CLOSE INSPECTOR
          </button>
        </div>
      </div>
    </div>
  );
}

