import { StyleSheet } from "react-native";
const defaultFont = "Gilroy-Medium";
const defaultBold = "Gilroy-Bold";
const defaultSemiBold = "Gilroy-SemiBold";

export default StyleSheet.create({
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
  smallBold: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: defaultFont,
  },
  normal: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: defaultBold,
  },
  normalBold: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: defaultBold,
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
