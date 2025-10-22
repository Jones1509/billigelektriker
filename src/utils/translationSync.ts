/**
 * Translation Synchronization Utility
 * 
 * This utility provides functions to automatically translate and sync
 * translation files across all supported languages.
 */

const TRANSLATION_ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate`;

export interface TranslationProgress {
  total: number;
  completed: number;
  current: string;
  status: 'idle' | 'translating' | 'complete' | 'error';
  error?: string;
}

/**
 * Translate a single text string
 */
export async function translateText(
  text: string,
  targetLang: string,
  sourceLang: string = 'da'
): Promise<string> {
  try {
    const response = await fetch(TRANSLATION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        text,
        targetLang,
        sourceLang,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Translation failed');
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    // Return original text as fallback
    return text;
  }
}

/**
 * Recursively translate all string values in an object
 */
export async function translateObject(
  obj: Record<string, any>,
  targetLang: string,
  sourceLang: string = 'da',
  onProgress?: (progress: TranslationProgress) => void
): Promise<Record<string, any>> {
  const result: Record<string, any> = {};
  const keys = Object.keys(obj);
  let completed = 0;

  for (const key of keys) {
    const value = obj[key];
    
    if (onProgress) {
      onProgress({
        total: keys.length,
        completed,
        current: key,
        status: 'translating',
      });
    }

    if (typeof value === 'string') {
      // Translate string values
      result[key] = await translateText(value, targetLang, sourceLang);
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } else if (Array.isArray(value)) {
      // Translate array items
      result[key] = await Promise.all(
        value.map(item => 
          typeof item === 'string' 
            ? translateText(item, targetLang, sourceLang)
            : item
        )
      );
    } else if (typeof value === 'object' && value !== null) {
      // Recursively translate nested objects
      result[key] = await translateObject(value, targetLang, sourceLang, onProgress);
    } else {
      // Keep other types as-is
      result[key] = value;
    }

    completed++;
  }

  if (onProgress) {
    onProgress({
      total: keys.length,
      completed,
      current: '',
      status: 'complete',
    });
  }

  return result;
}

/**
 * Get all translation keys from an object (flattened)
 */
export function flattenTranslationKeys(
  obj: Record<string, any>,
  prefix: string = ''
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      result[fullKey] = value;
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'string') {
          result[`${fullKey}.${index}`] = item;
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenTranslationKeys(value, fullKey));
    }
  }

  return result;
}

/**
 * Find missing translation keys between source and target
 */
export function findMissingKeys(
  sourceObj: Record<string, any>,
  targetObj: Record<string, any>
): string[] {
  const sourceKeys = new Set(Object.keys(flattenTranslationKeys(sourceObj)));
  const targetKeys = new Set(Object.keys(flattenTranslationKeys(targetObj)));
  
  return Array.from(sourceKeys).filter(key => !targetKeys.has(key));
}

/**
 * Compare and report translation coverage
 */
export function getTranslationCoverage(
  sourceObj: Record<string, any>,
  targetObj: Record<string, any>
): {
  total: number;
  translated: number;
  missing: number;
  percentage: number;
  missingKeys: string[];
} {
  const sourceKeys = flattenTranslationKeys(sourceObj);
  const targetKeys = flattenTranslationKeys(targetObj);
  
  const total = Object.keys(sourceKeys).length;
  const translated = Object.keys(targetKeys).length;
  const missing = total - translated;
  const percentage = total > 0 ? (translated / total) * 100 : 0;
  
  const missingKeys = findMissingKeys(sourceObj, targetObj);

  return {
    total,
    translated,
    missing,
    percentage: Math.round(percentage * 100) / 100,
    missingKeys,
  };
}
