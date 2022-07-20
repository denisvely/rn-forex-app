import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "utils";

export default StyleSheet.create({
  inputsWrapper: {
    marginTop: 16,
    paddingHorizontal: 24,
    zIndex: 9999,
    width: "100%",
  },
  quantityInputWrapper: {
    marginTop: 8,
  },
  label: {
    marginTop: 8,
  },
  quantityInput: {
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
  dropdownArrowWrapper: {
    position: "absolute",
    top: 13,
    right: 14,
    zIndex: 2,
  },
  quantityDropdown: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    width: deviceWidth - 48,
    backgroundColor: colors.white,
    zIndex: 9999,
    height: 150,
  },
  value: {
    width: deviceWidth - 50,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flex: 1,
    zIndex: 9999,
  },
});
