import React from "react";
import { View } from "react-native";
import { Typography } from "components";
import { SvgXml } from "react-native-svg";

import styles from "./assetBoxStyles";

const AssetBox = ({ option, index, navigation, icon }) => {
  console.log(option);
  return (
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
    </View>
  );
};

export default AssetBox;
