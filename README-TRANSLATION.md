# 🌍 Automatisk Oversættelsessystem

Dette projekt har et komplet automatisk oversættelsessystem implementeret med Lovable AI.

## 📋 Oversigt

Systemet oversætter automatisk ALT indhold fra dansk til alle understøttede sprog:
- 🇬🇧 English
- 🇩🇪 Deutsch  
- 🇫🇷 Français

## 🚀 Hvordan virker det?

### 1. Edge Function til Oversættelse
- **Placering**: `supabase/functions/translate/index.ts`
- **Funktion**: Oversætter tekst med Lovable AI (Gemini 2.5 Flash)
- **Features**:
  - Bevarar formatering, HTML tags, og emojis
  - Tilpasset til el-branchen
  - Professionel tone
  - Kontekstbevidst oversættelse

### 2. Translation Utilities
- **Placering**: `src/utils/translationSync.ts`
- **Funktioner**:
  - `translateText()` - Oversæt enkelt tekst
  - `translateObject()` - Oversæt hele JSON objekter
  - `getTranslationCoverage()` - Tjek oversættelsesdækning
  - `findMissingKeys()` - Find manglende oversættelser

### 3. Translation Manager (Admin UI)
- **URL**: `/admin/translations`
- **Features**:
  - ✅ Se oversættelsesdækning for alle sprog
  - 🔄 Automatisk oversættelse af alle sprog på én gang
  - 📥 Download oversatte JSON filer
  - 📊 Live progress tracking

### 4. Translation Check (Status Rapport)
- **URL**: `/admin/translation-check`
- **Features**:
  - 📊 Detaljeret status for hver sprog
  - 🔍 Liste over manglende oversættelser
  - ✅ Validering af oversættelsesdækning

## 🎯 Sådan bruger du systemet

### Quick Start: Oversæt alt indhold

1. **Åbn Translation Manager**
   ```
   Gå til: http://localhost:8080/admin/translations
   ```

2. **Klik på "Oversæt alle sprog"**
   - Systemet oversætter automatisk fra dansk til alle sprog
   - Progress bar viser fremskridt
   - Tager 2-5 minutter afhængigt af mængden af tekst

3. **Download oversættelser**
   - JSON filer downloades automatisk
   - Alternativt: Klik på individuelle sprog for at downloade

4. **Erstat filerne**
   ```bash
   # Kopiér de downloadede filer til:
   src/i18n/locales/en.json
   src/i18n/locales/de.json
   src/i18n/locales/fr.json
   ```

5. **✅ Færdig!**
   - Genstart dev server hvis nødvendigt
   - Alle oversættelser er nu opdateret

### Tjek oversættelsesdækning

```
Gå til: http://localhost:8080/admin/translation-check
```

Dette viser:
- Hvor mange procent af hver sprog er oversat
- Hvilke nøgler mangler
- Original dansk tekst for manglende nøgler

## 🔧 Tilføj nye oversættelser

### Method 1: Via koden (anbefalet)

1. **Tilføj til dansk fil** (`src/i18n/locales/da.json`):
   ```json
   {
     "newSection": {
       "title": "Ny overskrift",
       "description": "Ny beskrivelse"
     }
   }
   ```

2. **Brug i komponenter**:
   ```tsx
   import { useTranslation } from "react-i18next";
   
   function MyComponent() {
     const { t } = useTranslation();
     return <h1>{t('newSection.title')}</h1>;
   }
   ```

3. **Kør auto-oversættelse**:
   - Gå til `/admin/translations`
   - Klik "Oversæt alle sprog"
   - Download og erstat filerne

### Method 2: Programmatisk

```typescript
import { translateText } from "@/utils/translationSync";

const translated = await translateText(
  "Din danske tekst her",
  "en", // Target sprog
  "da"  // Source sprog
);

console.log(translated); // "Your Danish text here"
```

## 📝 Best Practices

### DO ✅
- **Brug altid `t()` funktionen** for alt synligt indhold
- **Brug beskrivende keys**: `hero.callToAction` ikke `btn1`
- **Organiser i namespaces**: Group relateret indhold
- **Test på alle sprog** efter oversættelse
- **Kør auto-translate** når du tilføjer nye tekster

### DON'T ❌
- **Aldrig hardcode tekst** direkte i komponenter
- **Aldrig manual oversættelse** - brug systemet
- **Aldrig skip validation** - tjek altid coverage
- **Aldrig glem at downloade** nye oversættelser

## 🔍 Debugging

### Problem: Tekst vises ikke oversat

1. Tjek om teksten bruger `t()`:
   ```tsx
   // ❌ Forkert
   <h1>Hardcoded text</h1>
   
   // ✅ Korrekt
   <h1>{t('section.title')}</h1>
   ```

2. Tjek om key findes i translation file:
   ```bash
   # Søg i da.json
   grep "section.title" src/i18n/locales/da.json
   ```

3. Tjek oversættelsesdækning:
   ```
   Gå til: /admin/translation-check
   ```

### Problem: Oversættelse er dårlig kvalitet

1. Opdatér system prompt i edge function
2. Juster temperature (lavere = mere konsistent)
3. Tilføj specifikke termer til prompt

### Problem: Rate limit fejl

- Du sender for mange requests
- Vent 60 sekunder mellem store batches
- Systemet har automatisk 100ms delay mellem requests

## 🌟 Features

- ✅ **100% automatisk** - Ingen manuel oversættelse nødvendig
- 🚀 **AI-drevet** - Professionel kvalitet med Lovable AI
- 📊 **Tracking** - Se præcis hvad der mangler
- 🔄 **Synkronisering** - Hold alle sprog opdaterede
- 💾 **Download** - Eksportér til JSON
- 🎯 **Validering** - Sikr komplet dækning

## 🆘 Support

Hvis du støder på problemer:

1. Tjek console logs for fejl
2. Verificer at Lovable AI er aktiveret
3. Tjek at LOVABLE_API_KEY er konfigureret
4. Gå til `/admin/translation-check` for diagnostics

## 📚 Relaterede filer

- `supabase/functions/translate/index.ts` - Edge function
- `src/utils/translationSync.ts` - Utility funktioner  
- `src/pages/TranslationAdmin.tsx` - Admin UI
- `src/pages/TranslationCheck.tsx` - Status rapport
- `src/i18n/config.ts` - i18n konfiguration
- `src/i18n/locales/*.json` - Translation files

---

**Pro tip**: Kør auto-translate hver gang du tilføjer nye features for at holde alle sprog 100% opdaterede! 🎉
