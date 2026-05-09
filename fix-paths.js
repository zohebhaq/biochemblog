const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');

function walkDir(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.html')) {
      fixFile(fullPath);
    }
  }
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Calculate relative depth from file to outDir root
  const relDir = path.relative(outDir, path.dirname(filePath));
  const depth = relDir ? relDir.split(path.sep).filter(Boolean).length : 0;
  const prefix = depth > 0 ? '../'.repeat(depth) : './';

  // Replace absolute asset paths with relative ones
  content = content.replace(/(["'])(\/_next\/)/g, `$1${prefix}_next/`);
  content = content.replace(/(["'])(\/images\/)/g, `$1${prefix}images/`);
  content = content.replace(/(["'])(\/favicon)/g, `$1${prefix}favicon`);
  // Fix link hrefs for navigation
  content = content.replace(/(["'])(\/articles\/)/g, `$1${prefix}articles/`);
  content = content.replace(/href="\/"/g, `href="${prefix}"`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed:', filePath);
}

walkDir(outDir);
console.log('Done! All paths are now relative.');
