/* eslint-disable no-empty-function */
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

const languageDetector = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async (callback) => {
    await AsyncStorage.getItem("language", (err, lng) => {
      if (err || !lng) {
        if (err) {
          console.log('Error fetching "APP_LANG" from async store', err);
        } else {
          console.log(
            "No language is set, choosing the best available or English as fallback"
          );
        }
        const bestLng = Localization.locale.replace("_", "-");

        callback(bestLng);
        return;
      }
      callback(lng);
    });
  },
  cacheUserLanguage: () => {},
};

export default languageDetector;
