import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography, Spinner } from "components";
import StopLossAmount from "./StopLossAmount/StopLossAmount";
import StopLossDistance from "./StopLossDitance.js/StopLossDistance";

import styles from "./stopLossStyles";

const StopLoss = ({
  stopLossAmount,
  stopLossDistance,
  onChangeStopLossAmount,
  onChangeStopLossDistance,
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
        onSpinnerChange={(orderType) => onChangeStopLossAmount(orderType)}
        placeholder={t("common-labels.amount")}
      />
      <StopLossDistance
        spinnerValue={stopLossDistance}
        onSpinnerChange={(orderType) => onChangeStopLossDistance(orderType)}
        placeholder={t("common-labels.distance")}
      />
    </View>
  );
};

export default StopLoss;
