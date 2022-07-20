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

import styles from "./simplexOrderDetailsStyles";

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
  const [risk, setRisk] = useState(2);
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
  const [stopLossDDL, setStopLossDDL] = useState(null);
  const [takeProfit, setTakeProfit] = useState(null);
  const [takeProfitDDL, setTakeProfitDDL] = useState(null);

  const makeSimplexOrder = () => {
    setTradeProgress(true);
    // TODO
  };

  const makeOrder = () => {
    setSelectedAsset(dispatch, asset);
    const currentTAID = asset.id;

    let tradeParams = {};
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

    // TODO
    // widget.buildTakeProfitDDL();
    // widget.buildStopLossDDL();

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
        investmentDropdownData[risk] *
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
          investmentDropdownData[risk] *
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
          investmentDropdownData[risk] *
          (currentAssetSettings.PercentageSimple / 100);
      }
    }

    if (updatePip) {
      currentAssetSettings.pipPrice =
        (investmentSelected *
          parseInt(investmentDropdownData[risk]) *
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
      tradeValue: (investmentDropdownData[risk] * investmentSelected).toFixed(
        2
      ),
    }));
  };

  const updateOrderDetails = () => {
    if (risk === 1) {
      //low
      setTakeProfit(Math.ceil(investmentSelected / 2));
      setStopLoss(Math.ceil(widget.tradeParams.amount / 4));
    } else if (risk === 2) {
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
  }, [investmentSelected]);

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
              paddingBottom: 150,
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
              takeProfitDDL={takeProfitDDL}
            />
            {globalSettings &&
            getGlobalSetting("SimpleForexExpiry", globalSettings) ? (
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
              text={t("easyForex.invest")}
              type="primary"
              font="mediumBold"
              size="big"
              onPress={makeSimplexOrder}
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
