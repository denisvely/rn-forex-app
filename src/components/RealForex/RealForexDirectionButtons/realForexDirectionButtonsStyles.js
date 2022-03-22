import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
import { deviceWidth } from "../../../utils";

export default StyleSheet.create({
  buttonsWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  // Buy Button
  buyButton: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderColor: colors.buyColor,
    borderWidth: 1,
  },
  buyButtonActive: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.buyColor,
  },
  buyButtonText: {
    color: colors.buyColor,
    textTransform: "uppercase",
  },
  buyButtonTextActive: {
    color: colors.white,
    textTransform: "uppercase",
  },
  // Sell Button
  sellButton: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderColor: colors.sellColor,
    borderWidth: 1,
  },
  sellButtonActive: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.sellColor,
  },
  sellButtonText: {
    color: colors.sellColor,
    textTransform: "uppercase",
  },
  sellButtonTextActive: {
    color: colors.white,
    textTransform: "uppercase",
  },
});
