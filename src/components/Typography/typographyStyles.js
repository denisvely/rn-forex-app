import { StyleSheet } from "react-native";
const defaultFont = "Gilroy-Medium";
const defaultBold = "Gilroy-Bold";
const defaultSemiBold = "Gilroy-SemiBold";
const defaultRegular = "Gilroy-Regular";

export default StyleSheet.create({
  nano: {
    fontSize: 10,
    lineHeight: 12,
    fontFamily: defaultFont,
  },
  nanoBold: {
    fontSize: 10,
    lineHeight: 12,
    fontFamily: defaultBold,
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
  smallRegular: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: defaultFont,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: defaultSemiBold,
  },
  normal: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: defaultFont,
  },
  normalBold: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: defaultBold,
  },
  bigNormal: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: defaultFont,
  },
  bigNormalBold: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: defaultSemiBold,
  },
  medium: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: defaultSemiBold,
  },
  mediumBold: {
    fontSize: 20,
    lineHeight: 22,
    fontFamily: defaultBold,
  },
  large: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily: defaultFont,
  },
  largeBold: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily: defaultBold,
  },
});
