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
});
