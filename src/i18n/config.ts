import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import da from './locales/da.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      da: { translation: da },
      en: { translation: en },
      fr: { translation: fr },
      de: { translation: de },
    },
    lng: 'da', // default language
    fallbackLng: 'da',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
