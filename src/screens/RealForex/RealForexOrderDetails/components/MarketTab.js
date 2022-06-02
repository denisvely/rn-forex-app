import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import {
  Loading,
  Button,
  MarketOrderControls,
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
} from "../../../../store/realForex";
import realForexServices from "../../../../services/realForexServices";
import { convertUnits, remainingTime } from "store/realForex/helpers";
import { deviceWidth } from "../../../../utils";
import { processMarketOrder } from "../helpers";
import { colors } from "../../../../constants";

import styles from "../realForexOrderDetailsStyles";

const addRealForexTradeOrderV2Service =
  realForexServices.addRealForexTradeOrderV2();

const MarketTab = ({
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
  const initalMarketTPandSLState = {
    isBuyMarket: isDirectionBuy,
    TPActive: false,
    takeProfitDistance: null,
    takeProfitAmount: null,
    takeProfitAmountMin: null,
    SLActive: false,
    stopLossAmount: null,
    stopLossDistance: null,
    stopLossAmountMax: null,
  };
  const [marketState, setMarketState] = useState(initalMarketTPandSLState);

  const makeNewMarketOrder = (isBuy) => {
    setTradeProgress(true);
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
        isBuy,
        isBuy
          ? realForexPrices[currentTrade.tradableAssetId].ask
          : realForexPrices[currentTrade.tradableAssetId].bid,
        volume,
        marketState.TPActive ? marketState.takeProfitAmount : "", // TakeProfit
        marketState.SLActive ? marketState.stopLossAmount : "", // StopLoss
        asset.Leverage || 100,
        marketState.TPActive ? marketState.takeProfitDistance : "", // TakeProfitDistance
        marketState.SLActive ? marketState.stopLossDistance : "", // StoplossDistance
        parseFloat(pip) == 0 ? 0.00001 : pip,
        0, // pendingPrice
        false,
        "", // (currentlyModifiedOrder != '' ? orderId : '')
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
        currTrade.isBuy = isBuy;
        setTradeProgress(false);
        processMarketOrder(response, currTrade);
        navigation.navigate("quotes");
      });
  };

  const calculatePipPrice = () => {
    let quantity = asset.MinQuantity;

    quantity = convertUnits(currentTrade.quantity, asset.id, true, settings);

    var pip = (quantity * Math.pow(10, -asset.accuracy)) / asset.rate,
      formattedPip = pip.toFixed(5);

    return parseFloat(formattedPip) == 0 ? 0.00001 : formattedPip;
  };

  return (
    <View style={styles.container}>
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
          <View style={styles.buttonsWrapper}>
            <Button
              text={t("common-labels.newPendingOrder")}
              type="primary"
              font="mediumBold"
              size="big"
              onPress={() => navigation.navigate("Pending")}
            />
          </View>
        </View>
      ) : (
        <>
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
                    state={marketState}
                    setState={setMarketState}
                    isMarket={true}
                  />
                  <MarketOrderControls
                    marketState={marketState}
                    setMarketState={setMarketState}
                  />

                  <OrderInfo
                    quantityValue={currentTrade.quantity}
                    isMarket={true}
                    orderInfoData={orderInfoData}
                    setOrderInfoData={setOrderInfoData}
                  />
                </ScrollView>
                <View style={styles.buttonsWrapper}>
                  <Button
                    size="medium"
                    type="buy"
                    style={{
                      ...styles.buyButton,
                      opacity: tradeInProgress ? 0.3 : 1,
                    }}
                    disabled={tradeInProgress}
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
                      opacity: tradeInProgress ? 0.3 : 1,
                    }}
                    disabled={tradeInProgress}
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
              </KeyboardAvoidingView>
            </>
          ) : (
            <Loading size="large" />
          )}
        </>
      )}
    </View>
  );
};

export default MarketTab;
