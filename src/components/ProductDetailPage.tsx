import { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  RotateCw,
  Clock,
  ShieldCheck,
  Sparkles,
  Scissors,
  Check,
  MessageCircle,
  HelpCircle,
  Maximize2
} from 'lucide-react';
import { STORE_PRODUCTS } from '../data/storeProducts';
import { cartService } from '../services/cartService';
import { HeroCanvas } from '../scene/HeroCanvas';
import { AtelierDualScene } from '../scene/AtelierDualScene';
import type { ProductRecord, PageId } from '../types';

interface ProductDetailPageProps {
  productId: string;
  onNavigatePage: (page: PageId) => void;
  onOpenCart: () => void;
  onBackToCollection: () => void;
}

export function ProductDetailPage({
  productId,
  onNavigatePage,
  onOpenCart,
  onBackToCollection
}: ProductDetailPageProps) {
  const product: ProductRecord =
    STORE_PRODUCTS.find((p) => p.id === productId) || STORE_PRODUCTS[0];

  const isKids = product.gender === 'kids';
  const isMen = product.gender === 'men';
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const [activeMediaMode, setActiveMediaMode] = useState<'gallery' | '3d-canvas' | 'video'>('gallery');
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const images = product.featuredMedia.additionalImages.length
    ? product.featuredMedia.additionalImages
    : [product.featuredMedia.heroImage];

  const handleAddToCart = () => {
    cartService.addItem(
      product,
      selectedSize,
      selectedColor,
      product.primaryFabric,
      undefined,
      quantity
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onOpenCart();
    }, 500);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello The Threador Atelier, I am interested in inquiring about ${product.name} (${product.id}) in ${selectedColor}, size ${selectedSize}. Please provide guidance on lead time and bespoke fit.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className={`product-detail-page ${isKids ? 'kids-product' : isMen ? 'men-product' : 'women-product'}`}>
      {/* 1. TOP BREADCRUMBS & NAVIGATION */}
      <nav className="product-breadcrumb-bar" aria-label="Breadcrumb">
        <button type="button" className="breadcrumb-back-btn" onClick={onBackToCollection}>
          <ArrowLeft size={13} />
          <span>
            BACK TO {isKids ? 'CHILDREN’S' : isMen ? 'MEN’S' : 'WOMEN’S'} COLLECTION
          </span>
        </button>

        <div className="breadcrumb-trail">
          <span onClick={() => onNavigatePage('home')}>HOME</span>
          <span className="sep">/</span>
          <span onClick={() => onNavigatePage(isKids ? 'kids' : isMen ? 'men' : 'women')}>
            {isKids ? 'KIDS' : isMen ? 'MEN' : 'WOMEN'}
          </span>
          <span className="sep">/</span>
          <span className="current">{product.name}</span>
        </div>
      </nav>

      {/* 2. MAIN PRODUCT STAGE (DUAL COLUMN: MEDIA + COMMERCE) */}
      <div className="product-stage-container">
        {/* LEFT COLUMN: HIGH-RES MEDIA / 3D WEBGL VIEWER / 1080P REVEAL VIDEO */}
        <div className="product-media-column">
          {/* Media Mode Selector */}
          <div className="media-mode-tabs">
            <button
              type="button"
              className={`media-tab-btn ${activeMediaMode === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveMediaMode('gallery')}
            >
              EDITORIAL GALLERY
            </button>
            {product.modelPath && (
              <button
                type="button"
                className={`media-tab-btn ${activeMediaMode === '3d-canvas' ? 'active' : ''}`}
                onClick={() => setActiveMediaMode('3d-canvas')}
              >
                <RotateCw size={12} />
                <span>360° 3D MODEL</span>
              </button>
            )}
            {product.featuredMedia.videoUrl && (
              <button
                type="button"
                className={`media-tab-btn ${activeMediaMode === 'video' ? 'active' : ''}`}
                onClick={() => setActiveMediaMode('video')}
              >
                <Sparkles size={12} />
                <span>1080P REVEAL FILM</span>
              </button>
            )}
          </div>

          {/* Active Viewport */}
          <div className="product-active-viewport">
            {activeMediaMode === 'gallery' && (
              <div className="gallery-main-frame">
                <img
                  src={images[selectedImageIdx] || product.featuredMedia.heroImage}
                  alt={product.name}
                  className="gallery-active-image"
                />
                <div className="gallery-craft-tag">
                  <Clock size={11} />
                  <span>{product.craftsmanshipHours} HOURS ATELIER HANDCRAFT</span>
                </div>
              </div>
            )}

            {activeMediaMode === '3d-canvas' && (
              <div className="product-three-canvas-wrap">
                {isKids ? (
                  <HeroCanvas
                    gender="kids"
                    scrollProgress={0.45}
                    xrayMode="finished"
                    forcedView={null}
                    isTurntableActive={true}
                  />
                ) : isMen ? (
                  <AtelierDualScene
                    gender="men"
                    isHovered={true}
                    onExplore={() => {}}
                  />
                ) : (
                  <HeroCanvas
                    gender="women"
                    scrollProgress={0.45}
                    xrayMode="finished"
                    forcedView={null}
                    isTurntableActive={true}
                  />
                )}
                <div className="three-viewport-hint">
                  <RotateCw size={12} className="spin-slow" />
                  <span>INTERACTIVE PBR MODEL • DRAG TO ROTATE • PINCH TO ZOOM</span>
                </div>
              </div>
            )}

            {activeMediaMode === 'video' && product.featuredMedia.videoUrl && (
              <div className="product-video-wrap">
                <video
                  src={product.featuredMedia.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  loop
                  muted
                  className="product-full-video"
                />
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {activeMediaMode === 'gallery' && images.length > 1 && (
            <div className="gallery-thumbnail-strip">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`gallery-thumb-btn ${idx === selectedImageIdx ? 'active' : ''}`}
                  onClick={() => setSelectedImageIdx(idx)}
                >
                  <img src={img} alt={`Preview angle ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: EDITORIAL METADATA & COMMERCE ACTIONS */}
        <div className="product-commerce-column">
          <div className="product-brand-line">
            <span className="brand-category-badge">
              {isMen ? <Scissors size={11} /> : <Sparkles size={11} />}
              <span>THE THREADOR • {product.category.toUpperCase()}</span>
            </span>
            <span className="product-code-badge">{product.id}</span>
          </div>

          <h1 className="product-primary-title">{product.name}</h1>
          <p className="product-editorial-subtitle">{product.subtitle}</p>

          <div className="product-price-section">
            <div className="price-main-row">
              <span className="price-currency">₹</span>
              <span className="price-amount">{product.price.toLocaleString('en-IN')}</span>
              <span className="price-taxes-note">INR • COMPLIMENTARY COURIER</span>
            </div>
            <span className="lead-time-pill">
              <Clock size={11} />
              <span>ESTIMATED LEAD TIME: {product.leadTimeWeeks} WEEKS</span>
            </span>
          </div>

          <hr className="product-divider" />

          {/* Colorway Selection */}
          <div className="custom-option-group">
            <div className="option-header-row">
              <span className="option-label">COLORWAY:</span>
              <span className="option-selected-val">{selectedColor}</span>
            </div>
            <div className="color-swatches-row">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className={`color-swatch-circle ${selectedColor === c.name ? 'active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                >
                  {selectedColor === c.name && <Check size={11} className="swatch-check" />}
                </button>
              ))}
            </div>
          </div>

          {/* Sizing Selection */}
          <div className="custom-option-group">
            <div className="option-header-row">
              <span className="option-label">SIZE SPECIFICATION:</span>
              <button
                type="button"
                className="size-guide-btn"
                onClick={() => onNavigatePage('atelier')}
              >
                <HelpCircle size={11} />
                <span>BESPOKE MEASUREMENTS GUIDE</span>
              </button>
            </div>
            <div className="size-buttons-row">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`size-select-btn ${selectedSize === s ? 'active' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="custom-option-group">
            <span className="option-label">PIECES:</span>
            <div className="quantity-counter-box">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="qty-number">{quantity}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="commerce-actions-stack">
            <button
              type="button"
              className={`add-to-bag-button ${isAdded ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              <ShoppingBag size={14} />
              <span>{isAdded ? 'ADDED TO ATELIER BAG' : 'ADD TO SHOPPING BAG'}</span>
            </button>

            <button
              type="button"
              className="atelier-customise-button"
              onClick={() => onNavigatePage('atelier')}
            >
              <Maximize2 size={13} />
              <span>CUSTOMISE IN 3D ATELIER WORKSPACE</span>
            </button>

            <button
              type="button"
              className="whatsapp-concierge-button"
              onClick={handleWhatsAppInquiry}
            >
              <MessageCircle size={13} />
              <span>CONSULT VIA WHATSAPP CONCIERGE</span>
            </button>
          </div>

          {/* Provenance & Craftsmanship Guarantee Box */}
          <div className="provenance-summary-box">
            <div className="guarantee-header">
              <ShieldCheck size={14} className="guarantee-icon" />
              <span>THE THREADOR CRAFTSMANSHIP GUARANTEE</span>
            </div>
            <ul className="guarantee-bullets">
              <li>
                <strong>Primary Fabric:</strong> {product.materials.composition} ({product.materials.weight})
              </li>
              <li>
                <strong>Weave & Origin:</strong> {product.materials.weave} • {product.materials.provenance}
              </li>
              <li>
                <strong>Atelier Hand Stitches:</strong> {product.stitchCount}
              </li>
              <li>
                <strong>Packaging:</strong> Delivered in breathable bespoke canvas suit/gown carrier with cedar hanger.
              </li>
            </ul>
          </div>

          {/* Parent Sizing & Child Comfort Guide (for Kids Collection) */}
          {product.parentGuide && (
            <div className="parent-comfort-guide-box">
              <div className="parent-guide-header">
                <Sparkles size={13} className="parent-guide-icon" />
                <span>PARENT SIZING & CHILD COMFORT GUIDE</span>
              </div>
              <p className="parent-guide-text">{product.parentGuide}</p>
              {product.growAllowance && (
                <div className="parent-guide-feature">
                  <strong>GROWTH ALLOWANCE:</strong> {product.growAllowance}
                </div>
              )}
            </div>
          )}

          {/* Garment Construction Details Accordion */}
          <div className="construction-breakdown-box">
            <h3 className="breakdown-title">CONSTRUCTION & TAILORING DETAILS</h3>
            <ul className="construction-list">
              {product.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

