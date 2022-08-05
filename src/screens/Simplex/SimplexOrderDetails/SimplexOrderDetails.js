import React, { useEffect, useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  MarketPendingButtons,
  HeaderAssetInfo,
  InvestAmount,
  RiskSensivityButtons,
  SimplexOrderInfo,
  ExpirationDateSimplex,
  Loading,
  Button,
  TakeProfitSimplex,
  StopLossSimplex,
} from "../../../components";
import SimplexDirectionsButtons from "./components/SimplexDirectionsButtons/SimplexDirectionsButtons";
import {
  setSelectedAsset,
  getSimplexOptionsByType,
  getSimplexTradingSettings,
  setCurrentlyModifiedOrder,
  getSimplexPrices,
} from "../../../store/simplex";
import simplexServices from "../../../services/simplexServices";
import { getUser, getSettings } from "../../../store/app";
import { deviceWidth } from "../../../utils";
import { getGlobalSetting } from "../../../store/realForex/helpers";
import { checkInvestmentValues, processMarketOrder } from "./helpers";

import styles from "./simplexOrderDetailsStyles";

const addForexTradeOrder = simplexServices.addForexTradeOrder();

const SimplexOrderDetails = ({ route, navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const asset = route.params.asset;
  const order = route.params.order;

  const simplexOptionsByType = useSelector((state) =>
    getSimplexOptionsByType(state)
  );
  const simplexTradingSettings = useSelector((state) =>
    getSimplexTradingSettings(state)
  );
  const user = useSelector((state) => getUser(state));
  const globalSettings = useSelector((state) => getSettings(state));
  const simplexPrices = useSelector((state) => getSimplexPrices(state));

  // State
  const [isReady, setReadyState] = useState(false);
  const [isMarket, setOrderType] = useState(true);
  const [tradeDirection, setDirection] = useState(null);
  const [investmentSelected, setInvestmentSelected] = useState(null);
  const [investmentDropdownData, setInvestmentDropdownData] = useState(null);
  const [risk, setRisk] = useState(1);
  const [riskLeverage, setRiskLeverage] = useState(null);
  const initialOrderInfo = {
    commission: "0.00",
    tradeValue: null,
    pointValue: null,
  };
  const [orderInfoData, setOrderInfoData] = useState(initialOrderInfo);
  const initialExpDateAndTime = {
    expirationDate: null,
    expirationTime: null,
  };
  const [expirationData, setExpData] = useState(initialExpDateAndTime);
  const [tradeInProgress, setTradeProgress] = useState(false);
  const [assetSettings, setCurrentAssetSettings] = useState(null);
  const [stopLoss, setStopLoss] = useState(null);
  const [takeProfit, setTakeProfit] = useState(null);
  const [targetPrice, setTargetPrice] = useState(null);

  const makeSimplexOrder = async () => {
    setTradeProgress(true);
    checkInvestmentValues(
      investmentSelected,
      simplexTradingSettings,
      stopLoss,
      takeProfit,
      user
    );

    let ruleId,
      rate,
      apiRate,
      realTPRate,
      realSLRate,
      calculatedPip,
      pip,
      taPipValue,
      takeProfitPips,
      stopLossPips,
      selectedOption;

    Object.values(simplexOptionsByType["All"]).forEach((option, i) => {
      if (option.id == asset.id) {
        selectedOption = option;
        ruleId = option.rules[0].id;
      }
    });

    // TODO
    // if (isMarket && widget.stoppedAssets.indexOf(selectedOption.id) > -1) {
    //   widget.elementsCache.closePopup.click();
    //   $(window).trigger(
    //     widgets.events.showTradingLimitsPopup,
    //     easyForexHelper.SimplexMinOpenInterval,
    //     true
    //   );
    //   return;
    // }

    rate = simplexPrices[selectedOption.id].rate;
    apiRate = (
      (parseFloat(simplexPrices[selectedOption.id].ask) +
        parseFloat(simplexPrices[selectedOption.id].bid)) /
      2
    ).toFixed(simplexPrices[selectedOption.id].accuracy);

    if (assetSettings.modifyPosition) {
      // TODO
      // calculatedPip =
      //   widget.tradeParams.pip /
      //   (riskLeverage[risk] * investmentSelected);
    } else {
      const pipPrice = await simplexServices
        .getForexPipPrice(dispatch)
        .fetch({
          taid: selectedOption.id,
          ask: apiRate,
        })
        .then(({ response }) => {
          if (response.body.code === 200) {
            return response.body.data;
          }
        });

      if (typeof pipPrice !== "undefined") {
        calculatedPip = pipPrice;
      }
    }

    pip = riskLeverage[risk] * investmentSelected * calculatedPip;
    taPipValue = parseFloat(
      1 / Math.pow(10, simplexPrices[selectedOption.id].accuracy)
    ).toFixed(simplexPrices[selectedOption.id].accuracy);
    takeProfitPips = parseFloat(takeProfit / pip).toFixed(
      simplexPrices[selectedOption.id].accuracy
    );
    stopLossPips = parseFloat(stopLoss / pip).toFixed(
      simplexPrices[selectedOption.id].accuracy
    );

    if (tradeDirection === "up") {
      realTPRate = parseFloat(
        parseFloat(assetSettings.modifyPosition ? order.rate : apiRate) +
          parseFloat(takeProfitPips * taPipValue)
      ).toFixed(simplexPrices[selectedOption.id].accuracy);
      realSLRate = parseFloat(
        parseFloat(assetSettings.modifyPosition ? order.rate : apiRate) -
          parseFloat(stopLossPips * taPipValue)
      ).toFixed(simplexPrices[selectedOption.id].accuracy);
    } else {
      realTPRate = parseFloat(
        parseFloat(assetSettings.modifyPosition ? order.rate : apiRate) -
          parseFloat(takeProfitPips * taPipValue)
      ).toFixed(simplexPrices[selectedOption.id].accuracy);
      realSLRate = parseFloat(
        parseFloat(assetSettings.modifyPosition ? order.rate : apiRate) +
          parseFloat(stopLossPips * taPipValue)
      ).toFixed(simplexPrices[selectedOption.id].accuracy);
    }

    // TODO - Modify Order, Modify Position - easyForex.js - line 791
    addForexTradeOrder
      .fetch(
        selectedOption.id,
        ruleId,
        tradeDirection === "up",
        apiRate,
        investmentSelected,
        takeProfit,
        stopLoss,
        riskLeverage[risk],
        realTPRate,
        realSLRate,
        pip,
        isMarket ? targetPrice : null,
        null,
        18,
        expirationData.expirationDate ? expirationData.expirationDate : ""
      )
      .then(({ response }) => {
        console.log(response);
        let currTrade = {};
        currTrade.type = response.body.data.type;
        currTrade.isMarket = isMarket;
        currTrade.option = simplexOptionsByType.All[selectedOption.id].name;
        currTrade.isBuy = tradeDirection === "up" ? true : false;
        setTradeProgress(false);
        processMarketOrder(response.body, currTrade);
        navigation.navigate("quotes");
      });
  };

  const makeOrder = () => {
    setSelectedAsset(dispatch, asset);
    const currentTAID = asset.id;

    let listValue = [];
    let minAmount =
      parseFloat(simplexTradingSettings.DefaultInvestAmountForex) *
      user.currencyFactor;
    let defaultLeverage =
      simplexOptionsByType.All[currentTAID].leverage.split("/");

    if (defaultLeverage.length < 3) {
      defaultLeverage =
        simplexOptionsByType.All[currentTAID].leverage.split(",");
    }

    setRiskLeverage(defaultLeverage);
    if (
      parseFloat(minAmount * 0.5) <
      parseFloat(simplexTradingSettings.MinInvest * user.currencyFactor)
    ) {
      listValue.push(minAmount);
      setStopLoss(minAmount);
    } else {
      listValue.push(parseFloat(minAmount * 0.5));
      listValue.push(minAmount);
      setStopLoss(minAmount * 0.5);
    }

    setTakeProfit(minAmount);

    for (let k = 1; k < 4; k++) {
      if (
        minAmount * (5 * (k === 3 ? 4 : k)) <=
        simplexTradingSettings.MaxInvest * user.currencyFactor
      ) {
        listValue.push(minAmount * (5 * (k === 3 ? 4 : k)));
      }
    }

    setReadyState(true);

    let currentAssetSettings = {};

    simplexServices
      .getForexAssetsSettings(dispatch)
      .fetch({
        tradableAssetId: currentTAID,
      })
      .then(({ response }) => {
        if (response && response.body.code && response.body.data) {
          const body = response.body.data;

          currentAssetSettings = body;
          currentAssetSettings.pipPrice = currentAssetSettings.USDExchangeRate;
          setCurrentAssetSettings(currentAssetSettings);
          // Set investment values list
          setInvestmentDropdownData(listValue);
          // Set default investment value
          setInvestmentSelected(minAmount);

          // TODO => if (order) {
        }
      });
  };

  const calculateCommission = (updatePip, currentAssetSettings) => {
    if (typeof currentAssetSettings.TradableAssetId == "undefined") {
      return;
    }
    let commision = 0,
      pointValue = 0,
      accuracy =
        simplexOptionsByType.All[currentAssetSettings.TradableAssetId].accuracy;

    if (
      investmentSelected *
        riskLeverage[risk] *
        (currentAssetSettings.PercentageSimple / 100) <=
      currentAssetSettings.MinCommissionSimple *
        currentAssetSettings.USDExchangeRate
    ) {
      commision =
        currentAssetSettings.MinCommissionSimple *
        currentAssetSettings.USDExchangeRate;
    } else {
      if (
        investmentSelected *
          riskLeverage[risk] *
          (currentAssetSettings.PercentageSimple / 100) >=
        currentAssetSettings.MaxCommissionSimple *
          currentAssetSettings.USDExchangeRate
      ) {
        commision =
          currentAssetSettings.MaxCommissionSimple *
          currentAssetSettings.USDExchangeRate;
      } else {
        commision =
          investmentSelected *
          riskLeverage[risk] *
          (currentAssetSettings.PercentageSimple / 100);
      }
    }

    if (updatePip) {
      currentAssetSettings.pipPrice =
        (investmentSelected *
          parseInt(riskLeverage[risk]) *
          Math.pow(10, -accuracy)) /
        (
          (parseFloat(
            simplexPrices[currentAssetSettings.TradableAssetId].marketBid
          ) +
            parseFloat(
              simplexPrices[currentAssetSettings.TradableAssetId].marketAsk
            )) /
          2
        ).toFixed(accuracy);
    }

    pointValue =
      currentAssetSettings.pipPrice < 0.001
        ? "~0.001"
        : currentAssetSettings.pipPrice.toFixed(
            currentAssetSettings.pipPrice >= 0.01 ? 2 : 3
          );

    if (pointValue.slice(-1) == "0") pointValue = pointValue.slice(0, -1);

    setOrderInfoData((prevState) => ({
      ...prevState,
      commission: commision,
      pointValue: pointValue,
      tradeValue: (riskLeverage[risk] * investmentSelected).toFixed(2),
    }));
  };

  const updateOrderDetails = () => {
    if (risk === 0) {
      //low
      setTakeProfit(Math.ceil(investmentSelected / 2));
      setStopLoss(Math.ceil(investmentSelected / 4));
    } else if (risk === 1) {
      //medium
      setTakeProfit(investmentSelected);
      setStopLoss(investmentSelected / 2);
    } else {
      //high
      setTakeProfit(investmentSelected * 2);
      setStopLoss(investmentSelected);
    }
  };

  useEffect(() => {
    if (asset) {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderAssetInfo asset={asset} navigation={navigation} />
        ),
      });
      makeOrder();

      return () => {
        setCurrentlyModifiedOrder(dispatch, null);
      };
    }
  }, [route.params.asset]);

  useEffect(() => {
    if (investmentSelected && assetSettings && investmentDropdownData) {
      // Update order details on invest amount change
      calculateCommission(true, assetSettings);
      updateOrderDetails();
    }
  }, [investmentSelected, risk]);

  return isReady ? (
    <View style={styles.container}>
      <MarketPendingButtons
        isMarket={isMarket}
        setOrderType={(orderType) => setOrderType(orderType)}
      />
      <SimplexDirectionsButtons
        tradeDirection={tradeDirection}
        setDirection={(direction) => {
          setDirection(direction);
        }}
      />
      <View style={styles.controllersWrapper}>
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
            <InvestAmount
              disabled={tradeDirection === null}
              investmentSelected={investmentSelected}
              setInvestmentSelected={setInvestmentSelected}
              investmentDropdownData={investmentDropdownData}
            />
            <RiskSensivityButtons
              disabled={tradeDirection === null}
              risk={risk}
              setRisk={(risk) => setRisk(risk)}
            />
            <TakeProfitSimplex
              disabled={tradeDirection === null}
              value={takeProfit}
              setValue={setTakeProfit}
              investmentSelected={investmentSelected}
            />
            <StopLossSimplex
              disabled={tradeDirection === null}
              value={stopLoss}
              setValue={setStopLoss}
              investmentSelected={investmentSelected}
            />
            {globalSettings &&
            !getGlobalSetting("SimpleForexExpiry", globalSettings) ? (
              <ExpirationDateSimplex
                disabled={tradeDirection === null}
                state={expirationData}
                setState={setExpData}
              />
            ) : null}
            <SimplexOrderInfo
              disabled={tradeDirection === null}
              orderInfoData={orderInfoData}
              setOrderInfoData={setOrderInfoData}
            />
          </ScrollView>
          <View style={styles.buttonsWrapper}>
            <Button
              disabled={tradeDirection === null}
              style={{
                opacity: tradeInProgress ? 0.3 : 1,
              }}
              text={isMarket ? t("easyForex.invest") : t("common-labels.place")}
              type="primary"
              font="mediumBold"
              size="big"
              onPress={() => makeSimplexOrder()}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  ) : (
    <Loading size="large" />
  );
};

export default SimplexOrderDetails;
