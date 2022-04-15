import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import {
  Loading,
  Button,
  ProfitLossOrderControls,
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

const ProfitLossTab = ({
  asset,
  isDirectionBuy,
  navigation,
  quantity,
  setQuantity,
  isReady,
  isModify,
  isMarketClosed,
}) => {
  const { t } = useTranslation();
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const realForexOptionsByType = useSelector((state) =>
    getRealForexOptionsByType(state)
  );
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
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
      <>
        {isReady ? (
          <>
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
              <ProfitLossOrderControls
                state={marketState}
                setState={setMarketState}
              />
            </ScrollView>
          </>
        ) : (
          <Loading size="large" />
        )}
        <View style={styles.buttonsWrapper}>
          <Button
            text={t("common-labels.modify")}
            type="primary"
            font="mediumBold"
            size="big"
            onPress={makeModifyMarketOrder}
          />
        </View>
      </>
    </View>
  );
};

export default ProfitLossTab;
