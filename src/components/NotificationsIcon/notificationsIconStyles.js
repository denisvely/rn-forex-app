import { StyleSheet } from "react-native";
import { colors } from "../../constants";

export default StyleSheet.create({
  svgContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    flexDirection: "row",
    position: "relative",
    borderRadius: 48,
    backgroundColor: colors.gray,
  },
  dotWrapper: {
    height: 10,
    width: 10,
    backgroundColor: colors.red,
    borderRadius: 25,
    position: "absolute",
    top: 0,
    right: 2,
    borderWidth: 2,
    borderColor: colors.white,
  },
});
