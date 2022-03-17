import { StyleSheet } from "react-native";
import { colors } from "../../../constants";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 24,
    flex: 1,
  },
  balanceContainer: {
    paddingVertical: 24,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
    borderBottomColor: colors.borderBottomColor,
    borderBottomWidth: 1,
    width: "100%",
    // paddingHorizontal: 20,
  },
  balanceBig: {
    color: colors.blueColor,
  },
  balanceLabel: {
    color: colors.fontSecondaryColor,
  },
  profit: {
    color: colors.buyColor,
  },
  marginContainer: {
    // paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  marginInfoWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 18,
  },
  marginInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  circleProgress: {
    width: 40,
    height: 40,
  },
  circleStats: {
    textAlign: "center",
    color: colors.blueColor,
    width: 20,
    fontSize: 8,
  },
  equityWrapper: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    borderLeftColor: colors.borderBottomColor,
    borderLeftWidth: 1,
    // paddingVertical: 18,
    paddingLeft: 20,
    height: 30,
  },
  balanceValue: {
    color: colors.fontPrimaryColor,
  },
});
