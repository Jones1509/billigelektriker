# 🌍 Komplet Oversættelsessystem - ALLE SIDER

## Problem
Kun forsiden blev oversat. ALLE andre sider (login, profil, kontakt, om os, etc.) havde stadig hardcoded tekst.

## Løsning
Automatisk system der scanner, fikser og oversætter ALLE komponenter og sider.

---

## 🚀 Sådan Bruger Du Systemet

### STEP 1: Scan Projektet
Se hvilke filer der har hardcoded tekst:

```bash
npx tsx src/scripts/scan-all-pages.ts
```

Dette viser:
- Antal filer med problemer
- Hvilke linjer der skal fixes
- Total antal hardcoded strings

### STEP 2: Auto-Fix Alle Filer
Wrapper automatisk ALT hardcoded tekst i t():

```bash
npx tsx src/scripts/auto-fix-all.ts
```

Dette:
- ✅ Tilføjer `useTranslation` import
- ✅ Tilføjer `const { t } = useTranslation()` 
- ✅ Wrapper JSX tekst i `{t('key')}`
- ✅ Wrapper attributes i `{t('key')}`
- ✅ Opdaterer `da.json` med nye keys

### STEP 3: Oversæt Til Alle Sprog
Batch-oversætter til engelsk, fransk og tysk:

```bash
npx tsx src/scripts/translate-all-languages.ts
```

Dette:
- ✅ Læser alle danske tekster
- ✅ Oversætter via Lovable AI
- ✅ Gemmer til `en.json`, `fr.json`, `de.json`
- ✅ Bevarer nested struktur

### STEP 4: Test Grundigt
```bash
npm run dev
```

Test HVER side i ALLE sprog (dansk, engelsk, fransk, tysk).

---

## 📁 Scripts Oprettet

```
src/scripts/
├── scan-all-pages.ts           # Scanner ALLE filer for hardcoded text
├── auto-fix-all.ts             # Wrapper automatisk i t()
└── translate-all-languages.ts  # Batch oversættelse til alle sprog
```

---

## ✅ Forventet Resultat

Efter korrekt implementation:

✅ **100%** af UI er oversat  
✅ **0** hardcoded strings tilbage  
✅ **4** sprog fuldt understøttet  
✅ **Alle** sider og komponenter dækket
