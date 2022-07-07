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
    height: 70,
    width: deviceWidth - 48,
    backgroundColor: colors.white,
    zIndex: 10,
    paddingBottom: Platform.OS === "ios" ? 32 : 0,
  },
});
