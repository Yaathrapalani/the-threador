import { useState } from 'react';
import { Eye, X } from 'lucide-react';
import { SAMPLE_COSTUMES } from '../data/threadorBrand';
import type { CostumeItem } from '../types';

export function GalleryPage() {
  const [filter, setFilter] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<CostumeItem | null>(null);

  const additionalItems: CostumeItem[] = [
    {
      id: 'gallery-07',
      title: 'Student Handloom Explorations (Grades 7–8)',
      category: 'annual-day',
      theme: 'Student Creation Portfolio',
      description: 'Zero-waste bias drape study constructed entirely from vegetable-dyed khadi by middle school learners.',
      image: 'student-khadi',
      tags: ['Student Work', 'Khadi Weave', 'Natural Dye']
    },
    {
      id: 'gallery-08',
      title: 'Behind the Scenes: Awadh Zardozi Workshop',
      category: 'cultural',
      theme: 'Master Artisan Collaboration',
      description: 'Documenting 80 hours of wooden frame zardozi embroidery with master craftsmen in Lucknow.',
      image: 'bts-zardozi',
      tags: ['Behind the Scenes', 'Zardozi', 'Artisan Hands']
    },
    {
      id: 'gallery-09',
      title: 'Annual Day Stage Dress Rehearsal',
      category: 'dance',
      theme: 'Stage Lighting Calibration',
      description: 'Testing fabric reflectance and skirt flare dynamics under 5,000-watt theatrical follow spots.',
      image: 'stage-rehearsal',
      tags: ['School Production', 'Stage Flow', 'Lighting']
    }
  ];

  const allItems = [...SAMPLE_COSTUMES, ...additionalItems];
  const displayed = filter === 'all' ? allItems : allItems.filter((item) => item.category === filter);

  return (
    <div className="page-view-wrapper gallery-page">
      <div className="page-hero-header">
        <span className="eyebrow">PAGE 05 — THE LIVING ARCHIVE</span>
        <h1 className="page-main-title">
          Stage, student<br />
          and <i>textile</i> gallery.
        </h1>
        <p className="page-lead-para">
          A visual record of theatrical costume productions, hands-on student design experiments,
          and indigenous textile explorations across schools in India.
        </p>

        {/* Filter Pills */}
        <div className="gallery-filter-bar">
          <button
            type="button"
            className={`filter-tab-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Work ({allItems.length})
          </button>
          <button
            type="button"
            className={`filter-tab-btn ${filter === 'annual-day' ? 'active' : ''}`}
            onClick={() => setFilter('annual-day')}
          >
            Annual Day & School Costumes
          </button>
          <button
            type="button"
            className={`filter-tab-btn ${filter === 'dance' ? 'active' : ''}`}
            onClick={() => setFilter('dance')}
          >
            Dance Academy Productions
          </button>
          <button
            type="button"
            className={`filter-tab-btn ${filter === 'cultural' ? 'active' : ''}`}
            onClick={() => setFilter('cultural')}
          >
            Cultural & Historic Shows
          </button>
          <button
            type="button"
            className={`filter-tab-btn ${filter === 'uniform' ? 'active' : ''}`}
            onClick={() => setFilter('uniform')}
          >
            Bespoke Academy Uniforms
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="gallery-portfolio-grid">
        {displayed.map((item) => (
          <article
            key={item.id}
            className="gallery-portfolio-card"
            onClick={() => setActiveItem(item)}
          >
            <div className="portfolio-media-thumb">
              <div className="thumb-artistic-gradient" />
              <span className="thumb-category-tag">{item.category.toUpperCase()}</span>
              <span className="thumb-inspect-hint">
                <Eye size={13} /> EXPAND SPECIFICATION
              </span>
            </div>

            <div className="portfolio-info">
              <h3>{item.title}</h3>
              <p className="portfolio-theme">Theme: {item.theme}</p>
              <p className="portfolio-desc">{item.description}</p>
              <div className="portfolio-tags">
                {item.tags.map((t, i) => (
                  <span key={i} className="spec-tag">{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox */}
      {activeItem && (
        <div className="lightbox-backdrop" onClick={() => setActiveItem(null)}>
          <div
            className="lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="lightbox-header">
              <div>
                <span className="lightbox-badge">{activeItem.category.toUpperCase()} PORTFOLIO ARCHIVE</span>
                <h3>{activeItem.title}</h3>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setActiveItem(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="lightbox-body">
              <div className="lightbox-media-box">
                <div className="stage-lighting-simulation" />
                <div className="simulation-caption">
                  <span>ATELIER ARCHIVE N° {activeItem.id.toUpperCase()}</span>
                  <span>ORIGINAL THEME: {activeItem.theme.toUpperCase()}</span>
                </div>
              </div>

              <div className="lightbox-details">
                <h4>PRODUCTION & TEXTILE DOSSIER</h4>
                <p className="lightbox-lead">{activeItem.theme}</p>
                <p className="lightbox-desc">{activeItem.description}</p>

                <div className="lightbox-specs-list">
                  <div className="spec-item">
                    <span className="s-name">TECHNICAL NOTES</span>
                    <span className="s-val">Custom patterned and constructed by The Threador Atelier masters</span>
                  </div>
                  <div className="spec-item">
                    <span className="s-name">MATERIAL COMPOSITION</span>
                    <span className="s-val">Organic handspun cotton, silk brocade, and metallic gold accents</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
