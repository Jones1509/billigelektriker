import { Plugin } from 'vite';
import MagicString from 'magic-string';
import * as fs from 'fs';
import * as path from 'path';

interface TranslationCache {
  [key: string]: {
    da: string;
    en: string;
    fr: string;
    de: string;
  };
}

const translationCache: TranslationCache = {};
let cacheModified = false;

export function autoTranslatePlugin(): Plugin {
  return {
    name: 'vite-plugin-auto-translate',
    
    async transform(code: string, id: string) {
      // Only process React components
      if (!id.endsWith('.tsx') && !id.endsWith('.jsx')) return null;
      if (id.includes('node_modules')) return null;
      
      const s = new MagicString(code);
      let modified = false;
      
      // Add useTranslation import if not present
      if (!code.includes('useTranslation') && !code.includes('TranslationGuard')) {
        const importStatement = "import { useTranslation } from 'react-i18next';\n";
        s.prepend(importStatement);
        modified = true;
      }
      
      // Add const { t } in component if not present
      if (!code.includes('const { t }') && code.includes('function ') && !code.includes('TranslationGuard')) {
        const functionMatch = code.match(/function\s+\w+\s*\([^)]*\)\s*{/);
        if (functionMatch) {
          const insertPos = functionMatch.index! + functionMatch[0].length;
          s.appendLeft(insertPos, "\n  const { t } = useTranslation();");
          modified = true;
        }
      }
      
      // Find and wrap hardcoded JSX text
      const jsxTextRegex = />([^<>{}]+)</g;
      let match;
      
      while ((match = jsxTextRegex.exec(code)) !== null) {
        const text = match[1].trim();
        
        // Skip if empty, too short, or looks like a variable
        if (!text || text.length < 2 || /^[{$]/.test(text)) continue;
        if (!/[a-zA-ZæøåÆØÅ]/.test(text)) continue;
        
        // Check if already in t() function
        const before = code.substring(Math.max(0, match.index - 50), match.index);
        if (before.includes("t('") || before.includes('t("')) continue;
        
        // Generate key and wrap
        const key = await generateKeyAndTranslate(text, id);
        const replacement = `>{t('${key}')}<`;
        
        s.overwrite(match.index, match.index + match[0].length, replacement);
        modified = true;
        
        console.log(`✅ Auto-wrapped: "${text}" -> t('${key}')`);
      }
      
      // Find and wrap hardcoded attributes
      const attrRegex = /(placeholder|title|alt|aria-label)=["']([^"']+)["']/g;
      
      while ((match = attrRegex.exec(code)) !== null) {
        const attrName = match[1];
        const text = match[2];
        
        if (!text || text.length < 2) continue;
        
        const before = code.substring(Math.max(0, match.index - 50), match.index);
        if (before.includes('t(')) continue;
        
        const key = await generateKeyAndTranslate(text, id);
        const replacement = `${attrName}={t('${key}')}`;
        
        s.overwrite(match.index, match.index + match[0].length, replacement);
        modified = true;
        
        console.log(`✅ Auto-wrapped ${attrName}: "${text}" -> t('${key}')`);
      }
      
      // Save updated translations to files if modified
      if (cacheModified) {
        await saveTranslations();
        cacheModified = false;
      }
      
      if (!modified) return null;
      
      return {
        code: s.toString(),
        map: s.generateMap({ hires: true })
      };
    }
  };
}

async function generateKeyAndTranslate(text: string, filePath: string): Promise<string> {
  // Check cache first
  const existingKey = Object.keys(translationCache).find(k => translationCache[k].da === text);
  if (existingKey) {
    return existingKey;
  }
  
  // Generate semantic key
  const componentName = path.basename(filePath, path.extname(filePath));
  const sanitized = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .substring(0, 40);
  
  const key = `${componentName.toLowerCase()}.${sanitized}`;
  
  // Translate to all languages using placeholder (will be updated via admin UI)
  const translations = {
    da: text,
    en: text,
    fr: text,
    de: text
  };
  
  // Add to cache
  translationCache[key] = translations;
  cacheModified = true;
  
  return key;
}

async function saveTranslations() {
  const localesDir = path.join(process.cwd(), 'src/i18n/locales');
  
  // Group by language
  const byLanguage: { [lang: string]: any } = {
    da: {},
    en: {},
    fr: {},
    de: {}
  };
  
  // Organize translations by key structure
  Object.entries(translationCache).forEach(([key, translations]) => {
    const parts = key.split('.');
    
    ['da', 'en', 'fr', 'de'].forEach(lang => {
      let current = byLanguage[lang];
      
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      
      current[parts[parts.length - 1]] = translations[lang as keyof typeof translations];
    });
  });
  
  // Write to files
  for (const [lang, translations] of Object.entries(byLanguage)) {
    const filePath = path.join(localesDir, `${lang}.json`);
    
    // Merge with existing
    let existing = {};
    if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    
    const merged = deepMerge(existing, translations);
    
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2));
    console.log(`📝 Updated ${lang}.json`);
  }
}

function deepMerge(target: any, source: any): any {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}
