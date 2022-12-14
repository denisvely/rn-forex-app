import { StyleSheet, Platform } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "utils";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.backgroundColorGrey,
  },
  accountInfo: {
    width: deviceWidth - 48,
    height: 80,
    backgroundColor: colors.blueColor,
    borderRadius: 4,
    marginTop: 24,
    overflow: "hidden",
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 19,
    paddingLeft: 20,
  },
  accountInfoText: {
    color: colors.white,
  },
  accountInfoBG: {
    position: "absolute",
    bottom: -40,
    right: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  scrollView: {
    marginTop: 24,
  },
});
