import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "../../../../../utils";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.containerBackground,
  },
  flatListContainer: {
    marginBottom: 0,
    width: "100%",
  },
  documentRow: {
    width: deviceWidth - 32,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 64,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  left: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    maxWidth: "80%",
  },
  right: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "column",
    maxWidth: "50%",
  },
  secondaryText: {
    color: colors.fontSecondaryColor,
  },
});
