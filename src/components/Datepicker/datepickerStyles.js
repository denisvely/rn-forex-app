import { StyleSheet } from "react-native";

import { colors } from "constants";
import { deviceWidth } from "utils";

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  modalView: {
    width: deviceWidth,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: "absolute",
    bottom: 0,
    paddingBottom: 50,
    borderColor: colors.inputBorder,
    borderWidth: 1,
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
