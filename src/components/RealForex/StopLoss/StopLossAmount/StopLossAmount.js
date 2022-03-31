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
import { getUser, getSettings } from "../../../../store/app";
import { convertUnits, getSpread } from "../../../../store/realForex/helpers";
import { colors } from "../../../../constants";
import { formatCurrency } from "../../../FormatedCurrency/helpers";

const StopLossAmount = ({ state, setState }) => {
  const { t } = useTranslation();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const user = useSelector((state) => getUser(state));
  const globalSettings = useSelector((state) => getSettings(state));
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
      let SLRate;

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
        stopLosstPrice: parseFloat(SLRate),
        stopLossAmount: parseFloat(value),
        SLActive: true,
        isPriceFocused: false,
      }));
    }
  };

  const onChange = (value) => {
    if (value) {
      if (state.stopLossAmount) {
        if (parseFloat(value) < parseFloat(spinnerMin)) {
          Toast.show({
            type: "error",
            text1: `SL Amount must be below ${formatCurrency(
              user.currencySymbol,
              parseFloat(spinnerMax).toFixed(2),
              true,
              globalSettings
            )}`,
          });

          recalculateSLAmount(state.stopLossAmount);
          return;
        }
      }
      let SLAmount;
      if (currentTrade.isBuy) {
        var SLRate =
          parseFloat(realForexPrices[selectedAsset.id].ask) -
          parseFloat(selectedAsset.distance) -
          parseFloat(
            10 *
              parseFloat(
                getSpread(
                  realForexPrices[selectedAsset.id].ask,
                  realForexPrices[selectedAsset.id].bid,
                  realForexPrices[selectedAsset.id].accuracy
                )
              )
          );
        // SL Distance = Math.abs(SL Rate  - ASK Price)
        var SLDistance = Math.abs(
          SLRate - parseFloat(realForexPrices[selectedAsset.id].ask)
        );
        SLAmount = (
          -parseFloat(
            parseFloat(SLDistance).toFixed(
              realForexPrices[selectedAsset.id].accuracy
            )
          ) *
          convertUnits(
            parseFloat(currentTrade.quantity),
            selectedAsset.id,
            true,
            settings
          ) *
          parseFloat(1 / selectedAsset.rate)
        ).toFixed(2);
      } else {
        var SLRate =
          parseFloat(realForexPrices[selectedAsset.id].bid) +
          parseFloat(selectedAsset.distance) +
          parseFloat(
            10 *
              parseFloat(
                getSpread(
                  realForexPrices[selectedAsset.id].ask,
                  realForexPrices[selectedAsset.id].bid,
                  realForexPrices[selectedAsset.id].accuracy
                )
              )
          );
        // SL Distance = Math.abs(SL Rate - BID Price)
        var SLDistance = Math.abs(
          SLRate - parseFloat(realForexPrices[selectedAsset.id].bid)
        );
        SLAmount = (
          -parseFloat(
            parseFloat(SLDistance).toFixed(
              realForexPrices[selectedAsset.id].accuracy
            )
          ) *
          convertUnits(
            parseFloat(currentTrade.quantity),
            selectedAsset.id,
            true,
            settings
          ) *
          parseFloat(1 / selectedAsset.rate)
        ).toFixed(2);
      }
      setState((prevState) => ({
        ...prevState,
        stopLossAmount: parseFloat(SLAmount),
      }));
      recalculateSLAmount(parseFloat(SLAmount));
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
      style={{
        backgroundColor:
          state.SLActive && !state.isPriceFocused
            ? colors.containerBackground
            : colors.white,
      }}
      placeholder={t("common-labels.amount")}
      spinnerValue={state.stopLossAmount}
      onSpinnerChange={(value) => onChange(value)}
      step={0.01}
      accuracy={2}
      // min={parseFloat(spinnerMin)}
      // max={parseFloat(spinnerMax)}
    />
  ) : null;
};

export default StopLossAmount;
