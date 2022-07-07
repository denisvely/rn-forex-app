import { StyleSheet, Platform } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "../../../utils";

export default StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.white,
  },
  contactUsInfo: {
    backgroundColor: colors.white,
    width: deviceWidth - 48,
    marginTop: 16,
  },
  submitBtn: {
    width: deviceWidth - 48,
    minWidth: deviceWidth - 48,
    alignSelf: "center",
  },
  formWrapper: {
    flex: 1,
  },
  buttonsWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 70,
    width: deviceWidth - 48,
    backgroundColor: colors.white,
    zIndex: 10,
    paddingBottom: Platform.OS === "ios" ? 32 : 0,
  },
  message: {
    height: 70,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  additionalInfo: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 30,
  },
  textRight: {
    textAlign: "right",
    paddingVertical: 3,
    color: colors.blueColor,
  },
  textLeft: {
    color: colors.fontSecondaryColor,
    textAlign: "left",
    paddingVertical: 3,
  },
});
