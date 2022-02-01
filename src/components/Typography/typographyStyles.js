import { StyleSheet } from "react-native";

const defaultFont = "Gilroy-Regular";
const defaultBold = "Gilroy-Bold";
const defaultMedium = "Gilroy-Medium";

export default StyleSheet.create({
  ultraTiny: {
    fontSize: 10,
    lineHeight: 12,
    fontFamily: defaultFont,
  },
  tiny: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: defaultFont,
  },
  tinyBold: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: defaultBold,
  },
  small: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: defaultFont,
  },
  normal: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: defaultFont,
  },
  normalBold: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: defaultBold,
  },
  medium: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: defaultFont,
  },
  mediumBold: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: defaultBold,
  },
  large: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: defaultFont,
  },
  largeBold: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: defaultBold,
  },
  extraLargeNormal: {
    fontSize: 26,
    lineHeight: 31,
    fontFamily: defaultFont,
  },
  extraLarge: {
    fontSize: 26,
    lineHeight: 31,
    fontFamily: defaultMedium,
  },
  extraLargeBold: {
    fontSize: 26,
    lineHeight: 31,
    fontFamily: defaultBold,
  },
  grand: {
    fontSize: 34,
    lineHeight: 41,
    fontFamily: defaultMedium,
  },
  grandBold: {
    fontSize: 34,
    lineHeight: 41,
    fontFamily: defaultBold,
  },
  massive: {
    fontSize: 44,
    lineHeight: 53,
    fontFamily: defaultBold,
  },
  massiveRegular: {
    fontSize: 44,
    lineHeight: 70,
    fontFamily: defaultFont,
  },
  huge: {
    fontSize: 53,
    lineHeight: 72,
    fontFamily: defaultFont,
  },
  boss: {
    fontSize: 66,
    lineHeight: 66,
    fontFamily: defaultBold,
  },
});
