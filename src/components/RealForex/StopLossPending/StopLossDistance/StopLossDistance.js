import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Spinner from "../../../Spinner/Spinner";
import {
  getSelectedAsset,
  getCurrentTrade,
  getRealForexPrices,
  getRealForexTradingSettings,
} from "../../../../store/realForex";
import {
  convertUnits,
  getSpreadValue,
} from "../../../../store/realForex/helpers";

const StopLossDistance = ({ state, setState }) => {
  const { t } = useTranslation();
  const [isErrorActive, setErrorState] = useState(false);
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const spinnerMin =
    state.pendingSLActive &&
    (
      parseFloat(
        getSpreadValue(
          realForexPrices[selectedAsset.id].ask,
          realForexPrices[selectedAsset.id].bid,
          realForexPrices[selectedAsset.id].accuracy
        ) * Math.pow(10, -realForexPrices[selectedAsset.id].accuracy)
      ) + parseFloat(selectedAsset.distance)
    ).toFixed(selectedAsset.accuracy);

  const recalculatePendingSLDistance = (value) => {
    const pendingSLAmount = (
      (-parseFloat(value) *
        convertUnits(
          parseFloat(currentTrade.quantity),
          selectedAsset.id,
          true,
          settings
        ) *
        1) /
      selectedAsset.rate
    ).toFixed(2);
    setState((prevState) => ({
      ...prevState,
      pendingSLDistance: value,
      pendingSLAmount: pendingSLAmount,
      pendingSLActive: true,
    }));
  };

  const spinnerOnStop = (value) => {
    if (parseFloat(value) < parseFloat(spinnerMin)) {
      recalculatePendingSLDistance(spinnerMin);
    } else {
      recalculatePendingSLDistance(value);
    }
  };

  const spinnerOnStart = () => {
    const pendingSLDistance = parseFloat(
      eval(
        parseFloat(
          getSpreadValue(
            realForexPrices[selectedAsset.id].ask,
            realForexPrices[selectedAsset.id].bid,
            realForexPrices[selectedAsset.id].accuracy
          ) * Math.pow(10, -realForexPrices[selectedAsset.id].accuracy)
        ) +
          parseFloat(selectedAsset.initialDistance) +
          Math.pow(10, -selectedAsset.accuracy)
      )
    ).toFixed(selectedAsset.accuracy);

    recalculatePendingSLDistance(pendingSLDistance);
  };

  const onChange = (value) => {
    if (value) {
      if (state.pendingSLDistance !== null && state.pendingSLDistance !== 0) {
        spinnerOnStop(value);
      } else {
        spinnerOnStart();
      }
    }
  };

  return (
    <Spinner
      placeholder={t("common-labels.distance")}
      spinnerValue={state.pendingSLDistance}
      onSpinnerChange={(value) => onChange(value)}
      step={Math.pow(10, -selectedAsset.accuracy).toFixed(
        selectedAsset.accuracy
      )}
      errorActive={isErrorActive}
      // min={
      //   state.pendingSLActive &&
      //   parseFloat(selectedAsset.distance).toFixed(selectedAsset.accuracy)
      // }
      accuracy={selectedAsset.accuracy}
    />
  );
};

export default StopLossDistance;
