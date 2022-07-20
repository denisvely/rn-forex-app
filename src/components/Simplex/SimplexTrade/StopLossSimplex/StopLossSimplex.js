import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { Spinner } from "../../../../components";

const StopLossSimplex = ({ value, setValue, stopLossDDL }) => {
  const { t } = useTranslation();
  return (
    <Spinner
      placeholder={t("common-labels.distance")}
      spinnerValue={state.takeProfitDistance}
      onSpinnerChange={(value) => onChange(value)}
      step={parseFloat(
        Math.pow(10, -selectedAsset.accuracy).toFixed(selectedAsset.accuracy)
      )}
      errorActive={isErrorActive}
      // min={
      //   state.TPActive &&
      //   parseFloat(selectedAsset.distance).toFixed(selectedAsset.accuracy)
      // }
      accuracy={selectedAsset.accuracy}
    />
  );
};
export default StopLossSimplex;
