import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
import { deviceWidth } from "../../../utils";

export default StyleSheet.create({
  scrollViewContainer: {
    height: 60,
    width: deviceWidth,
  },
  scrollView: {
    height: 60,
    width: deviceWidth,
    flexGrow: 1,
  },
  filterButton: {
    paddingHorizontal: 12.5,
    justifyContent: "center",
    alignItems: "center",
  },
  filterName: {
    color: colors.fontSecondaryColor,
  },
  filterNameActive: {
    color: colors.fontPrimaryColor,
  },
  activeFilter: {
    width: "100%",
    height: 2,
    backgroundColor: colors.buyColor,
    position: "absolute",
    bottom: -5,
  },
});
