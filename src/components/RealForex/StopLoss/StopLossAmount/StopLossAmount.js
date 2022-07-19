import React from "react";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Spinner from "../../../Spinner/Spinner";
import Typography from "../../../Typography/Typography";
import {
  getSelectedAsset,
  getRealForexPrices,
  getCurrentTrade,
} from "../../../../store/realForex";
import { getUser, getSettings } from "../../../../store/app";
import { getSpreadValue } from "../../../../store/realForex/helpers";
import { formatCurrency } from "../../../FormatedCurrency/helpers";

const StopLossAmount = ({ state, setState }) => {
  const { t } = useTranslation();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const user = useSelector((state) => getUser(state));
  const globalSettings = useSelector((state) => getSettings(state));
  const spinnerMax = (
    -parseFloat(selectedAsset.minSLDistance) *
    currentTrade.quantity *
    parseFloat(1 / selectedAsset.rate)
  ).toFixed(2);

  const recalculateSLAmount = (value) => {
    if (value) {
      const SLDistance = Math.abs(
        parseFloat(value) / ((currentTrade.quantity * 1) / selectedAsset.rate)
      ).toFixed(selectedAsset.accuracy);

      setState((prevState) => ({
        ...prevState,
        stopLosstDistance: parseFloat(SLDistance),
        stopLossAmount: parseFloat(value),
        SLActive: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        stopLosstDistance: null,
        stopLossAmount: null,
        SLActive: false,
      }));
    }
  };

  const onChange = (value) => {
    if (value) {
      if (state.stopLossAmount) {
        if (parseFloat(value) < parseFloat(spinnerMax)) {
          Toast.show({
            type: "error",
            text1: `SL Amount must be below ${formatCurrency(
              user.currencySymbol,
              parseFloat(spinnerMax).toFixed(2),
              true,
              globalSettings
            )}`,
            visibilityTime: 3000,
            autoHide: true,
          });

          recalculateSLAmount(spinnerMax);
        }
      } else {
        const SLAmount = (
          -parseFloat(
            (
              parseFloat(
                getSpreadValue(
                  realForexPrices[selectedAsset.id].ask,
                  realForexPrices[selectedAsset.id].bid,
                  realForexPrices[selectedAsset.id].accuracy
                ) * Math.pow(10, -realForexPrices[selectedAsset.id].accuracy)
              ) +
              parseFloat(selectedAsset.distance) * 3
            ).toFixed(realForexPrices[selectedAsset.id].accuracy)
          ) *
          currentTrade.quantity *
          parseFloat(1 / selectedAsset.rate)
        ).toFixed(2);

        recalculateSLAmount(SLAmount);
      }
    }
  };

  return selectedAsset ? (
    <Spinner
      prepend={
        state.SLActive ? (
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
      min={parseFloat(-1000000)}
      max={state.SLActive ? parseFloat(spinnerMax) : null}
    />
  ) : null;
};

export default StopLossAmount;
