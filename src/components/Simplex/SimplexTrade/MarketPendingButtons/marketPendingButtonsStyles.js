import { StyleSheet } from "react-native";
import { colors } from "../../../../constants";
import { deviceWidth } from "../../../../utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 24,
  },
  orderTypeButtonsWrapper: {
    backgroundColor: colors.tabsBackground,
    marginTop: 24,
    height: 48,
    width: deviceWidth - 48,
    borderRadius: 4,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  orderTypeButton: {
    width: deviceWidth / 2 - 40,
    borderRadius: 4,
  },
  orderTypeButtonActive: {
    backgroundColor: colors.white,
    width: deviceWidth / 2 - 40,
    borderRadius: 4,
  },
  inputsWrapper: {
    marginVertical: 8,
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
