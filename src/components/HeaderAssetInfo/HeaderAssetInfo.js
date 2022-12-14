import React from "react";
import { View } from "react-native";
import HeaderX from "../../components/HeaderX/HeaderX";
import Typography from "../../components/Typography/Typography";
import AssetIcon from "../../components/AssetIcon/AssetIcon";
import { deviceWidth } from "../../utils";

const HeaderAssetInfo = ({ asset, navigation }) => {
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
      <AssetIcon asset={asset} style={{ marginHorizontal: 12 }} />
      <Typography name="bigNormalBold" text={asset.name} />
    </View>
  );
};
export default HeaderAssetInfo;
