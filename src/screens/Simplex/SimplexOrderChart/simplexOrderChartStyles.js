import { StyleSheet } from "react-native";
import { colors } from "../../../constants";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  priceContainer: {
    height: 29,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  profit: {
    color: colors.buyColor,
    marginLeft: 15,
  },
});
