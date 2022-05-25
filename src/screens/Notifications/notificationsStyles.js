import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceHeight, deviceWidth } from "utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: colors.containerBackground,
  },
  notificationContainer: {
    paddingTop: 16,
  },
  notificationsHeader: {
    backgroundColor: "#F3F3F3",
    height: 30,
    paddingHorizontal: 16,
    paddingVertical: 8.5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  notificationsHeaderTitle: {
    color: colors.fontPrimaryColor,
  },
  notificationsHeaderTitleClearAll: {
    color: colors.fontSecondaryColor,
  },
  clearAllBtn: {
    height: 13,
    backgroundColor: "red",
  },
  flatListContainer: {
    marginBottom: 0,
    width: "100%",
  },
});
