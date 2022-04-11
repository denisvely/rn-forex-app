import React, { useEffect } from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

import chartSvg from "../../../assets/svg/chartSvg";
import { RealForexTradeButtons, HeaderAssetInfo } from "../../../components";
import { deviceWidth } from "../../../utils";

import styles from "./realForexOrderChartStyles";

const RealForexOrderChart = ({ route, navigation }) => {
  const asset = route.params.asset;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderAssetInfo asset={asset} navigation={navigation} />
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
