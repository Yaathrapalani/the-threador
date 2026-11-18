# THE THREADOR — E-COMMERCE & QUOTATION LIFECYCLE
**Version:** 2.4.0 • Luxury Digital Flagship Edition  
**Repository:** `https://github.com/Yaathrapalani/the-threador`  
**State Management:** `src/services/cartService.ts`, `src/data/storeProducts.ts`  
**Checkout Interfaces:** `src/components/CartDrawer.tsx`, `src/components/CheckoutModal.tsx`

---

## 1. Product Catalog Schema

Every garment in THE THREADOR's catalog (`src/data/storeProducts.ts`) adheres to a strict luxury data contract:

```typescript
export interface ProductRecord {
  id: string;                     // e.g., 'THREADOR-K-001'
  title: string;                  // e.g., 'Heirloom Seed Pearl Organza Dress'
  subtitle: string;               // e.g., 'Children’s Occasion Wear • 6–8Y Scale'
  price: number;                  // Integer in INR (₹)
  category: 'kids' | 'women' | 'men' | 'costume';
  ageGroup?: string;              // '2–4Y', '4–6Y', '6–8Y', '8–10Y', '10–14Y'
  hypoallergenic?: boolean;       // Certified 100% organic mulberry silk lining
  growAllowance?: string;         // '2.5" Hidden French Seam Allowance'
  parentGuide?: string;           // Pediatric comfort and expansion advice
  craftHours: number;             // Certified artisan handcraft hours (85h–210h)
  stitchCount?: number;           // Hand embroidery micro-stitches (e.g. 22,000)
  images: {
    hero: string;
    editorial: string[];
    flatlay: string;
    macroDetail: string;
  };
  features: string[];
  materials: string[];
  dimensions: {
    heightMm: number;
    patternPieces: number;
  };
  inStock: boolean;
}
```

---

## 2. Cart Service & Persistent State

The shopping bag is managed client-side via `cartService.ts` using `localStorage` persistence with custom browser events for zero-lag reactivity:

- **Storage Key:** `threador_cart_v2`
- **Reactivity:** Emits `threador_cart_updated` `CustomEvent` whenever items are added, updated, or removed.
- **Support for Bespoke Items:** Cart items support bespoke configurations, custom monograms, and made-to-measure measurements alongside standard ready-to-wear sizes.

```typescript
// Cart Service API:
cartService.getItems(): CartItem[]
cartService.addItem(item: CartItem): void
cartService.removeItem(id: string): void
cartService.updateQuantity(id: string, qty: number): void
cartService.clear(): void
cartService.getTotal(items: CartItem[]): number
cartService.getCount(items: CartItem[]): number
```

---

## 3. Checkout Quotation & Payment Boundaries

To respect strict luxury commerce protocols and legal boundary controls:

### Supported Payment & Quotation Methods:
1. **Razorpay Secure Payment:** Integrated checkout gateway for domestic and international credit/debit cards and NetBanking.
2. **Instant UPI Transfer:** Direct QR code generation and VPA payment handling for Indian domestic transactions.
3. **Private Atelier Invoice / Wire Transfer:** For commissions exceeding ₹1,00,000, generates a formal PDF pro-forma invoice with wire routing instructions.
4. **WhatsApp Private Concierge:** Direct one-click enquiry handoff with pre-filled cart payload and bespoke measurement summary sent to the master atelier.

```
                  ┌─────────────────────────────────────────┐
                  │          Client Shopping Bag            │
                  └────────────────────┬────────────────────┘
                                       │ Checkout Trigger
                  ┌────────────────────▼────────────────────┐
                  │         Checkout Quotation Modal        │
                  └──────┬───────────────────────────┬──────┘
                         │                           │
          ┌──────────────▼──────────┐ ┌──────────────▼──────────┐
          │   Digital Transactions  │ │ Private Atelier Booking │
          │   Razorpay / Instant UPI│ │ Wire Transfer / Invoice │
          └─────────────────────────┘ └─────────────────────────┘
```

