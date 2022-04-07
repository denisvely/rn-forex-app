import React from "react";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import Spinner from "../../../Spinner/Spinner";
import Typography from "../../../Typography/Typography";
import {
  getSelectedAsset,
  getCurrentTrade,
  getRealForexPrices,
  getRealForexTradingSettings,
} from "../../../../store/realForex";
import { getUser } from "../../../../store/app";
import {
  convertUnits,
  getSpreadValue,
} from "../../../../store/realForex/helpers";

const StopLossAmount = ({ state, setState }) => {
  const { t } = useTranslation();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const user = useSelector((state) => getUser(state));
  const spinnerMax = (
    -parseFloat(selectedAsset.minSLDistance) *
    convertUnits(
      parseFloat(currentTrade.quantity),
      selectedAsset.id,
      true,
      settings
    ) *
    parseFloat(1 / selectedAsset.rate)
  ).toFixed(2);

  const recalculatePendingSLAmount = (value) => {
    const pendingSLDistance = Math.abs(
      parseFloat(value) /
        ((convertUnits(
          parseFloat(currentTrade.quantity, true),
          selectedAsset.id,
          true,
          settings
        ) *
          1) /
          selectedAsset.rate)
    ).toFixed(selectedAsset.accuracy);

    setState((prevState) => ({
      ...prevState,
      pendingSLDistance: parseFloat(pendingSLDistance),
      pendingSLAmount: parseFloat(value),
      pendingSLActive: true,
    }));
  };

  const spinnerOnStop = (value) => {
    if (parseFloat(value) > parseFloat(spinnerMax)) {
      recalculatePendingSLAmount(spinnerMax);
    } else {
      recalculatePendingSLAmount(value);
    }
  };

  const spinnerOnStart = () => {
    const pendingSLAmount = (
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
      convertUnits(
        parseFloat(currentTrade.quantity),
        selectedAsset.id,
        true,
        settings
      ) *
      parseFloat(1 / selectedAsset.rate)
    ).toFixed(2);

    recalculatePendingSLAmount(pendingSLAmount);
  };

  const onChange = (value) => {
    if (value) {
      if (state.pendingSLAmount !== null && state.pendingSLAmount !== 0) {
        spinnerOnStop(value);
      } else {
        spinnerOnStart();
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        pendingSLDistance: 0,
        pendingSLAmount: 0,
        pendingSLActive: false,
      }));
    }
  };

  return selectedAsset ? (
    <Spinner
      prepend={
        state.pendingSLActive ? (
          <Typography
            name="normal"
            text={user.currencySymbol}
            style={{ position: "absolute", left: "35%", top: 18 }}
          />
        ) : null
      }
      placeholder={t("common-labels.amount")}
      spinnerValue={state.pendingSLAmount}
      onSpinnerChange={(value) => onChange(value)}
      step={0.1}
      accuracy={2}
      // min={state.pendingSLActive && parseFloat(spinnerMin)}
    />
  ) : null;
};

export default StopLossAmount;
