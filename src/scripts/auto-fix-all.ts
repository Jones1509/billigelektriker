/**
 * Automatically fix ALL files by wrapping hardcoded text in t()
 * Run with: npx tsx src/scripts/auto-fix-all.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const IGNORE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /dist/,
  /build/,
  /src\/components\/ui\//,
  /\.test\./,
  /\.spec\./,
];

interface TranslationEntry {
  key: string;
  value: string;
}

const translationCache: TranslationEntry[] = [];
const processedFiles = new Set<string>();

function autoFixFile(filePath: string): boolean {
  if (processedFiles.has(filePath)) return false;
  processedFiles.add(filePath);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  let keyCounter = 0;
  
  // 1. Add import if missing
  if (!content.includes("import { useTranslation }")) {
    const importStatement = "import { useTranslation } from 'react-i18next';\n";
    
    const firstImportIndex = content.indexOf('import');
    if (firstImportIndex !== -1) {
      content = content.slice(0, firstImportIndex) + 
                importStatement + 
                content.slice(firstImportIndex);
    } else {
      content = importStatement + content;
    }
    modified = true;
  }
  
  // 2. Add useTranslation hook
  if (!content.includes("const { t } = useTranslation()")) {
    const functionMatch = content.match(/(export\s+(?:default\s+)?function\s+\w+[^{]*{)/);
    if (functionMatch) {
      const insertPos = functionMatch.index! + functionMatch[0].length;
      content = content.slice(0, insertPos) + 
                "\n  const { t } = useTranslation();\n" + 
                content.slice(insertPos);
      modified = true;
    }
  }
  
  // 3. Wrap JSX text
  const jsxTextRegex = />([^<>{}]+)</g;
  const replacements: Array<{old: string; new: string}> = [];
  let match;
  
  const originalContent = content;
  
  while ((match = jsxTextRegex.exec(originalContent)) !== null) {
    const text = match[1].trim();
    
    if (text.length > 2 && /[a-zA-ZæøåÆØÅ]/.test(text)) {
      const beforeText = originalContent.substring(Math.max(0, match.index - 20), match.index);
      if (beforeText.includes('t(')) continue;
      
      const key = generateTranslationKey(filePath, text, keyCounter++);
      
      replacements.push({
        old: `>${match[1]}<`,
        new: `>{t('${key}')}<`
      });
      
      translationCache.push({ key, value: text });
    }
  }
  
  // Apply JSX replacements
  replacements.forEach(replacement => {
    if (content.includes(replacement.old)) {
      content = content.replace(replacement.old, replacement.new);
      modified = true;
    }
  });
  
  // 4. Wrap attributes
  const attrRegex = /(placeholder|title|alt|aria-label)=["']([^"']+)["']/g;
  const attrReplacements: Array<{old: string; new: string}> = [];
  
  while ((match = attrRegex.exec(originalContent)) !== null) {
    const attr = match[1];
    const text = match[2];
    
    if (text.length > 2 && /[a-zA-ZæøåÆØÅ]/.test(text)) {
      const key = generateTranslationKey(filePath, text, keyCounter++);
      
      attrReplacements.push({
        old: `${attr}="${text}"`,
        new: `${attr}={t('${key}')}`
      });
      
      translationCache.push({ key, value: text });
    }
  }
  
  // Apply attribute replacements
  attrReplacements.forEach(replacement => {
    if (content.includes(replacement.old)) {
      content = content.replace(replacement.old, replacement.new);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  
  return false;
}

function generateTranslationKey(filePath: string, text: string, counter: number): string {
  const fileName = path.basename(filePath, path.extname(filePath));
  
  const textKey = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .substring(0, 30)
    .replace(/^_+|_+$/g, '');
  
  return `${fileName.toLowerCase()}.${textKey}`;
}

function saveAllTranslations() {
  if (translationCache.length === 0) return;
  
  const daPath = 'src/i18n/locales/da.json';
  let existing: any = {};
  
  if (fs.existsSync(daPath)) {
    existing = JSON.parse(fs.readFileSync(daPath, 'utf-8'));
  }
  
  // Merge translations
  translationCache.forEach(({ key, value }) => {
    const parts = key.split('.');
    let current = existing;
    
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    
    current[parts[parts.length - 1]] = value;
  });
  
  fs.writeFileSync(daPath, JSON.stringify(existing, null, 2));
  
  console.log(`\n✅ Added ${translationCache.length} new translation keys to da.json\n`);
}

function processDirectory(dir: string): number {
  let fixedCount = 0;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (IGNORE_PATTERNS.some(pattern => pattern.test(fullPath))) {
      continue;
    }
    
    if (entry.isDirectory()) {
      fixedCount += processDirectory(fullPath);
    } else if (entry.isFile() && /\.(tsx|jsx)$/.test(entry.name)) {
      if (autoFixFile(fullPath)) {
        console.log(`✅ Fixed: ${fullPath}`);
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

function main() {
  console.log('\n🔧 AUTO-FIXING ALL FILES...\n');
  
  const fixedCount = processDirectory('src');
  
  saveAllTranslations();
  
  console.log(`\n🎉 Fixed ${fixedCount} files!\n`);
  console.log('⚠️  Now run: npm run translate-all\n');
}

if (require.main === module) {
  main();
}

export { autoFixFile };
