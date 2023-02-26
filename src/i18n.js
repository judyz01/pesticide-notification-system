import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend) // load translation using xhr -> see /public/locales. We will add locales in the next step

  .use(initReactI18next) // pass the i18n instance to react-i18next.

  .init({
    fallbackLng: "en", 
    debug: true,
    interpolation: {
      escapeValue: false
    },
  });

export default i18n;