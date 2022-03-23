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
} from "../../../store/realForex";
import { getUser } from "store/app";
import { convertUnits } from "store/realForex/helpers";

import styles from "./realForexOrderDetailsStyles";

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
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const user = useSelector((state) => getUser(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));

  const [isMarket, setOrderType] = useState(true);
  const [isReady, setReadyState] = useState(false);

  const [isDirectionBuy, setDirection] = useState(
    route.params.isBuy ? true : false
  );

  const makeOrder = () => {
    // const forexOpenPositionsOnly = realForexOpenPositions.filter(function (el) {
    //   return el.optionType == "HARealForex";
    // });

    // if (forexOpenPositionsOnly.length >= settings.MaxOpenPositions) {
    //   // Notification for maxOpenPos
    //   return;
    // }

    // Set Current Trade in Store
    const isBuy = route.params.isBuy ? true : false;

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
    setReadyState(true);
  };
  useEffect(() => {
    if (asset) {
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
          {isMarket ? (
            <>
              <RealForexDirectionButtons
                isBuy={isDirectionBuy}
                setDirection={(isBuy) => setDirection(isBuy)}
                asset={asset}
              />
              <MarketOrderControls />
            </>
          ) : (
            <PendingOrderControls />
          )}
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
            // onPress={props.handleSubmit}
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
