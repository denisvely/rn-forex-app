import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  MarketPendingButtons,
  HeaderAssetInfo,
  InvestAmount,
  RiskSensivityButtons,
  SimplexOrderInfo,
} from "../../../components";
import SimplexDirectionsButtons from "./components/SimplexDirectionsButtons/SimplexDirectionsButtons";

import styles from "./simplexOrderDetailsStyles";
import {
  setSelectedAsset,
  getSimplexOptionsByType,
  getSimplexTradingSettings,
  setCurrentlyModifiedOrder,
  getSimplexPrices,
} from "../../../store/simplex";
import simplexServices from "../../../services/simplexServices";
import { getUser } from "../../../store/app";

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
      tradeParams.stopLoss = minAmount;
    } else {
      listValue.push(parseFloat(minAmount * 0.5));
      listValue.push(minAmount);
      tradeParams.stopLoss = minAmount * 0.5;
    }

    tradeParams.amount = minAmount;
    tradeParams.takeProfit = minAmount;

    for (var k = 1; k < 4; k++) {
      if (
        minAmount * (5 * (k === 3 ? 4 : k)) <=
        simplexTradingSettings.MaxInvest * user.currencyFactor
      ) {
        listValue.push(minAmount * (5 * (k === 3 ? 4 : k)));
      }
    }
    // Set default investment value
    setInvestmentSelected(minAmount);
    // Set investment values list
    setInvestmentDropdownData(listValue);
    setReadyState(true);

    tradeParams.risk = defaultLeverage[1];

    // TODO
    // widget.elementsCache.takeProfitSelected.html(helper.formatCurrency(helper.getCurrencySymbol(), minAmount, false));
    // widget.elementsCache.stopLossSelected.html(helper.formatCurrency(helper.getCurrencySymbol(), minAmount * 0.5, false));
    // widget.buildTakeProfitDDL();
    // widget.buildStopLossDDL();

    setOrderInfoData((prevState) => ({
      ...prevState,
      tradeValue: (tradeParams.risk * tradeParams.amount).toFixed(2),
    }));

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
          calculateCommission(true, currentAssetSettings, tradeParams);
        }
      });
  };

  const calculateCommission = (
    updatePip,
    currentAssetSettings,
    tradeParams
  ) => {
    if (typeof currentAssetSettings.TradableAssetId == "undefined") {
      return;
    }

    var commision = 0,
      pointValue = 0,
      accuracy =
        simplexOptionsByType.All[currentAssetSettings.TradableAssetId].accuracy;

    if (
      tradeParams.amount *
        tradeParams.risk *
        (currentAssetSettings.PercentageSimple / 100) <=
      currentAssetSettings.MinCommissionSimple *
        currentAssetSettings.USDExchangeRate
    ) {
      commision =
        currentAssetSettings.MinCommissionSimple *
        currentAssetSettings.USDExchangeRate;
    } else {
      if (
        tradeParams.amount *
          tradeParams.risk *
          (currentAssetSettings.PercentageSimple / 100) >=
        currentAssetSettings.MaxCommissionSimple *
          currentAssetSettings.USDExchangeRate
      ) {
        commision =
          currentAssetSettings.MaxCommissionSimple *
          currentAssetSettings.USDExchangeRate;
      } else {
        commision =
          tradeParams.amount *
          tradeParams.risk *
          (currentAssetSettings.PercentageSimple / 100);
      }
    }

    if (updatePip) {
      currentAssetSettings.pipPrice =
        (tradeParams.amount *
          parseInt(tradeParams.risk) *
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
    }));
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
        <InvestAmount
          disabled={tradeDirection === null}
          investmentSelected={investmentSelected}
          setInvestmentSelected={setInvestmentSelected}
          investmentDropdownData={investmentDropdownData}
          setInvestmentDropdownData={setInvestmentDropdownData}
        />
        <RiskSensivityButtons
          disabled={tradeDirection === null}
          risk={risk}
          setRisk={(risk) => setRisk(risk)}
        />
        <SimplexOrderInfo
          orderInfoData={orderInfoData}
          setOrderInfoData={setOrderInfoData}
        />
      </View>
    </View>
  ) : null;
};

export default SimplexOrderDetails;
