import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ScrollGarmentCinematic } from './components/ScrollGarmentCinematic';
import { DividedAtelier } from './components/DividedAtelier';
import { GarmentXRaySection } from './components/GarmentXRaySection';
import { EducationSection } from './components/EducationSection';
import { AnnualDaySection } from './components/AnnualDaySection';
import { AboutUsSection } from './components/AboutUsSection';
import { GalleryPage } from './components/GalleryPage';
import { ContactSection } from './components/ContactSection';
import { CollectionSection } from './components/CollectionSection';
import { StoreCollectionPage } from './components/StoreCollectionPage';
import { KidsLittleUniverse } from './components/KidsLittleUniverse';
import { ProductDetailPage } from './components/ProductDetailPage';
import { AtelierWorkspace } from './components/AtelierWorkspace';
import { ShoppingBagDrawer } from './components/ShoppingBagDrawer';
import { Footer } from './components/Footer';
import { AssetStatusModal } from './components/AssetStatusModal';
import { PaymentModal } from './components/PaymentModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import type { AtelierGender, ModelAssetInfo, PageId } from './types';

gsap.registerPlugin(ScrollTrigger);

function parseRoute(pathname: string): { page: PageId; productId?: string } {
  const clean = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!clean || clean === 'home') return { page: 'home' };
  if (clean === 'kids') return { page: 'kids' };
  if (clean === 'men') return { page: 'men' };
  if (clean === 'women') return { page: 'women' };
  if (clean === 'collections') return { page: 'collections' };
  if (clean === 'atelier') return { page: 'atelier' };
  if (clean === 'annual-day' || clean === 'annualday') return { page: 'annual-day' };
  if (clean === 'course' || clean === 'education') return { page: 'course' };
  if (clean === 'gallery') return { page: 'gallery' };
  if (clean === 'about' || clean === 'about-us') return { page: 'about' };
  if (clean === 'contact') return { page: 'contact' };
  if (clean.startsWith('product/')) {
    const parts = pathname.split('/');
    const rawId = parts[2] ? decodeURIComponent(parts[2]) : undefined;
    return { page: 'product-detail', productId: rawId || 'THREADOR-W-001' };
  }
  return { page: 'home' };
}

function getPathForPage(page: PageId, productId?: string): string {
  if (page === 'home') return '/';
  if (page === 'product-detail') return `/product/${productId || 'THREADOR-W-001'}`;
  return `/${page}`;
}

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroTrackRef = useRef<HTMLDivElement>(null);

  // Active page routing state synchronized with URL pathname
  const [activePage, setActivePage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      return parseRoute(window.location.pathname).page;
    }
    return 'home';
  });
  const [selectedProductId, setSelectedProductId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return parseRoute(window.location.pathname).productId || 'THREADOR-W-001';
    }
    return 'THREADOR-W-001';
  });

  // Scroll and stage state for Home
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [stage, setStage] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');

  // Collection filter selection
  const [selectedAtelierFilter, setSelectedAtelierFilter] = useState<AtelierGender | 'all'>('all');

  // Modals & Drawers state
  const [isAssetModalOpen, setIsAssetModalOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const [assetInfo, setAssetInfo] = useState<ModelAssetInfo>({
    isExternalGlb: false,
    modelPath: 'The Threador Couture 3D Prototype',
    vertexCount: 16840,
    triangles: 31250,
    shaderTechnique: 'Dual-Layer Silk Organza & PBR Fluting Harmonics',
    status: 'procedural-couture-active'
  });

  // Reduced motion preference
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const handleStageChange = useCallback((newStage: 'A' | 'B' | 'C' | 'D' | 'E') => {
    setStage(newStage);
  }, []);

  const handleAssetInfoChange = useCallback((info: ModelAssetInfo) => {
    setAssetInfo(info);
  }, []);

  const handleNavigatePage = useCallback((page: PageId) => {
    setActivePage(page);
    const path = getPathForPage(page);
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({ page }, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenProductDetail = useCallback((productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product-detail');
    const path = getPathForPage('product-detail', productId);
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({ page: 'product-detail', productId }, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCollection = useCallback((atelier: AtelierGender) => {
    setSelectedAtelierFilter(atelier);
    const targetPage: PageId = atelier === 'men' ? 'men' : 'women';
    setActivePage(targetPage);
    const path = getPathForPage(targetPage);
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({ page: targetPage }, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen for browser forward/back navigation
  useEffect(() => {
    const handlePopState = () => {
      const route = parseRoute(window.location.pathname);
      setActivePage(route.page);
      if (route.productId) {
        setSelectedProductId(route.productId);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleJumpToXRay = useCallback(() => {
    if (activePage !== 'home') {
      handleNavigatePage('home');
      setTimeout(() => {
        const xrayElem = document.getElementById('xray');
        if (xrayElem) xrayElem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const xrayElem = document.getElementById('xray');
      if (xrayElem) xrayElem.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activePage, handleNavigatePage]);

  // Lenis smooth scroll and custom cursor
  useEffect(() => {
    const lenis = new Lenis({
      lerp: reducedMotion ? 1 : 0.085,
      smoothWheel: !reducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2
    });
    (window as unknown as { __appLenis?: Lenis }).__appLenis = lenis;

    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    lenis.on('scroll', ScrollTrigger.update);

    // Custom thread-inspired cursor
    const moveCursor = (event: PointerEvent) => {
      const cursor = document.querySelector<HTMLElement>('.cursor-dot');
      if (cursor && event.pointerType === 'mouse') {
        cursor.style.transform = `translate3d(${event.clientX - 7}px, ${event.clientY - 7}px, 0)`;
      }
    };
    window.addEventListener('pointermove', moveCursor, { passive: true });

    // GSAP ScrollTrigger for 5-Scene Hero Camera Choreography (when on Home page)
    const ctx = gsap.context(() => {
      if (activePage === 'home' && heroTrackRef.current) {
        ScrollTrigger.create({
          trigger: heroTrackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);

            if (p < 0.22) {
              setStage('A');
            } else if (p < 0.48) {
              setStage('B');
            } else if (p < 0.72) {
              setStage('C');
            } else if (p < 0.88) {
              setStage('D');
            } else {
              setStage('E');
            }
          }
        });
      }
    }, rootRef);

    return () => {
      window.removeEventListener('pointermove', moveCursor);
      cancelAnimationFrame(frame);
      ctx.revert();
      lenis.destroy();
    };
  }, [reducedMotion, activePage]);

  return (
    <div ref={rootRef} className={`site-shell ${reducedMotion ? 'reduced-motion' : ''}`}>
      {/* 1. TOPBAR & LUXURY NAVIGATION */}
      <Header
        activePage={activePage}
        onNavigatePage={handleNavigatePage}
        assetInfo={assetInfo}
        onOpenAssetModal={() => setIsAssetModalOpen(true)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        {/* =========================================================
            PAGE 01: HOME (THE COMPLETE DIGITAL COUTURE JOURNEY)
        ========================================================= */}
        {activePage === 'home' && (
          <>
            {/* SECTION 01: OPENING 3D CINEMATIC HERO (4K MINIMALIST) */}
            <div ref={heroTrackRef} className="hero-scroll-track">
              <HeroSection
                scrollProgress={scrollProgress}
                stage={stage}
                onStageChange={handleStageChange}
                assetInfo={assetInfo}
                onAssetInfoChange={handleAssetInfoChange}
                onJumpToXRay={handleJumpToXRay}
                onNavigatePage={handleNavigatePage}
              />
            </div>

            {/* SECTION 02: SIGNATURE SCROLL-DRIVEN 1080P GARMENT REVEAL */}
            <ScrollGarmentCinematic
              initialGender="kids"
              onNavigatePage={handleNavigatePage}
              onOpenProductDetail={handleOpenProductDetail}
            />

            {/* SECTION 03: MEN × WOMEN RESIZABLE SPLIT-SCREEN (100VH) */}
            <DividedAtelier
              onNavigatePage={handleNavigatePage}
              onSelectCollection={handleSelectCollection}
            />

            {/* SECTION 04: THE GARMENT X-RAY (FINISHED -> BONING -> MACRO WEAVE) */}
            <GarmentXRaySection />

            {/* SECTION 05: THE EDUCATIONAL EXPERIENCE (5 FOUNDATIONS & CURRICULUM) */}
            <EducationSection isFullPage={false} />

            {/* SECTION 06: COSTUME ATELIER & ANNUAL DAY EXPERIENCES */}
            <AnnualDaySection isFullPage={false} />

            {/* SECTION 07: THE LIVING COLLECTION ARCHIVE */}
            <CollectionSection
              selectedAtelierFilter={selectedAtelierFilter}
              onFilterChange={setSelectedAtelierFilter}
            />
          </>
        )}

        {/* =========================================================
            PAGE 02: KIDS' PROJECT LITTLE UNIVERSE (PRINCIPAL COLLECTION)
        ========================================================= */}
        {activePage === 'kids' && (
          <KidsLittleUniverse
            onSelectProduct={handleOpenProductDetail}
            onNavigatePage={handleNavigatePage}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {/* =========================================================
            PAGE 03: MEN'S DEDICATED STORE COLLECTION
        ========================================================= */}
        {activePage === 'men' && (
          <StoreCollectionPage
            gender="men"
            onSelectProduct={handleOpenProductDetail}
            onNavigatePage={handleNavigatePage}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {/* =========================================================
            PAGE 04: WOMEN'S DEDICATED STORE COLLECTION
        ========================================================= */}
        {activePage === 'women' && (
          <StoreCollectionPage
            gender="women"
            onSelectProduct={handleOpenProductDetail}
            onNavigatePage={handleNavigatePage}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {/* =========================================================
            PAGE 04: ALL COLLECTIONS ARCHIVE
        ========================================================= */}
        {activePage === 'collections' && (
          <CollectionSection
            selectedAtelierFilter="all"
            onFilterChange={setSelectedAtelierFilter}
          />
        )}

        {/* =========================================================
            PAGE 06: PRODUCT DETAIL VIEW
        ========================================================= */}
        {activePage === 'product-detail' && (
          <ProductDetailPage
            productId={selectedProductId}
            onNavigatePage={handleNavigatePage}
            onOpenCart={() => setIsCartOpen(true)}
            onBackToCollection={() =>
              handleNavigatePage(
                selectedProductId.includes('-K-')
                  ? 'kids'
                  : selectedProductId.includes('-M-')
                  ? 'men'
                  : 'women'
              )
            }
          />
        )}

        {/* =========================================================
            PAGE 06: 3D BESPOKE ATELIER WORKSPACE
        ========================================================= */}
        {activePage === 'atelier' && (
          <AtelierWorkspace
            onNavigatePage={handleNavigatePage}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenProductDetail={handleOpenProductDetail}
          />
        )}

        {/* =========================================================
            PAGE 07: ANNUAL DAY COSTUMES (FULL PRODUCTION ATELIER)
        ========================================================= */}
        {activePage === 'annual-day' && <AnnualDaySection isFullPage={true} />}

        {/* =========================================================
            PAGE 08: CERTIFICATION COURSE (EDUCATION CURRICULUM)
        ========================================================= */}
        {activePage === 'course' && <EducationSection isFullPage={true} />}

        {/* =========================================================
            PAGE 09: GALLERY (STAGE, STUDENT & TEXTILE PORTFOLIO)
        ========================================================= */}
        {activePage === 'gallery' && <GalleryPage />}

        {/* =========================================================
            PAGE 10: ABOUT US (INSTITUTIONAL PROVENANCE & VISION)
        ========================================================= */}
        {activePage === 'about' && <AboutUsSection />}

        {/* =========================================================
            PAGE 11: CONTACT & CONCIERGE
        ========================================================= */}
        {activePage === 'contact' && <ContactSection onNavigatePage={handleNavigatePage} />}
      </main>

      {/* PERSISTENT LUXURY SHOPPING BAG DRAWER */}
      <ShoppingBagDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onNavigatePage={handleNavigatePage}
        onOpenProductDetail={handleOpenProductDetail}
      />

      {/* 3D ASSET INSPECTOR MODAL */}
      <AssetStatusModal
        isOpen={isAssetModalOpen}
        onClose={() => setIsAssetModalOpen(false)}
        assetInfo={assetInfo}
      />

      {/* RAZORPAY PAYMENT GATEWAY ARCHITECTURE SCAFFOLD MODAL */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        courseTitle="Fashion Education Certification Course (Grades 1–8)"
      />

      {/* PERSISTENT FLOATING WHATSAPP CONCIERGE */}
      <FloatingWhatsApp />

      {/* ARCHITECTURAL ATELIER FOOTER */}
      <Footer />

      {/* CUSTOM THREAD-INSPIRED CURSOR DOT */}
      <div className="cursor-dot" aria-hidden="true" />
    </div>
  );
}
