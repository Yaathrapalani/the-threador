import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DividedAtelier } from './components/DividedAtelier';
import { GarmentXRaySection } from './components/GarmentXRaySection';
import { EducationSection } from './components/EducationSection';
import { AnnualDaySection } from './components/AnnualDaySection';
import { AboutUsSection } from './components/AboutUsSection';
import { GalleryPage } from './components/GalleryPage';
import { ContactSection } from './components/ContactSection';
import { CollectionSection } from './components/CollectionSection';
import { Footer } from './components/Footer';
import { AssetStatusModal } from './components/AssetStatusModal';
import { PaymentModal } from './components/PaymentModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import type { AtelierGender, ModelAssetInfo, PageId } from './types';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroTrackRef = useRef<HTMLDivElement>(null);

  // Active page routing state
  const [activePage, setActivePage] = useState<PageId>('home');

  // Scroll and stage state for Home
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [stage, setStage] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');

  // Collection filter selection
  const [selectedAtelierFilter, setSelectedAtelierFilter] = useState<AtelierGender | 'all'>('all');

  // Modals state
  const [isAssetModalOpen, setIsAssetModalOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCollection = useCallback((atelier: AtelierGender) => {
    setSelectedAtelierFilter(atelier);
    const collectionElem = document.getElementById('collection');
    if (collectionElem) {
      collectionElem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleJumpToXRay = useCallback(() => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const xrayElem = document.getElementById('xray');
        if (xrayElem) xrayElem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const xrayElem = document.getElementById('xray');
      if (xrayElem) xrayElem.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activePage]);

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
      {/* 1. TOPBAR & EDITORIAL NAVIGATION */}
      <Header
        activePage={activePage}
        onNavigatePage={handleNavigatePage}
        assetInfo={assetInfo}
        onOpenAssetModal={() => setIsAssetModalOpen(true)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
      />

      <main>
        {/* =========================================================
            PAGE 01: HOME (THE COMPLETE DIGITAL COUTURE JOURNEY)
        ========================================================= */}
        {activePage === 'home' && (
          <>
            {/* SECTION 01: OPENING 3D CINEMATIC HERO (5-SCENE CHOREOGRAPHY) */}
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

            {/* PART III: MEN × WOMEN RESIZABLE SPLIT-SCREEN */}
            <DividedAtelier
              onNavigatePage={handleNavigatePage}
              onSelectCollection={handleSelectCollection}
            />

            {/* PART IV: THE GARMENT X-RAY (FINISHED -> BONING -> MACRO WEAVE) */}
            <GarmentXRaySection />

            {/* PART V: THE EDUCATIONAL EXPERIENCE (5 FOUNDATIONS & CURRICULUM) */}
            <EducationSection isFullPage={false} />

            {/* PART VI: COSTUME ATELIER & ANNUAL DAY EXPERIENCES */}
            <AnnualDaySection isFullPage={false} />

            {/* PART VII: THE LIVING COLLECTION ARCHIVE */}
            <CollectionSection
              selectedAtelierFilter={selectedAtelierFilter}
              onFilterChange={setSelectedAtelierFilter}
            />
          </>
        )}

        {/* =========================================================
            PAGE 02: ABOUT US (INSTITUTIONAL PROVENANCE & VISION)
        ========================================================= */}
        {activePage === 'about' && <AboutUsSection />}

        {/* =========================================================
            PAGE 03: ANNUAL DAY COSTUMES (FULL PRODUCTION ATELIER)
        ========================================================= */}
        {activePage === 'annual-day' && <AnnualDaySection isFullPage={true} />}

        {/* =========================================================
            PAGE 04: CERTIFICATION COURSE (EDUCATION CURRICULUM)
        ========================================================= */}
        {activePage === 'course' && <EducationSection isFullPage={true} />}

        {/* =========================================================
            PAGE 05: GALLERY (STAGE, STUDENT & TEXTILE PORTFOLIO)
        ========================================================= */}
        {activePage === 'gallery' && <GalleryPage />}

        {/* =========================================================
            PAGE 06: CONTACT & CONVERSION
        ========================================================= */}
        {activePage === 'contact' && <ContactSection onNavigatePage={handleNavigatePage} />}
      </main>

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
