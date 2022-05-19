import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import Spinner from "../../../Spinner/Spinner";
import {
  getSelectedAsset,
  getRealForexPrices,
  getCurrentTrade,
  getRealForexTradingSettings,
} from "../../../../store/realForex";

const TakeProfitDistance = ({ state, setState }) => {
  const { t } = useTranslation();
  const [isErrorActive, setErrorState] = useState(false);
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const spinnerMin = parseFloat(selectedAsset.distance).toFixed(
    selectedAsset.accuracy
  );

  const onChange = (value) => {
    if (state.takeProfitDistance !== null) {
      spinnerOnStop(value);
    } else {
      spinnerOnStart(value);
    }
  };

  const recalculateTPDistance = (TPDistance) => {
    if (TPDistance != "") {
      const TPAmount = (
        (parseFloat(TPDistance) * currentTrade.quantity * 1) /
        selectedAsset.rate
      ).toFixed(2);

      setState((prevState) => ({
        ...prevState,
        takeProfitDistance: parseFloat(TPDistance),
        takeProfitAmount: parseFloat(TPAmount),
        TPActive: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        takeProfitDistance: null,
        takeProfitAmount: null,
        TPActive: false,
      }));
    }
  };

  const spinnerOnStop = (value) => {
    if (parseFloat(value) < parseFloat(spinnerMin)) {
      setErrorState(true);
      Toast.show({
        type: "error",
        text1: `TP Distance must be higher than ${spinnerMin}`,
        topOffset: 100,
        visibilityTime: 3000,
        autoHide: true,
      });
      recalculateTPDistance(spinnerMin);
    } else {
      if (value != "") {
        const TPDistance = parseFloat(
          parseFloat(value).toFixed(selectedAsset.accuracy)
        );
        setState((prevState) => ({
          ...prevState,
          takeProfitDistance: TPDistance,
          isPriceFocused: false,
        }));
        setErrorState(false);
        Toast.hide();
        recalculateTPDistance(value);
      }
    }
  };

  const spinnerOnStart = () => {
    let TPDistance = parseFloat(
      eval(
        parseFloat(selectedAsset.initialDistance) +
          Math.pow(10, -selectedAsset.accuracy)
      )
    ).toFixed(selectedAsset.accuracy);

    recalculateTPDistance(TPDistance);
  };

  useEffect(() => {
    if (!state.TPActive && isErrorActive) {
      setErrorState(false);
    }
  }, [state.TPActive]);

  return selectedAsset ? (
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
  ) : null;
};

export default TakeProfitDistance;
