import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "utils";

export default StyleSheet.create({
  profileButtonWrapper: {
    width: deviceWidth - 48,
    height: 40,
    borderBottomColor: colors.borderBottomColor,
    borderBottomWidth: 1,
  },
  profileButton: {
    height: "100%",
    width: deviceWidth - 48,
    alignSelf: "center",
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: 12,
    paddingTop: 6.5,
  },
  profileButtonIcon: {
    height: 16,
    width: 20,
  },
  btnText: {
    color: colors.fontPrimaryColor,
    marginLeft: 8,
  },
  arrowRight: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});
