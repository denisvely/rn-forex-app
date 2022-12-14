import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import { deviceWidth } from "../../utils";

const borderRadiusBig = 4;
const borderRadiusSmall = 4;
const borderRadiusTinyMedium = 4;
const borderRadiusTiny = 4;

const defaultButtonStyles = {
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  position: "relative",
  top: 0,
  left: 0,
  minWidth: "100%",
  borderRadius: 4,
};
export default {
  buttons: {
    default: StyleSheet.create({
      button: {
        ...defaultButtonStyles,
      },
      disabled: {
        ...defaultButtonStyles,
        color: colors.black,
        backgroundColor: colors.systemColorInactive,
      },
      text: {
        color: colors.white,
      },
    }),
    primary: StyleSheet.create({
      button: {
        ...defaultButtonStyles,
        backgroundColor: colors.buttonPrimary,
      },
      disabled: {
        ...defaultButtonStyles,
        color: colors.black,
        backgroundColor: colors.systemColorInactive,
      },
      text: {
        color: colors.white,
      },
    }),
    secondary: StyleSheet.create({
      button: {
        ...defaultButtonStyles,
        backgroundColor: colors.white,
      },
      text: {
        color: colors.fontPrimaryColor,
      },
      markedButtonText: {
        color: colors.buttonPrimary,
      },
      marked: {
        borderWidth: 1,
        borderColor: colors.buttonPrimary,
      },
    }),
    white: StyleSheet.create({
      button: {
        ...defaultButtonStyles,
        backgroundColor: colors.white,
      },
      text: {
        color: colors.green,
      },
      markedButtonText: {
        color: colors.buttonPrimary,
      },
      marked: {
        borderWidth: 1,
        borderColor: colors.buttonPrimary,
      },
    }),
    text: StyleSheet.create({
      button: {
        ...defaultButtonStyles,
      },
      text: {
        color: colors.black,
      },
      disabled: {
        ...defaultButtonStyles,
        color: colors.black,
        opacity: 0.3,
      },
      pressed: {
        backgroundColor: colors.primaryColorGray,
      },
    }),
    buy: StyleSheet.create({
      button: {
        ...defaultButtonStyles,
        color: colors.white,
        backgroundColor: colors.buyColor,
        borderRadius: borderRadiusSmall,
      },
      disabled: {
        ...defaultButtonStyles,
        color: colors.black,
        backgroundColor: colors.systemColorInactive,
      },
      text: {
        color: colors.white,
      },
    }),
    sell: StyleSheet.create({
      button: {
        ...defaultButtonStyles,
        color: colors.white,
        backgroundColor: colors.sellColor,
        borderRadius: borderRadiusSmall,
      },
      disabled: {
        ...defaultButtonStyles,
        color: colors.black,
        backgroundColor: colors.systemColorInactive,
      },
      text: {
        color: colors.white,
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
      height: 50,
    },
    almostBig: {
      maxWidth: deviceWidth - 48,
      height: 50,
    },
    medium: {
      maxWidth: deviceWidth / 2 - 27,
      minWidth: deviceWidth / 2 - 27,
      height: 60,
    },
    halfWidth: {
      width: deviceWidth / 2 - 33,
      height: 50,
    },
    tabButton: {
      height: 36,
      width: "100%",
    },
    small: {
      maxWidth: 120,
      minWidth: "31%",
      height: 40,
    },
    tinyMedium: {
      maxWidth: 72,
      height: 31,
      marginBottom: 5,
    },
    tiny: {
      maxWidth: 65,
      height: 31,
      marginBottom: 5,
    },
  }),
};
