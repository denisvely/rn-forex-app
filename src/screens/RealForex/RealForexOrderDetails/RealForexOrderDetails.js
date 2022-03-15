import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import {
  RealForexTradeButtons,
  MarketPendingButtons,
  QuantityInput,
  TakeProfit,
  StopLoss,
  HeaderAssetInfo,
  OrderInfo,
} from "../../../components";
import { assetIcon } from "../../../assets/svg/assetIcons/assetsIcons";
import { formatDeciamlWithComma } from "../../../store/realForex/helpers";
import { deviceWidth } from "../../../utils";
import {
  getRealForexTradingSettings,
  getRealForexAssetsSettings,
  setSelectedAsset,
} from "../../../store/realForex";

import styles from "./realForexOrderDetailsStyles";

const RealForexOrderDetails = ({ route, navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const asset = route.params.asset;
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const assetsSettings = useSelector((state) =>
    getRealForexAssetsSettings(state)
  );

  const [isMarket, setOrderType] = useState(true);
  const [quantity, setQuantity] = useState(null);
  const [isReady, setReadyState] = useState(false);

  const [takeProfitAmount, onChangeTakeProfitAmount] = useState(null);
  const [takeProfitDistance, onChangeTakeProfitDistance] = useState(null);
  const [stopLossAmount, onChangeStopLossAmount] = useState(null);
  const [stopLossDistance, onChangeStopLossDistance] = useState(null);

  const setAllPropsForSelectedAsset = () => {
    // SelectedAsset in Store
    asset.isBuy = route.params.isBuy;
    asset.price = assetsSettings[asset.id].MinQuantity;
    asset.maxQuantity = assetsSettings[asset.id].MaxQuantity;
    asset.minQuantity = assetsSettings[asset.id].MinQuantity;
    asset.quantityMultiplier = assetsSettings[asset.id].QuantityMultiplier;
    asset.rate = assetsSettings[asset.id].ExchangeRate;
    asset.distance = parseFloat(assetsSettings[asset.id].Distance).toFixed(
      asset.accuracy
    );
    asset.Leverage = assetsSettings.Leverage;
    asset.minAmount = (
      (parseFloat(asset.distance) * parseFloat(asset.minQuantity) * 1) /
      asset.rate
    ).toFixed(2);
    asset.quantity = !settings.IsVolumeInUnits
      ? asset.minQuantity * asset.quantityMultiplier.split(",")[0]
      : formatDeciamlWithComma(
          asset.minQuantity * asset.quantityMultiplier.split(",")[0]
        );

    setSelectedAsset(dispatch, asset);
    // State
    setQuantity(`${asset.quantity}`);
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
      setAllPropsForSelectedAsset();
    }
  }, [route.params.asset]);

  return (
    <View style={styles.container}>
      <MarketPendingButtons
        isMarket={isMarket}
        setOrderType={(orderType) => setOrderType(orderType)}
      />
      {isReady ? (
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            width: deviceWidth,
            flexGrow: 1,
            paddingBottom: 100,
          }}
        >
          <View style={{ width: deviceWidth }}>
            <QuantityInput
              value={quantity}
              onChange={(text) => setQuantity(text)}
            />
            <TakeProfit
              takeProfitAmount={takeProfitAmount}
              onChangeTakeProfitAmount={(orderType) =>
                onChangeTakeProfitAmount(orderType)
              }
              takeProfitDistance={takeProfitDistance}
              onChangeTakeProfitDistance={(orderType) =>
                onChangeTakeProfitDistance(orderType)
              }
            />
            <StopLoss
              stopLossAmount={stopLossAmount}
              onChangeStopLossAmount={(orderType) =>
                onChangeStopLossAmount(orderType)
              }
              stopLossDistance={stopLossDistance}
              onChangeStopLossDistance={(orderType) =>
                onChangeStopLossDistance(orderType)
              }
            />
            <OrderInfo />
          </View>
        </ScrollView>
      ) : null}
      <RealForexTradeButtons asset={asset} />
    </View>
  );
};

export default RealForexOrderDetails;
