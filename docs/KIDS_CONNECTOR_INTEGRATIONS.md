# PROJECT LITTLE UNIVERSE — CONNECTOR & THIRD-PARTY INTEGRATIONS
## WhatsApp Business API, Razorpay Webhooks, Google Flow 3D Asset Pipeline, and Google Sheets Tracker

---

## 1. System Integration Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       THE THREADOR CONNECTOR MATRIX                         │
│                                                                             │
│  ┌───────────────────────┐                    ┌──────────────────────────┐  │
│  │   WHATSAPP BUSINESS   │                    │     RAZORPAY PAYMENT     │  │
│  │     API CONCIERGE     │                    │      GATEWAY & UPI       │  │
│  │ Direct order dossiers │                    │ Webhook verification &   │  │
│  │ & sizing consultations│                    │ automated GST receipts   │  │
│  └───────────▲───────────┘                    └────────────▲─────────────┘  │
│              │                                             │                │
│              └──────────────────────┬──────────────────────┘                │
│                                     │                                       │
│                       ┌─────────────▼─────────────┐                         │
│                       │    THE THREADOR CORE      │                         │
│                       │      REACT ENGINE         │                         │
│                       └─────────────┬─────────────┘                         │
│                                     │                                       │
│              ┌──────────────────────┴──────────────────────┐                │
│              │                                             │                │
│  ┌───────────▼───────────┐                    ┌────────────▼─────────────┐  │
│  │    GOOGLE FLOW MCP    │                    │   GOOGLE SHEETS ENQUIRY  │  │
│  │ 3D asset generation & │                    │      SHARED TRACKER      │  │
│  │ couture texture baking│                    │ Real-time lead sync for  │  │
│  │                       │                    │ school annual day teams  │  │
│  └───────────────────────┘                    └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. WhatsApp Business Concierge Integration

- **Endpoint:** `https://wa.me/919488323412`
- **Payload Schema:** Pre-populated URI-encoded markdown string conveying the complete atelier configuration:
```markdown
*THE THREADOR // ATELIER BESPOKE SPECIFICATION DOSSIER*
--------------------------------------------------
*Garment:* Celestia Three-Tier Organza Gown
*Gender / Audience:* Kids Universe (Age 6–8Y Scale)
*Selected Fabric:* Mulberry Silk Organza (Powder Blue)
*Accent Trims:* Varanasi Handloom Gold Zari
*Internal Lining:* 100% Certified Organic Mulberry Habotai Silk
*Growth Specification:* +2.5" Hidden French Seam Buffer
*Custom Monogram:* "A.V. 2026"
*Artisan Investment:* 48 Hours | 19,400 Hand Stitches
*Estimated Investment:* ₹28,500
--------------------------------------------------
Requesting consultation with a Master Tailor.
```

---

## 3. Razorpay & UPI Payment Webhooks

- **Integration Mode:** Razorpay Checkout Standard Modal.
- **Supported Payment Instruments:**
  - UPI Intent (Google Pay, PhonePe, Paytm, BHIM).
  - Credit / Debit Cards (RuPay, Visa, MasterCard, Amex).
  - Net Banking across 58 commercial banks.
- **Webhook Handlers:**
  - `payment.authorized`: Automatically locks yarn allocation in the atelier ERP.
  - `payment.captured`: Triggers automated order confirmation email and WhatsApp milestone tracking link.
  - `payment.failed`: Notifies VIP concierge for assisted recovery.

---

## 4. Google Flow MCP 3D Asset Pipeline Integration

- Utilizes the `flow-mcp` service to continuously generate and refine 3D garment geometries and PBR texture maps:
  - Generates seamless high-resolution normal maps and height displacement for Varanasi zari brocade.
  - Performs AI texture baking for ambient occlusion and micro-surface sheen.
  - Exports Draco-compressed GLTF 2.0 assets directly into `public/models/garments/`.

---

## 5. Google Sheets Real-Time Enquiry Tracker

- School Annual Day enquiries and Parent Certification course applications are written in real-time to a centralized Google Sheets tracker.
- **Columns Tracked:**
  - `Timestamp`
  - `Applicant / School Name`
  - `Contact Person & Role`
  - `Phone & Email`
  - `Estimated Student Headcount (10 to 500+)`
  - `Production Delivery Deadline`
  - `Status Pipeline (New -> Consultation -> Swatches Sent -> Contract Signed)`
