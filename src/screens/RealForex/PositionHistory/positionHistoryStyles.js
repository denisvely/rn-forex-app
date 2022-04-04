import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
import { deviceWidth } from "../../../utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.containerBackground,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 32,
    flex: 1,
  },
  positionContainer: {
    paddingHorizontal: 16,
    paddingTop: 18,
    backgroundColor: colors.white,
    flex: 1,
  },
  posIdHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.inputBorder,
    borderBottomWidth: 1,
    paddingBottom: 5,
    height: 32,
  },
  posId: {
    color: colors.fontPrimaryColor,
    textAlign: "left",
  },
  posIdAssetName: {
    color: colors.blueColor,
    textAlign: "left",
  },
  posIdHeaderTitle: {
    color: colors.fontPrimaryColor,
    textAlign: "left",
  },
  posRow: {
    width: deviceWidth - 32,
    paddingHorizontal: 16,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "column",
    borderRadius: 2,
    backgroundColor: colors.white,
    borderBottomColor: colors.inputBorder,
    borderBottomWidth: 1,
  },
  left: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    maxWidth: "50%",
  },
  right: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "column",
    maxWidth: "50%",
  },
  posRowHeader: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  leftHeader: {
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 95,
  },
  rightHeader: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.tabsBackground,
    height: 30,
    paddingLeft: 12,
    width: "100%",
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  posRowBody: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
    paddingVertical: 0,
  },
  leftBody: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: 95,
    maxWidth: 95,
    borderRightColor: colors.tabsBackground,
    borderRightWidth: 1,
  },
  rightBody: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 12,
    width: deviceWidth - 159,
  },
  centerAligned: {
    textAlign: "center",
  },
  actionBox: {
    width: 95,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  secondaryLabel: {
    color: colors.fontSecondaryColor,
  },
  flatListContainer: {
    marginBottom: 0,
    height: "100%",
    width: "100%",
  },
  actionLabel: {
    color: colors.white,
    textTransform: "uppercase",
    alignSelf: "center",
    textAlign: "center",
  },
  quantityBox: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  buy: {
    color: colors.buyColor,
  },
  sell: {
    color: colors.sellColor,
  },
});
