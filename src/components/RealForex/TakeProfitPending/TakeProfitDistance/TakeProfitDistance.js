import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Spinner } from "components";

const TakeProfitDistance = ({ spinnerValue, onSpinnerChange, placeholder }) => {
  const { t } = useTranslation();

  return (
    <Spinner
      spinnerValue={spinnerValue}
      onSpinnerChange={(orderType) => onSpinnerChange(orderType)}
      placeholder={placeholder}
    />
  );
};

export default TakeProfitDistance;
