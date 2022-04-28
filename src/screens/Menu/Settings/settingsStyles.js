import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceHeight, deviceWidth } from "utils";

export default StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.containerBackground,
  },
  tradeBox: {
    width: deviceWidth - 32,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 2,
    backgroundColor: colors.white,
    marginBottom: 8,
  },
  tradeBoxButton: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: deviceWidth - 32,
    paddingHorizontal: 16,
    borderRadius: 2,
    height: 64,
  },
  box: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
    width: "100%",
    borderRadius: 2,
  },
  hedgingWrapper: {
    borderBottomColor: colors.borderBottomColor,
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 12,
  },
  row: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
  },
  nettingRow: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 12,
  },
  switch: {
    marginRight: 12,
  },
  directionButton: {
    width: "50%",
    height: "100%",
    paddingLeft: 8,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  directionButton: {
    height: 24,
    marginBottom: 24,
  },
  checkboxView: {
    height: 24,
    width: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBorder,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxActiveView: {
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blueColor,
    borderWidth: 2,
    borderColor: colors.blueColor,
    position: "relative",
    marginRight: 10,
  },
  whiteDot: {
    position: "absolute",
    height: 8,
    width: 8,
    backgroundColor: colors.white,
    borderRadius: 25,
  },
  text: {
    color: colors.fontSecondaryColor,
  },
  btnText: {
    color: colors.fontPrimaryColor,
  },
  btnTextActive: {
    color: colors.blueColor,
  },
  rotatedArrow: {
    transform: [{ rotate: "180deg" }],
  },
  acceptBtn: {
    width: deviceWidth - 64,
    minWidth: deviceWidth - 64,
    alignSelf: "center",
  },
  tradingModes: {
    paddingBottom: 16,
  },
});
