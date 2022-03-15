import React from "react";
import { View, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { getSimplexPrices } from "../../../store/simplex";
import { Typography, BuyPriceSimplex } from "../../../components";

import styles from "./assetBoxStyles";
import {getApplication} from "../../../store/app";

const AssetBox = ({ asset, navigation, icon }) => {
  const simplexPrices = useSelector((state) => getSimplexPrices(state));
  const app = useSelector((state) => getApplication(state));

  const calculateSpread = ( askPrice, bidPrice, openPrice ) => {
    return (
        (openPrice ? ( (((parseFloat(askPrice) + parseFloat(bidPrice)) / 2 - parseFloat(openPrice)) / parseFloat(openPrice)) * 100 ).toFixed(2) : "0.00") + "%"
    );
  };

  return (
      simplexPrices && (
      <View style={styles.assetBox}>
        <Pressable
          style={styles.assetBoxButton}
          onPress={() => {
            navigation.navigate("RealForexOrderChart", { asset });
          }}
        >
          <View style={styles.left}>
            <SvgXml
              style={styles.assetIcon}
              xml={icon}
              width="40"
              height="40"
            />
            <View>
              <Typography
                name="medium"
                text={asset.name}
                style={styles.assetName}
              />
              <Typography
                name="small"
                text={calculateSpread(
                    simplexPrices[asset.id].ask,
                    simplexPrices[asset.id].bid,
                    app.dailyChanges[asset.id].OpenPrice
                )}
                style={styles.profit}
              />
            </View>
          </View>
          <View style={styles.right}>
            <BuyPriceSimplex asset={asset} />
          </View>
        </Pressable>
      </View>
    )
  );
};

export default AssetBox;
