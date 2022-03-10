import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography, Spinner } from "components";
import { colors } from "constants";

import styles from "./stopLossStyles";

const StopLoss = () => {
  const { t } = useTranslation();

  const [stopLossAmount, onChangeStopLossAmount] = useState(null);
  const [stopLossDistance, onChangeStopLossDistance] = useState(null);

  return (
    <View style={styles.inputsWrapper}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("common-labels.stopLoss")}
      />
      <Spinner
        spinnerValue={stopLossAmount}
        onSpinnerChange={(orderType) => onChangeStopLossAmount(orderType)}
        placeholder={t("common-labels.amount")}
      />
      <Spinner
        spinnerValue={stopLossDistance}
        onSpinnerChange={(orderType) => onChangeStopLossDistance(orderType)}
        placeholder={t("common-labels.distance")}
      />
    </View>
  );
};

export default StopLoss;
