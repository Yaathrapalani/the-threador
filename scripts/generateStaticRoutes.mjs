import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html does not exist.');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexPath, 'utf-8');

const routes = [
  'kids',
  'men',
  'women',
  'collections',
  'atelier',
  'annual-day',
  'annualday',
  'course',
  'education',
  'gallery',
  'about',
  'about-us',
  'contact',
  'product'
];

for (const route of routes) {
  // 1. Directory with index.html (e.g. /kids/index.html)
  const dirPath = path.join(distDir, route);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'index.html'), indexContent);

  // 2. Clean HTML file (e.g. /kids.html)
  fs.writeFileSync(path.join(distDir, `${route}.html`), indexContent);
}

// 3. Fallback 404.html for any deep route
fs.writeFileSync(path.join(distDir, '404.html'), indexContent);

console.log(`Generated static route fallbacks for ${routes.length} routes + 404.html in dist/`);
