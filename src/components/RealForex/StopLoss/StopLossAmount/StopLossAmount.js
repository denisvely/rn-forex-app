import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography, Spinner } from "components";
import { colors } from "constants";

import styles from "../stopLossStyles";

const StopLossAmount = ({ spinnerValue, onSpinnerChange }) => {
  const { t } = useTranslation();

  return (
    <Spinner
      spinnerValue={spinnerValue}
      onSpinnerChange={(orderType) => onSpinnerChange(orderType)}
      placeholder={t("common-labels.amount")}
    />
  );
};

export default StopLossAmount;
