import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

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
import assetsIcons from "../../../assets/svg/assetIcons/assetsIcons";
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
import { convertUnits } from "store/realForex/helpers";
import { deviceWidth } from "../../../utils";
import { processMarketOrder, processPendingOrder } from "./helpers";

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
  const [isDirectionBuy, setDirection] = useState(
    route.params.isBuy ? true : false
  );
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
    isBuyMarket: route.params.isBuy ? true : false,
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
  // Pending Order
  const initalPendingState = {
    isBuyPending: route.params.isBuy ? true : false,
    pendingPrice: route.params.isBuy
      ? parseFloat(realForexPrices[asset.id].bid)
      : parseFloat(realForexPrices[asset.id].ask),
    pendingTPActive: false,
    pendingTPDistance: null,
    pendingTPAmount: null,
    pendingSLActive: false,
    pendingSLDistance: null,
    pendingSLAmount: null,
  };
  const [pendingState, setPendingState] = useState(initalPendingState);

  const dualFlag = asset.name.indexOf("/") > -1;

  if (dualFlag) {
    var leftName = asset.name.split("/")[0].toLowerCase(),
      rightName = asset.name.split("/")[1].toLowerCase();
  }

  const assetIconName = dualFlag
    ? leftName + rightName
    : asset.name.replace("'", "").replace("&", "").toLowerCase();

  const assetIcon = assetsIcons[assetIconName]
    ? assetsIcons[assetIconName][0]
    : assetsIcons["default"][0];

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
        isDirectionBuy,
        isDirectionBuy
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

        processMarketOrder(response, currTrade);
        navigation.navigate("quotes");
      });
  };

  const makeNewPendingOrder = () => {
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
          "",
          realForexPrices[currentTrade.tradableAssetId].delay,
          "",
          "",
          "", // pendingTakeProfitRate
          "" // pendingStopLossRate;
        )
        .then(({ response }) => {
          let currTrade = currentTrade;

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
      return false;
    }
  };

  const calculatePipPrice = () => {
    let quantity = asset.MinQuantity;

    quantity = convertUnits(quantity, asset.id, true, settings);

    var pip = (quantity * Math.pow(10, -asset.accuracy)) / asset.rate,
      formattedPip = pip.toFixed(5);

    return parseFloat(formattedPip) == 0 ? 0.00001 : formattedPip;
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
              paddingBottom: 130,
            }}
          >
            {isMarket ? (
              <MarketOrderControls
                marketState={marketState}
                setMarketState={setMarketState}
              />
            ) : (
              <PendingOrderControls
                pendingState={pendingState}
                setPendingState={setPendingState}
              />
            )}
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
        {isMarket ? (
          <Button
            text={t("common-labels.trade")}
            type="primary"
            font="mediumBold"
            size="big"
            disabled={marketState.isTradeButtonDisabled}
            onPress={makeNewMarketOrder}
          />
        ) : (
          <Button
            text={t("common-labels.place")}
            type="primary"
            font="mediumBold"
            size="big"
            onPress={makeNewPendingOrder}
          />
        )}
      </View>
    </View>
  );
};

export default RealForexOrderDetails;
