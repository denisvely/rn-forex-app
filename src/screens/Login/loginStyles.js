import { StyleSheet } from "react-native";

import { colors } from "constants";
import { deviceWidth } from "../../utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 24,
    flex: 1,
  },
  logoWrapper: {
    width: "100%",
    height: 230,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPassword: {
    justifyContent: "center",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    width: "100%",
  },
  bottomViewLogin: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 50,
    width: "100%",
  },
  loginBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    position: "relative",
    top: 0,
    left: 0,
    minWidth: "100%",
    borderRadius: 4,
    marginTop: 32,
    maxWidth: deviceWidth - 32,
    height: 50,
    backgroundColor: colors.buttonPrimary,
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
    zIndex: 10,
  },
  submitBtn: {
    width: deviceWidth - 48,
    minWidth: deviceWidth - 48,
    alignSelf: "center",
  },
  formWrapper: {
    flex: 1,
    marginTop: 16,
  },
});
