import { useState } from 'react';
import { ArrowUpRight, Clock, MapPin, X, ShieldCheck } from 'lucide-react';
import { MENS_COLLECTION, WOMENS_COLLECTION } from '../data/garments';
import type { AtelierGender, GarmentStory } from '../types';

interface CollectionSectionProps {
  selectedAtelierFilter: AtelierGender | 'all';
  onFilterChange: (filter: AtelierGender | 'all') => void;
}

export function CollectionSection({
  selectedAtelierFilter,
  onFilterChange
}: CollectionSectionProps) {
  const [activeDossier, setActiveDossier] = useState<GarmentStory | null>(null);

  // Combine collections based on filter
  const allGarments = [...WOMENS_COLLECTION, ...MENS_COLLECTION];
  const displayedGarments =
    selectedAtelierFilter === 'all'
      ? allGarments
      : allGarments.filter((g) => g.atelier === selectedAtelierFilter);

  return (
    <section className="collection-section" id="collection">
      <div className="collection-header">
        <div className="collection-title-wrap">
          <span className="eyebrow">04 — THE ARCHIVE CATALOGUE</span>
          <h2 className="collection-title">
            The Living <i>Collection.</i>
          </h2>
          <p className="collection-sub">
            Every piece is an unrepeatable dialogue between raw terrestrial fiber and
            hundreds of hours of artisanal patience.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="collection-filters">
          <button
            type="button"
            className={`filter-btn ${selectedAtelierFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            ALL ARCHIVES ({allGarments.length})
          </button>
          <button
            type="button"
            className={`filter-btn ${selectedAtelierFilter === 'women' ? 'active' : ''}`}
            onClick={() => onFilterChange('women')}
          >
            WOMEN’S COUTURE ({WOMENS_COLLECTION.length})
          </button>
          <button
            type="button"
            className={`filter-btn ${selectedAtelierFilter === 'men' ? 'active' : ''}`}
            onClick={() => onFilterChange('men')}
          >
            MEN’S BESPOKE ({MENS_COLLECTION.length})
          </button>
        </div>
      </div>

      {/* Garment Cards Grid */}
      <div className="collection-grid">
        {displayedGarments.map((garment) => {
          const isWomen = garment.atelier === 'women';
          return (
            <article key={garment.id} className={`garment-card ${garment.atelier}`}>
              {/* Card Header */}
              <div className="card-top">
                <span className="card-atelier-badge">
                  {isWomen ? 'ATELIER FEMME' : 'ATELIER HOMME'} — {garment.season}
                </span>
                <span className="card-hours">
                  <Clock size={12} />
                  {garment.craftsmanshipHours} CRAFT HOURS
                </span>
              </div>

              {/* Garment Title & Silhouette */}
              <div className="card-body">
                <h3 className="card-name">{garment.name}</h3>
                <p className="card-silhouette">{garment.silhouette}</p>
                <p className="card-desc">{garment.description}</p>
              </div>

              {/* Technical Specifications preview */}
              <div className="card-specs">
                <div className="spec-row">
                  <span className="spec-label">FABRIC</span>
                  <span className="spec-val">{garment.fabric}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">ORIGIN</span>
                  <span className="spec-val">
                    <MapPin size={11} className="inline-icon" /> {garment.origin}
                  </span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">ARTISAN</span>
                  <span className="spec-val">{garment.leadArtisan}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">STITCHES</span>
                  <span className="spec-val">{garment.metrics.handStitches} hand stitches</span>
                </div>
              </div>

              {/* Inspect Button */}
              <button
                type="button"
                className="card-inspect-btn"
                onClick={() => setActiveDossier(garment)}
              >
                <span>EXAMINE CRAFTSMANSHIP DOSSIER</span>
                <ArrowUpRight size={14} />
              </button>
            </article>
          );
        })}
      </div>

      {/* Garment Craftsmanship Dossier Modal */}
      {activeDossier && (
        <div className="dossier-modal-backdrop" onClick={() => setActiveDossier(null)}>
          <div
            className="dossier-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="dossier-header">
              <div className="dossier-badges">
                <span className="dossier-atelier-tag">
                  {activeDossier.atelier === 'women' ? 'HAUTE COUTURE FEMME' : 'BESPOKE TAILORING HOMME'}
                </span>
                <span className="dossier-code">ARCHIVE NO. {activeDossier.id.toUpperCase()}</span>
              </div>
              <button
                type="button"
                className="close-dossier-btn"
                onClick={() => setActiveDossier(null)}
                aria-label="Close Dossier"
              >
                <X size={20} />
              </button>
            </div>

            <div className="dossier-content">
              <h2 className="dossier-title">{activeDossier.name}</h2>
              <p className="dossier-silhouette-lead">{activeDossier.silhouette}</p>

              <div className="dossier-lead-quote">
                <p>"{activeDossier.description}"</p>
                <span className="quote-author">
                  — {activeDossier.leadArtisan}, {activeDossier.origin}
                </span>
              </div>

              {/* Structural Details */}
              <div className="dossier-section">
                <h4>CONSTRUCTION & ARCHITECTURAL HIGHLIGHTS</h4>
                <ul className="dossier-details-list">
                  {activeDossier.details.map((detail, idx) => (
                    <li key={idx}>
                      <ShieldCheck size={14} className="list-icon" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Material Composition & Provenance */}
              <div className="dossier-section">
                <h4>MATERIAL PROVENANCE & WEAVE SPECIFICATIONS</h4>
                <div className="dossier-grid">
                  <div className="dossier-card">
                    <span className="d-label">FIBER COMPOSITION</span>
                    <span className="d-value">{activeDossier.materials.composition}</span>
                  </div>
                  <div className="dossier-card">
                    <span className="d-label">FABRIC WEIGHT</span>
                    <span className="d-value">{activeDossier.materials.weight}</span>
                  </div>
                  <div className="dossier-card">
                    <span className="d-label">WEAVE STRUCTURE</span>
                    <span className="d-value">{activeDossier.materials.weave}</span>
                  </div>
                  <div className="dossier-card">
                    <span className="d-label">SUPPLY CHAIN PROVENANCE</span>
                    <span className="d-value">{activeDossier.materials.provenance}</span>
                  </div>
                </div>
              </div>

              {/* Craftsmanship Metrics */}
              <div className="dossier-metrics-banner">
                <div className="metric-col">
                  <span className="col-num">{activeDossier.craftsmanshipHours}</span>
                  <span className="col-label">HOURS OF HAND PATIENCE</span>
                </div>
                <div className="metric-col">
                  <span className="col-num">{activeDossier.metrics.handStitches}</span>
                  <span className="col-label">INDIVIDUAL STITCHES</span>
                </div>
                <div className="metric-col">
                  <span className="col-num">{activeDossier.metrics.patternPieces}</span>
                  <span className="col-label">PATTERN PIECES</span>
                </div>
                {activeDossier.metrics.pearlCount && (
                  <div className="metric-col">
                    <span className="col-num">{activeDossier.metrics.pearlCount.toLocaleString()}</span>
                    <span className="col-label">NATURAL SEED PEARLS</span>
                  </div>
                )}
              </div>
            </div>

            <div className="dossier-footer">
              <button
                type="button"
                className="dossier-close-bar-btn"
                onClick={() => setActiveDossier(null)}
              >
                RETURN TO COLLECTION
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

