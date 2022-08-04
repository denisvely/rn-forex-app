import { StyleSheet } from "react-native";
import { colors } from "../../../../constants";
import { deviceWidth } from "../../../../utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 24,
  },
  riskSensivityWrapper: {
    marginTop: 16,
    height: 48,
    width: deviceWidth - 48,
    height: 78,
    alignSelf: "center",
  },
  orderTypeButtonsWrapper: {
    backgroundColor: colors.tabsBackground,
    marginTop: 8,
    height: 48,
    width: deviceWidth - 48,
    borderRadius: 4,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  orderTypeButton: {
    width: deviceWidth / 3 - 40,
    borderRadius: 4,
  },
  orderTypeButtonActive: {
    backgroundColor: colors.white,
    width: deviceWidth / 3 - 40,
    borderRadius: 4,
  },
});
