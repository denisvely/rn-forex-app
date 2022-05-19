import { StyleSheet } from "react-native";

import { colors } from "constants";
import { deviceWidth } from "utils";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBackground,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  box: {
    height: 141,
    borderRadius: 4,
    width: deviceWidth - 48,
    paddingHorizontal: 22,
    paddingVertical: 24,
    marginBottom: 10,
  },
  text: {
    color: colors.white,
  },
  comingSoon: {
    backgroundColor: colors.blueColor,
    height: 25,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 4,
  },
  textOpacity: {
    color: colors.white,
    opacity: 0.7,
  },
});
