import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
import { deviceWidth } from "../../../utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.containerBackground,
    flex: 1,
  },
  posIdHeader: {
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 16,
    paddingVertical: 8.5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  posId: {
    color: colors.fontPrimaryColor,
    textAlign: "left",
  },
  posIdAssetName: {
    color: colors.blueColor,
    textAlign: "left",
  },
  posIdHeaderTitle: {
    color: colors.fontPrimaryColor,
    textAlign: "left",
  },
  posRow: {
    width: deviceWidth - 32,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 2,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  posRowHeader: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
    borderBottomColor: colors.inputBorder,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  posRowBody: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
    paddingVertical: 16,
  },
  left: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    maxWidth: "50%",
  },
  right: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "column",
    maxWidth: "50%",
  },
  leftBody: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "30%",
  },
  rightBody: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "60%",
  },
});
