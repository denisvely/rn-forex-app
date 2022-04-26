import { StyleSheet } from "react-native";
import { colors } from "../../../constants";

export default StyleSheet.create({
  inputsWrapper: {
    marginVertical: 16,
    paddingHorizontal: 24,
    width: "100%",
  },
  label: {
    marginTop: 8,
  },
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
  takeProfitHeader: {
    paddingVertical: 8.5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
  },
  takeProfitHeaderTitle: {
    color: colors.fontPrimaryColor,
  },
  clearAllBtn: {
    height: 13,
    backgroundColor: "red",
  },
});
