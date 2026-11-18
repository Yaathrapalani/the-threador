# PROJECT LITTLE UNIVERSE — COMMERCE & PRICING ARCHITECTURE
## Dynamic Pricing Matrix, Artisan Metric Accounting, and Omnichannel Checkout Flows

---

## 1. Commerce Architecture Overview

The Threador commerce engine bridges high-touch bespoke atelier craft with modern e-commerce speed. Every transaction supports transparent artisan compensation, tracking both the **artisan hours** and **handloom stitch counts** behind each creation.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          COMMERCE WORKFLOW ENGINE                           │
│                                                                             │
│  [Browse Product / Atelier Customization]                                   │
│                     │                                                       │
│                     ▼                                                       │
│  [Cart State Service (cartService.ts)] ──► [Local Encrypted Cache]         │
│   ├── Item Price + Fabric Add-on + Custom Monogram Surcharge                │
│   ├── Artisan Hours & Lead-Time Computation (2–4 Weeks)                     │
│   └── Sizing & Pediatric Seam Specifications                                │
│                     │                                                       │
│         ┌───────────┴───────────┐                                           │
│         ▼                       ▼                                           │
│  [Standard Direct]    [Bespoke / Institutional]                             │
│  Razorpay / UPI Card   WhatsApp VIP Concierge Channel                       │
│  Instant Checkout      Order Specification Dossier Handshake                │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Dynamic Pricing & Lead Time Calculation

Customizations selected in the 3D Atelier or Kids Little Universe dynamically recompute the price, artisan hours, and lead time:

### 2.1 Pricing Equation
$$\text{Total Price} = \text{Base Price} + \Delta\text{Fabric} + \Delta\text{Embroidery} + \Delta\text{Growth Seam Guarantee}$$

Where:
- $\text{Base Price}$: Baseline garment cut from premium standard Habotai silk.
- $\Delta\text{Fabric}$:
  - Silk Organza: $+\text{₹}2,800$
  - English Cotton Velvet: $+\text{₹}3,400$
  - Varanasi Handloom Zari Brocade: $+\text{₹}6,500$
  - Handspun Matka Silk: $+\text{₹}2,200$
- $\Delta\text{Embroidery}$:
  - Minimal Tone-on-tone: $+\text{₹}1,200$ (8 artisan hours)
  - Intricate Gold Zardozi: $+\text{₹}4,800$ (26 artisan hours)
- $\Delta\text{Growth Seam Guarantee}$: Always **₹0 (Included gratis as brand standard)**.

### 2.2 Artisan Metric Transparency
For each garment, the customer is shown the direct artisan investment:
- Typical Children's Heirloom Gown: **38 to 54 Handcraft Hours**, **18,500 Hand-guided Stitches**.
- Lead Time: Computed dynamically at $2 \text{ weeks}$ (standard) or $3\text{--}4 \text{ weeks}$ (intricate Varanasi handloom zari).

---

## 3. Omnichannel Checkout Pathways

### 3.1 Direct Razorpay / UPI Gateway
- Instant processing for ready-to-wear standard age-segment sizes (`2–4Y`, `4–6Y`, `6–8Y`, `8–10Y`, `10–14Y`).
- Supports UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking across 50+ Indian banks, and International Credit/Debit cards (Visa, MasterCard, Amex).

### 3.2 Bespoke WhatsApp Concierge Channel
- For bespoke measurements or complex family ensembles (matching Mother-Daughter / Father-Son sets).
- A pre-formatted, encrypted markdown specification dossier is piped directly to the WhatsApp Concierge number (`+91 94883 23412`), linking the customer directly with a Master Tailor.

### 3.3 Institutional Batch Ordering (School Annual Day)
- Specialized portal providing volume pricing tiers, batch delivery schedules, and school invoicing with GST input tax credit documentation.

