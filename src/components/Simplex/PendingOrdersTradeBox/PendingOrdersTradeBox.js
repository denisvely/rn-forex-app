import React, { useState } from "react";
import { Alert } from "react-native";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import moment from "moment";
import { useSelector } from "react-redux";

import { formatDeciamlWithComma } from "../../../store/realForex/helpers";
import collapseDots from "../../../assets/svg/realForex/collapseDots";
import Typography from "../../../components/Typography/Typography";
import FormattedTypographyWithCurrency from "../../../components/FormatedCurrency/FormattedTypographyWithCurrency";
import {
  getSimplexPrices,
  getSimplexOptionsByType,
} from "../../../store/simplex";

import styles from "./pendingOrdersTradeBoxStyles";

const PendingOrdersSimplexTradeBox = ({ item, navigation, cancelOrder }) => {
  const { t } = useTranslation();
  const simplexPrices = useSelector((state) => getSimplexPrices(state));
  const simplexOptionsByType = useSelector((state) =>
    getSimplexOptionsByType(state)
  );
  const [isContentVisible, setContentVisible] = useState(false);
  const price = item.IsBuy
    ? simplexPrices[item.TradableAssetId].ask
    : simplexPrices[item.TradableAssetId].bid;
  const accuracy = simplexOptionsByType["All"][item.TradableAssetId].accuracy;
  const distance = parseInt(
    parseFloat(price) * Math.pow(10, accuracy) -
      parseFloat(item.TradeRate) * Math.pow(10, accuracy)
  );

  const checkAvailableForTrading = (id, expirationDate) => {
    if (!simplexOptionsByType.All[id].rules.length) {
      return false;
    } else {
      var currTime =
          expirationDate == null ? new Date() : new Date(expirationDate),
        availableForTrading = false;

      for (let i = 0; i < simplexOptionsByType.All[id].rules.length; i++) {
        var dateFrom = new Date(
            simplexOptionsByType.All[id].rules[i].dates.from.dateTime
          ),
          dateTo = new Date(
            simplexOptionsByType.All[id].rules[i].dates.to.dateTime
          );

        if (currTime > dateFrom && currTime < dateTo) {
          availableForTrading =
            simplexOptionsByType.All[id].rules[i].availableForTrading;
        }
      }

      return availableForTrading;
    }
  };

  const modifyTrade = () => {
    if (simplexOptionsByType.All[item.TradableAssetId]) {
      if (!checkAvailableForTrading(item.TradableAssetId)) {
        const marketClosedInfo = `This market opens at ${remainingTime(
          simplexOptionsByType.All[item.TradableAssetId]
        )}. You can place pending orders even when the market is closed.`;

        Alert.alert(
          "Market Closed",
          `${marketClosedInfo}`,
          [
            {
              text: t(`common-labels.ok`),
              onPress: () => cancelPosition(item.orderID),
            },
          ],
          { cancelable: false }
        );
      } else {
        navigation.navigate("SimplexOrderDetails", {
          asset: simplexOptionsByType.All[item.TradableAssetId],
          isPending: true,
          isModify: true,
          order: item,
        });
      }
    }
  };

  return (
    <View style={styles.tradeBox}>
      <TouchableOpacity
        style={styles.tradeBoxButton}
        onPress={() => setContentVisible(!isContentVisible)}
      >
        <View style={styles.left}>
          <View style={styles.leftInner}>
            <Typography
              name="tiny"
              text={t(`common-labels.${item.IsBuy ? "buy" : "sell"}`)}
              style={item.IsBuy ? styles.green : styles.red}
            />
            <View style={styles.quantityWrapper}>
              <Typography
                name="small"
                style={styles.assetName}
                text={item.Description}
              />
            </View>
          </View>
          <View style={styles.leftInner}>
            <Typography name="tiny" text="Inv. Amount" />
            <View style={styles.quantityWrapper}>
              <FormattedTypographyWithCurrency
                name="tiny"
                text={formatDeciamlWithComma(parseFloat(item.Volume))}
              />
            </View>
          </View>
        </View>
        <View style={styles.right}>
          <Typography
            name="small"
            text={`${t(`common-labels.target`)}: ${item.TradeRate}`}
            style={styles.textRight}
          />
          <SvgXml
            style={styles.assetIcon}
            xml={collapseDots}
            width="32"
            height="32"
          />
        </View>
      </TouchableOpacity>
      {isContentVisible ? (
        <View style={styles.tradeInfo}>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.created`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={
                item.OrderDate
                  ? moment(item.OrderDate).format("YYYY-MM-DD HH:mm:ss")
                  : "-"
              }
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.expire`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={
                item.ExpirationDate
                  ? moment(item.ExpirationDate).format("YYYY-MM-DD HH:MM:ss")
                  : "GTC"
              }
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.id`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.ParentEntryId}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.type`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={
                item.Type === 1
                  ? "Market"
                  : item.Type === 2
                  ? "Limit"
                  : item.Type === 3
                  ? "Stop"
                  : "-"
              }
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text="Market price"
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={
                typeof simplexPrices != "undefined" &&
                simplexPrices != null &&
                typeof simplexPrices[item.TradableAssetId] != "undefined"
                  ? !item.IsBuy
                    ? simplexPrices[item.TradableAssetId].ask
                    : simplexPrices[item.TradableAssetId].bid
                  : "-"
              }
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.takeProfit`)}
            />
            {parseFloat(item.TakeProfit) == 0 ? (
              <TouchableOpacity onPress={() => alert("open TP")}>
                <Typography
                  name="small"
                  style={styles.tradeInfoValueClickable}
                  text={t(`common-labels.addTakeProfit`)}
                />
              </TouchableOpacity>
            ) : (
              <Typography
                name="small"
                style={styles.tradeInfoValue}
                text={item.TakeProfit}
              />
            )}
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.stopLoss`)}
            />
            {parseFloat(item.StopLoss) == 0 ? (
              <TouchableOpacity onPress={() => alert("open SL")}>
                <Typography
                  name="small"
                  style={styles.tradeInfoValueClickable}
                  text={t(`common-labels.addStopLoss`)}
                />
              </TouchableOpacity>
            ) : (
              <Typography
                name="small"
                style={styles.tradeInfoValue}
                text={item.StopLoss}
              />
            )}
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.dist`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={Math.abs(distance)}
            />
          </View>
          <View style={styles.tradeButtons}>
            <TouchableOpacity style={styles.tradeButton} onPress={modifyTrade}>
              <Typography
                name="tinyBold"
                style={styles.tradeButtonText}
                text={t(`common-labels.modifyOrder`)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tradeButton}
              onPress={() => {
                Alert.alert(
                  "Cancel order",
                  `Are you sure you want to cancel this pending order for ${item.Description}?`,
                  [
                    {
                      text: t(`common-labels.no`),
                      style: "cancel",
                    },
                    {
                      text: t(`common-labels.yes`),
                      onPress: () => cancelOrder(item.OrderID),
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Typography
                name="tinyBold"
                style={styles.tradeButtonText}
                text={t(`common-labels.delete`)}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default PendingOrdersSimplexTradeBox;
