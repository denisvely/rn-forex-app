import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import moment from "moment";

import collapseDots from "../../../assets/svg/realForex/collapseDots";
import { Typography } from "components";

import styles from "./closedPositionsTradeBoxStyles";

const ClosedPositionsTradeBox = ({ item, index }) => {
  const { t } = useTranslation();
  const [isContentVisible, setContentVisible] = useState(false);

  return (
    <View style={styles.tradeBox} key={`${item.positionId}`}>
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
              text={t(`common-labels.${item.action}`)}
              style={item.action === "Buy" ? styles.green : styles.red}
            />
            <View style={styles.quantityWrapper}>
              <Typography name="tiny" text={item.closedVolume} />
            </View>
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
          {item.forexMode === 3 ? (
            <View style={styles.tradeInfoRow}>
              <Typography
                name="small"
                style={styles.tradeInfoKey}
                text={t(`common-labels.openPrice`)}
              />
              <Typography
                name="small"
                style={styles.tradeInfoValue}
                text={item.openPrice}
              />
            </View>
          ) : (
            <View style={styles.tradeInfoRow}>
              <Typography
                name="small"
                style={styles.tradeInfoKey}
                text={t(`common-labels.avgOpPrice`)}
              />
              <Typography
                name="small"
                style={styles.tradeInfoValue}
                text={item.avgOpenPrice}
              />
            </View>
          )}
          {item.forexMode === 3 ? (
            <View style={styles.tradeInfoRow}>
              <Typography
                name="small"
                style={styles.tradeInfoKey}
                text={t(`common-labels.avgClPrice`)}
              />
              <Typography
                name="small"
                style={styles.tradeInfoValue}
                text={item.avgClosedPrice}
              />
            </View>
          ) : null}
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.op`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={moment(item.orderDate).format("YYYY-MM-DD HH:MM:ss")}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.cl`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={moment(item.closeDate).format("YYYY-MM-DD HH:MM:ss")}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.comment`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.closedState ? item.closedState : "-"}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.profit`)}
            />
            <Typography
              name="small"
              style={parseFloat(item.Pl) < 0 ? styles.red : styles.green}
              text={item.Pl ? item.Pl : "-"}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.swap`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.Swap}
            />
          </View>
          <View style={styles.tradeInfoRow}>
            <Typography
              name="small"
              style={styles.tradeInfoKey}
              text={t(`common-labels.commission`)}
            />
            <Typography
              name="small"
              style={styles.tradeInfoValue}
              text={item.Commision}
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
                text={`POS${item.positionId}`}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ClosedPositionsTradeBox;
