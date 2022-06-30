import { StyleSheet } from "react-native";
import { colors } from "../../constants";
import { deviceWidth } from "../../utils";

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: deviceWidth - 64,
    backgroundColor: colors.white,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 2,
  },
  text: {
    textAlign: "left",
  },
  tradeButtons: {
    width: "100%",
    paddingVertical: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
