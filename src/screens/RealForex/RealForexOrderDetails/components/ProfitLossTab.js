import React, { useState, useEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import {
  Loading,
  Button,
  ProfitLossOrderControls,
  QuantityInput,
  OrderInfo,
  Typography,
  BuyPrice,
  SellPrice,
} from "../../../../components";
import {
  getRealForexTradingSettings,
  getCurrentTrade,
  getRealForexPrices,
  getRealForexOptionsByType,
  getCurrentlyModifiedOrder,
} from "../../../../store/realForex";
import realForexServices from "../../../../services/realForexServices";
import { convertUnits, remainingTime } from "store/realForex/helpers";
import { deviceWidth } from "../../../../utils";
import { processMarketOrder } from "../helpers";
import { getUser } from "../../../../store/app";
import { colors } from "../../../../constants";

import styles from "../realForexOrderDetailsStyles";

const addRealForexTradeOrderV2Service =
  realForexServices.addRealForexTradeOrderV2();

const ProfitLossTab = ({
  asset,
  isDirectionBuy,
  navigation,
  quantity,
  setQuantity,
  isReady,
  isMarketClosed,
}) => {
  const { t } = useTranslation();
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const realForexOptionsByType = useSelector((state) =>
    getRealForexOptionsByType(state)
  );
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const user = useSelector((state) => getUser(state));
  const currentlyModifiedOrder = useSelector((state) =>
    getCurrentlyModifiedOrder(state)
  );
  const initalMarketTPandSLState = {
    isBuyMarket: isDirectionBuy,
    TPActive: false,
    takeProfitDistance: null,
    takeProfitAmount: null,
    takeProfitRate: null,
    SLActive: false,
    stopLossAmount: null,
    stopLossDistance: null,
    stopLossRate: null,
  };
  const [marketState, setMarketState] = useState(initalMarketTPandSLState);
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

  useEffect(() => {
    if (currentlyModifiedOrder !== null) {
      if (
        currentlyModifiedOrder.takeProfitAmount &&
        currentlyModifiedOrder.takeProfitRate
      ) {
        if (
          parseFloat(currentlyModifiedOrder.takeProfitAmount) > 0 &&
          parseFloat(currentlyModifiedOrder.takeProfitRate) > 0
        ) {
          setMarketState((prevState) => ({
            ...prevState,
            takeProfitRate: parseFloat(currentlyModifiedOrder.takeProfitAmount),
            takeProfitAmount: parseFloat(currentlyModifiedOrder.takeProfitRate),
            TPActive: true,
          }));
        }
      }

      if (
        currentlyModifiedOrder.stopLossAmount &&
        currentlyModifiedOrder.stopLossRate
      ) {
        if (
          parseFloat(currentlyModifiedOrder.stopLossAmount) > 0 &&
          parseFloat(currentlyModifiedOrder.stopLossRate) > 0
        ) {
          setMarketState((prevState) => ({
            ...prevState,
            stopLossRate: parseFloat(currentlyModifiedOrder.stopLossAmount),
            stopLossAmount: parseFloat(currentlyModifiedOrder.stopLossRate),
            SLPActive: true,
          }));
        }
      }
    }
  }, [currentlyModifiedOrder]);

  const makeModifyMarketOrder = (isBuy) => {
    // Market Order
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

    addRealForexTradeOrderV2Service
      .fetch(
        currentTrade.tradableAssetId,
        realForexOptionsByType.All[currentTrade.tradableAssetId].rules[0].id,
        currentlyModifiedOrder.actionType === "Buy" ? true : false,
        currentlyModifiedOrder.actionType === "Buy"
          ? realForexPrices[currentTrade.tradableAssetId].ask
          : realForexPrices[currentTrade.tradableAssetId].bid,
        volume,
        marketState.TPActive ? marketState.stopLossAmount : "", // TakeProfit
        marketState.SLActive ? marketState.stopLossAmount : "", // StopLoss
        asset.Leverage || 100,
        marketState.TPActive ? marketState.takeProfitDistance : "", // TakeProfitDistance
        marketState.SLActive ? marketState.stopLossDistance : "", // StoplossDistance
        parseFloat(pip) == 0 ? 0.00001 : pip,
        0, // pendingPrice
        false,
        currentlyModifiedOrder != "" ? currentlyModifiedOrder.orderID : "", //
        "",
        realForexPrices[currentTrade.tradableAssetId].delay,
        realForexPrices[currentTrade.tradableAssetId].ask,
        realForexPrices[currentTrade.tradableAssetId].bid,
        "", // takeProfitRate
        "" // stopLossRate;
      )
      .then(({ response }) => {
        let currTrade = currentTrade;
        currTrade.type = response.body.data.type;
        currTrade.option =
          realForexOptionsByType.All[currTrade.tradableAssetId].name;
        currTrade.isBuy =
          currentlyModifiedOrder.actionType === "Buy" ? true : false;

        processMarketOrder(response, currTrade);
        navigation.navigate("quotes");
      });
  };

  const calculatePipPrice = () => {
    const volume =
      quantity.indexOf(",") > -1
        ? convertUnits(
            parseFloat(quantity.replace(/,/g, "")),
            asset.id,
            true,
            settings
          )
        : convertUnits(parseFloat(quantity), asset.id, true, settings);

    const quantityPip = convertUnits(volume, asset.id, true, settings);

    var pip = (quantityPip * Math.pow(10, -asset.accuracy)) / asset.rate,
      formattedPip = pip.toFixed(5);

    return parseFloat(formattedPip) == 0 ? 0.00001 : formattedPip;
  };

  return (
    <View style={styles.container}>
      <>
        {isReady ? (
          <>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              // style={{ flex: 1 }}
              enabled
              // keyboardVerticalOffset={deviceHeight / 4.5}
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
                {user.forexModeId === 2 && !isMarketClosed ? (
                  <QuantityInput
                    value={quantity}
                    setQuantity={(value) => setQuantity(value)}
                    state={marketState}
                    setState={setMarketState}
                    isMarket={true}
                  />
                ) : null}
                {isMarketClosed ? (
                  <View style={styles.marketClosedWrapper}>
                    <Typography
                      name="largeBold"
                      text={t("common-labels.marketClosed")}
                      style={{ textAlign: "left", alignSelf: "flex-start" }}
                    />
                    <View style={styles.remainingTimeText}>
                      <Typography
                        name="small"
                        text={`This market opens at ${remainingTime(
                          asset
                        )}. You can place pending orders even when the market is closed.`}
                      />
                    </View>
                  </View>
                ) : null}
                <ProfitLossOrderControls
                  state={marketState}
                  setState={setMarketState}
                />
                {user.forexModeId === 2 && !isMarketClosed ? (
                  <OrderInfo
                    quantityValue={currentTrade.quantity}
                    isMarket={true}
                    orderInfoData={orderInfoData}
                    setOrderInfoData={setOrderInfoData}
                  />
                ) : null}
              </ScrollView>
              <>
                {user.forexModeId === 2 ? (
                  <View style={styles.buttonsWrapper}>
                    <Button
                      size="medium"
                      type="buy"
                      style={{
                        ...styles.buyButton,
                      }}
                      onPress={() => makeNewMarketOrder(true)}
                    >
                      {() => (
                        <View>
                          <Typography
                            style={styles.buyButtonText}
                            name="small"
                            text={t("common-labels.buy")}
                          />
                          <BuyPrice
                            asset={realForexPrices[asset.id]}
                            textColor={colors.white}
                          />
                        </View>
                      )}
                    </Button>
                    <Button
                      size="medium"
                      type="sell"
                      style={{
                        ...styles.sellButton,
                      }}
                      onPress={() => makeNewMarketOrder(false)}
                    >
                      {() => (
                        <View>
                          <Typography
                            style={styles.sellButtonText}
                            name="small"
                            text={t("common-labels.sell")}
                          />
                          <SellPrice
                            asset={realForexPrices[asset.id]}
                            textColor={colors.white}
                          />
                        </View>
                      )}
                    </Button>
                  </View>
                ) : (
                  <View style={styles.buttonsWrapper}>
                    <Button
                      text={t("common-labels.modify")}
                      type="primary"
                      font="mediumBold"
                      size="big"
                      onPress={makeModifyMarketOrder}
                    />
                  </View>
                )}
              </>
            </KeyboardAvoidingView>
          </>
        ) : (
          <Loading size="large" />
        )}
      </>
    </View>
  );
};

export default ProfitLossTab;
