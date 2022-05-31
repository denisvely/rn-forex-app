import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "utils";

export default StyleSheet.create({
  searchWrapper: {
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.white,
    borderRadius: 4,
    width: deviceWidth - 32,
    zIndex: 9999,
  },
  inputWrapper: {
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.white,
    borderRadius: 4,
    height: 40,
    width: deviceWidth - 32,
  },
  searchInput: {
    height: 40,
    color: colors.fontPrimaryColor,
    fontSize: 16,
    alignItems: "center",
    lineHeight: 20,
    width: deviceWidth - 112,
    paddingLeft: 10,
  },
  foundAssets: {
    width: "100%",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    height: 150,
    width: deviceWidth - 32,
    zIndex: 9999,
  },
  asset: {
    textAlign: "left",
    width: deviceWidth - 32,
    paddingHorizontal: 8,
    paddingVertical: 8,
    zIndex: 9999,
  },
  assetName: {
    textAlign: "left",
  },
});
