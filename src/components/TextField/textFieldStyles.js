import { StyleSheet } from "react-native";
import { colors } from "../../constants";

export default StyleSheet.create({
  textFieldWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 0,
    marginBottom: 16,
    padding: 0,
  },
  iconWrapper: {
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  input: {
    height: 44,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    paddingVertical: 11,
    paddingHorizontal: 9,
    flex: 1,
    color: colors.fontPrimaryColor,
  },
});
