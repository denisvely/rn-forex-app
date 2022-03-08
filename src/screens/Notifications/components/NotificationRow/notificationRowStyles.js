import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "utils";

export default StyleSheet.create({
  notificationRow: {
    width: deviceWidth - 32,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 74,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  left: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    maxWidth: "50%",
  },
  right: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "column",
    maxWidth: "50%",
  },
  assetName: {
    color: colors.fontPrimaryColor,
  },
  profit: {
    color: colors.buyColor,
  },
  buy: {
    color: colors.buyColor,
    textAlign: "right",
  },
  sell: {
    color: colors.sellColor,
    textAlign: "right",
  },
});
