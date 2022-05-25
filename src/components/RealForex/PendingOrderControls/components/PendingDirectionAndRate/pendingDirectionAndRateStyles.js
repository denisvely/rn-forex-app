import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "../../../../../utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    height: 100,
    width: deviceWidth - 48,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 8,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileButtonIcon: {
    height: 24,
    width: 24,
  },
  btnText: {
    color: colors.fontPrimaryColor,
    marginLeft: 8,
  },
  btnTextActive: {
    color: colors.blueColor,
    marginLeft: 8,
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
  },
  whiteDot: {
    position: "absolute",
    height: 8,
    width: 8,
    backgroundColor: colors.white,
    borderRadius: 25,
  },
  directionButtonsWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 46,
    width: "100%",
  },
  directionButton: {
    width: "50%",
    height: "100%",
    paddingLeft: 8,
  },
  spinnerWrapper: {
    height: 58,
  },
  priceContainer: {
    marginLeft: 5,
  },
  priceText: {
    color: colors.fontSecondaryColor,
  },
});
