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
  closePositionFilterWrapper: {
    height: 30,
    width: "100%",
    paddingHorizontal: 16,
  },
  closePositionFilter: {
    height: 30,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.tabsBackground,
  },
  dateString: {
    marginHorizontal: 5,
    marginTop: 5
  },
});
