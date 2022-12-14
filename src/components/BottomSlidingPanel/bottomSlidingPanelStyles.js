import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth, deviceHeight } from "../../utils";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.white,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    paddingTop: 0,
    zIndex: 9999,
  },
  containerInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    paddingTop: 0,
    paddingVertical: 24,
    paddingBottom: 0,
    width: deviceWidth,
    backgroundColor: colors.white,
  },
  slidingLineWrapper: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  slidingLine: {
    width: 80,
    height: 5,
    alignSelf: "center",
    borderRadius: 2.5,
    marginTop: 20,
    backgroundColor: colors.primaryColorGray,
  },
  closePositionWrapper: {
    paddingHorizontal: 24,
    justifyContent: "flex-start",
    alignItems: "center",
    height: deviceHeight / 3,
  },
  closePositionWrapperPending: {
    paddingHorizontal: 24,
    justifyContent: "flex-start",
    alignItems: "center",
    height: deviceHeight / 3 - 40,
  },
  tradeButtons: {
    paddingVertical: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: deviceWidth - 48,
    position: "absolute",
    bottom: 0,
  },
  partiallyCloseWrapper: {
    marginTop: 16,
    width: deviceWidth - 48,
    justifyContent: "space-between",
    alignItems: "center",
  },
  onOffWrapper: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
