import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  priceContainer: {
    height: 29,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  profit: {
    color: colors.buyColor,
    marginLeft: 15,
  },
  chartContainer: {
    width: deviceWidth - 24,
    height: 500,
  },
});
