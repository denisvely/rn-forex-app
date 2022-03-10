import { StyleSheet } from "react-native";
import { colors } from "constants";

export default StyleSheet.create({
  inputsWrapper: {
    marginVertical: 8,
    paddingHorizontal: 24,
  },
  label: {
    marginTop: 8,
  },
  quantityInput: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    height: 58,
    borderRadius: 4,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 14,
    color: colors.fontPrimaryColor,
    fontSize: 16,
  },
});
