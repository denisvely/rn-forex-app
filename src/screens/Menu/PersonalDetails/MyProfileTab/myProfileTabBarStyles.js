import { StyleSheet } from "react-native";
import { colors } from "../../../../constants";
import { deviceWidth } from "../../../../utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: 24,
  },
  profileTypeButtonsWrapper: {
    backgroundColor: colors.tabsBackground,
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
  profileTypeButton: {
    width: deviceWidth / 2 - 40,
    borderRadius: 4,
  },
  profileTypeButtonSmall: {
    width: deviceWidth / 3 - 24,
    borderRadius: 4,
  },
  profileTypeButtonActive: {
    backgroundColor: colors.white,
    width: deviceWidth / 2 - 40,
    borderRadius: 4,
  },
  profileTypeButtonActiveSmall: {
    width: deviceWidth / 3 - 24,
    backgroundColor: colors.white,
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
