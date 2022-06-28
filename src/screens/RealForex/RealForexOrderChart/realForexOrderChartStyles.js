import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
import { deviceWidth } from "../../../utils";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  chartContainer: {
    width: deviceWidth,
    height: "100%",
    marginBottom: 140
  },
});
