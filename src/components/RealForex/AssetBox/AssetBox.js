import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import moment from "moment";

import { getRealForexPrices } from "../../../store/realForex";
import Typography from "../../../components/Typography/Typography";
import AssetIcon from "../../../components/AssetIcon/AssetIcon";
import BuyPrice from "../../../components/RealForex/BuyPrice/BuyPrice";
import SellPrice from "../../../components/RealForex/SellPrice/SellPrice";
import { setSelectedAsset } from "../../../store/realForex";
import { getApplication } from "../../../store/app";
import { remainingTime } from "../../../store/realForex/helpers";

import styles from "./assetBoxStyles";

const AssetBox = ({ asset, navigation, marketClosed }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const app = useSelector((state) => getApplication(state));
  const [marketClosedInfo, setMarketClosedInfo] = useState(null);

  const calculateSpread = (
    askPrice,
    bidPrice,
    accuracy,
    openPrice,
    newOrderSpread
  ) => {
    let stringifyAskPrice = askPrice.toString().split("."),
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

  const pressAssetBoxButton = (isMarketClosed) => {
    if (!isMarketClosed) {
      setSelectedAsset(dispatch, asset);
      navigation.navigate("RealForexOrderChart", { asset });
    } else {
      const marketClosedInfo = `This market opens at ${remainingTime(
        asset
      )}. You can place pending orders even when the market is closed.`;
      setMarketClosedInfo(marketClosedInfo);
      setTimeout(() => {
        setMarketClosedInfo(null);
      }, 5000);
    }
  };

  useEffect(() => {
    return () => {
      setMarketClosedInfo(null);
    };
  }, []);

  return realForexPrices ? (
    <>
      <View
        style={marketClosed ? styles.assetBoxMarketClosed : styles.assetBox}
      >
        {marketClosed ? (
          <TouchableOpacity
            style={styles.assetBoxButton}
            activeOpacity={0.5}
            onPress={() => pressAssetBoxButton(true)}
          >
            <View style={styles.left}>
              <AssetIcon
                asset={asset}
                style={styles.assetIcon}
                width={50}
                height={100}
              />
              <View>
                <Typography
                  name="medium"
                  text={asset.name}
                  style={styles.assetName}
                />
                <Typography
                  name="normal"
                  text={t(`common-labels.marketClosed`)}
                />
              </View>
            </View>
            <View style={styles.right}>
              <BuyPrice asset={asset} />
              <SellPrice asset={asset} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.assetBoxButton}
            activeOpacity={0.5}
            onPress={() => pressAssetBoxButton(false)}
          >
            <View style={styles.left}>
              <AssetIcon asset={asset} style={styles.assetIcon} />
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
                    app.dailyChanges ? app.dailyChanges[asset.id]?.OpenPrice : 0
                  )}
                  style={styles.profit}
                />
              </View>
            </View>
            <View style={styles.right}>
              <BuyPrice asset={asset} />
              <SellPrice asset={asset} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {marketClosedInfo ? (
        <View style={styles.marketClosedInfo}>
          <Typography name="tiny" text={marketClosedInfo} />
          <TouchableOpacity
            style={styles.marketCloseBtn}
            onPress={() =>
              navigation.navigate("RealForexOrderDetails", {
                asset: asset,
                isBuy: true,
                isPending: true,
                isMarketClosed: true,
              })
            }
          >
            <Typography
              name="tiny"
              text={"New Pending Order"}
              style={styles.buttonLabel}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  ) : null;
};

export default AssetBox;
