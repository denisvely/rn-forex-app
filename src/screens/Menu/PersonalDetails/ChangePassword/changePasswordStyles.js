import { StyleSheet } from "react-native";
import { colors } from "constants";

export default StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: colors.containerBackground,
  },
  fundingWrapper: {
    paddingHorizontal: 45,
    paddingVertical: 48,
  },
  fundingInfo: {
    marginTop: 10,
  },
  buttonsWrapper: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 120,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: colors.white,
  },
  depositBtn: {},
});
