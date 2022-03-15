import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import {
  RealForexTradeButtons,
  MarketPendingButtons,
  QuantityInput,
  TakeProfit,
  StopLoss,
} from "../../../components";

import styles from "./realForexOrderDetailsStyles";

const RealForexOrderDetails = ({ route, navigation }) => {
  const { t } = useTranslation();
  const asset = route.params.asset;
  const isBuy = route.params.isBuy;

  const [isMarket, setOrderType] = useState(true);
  const [quantity, onChangeQuantity] = useState(null);
  const [stopLossAmount, onChangeStopLossAmount] = useState(null);
  const [stopLossDistance, onChangeStopLossDistance] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: `${asset.name}`,
    });

    return () => {
      navigation.setOptions({
        title: ``,
      });
    };
  }, [route.params.asset]);

  return (
    <View style={styles.container}>
      <MarketPendingButtons
        isMarket={isMarket}
        setOrderType={(orderType) => setOrderType(orderType)}
      />
      <QuantityInput
        value={quantity}
        onChange={(text) => onChangeQuantity(text)}
      />
      <TakeProfit />
      <StopLoss />
      <RealForexTradeButtons asset={asset} />
    </View>
  );
};

export default RealForexOrderDetails;
