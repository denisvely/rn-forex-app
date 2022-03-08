import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

import { getRealForexPrices } from "store/realForex";
import { Typography } from "components";

import styles from "./assetBoxStyles";

const AssetBox = ({ option, index, navigation, icon }) => {
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  return (
    realForexPrices && (
      <View style={styles.assetBox}>
        <View style={styles.left}>
          <SvgXml style={styles.assetIcon} xml={icon} width="40" height="40" />
          <View>
            <Typography
              name="medium"
              text={option.name}
              style={styles.assetName}
            />
            <Typography name="small" text={"+0.05%"} style={styles.profit} />
          </View>
        </View>
        <View style={styles.right}>
          <Typography
            name="normal"
            text={realForexPrices[option.id].ask}
            style={styles.buy}
          />
          <Typography
            name="normal"
            text={realForexPrices[option.id].bid}
            style={styles.sell}
          />
        </View>
      </View>
    )
  );
};

export default AssetBox;
