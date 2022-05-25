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
import { getSpreadValue } from "../../../../store/realForex/helpers";

const StopLossDistance = ({ state, setState }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isErrorActive, setErrorState] = useState(false);
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const spinnerMin = (
    parseFloat(
      getSpreadValue(
        realForexPrices[selectedAsset.id].ask,
        realForexPrices[selectedAsset.id].bid,
        realForexPrices[selectedAsset.id].accuracy
      ) * Math.pow(10, -realForexPrices[selectedAsset.id].accuracy)
    ) + parseFloat(selectedAsset.distance)
  ).toFixed(selectedAsset.accuracy);

  const onChange = (value) => {
    if (state.stopLossDistance !== null) {
      spinnerOnStop(value);
    } else {
      spinnerOnStart(value);
    }
  };

  const recalculateSLDistance = (SLDistance) => {
    if (SLDistance != "") {
      const SLAmount = (
        (-parseFloat(SLDistance) * currentTrade.quantity * 1) /
        selectedAsset.rate
      ).toFixed(2);

      setState((prevState) => ({
        ...prevState,
        stopLossDistance: parseFloat(SLDistance),
        stopLossAmount: parseFloat(SLAmount),
        SLActive: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        stopLossDistance: null,
        stopLossAmount: null,
        SLActive: false,
      }));
    }
  };

  const spinnerOnStop = (value) => {
    if (parseFloat(value) < parseFloat(spinnerMin)) {
      setErrorState(true);
      Toast.show({
        type: "error",
        text1: `SL Distance must be higher than ${spinnerMin}`,
        topOffset: 100,
        visibilityTime: 3000,
        autoHide: true,
      });
      recalculateSLDistance(spinnerMin);
    } else {
      if (value != "") {
        const SLDistance = parseFloat(
          parseFloat(value).toFixed(selectedAsset.accuracy)
        );
        setState((prevState) => ({
          ...prevState,
          stopLossDistance: SLDistance,
        }));
        setErrorState(false);
        Toast.hide();
        recalculateSLDistance(SLDistance);
      }
    }
  };

  const spinnerOnStart = () => {
    const SLAmount = parseFloat(
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

    recalculateSLDistance(SLAmount);
  };

  useEffect(() => {
    if (!state.SLActive && isErrorActive) {
      setErrorState(false);
    }
  }, [state.SLActive]);

  return selectedAsset ? (
    <Spinner
      placeholder={t("common-labels.distance")}
      spinnerValue={state.stopLossDistance}
      onSpinnerChange={(value) => onChange(value)}
      step={parseFloat(
        Math.pow(10, -selectedAsset.accuracy).toFixed(selectedAsset.accuracy)
      )}
      errorActive={isErrorActive}
      accuracy={selectedAsset.accuracy}
    />
  ) : null;
};

export default StopLossDistance;
