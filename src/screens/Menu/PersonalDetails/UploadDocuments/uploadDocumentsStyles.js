import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "../../../../utils";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.white,
  },
  submitBtn: {
    width: deviceWidth - 48,
    minWidth: deviceWidth - 48,
    alignSelf: "center",
  },
  formWrapper: {
    width: deviceWidth - 48,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: deviceWidth - 48,
  },
  input: {
    height: 44,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.borderBottomColor,
    paddingVertical: 11,
    paddingHorizontal: 9,
    flex: 1,
    color: colors.fontPrimaryColor,
    width: deviceWidth - 48,
  },
  chooseFileWrapper: {
    height: 54,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.inputColor,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    borderRadius: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: colors.borderBottomColor,
  },
  chooseFileBtn: {
    width: 105,
    height: 32,
    backgroundColor: colors.blueColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginRight: 8,
  },
  btnText: {
    color: colors.white,
  },
  fileText: {
    color: colors.fontSecondaryColor,
  },
  textFieldWrapper: {
    marginTop: 16,
  },
  myDocumentsBtn: {
    color: colors.blueColor,
    width: "100%",
  },
});
