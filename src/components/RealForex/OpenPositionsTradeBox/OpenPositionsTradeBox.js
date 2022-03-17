import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import moment from "moment";
import { useSelector } from "react-redux";

import { formatDeciamlWithComma } from "../../../store/realForex/helpers";
import collapseDots from "../../../assets/svg/realForex/collapseDots";
import { Typography, FormattedTypographyWithCurrency } from "components";
import { getRealForexPrices } from "../../../store/realForex";

import styles from "./openPositionsTradeBoxStyles";
import { colors } from "../../../constants";

const OpenPositionsTradeBox = ({
  item,
  toggleBottomSlidingPanel,
  navigation,
}) => {
  const { t } = useTranslation();
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
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
              <TouchableOpacity
                onPress={() => toggleBottomSlidingPanel("tpAndSl")}
              >
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
              <TouchableOpacity
                onPress={() => toggleBottomSlidingPanel("tpAndSl")}
              >
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
                "YYYY-MM-DD HH:MM:ss"
              )}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.id`)}
            />
            <TouchableOpacity onPress={() => alert("open Position history")}>
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
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.margin`)}
            />
            <FormattedTypographyWithCurrency
              name="small"
              style={styles.tradeInfoValue}
              text={item.margin}
            />
          </View>
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
            <TouchableOpacity
              style={styles.tradeButton}
              onPress={() => alert("open modify Order")}
            >
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
                onPress={() => alert("close position")}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default OpenPositionsTradeBox;
