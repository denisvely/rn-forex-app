import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import moment from "moment";
import { useSelector } from "react-redux";

import {
  formatDeciamlWithComma,
  convertUnits,
} from "../../../store/realForex/helpers";
import collapseDots from "../../../assets/svg/realForex/collapseDots";
import Typography from "../../Typography/Typography";
import FormattedTypographyWithCurrency from "../../FormatedCurrency/FormattedTypographyWithCurrency";
import {
  getRealForexPrices,
  getRealForexOptionsByType,
  getRealForexTradingSettings,
} from "../../../store/realForex";
import { getUser } from "../../../store/app";

import styles from "./openPositionsTradeBoxStyles";
import { colors } from "../../../constants";

const OpenPositionsTradeBox = ({
  item,
  toggleBottomSlidingPanel,
  setCurrentTrade,
  navigation,
}) => {
  const { t } = useTranslation();
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const realForexOptionsByType = useSelector((state) =>
    getRealForexOptionsByType(state)
  );
  const user = useSelector((state) => getUser(state));
  const tradingSettings = useSelector((state) =>
    getRealForexTradingSettings(state)
  );

  const [isContentVisible, setContentVisible] = useState(false);

  if (item.optionType !== "HARealForex") {
    return null;
  }

  let result = 0;

  if (typeof realForexPrices != "undefined" && realForexPrices != null) {
    if (realForexPrices[item.tradableAssetId] != undefined) {
      if (item.actionType == "Sell") {
        result = parseFloat(
          (item.rate - realForexPrices[item.tradableAssetId].ask) *
            item.volume *
            (1 / item.exchangeRate)
        ).toFixed(2);
      } else {
        result = parseFloat(
          (realForexPrices[item.tradableAssetId].bid - item.rate) *
            item.volume *
            (1 / item.exchangeRate)
        ).toFixed(2);
      }
    }
  }

  const checkAvailableForTrading = (id) => {
    if (!realForexOptionsByType.All[id].rules.length) {
      return false;
    } else {
      var currTime = new Date(),
        availableForTrading = false;

      for (let i = 0; i < realForexOptionsByType.All[id].rules.length; i++) {
        var dateFrom = new Date(
            realForexOptionsByType.All[id].rules[i].dates.from.dateTime
          ),
          dateTo = new Date(
            realForexOptionsByType.All[id].rules[i].dates.to.dateTime
          );

        if (currTime > dateFrom && dateFrom < dateTo) {
          availableForTrading =
            realForexOptionsByType.All[id].rules[i].availableForTrading;
        }
      }

      return availableForTrading;
    }
  };

  const modifyTrade = () => {
    if (realForexOptionsByType.All[item.tradableAssetId]) {
      navigation.navigate("RealForexOrderDetails", {
        asset: realForexOptionsByType.All[item.tradableAssetId],
        isBuy: item.actionType === "Buy" ? true : false,
        isPending: false,
        order: item,
        isMarketClosed: !checkAvailableForTrading(item.tradableAssetId),
      });
    }
  };

  return (
    <View style={styles.tradeBox}>
      <TouchableOpacity
        style={styles.tradeBoxButton}
        onPress={() => setContentVisible(!isContentVisible)}
      >
        <View style={styles.left}>
          <Typography
            name="small"
            style={styles.assetName}
            text={item.description}
          />
          <View style={styles.leftInner}>
            <Typography
              name="tiny"
              text={t(`common-labels.${item.actionType}`)}
              style={item.actionType === "Buy" ? styles.green : styles.red}
            />
            <View style={styles.quantityWrapper}>
              <Typography
                name="tiny"
                text={formatDeciamlWithComma(parseFloat(item.volume))}
              />
            </View>
          </View>
        </View>
        <View style={styles.right}>
          <FormattedTypographyWithCurrency
            name="small"
            style={{
              ...styles.textRight,
              color:
                parseFloat(result) < 0 ? colors.sellColor : colors.buyColor,
            }}
            text={result}
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
              text={t(`common-labels.takeProfit`)}
            />
            {parseFloat(item.takeProfitRate) == 0 ? (
              <TouchableOpacity onPress={modifyTrade}>
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
                text={item.takeProfitRate}
              />
            )}
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.stopLoss`)}
            />
            {parseFloat(item.stopLossRate) == 0 ? (
              <TouchableOpacity onPress={modifyTrade}>
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
                text={item.stopLossRate}
              />
            )}
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.#`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={moment(item.orderDate.timestamp).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.id`)}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PositionHistory", {
                  positionId: item.orderID,
                  result: result,
                })
              }
            >
              <Typography
                name="small"
                style={styles.tradeInfoValueClickable}
                text={`POS${item.orderID}`}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.@`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={
                typeof realForexPrices != "undefined" &&
                realForexPrices != null &&
                typeof realForexPrices[item.tradableAssetId] != "undefined"
                  ? item.actionType == "Sell"
                    ? realForexPrices[item.tradableAssetId].ask
                    : realForexPrices[item.tradableAssetId].bid
                  : "-"
              }
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.openPrice`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.rate}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.avgPrice`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.rate}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.swap`)}
            />
            <FormattedTypographyWithCurrency
              name="small"
              style={parseFloat(item.swap) < 0 ? styles.red : styles.green}
              text={item.swap ? parseFloat(item.swap).toFixed(2) : "-"}
            />
          </View>
          {user.forexModeId === 3 && user.forexMarginModeId === 1 ? null : (
            <View style={styles.tradeInfoRow}>
              <Typography
                name="small"
                style={styles.tradeInfoKey}
                text={t(`common-labels.margin`)}
              />
              <FormattedTypographyWithCurrency
                name="small"
                style={styles.tradeInfoValue}
                text={(
                  ((item.actionType === "Sell"
                    ? realForexPrices[item.tradableAssetId].bid
                    : realForexPrices[item.tradableAssetId].ask) *
                    parseFloat(
                      convertUnits(
                        item.volume,
                        item.tradableAssetId,
                        !tradingSettings.IsVolumeInUnits,
                        tradingSettings
                      )
                    )) /
                  (item.leverage * item.exchangeRate)
                ).toFixed(2)}
              />
            </View>
          )}
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.commission`)}
            />
            <FormattedTypographyWithCurrency
              name="small"
              style={styles.tradeInfoValue}
              text={
                item.cfdCommission != null
                  ? parseFloat(item.cfdCommission).toFixed(2)
                  : "-"
              }
            />
          </View>
          <View style={styles.tradeButtons}>
            <TouchableOpacity style={styles.tradeButton} onPress={modifyTrade}>
              <Typography
                name="tinyBold"
                style={styles.tradeButtonText}
                text={t(`common-labels.modifyPosition`)}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tradeButton}>
              <Typography
                name="tinyBold"
                style={styles.tradeButtonText}
                text={t(`common-labels.closePosition`)}
                onPress={() => {
                  setCurrentTrade(item);
                  toggleBottomSlidingPanel("closePosition");
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default OpenPositionsTradeBox;
