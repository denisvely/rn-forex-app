import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceHeight, deviceWidth } from "utils";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: deviceWidth,
    height: deviceHeight + 50,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  overlayContent: {
    top: 0,
    left: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    flex: 1,
    height: "100%",
    height: deviceHeight,
    width: deviceWidth,
  },
  overlayText: {
    color: colors.white,
    maxWidth: 280,
    marginBottom: 100,
    textAlign: "center",
    marginTop: 100,
  },
});
