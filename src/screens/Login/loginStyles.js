import { StyleSheet } from "react-native";

import { colors } from "constants";

export default StyleSheet.create({
  container: {
    flex: 1,
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
    width: "100%",
  },
  bottomViewLogin: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 50,
    width: "100%",
  },
});
