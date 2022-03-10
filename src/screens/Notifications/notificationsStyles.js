import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceHeight, deviceWidth } from "utils";

export default StyleSheet.create({
  notificationContainer: {
    paddingTop: 16,
    backgroundColor: colors.containerBackground,
  },
  notificationsHeader: {
    backgroundColor: "#F3F3F3",
    height: 30,
    paddingHorizontal: 16,
    paddingVertical: 8.5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  notificationsHeaderTitle: {
    color: colors.fontPrimaryColor,
  },
  clearAllBtn: {
    height: 13,
    backgroundColor: "red",
  },
});