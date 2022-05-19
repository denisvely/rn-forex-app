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
  getCurrentlyModifiedOrder,
} from "../../../../store/realForex";
import { getSpreadValue } from "../../../../store/realForex/helpers";

const StopLossRate = ({ state, setState }) => {
  const { t } = useTranslation();
  const [isErrorActive, setErrorState] = useState(false);
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const currentlyModifiedOrder = useSelector((state) =>
    getCurrentlyModifiedOrder(state)
  );
  const spinnerMax = currentTrade.isBuy
    ? (
        parseFloat(
          realForexPrices[currentlyModifiedOrder.tradableAssetId].bid
        ) - parseFloat(selectedAsset.distance)
      ).toFixed(selectedAsset.accuracy)
    : 10000000;
  const spinnerMin = currentTrade.isBuy
    ? 1000000
    : (
        parseFloat(
          realForexPrices[currentlyModifiedOrder.tradableAssetId].ask
        ) + parseFloat(selectedAsset.distance)
      ).toFixed(selectedAsset.accuracy);

  const onChange = (value) => {
    if (state.stopLossRate !== null) {
      spinnerOnStop(value);
    } else {
      spinnerOnStart(value);
    }
  };

  const recalculateSLRate = (SLDistance) => {
    if (SLDistance != "") {
      const SLRate = (
        (-parseFloat(SLDistance) * currentTrade.quantity * 1) /
        selectedAsset.rate
      ).toFixed(2);

      setState((prevState) => ({
        ...prevState,
        stopLossRate: parseFloat(SLDistance),
        stopLossAmount: parseFloat(SLRate),
        SLActive: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        stopLossRate: null,
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
      recalculateSLRate(spinnerMin);
    } else {
      if (value != "") {
        const SLDistance = parseFloat(
          parseFloat(value).toFixed(selectedAsset.accuracy)
        );
        setState((prevState) => ({
          ...prevState,
          stopLossRate: SLDistance,
        }));
        setErrorState(false);
        Toast.hide();
        recalculateSLRate(SLDistance);
      }
    }
  };

  const spinnerOnStart = () => {
    if (currentTrade.isBuy) {
      const SLRate = parseFloat(
        eval(
          parseFloat(
            realForexPrices[currentlyModifiedOrder.tradableAssetId].bid
          ) -
            parseFloat(selectedAsset.distance) * 3 +
            Math.pow(10, -selectedAsset.accuracy)
        )
      ).toFixed(selectedAsset.accuracy);
      recalculateSLRate(SLRate);
    } else {
      const SLRate = parseFloat(
        eval(
          parseFloat(
            realForexPrices[currentlyModifiedOrder.tradableAssetId].ask
          ) +
            parseFloat(selectedAsset.distance) * 3 +
            Math.pow(10, -selectedAsset.accuracy)
        )
      ).toFixed(selectedAsset.accuracy);
      recalculateSLRate(SLRate);
    }
  };

  useEffect(() => {
    if (!state.SLActive && isErrorActive) {
      setErrorState(false);
    }
  }, [state.SLActive]);

  return selectedAsset ? (
    <Spinner
      placeholder={t("common-labels.distance")}
      spinnerValue={state.stopLossRate}
      onSpinnerChange={(value) => onChange(value)}
      step={parseFloat(Math.pow(10, -selectedAsset.accuracy))}
      errorActive={isErrorActive}
      accuracy={selectedAsset.accuracy}
      max={spinnerMax}
      min={spinnerMin}
    />
  ) : null;
};

export default StopLossRate;
