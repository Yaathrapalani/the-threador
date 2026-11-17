import { ArrowUp } from 'lucide-react';
import { THREADOR_BRAND } from '../data/threadorBrand';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="atelier-footer">
      <div className="footer-top-row">
        <div className="footer-brand">
          <span className="footer-logo">
            {THREADOR_BRAND.name} <span>/</span> {THREADOR_BRAND.tagline}
          </span>
          <p className="footer-mission">
            “{THREADOR_BRAND.corePhilosophy}” — Fashion education rooted in India, connecting
            children with Indian textiles, materials, crafts, making processes, fashion industries,
            and contemporary design.
          </p>
        </div>

        <div className="footer-columns">
          <div className="footer-col">
            <span className="col-heading">BUSINESS PATHWAYS</span>
            <ul>
              <li><span>LEARN: School Fashion Curriculum</span></li>
              <li><span>LEARN: Certification Courses (Grades 1–8)</span></li>
              <li><span>CREATE: Annual Day Costume Atelier</span></li>
              <li><span>CREATE: Dance Academy Productions</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="col-heading">THE FIVE FOUNDATIONS</span>
            <ul>
              <li><span>01. Culture — Heritage Roots</span></li>
              <li><span>02. Material — Land & Fiber</span></li>
              <li><span>03. Making — Craft & Weave</span></li>
              <li><span>04. Industry — The Ecosystem</span></li>
              <li><span>05. Creation — Global Runways</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="col-heading">STUDIO HUBS</span>
            <ul>
              <li><span>New Delhi Atelier & Studio</span></li>
              <li><span>Mumbai Production Hub</span></li>
              <li><span>Varanasi & Lyon Weaving Alliances</span></li>
              <li><span>Ethical Handloom Ecosystem</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom-row">
        <div className="footer-legal">
          <span>© 2026 THE THREADOR. ALL RIGHTS RESERVED.</span>
          <span className="separator">•</span>
          <span>FASHION EDUCATION & COSTUME ATELIER ROOTED IN INDIA</span>
        </div>

        <button
          type="button"
          className="back-to-top-btn"
          onClick={scrollToTop}
          aria-label="Back to Top"
        >
          <span>RETURN TO TOP</span>
          <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
