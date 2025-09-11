import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


import enCommon from './locales/en/common.json';
import enLanding from './locales/en/landing.json';
import enAuth from './locales/en/auth.json';
import enDashboard from './locales/en/dashboard.json';
import enAiClone from './locales/en/aiClone.json';
import enMemoryBook from './locales/en/memoryBook.json';
import enMmse from './locales/en/mmse.json';
import viCommon from './locales/vi/common.json';
import viLanding from './locales/vi/landing.json';
import viAuth from './locales/vi/auth.json';
import viDashboard from './locales/vi/dashboard.json';
import viAiClone from './locales/vi/aiClone.json';
import viMemoryBook from './locales/vi/memoryBook.json';
import viMmse from './locales/vi/mmse.json';

const resources = {
  en: {
    common: enCommon,
    landing: enLanding,
    auth: enAuth,
    dashboard: enDashboard,
    aiClone: enAiClone,
    memoryBook: enMemoryBook,
    mmse: enMmse,
  },
  vi: {
    common: viCommon,
    landing: viLanding,
    auth: viAuth,
    dashboard: viDashboard,
    aiClone: viAiClone,
    memoryBook: viMemoryBook,
    mmse: viMmse,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    
    defaultNS: 'common',
    
    
    // Separate translation files by namespace
    ns: ['common', 'landing', 'auth', 'dashboard', 'aiClone', 'memoryBook', 'mmse'],
  });

export default i18n;
