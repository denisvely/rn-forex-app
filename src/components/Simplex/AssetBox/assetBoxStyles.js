import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
import { deviceWidth } from "../../../utils";

export default StyleSheet.create({
  assetBox: {
    width: deviceWidth - 48,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 84,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  assetBoxButton: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: deviceWidth - 48,
    paddingHorizontal: 12,
    borderRadius: 2,
    height: 84,
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
  assetIcon: {
    marginRight: 12,
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
