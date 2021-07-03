import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import { reactI18nextModule } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

import pl from './locales/pl/translation.json';
import en from './locales/en/translation.json';

const resources = {
  en: {
    translation: en
  },
  pl: {
    translation: pl
  }
};
 
i18n
  .use(initReactI18next)
  // .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "pl",
    debug: true,
 
    // // have a common namespace used around the full app
    // ns: ["translations"],
    // defaultNS: "translations",
 
    keySeparator: ".",
 
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ","
    },
 
    react: {
      wait: true
    }
  });
 
export default i18n;