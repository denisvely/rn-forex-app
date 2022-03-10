import React, { useEffect } from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

import chartSvg from "../../../assets/svg/chartSvg";
import { RealForexTradeButtons, Typography } from "components";
import { deviceWidth } from "utils";

import styles from "./realForexOrderChartStyles";

const RealForexOrderChart = ({ route, navigation }) => {
  const asset = route.params.asset;

  useEffect(() => {
    navigation.setOptions({
      title: `${asset.name}`,
    });
    return () => {
      navigation.setOptions({
        title: ``,
      });
    };
  }, [route.params.asset]);
  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Typography name="large" text={"$1,132.82"} />
        <Typography
          name="normal"
          style={styles.profit}
          text={"+920.254 (9.77%)"}
        />
      </View>
      <SvgXml
        styles={styles.chartSvg}
        xml={chartSvg}
        width={deviceWidth - 24}
        height="500"
      />
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
