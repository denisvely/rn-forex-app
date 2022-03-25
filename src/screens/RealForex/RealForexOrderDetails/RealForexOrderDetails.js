import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import {
  MarketPendingButtons,
  HeaderAssetInfo,
  Loading,
  Button,
  RealForexDirectionButtons,
  MarketOrderControls,
  PendingOrderControls,
  QuantityInput,
  OrderInfo,
} from "../../../components";
import { assetIcon } from "../../../assets/svg/assetIcons/assetsIcons";
import { formatDeciamlWithComma } from "../../../store/realForex/helpers";
import {
  getRealForexTradingSettings,
  getRealForexAssetsSettings,
  setSelectedAsset,
  getCurrentTrade,
  setCurrentTrade,
  getRealForexPrices,
  getRealForexOpenPositions,
  getRealForexOptionsByType,
} from "../../../store/realForex";
import realForexServices from "../../../services/realForexServices";
import { getUser } from "store/app";
import { convertUnits, showForexNotification } from "store/realForex/helpers";
import { deviceWidth } from "../../../utils";

import styles from "./realForexOrderDetailsStyles";

const addRealForexTradeOrderV2Service =
  realForexServices.addRealForexTradeOrderV2();

const RealForexOrderDetails = ({ route, navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const asset = route.params.asset;
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const assetsSettings = useSelector((state) =>
    getRealForexAssetsSettings(state)
  );
  const realForexOpenPositions = useSelector((state) =>
    getRealForexOpenPositions(state)
  );
  const realForexOptionsByType = useSelector((state) =>
    getRealForexOptionsByType(state)
  );
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const user = useSelector((state) => getUser(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));

  const [isMarket, setOrderType] = useState(true);
  const [isReady, setReadyState] = useState(false);
  const [quantity, setQuantity] = useState(null);
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

  const [isDirectionBuy, setDirection] = useState(
    route.params.isBuy ? true : false
  );

  const makeOrder = () => {
    const forexOpenPositionsOnly = realForexOpenPositions.filter(function (el) {
      return el.optionType == "HARealForex";
    });

    if (forexOpenPositionsOnly.length >= settings.MaxOpenPositions) {
      // Notification for maxOpenPos
      return;
    }

    // Set Current Trade in Store
    const isBuy = route.params.isBuy ? true : false;

    currentTrade.tradableAssetId = asset.id;
    currentTrade.action = route.params.isBuy;
    currentTrade.isBuy = route.params.isBuy;
    currentTrade.price = assetsSettings[asset.id].MinQuantity;
    currentTrade.strike = isBuy
      ? realForexPrices[asset.id].ask
      : realForexPrices[asset.id].bid;
    currentTrade.quantity = !settings.IsVolumeInUnits
      ? convertUnits(
          currentTrade.price,
          asset.id,
          true,
          assetsSettings[asset.id]
        )
      : currentTrade.price;
    currentTrade.expiration = new Date(asset.rules[0].dates.to.timestamp);
    currentTrade.currency = user.currencySymbol;
    currentTrade.takeProfit = null;
    currentTrade.stopLoss = null;
    currentTrade.pendingDate = null;
    setCurrentTrade(dispatch, currentTrade);

    // Set SelectedAsset in Store
    asset.rate = assetsSettings[asset.id].ExchangeRate;
    asset.distance = parseFloat(assetsSettings[asset.id].Distance).toFixed(
      asset.accuracy
    );
    asset.Leverage = assetsSettings[asset.id].Leverage;
    asset.MaxQuantity = convertUnits(
      assetsSettings[asset.id].MaxQuantity,
      asset.id,
      false,
      settings
    );
    asset.MinQuantity = convertUnits(
      assetsSettings[asset.id].MinQuantity,
      asset.id,
      false,
      settings
    );
    asset.initialDistance = (
      parseFloat(assetsSettings[asset.id].Distance) * 3
    ).toFixed(asset.accuracy);
    asset.quantityMultiplier = assetsSettings[asset.id].QuantityMultiplier;

    asset.minAmount = (
      (parseFloat(asset.distance) * parseFloat(asset.minQuantity) * 1) /
      asset.rate
    ).toFixed(2);
    asset.quantity = !settings.IsVolumeInUnits
      ? asset.MinQuantity * asset.quantityMultiplier.split(",")[0]
      : formatDeciamlWithComma(
          asset.MinQuantity * asset.quantityMultiplier.split(",")[0]
        );

    setSelectedAsset(dispatch, asset);
    setQuantity(`${asset.quantity}`);
    setReadyState(true);
  };

  const makeNewMarketOrder = () => {
    const volume =
      quantity.indexOf(",") > -1
        ? convertUnits(
            parseFloat(quantity.replace(/,/g, "")),
            asset.id,
            true,
            settings
          )
        : convertUnits(parseFloat(quantity), asset.id, true, settings);

    addRealForexTradeOrderV2Service
      .fetch(
        currentTrade.tradableAssetId,
        realForexOptionsByType.All[currentTrade.tradableAssetId].rules[0].id,
        currentTrade.isBuy,
        currentTrade.isBuy
          ? realForexPrices[currentTrade.tradableAssetId].ask
          : realForexPrices[currentTrade.tradableAssetId].bid,
        volume,
        "", // TakeProfit
        "", // StopLoss
        asset.Leverage || 100,
        "", // TakeProfitDistance
        "", // StoplossDistance
        parseFloat(orderInfoData.pip) == 0 ? 0.00001 : orderInfoData.pip,
        0, // pendingPrice
        false,
        "", // (widget.currentlyModifiedOrder != '' ? orderId : '')
        "",
        realForexPrices[currentTrade.tradableAssetId].delay,
        realForexPrices[currentTrade.tradableAssetId].ask,
        realForexPrices[currentTrade.tradableAssetId].bid,
        "", // takeProfitRate
        "" // stopLossRate);
      )
      .then(({ response }) => {
        let currTrade = currentTrade;
        currTrade.type = response.body.data.type;

        if (response && response.body.code == 200) {
          if (
            response.body.data &&
            response.body.data.type == "TradeOrder_Successful" &&
            response.body.data.parameters &&
            response.body.data.parameters.forexType == "PendingOrder"
          ) {
            currTrade.title = `Pending Order Confirmed`;
            currTrade.title = helper.getTranslation(
              "pendingOrder_confirmed",
              "Pending Order Confirmed"
            );
            showForexNotification("success", currTrade);
          } else if (
            response.body.data &&
            response.body.data.type == "EditOrder_Successful" &&
            response.body.data.parameters.forexType == "PendingOrder"
          ) {
            currTrade.title = "Pending Order Modified";
            showForexNotification("success", currTrade);
          } else if (
            response.body.data &&
            response.body.data.type == "EditOrder_Successful" &&
            response.body.data.parameters.forexType == "MarketOrder"
          ) {
            currTrade.title = "Position modified";
            showForexNotification("success", currTrade);
          } else if (
            (response.body.data.type == "TradeRoom_SuccessTradeModified" ||
              response.body.data.type == "EditOrder_Successful") &&
            response.body.data.parameters.forexType == "MarketOrder"
          ) {
            currTrade.title = "Position modified";
            showForexNotification("success", currTrade);
          } else {
            currTrade.title = response.body.data.parameters.PositionId
              ? "Position closed"
              : "Position opened";
            showForexNotification("success", currTrade);
          }
        } else if (
          response.body &&
          response.body.code == 400 &&
          response.body.data.type == "TradeOrder_MinOpenInterval"
        ) {
          // TODO
          // $(window).trigger(
          //   widgets.events.showTradingLimitsPopup,
          //   response.body.data.text
          // );
        } else if (
          response.body &&
          response.body.code == 400 &&
          response.body.data.type == "TradeOrder_MinCloseIntervalError"
        ) {
          // TODO
          // $(window).trigger(
          //   widgets.events.showTradingLimitsPopup,
          //   forexHelper.settings.MinCloseInterval
          // );
        } else {
          if (response.body.data.type === "TradeOrder_InsufficientBalance") {
            currTrade.title = "Insufficient balance";
            showForexNotification("error", currTrade);
          } else if (
            response.body.data.type === "TradeOrder_RejectedToPreventStopOut"
          ) {
            currTrade.title = "Rejected Stop Out";
            showForexNotification("error", currTrade);
          } else if (response.body.data.type === "TradeOrder_PriceOutOfDate") {
            currTrade.title = "Missing price";
            showForexNotification("error", currTrade);
          } else if (
            response.body.data.type === "TradeOrder_QuantityValidationError"
          ) {
            currTrade.title = "Failed limitation";
            showForexNotification("error", currTrade);
          } else if (response.body.data.type === "Fraud_User_Suspended") {
            currTrade.title = "User suspended";
            showForexNotification("error", currTrade);
          } else {
            currTrade.title = "Position Failed";
            showForexNotification("error", currTrade);
          }
        }
      });
  };

  useEffect(() => {
    if (asset && realForexOpenPositions) {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderAssetInfo
            assetName={asset.name}
            assetIcon={assetIcon}
            navigation={navigation}
          />
        ),
      });
      makeOrder();
    }
  }, [route.params.asset]);

  return (
    <View style={styles.container}>
      {isReady ? (
        <>
          <MarketPendingButtons
            isMarket={isMarket}
            setOrderType={(orderType) => setOrderType(orderType)}
          />
          <QuantityInput
            value={quantity}
            setQuantity={(value) => setQuantity(value)}
          />
          {isMarket ? (
            <RealForexDirectionButtons
              isBuy={isDirectionBuy}
              setDirection={(isBuy) => setDirection(isBuy)}
              asset={asset}
            />
          ) : null}

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
              paddingBottom: 50,
            }}
          >
            {isMarket ? <MarketOrderControls /> : <PendingOrderControls />}
          </ScrollView>
          <OrderInfo
            quantityValue={quantity}
            isMarket={isMarket}
            orderInfoData={orderInfoData}
            setOrderInfoData={setOrderInfoData}
          />
        </>
      ) : (
        <Loading size="large" />
      )}
      <View style={styles.buttonsWrapper}>
        {isMarket ? (
          <Button
            text={t("common-labels.trade")}
            type="primary"
            font="mediumBold"
            size="big"
            onPress={makeNewMarketOrder}
          />
        ) : (
          <Button
            text={t("common-labels.place")}
            type="primary"
            font="mediumBold"
            size="big"
            // onPress={props.handleSubmit}
          />
        )}
      </View>
    </View>
  );
};

export default RealForexOrderDetails;
