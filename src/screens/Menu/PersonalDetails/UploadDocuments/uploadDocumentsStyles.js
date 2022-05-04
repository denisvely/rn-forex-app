import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "../../../../utils";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.white,
  },
  submitBtn: {
    width: deviceWidth - 48,
    minWidth: deviceWidth - 48,
    alignSelf: "center",
  },
  buttonsWrapper: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 120,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: colors.white,
    width: deviceWidth - 48,
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
    width: deviceWidth - 48,
  },
});
