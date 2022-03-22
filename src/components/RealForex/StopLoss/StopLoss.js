import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography, Spinner } from "components";
import StopLossAmount from "./StopLossAmount/StopLossAmount";
import StopLossDistance from "./StopLossDistance/StopLossDistance";
import StopLossPrice from "./StopLossPrice/StopLossPrice";
import styles from "./stopLossStyles";

const StopLoss = ({
  stopLossAmount,
  stopLossDistance,
  stopLossPrice,
  onChangeStopLossAmount,
  onChangeStopLossDistance,
  onChangeStopLossPrice,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.inputsWrapper}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("common-labels.stopLoss")}
      />
      <StopLossAmount
        spinnerValue={stopLossAmount}
        onSpinnerChange={(value) => onChangeStopLossAmount(value)}
        placeholder={t("common-labels.amount")}
      />
      <StopLossDistance
        spinnerValue={stopLossDistance}
        onSpinnerChange={(value) => onChangeStopLossDistance(value)}
        placeholder={t("common-labels.distance")}
      />
      <StopLossPrice
        spinnerValue={stopLossPrice}
        onSpinnerChange={(value) => onChangeStopLossPrice(value)}
        placeholder={t("common-labels.price")}
      />
    </View>
  );
};

export default StopLoss;
