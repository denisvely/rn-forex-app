import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "../../../utils";

export default StyleSheet.create({
  assetBox: {
    width: deviceWidth - 48,
    paddingHorizontal: 12,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    height: 84,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  left: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    height: 84,
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
});
