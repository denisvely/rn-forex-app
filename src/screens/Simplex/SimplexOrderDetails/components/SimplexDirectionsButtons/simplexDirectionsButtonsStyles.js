import { StyleSheet } from "react-native";
import { colors } from "../../../../../constants";
import { deviceWidth } from "../../../../../utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 16,
  },
  orderTypeButtonsWrapper: {
    backgroundColor: colors.white,
    marginVertical: 16,
    height: 48,
    width: deviceWidth - 48,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  upButton: {
    width: deviceWidth / 2 - 32,
    borderRadius: 4,
    borderColor: colors.buyColor,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  upButtonActive: {
    backgroundColor: colors.buyColor,
    width: deviceWidth / 2 - 32,
    height: 48,
    borderRadius: 4,
    borderColor: colors.buyColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  upLabel: {
    textTransform: "uppercase",
    textAlign: "center",
  },
  downButton: {
    width: deviceWidth / 2 - 32,
    borderRadius: 4,
    borderColor: colors.sellColor,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  downButtonActive: {
    backgroundColor: colors.sellColor,
    width: deviceWidth / 2 - 32,
    height: 48,
    borderRadius: 4,
    borderColor: colors.sellColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  downLabel: {
    textTransform: "uppercase",
    textAlign: "center",
  },
});
