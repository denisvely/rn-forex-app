import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
import { deviceWidth } from "../../../utils";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBackground,
  },
  tradeBox: {
    width: deviceWidth - 32,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 2,
    backgroundColor: colors.white,
    marginBottom: 8,
    borderRadius: 2,
  },
  tradeBoxButton: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: deviceWidth - 32,
    paddingHorizontal: 16,
    borderRadius: 2,
    height: 64,
  },
  green: {
    color: colors.buyColor,
    textTransform: "uppercase",
  },
  red: {
    color: colors.sellColor,
    textTransform: "uppercase",
  },
  left: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    maxWidth: "50%",
  },
  leftInner: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  quantityWrapper: {
    marginLeft: 5,
  },
  right: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    maxWidth: "50%",
  },
  tradeInfo: {
    borderTopColor: colors.borderBottomColor,
    borderTopWidth: 1,
    width: deviceWidth - 64,
  },
  tradeInfoRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    marginBottom: 8,
  },
  tradeInfoKey: {
    color: colors.fontSecondaryColor,
  },
  tradeInfoValue: {
    color: colors.fontPrimaryColor,
  },
  tradeInfoValueClickable: {
    color: colors.blueColor,
  },
  assetIcon: {
    marginLeft: 5,
  },
  tradeButtons: {
    borderTopColor: colors.borderBottomColor,
    borderTopWidth: 1,
    paddingVertical: 8,
    marginBottom: 8,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  tradeButton: {
    width: "45%",
    borderColor: colors.borderBottomColor,
    borderWidth: 1,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
  tradeButtonText: {
    textAlign: "center",
    color: colors.fontPrimaryColor,
  },
  textRight: {
    marginTop: 3,
  },
});