import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const body = await req.json();
    const { text, texts, targetLang, sourceLang = 'da' } = body;
    
    // Support both single text and batch texts
    const textsToTranslate = texts || (text ? [text] : []);
    
    if (textsToTranslate.length === 0 || !targetLang) {
      return new Response(
        JSON.stringify({ error: 'Missing text/texts or targetLang' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Input validation
    const MAX_TEXT_LENGTH = 10000;
    const MAX_BATCH_SIZE = 100;
    const SUPPORTED_LANGS = ['da', 'en', 'de', 'fr', 'sv', 'no'];

    if (textsToTranslate.length > MAX_BATCH_SIZE) {
      return new Response(
        JSON.stringify({ error: `Maximum ${MAX_BATCH_SIZE} texts allowed per request` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    for (const txt of textsToTranslate) {
      if (typeof txt !== 'string') {
        return new Response(
          JSON.stringify({ error: 'All texts must be strings' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (txt.length > MAX_TEXT_LENGTH) {
        return new Response(
          JSON.stringify({ error: `Text exceeds maximum length of ${MAX_TEXT_LENGTH} characters` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    if (!SUPPORTED_LANGS.includes(targetLang)) {
      return new Response(
        JSON.stringify({ error: `Unsupported target language. Supported: ${SUPPORTED_LANGS.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!SUPPORTED_LANGS.includes(sourceLang)) {
      return new Response(
        JSON.stringify({ error: `Unsupported source language. Supported: ${SUPPORTED_LANGS.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Translating ${textsToTranslate.length} texts from ${sourceLang} to ${targetLang}`);
    
    // Translate all texts
    const translations = await Promise.all(
      textsToTranslate.map((txt: string) => translateText(txt, targetLang))
    );
    
    // Return single translation or array based on input
    const result = texts ? { translations } : { translation: translations[0] };
    
    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Translation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function translateText(text: string, targetLang: string): Promise<string> {
  if (!LOVABLE_API_KEY) {
    console.warn('No LOVABLE_API_KEY found, returning original text');
    return text;
  }

  const langMap: { [key: string]: string } = {
    'en': 'English',
    'fr': 'French',
    'de': 'German',
    'da': 'Danish'
  };

  const targetLanguage = langMap[targetLang] || targetLang;

  try {
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a professional translator. Translate the given text from Danish to ${targetLanguage}. Only return the translated text, nothing else. Preserve formatting and tone.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      return text;
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Translation failed:', error);
    return text;
  }
}
