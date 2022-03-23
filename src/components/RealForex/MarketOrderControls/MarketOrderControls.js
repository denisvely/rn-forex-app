import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import {
  QuantityInput,
  TakeProfit,
  StopLoss,
  OrderInfo,
} from "../../../components";
import { deviceWidth } from "../../../utils";
import {
  getSelectedAsset,
  getCurrentTrade,
  getRealForexTradingSettings,
} from "../../../store/realForex";
import {
  convertUnits,
  formatDeciamlWithComma,
} from "../../../store/realForex/helpers";

import styles from "./marketOrderControlsStyles";

const MarketOrderControls = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const [quantity, setQuantity] = useState(null);

  const initQuantity = () => {
    setQuantity(`${selectedAsset.quantity}`);
  };

  useEffect(() => {
    if (selectedAsset) {
      initQuantity();
    }
  }, [selectedAsset]);

  const onChangeQuantity = (value) => {
    const quantityValue =
      value.indexOf(",") > -1
        ? convertUnits(
            parseFloat(value.replace(/,/g, "")),
            selectedAsset.id,
            true,
            settings
          )
        : convertUnits(parseFloat(value), selectedAsset.id, true, settings);
    console.log(quantityValue);
    setQuantity(formatDeciamlWithComma(quantityValue));
    currentTrade.quantity = quantityValue;
  };

  const onQuantityFocus = () => {
    const quantityValue = convertUnits(
      parseFloat(quantity.replace(/,/g, "")),
      selectedAsset.id,
      true,
      settings
    );
    setQuantity(quantityValue);
  };

  return (
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
      <View style={{ width: deviceWidth }}>
        <QuantityInput
          value={quantity}
          onChange={(value) => onChangeQuantity(value)}
          onFocus={() => onQuantityFocus()}
        />
        <TakeProfit />
        <StopLoss />
        <OrderInfo />
      </View>
    </ScrollView>
  );
};

export default MarketOrderControls;
