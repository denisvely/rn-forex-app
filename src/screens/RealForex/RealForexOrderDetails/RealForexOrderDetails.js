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
  const [isReady, setReadyState] = useState(false);

  const [isDirectionBuy, setDirection] = useState(
    route.params.isBuy ? true : false
  );

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
              <MarketOrderControls asset={asset} />
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
