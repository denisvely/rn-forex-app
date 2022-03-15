import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";

import collapseDots from "../../../assets/svg/realForex/collapseDots";
import { Typography } from "components";

import styles from "./closedPositionsTradeBoxStyles";

const CollapsibleTradeBox = ({ item, index }) => {
  const { t } = useTranslation();
  const [isContentVisible, setContentVisible] = useState(false);
  return (
    <View style={styles.tradeBox}>
      <TouchableOpacity
        key={`${index}`}
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
              text={item.action}
              style={
                item.action === "Buy"
                  ? styles.assetActionBuy
                  : styles.assetActionSell
              }
            />
            <Typography
              name="tiny"
              text={item.closedVolume}
              style={styles.quantity}
            />
          </View>
        </View>
        <View style={styles.right}>
          <Typography
            name="small"
            style={parseFloat(item.Pl) < 0 ? styles.red : styles.green}
            text={item.Pl}
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
              text={"Open Price"}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.openPrice}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={"Avg CL Price"}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.avgClosedPrice}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography name="small" style={styles.tradeInfoKey} text={"OP"} />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.openPrice}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography name="small" style={styles.tradeInfoKey} text={"CL"} />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.openPrice}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={"Comment"}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.openPrice}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={"Profit"}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.openPrice}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={"Swap"}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.openPrice}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={"Commission"}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.openPrice}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography name="small" style={styles.tradeInfoKey} text={"SCB"} />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.openPrice}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography name="small" style={styles.tradeInfoKey} text={"ID"} />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.positionId}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default CollapsibleTradeBox;
