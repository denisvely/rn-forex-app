import { StyleSheet } from "react-native";

import { colors } from "constants";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.containerBackground,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 24,
    flex: 1,
  },
  balance: {
    color: colors.blueColor,
  },
});
