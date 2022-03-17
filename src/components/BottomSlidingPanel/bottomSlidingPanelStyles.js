import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "../../utils";

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
  flatListContainer: {
    marginBottom: 0,
  },
});
