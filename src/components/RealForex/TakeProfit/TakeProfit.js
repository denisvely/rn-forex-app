import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography, Spinner } from "components";
import TakeProfitDistance from "./TakeProfitDistance/TakeProfitDistance";
import TakeProfitAmount from "./TakeProfitAmount/TakeProfitAmount";

import styles from "./takeProfitStyles";

const TakeProfit = ({
  takeProfitAmount,
  onChangeTakeProfitAmount,
  takeProfitDistance,
  onChangeTakeProfitDistance,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.inputsWrapper}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("common-labels.takeProfit")}
      />
      <TakeProfitAmount
        spinnerValue={takeProfitAmount}
        onSpinnerChange={(orderType) => onChangeTakeProfitAmount(orderType)}
        placeholder={t("common-labels.amount")}
      />
      <TakeProfitDistance
        spinnerValue={takeProfitDistance}
        onSpinnerChange={(orderType) => onChangeTakeProfitDistance(orderType)}
        placeholder={t("common-labels.distance")}
      />
    </View>
  );
};

export default TakeProfit;
