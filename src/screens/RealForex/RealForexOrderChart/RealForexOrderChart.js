import React, { useEffect } from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

import chartSvg from "../../../assets/svg/chartSvg";
import {
  RealForexTradeButtons,
  Typography,
  HeaderAssetInfo,
} from "../../../components";
import { deviceWidth } from "../../../utils";
import assetsIcons from "../../../assets/svg/assetIcons/assetsIcons";

import styles from "./realForexOrderChartStyles";

const RealForexOrderChart = ({ route, navigation }) => {
  const asset = route.params.asset;
  const dualFlag = asset.name.indexOf("/") > -1;

  if (dualFlag) {
    var leftName = asset.name.split("/")[0].toLowerCase(),
      rightName = asset.name.split("/")[1].toLowerCase();
  }

  const assetIconName = dualFlag
    ? leftName + rightName
    : asset.name.replace("'", "").replace("&", "").toLowerCase();

  const assetIcon = assetsIcons[assetIconName]
    ? assetsIcons[assetIconName][0]
    : assetsIcons["default"][0];

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderAssetInfo
          assetName={asset.name}
          assetIcon={assetIcon}
          navigation={navigation}
        />
      ),
    });
  }, [route.params.asset]);

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <SvgXml xml={chartSvg} width={deviceWidth - 24} height="500" />
      </View>

      <RealForexTradeButtons
        asset={asset}
        buyOnPress={() => {
          navigation.navigate("RealForexOrderDetails", {
            asset: asset,
            isBuy: true,
          });
        }}
        sellOnPress={() => {
          navigation.navigate("RealForexOrderDetails", {
            asset: asset,
            isBuy: false,
          });
        }}
      />
    </View>
  );
};

export default RealForexOrderChart;
