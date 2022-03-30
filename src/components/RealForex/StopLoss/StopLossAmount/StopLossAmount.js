import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Spinner from "../../../Spinner/Spinner";
import Typography from "../../../Typography/Typography";
import {
  getSelectedAsset,
  getRealForexPrices,
  getCurrentTrade,
  getRealForexTradingSettings,
} from "../../../../store/realForex";
import { getUser } from "../../../../store/app";
import { convertUnits } from "../../../../store/realForex/helpers";

const StopLossAmount = ({ state, setState }) => {
  const { t } = useTranslation();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const user = useSelector((state) => getUser(state));
  const spinnerMin = (
    -parseFloat(selectedAsset.minTPDistance) *
    convertUnits(
      parseFloat(currentTrade.quantity),
      selectedAsset.id,
      true,
      settings
    ) *
    parseFloat(1 / selectedAsset.rate)
  ).toFixed(2);
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

  const recalculateSLAmount = (value) => {
    if (value) {
      let SLRate = "";

      let SLDistance = Math.abs(
        parseFloat(value) /
          ((convertUnits(
            parseFloat(parseFloat(currentTrade.quantity), true),
            selectedAsset.id,
            true,
            settings
          ) *
            1) /
            selectedAsset.rate)
      ).toFixed(selectedAsset.accuracy);

      if (currentTrade.isBuy) {
        SLRate = parseFloat(
          parseFloat(realForexPrices[selectedAsset.id].ask) -
            parseFloat(SLDistance)
        ).toFixed(realForexPrices[selectedAsset.id].accuracy);
      } else {
        SLRate = parseFloat(
          parseFloat(realForexPrices[selectedAsset.id].bid) +
            parseFloat(SLDistance)
        ).toFixed(realForexPrices[selectedAsset.id].accuracy);
      }

      setState((prevState) => ({
        ...prevState,
        stopLosstDistance: parseFloat(SLDistance),
        StopLossAmount: parseFloat(value),
        stopLosstPrice: parseFloat(SLRate),
        SLActive: true,
      }));
    }
  };

  const onChange = (value) => {
    if (value) {
      recalculateSLAmount(value);
    } else {
      // spinnerOnStart(value);
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
      min={parseFloat(spinnerMin)}
      max={parseFloat(spinnerMax)}
    />
  ) : null;
};

export default StopLossAmount;
