import { StyleSheet } from "react-native";
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
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 120,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: colors.white,
    width: deviceWidth - 48,
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
