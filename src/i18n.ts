import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


import enCommon from './locales/en/common.json';
import enLanding from './locales/en/landing.json';
import enAuth from './locales/en/auth.json';
import enDashboard from './locales/en/dashboard.json';
import viCommon from './locales/vi/common.json';
import viLanding from './locales/vi/landing.json';
import viAuth from './locales/vi/auth.json';
import viDashboard from './locales/vi/dashboard.json';

const resources = {
  en: {
    common: enCommon,
    landing: enLanding,
    auth: enAuth,
    dashboard: enDashboard,
  },
  vi: {
    common: viCommon,
    landing: viLanding,
    auth: viAuth,
    dashboard: viDashboard,
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
    ns: ['common', 'landing', 'auth', 'dashboard'],
  });

export default i18n;
