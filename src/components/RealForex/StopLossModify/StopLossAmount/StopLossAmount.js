import React from "react";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import Spinner from "../../../Spinner/Spinner";
import Typography from "../../../Typography/Typography";
import {
  getSelectedAsset,
  getRealForexPrices,
  getCurrentTrade,
  getRealForexTradingSettings,
  getCurrentlyModifiedOrder,
} from "../../../../store/realForex";
import { getUser } from "../../../../store/app";
import { convertUnits } from "../../../../store/realForex/helpers";

const StopLossAmount = ({ state, setState }) => {
  const { t } = useTranslation();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const user = useSelector((state) => getUser(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const currentlyModifiedOrder = useSelector((state) =>
    getCurrentlyModifiedOrder(state)
  );
  const spinnerMin = currentTrade.isBuy
    ? (
        (currentlyModifiedOrder.minTPRate - currentlyModifiedOrder.rate) *
        parseFloat(
          convertUnits(
            currentlyModifiedOrder.volume,
            currentlyModifiedOrder.tradableAssetId,
            true,
            settings
          )
        ) *
        parseFloat(1 / currentlyModifiedOrder.exchangeRate)
      ).toFixed(2)
    : -1000000;

  const spinnerMax = currentTrade.isBuy
    ? 1000000
    : (
        (currentlyModifiedOrder.rate - currentlyModifiedOrder.minSLRate) *
        parseFloat(
          convertUnits(
            currentlyModifiedOrder.volume,
            currentlyModifiedOrder.tradableAssetId,
            true,
            settings
          )
        ) *
        parseFloat(1 / currentlyModifiedOrder.exchangeRate)
      ).toFixed(2);

  const recalculateProfitLossSLAmount = (value) => {
    if (value) {
      if (currentTrade.isBuy) {
        const TPRate = (
          parseFloat(value) /
            (convertUnits(
              parseFloat(currentlyModifiedOrder.volume),
              currentlyModifiedOrder.tradableAssetId,
              true,
              settings
            ) *
              (1 / currentlyModifiedOrder.exchangeRate)) +
          parseFloat(currentlyModifiedOrder.rate)
        ).toFixed(currentlyModifiedOrder.accuracy);
        setState((prevState) => ({
          ...prevState,
          stopLossRate: parseFloat(TPRate),
          stopLossAmount: parseFloat(value),
          TPActive: true,
        }));
      } else {
        const TPRate = (
          parseFloat(currentlyModifiedOrder.rate) -
          parseFloat(value) /
            (convertUnits(
              parseFloat(currentlyModifiedOrder.volume),
              currentlyModifiedOrder.tradableAssetId,
              true,
              settings
            ) *
              (1 / currentlyModifiedOrder.exchangeRate))
        ).toFixed(currentlyModifiedOrder.accuracy);
        setState((prevState) => ({
          ...prevState,
          stopLossRate: parseFloat(TPRate),
          stopLossAmount: parseFloat(value),
          TPActive: true,
        }));
      }
    }
  };

  const onChange = (value) => {
    if (value) {
      if (state.stopLossAmount) {
        //   SpinnerOnStop

        if (parseFloat(value) < parseFloat(spinnerMax)) {
          recalculateProfitLossSLAmount(parseFloat(spinnerMax));
        } else {
          recalculateProfitLossSLAmount(value);
        }
      } else {
        //   SpinnerOnStart
        if (currentTrade.isBuy) {
          const TPAmount = (
            (parseFloat(
              realForexPrices[currentlyModifiedOrder.tradableAssetId].bid
            ) -
              parseFloat(selectedAsset.distance) * 3 -
              currentlyModifiedOrder.rate) *
            parseFloat(
              convertUnits(
                currentlyModifiedOrder.volume,
                currentlyModifiedOrder.tradableAssetId,
                true,
                settings
              )
            ) *
            parseFloat(1 / currentlyModifiedOrder.exchangeRate)
          ).toFixed(2);

          const TPRate = (
            parseFloat(
              realForexPrices[currentlyModifiedOrder.tradableAssetId].bid
            ) -
            parseFloat(selectedAsset.distance) * 3
          ).toFixed(selectedAsset.accuracy);

          setState((prevState) => ({
            ...prevState,
            stopLossRate: parseFloat(TPRate),
            stopLossAmount: parseFloat(TPAmount),
            TPActive: true,
          }));
        } else {
          const TPAmount = parseFloat(
            (currentlyModifiedOrder.rate -
              (parseFloat(
                realForexPrices[currentlyModifiedOrder.tradableAssetId].ask
              ) +
                parseFloat(selectedAsset.distance) * 3)) *
              parseFloat(
                convertUnits(
                  currentlyModifiedOrder.volume,
                  currentlyModifiedOrder.tradableAssetId,
                  true,
                  settings
                )
              ) *
              parseFloat(1 / currentlyModifiedOrder.exchangeRate)
          ).toFixed(2);
          const TPRate = (
            parseFloat(
              realForexPrices[currentlyModifiedOrder.tradableAssetId].ask
            ) +
            parseFloat(selectedAsset.distance) * 3
          ).toFixed(selectedAsset.accuracy);

          setState((prevState) => ({
            ...prevState,
            stopLossRate: parseFloat(TPRate),
            stopLossAmount: parseFloat(TPAmount),
            TPActive: true,
          }));
        }
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        stopLossRate: null,
        stopLossAmount: null,
        TPActive: false,
      }));
    }
  };

  return selectedAsset ? (
    <Spinner
      prepend={
        state.TPActive ? (
          <Typography
            name="normal"
            text={user.currencySymbol}
            style={{ position: "absolute", left: "35%", top: 18 }}
          />
        ) : null
      }
      placeholder={t("common-labels.amount")}
      spinnerValue={state.stopLossAmount}
      onSpinnerChange={(value) => onChange(value)}
      step={0.01}
      accuracy={2}
      min={spinnerMin}
      max={spinnerMax}
    />
  ) : null;
};

export default StopLossAmount;
