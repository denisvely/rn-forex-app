import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { HeaderX, Typography } from "components";
import { deviceWidth } from "utils";

const HeaderAssetInfo = ({ assetName, assetIcon, navigation }) => {
  return (
    <View
      style={{
        position: "absolute",
        width: deviceWidth - 60,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 20,
      }}
    >
      <HeaderX onPress={() => navigation.goBack()} />
      <SvgXml
        xml={assetIcon}
        width="40"
        height="40"
        style={{ marginHorizontal: 12 }}
      />
      <Typography name="bigNormalBold" text={assetName} />
    </View>
  );
};
export default HeaderAssetInfo;
