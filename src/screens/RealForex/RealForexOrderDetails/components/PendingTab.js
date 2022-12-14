import React, { useState, useEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import moment from "moment";

import {
  Loading,
  Button,
  PendingOrderControls,
  QuantityInput,
  OrderInfo,
} from "../../../../components";
import {
  getRealForexTradingSettings,
  getCurrentTrade,
  getRealForexPrices,
  getRealForexOptionsByType,
  getCurrentlyModifiedOrder,
  getSelectedAsset,
} from "../../../../store/realForex";
import realForexServices from "../../../../services/realForexServices";
import {
  convertUnits,
  convertUTCDateToLocalDate,
} from "store/realForex/helpers";
import { deviceWidth } from "../../../../utils";
import { processPendingOrder } from "../helpers";

import styles from "../realForexOrderDetailsStyles";

const addRealForexTradeOrderV2Service =
  realForexServices.addRealForexTradeOrderV2();
const modifyPendingOrderV2Service =
  realForexServices.editRealForexPendingOrderV2();

const PendingTab = ({
  asset,
  isDirectionBuy,
  navigation,
  quantity,
  setQuantity,
  isReady,
}) => {
  const { t } = useTranslation();
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const realForexOptionsByType = useSelector((state) =>
    getRealForexOptionsByType(state)
  );
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const currentlyModifiedOrder = useSelector((state) =>
    getCurrentlyModifiedOrder(state)
  );
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const [tradeInProgress, setTradeProgress] = useState(false);

  // Order Info
  const initialOrderInfoState = {
    marginSell: "",
    marginBuy: "",
    leverageSell: "",
    leverageBuy: "",
    swapSell: "",
    swapBuy: "",
    pipSell: "",
    pipBuy: "",
  };
  const [orderInfoData, setOrderInfoData] = useState(initialOrderInfoState);

  // Pending Order
  const initalPendingState = {
    isBuyPending: isDirectionBuy,
    pendingPrice: isDirectionBuy
      ? parseFloat(realForexPrices[asset.id].ask)
      : parseFloat(realForexPrices[asset.id].bid),
    pendingTPActive: false,
    pendingTPDistance: null,
    pendingTPAmount: null,
    pendingTPAmountMin: null,
    pendingSLActive: false,
    pendingSLDistance: null,
    pendingSLAmount: null,
    pendingSLAmountMax: null,
    pendingExpirationDate: null,
    pendingExpirationTime: null,
  };
  const [pendingState, setPendingState] = useState(initalPendingState);

  // Modify
  const modifyPendingOrder = () => {
    setTradeProgress(true);
    // Pending Order
    const volume =
      quantity.indexOf(",") > -1
        ? convertUnits(
            parseFloat(quantity.replace(/,/g, "")),
            asset.id,
            true,
            settings
          )
        : convertUnits(parseFloat(quantity), asset.id, true, settings);
    const pip = calculatePipPrice();
    let expirationDate;

    if (pendingState.pendingExpirationDate !== null) {
      var time = pendingState.pendingExpirationTime,
        hours = time.getHours(),
        minutes = time.getMinutes(),
        currDateAndTime = new Date();

      var sHours = hours.toString(),
        sMinutes = minutes.toString();

      if (hours < 10) sHours = "0" + sHours;
      if (minutes < 10) sMinutes = "0" + sMinutes;

      expirationDate =
        moment(pendingState.pendingExpirationDate).format("YYYY-MM-DD") +
        "T" +
        sHours +
        ":" +
        sMinutes;
      currDateAndTime.setMinutes(currDateAndTime.getMinutes() + 5);
      if (
        new Date(expirationDate) < convertUTCDateToLocalDate(currDateAndTime)
      ) {
        Toast.show({
          type: "error",
          text1: "Please choose a future date.",
          topOffset: 100,
          visibilityTime: 5000,
          autoHide: true,
        });
        setTradeProgress(false);
        return false;
      }
      currentTrade.pendingDate = expirationDate;
    }

    if (pendingState.pendingPrice != 0 && !isNaN(pendingState.pendingPrice)) {
      modifyPendingOrderV2Service
        .fetch(
          currentTrade.tradableAssetId,
          realForexOptionsByType.All[currentTrade.tradableAssetId].rules[0].id,
          pendingState.isBuyPending,
          pendingState.isBuyPending
            ? realForexPrices[currentTrade.tradableAssetId].ask
            : realForexPrices[currentTrade.tradableAssetId].bid,
          volume,
          pendingState.pendingTPActive ? pendingState.pendingTPAmount : "", // pendingTakeProfit
          pendingState.pendingSLActive ? pendingState.pendingSLAmount : "", // pendingStopLoss
          asset.Leverage || 100,
          pendingState.pendingTPActive ? pendingState.pendingTPDistance : "", // pendingTakeProfitDistance
          pendingState.pendingSLActive ? pendingState.pendingSLDistance : "", // pendingStopLossDistance
          parseFloat(pip) == 0 ? 0.00001 : pip,
          parseFloat(pendingState.pendingPrice),
          false,
          currentlyModifiedOrder
            ? currentlyModifiedOrder.OrderID
              ? currentlyModifiedOrder.OrderID
              : currentlyModifiedOrder.orderID
            : "", //
          pendingState.pendingExpirationDate ? currentTrade.pendingDate : "", // expirationDate
          "", // pendingTakeProfitRate
          "" // pendingStopLossRate;
        )
        .then(({ response }) => {
          let currTrade = currentTrade;
          currTrade.strike = pendingState.pendingPrice;
          currTrade.isBuy = pendingState.isBuyPending;
          currTrade.type = response.body.data.type;
          currTrade.option =
            realForexOptionsByType.All[currTrade.tradableAssetId].name;
          if (pendingState.pendingTPActive) {
            currentTrade.takeProfit = (
              parseFloat(pendingState.pendingTPDistance) +
              parseFloat(
                pendingState.isBuyPending
                  ? realForexPrices[currentTrade.tradableAssetId].ask
                  : realForexPrices[currentTrade.tradableAssetId].bid
              )
            ).toFixed(realForexPrices[currentTrade.tradableAssetId].accuracy);
          }
          if (pendingState.pendingSLActive) {
            currentTrade.stopLoss = Math.abs(
              parseFloat(pendingState.pendingSLDistance) -
                parseFloat(
                  pendingState.isBuyPending
                    ? realForexPrices[currentTrade.tradableAssetId].ask
                    : realForexPrices[currentTrade.tradableAssetId].bid
                )
            ).toFixed(realForexPrices[currentTrade.tradableAssetId].accuracy);
          }
          processPendingOrder(response, currTrade);
          setTradeProgress(false);
          navigation.navigate("quotes");
        });
    } else {
      Toast.show({
        type: "error",
        text1: "Please choose rate.",
        topOffset: 100,
        visibilityTime: 5000,
        autoHide: true,
      });
      setTradeProgress(false);
      return false;
    }
  };

  const makeNewPendingOrder = () => {
    setTradeProgress(true);
    // Pending Order
    const volume =
      quantity.indexOf(",") > -1
        ? convertUnits(
            parseFloat(quantity.replace(/,/g, "")),
            asset.id,
            true,
            settings
          )
        : convertUnits(parseFloat(quantity), asset.id, true, settings);
    const pip = calculatePipPrice();
    let expirationDate;

    if (pendingState.pendingExpirationDate !== null) {
      var time = pendingState.pendingExpirationTime,
        hours = time.getHours(),
        minutes = time.getMinutes(),
        currDateAndTime = new Date();

      var sHours = hours.toString(),
        sMinutes = minutes.toString();

      if (hours < 10) sHours = "0" + sHours;
      if (minutes < 10) sMinutes = "0" + sMinutes;

      expirationDate =
        moment(pendingState.pendingExpirationDate).format("YYYY-MM-DD") +
        "T" +
        sHours +
        ":" +
        sMinutes;
      currDateAndTime.setMinutes(currDateAndTime.getMinutes() + 5);
      if (
        new Date(expirationDate) < convertUTCDateToLocalDate(currDateAndTime)
      ) {
        Toast.show({
          type: "error",
          text1: "Please choose a future date.",
          topOffset: 100,
          visibilityTime: 5000,
          autoHide: true,
        });
        setTradeProgress(false);
        return false;
      }
      currentTrade.pendingDate = expirationDate;
    }

    if (pendingState.pendingPrice != 0 && !isNaN(pendingState.pendingPrice)) {
      addRealForexTradeOrderV2Service
        .fetch(
          currentTrade.tradableAssetId,
          realForexOptionsByType.All[currentTrade.tradableAssetId].rules[0].id,
          pendingState.isBuyPending,
          pendingState.isBuyPending
            ? realForexPrices[currentTrade.tradableAssetId].ask
            : realForexPrices[currentTrade.tradableAssetId].bid,
          volume,
          pendingState.pendingTPActive ? pendingState.pendingTPAmount : "", // pendingTakeProfit
          pendingState.pendingSLActive ? pendingState.pendingSLAmount : "", // pendingStopLoss
          asset.Leverage || 100,
          pendingState.pendingTPActive ? pendingState.pendingTPDistance : "", // pendingTakeProfitDistance
          pendingState.pendingSLActive ? pendingState.pendingSLDistance : "", // pendingStopLossDistance
          parseFloat(pip) == 0 ? 0.00001 : pip,
          pendingState.pendingPrice,
          false,
          "", // (currentlyModifiedOrder != '' ? orderId : '')
          pendingState.pendingExpirationDate ? currentTrade.pendingDate : "", // expirationDate
          realForexPrices[currentTrade.tradableAssetId].delay,
          "",
          "",
          "", // pendingTakeProfitRate
          "" // pendingStopLossRate;
        )
        .then(({ response }) => {
          let currTrade = currentTrade;
          currTrade.strike = pendingState.pendingPrice;
          currTrade.isBuy = pendingState.isBuyPending;
          currTrade.type = response.body.data.type;
          currTrade.option =
            realForexOptionsByType.All[currTrade.tradableAssetId].name;
          if (pendingState.pendingTPActive) {
            currentTrade.takeProfit = (
              parseFloat(pendingState.pendingTPDistance) +
              parseFloat(
                pendingState.isBuyPending
                  ? realForexPrices[currentTrade.tradableAssetId].ask
                  : realForexPrices[currentTrade.tradableAssetId].bid
              )
            ).toFixed(realForexPrices[currentTrade.tradableAssetId].accuracy);
          }
          if (pendingState.pendingSLActive) {
            currentTrade.stopLoss = Math.abs(
              parseFloat(pendingState.pendingSLDistance) -
                parseFloat(
                  pendingState.isBuyPending
                    ? realForexPrices[currentTrade.tradableAssetId].ask
                    : realForexPrices[currentTrade.tradableAssetId].bid
                )
            ).toFixed(realForexPrices[currentTrade.tradableAssetId].accuracy);
          }
          processPendingOrder(response, currTrade);
          setTradeProgress(false);
          navigation.navigate("quotes");
        });
    } else {
      Toast.show({
        type: "error",
        text1: "Please choose rate.",
        topOffset: 100,
        visibilityTime: 5000,
        autoHide: true,
      });
      setTradeProgress(false);
      return false;
    }
  };

  const calculatePipPrice = () => {
    let quantity = asset.MinQuantity;

    quantity = convertUnits(currentTrade.quantity, asset.id, true, settings);

    var pip = (quantity * Math.pow(10, -asset.accuracy)) / asset.rate,
      formattedPip = pip.toFixed(5);

    return parseFloat(formattedPip) == 0 ? 0.00001 : formattedPip;
  };

  useEffect(() => {
    if (currentlyModifiedOrder !== null) {
      let TPDistance = null,
        TPAmount = null,
        SLDistance = null,
        SLAmount = null,
        expDate = null,
        expTime = null;

      if (currentlyModifiedOrder.TakeProfitRate > 0) {
        TPDistance = Math.abs(
          parseFloat(currentlyModifiedOrder.TradeRate) -
            currentlyModifiedOrder.TakeProfitRate
        ).toFixed(
          realForexOptionsByType.All[currentlyModifiedOrder.TradableAssetId]
            .accuracy
        );

        TPAmount = (
          (parseFloat(TPDistance) *
            convertUnits(
              parseFloat(currentTrade.quantity),
              selectedAsset.id,
              true,
              settings
            ) *
            1) /
          selectedAsset.rate
        ).toFixed(2);
      }

      if (currentlyModifiedOrder.StopLossRate > 0) {
        SLDistance = Math.abs(
          parseFloat(currentlyModifiedOrder.TradeRate) -
            currentlyModifiedOrder.StopLossRate
        ).toFixed(
          realForexOptionsByType.All[currentlyModifiedOrder.TradableAssetId]
            .accuracy
        );
        SLAmount = (
          (-parseFloat(SLDistance) *
            convertUnits(
              parseFloat(currentTrade.quantity),
              selectedAsset.id,
              true,
              settings
            ) *
            1) /
          selectedAsset.rate
        ).toFixed(2);
      }

      if (currentlyModifiedOrder.ExpirationDate) {
        expDate = new Date(currentlyModifiedOrder.ExpirationDate);
        expTime = moment(currentlyModifiedOrder.ExpirationDate);
      }
      setPendingState((prevState) => ({
        ...prevState,
        pendingPrice: currentlyModifiedOrder.TradeRate
          ? currentlyModifiedOrder.TradeRate
          : isDirectionBuy
          ? parseFloat(realForexPrices[asset.id].ask)
          : parseFloat(realForexPrices[asset.id].bid),
        isBuyPending: isDirectionBuy,
        pendingTPDistance: TPDistance,
        pendingTPAmount: TPAmount,
        pendingTPActive: TPDistance && TPAmount ? true : false,
        pendingSLDistance: SLDistance,
        pendingSLAmount: SLAmount,
        pendingSLActive: SLDistance && SLAmount ? true : false,
        pendingExpirationDate: expDate,
        pendingExpirationTime: expDate,
      }));
    }
  }, []);

  return (
    <View style={styles.container}>
      {isReady ? (
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled
          >
            <ScrollView
              style={styles.scrollView}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "column",
                width: deviceWidth,
                flexGrow: 1,
                paddingBottom: 200,
              }}
            >
              <QuantityInput
                value={quantity}
                setQuantity={(value) => setQuantity(value)}
                state={pendingState}
                setState={setPendingState}
                isMarket={false}
              />
              <PendingOrderControls
                pendingState={pendingState}
                setPendingState={setPendingState}
              />
              <OrderInfo
                quantityValue={currentTrade.quantity}
                isMarket={false}
                orderInfoData={orderInfoData}
                setOrderInfoData={setOrderInfoData}
              />
            </ScrollView>
            <View style={styles.buttonsWrapper}>
              <Button
                style={{
                  opacity: tradeInProgress ? 0.3 : 1,
                }}
                text={t("common-labels.place")}
                type="primary"
                font="mediumBold"
                size="big"
                onPress={
                  currentlyModifiedOrder !== null &&
                  currentlyModifiedOrder.isPending
                    ? modifyPendingOrder
                    : makeNewPendingOrder
                }
              />
            </View>
          </KeyboardAvoidingView>
        </>
      ) : (
        <Loading size="large" />
      )}
    </View>
  );
};

export default PendingTab;
