import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Sparkles, Scissors, Drama, BookOpen } from 'lucide-react';
import { cartService } from '../services/cartService';
import type { ModelAssetInfo, PageId } from '../types';

interface HeaderProps {
  activePage: PageId;
  onNavigatePage: (page: PageId) => void;
  assetInfo: ModelAssetInfo;
  onOpenAssetModal: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenCart: () => void;
}

export function Header({
  activePage,
  onNavigatePage,
  assetInfo,
  onOpenAssetModal,
  onOpenCart
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(() => cartService.getCount(cartService.getItems()));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleCartUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const items = customEvent.detail || cartService.getItems();
      setCartCount(cartService.getCount(items));
    };

    window.addEventListener('the-threador-cart-update', handleCartUpdate);
    return () => window.removeEventListener('the-threador-cart-update', handleCartUpdate);
  }, []);

  const handleNav = (page: PageId) => {
    onNavigatePage(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`topbar ${isScrolled ? 'topbar-compact' : ''}`}>
        {/* Brand Wordmark Group */}
        <div className="brand-group">
          <button
            type="button"
            className="wordmark-btn"
            onClick={() => handleNav('home')}
            aria-label="The Threador Home"
          >
            THE THREADOR
          </button>
          <span className="brand-tagline">Clothing, considered.</span>
        </div>

        {/* Central Editorial Navigation (Complete Luxury Storefront) */}
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
            className={`nav-link-btn kids-primary-nav ${activePage === 'kids' ? 'active' : ''}`}
            onClick={() => handleNav('kids')}
          >
            <Sparkles size={11} className="inline-nav-icon" /> KIDS COUTURE
          </button>

          <button
            type="button"
            className={`nav-link-btn ${activePage === 'men' ? 'active' : ''}`}
            onClick={() => handleNav('men')}
          >
            <Scissors size={11} className="inline-nav-icon" /> MEN
          </button>

          <button
            type="button"
            className={`nav-link-btn ${activePage === 'women' ? 'active' : ''}`}
            onClick={() => handleNav('women')}
          >
            <Sparkles size={11} className="inline-nav-icon" /> WOMEN
          </button>

          <button
            type="button"
            className={`nav-link-btn ${activePage === 'atelier' ? 'active' : ''}`}
            onClick={() => handleNav('atelier')}
          >
            3D ATELIER
          </button>

          <button
            type="button"
            className={`nav-link-btn ${activePage === 'annual-day' ? 'active' : ''}`}
            onClick={() => handleNav('annual-day')}
          >
            <Drama size={11} className="inline-nav-icon" /> ANNUAL DAY
          </button>

          <button
            type="button"
            className={`nav-link-btn ${activePage === 'course' ? 'active' : ''}`}
            onClick={() => handleNav('course')}
          >
            <BookOpen size={11} className="inline-nav-icon" /> CERTIFICATION
          </button>

          <button
            type="button"
            className={`nav-link-btn ${activePage === 'about' ? 'active' : ''}`}
            onClick={() => handleNav('about')}
          >
            STORY
          </button>

          <button
            type="button"
            className={`nav-link-btn ${activePage === 'contact' ? 'active' : ''}`}
            onClick={() => handleNav('contact')}
          >
            CONTACT
          </button>
        </nav>

        {/* Right Side Actions: Shopping Bag + 3D Telemetry */}
        <div className="topbar-actions">
          {/* Shopping Bag Trigger */}
          <button
            type="button"
            className="topbar-bag-btn"
            onClick={onOpenCart}
            aria-label={`Open Shopping Bag, ${cartCount} items`}
          >
            <ShoppingBag size={14} />
            <span className="bag-label">BAG</span>
            <span className={`bag-count-badge ${cartCount > 0 ? 'has-items' : ''}`}>
              {cartCount}
            </span>
          </button>

          {/* 3D Asset Telemetry */}
          <button
            type="button"
            className="asset-pipeline-badge"
            onClick={onOpenAssetModal}
            title="Inspect 3D Scene Pipeline & Asset Slots"
          >
            <span className="badge-dot" />
            <span>{assetInfo.status === 'external-glb-loaded' ? '4K PROD GLB' : 'ATELIER RIG'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation drawer"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="mobile-menu-drawer" role="dialog" aria-label="Mobile Navigation">
          <div className="drawer-header">
            <span className="drawer-title">THE THREADOR • DIRECTORY</span>
            <button
              type="button"
              className="drawer-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="drawer-links-stack">
            <button
              type="button"
              className={`drawer-link ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => handleNav('home')}
            >
              HOME
            </button>
            <button
              type="button"
              className={`drawer-link kids-drawer-link ${activePage === 'kids' ? 'active' : ''}`}
              onClick={() => handleNav('kids')}
            >
              KIDS HAUTE COUTURE (FEATURED)
            </button>
            <button
              type="button"
              className={`drawer-link ${activePage === 'men' ? 'active' : ''}`}
              onClick={() => handleNav('men')}
            >
              MEN’S TAILORED ARCHITECTURE
            </button>
            <button
              type="button"
              className={`drawer-link ${activePage === 'women' ? 'active' : ''}`}
              onClick={() => handleNav('women')}
            >
              WOMEN’S HAUTE COUTURE
            </button>
            <button
              type="button"
              className={`drawer-link ${activePage === 'atelier' ? 'active' : ''}`}
              onClick={() => handleNav('atelier')}
            >
              3D BESPOKE ATELIER WORKSPACE
            </button>
            <button
              type="button"
              className={`drawer-link ${activePage === 'annual-day' ? 'active' : ''}`}
              onClick={() => handleNav('annual-day')}
            >
              ANNUAL DAY COSTUME ATELIER
            </button>
            <button
              type="button"
              className={`drawer-link ${activePage === 'course' ? 'active' : ''}`}
              onClick={() => handleNav('course')}
            >
              PARENT CERTIFICATION PROGRAMMES
            </button>
            <button
              type="button"
              className={`drawer-link ${activePage === 'about' ? 'active' : ''}`}
              onClick={() => handleNav('about')}
            >
              ABOUT & TEXTILE HERITAGE
            </button>
            <button
              type="button"
              className={`drawer-link ${activePage === 'contact' ? 'active' : ''}`}
              onClick={() => handleNav('contact')}
            >
              CONTACT & CONCIERGE
            </button>
          </div>

          <div className="drawer-bag-bar">
            <button
              type="button"
              className="drawer-open-bag-btn"
              onClick={() => {
                setMenuOpen(false);
                onOpenCart();
              }}
            >
              <ShoppingBag size={14} />
              <span>OPEN ATELIER BAG ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
