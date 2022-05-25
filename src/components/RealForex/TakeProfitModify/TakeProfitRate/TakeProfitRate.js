import React from "react";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import Spinner from "../../../Spinner/Spinner";
import {
  getSelectedAsset,
  getRealForexPrices,
  getCurrentTrade,
  getRealForexTradingSettings,
  getCurrentlyModifiedOrder,
} from "../../../../store/realForex";
import { convertUnits } from "../../../../store/realForex/helpers";

const TakeProfitRate = ({ state, setState }) => {
  const { t } = useTranslation();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const currentlyModifiedOrder = useSelector((state) =>
    getCurrentlyModifiedOrder(state)
  );
  const spinnerMin = currentTrade.isBuy
    ? (
        parseFloat(
          realForexPrices[currentlyModifiedOrder.tradableAssetId].bid
        ) + parseFloat(selectedAsset.distance)
      ).toFixed(selectedAsset.accuracy)
    : -1000000;

  const spinnerMax = currentTrade.isBuy
    ? 10000000
    : (
        parseFloat(
          realForexPrices[currentlyModifiedOrder.tradableAssetId].ask
        ) - parseFloat(selectedAsset.distance)
      ).toFixed(selectedAsset.accuracy);

  const recalculateTPRate = (TPRate) => {
    if (TPRate !== "") {
      const TPAmount = (
        (parseFloat(
          currentlyModifiedOrder.actionType == "Sell"
            ? currentlyModifiedOrder.rate - parseFloat(TPRate)
            : parseFloat(TPRate) - currentlyModifiedOrder.rate
        ) *
          convertUnits(
            parseFloat(currentlyModifiedOrder.volume),
            currentlyModifiedOrder.tradableAssetId,
            true,
            settings
          )) /
        currentlyModifiedOrder.exchangeRate
      ).toFixed(2);

      setState((prevState) => ({
        ...prevState,
        takeProfitRate: parseFloat(TPRate),
        takeProfitAmount: parseFloat(TPAmount),
        TPActive: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        takeProfitRate: null,
        takeProfitAmount: null,
        TPActive: false,
      }));
    }
  };
  const spinnerOnStart = () => {
    if (currentTrade.isBuy) {
      const TPRate = parseFloat(
        eval(
          parseFloat(
            realForexPrices[currentlyModifiedOrder.tradableAssetId].bid
          ) +
            parseFloat(selectedAsset.distance) * 3 +
            Math.pow(10, -selectedAsset.accuracy)
        )
      ).toFixed(selectedAsset.accuracy);
      recalculateTPRate(TPRate);
    } else {
      const TPRate = parseFloat(
        eval(
          parseFloat(
            realForexPrices[currentlyModifiedOrder.tradableAssetId].ask
          ) -
            parseFloat(selectedAsset.distance) * 3 +
            Math.pow(10, -selectedAsset.accuracy)
        )
      ).toFixed(selectedAsset.accuracy);
      recalculateTPRate(TPRate);
    }
  };

  const spinnerOnStop = (value) => {
    if (currentTrade.isBuy) {
      if (parseFloat(value) < parseFloat(spinnerMin)) {
        const TPRate = parseFloat(spinnerMin).toFixed(selectedAsset.accuracy);
        recalculateTPRate(TPRate);
      } else {
        const TPRate = parseFloat(value).toFixed(selectedAsset.accuracy);
        recalculateTPRate(TPRate);
      }
    } else {
      if (parseFloat(value) > parseFloat(spinnerMax)) {
        const TPRate = parseFloat(spinnerMax).toFixed(selectedAsset.accuracy);
        recalculateTPRate(TPRate);
      } else {
        const TPRate = parseFloat(value).toFixed(selectedAsset.accuracy);
        recalculateTPRate(TPRate);
      }
    }
  };
  const onChange = (value) => {
    if (state.takeProfitRate !== null) {
      spinnerOnStop(value);
    } else {
      spinnerOnStart();
    }
  };

  return selectedAsset && currentTrade ? (
    <Spinner
      placeholder={t("common-labels.rate")}
      spinnerValue={state.takeProfitRate}
      onSpinnerChange={(value) => onChange(value)}
      step={parseFloat(Math.pow(10, -selectedAsset.accuracy))}
      min={spinnerMin}
      max={spinnerMax}
      accuracy={selectedAsset.accuracy}
    />
  ) : null;
};

export default TakeProfitRate;
