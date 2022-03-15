import { StyleSheet } from "react-native";
import { colors } from "constants";
import { deviceWidth } from "utils";

export default StyleSheet.create({
  searchWrapper: {
    marginBottom: 16,
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
    position: "absolute",
    top: 40,
    left: 0,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    height: 200,
    width: deviceWidth - 32,
    zIndex: 2,
  },
  asset: {
    textAlign: "left",
    width: deviceWidth - 32,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  assetName: {
    textAlign: "left",
  },
});
