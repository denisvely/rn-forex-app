import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import Typography from "../../Typography/Typography";
import Button from "../../Button/Button";
import {
  closeForexTradeNetting,
  addRealForexTradeOrderV2Service,
  getRealForexOptionsByType,
  getRealForexPrices,
  getRealForexAssetsSettings,
  getRealForexTradingSettings,
} from "../../../store/realForex";
import realForexServices from "../../../services/realForexServices";
import { getUser } from "../../../store/app";
import {
  convertUnits,
  showForexNotification,
} from "../../../store/realForex/helpers";

import styles from "../bottomSlidingPanelStyles";

const closePosition = realForexServices.closePosition();

const ClosePositionPanel = ({ trade, toggleSlidingPanel }) => {
  if (!trade) {
    return null;
  }
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => getUser(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const assetSettings = useSelector((state) =>
    getRealForexAssetsSettings(state)
  );
  const realForexOptionsByType = useSelector((state) =>
    getRealForexOptionsByType(state)
  );
  const realForexPrices = useSelector((state) => getRealForexPrices(state));

  const closePositionRealForex = () => {
    closePosition
      .fetch({ orderID: trade.orderID })
      .then(({ response }) => {
        if (
          response.body.code == 400 &&
          response.body.data.text == "Minimum Close Interval Error"
        ) {
          // TODO => forexHelper.settings.MinCloseInterval
          Toast.show({
            type: "error",
            text1:
              "The minimum time between two orders in the same instrument must be at least {minCloseInterval} seconds.",
            text2: "Please try again in a few moments.",
            topOffset: 100,
            visibilityTime: 3000,
            autoHide: true,
          });
        } else {
          const notificationValues = {
            title: !response.body.data ? "Market Closed" : "Position closed",
            action: trade.actionType === "Buy" ? "Sell" : "Buy",
            quantity: trade.volume,
            option: trade.description,
            strike: trade.marketRate,
            takeProfit:
              parseFloat(trade.takeProfitRate) === 0
                ? null
                : trade.takeProfitRate,
            stopLoss:
              parseFloat(trade.stopLossRate) === 0 ? null : trade.stopLossRate,
            pendingDate: trade.expirationDate,
          };
          if (response.body.data) {
            notificationValues.strike = response.body.hash.ClosingPrice;
          }

          showForexNotification("success", notificationValues);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    toggleSlidingPanel(false);
  };

  return trade ? (
    <View style={styles.closePositionWrapper}>
      <Typography name="normal">
        <Typography
          name="normal"
          style={{ textAlign: "left" }}
          text={"Are you sure you want to cancel this Pending Order for "}
        />
        <Typography name="normalBold" text={trade.Description} />
        <Typography name="normal" text={"?"} />
      </Typography>
      <View style={styles.tradeButtons}>
        <Button
          text={t(`common-labels.yes`)}
          type="primary"
          font="mediumBold"
          size="halfWidth"
          onPress={() => closePositionRealForex()}
        />
        <Button
          text={t(`common-labels.no`)}
          type="primary"
          font="mediumBold"
          size="halfWidth"
          onPress={() => toggleSlidingPanel(false)}
        />
      </View>
    </View>
  ) : null;
};

export default ClosePositionPanel;
