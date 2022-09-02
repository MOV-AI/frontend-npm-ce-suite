import { i18nHelper } from "@mov-ai/mov-fe-lib-react";
import { Translations as ideCeTranslations } from "@mov-ai/mov-fe-lib-ide";
import translationEN from "./locales/en/translation.json";
import translationPT from "./locales/pt/translation.json";

const files = {
  en: {
    ...ideCeTranslations.en,
    ...translationEN,
  },
  pt: {
    ...ideCeTranslations.pt,
    ...translationPT,
  },
};
const i18n = i18nHelper.createInstance(files);
export default i18n;
