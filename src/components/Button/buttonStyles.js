import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "../../utils";

const borderRadiusBig = 24;
const borderRadiusSmall = 20;
const borderRadiusTinyMedium = 16;
const borderRadiusTiny = 16;

const defaultButtonStyles = {
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  position: "relative",
  top: 0,
  left: 0,
  minWidth: "100%",
};
export default {
  buttons: {
    default: StyleSheet.create({
      button: {
        ...defaultButtonStyles,
      },
      disabled: {
        ...defaultButtonStyles,
        color: colors.primaryColorBlack,
        backgroundColor: colors.systemColorInactive,
      },
      text: {
        color: colors.primaryColorWhite,
      },
    }),
    primary: StyleSheet.create({
      button: {
        ...defaultButtonStyles,
        backgroundColor: colors.brandsPrimary,
      },
      disabled: {
        ...defaultButtonStyles,
        color: colors.primaryColorBlack,
        backgroundColor: colors.systemColorInactive,
      },
      text: {
        color: colors.primaryColorWhite,
      },
    }),
    secondary: StyleSheet.create({
      button: {
        ...defaultButtonStyles,
        backgroundColor: colors.primaryColorWhite,
      },
      text: {
        color: colors.textColor,
      },
      markedButtonText: {
        color: colors.brandsPrimary,
      },
      marked: {
        borderWidth: 1,
        borderColor: colors.brandsPrimary,
      },
    }),
    text: StyleSheet.create({
      button: {
        ...defaultButtonStyles,
      },
      text: {
        color: colors.primaryColorBlack,
      },
      disabled: {
        ...defaultButtonStyles,
        color: colors.primaryColorBlack,
        opacity: 0.3,
      },
      pressed: {
        backgroundColor: colors.primaryColorGray,
      },
    }),
  },
  sizes: StyleSheet.create({
    bigRadius: {
      borderRadius: borderRadiusBig,
    },
    smallRadius: {
      borderRadius: borderRadiusSmall,
    },
    tinyMediumRadius: {
      borderRadius: borderRadiusTinyMedium,
    },
    tinyRadius: {
      borderRadius: borderRadiusTiny,
    },
    big: {
      maxWidth: deviceWidth - 32,
      minWidth: "64%",
      height: 48,
    },
    small: {
      maxWidth: 120,
      minWidth: "31%",
      height: 40,
    },
    tinyMedium: {
      maxWidth: 72,
      height: 32,
      marginBottom: 5,
    },
    tiny: {
      maxWidth: 66,
      height: 32,
      marginBottom: 5,
    },
  }),
};
