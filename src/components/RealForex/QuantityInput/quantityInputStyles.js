import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "utils";

export default StyleSheet.create({
  inputsWrapper: {
    // marginVertical: 8,
    paddingHorizontal: 24,
    zIndex: 5,
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
    position: "absolute",
    top: 58,
    left: 0,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    height: 150,
    width: deviceWidth - 48,
    zIndex: 2,
    backgroundColor: colors.white,
  },
  value: {
    textAlign: "left",
    width: deviceWidth - 50,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});
