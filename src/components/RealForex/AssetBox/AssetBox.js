import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
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

import styles from "./assetBoxStyles";

const AssetBox = ({ asset, navigation, icon, marketClosed }) => {
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

  const remainingTime = () => {
    var currTime = new Date(),
      optionStart = new Date(asset.rules[0].dates.from.timestamp);

    if (optionStart.getTime() - currTime.getTime() < 0) {
      for (i = 1; asset.rules.length; i++) {
        if (!asset.rules[i].availableForTrading) {
          optionStart = new Date(asset.rules[i].dates.from.timestamp);

          if (optionStart.getTime() - currTime.getTime() > 0) {
            break;
          }
        }
      }
    }

    var timeDiff = optionStart.getTime() - currTime.getTime(),
      diffMinutes = Math.ceil(timeDiff / (1000 * 60)),
      remainingMins = diffMinutes % 60,
      remainingHrs =
        Math.floor(diffMinutes / 60) > 24
          ? Math.floor(diffMinutes / 60) % 24
          : Math.floor(diffMinutes / 60),
      remainingDays = Math.floor(Math.floor(diffMinutes / 60) / 24);

    return (
      moment(optionStart).format("HH:MM") +
      "(in " +
      (remainingDays > 0
        ? remainingDays == 1
          ? "1day "
          : remainingDays + "days "
        : "") +
      (remainingHrs > 0
        ? remainingHrs == 1
          ? "1hr "
          : remainingHrs + "hrs "
        : "") +
      (remainingMins + "min)")
    );
  };

  const pressAssetBoxButton = (isMarketClosed) => {
    if (!isMarketClosed) {
      setSelectedAsset(dispatch, asset);
      navigation.navigate("RealForexOrderChart", { asset });
    } else {
      const marketClosedInfo = `This market opens at ${remainingTime(
        asset.id
      )}. You can place pending orders even when the market is closed.`;
      setMarketClosedInfo(marketClosedInfo);
      setTimeout(() => {
        setMarketClosedInfo(null);
      }, 2000);
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
              <AssetIcon
                asset={asset}
                style={styles.assetIcon}
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
          <TouchableOpacity style={styles.marketCloseBtn}>
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
