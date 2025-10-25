import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, targetLang, sourceLang = "da" } = await req.json();
    
    // Input validation - security measure against abuse
    if (!text || typeof text !== 'string') {
      return new Response(
        JSON.stringify({ error: "Text is required and must be a string" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Length limit to prevent resource exhaustion attacks
    const MAX_TEXT_LENGTH = 5000;
    if (text.length > MAX_TEXT_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Text must be less than ${MAX_TEXT_LENGTH} characters` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate targetLang against allowed values to prevent injection
    const allowedLanguages = ['en', 'fr', 'de', 'da', 'sv', 'no'];
    if (!targetLang || typeof targetLang !== 'string' || !allowedLanguages.includes(targetLang)) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid target language", 
          allowed: allowedLanguages 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate sourceLang
    if (typeof sourceLang !== 'string' || !allowedLanguages.includes(sourceLang)) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid source language", 
          allowed: allowedLanguages 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Language name mapping for better prompts
    const languageNames: Record<string, string> = {
      da: "Danish",
      en: "English", 
      de: "German",
      fr: "French",
      sv: "Swedish",
      no: "Norwegian"
    };

    const sourceLangName = languageNames[sourceLang] || sourceLang;
    const targetLangName = languageNames[targetLang] || targetLang;

    const systemPrompt = `You are a professional translator specializing in website localization for an electrical services company called "Billig Elektriker" (Cheap Electrician).

Your task:
- Translate from ${sourceLangName} to ${targetLangName}
- Maintain professional tone while keeping it approachable
- Preserve any HTML tags, special characters, emojis, and formatting
- Keep technical terms accurate (e.g., "Smart Home", "LED", "IP65")
- Adapt marketing language naturally for the target culture
- For brand names like "Billig Elektriker", keep the original Danish name but you can add a translation in parentheses if it helps clarity

Return ONLY the translated text, nothing else.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Translate this text:\n\n${text}` }
        ],
        temperature: 0.3, // Lower temperature for more consistent translations
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Translation service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content?.trim();

    if (!translatedText) {
      throw new Error("No translation returned from AI");
    }

    return new Response(
      JSON.stringify({ 
        translatedText,
        sourceLang,
        targetLang 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Translation error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
