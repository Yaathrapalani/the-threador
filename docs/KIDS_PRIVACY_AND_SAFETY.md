# PROJECT LITTLE UNIVERSE — DIGITAL PRIVACY & CHILD SAFETY POLICY
## COPPA, GDPR-K, and Ethical Digital Governance Standards

---

## 1. Governance Principles & Ethical Commitment

The Threador recognizes that an interface designed for children and families must uphold the absolute highest standards of digital privacy, data minimization, and child protection. We strictly prohibit invasive tracking, behavioral profiling, or direct financial solicitation aimed at minors.

Our digital platform complies with:
- **COPPA (Children’s Online Privacy Protection Act - US)**
- **GDPR-K (General Data Protection Regulation - Recital 38 for Children - EU/UK)**
- **DPDP Act 2023 (Digital Personal Data Protection Act - Section 9 for Children - India)**

---

## 2. Architectural Data Minimization Protocols

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           THE THREADOR CLIENT BROWSER                       │
│                                                                             │
│  [THE LITTLE WORLD (Child Mode)]                [THE PARENT'S ATELIER]      │
│  ├── No accounts or logins required             ├── Authenticated Session   │
│  ├── Zero tracking cookies / pixels             ├── Encrypted Measurement   │
│  ├── LocalStorage-only temporary wishlist       │   Dossier (AES-256)       │
│  └── No payment or checkout triggers            └── Parental Consent Gate   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                         [WHATSAPP ENCRYPTED HANDOFF]
                                       │
                                       ▼
                     [Zero Server Storage of Child Data]
```

### 2.1 The Little World Privacy Constraints
1. **Zero Profiling:** When a user navigates within "The Little World", no tracking cookies, analytics identifiers, or third-party behavioral pixels are triggered.
2. **Ephemeral Wishlist Storage:** When a child selects favorite items, the selections are stored purely in client-side memory (`sessionStorage` or local device state). No user account, name, email, or child identifier is requested or transmitted to any server database.
3. **Absence of Direct In-App Purchasing:** Children cannot complete transactions or enter payment credentials in "The Little World". All purchasing actions route through **The Parent's Atelier** or an authenticated adult communication channel (WhatsApp Concierge / Razorpay secure checkout).

---

## 3. Parental Consent & Measurement Dossier Security

1. **Child Measurement Data:** Bespoke measurements (height, chest, waist, shoulder pitch) entered for custom atelier tailoring are classified as **Sensitive Personal Data**.
2. **Encryption:** All custom sizing dossiers are encrypted both in transit (TLS 1.3) and at rest (AES-256).
3. **Retention & Deletion:** Parents have unilateral rights to purge sizing dossiers from our atelier production database at any time via a single-click request to our data protection officer (`dpo@thethreador.com`).

---

## 4. Advertising & Algorithmic Protection

- **No Retargeting of Minors:** We do not participate in cross-site retargeting networks (Meta Pixel, Google Remarketing) for children's category pages.
- **No Gamified Dark Patterns:** The interface contains no loot boxes, countdown panic timers, artificial scarcity popups ("Only 1 left!"), or manipulative microtransactions.
- **Friendly Parental Handoff:** The "Share with Mum & Dad" feature generates a standard `wa.me` text link using native OS URI schemes without collecting parent or child phone numbers on our web platform.

