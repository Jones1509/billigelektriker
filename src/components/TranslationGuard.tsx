import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

export function TranslationGuard() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Watch for DOM changes
    const observer = new MutationObserver(async (mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            await scanAndFixElement(node as Element);
          }
        }
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
    
    // Initial scan
    scanAndFixElement(document.body);
    
    return () => observer.disconnect();
  }, [i18n.language]);
  
  async function scanAndFixElement(element: Element) {
    const currentLang = i18n.language;
    
    // Scan all text nodes
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT
    );
    
    const nodesToFix: { node: Node; text: string }[] = [];
    let node;
    
    while (node = walker.nextNode()) {
      const text = node.textContent?.trim();
      if (!text || text.length < 2) continue;
      
      // Detect if text is in wrong language
      if (isWrongLanguage(text, currentLang)) {
        nodesToFix.push({ node, text });
      }
    }
    
    // Fix all detected issues
    for (const { node, text } of nodesToFix) {
      const translated = await translateRuntime(text, currentLang);
      if (translated !== text) {
        node.textContent = translated;
        console.log(`🔄 Runtime fix: "${text}" -> "${translated}"`);
      }
    }
    
    // Check attributes
    element.querySelectorAll('[placeholder], [title], [alt]').forEach(async el => {
      ['placeholder', 'title', 'alt'].forEach(async attr => {
        const value = el.getAttribute(attr);
        if (value && isWrongLanguage(value, currentLang)) {
          const translated = await translateRuntime(value, currentLang);
          if (translated !== value) {
            el.setAttribute(attr, translated);
            console.log(`🔄 Runtime fix ${attr}: "${value}" -> "${translated}"`);
          }
        }
      });
    });
  }
  
  function isWrongLanguage(text: string, currentLang: string): boolean {
    if (currentLang === 'da') return false; // Danish is source
    
    // Check for Danish-specific patterns
    const danishPatterns = [
      /[æøå]/i,
      /\b(og|til|fra|med|som|eller|det|skal|være|kan|vil|have|alle)\b/i
    ];
    
    // Check for French patterns when not in French
    const frenchPatterns = [
      /[àâäéèêëïîôùûü]/i,
      /\b(de la|du|le|les|à|avec|pour|sur)\b/i
    ];
    
    if (currentLang !== 'da' && danishPatterns.some(p => p.test(text))) {
      return true;
    }
    
    if (currentLang !== 'fr' && frenchPatterns.some(p => p.test(text))) {
      return true;
    }
    
    return false;
  }
  
  async function translateRuntime(text: string, targetLang: string): Promise<string> {
    // Check session cache
    const cacheKey = `translate_${text}_${targetLang}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return cached;
    
    try {
      // Call edge function for translation
      const { data, error } = await supabase.functions.invoke('translate-runtime', {
        body: { text, targetLang }
      });
      
      if (error) throw error;
      
      const translation = data.translation || text;
      
      // Cache it
      sessionStorage.setItem(cacheKey, translation);
      
      return translation;
    } catch (error) {
      console.error('Runtime translation failed:', error);
      return text;
    }
  }
  
  return null;
}
