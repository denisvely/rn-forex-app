import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

import {
  HeaderAssetInfo,
  Loading,
  Button,
  RealForexDirectionButtons,
  MarketOrderControls,
  QuantityInput,
  OrderInfo,
} from "../../../../components";
import {
  getRealForexTradingSettings,
  getRealForexAssetsSettings,
  setSelectedAsset,
  getCurrentTrade,
  setCurrentTrade,
  getRealForexPrices,
  getRealForexOpenPositions,
  getRealForexOptionsByType,
} from "../../../../store/realForex";
import realForexServices from "../../../../services/realForexServices";
import { getUser } from "store/app";
import { convertUnits } from "store/realForex/helpers";
import { deviceWidth } from "../../../../utils";
import { processMarketOrder } from "../helpers";

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
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
  const [isTradeBuy, setDirection] = useState(isDirectionBuy);
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
    isBuyMarket: isTradeBuy,
    TPActive: false,
    takeProfitDistance: null,
    takeProfitAmount: null,
    takeProfitPrice: null,
    isPriceFocused: false,
    isTradeButtonDisabled: false,
    SLActive: false,
    stopLossAmount: null,
    stopLossDistance: null,
    stopLossPrice: null,
  };
  const [marketState, setMarketState] = useState(initalMarketTPandSLState);

  const makeNewMarketOrder = () => {
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
        isTradeBuy,
        isTradeBuy
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
        marketState.TPActive ? marketState.takeProfitPrice : "", // takeProfitRate
        marketState.SLActive ? marketState.stopLossPrice : "" // stopLossRate;
      )
      .then(({ response }) => {
        let currTrade = currentTrade;
        currTrade.type = response.body.data.type;
        currTrade.option =
          realForexOptionsByType.All[currTrade.tradableAssetId].name;
        currTrade.isBuy = isTradeBuy;

        processMarketOrder(response, currTrade);
        navigation.navigate("quotes");
      });
  };

  const calculatePipPrice = () => {
    let quantity = asset.MinQuantity;

    quantity = convertUnits(quantity, asset.id, true, settings);

    var pip = (quantity * Math.pow(10, -asset.accuracy)) / asset.rate,
      formattedPip = pip.toFixed(5);

    return parseFloat(formattedPip) == 0 ? 0.00001 : formattedPip;
  };

  return (
    <View style={styles.container}>
      {isReady ? (
        <>
          <QuantityInput
            value={quantity}
            setQuantity={(value) => setQuantity(value)}
          />
          <RealForexDirectionButtons
            isBuy={isTradeBuy}
            setDirection={(isBuy) => setDirection(isBuy)}
            asset={asset}
          />

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
              paddingBottom: 130,
            }}
          >
            <MarketOrderControls
              marketState={marketState}
              setMarketState={setMarketState}
            />

            <OrderInfo
              quantityValue={quantity}
              isMarket={isMarket}
              orderInfoData={orderInfoData}
              setOrderInfoData={setOrderInfoData}
            />
          </ScrollView>
        </>
      ) : (
        <Loading size="large" />
      )}
      <View style={styles.buttonsWrapper}>
        <Button
          text={t("common-labels.trade")}
          type="primary"
          font="mediumBold"
          size="big"
          disabled={marketState.isTradeButtonDisabled}
          onPress={makeNewMarketOrder}
        />
      </View>
    </View>
  );
};

export default MarketTab;
