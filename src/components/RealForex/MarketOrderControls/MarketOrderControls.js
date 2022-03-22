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
import { getSelectedAsset } from "../../../store/realForex";

import styles from "./marketOrderControlsStyles";

const MarketOrderControls = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));

  const [takeProfitAmount, onChangeTakeProfitAmount] = useState(null);
  const [takeProfitDistance, onChangeTakeProfitDistance] = useState(null);
  const [takeProfitPrice, onChangeTakeProfitPrice] = useState(null);
  const [stopLossAmount, onChangeStopLossAmount] = useState(null);
  const [stopLossDistance, onChangeStopLossDistance] = useState(null);
  const [stopLossPrice, onChangeStopLossPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    if (selectedAsset) {
      setQuantity(`${selectedAsset.quantity}`);
    }
  }, [selectedAsset]);
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
          onChange={(text) => setQuantity(text)}
        />
        <TakeProfit
          takeProfitAmount={takeProfitAmount}
          onChangeTakeProfitAmount={(value) => onChangeTakeProfitAmount(value)}
          takeProfitDistance={takeProfitDistance}
          onChangeTakeProfitDistance={(value) =>
            onChangeTakeProfitDistance(value)
          }
          takeProfitPrice={takeProfitPrice}
          onChangeTakeProfitPrice={(value) => onChangeTakeProfitPrice(value)}
        />
        <StopLoss
          stopLossAmount={stopLossAmount}
          onChangeStopLossAmount={(value) => onChangeStopLossAmount(value)}
          stopLossDistance={stopLossDistance}
          onChangeStopLossDistance={(value) => onChangeStopLossDistance(value)}
          stopLossPrice={stopLossPrice}
          onChangeStopLossPrice={(value) => onChangeStopLossPrice(value)}
        />
        <OrderInfo />
      </View>
    </ScrollView>
  );
};

export default MarketOrderControls;
