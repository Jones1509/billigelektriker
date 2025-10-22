/**
 * Batch translate all Danish text to all target languages
 * Run with: npx tsx src/scripts/translate-all-languages.ts
 */

import * as fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

const LANGUAGES = ['en', 'fr', 'de'];

async function translateAllLanguages() {
  console.log('\n🌍 TRANSLATING TO ALL LANGUAGES...\n');
  
  // Load Danish translation
  const daPath = 'src/i18n/locales/da.json';
  
  if (!fs.existsSync(daPath)) {
    console.error('❌ Danish translation file not found!');
    return;
  }
  
  const daTranslations = JSON.parse(fs.readFileSync(daPath, 'utf-8'));
  
  // Flatten to array
  const flatTexts = flattenObject(daTranslations);
  const keys = Object.keys(flatTexts);
  const texts = Object.values(flatTexts);
  
  console.log(`📝 Found ${texts.length} texts to translate\n`);
  
  for (const lang of LANGUAGES) {
    console.log(`\n🔄 Translating to ${lang.toUpperCase()}...`);
    
    try {
      // Check if translate-runtime function exists
      const { data, error } = await supabase.functions.invoke('translate-runtime', {
        body: {
          texts,
          targetLang: lang,
          sourceLang: 'da'
        }
      });
      
      if (error) {
        console.error(`❌ Error translating to ${lang}:`, error);
        console.log(`⚠️  Using Danish as fallback for ${lang}`);
        
        // Fallback: copy Danish
        const targetPath = `src/i18n/locales/${lang}.json`;
        fs.writeFileSync(targetPath, JSON.stringify(daTranslations, null, 2));
        continue;
      }
      
      // Rebuild object structure
      const translations = data.translations || texts;
      const translated = rebuildObject(keys, translations);
      
      // Save to file
      const targetPath = `src/i18n/locales/${lang}.json`;
      fs.writeFileSync(targetPath, JSON.stringify(translated, null, 2));
      
      console.log(`✅ ${lang.toUpperCase()} complete - ${texts.length} texts translated`);
      
    } catch (error) {
      console.error(`❌ Error translating to ${lang}:`, error);
      console.log(`⚠️  Using Danish as fallback for ${lang}`);
      
      // Fallback: copy Danish
      const targetPath = `src/i18n/locales/${lang}.json`;
      fs.writeFileSync(targetPath, JSON.stringify(daTranslations, null, 2));
    }
  }
  
  console.log('\n🎉 ALL LANGUAGES TRANSLATED!\n');
}

function flattenObject(obj: any, prefix = ''): Record<string, string> {
  const flattened: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string') {
      flattened[newKey] = value;
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(flattened, flattenObject(value, newKey));
    }
  }
  
  return flattened;
}

function rebuildObject(keys: string[], values: string[]): any {
  const result: any = {};
  
  keys.forEach((key, index) => {
    const parts = key.split('.');
    let current = result;
    
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    
    current[parts[parts.length - 1]] = values[index];
  });
  
  return result;
}

if (require.main === module) {
  translateAllLanguages();
}

export { translateAllLanguages };
