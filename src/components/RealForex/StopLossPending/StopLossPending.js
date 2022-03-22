import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography } from "components";
import StopLossAmount from "./StopLossAmount/StopLossAmount";
import StopLossDistance from "./StopLossDistance/StopLossDistance";
import styles from "./stopLossStyles";

const StopLossPending = ({
  stopLossPendingPendingAmount,
  stopLossPendingDistance,
  onChangeStopLossPendingAmount,
  onChangeStopLossPendingDistance,
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
        spinnerValue={stopLossPendingPendingAmount}
        onSpinnerChange={(value) => onChangeStopLossPendingAmount(value)}
        placeholder={t("common-labels.amount")}
      />
      <StopLossDistance
        spinnerValue={stopLossPendingDistance}
        onSpinnerChange={(value) => onChangeStopLossPendingDistance(value)}
        placeholder={t("common-labels.distance")}
      />
    </View>
  );
};

export default StopLossPending;
