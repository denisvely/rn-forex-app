import { StyleSheet } from "react-native";
import { colors } from "../../../constants";

export default StyleSheet.create({
  buttonsWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 140,
    paddingHorizontal: 16,
  },
  button: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonName: {
    color: colors.white,
    textTransform: "uppercase",
  },
});
