import { Dimensions, Platform } from "react-native";

export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;
export const iPhoneX = () =>
  Platform.OS === "ios" && (deviceHeight === 812 || deviceWidth === 812);

export { default as useStyles } from "./styles";
export { default as device } from "./device";
export { default as Storage } from "./storage";

const APP_PACKAGE_NAME = "com.exa-dynamic";
const APP_STORE_ID = "123qwe!@#";
