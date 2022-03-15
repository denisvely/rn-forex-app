import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
import { deviceWidth } from "../../../utils";

export default StyleSheet.create({
  assetBox: {
    width: deviceWidth - 32,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 120,
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
    flexDirection: "column",
    width: 137,
    height: 92,
    paddingRight: 8,
    borderRightWidth: 1,
    borderStyle: "solid",
    borderRightColor: "#F2F2F2",
  },
  right: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    width: deviceWidth - 169,
    paddingLeft: 16
  },
  assetIcon: {
    marginBottom: 8,
  },
  assetName: {
    color: colors.fontPrimaryColor,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center'
  },
  profit: {
    color: '#27A34F',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
    lineHeight: 19
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
