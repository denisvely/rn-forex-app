import { StyleSheet } from "react-native";
import { colors } from "../../constants";
import { deviceWidth } from "../../utils";

export default StyleSheet.create({
  expirationInputsWrapper: {
    backgroundColor: colors.white,
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  expirationWrapper: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    height: 58,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal: 24,
    color: colors.fontPrimaryColor,
    textAlign: "center",
    fontSize: 16,
    width: deviceWidth - 48,
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  expirationHeader: {
    paddingVertical: 8.5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
  },
  expirationHeaderTitle: {
    color: colors.fontPrimaryColor,
  },
});
