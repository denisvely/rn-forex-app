import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Spinner from "../../../Spinner/Spinner";
import {
  getSelectedAsset,
  getCurrentTrade,
  getRealForexTradingSettings,
} from "../../../../store/realForex";
import { convertUnits } from "../../../../store/realForex/helpers";

const TakeProfitDistance = ({ state, setState }) => {
  const { t } = useTranslation();
  const [isErrorActive, setErrorState] = useState(false);
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const spinnerMin = parseFloat(selectedAsset.distance).toFixed(
    selectedAsset.accuracy
  );

  const recalculatePendingTPDistance = (value) => {
    const pendingTPAmount = (
      (parseFloat(value) *
        convertUnits(currentTrade.quantity, selectedAsset.id, true, settings) *
        1) /
      selectedAsset.rate
    ).toFixed(2);
    setState((prevState) => ({
      ...prevState,
      pendingTPDistance: value,
      pendingTPAmount: pendingTPAmount,
      pendingTPActive: true,
    }));
  };

  const spinnerOnStop = (value) => {
    if (parseFloat(value) < parseFloat(spinnerMin)) {
      recalculatePendingTPDistance(spinnerMin);
    } else {
      recalculatePendingTPDistance(value);
    }
  };

  const spinnerOnStart = () => {
    const pendingTPDistance = parseFloat(
      eval(
        parseFloat(selectedAsset.initialDistance) +
          Math.pow(10, -selectedAsset.accuracy)
      )
    ).toFixed(selectedAsset.accuracy);
    recalculatePendingTPDistance(pendingTPDistance);
  };

  const onChange = (value) => {
    if (value) {
      if (state.pendingTPDistance !== null && state.pendingTPDistance !== 0) {
        spinnerOnStop(value);
      } else {
        spinnerOnStart();
      }
    }
  };

  return (
    <Spinner
      placeholder={t("common-labels.distance")}
      spinnerValue={state.pendingTPDistance}
      onSpinnerChange={(value) => onChange(value)}
      step={Math.pow(10, -selectedAsset.accuracy).toFixed(
        selectedAsset.accuracy
      )}
      errorActive={isErrorActive}
      // min={
      //   state.pendingTPActive &&
      //   parseFloat(selectedAsset.distance).toFixed(selectedAsset.accuracy)
      // }
      accuracy={selectedAsset.accuracy}
    />
  );
};

export default TakeProfitDistance;
