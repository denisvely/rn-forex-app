import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import {
  Typography,
  Button,
  SwitchComponent,
  PartiallyClose,
} from "components";

import {
  closePosition,
  closeForexTradeNetting,
  addRealForexTradeOrderV2Service,
  getRealForexOptionsByType,
  getRealForexPrices,
  getRealForexAssetsSettings,
  getRealForexTradingSettings,
} from "store/realForex";
import { getUser } from "store/app";
import { convertUnits } from "store/realForex/helpers";

import styles from "../bottomSlidingPanelStyles";

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

  const closePositionRealForex = () => {
    console.log(settings);
    debugger;
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
      debugger;
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
        // TODO => Min Quantity Notification
        // The minimum quantity you can trade is {minQty} units.
        return;
      }
      debugger;
      addRealForexTradeOrderV2Service(
        dispatch,
        (trade.tradableAssetId,
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
        getRealForexPrices[trade.tradableAssetId].delay,
        getRealForexPrices[trade.tradableAssetId].ask,
        getRealForexPrices[trade.tradableAssetId].bid)
      );
    } else {
      if (user.forexModeId === 3 && user.forexMarginModeId === 1) {
        closeForexTradeNetting(dispatch, trade.orderID);
      } else {
        closePosition(dispatch, trade.orderID);
      }
      toggleSlidingPanel(false);
    }
  };

  return trade ? (
    <View style={styles.closePositionWrapper}>
      <Typography name="normal">
        <Typography
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
            onSpinnerChange={(orderType) => setPartialllyClose(orderType)}
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
