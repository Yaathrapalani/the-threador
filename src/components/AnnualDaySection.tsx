import { useState } from 'react';
import { CheckCircle2, Send, ShieldCheck, Eye } from 'lucide-react';
import { THREADOR_BRAND, SAMPLE_COSTUMES } from '../data/threadorBrand';
import { saveAnnualDayLead, generateWhatsAppLink } from '../services/leadService';
import type { CostumeItem } from '../types';

interface AnnualDaySectionProps {
  isFullPage?: boolean;
}

export function AnnualDaySection({ isFullPage = false }: AnnualDaySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<CostumeItem | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: '',
    studentsCount: '100-300',
    eventDate: '',
    themeIdeas: ''
  });
  const [errorMsg, setErrorMsg] = useState<string>('');

  const filteredCostumes =
    selectedCategory === 'all'
      ? SAMPLE_COSTUMES
      : SAMPLE_COSTUMES.filter((c) => c.category === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.schoolName || !formData.contactPerson || !formData.phone || !formData.email || !formData.city) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }

    setErrorMsg('');
    saveAnnualDayLead(formData);
    setFormSubmitted(true);
  };

  return (
    <section className={`annual-day-section ${isFullPage ? 'page-view' : ''}`} id="costume-atelier">
      {/* 1. Atelier Hero Banner */}
      <div className="annual-intro-container">
        <div className="section-badge-row">
          <span className="eyebrow">PART VI — COSTUME ATELIER & ANNUAL DAY EXPERIENCES</span>
          <span className="brand-pill">ONE STAGE. ONE MILLION DREAMS.</span>
        </div>
        <h2 className="annual-main-headline">
          ONE STAGE.<br />
          ONE MILLION <i>DREAMS.</i>
        </h2>
        <p className="annual-sub-headline">From vision to applause.</p>
        <p className="annual-body-lead">
          We transform school auditoriums into majestic theatrical experiences. Our end-to-end costume
          atelier combines original theme dramaturgy, professional choreography, bespoke music production,
          and stage-illuminating costumes.
        </p>
      </div>

      {/* 2. The 4-Phase Full Service Offering */}
      <div className="services-quad-container">
        <div className="quad-header">
          <span className="sub-tag">THE COMPLETE STAGE PRODUCTION ECOSYSTEM</span>
          <h3>End-to-End Orchestration</h3>
        </div>

        <div className="quad-grid">
          {THREADOR_BRAND.annualDayServices.map((srv) => (
            <div key={srv.num} className="service-quad-card">
              <span className="quad-num">{srv.num}</span>
              <h4 className="quad-title">{srv.title}</h4>
              <p className="quad-desc">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Interactive Costume Gallery & Categories */}
      <div className="costume-gallery-container" id="costume-gallery">
        <div className="gallery-header-row">
          <div className="gallery-title-box">
            <span className="sub-tag">STAGE ARCHIVES & PRODUCTION PORTFOLIO</span>
            <h3>Costumes Engineered for Light & Kinetic Motion</h3>
          </div>

          {/* Category Filter Pills */}
          <div className="gallery-filter-pills">
            {THREADOR_BRAND.portfolioCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="costume-cards-grid">
          {filteredCostumes.map((costume) => (
            <article
              key={costume.id}
              className="costume-card"
              onClick={() => setLightboxItem(costume)}
            >
              <div className="costume-card-media-placeholder">
                <div className="media-visual-glow" />
                <span className="costume-category-tag">{costume.category.toUpperCase()}</span>
                <span className="expand-overlay-hint">
                  <Eye size={13} /> INSPECT STAGE SPEC
                </span>
              </div>

              <div className="costume-card-content">
                <h4 className="costume-title">{costume.title}</h4>
                <p className="costume-theme-tag">Theme: {costume.theme}</p>
                <p className="costume-desc">{costume.description}</p>

                <div className="costume-tags-row">
                  {costume.tags.map((tag, i) => (
                    <span key={i} className="spec-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 4. Costume Lightbox Modal */}
      {lightboxItem && (
        <div className="lightbox-backdrop" onClick={() => setLightboxItem(null)}>
          <div
            className="lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="lightbox-header">
              <div>
                <span className="lightbox-badge">{lightboxItem.category.toUpperCase()} ARCHIVE</span>
                <h3>{lightboxItem.title}</h3>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setLightboxItem(null)}
              >
                ✕
              </button>
            </div>

            <div className="lightbox-body">
              <div className="lightbox-media-box">
                <div className="stage-lighting-simulation" />
                <div className="simulation-caption">
                  <span>THEATRICAL COSTUME ARCHIVE N° {lightboxItem.id.toUpperCase()}</span>
                  <span>STAGE LIGHTING: 3,200K WARM + 5,600K COOL SPOT</span>
                </div>
              </div>

              <div className="lightbox-details">
                <h4>THEME & NARRATIVE ARCHITECTURE</h4>
                <p className="lightbox-lead">{lightboxItem.theme}</p>
                <p className="lightbox-desc">{lightboxItem.description}</p>

                <div className="lightbox-specs-list">
                  <div className="spec-item">
                    <span className="s-name">FABRIC SPECIFICATION</span>
                    <span className="s-val">Stage-Tested Mulberry Silk, Heavy Sheer Organza, Metallic Lurex</span>
                  </div>
                  <div className="spec-item">
                    <span className="s-name">STAGE RIGGING</span>
                    <span className="s-val">Rapid Quick-Change Velcros & Continuous Tension Elastic Waistbands</span>
                  </div>
                  <div className="spec-item">
                    <span className="s-name">LIGHT REFLECTION</span>
                    <span className="s-val">Coated Metallic Sequins & High-Reflectance Zardozi Threadwork</span>
                  </div>
                </div>

                <div className="lightbox-action-row">
                  <a
                    href={generateWhatsAppLink('school', lightboxItem.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lightbox-enquire-btn"
                  >
                    Enquire for Your School Annual Day →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Annual Day School Enquiry Form */}
      <div className="annual-enquiry-section" id="annual-enquiry-form">
        <div className="form-wrapper-box">
          <div className="form-header-area">
            <span className="form-badge">RESERVING DATES FOR 2026–2027 ANNUAL DAYS</span>
            <h3>School Annual Day & Costume Consultation</h3>
            <p>
              Schedule an atelier consultation for your school. Our creative directors and costume
              masters will assist with theme design, production schedules, and custom stage wear quotes.
            </p>
          </div>

          {formSubmitted ? (
            <div className="form-success-box" role="status">
              <CheckCircle2 size={36} className="success-icon" />
              <h4>Consultation Request Received</h4>
              <p>
                Thank you, <strong>{formData.contactPerson}</strong> from <strong>{formData.schoolName}</strong>.
                Our Annual Day creative director will review your event date ({formData.eventDate || 'Upcoming Term'})
                and connect with you at {formData.phone} within 24 business hours.
              </p>
              <div className="success-actions">
                <button
                  type="button"
                  className="reset-form-btn"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      schoolName: '',
                      contactPerson: '',
                      phone: '',
                      email: '',
                      city: '',
                      studentsCount: '100-300',
                      eventDate: '',
                      themeIdeas: ''
                    });
                  }}
                >
                  Submit Another Event Request
                </button>
                <a
                  href={generateWhatsAppLink('school', formData.schoolName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-quick-btn"
                >
                  Chat Immediately on WhatsApp →
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="threador-form">
              {errorMsg && <div className="form-error-alert">{errorMsg}</div>}

              <div className="form-row two-cols">
                <div className="form-field">
                  <label htmlFor="schoolName">School / Dance Academy Name *</label>
                  <input
                    type="text"
                    id="schoolName"
                    required
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    placeholder="e.g. The Heritage Global School"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contactPerson">Principal / Coordinator Name *</label>
                  <input
                    type="text"
                    id="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Dr. Rajeshwari Sengupta"
                  />
                </div>
              </div>

              <div className="form-row three-cols">
                <div className="form-field">
                  <label htmlFor="schoolPhone">Direct Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    id="schoolPhone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="schoolEmail">Official Email Address *</label>
                  <input
                    type="email"
                    id="schoolEmail"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="events@heritageschool.edu.in"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="schoolCity">City / State *</label>
                  <input
                    type="text"
                    id="schoolCity"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Mumbai, New Delhi, Bengaluru"
                  />
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-field">
                  <label htmlFor="studentsCount">Estimated Number of Performing Students</label>
                  <select
                    id="studentsCount"
                    value={formData.studentsCount}
                    onChange={(e) => setFormData({ ...formData, studentsCount: e.target.value })}
                  >
                    <option value="50-100">50 – 100 Students</option>
                    <option value="100-300">100 – 300 Students</option>
                    <option value="300-600">300 – 600 Students</option>
                    <option value="600+">600+ Large Production</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="eventDate">Expected Event Month / Date</label>
                  <input
                    type="date"
                    id="eventDate"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="themeIdeas">Initial Theme Ideas or Production Vision</label>
                <textarea
                  id="themeIdeas"
                  rows={3}
                  value={formData.themeIdeas}
                  onChange={(e) => setFormData({ ...formData, themeIdeas: e.target.value })}
                  placeholder="e.g. 'Wings of Hope' — Journey through Indian maritime history, freedom struggle, and space exploration..."
                />
              </div>

              <div className="form-footer-bar">
                <p className="privacy-guarantee-note">
                  <ShieldCheck size={13} className="shield-icon" />
                  Your institution's dates and production details are held with strict confidentiality.
                </p>

                <button type="submit" className="form-submit-btn">
                  <span>REQUEST STAGE CONSULTATION</span>
                  <Send size={14} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
