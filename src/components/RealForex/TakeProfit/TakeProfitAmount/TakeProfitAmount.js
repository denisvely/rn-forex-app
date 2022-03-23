import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography, Spinner } from "components";

import styles from "../takeProfitStyles";

const TakeProfitAmount = ({ state, setState }) => {
  const { t } = useTranslation();

  return (
    <Spinner
      placeholder={t("common-labels.amount")}
      spinnerValue={state.takeProfitAmount}
      onSpinnerChange={(value) => onChange(value)}
      step={0.1}
      accuracy={2}
    />
  );
};

export default TakeProfitAmount;
