import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceHeight, deviceWidth } from "../../../utils";

export default StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.containerBackground,
  },
  flatListContainer: {
    marginBottom: 0,
    width: "100%",
  },
  messageRow: {
    width: deviceWidth - 32,
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: 49,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  row: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
    height: 49,
  },
  left: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  right: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "column",
  },
  secondaryText: {
    color: colors.fontSecondaryColor,
  },
  messageBox: {
    width: deviceWidth - 64,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginTop: 16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: deviceHeight - 150,
  },
  boxRow: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
    height: 23,
    borderBottomColor: colors.borderBottomColor,
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginBottom: 10,
  },
});
