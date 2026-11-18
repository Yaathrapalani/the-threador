# THE THREADOR — E-Commerce & Bespoke Tailoring Workflow

## 1. Commerce System Architecture

THE THREADOR e-commerce platform provides an end-to-end luxury commerce journey tailored specifically for bespoke haute couture and made-to-measure tailoring.

```
+-------------------------------------------------------------------------------------------------------+
|                                           DISCOVERY                                                   |
|   - 1080p Video Cinematic Reveal                                                                     |
|   - Resizable Men / Women Atelier Split-Screen                                                        |
|   - Dedicated Storefronts (/men and /women) with Filter & Sorting                                     |
+-------------------------------------------------------------------------------------------------------+
                                                    |
                                                    v
+-------------------------------------------------------------------------------------------------------+
|                                       PRODUCT DETAIL & BESPOKE                                        |
|   - High-Res Gallery, Interactive 3D Model, 1080p Video Preview                                       |
|   - Tailoring Specs: Craft Hours, Stitch Count, Construction Type                                     |
|   - Standard Sizing (36R - 46R / IT 36 - 46) OR Bespoke Made-to-Measure                               |
|   - Direct Atelier Configuration Link & WhatsApp Concierge Inquiry                                    |
+-------------------------------------------------------------------------------------------------------+
                                                    |
                                                    v
+-------------------------------------------------------------------------------------------------------+
|                                         THE 3D ATELIER                                                |
|   - Live 3D Canvas with Real-Time Fabric & Color Swatching                                            |
|   - Lapel & Silhouette Selections                                                                     |
|   - Horn & Pearl Button Accents                                                                       |
|   - Custom Monogramming & Bespoke Measurements (Chest, Waist, Sleeve, Height)                         |
+-------------------------------------------------------------------------------------------------------+
                                                    |
                                                    v
+-------------------------------------------------------------------------------------------------------+
|                                        SHOPPING BAG & CART                                            |
|   - LocalStorage Persistence (`the-threador-cart`)                                                    |
|   - Global Event-Driven Badging & Live Subtotal Updates                                               |
|   - Bespoke Customization Notes Retained Per Item                                                     |
+-------------------------------------------------------------------------------------------------------+
                                                    |
                                                    v
+-------------------------------------------------------------------------------------------------------+
|                                     CHECKOUT & QUOTATION MODAL                                        |
|   - Client Information & Delivery Address                                                             |
|   - Consultation Scheduling (In-Person Atelier Fitting / Master Tailor Video Call)                    |
|   - Payment Stubs: Razorpay (Cards/NetBanking), UPI Instant, Wire Transfer, Atelier Invoice          |
|   - Immediate Order Confirmation & Dedicated Reference Tracking Code                                  |
+-------------------------------------------------------------------------------------------------------+
```

---

## 2. Product Catalog Schema (`src/data/storeProducts.ts`)

Every garment in THE THREADOR catalog adheres to the `ProductRecord` interface:

```typescript
export interface ProductRecord {
  id: string;
  sku: string;
  gender: 'men' | 'women';
  name: string;
  tagline: string;
  description: string;
  priceINR: number;
  priceUSD: number;
  category: 'couture-gowns' | 'evening-dresses' | 'capes-stoles' | 'tailored-blazers' | 'formal-suits' | 'bandhgala-achkan';
  materials: string[];
  craftHours: number;
  stitchCount: number;
  leadTimeWeeks: number;
  availableSizes: string[];
  inStock: boolean;
  featured: boolean;
  colorways: { name: string; hex: string }[];
  pbrSpec: {
    baseColor: string;
    roughness: number;
    metalness: number;
    sheen: number;
    fabricType: string;
  };
  dimensions: {
    sampleLength: string;
    chestOrBust: string;
    waist: string;
  };
  images: string[];
  videoSrc?: string;
  details: string[];
  careInstructions: string[];
}
```

### Initial Curated Garments (8 Bespoke Items):
1. **Men's Midnight Double-Breasted Tailored Blazer** (`mens-tailored-blazer-01`) — Super 150s Merino wool, 42 craft hours, 18,500 stitches.
2. **Men's Imperial Velvet Bandhgala** (`mens-bandhgala-velvet-02`) — English silk velvet, hand zardozi collar, 58 craft hours.
3. **Men's Double-Faced Cashmere Greatcoat** (`mens-greatcoat-cashmere-03`) — Pure Mongolian cashmere, unlined horn button finish, 64 craft hours.
4. **Men's Royal Silk Jamdani Achkan** (`mens-achkan-jamdani-04`) — Handloom Benarasi silk, 85 craft hours.
5. **Women's Champagne Atelier Organza Gown** (`womens-couture-gown-01`) — Multi-layer French silk organza with botanical embroidery and freshwater river pearls, 120 craft hours, 48,000 stitches.
6. **Women's Sculptural Peplum Evening Gown** (`womens-peplum-gown-02`) — Heavy silk gazar with structural crinoline support, 84 craft hours.
7. **Women's Bias-Cut Silk Crepe Evening Dress** (`womens-crepe-dress-03`) — Double silk Moroccan crepe, cascading back cowl, 48 craft hours.
8. **Women's Hand-Woven Banarasi Stage Cape** (`womens-banarasi-cape-04`) — Pure Katan silk with gold zari border, 96 craft hours.

---

## 3. Cart Service (`src/services/cartService.ts`)

The shopping bag state is managed via a dedicated TypeScript singleton:
- **`getItems(): CartItem[]`**: Reads parsed items from browser `localStorage`.
- **`addItem(product, size, colorway, customization?, quantity?)`**: Creates or increments cart entries.
- **`updateQuantity(itemId, quantity)`**: Safely adjusts item count, removing the item when quantity is 0.
- **`removeItem(itemId)`**: Deletes an item from the cart.
- **`clearCart()`**: Flushes the cart.
- **`getCartCount()`**: Returns total units across all cart items.
- **`getSubtotal()`**: Returns total cart valuation in both INR and USD.
- **Event Bus Notification**: Fires `window.dispatchEvent(new CustomEvent('the-threador-cart-update'))` on every mutation, triggering automatic re-renders in `Header` badges and drawer contents without prop drilling.

---

## 4. Checkout & Quotation Workflow

Because haute couture and bespoke tailoring require custom fabric allocation, pattern cutting, and personalized measurements:
1. **Quotation & Fitting Request**:
   - The user reviews their bag and clicks **Proceed to Bespoke Checkout**.
   - An elegant modal collects the client's contact information, delivery destination, bespoke tailoring notes, and preferred consultation mode (In-person atelier fitting or Master tailor video appointment).
2. **Payment Processing**:
   - Offers multiple payment channels: **Razorpay** (All major debit/credit cards, netbanking), **UPI Instant** (Google Pay, PhonePe, Paytm), **Bank Wire Transfer** (SWIFT/NEFT), or **Atelier Invoice** (50% bespoke deposit + 50% post-fitting balance).
3. **Confirmation & Reference ID**:
   - Generates a bespoke order code (e.g., `TH-B87F2K-2026`).
   - Clears the active shopping bag and presents a completion voucher with direct WhatsApp Concierge routing.
