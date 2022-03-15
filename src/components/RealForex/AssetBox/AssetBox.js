import React from "react";
import { View, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { getRealForexPrices } from "../../../store/realForex";
import { Typography, BuyPrice, SellPrice } from "../../../components";

import styles from "./assetBoxStyles";

const AssetBox = ({ asset, navigation, icon }) => {
  const realForexPrices = useSelector((state) => getRealForexPrices(state));

  // TODO => when getRealForexDailyChange:  is ready because we don`t have asset.openPrice
  const calculateSpread = (
    askPrice,
    bidPrice,
    accuracy,
    openPrice,
    newOrderSpread
  ) => {
    var stringifyAskPrice = askPrice.toString().split("."),
      stringifyBidPrice = bidPrice.toString().split("."),
      askPriceResult = stringifyAskPrice[0] + stringifyAskPrice[1],
      bidPriceResult = stringifyBidPrice[0] + stringifyBidPrice[1];

    if (!newOrderSpread) {
      return (
        (openPrice
          ? (
              (((parseFloat(askPrice) + parseFloat(bidPrice)) / 2 -
                parseFloat(openPrice)) /
                parseFloat(openPrice)) *
              100
            ).toFixed(2)
          : "0.00") + "%"
      );
    } else {
      if (parseFloat(askPrice) < 1 && parseFloat(bidPrice) < 1) {
        return Math.round(
          askPrice * Math.pow(10, accuracy) - bidPrice * Math.pow(10, accuracy)
        );
      } else {
        return (
          parseFloat(askPriceResult - bidPriceResult) *
          Math.pow(10, askPriceResult > 9999 ? 0 : accuracy)
        );
      }
    }
  };

  return (
    realForexPrices && (
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
                  realForexPrices[asset.id].ask,
                  realForexPrices[asset.id].bid,
                  realForexPrices[asset.id].accuracy,
                  asset.openPrice
                )}
                style={styles.profit}
              />
            </View>
          </View>
          <View style={styles.right}>
            <BuyPrice asset={asset} />
            <SellPrice asset={asset} />
          </View>
        </Pressable>
      </View>
    )
  );
};

export default AssetBox;
