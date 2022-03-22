import React from "react";
import { useTranslation } from "react-i18next";

import { Spinner } from "components";

const TakeProfitAmount = ({ spinnerValue, onSpinnerChange, placeholder }) => {
  const { t } = useTranslation();

  return (
    <Spinner
      spinnerValue={spinnerValue}
      onSpinnerChange={(orderType) => onSpinnerChange(orderType)}
      placeholder={placeholder}
    />
  );
};

export default TakeProfitAmount;
