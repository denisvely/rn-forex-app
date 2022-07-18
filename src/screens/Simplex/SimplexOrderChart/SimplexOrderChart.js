import React, { useEffect } from "react";
import { View } from "react-native";
import { RealForexTradeButtons, Typography } from "../../../components";
import styles from "./simplexOrderChartStyles";

const SimplexOrderChart = ({ route, navigation }) => {
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
    </View>
  );
};

export default SimplexOrderChart;
