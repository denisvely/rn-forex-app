import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "utils";

export default StyleSheet.create({
  container: {
    width: deviceWidth - 48,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  label: {
    marginBottom: 8,
  },
  buy: {
    color: colors.buyColor,
    textAlign: "left",
    marginBottom: 8,
  },
  sell: {
    color: colors.sellColor,
    textAlign: "right",
    marginBottom: 8,
  },
});
