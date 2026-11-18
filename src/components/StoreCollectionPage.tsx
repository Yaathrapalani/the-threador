import { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowRight, ShoppingBag, Eye, Sparkles, Scissors, Clock, ShieldCheck } from 'lucide-react';
import { STORE_PRODUCTS } from '../data/storeProducts';
import { cartService } from '../services/cartService';
import type { AtelierGender, ProductRecord, PageId } from '../types';

interface StoreCollectionPageProps {
  gender: AtelierGender;
  onSelectProduct: (productId: string) => void;
  onNavigatePage: (page: PageId) => void;
  onOpenCart: () => void;
}

export function StoreCollectionPage({
  gender,
  onSelectProduct,
  onNavigatePage,
  onOpenCart
}: StoreCollectionPageProps) {
  const isKids = gender === 'kids';
  const isMen = gender === 'men';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'craftsmanship'>('featured');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Filter products by gender
  const genderProducts = useMemo(() => {
    return STORE_PRODUCTS.filter((p) => p.gender === gender);
  }, [gender]);

  // Unique categories for this gender
  const categories = useMemo(() => {
    const cats = Array.from(new Set(genderProducts.map((p) => p.category)));
    return ['all', ...cats];
  }, [genderProducts]);

  // Age brackets for Kids
  const ageBrackets = ['all', '2–4Y', '4–6Y', '6–8Y', '8–10Y', '10–14Y'];

  // Filtered and sorted products
  const displayedProducts = useMemo(() => {
    let result = genderProducts;

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (isKids && selectedAge !== 'all') {
      result = result.filter((p) => {
        if (!p.ageGroup) return true;
        if (selectedAge === '2–4Y') return p.ageGroup.includes('2') || p.ageGroup.includes('3') || p.ageGroup.includes('4');
        if (selectedAge === '4–6Y') return p.ageGroup.includes('4') || p.ageGroup.includes('5') || p.ageGroup.includes('6');
        if (selectedAge === '6–8Y') return p.ageGroup.includes('6') || p.ageGroup.includes('7') || p.ageGroup.includes('8');
        if (selectedAge === '8–10Y') return p.ageGroup.includes('8') || p.ageGroup.includes('9') || p.ageGroup.includes('10');
        if (selectedAge === '10–14Y') return p.ageGroup.includes('10') || p.ageGroup.includes('12') || p.ageGroup.includes('14');
        return true;
      });
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'craftsmanship') {
      result = [...result].sort((a, b) => b.craftsmanshipHours - a.craftsmanshipHours);
    }

    return result;
  }, [genderProducts, selectedCategory, selectedAge, isKids, sortBy]);

  const handleQuickAdd = (product: ProductRecord, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'Standard';
    const defaultColor = product.colors[0]?.name || 'Natural';
    cartService.addItem(product, defaultSize, defaultColor, product.primaryFabric, undefined, 1);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
      onOpenCart();
    }, 600);
  };

  return (
    <div className={`store-collection-page ${isKids ? 'kids-collection' : isMen ? 'men-collection' : 'women-collection'}`}>
      {/* 1. EDITORIAL COLLECTION HERO BANNER */}
      <section className="collection-hero-banner">
        <div className="collection-hero-content">
          <div className="collection-taxonomy-pill">
            {isKids ? <Sparkles size={12} /> : isMen ? <Scissors size={12} /> : <Sparkles size={12} />}
            <span>
              THE THREADOR ATELIER •{' '}
              {isKids
                ? '01 / CHILDREN’S HAUTE COUTURE (FEATURED)'
                : isMen
                ? '02 / MEN’S ARCHITECTURAL TAILORING'
                : '03 / WOMEN’S HAUTE COUTURE'}
            </span>
          </div>

          <h1 className="collection-hero-title">
            {isKids ? (
              <>
                The Joy<br />
                <i>of Celebration.</i>
              </>
            ) : isMen ? (
              <>
                The Architecture<br />
                <i>of Form.</i>
              </>
            ) : (
              <>
                The Poetry<br />
                <i>of Drape.</i>
              </>
            )}
          </h1>

          <p className="collection-hero-description">
            {isKids
              ? 'Heirloom occasion wear, celebration gowns, tailored bandhgalas, and special garments crafted with unyielding couture standards, hypoallergenic organic silk linings, and generous grow-with-me seam allowances.'
              : isMen
              ? 'Hand-canvassed double-breasted blazers, bespoke bandhgalas, and architectural ceremonial greatcoats. Engineered with unbleached horsehair floating canvas and zero synthetic fusibles.'
              : 'Sculptural fluted gowns, botanical metallic zardozi embroidery, and pure mulberry silk organza. Each garment is cut on a 45° bias and hand-boned for gravitational grace.'}
          </p>

          <div className="collection-hero-quick-switch">
            <button
              type="button"
              className={`collection-switch-tab ${isKids ? 'active' : ''}`}
              onClick={() => onNavigatePage('kids')}
            >
              KIDS’ COUTURE ({STORE_PRODUCTS.filter((p) => p.gender === 'kids').length})
            </button>
            <button
              type="button"
              className={`collection-switch-tab ${isMen ? 'active' : ''}`}
              onClick={() => onNavigatePage('men')}
            >
              MEN’S COLLECTION ({STORE_PRODUCTS.filter((p) => p.gender === 'men').length})
            </button>
            <button
              type="button"
              className={`collection-switch-tab ${!isKids && !isMen ? 'active' : ''}`}
              onClick={() => onNavigatePage('women')}
            >
              WOMEN’S COLLECTION ({STORE_PRODUCTS.filter((p) => p.gender === 'women').length})
            </button>
            <button
              type="button"
              className="collection-atelier-shortcut"
              onClick={() => onNavigatePage('atelier')}
            >
              <span>BESPOKE 3D ATELIER</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SORTING BAR */}
      <section className="collection-controls-bar">
        <div className="category-filter-group">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'all' ? 'ALL GARMENTS' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Age group filter for Kids */}
        {isKids && (
          <div className="age-filter-group">
            <span className="age-filter-label">AGE:</span>
            {ageBrackets.map((age) => (
              <button
                key={age}
                type="button"
                className={`age-pill-btn ${selectedAge === age ? 'active' : ''}`}
                onClick={() => setSelectedAge(age)}
              >
                {age === 'all' ? 'ALL AGES' : age}
              </button>
            ))}
          </div>
        )}

        <div className="sorting-group">
          <SlidersHorizontal size={13} className="sort-icon" />
          <span className="sort-label">SORT BY:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="sort-select-dropdown"
            aria-label="Sort collection products"
          >
            <option value="featured">Featured Atelier Order</option>
            <option value="craftsmanship">Craftsmanship Hours (High to Low)</option>
            <option value="price-low">Investment (Low to High)</option>
            <option value="price-high">Investment (High to Low)</option>
          </select>
        </div>
      </section>

      {/* 3. LUXURY PRODUCT GRID */}
      <section className="collection-grid-container">
        <div className="luxury-product-grid">
          {displayedProducts.map((product) => (
            <article
              key={product.id}
              className="luxury-product-card"
              onClick={() => onSelectProduct(product.id)}
            >
              {/* Product Media Box */}
              <div className="product-media-wrapper">
                <img
                  src={product.featuredMedia.thumbnail || product.featuredMedia.heroImage}
                  alt={product.name}
                  className="product-thumbnail-image"
                  loading="lazy"
                />

                {/* Craftsmanship Badge */}
                <div className="product-craft-badge">
                  <Clock size={11} />
                  <span>{product.craftsmanshipHours}H ATELIER</span>
                </div>

                {/* Availability Flag */}
                <span className="product-availability-tag">{product.availability}</span>

                {/* Hover Quick Actions Overlay */}
                <div className="product-card-hover-actions">
                  <button
                    type="button"
                    className="quick-inspect-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product.id);
                    }}
                  >
                    <Eye size={13} />
                    <span>INSPECT 3D</span>
                  </button>

                  <button
                    type="button"
                    className={`quick-add-btn ${addedProductId === product.id ? 'added' : ''}`}
                    onClick={(e) => handleQuickAdd(product, e)}
                  >
                    <ShoppingBag size={13} />
                    <span>{addedProductId === product.id ? 'ADDED TO BAG' : 'ORDER'}</span>
                  </button>
                </div>
              </div>

              {/* Product Info Metadata */}
              <div className="product-info-meta">
                <div className="product-meta-header">
                  <span className="product-category-text">{product.category.toUpperCase()}</span>
                  <span className="product-stitch-text">{product.stitchCount}</span>
                </div>

                <h3 className="product-card-title">{product.name}</h3>
                <p className="product-card-subtitle">{product.subtitle}</p>

                {/* Age & Hypoallergenic Badges for Children's Collection */}
                {product.ageGroup && (
                  <div className="product-age-badge-row">
                    <span className="age-group-pill">{product.ageGroup}</span>
                    {product.hypoallergenic && (
                      <span className="hypoallergenic-pill">ORGANIC SILK LINING</span>
                    )}
                  </div>
                )}

                <div className="product-materials-line">
                  <span className="fabric-spec">{product.primaryFabric}</span>
                </div>

                <div className="product-card-footer">
                  <span className="product-price-display">
                    ₹{product.price.toLocaleString('en-IN')}
                    <span className="tax-included-note"> (MADE TO ORDER)</span>
                  </span>

                  <span className="product-view-link">
                    <span>EXPLORE</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. INSTITUTIONAL SERVICES & BESPOKE ATELIER BANNER */}
      <section className="collection-bespoke-cta">
        <div className="bespoke-cta-box">
          <div className="bespoke-cta-badge">
            <ShieldCheck size={14} />
            <span>THE THREADOR ATELIER SERVICES</span>
          </div>
          <h2 className="bespoke-cta-headline">
            Require School Stage Costumes or Custom Made-to-Measure?
          </h2>
          <p className="bespoke-cta-sub">
            Whether outfitting an entire 200-student Annual Day musical or tailoring a bespoke ceremonial
            ensemble, our Mumbai atelier provides fabric sourcing, custom sizing, and prompt consultation.
          </p>
          <div className="bespoke-cta-buttons">
            <button
              type="button"
              className="bespoke-btn primary"
              onClick={() => onNavigatePage('annual-day')}
            >
              ANNUAL DAY COSTUME ENQUIRY
            </button>
            <button
              type="button"
              className="bespoke-btn secondary"
              onClick={() => onNavigatePage('atelier')}
            >
              ENTER 3D CUSTOM WORKSPACE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

