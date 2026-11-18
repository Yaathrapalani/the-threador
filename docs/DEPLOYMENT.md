# THE THREADOR — PRODUCTION DEPLOYMENT & OPERATIONS GUIDE
**Version:** 2.4.0 • Luxury Digital Flagship Edition  
**Repository:** `https://github.com/Yaathrapalani/the-threador`  
**Hosting Platforms:** Vercel / Netlify / AWS CloudFront + S3

---

## 1. System Requirements & Environment

- **Node.js:** `>= 18.18.0` (Recommended: `v20.x LTS` or `v22.x LTS`)
- **Package Manager:** `npm` (`>= 9.x`)
- **WebGL Capability:** WebGL 2.0 with floating-point texture support (`OES_texture_float`)
- **Operating Environment:** Modern Evergreen Browsers (Chrome 110+, Safari 16.4+, Firefox 115+, Edge 110+)

---

## 2. Build Pipeline Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (runs Vite with HMR on port 3000)
npm run dev

# 3. Production Typecheck & Bundle Build
npm run build

# 4. Preview compiled production distribution locally
npm run preview
```

### Build Artifact Output
- Typecheck: `tsc -b` (Strict TypeScript compiler verification)
- Bundler: `vite build`
- Output Directory: `dist/`
  - `dist/index.html` (~0.7 kB)
  - `dist/assets/index-*.css` (~99 kB minified, ~16 kB gzip)
  - `dist/assets/index-*.js` (~1.5 MB minified, ~446 kB gzip)
  - Static 3D models (`public/assets/models/`)
  - 1080p Master Videos (`public/assets/videos/`)

---

## 3. Production Asset Optimization & CDN Strategy

1. **3D Models (`.glb` / `.gltf`):**
   - Compressed with Draco mesh compression and Google Meshopt.
   - Served with `Cache-Control: public, max-age=31536000, immutable`.
2. **Cinematic 1080p Films:**
   - MP4 containers with H.264 video codec and AAC audio (muted by default).
   - Moov atom placed at file head (`faststart`) for instant streaming before complete download.
   - Byte-range request support (`206 Partial Content`) enabled on origin server/CDN.
3. **Web Fonts:**
   - Self-hosted WOFF2 formats loaded with `font-display: swap`.

---

## 4. Environment Variables Configuration

Create a `.env.production` file for live production deployment:

```env
# Google Flow / AI Integration (Optional)
VITE_FLOW_API_ENDPOINT=https://api.flow.google.com/v1

# Razorpay Production Keys
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx

# Concierge & Atelier WhatsApp Gateway
VITE_WHATSAPP_CONCIERGE_NUMBER=+919876543210

# Analytics & Performance Tracking
VITE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## 5. Security & Boundary Compliance

- **No Secrets in Client Bundles:** All payment secret keys (`RAZORPAY_KEY_SECRET`) are strictly kept on backend serverless endpoints; only public Key IDs are exposed to the client.
- **Content Security Policy (CSP):**
  ```http
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://checkout.razorpay.com; connect-src 'self' https://api.razorpay.com https://lumberjack.razorpay.com; img-src 'self' data: blob: https:; media-src 'self' data: blob:; worker-src 'self' blob:;
  ```

