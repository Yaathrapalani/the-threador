# Contributing to THE THREADOR

Thank you for your interest in contributing to **THE THREADOR** digital haute couture, fashion education, and costume atelier platform.

## Design Philosophy & Brand Governance

All creative and technical contributions must adhere to the core principles established by The Threador:
1. **Brand Creed:** *"What if every child grew up knowing the story behind what they wear?"*
2. **Two Established Pillars:**
   - `LEARN`: Fashion education and school programs (Grades 1–8).
   - `CREATE`: Costume atelier and Annual Day turnkey production.
3. **Restrained Editorial Visual System:**
   - Palette: Midnight Navy (`#102440`), Deep Ink (`#10131B`), Warm Ivory (`#F4F1E8`), Antique Mustard (`#C7A64A`), Heritage Green (`#47785D`), Muted Stone (`#D9D4C9`).
   - High-contrast serif headlines paired with clean geometric monospace/sans technical labels.
   - Avoid generic AI website templates, unnecessary cards, and unmotivated decorative elements.

## Development Workflow

### 1. Prerequisites
- Node.js `20.19+` or `22.12+`
- npm `10+`
- Git 2.40+

### 2. Local Setup
```bash
git clone https://github.com/Yaathrapalani/the-threador.git
cd the-threador
npm install
npm run dev
```
The development server will start on port `3000`.

### 3. Strict TypeScript Standards
The repository operates under strict TypeScript compilation:
- `verbatimModuleSyntax: true` — All type-only imports must use `import type { ... }`.
- `noUnusedLocals: true` — No unused variables, components, or icons.
- Ensure `npm run build` exits with code `0` before opening a pull request.

### 4. 3D & WebGL Guidelines
- Avoid heavy uncompressed assets.
- External GLB assets belong in `public/models/` and should use Draco or Meshopt compression with KTX2 textures.
- The procedural couture fallback must remain intact if an external GLB is missing or fails to stream.

### 5. Security & Privacy
- Never commit `.env` files, API keys, private tokens, or customer information.
- Always test forms with sandbox mock data only.

## Pull Request Process
1. Create a feature branch: `git checkout -b feature/your-feature-name`.
2. Commit changes with clear, semantic commit messages.
3. Verify that `npm run build` succeeds cleanly.
4. Push your branch and open a Pull Request against `main`.

