import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import moment from "moment";
import { useSelector } from "react-redux";

import { formatDeciamlWithComma } from "../../../store/realForex/helpers";
import collapseDots from "../../../assets/svg/realForex/collapseDots";
import { Typography } from "components";
import {
  getRealForexPrices,
  getRealForexOptionsByType,
} from "../../../store/realForex";

import styles from "./pendingOrdersTradeBoxStyles";

const PendingOrdersTradeBox = ({ item, navigation }) => {
  const { t } = useTranslation();
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const realForexOptionsByType = useSelector((state) =>
    getRealForexOptionsByType(state)
  );
  const [isContentVisible, setContentVisible] = useState(false);
  const price = item.IsBuy
    ? realForexPrices[item.TradableAssetId].ask
    : realForexPrices[item.TradableAssetId].bid;
  const accuracy = realForexOptionsByType["All"][item.TradableAssetId].accuracy;
  const distance = parseInt(
    parseFloat(price) * Math.pow(10, accuracy) -
      parseFloat(item.TradeRate) * Math.pow(10, accuracy)
  );

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
            text={item.Description}
          />
          <View style={styles.leftInner}>
            <Typography
              name="tiny"
              text={t(`common-labels.${item.IsBuy ? "buy" : "sell"}`)}
              style={item.IsBuy ? styles.green : styles.red}
            />
            <View style={styles.quantityWrapper}>
              <Typography
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
                  ? moment(item.OrderDate).format("YYYY-MM-DD HH:MM:ss")
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
            <TouchableOpacity onPress={() => alert("open Position history")}>
              <Typography
                name="small"
                style={styles.tradeInfoValueClickable}
                text={`PO${item.ParentEntryId}`}
              />
            </TouchableOpacity>
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
              text={t(`common-labels.@`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={
                typeof realForexPrices != "undefined" &&
                realForexPrices != null &&
                typeof realForexPrices[item.TradableAssetId] != "undefined"
                  ? !item.IsBuy
                    ? realForexPrices[item.TradableAssetId].ask
                    : realForexPrices[item.TradableAssetId].bid
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
            {parseFloat(item.TakeProfitRate) == 0 ? (
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
                text={item.TakeProfitRate}
              />
            )}
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.stopLoss`)}
            />
            {parseFloat(item.StopLossRate) == 0 ? (
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
                text={item.StopLossRate}
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
            <TouchableOpacity
              style={styles.tradeButton}
              onPress={() => alert("open modify Order")}
            >
              <Typography
                name="tinyBold"
                style={styles.tradeButtonText}
                text={t(`common-labels.modifyOrder`)}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tradeButton}>
              <Typography
                name="tinyBold"
                style={styles.tradeButtonText}
                text={t(`common-labels.delete`)}
                onPress={() => alert("delete order")}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default PendingOrdersTradeBox;
