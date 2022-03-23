import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography, Spinner } from "components";

import styles from "../takeProfitStyles";

const TakeProfitPrice = ({ state, setState }) => {
  const { t } = useTranslation();

  return (
    <Spinner
      placeholder={t("common-labels.price")}
      spinnerValue={state.takeProfitPrice}
      onSpinnerChange={(value) => onChange(value)}
      step={0.1}
      accuracy={2}
    />
  );
};

export default TakeProfitPrice;
