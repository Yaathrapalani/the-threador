import { useState } from 'react';
import { Menu, X, Cpu, Eye, BookOpen, Drama } from 'lucide-react';
import type { ModelAssetInfo, PageId } from '../types';

interface HeaderProps {
  activePage: PageId;
  onNavigatePage: (page: PageId) => void;
  assetInfo: ModelAssetInfo;
  onOpenAssetModal: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export function Header({
  activePage,
  onNavigatePage,
  assetInfo,
  onOpenAssetModal,
  reducedMotion,
  onToggleReducedMotion
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleNav = (page: PageId) => {
    onNavigatePage(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="topbar">
        {/* Brand Group */}
        <div className="brand-group">
          <button
            type="button"
            className="wordmark-btn"
            onClick={() => handleNav('home')}
            aria-label="The Threador Home"
          >
            THE THREADOR
          </button>
          <span className="brand-tagline">MY STORY, THREADED. • INDIA</span>
        </div>

        {/* Central Editorial Navigation (All 6 Pages) */}
        <nav className="topbar-nav" aria-label="Main Navigation">
          <button
            type="button"
            className={`nav-link-btn ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            HOME
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activePage === 'about' ? 'active' : ''}`}
            onClick={() => handleNav('about')}
          >
            ABOUT US
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activePage === 'annual-day' ? 'active' : ''}`}
            onClick={() => handleNav('annual-day')}
          >
            <Drama size={12} className="inline-nav-icon" /> ANNUAL DAY
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activePage === 'course' ? 'active' : ''}`}
            onClick={() => handleNav('course')}
          >
            <BookOpen size={12} className="inline-nav-icon" /> CERTIFICATION
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activePage === 'gallery' ? 'active' : ''}`}
            onClick={() => handleNav('gallery')}
          >
            GALLERY
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activePage === 'contact' ? 'active' : ''}`}
            onClick={() => handleNav('contact')}
          >
            CONTACT
          </button>
        </nav>

        {/* Right Side Actions */}
        <div className="topbar-actions">
          {/* 3D Asset Inspector Badge */}
          <button
            type="button"
            className="asset-pipeline-badge"
            onClick={onOpenAssetModal}
            title="Inspect 3D Scene Asset Pipeline & GLB Slot"
            aria-label="3D Asset Pipeline Inspector"
          >
            <Cpu size={12} className="pulse-icon" />
            <span className="badge-text">
              {assetInfo.isExternalGlb ? 'PROD GLB LOADED' : 'COUTURE 3D RIG'}
            </span>
            <span className="badge-pill">INFO</span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            type="button"
            className={`action-btn ${reducedMotion ? 'active' : ''}`}
            onClick={onToggleReducedMotion}
            title={reducedMotion ? 'Enable Camera Motion' : 'Reduce Camera Motion'}
            aria-label="Toggle camera motion"
          >
            <Eye size={13} />
            <span className="btn-label">{reducedMotion ? 'MOTION OFF' : '60 FPS'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile & Tablet Editorial Drawer */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="menu-header">
              <span className="eyebrow">THE THREADOR DIRECTORY</span>
              <button
                type="button"
                className="close-drawer-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="menu-nav">
              <button
                type="button"
                className="drawer-nav-item"
                onClick={() => handleNav('home')}
              >
                <span className="nav-num">PAGE 01</span>
                <span className="nav-title">Home & 3D Exhibition</span>
                <span className="nav-desc">Opening Mannequin, Men × Women Split, Garment X-Ray</span>
              </button>

              <button
                type="button"
                className="drawer-nav-item"
                onClick={() => handleNav('about')}
              >
                <span className="nav-num">PAGE 02</span>
                <span className="nav-title">About The Threador</span>
                <span className="nav-desc">Brand philosophy, five foundations, and vision</span>
              </button>

              <button
                type="button"
                className="drawer-nav-item"
                onClick={() => handleNav('annual-day')}
              >
                <span className="nav-num">PAGE 03</span>
                <span className="nav-title">Annual Day Costumes</span>
                <span className="nav-desc">One stage. One million dreams. Costume atelier</span>
              </button>

              <button
                type="button"
                className="drawer-nav-item"
                onClick={() => handleNav('course')}
              >
                <span className="nav-num">PAGE 04</span>
                <span className="nav-title">Certification Course</span>
                <span className="nav-desc">Fashion education for Grades 1–3, 4–6, 7–8</span>
              </button>

              <button
                type="button"
                className="drawer-nav-item"
                onClick={() => handleNav('gallery')}
              >
                <span className="nav-num">PAGE 05</span>
                <span className="nav-title">Stage & Student Gallery</span>
                <span className="nav-desc">Theatrical costumes and student craft portfolio</span>
              </button>

              <button
                type="button"
                className="drawer-nav-item"
                onClick={() => handleNav('contact')}
              >
                <span className="nav-num">PAGE 06</span>
                <span className="nav-title">Connect With The Atelier</span>
                <span className="nav-desc">School consultations, parent admissions, and WhatsApp</span>
              </button>
            </nav>

            <div className="menu-footer">
              <span>THE THREADOR • MY STORY, THREADED.</span>
              <button
                type="button"
                className="inspect-model-link"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenAssetModal();
                }}
              >
                Inspect 3D Scene Pipeline →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
