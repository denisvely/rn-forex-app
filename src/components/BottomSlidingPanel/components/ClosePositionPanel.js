import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import Typography from "../../Typography/Typography";
import Button from "../../Button/Button";
import SwitchComponent from "../../Switch/SwitchComponent";
import PartiallyClose from "../../RealForex/PartiallyClose/PartiallyClose";
import {
  addRealForexTradeOrderV2Service,
  getRealForexOptionsByType,
  getRealForexPrices,
  getRealForexAssetsSettings,
  getRealForexTradingSettings,
  getClosedPositions,
} from "../../../store/realForex";
import realForexServices from "../../../services/realForexServices";
import { getUser } from "../../../store/app";
import {
  convertUnits,
  showForexNotification,
} from "../../../store/realForex/helpers";

import styles from "../bottomSlidingPanelStyles";

const closePosition = realForexServices.closePosition();
const closePositionNetting = realForexServices.closePositioNetting();

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

  const [partiallyCloseValue, setPartialllyClose] = useState(trade.volume);
  const [partiallyCloseVisible, setVisibility] = useState(false);

  const closePositionRequest = () => {
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

          showForexNotification("successForex", notificationValues);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePositionRealForex = () => {
    if (
      partiallyCloseVisible &&
      parseFloat(
        convertUnits(
          parseFloat(partiallyCloseValue),
          trade.tradableAssetId,
          true,
          settings
        )
      ) <
        convertUnits(
          parseFloat(trade.volume),
          trade.tradableAssetId,
          true,
          settings
        )
    ) {
      const quantity = convertUnits(
        parseFloat(partiallyCloseValue),
        trade.tradableAssetId,
        true,
        settings
      );
      const pip =
        (quantity * Math.pow(10, -trade.accuracy)) / trade.exchangeRate;
      const formattedPip = pip.toFixed(5);
      if (
        parseFloat(quantity) < assetSettings[trade.tradableAssetId].MinQuantity
      ) {
        Toast.show({
          type: "error",
          text1: `The minimum quantity you can trade is ${
            assetSettings[trade.tradableAssetId].MinQuantity
          } units.`,
          topOffset: 100,
          visibilityTime: 3000,
          autoHide: true,
        });
        toggleSlidingPanel(false);
        return;
      }

      addRealForexTradeOrderV2Service(
        dispatch,
        trade.tradableAssetId,
        realForexOptionsByType.All[trade.tradableAssetId].rules[0].id,
        trade.actionType === "Buy" ? false : true,
        trade.rate,
        parseFloat(
          convertUnits(
            parseFloat(partiallyCloseValue),
            trade.tradableAssetId,
            true,
            settings
          )
        ),
        null,
        null,
        trade.leverage,
        null,
        null,
        parseFloat(formattedPip) == 0 ? 0.00001 : formattedPip,
        0,
        false,
        trade.orderID,
        null,
        realForexPrices[trade.tradableAssetId].delay,
        realForexPrices[trade.tradableAssetId].ask,
        realForexPrices[trade.tradableAssetId].bid
      );
      toggleSlidingPanel(false);
    } else {
      if (user.forexModeId === 3 && user.forexMarginModeId === 1) {
        closePositionNetting
          .fetch({ orderID: trade.orderID })
          .then(({ response }) => {
            if (response.body.data == 2) {
              // TODO -> forex-stop-out - openPositions.js - line 251
            } else {
              closePositionRequest();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        closePositionRequest();
      }
      toggleSlidingPanel(false);
    }
  };

  return trade ? (
    <View style={styles.closePositionWrapper}>
      <Typography name="normal">
        <Typography
          style={{ textAlign: "left" }}
          name="normal"
          text={"Are you sure you want to closed this position with "}
        />
        <Typography name="normalBold" text={trade.description} />
        <Typography name="normal" text={"?"} />
      </Typography>
      <View style={styles.partiallyCloseWrapper}>
        <View style={styles.onOffWrapper}>
          <Typography name="normal" text={"Partially close"} />
          <SwitchComponent
            onValueChange={(value) => setVisibility(value)}
            value={partiallyCloseVisible}
          />
        </View>
        {partiallyCloseVisible ? (
          <PartiallyClose
            spinnerValue={partiallyCloseValue}
            onSpinnerChange={(value) => setPartialllyClose(value)}
            placeholder={t("common-labels.amount")}
          />
        ) : null}
      </View>
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
