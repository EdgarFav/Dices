import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../assets/i18n/en.json";
import translationES from "../assets/i18n/es.json";

import translationDE from "../assets/i18n/de.json";
import translationJA from "../assets/i18n/ja.json";
import translationZH from "../assets/i18n/zh.json";

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  de: {
    translation: translationDE,
  },
  ja: {
    translation: translationJA,
  },
  zh: {
    translation: translationZH,
  },
};

i18n.use(initReactI18next).init({
  // we init with resources
  resources,
  fallbackLng: ["en", "es", "de", "ja", "zh"],
  //debug: true,
  languages: ["en", "es", "de", "ja", "zh"],
  debug: false,
  lng: localStorage.getItem("language"),
  // have a common namespace used around the full app
  ns: ["translation"],
  defaultNS: "translation",
});

export default i18n;
