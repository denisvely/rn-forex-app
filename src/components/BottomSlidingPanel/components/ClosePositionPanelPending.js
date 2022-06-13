import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

import Typography from "../../Typography/Typography";
import Button from "../../Button/Button";
import realForexServices from "../../../services/realForexServices";
import { showForexNotification } from "../../../store/realForex/helpers";

import styles from "../bottomSlidingPanelStyles";

const closePendingOrder = realForexServices.closeForexPendingOrderV2();

const ClosePositionPanel = ({ trade, toggleSlidingPanel }) => {
  if (!trade) {
    return null;
  }
  const { t } = useTranslation();

  const closePositionRealForex = () => {
    closePendingOrder
      .fetch({ orderID: trade.OrderID })
      .then(({ response }) => {
        if (response.body.code == 200 || response.body.code == 201) {
          var notificationValues = {
            // TODO
            // title: forexHelper.pendingOrderEvent
            //   ? helper.getTranslation(
            //       "pending_order_filled",
            //       "Pending Order Filled"
            //     )
            //   : helper.getTranslation(
            //       "pending_order_cancelled",
            //       "Pending Order Cancelled"
            //     ),
            title: "Pending Order Cancelled",
            action: trade.IsBuy ? "Buy" : "Sell",
            quantity: trade.Volume,
            option: trade.Description,
            strike: trade.TradeRate,
            takeProfit:
              parseFloat(trade.TakeProfitRate) === 0
                ? null
                : trade.TakeProfitRate,
            stopLoss:
              parseFloat(trade.StopLossRate) === 0 ? null : trade.StopLossRate,
            pendingDate: trade.ExpirationDate,
            isError: false,
          };
          // TODO => !forexHelper.pendingOrderEvent
          // if (trade.type !== "editTrade" && !forexHelper.pendingOrderEvent) {
          if (trade.type !== "editTrade") {
            if (trade.ExpirationDate !== null) {
              var currDate = new Date();

              if (currDate > new Date(trade.ExpirationDate)) {
                notificationValues.title = "Pending Order Expired";
              }
            }
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
    <View style={styles.closePositionWrapperPending}>
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
