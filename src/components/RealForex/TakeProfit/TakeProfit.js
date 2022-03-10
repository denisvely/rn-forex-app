import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography, Spinner } from "components";
import { colors } from "constants";

import styles from "./takeProfitStyles";

const TakeProfit = () => {
  const { t } = useTranslation();

  const [takeProfitAmount, onChangeTakeProfitAmount] = useState(null);
  const [takeProfitDistance, onChangeTakeProfitDistance] = useState(null);

  return (
    <View style={styles.inputsWrapper}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("common-labels.takeProfit")}
      />
      <Spinner
        spinnerValue={takeProfitAmount}
        onSpinnerChange={(orderType) => onChangeTakeProfitAmount(orderType)}
        placeholder={t("common-labels.amount")}
      />
      <Spinner
        spinnerValue={takeProfitDistance}
        onSpinnerChange={(orderType) => onChangeTakeProfitDistance(orderType)}
        placeholder={t("common-labels.distance")}
      />
    </View>
  );
};

export default TakeProfit;
