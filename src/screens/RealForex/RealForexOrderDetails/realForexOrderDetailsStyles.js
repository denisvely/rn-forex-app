import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  inputsWrapper: {
    marginVertical: 8,
    paddingHorizontal: 24,
  },
  label: {
    marginTop: 8,
  },
  input: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    height: 58,
    borderRadius: 4,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 14,
    color: colors.fontPrimaryColor,
    textAlign: "center",
    fontSize: 16,
  },
});
