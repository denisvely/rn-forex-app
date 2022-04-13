import { StyleSheet } from "react-native";

import { colors } from "constants";
import { deviceWidth } from "utils";

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: deviceWidth - 32,
    backgroundColor: colors.white,
    borderRadius: 19,
    alignItems: "center",
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  buttonsWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
    width: "85%",
  },
  gradientSmall: {
    textAlign: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  button: {
    maxWidth: "40%",
  },
  datePicker: {
    width: deviceWidth - 48,
    height: 260,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    zIndex: 9999,
  },
});
