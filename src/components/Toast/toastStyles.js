import { StyleSheet } from "react-native";
import { colors } from "constants";

export default StyleSheet.create({
  errorToast: {
    height: 60,
    width: "100%",
    backgroundColor: colors.errorLighten,
    borderLeftColor: colors.errorLighten,
  },
});
