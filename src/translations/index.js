import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import languages from "./languages";
import languageDetector from "./languageDetector";

import {lang} from "../constants";

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: lang.EN.toLocaleLowerCase(),
        resources: languages,
        react: {
            useSuspense: false,
        },
    });

export default i18n;
