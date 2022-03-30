import { StyleSheet } from "react-native";
import { colors } from "../../../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBackground,
  },
  flatListContainer: {
    marginBottom: 0,
    width: "100%",
    marginTop: 16,
  },
  noTrades: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeAll: {
    width: 50,
    height: 24,
    backgroundColor: colors.blueColor,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 16,
    top: 0,
    zIndex: 10,
  },
  closeAllLabel: {
    color: colors.white,
  },
});
