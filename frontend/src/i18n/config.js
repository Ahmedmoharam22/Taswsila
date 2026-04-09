import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';

i18n
  .use(LanguageDetector) // بيعرف لغة المتصفح
  .use(initReactI18next) // بيربطها بريأكت
  .init({
   resources: {
      en: {
        translation: enTranslation // التعديل هنا
      },
      ar: {
        translation: arTranslation // التعديل هنا
      },
    },
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, // ريأكت أصلاً بيعمل حماية ضد الـ XSS
    },
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag'],
      caches: ['localStorage'], // يحفظ اختيار اليوزر هنا
    }
  });

export default i18n;