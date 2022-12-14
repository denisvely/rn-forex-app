import { StyleSheet, Platform } from "react-native";
import { colors } from "../../../constants";
import { deviceWidth } from "../../../utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  scrollViewContainer: {
    width: deviceWidth - 48,
  },
  buttonsWrapper: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: Platform.OS === "ios" ? 117 : 97,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: colors.white,
  },
  buyButton: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.buyColor,
  },
  buyButtonText: {
    color: colors.white,
    textTransform: "uppercase",
  },
  // Sell Button
  sellButton: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.sellColor,
  },
  sellButtonText: {
    color: colors.white,
    textTransform: "uppercase",
  },
  marketClosedWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  remainingTimeText: {
    marginTop: 24,
    alignSelf: "flex-start",
  },
  modifyTitle: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 20,
  },
  left: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  paddingLeft: {
    paddingLeft: 7,
  },
  blue: {
    paddingLeft: 7,
    color: colors.blueColor,
  },
  orderId: {
    color: colors.fontSecondaryColor,
  },
});
