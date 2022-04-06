import React from "react";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import Spinner from "../../../Spinner/Spinner";
import Typography from "../../../Typography/Typography";
import {
  getSelectedAsset,
  getCurrentTrade,
  getRealForexTradingSettings,
} from "../../../../store/realForex";
import { getUser } from "../../../../store/app";
import { convertUnits } from "../../../../store/realForex/helpers";

const TakeProfitAmount = ({ state, setState }) => {
  const { t } = useTranslation();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const user = useSelector((state) => getUser(state));
  const spinnerMin = (
    parseFloat(
      parseFloat(selectedAsset.distance).toFixed(selectedAsset.accuracy)
    ) *
    convertUnits(
      parseFloat(currentTrade.quantity),
      selectedAsset.id,
      true,
      settings
    ) *
    parseFloat(1 / selectedAsset.rate)
  ).toFixed(2);

  const recalculatePendingTPAmount = (value) => {
    const pendingTPDistance = (
      parseFloat(value) /
      ((convertUnits(
        parseFloat(currentTrade.quantity),
        selectedAsset.id,
        true,
        settings
      ) *
        1) /
        selectedAsset.rate)
    ).toFixed(selectedAsset.accuracy);

    setState((prevState) => ({
      ...prevState,
      pendingTPDistance: pendingTPDistance,
      pendingTPAmount: value,
      pendingTPActive: true,
    }));
  };

  const spinnerOnStop = (value) => {
    if (parseFloat(value) < parseFloat(spinnerMin)) {
      recalculatePendingTPAmount(spinnerMin);
    } else {
      recalculatePendingTPAmount(value);
    }
  };

  const spinnerOnStart = () => {
    const pendingTPAmount = (
      parseFloat(selectedAsset.distance) *
      3 *
      convertUnits(
        parseFloat(currentTrade.quantity),
        selectedAsset.id,
        true,
        settings
      ) *
      parseFloat(1 / selectedAsset.rate)
    ).toFixed(2);
    recalculatePendingTPAmount(pendingTPAmount);
  };

  const onChange = (value) => {
    if (value) {
      if (state.pendingTPAmount !== null && state.pendingTPAmount !== 0) {
        spinnerOnStop(value);
      } else {
        spinnerOnStart();
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        pendingTPDistance: 0,
        pendingTPAmount: 0,
        pendingTPActive: false,
      }));
    }
  };

  return selectedAsset ? (
    <Spinner
      prepend={
        state.pendingTPActive ? (
          <Typography
            name="normal"
            text={user.currencySymbol}
            style={{ position: "absolute", left: "35%", top: 18 }}
          />
        ) : null
      }
      placeholder={t("common-labels.amount")}
      spinnerValue={state.pendingTPAmount}
      onSpinnerChange={(value) => onChange(value)}
      step={0.1}
      accuracy={2}
      // min={state.pendingTPActive && parseFloat(spinnerMin)}
    />
  ) : null;
};

export default TakeProfitAmount;
