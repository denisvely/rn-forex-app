import { StyleSheet } from "react-native";
import { colors } from "../../constants";

export default StyleSheet.create({
  spinner: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    height: 58,
    borderRadius: 4,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 24,
    color: colors.fontPrimaryColor,
    textAlign: "center",
    fontSize: 16,
  },
});
