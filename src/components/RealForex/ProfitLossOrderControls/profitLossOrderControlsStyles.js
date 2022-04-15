import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
import { deviceWidth } from "../../../utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  scrollViewContainer: {
    width: deviceWidth - 48,
  },
  buttonsWrapper: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 130,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: colors.white,
  },
});
