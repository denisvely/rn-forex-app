import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
import { deviceWidth } from "../../../utils";

export default StyleSheet.create({
  assetBox: {
    width: deviceWidth - 32,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 84,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  assetBoxMarketClosed: {
    width: deviceWidth - 32,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 84,
    borderRadius: 2,
    backgroundColor: colors.tabsBackground,
    marginBottom: 10,
    opacity: 0.5,
    position: "relative",
  },
  assetBoxButton: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: deviceWidth - 32,
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
  marketClosedInfo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: deviceWidth - 32,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    height: 84,
    borderRadius: 2,
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  marketCloseBtn: {
    width: 150,
    height: 30,
    backgroundColor: colors.blueColor,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  buttonLabel: {
    color: colors.white,
  },
});
