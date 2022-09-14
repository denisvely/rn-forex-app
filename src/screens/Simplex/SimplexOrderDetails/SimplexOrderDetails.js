import React, { useEffect, useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import moment from "moment";
import Toast from "react-native-toast-message";

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
  TargetPrice,
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
import {
  checkInvestmentValues,
  processMarketOrder,
  checkAvailableForTrading,
} from "./helpers";

import styles from "./simplexOrderDetailsStyles";

const addForexTradeOrder = simplexServices.addForexTradeOrder();
const modifySimplexPosition = simplexServices.modifySimplexPosition();
const editForexTradeOrder = simplexServices.editForexTradeOrder();
let isFirstLoad = true;

const SimplexOrderDetails = ({ route, navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const asset = route.params.asset;
  const order = route.params.order;
  const isPending = route.params.isPending;
  const isReinvest = route.params.isReinvest;

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
  const [isModify, setIsModify] = useState(null);
  const [isSubmitInactive, setSubmitStatus] = useState(false);

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
      selectedOption,
      expString = null;

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

    if (order && !isPending) {
      calculatedPip = order.pip / (riskLeverage[risk] * investmentSelected);
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
        parseFloat(order ? order.rate : apiRate) +
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

    if (expirationData.expirationDate) {
      if (!expirationData.expirationTime) {
        Toast.show({
          type: "error",
          text1: `Set expiry time.`,
          topOffset: 100,
          visibilityTime: 3000,
          autoHide: true,
        });
        setTradeProgress(false);
        return false;
      }
      let currDateAndTime = new Date();
      currDateAndTime.setMinutes(currDateAndTime.getMinutes() + 4);

      const expDate = `${moment(expirationData.expirationDate).format(
        "YYYY-MM-DD"
      )}T${moment(expirationData.expirationTime).format("HH:mm:ss")}`;

      if (new Date(expDate) < currDateAndTime) {
        Toast.show({
          type: "error",
          text1: `Please choose a future date.`,
          topOffset: 100,
          visibilityTime: 3000,
          autoHide: true,
        });
        setTradeProgress(false);
        return false;
      }
      if (
        !checkAvailableForTrading(
          selectedOption.id,
          new Date(expDate),
          simplexOptionsByType
        )
      ) {
        Toast.show({
          type: "error",
          text1: `Selected date is out of working hours.`,
          topOffset: 100,
          visibilityTime: 3000,
          autoHide: true,
        });
        setTradeProgress(false);
        return false;
      }

      expString = `${moment(expirationData.expirationDate).format(
        "YYYY-MM-DD"
      )}T${moment(expirationData.expirationTime).format("HH:mm")}`;
    }

    // TODO - Modify Order, Modify Position - easyForex.js - line 791
    if (order && isPending) {
      editForexTradeOrder
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
          targetPrice ? targetPrice : null,
          null,
          expString ? expString : "",
          order.OrderID
        )
        .then(({ response }) => {
          let currTrade = {};
          currTrade.type = response.body.data.type;
          currTrade.isMarket = false;
          currTrade.option = simplexOptionsByType.All[selectedOption.id].name;
          currTrade.isBuy = tradeDirection === "up" ? true : false;
          setTradeProgress(false);
          processMarketOrder(response.body, currTrade);
          navigation.navigate("quotes");
        });
    } else if (order && !isPending) {
      modifySimplexPosition
        .fetch(
          order.orderID,
          takeProfit,
          stopLoss,
          realTPRate,
          realSLRate,
          expString ? expString : ""
        )
        .then(({ response }) => {
          let currTrade = {};
          currTrade.type = response.body.data.type;
          currTrade.isMarket = true;
          currTrade.option = simplexOptionsByType.All[selectedOption.id].name;
          currTrade.isBuy = tradeDirection === "up" ? true : false;
          setTradeProgress(false);
          processMarketOrder(response.body, currTrade);
          navigation.navigate("quotes");
        });
    } else {
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
          !isMarket ? targetPrice : null,
          null,
          18,
          expString ? expString : ""
        )
        .then(({ response }) => {
          let currTrade = {};
          currTrade.type = response.body.data.type;
          currTrade.isMarket = isMarket;
          currTrade.option = simplexOptionsByType.All[selectedOption.id].name;
          currTrade.isBuy = tradeDirection === "up" ? true : false;
          setTradeProgress(false);
          processMarketOrder(response.body, currTrade);
          navigation.navigate("quotes");
        });
    }
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
          if (order && !isPending) {
            currentAssetSettings.modifyPosition = true;
          } else if (order && isPending) {
            currentAssetSettings.modifyOrder = true;
          }
          setCurrentAssetSettings(currentAssetSettings);
          // Set investment values list
          setInvestmentDropdownData(listValue);
          // Set default investment value
          setInvestmentSelected(minAmount);

          if (order) {
            setSubmitStatus(true);
            // Pending
            if (isPending) {
              setOrderType(false);
              setDirection(order.IsBuy ? "up" : "down");

              switch (order.Leverage.toString()) {
                case defaultLeverage[0]:
                  setRisk(0);
                  break;
                case defaultLeverage[1]:
                  setRisk(1);
                  break;
                case defaultLeverage[2]:
                  setRisk(2);
                  break;
              }
              // Set amount
              setInvestmentSelected(order.Volume);
              // Set TP
              setTakeProfit(order.TakeProfit);
              // Set SL
              setStopLoss(order.StopLoss);
              // Set Target Price
              setTargetPrice(
                parseFloat(order.TradeRate).toFixed(
                  simplexPrices[currentTAID].accuracy
                )
              );
              // Set Expiration date and time
              if (order.ExpirationDate != null) {
                var expDate = new Date(order.ExpirationDate.timestamp);
                setExpData((prevState) => ({
                  ...prevState,
                  expirationDate: expDate,
                  expirationTime: expDate,
                }));
              }
            } else {
              // Set Modify Position data
              // Set direction
              setDirection(
                order.actionType.toLowerCase() == "buy" ? "up" : "down"
              );
              // Set risk
              switch (order.leverage.toString()) {
                case defaultLeverage[0]:
                  setRisk(0);
                  break;
                case defaultLeverage[1]:
                  setRisk(1);
                  break;
                case defaultLeverage[2]:
                  setRisk(2);
                  break;
              }
              // Set amount
              setInvestmentSelected(order.volume);
              // Set TP
              setTakeProfit(order.takeProfitAmount);
              // Set SL
              setStopLoss(order.stopLossAmount);
              // Set Expiration date and time
              if (order.expirationDate != null) {
                var expDate = new Date(order.expirationDate.timestamp);
                setExpData((prevState) => ({
                  ...prevState,
                  expirationDate: expDate,
                  expirationTime: expDate,
                }));
              }
            }
            setIsModify(true);
          }
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
      if (!order) {
        updateOrderDetails();
      }
    }
  }, [investmentSelected, risk]);

  useEffect(() => {
    if (isModify && order && isSubmitInactive) {
      if (isFirstLoad) {
        isFirstLoad = false;
      } else {
        setSubmitStatus(false);
      }
    }
  }, [takeProfit, stopLoss, expirationData, targetPrice]);

  useEffect(() => {
    if (!isMarket && !order) {
      const targetPrice = (
        (parseFloat(simplexPrices[assetSettings.TradableAssetId].bid) +
          parseFloat(simplexPrices[assetSettings.TradableAssetId].ask)) /
        2
      ).toFixed(simplexPrices[assetSettings.TradableAssetId].accuracy);
      setTargetPrice(targetPrice);
    }
  }, [isMarket]);

  return isReady ? (
    <View style={styles.container}>
      <MarketPendingButtons
        isMarket={isMarket}
        isModify={isModify && !isReinvest}
        isPending={isPending}
        setOrderType={(orderType) => setOrderType(orderType)}
      />
      <SimplexDirectionsButtons
        disabled={isModify && !isReinvest}
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
            {!isMarket ? (
              <TargetPrice
                disabled={tradeDirection === null}
                asset={asset}
                targetPrice={targetPrice}
                setTargetPrice={setTargetPrice}
              />
            ) : null}
            <InvestAmount
              disabled={tradeDirection === null || (isModify && !isReinvest)}
              investmentSelected={investmentSelected}
              setInvestmentSelected={setInvestmentSelected}
              investmentDropdownData={investmentDropdownData}
            />
            <RiskSensivityButtons
              disabled={tradeDirection === null || (isModify && !isReinvest)}
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
              disabled={tradeDirection === null || isSubmitInactive}
              style={{
                opacity: tradeInProgress ? 0.3 : 1,
              }}
              text={
                isModify && !isReinvest
                  ? t("easyForex.modify")
                  : isMarket
                  ? t("easyForex.invest")
                  : t("common-labels.place")
              }
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
