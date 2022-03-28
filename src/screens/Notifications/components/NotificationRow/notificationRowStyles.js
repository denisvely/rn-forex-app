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
    flexDirection: "column",
    maxWidth: "80%",
  },
  top: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  bottom: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
  },
  notificationTpSlRow: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
  },
  tpSlRowData: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    marginRight: 10,
  },
  right: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "column",
    maxWidth: "50%",
  },
  notificationDateTime: {
    marginLeft: 10,
  },
  notificationRowTitleDate: {
    color: colors.fontSecondaryColor,
  },
  notificationRowTitle: {
    color: colors.fontPrimaryColor,
  },
  notificationRowDirection: {
    textTransform: "uppercase",
  },
  notificationRowData: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  tradeInfo: {
    marginHorizontal: 5,
  },
  errorMessage: {
    color: colors.sellColor,
    textTransform: "uppercase",
  },
  notificationPrice: {
    marginHorizontal: 5,
  },
  tpAndSlLabel: {
    paddingRight: 5,
    color: colors.blueColor,
    textTransform: "uppercase",
  },
});
