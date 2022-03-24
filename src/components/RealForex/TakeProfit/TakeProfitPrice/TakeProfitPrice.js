import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

import { Spinner } from "components";
import {
  getSelectedAsset,
  getRealForexPrices,
  getCurrentTrade,
  getRealForexTradingSettings,
} from "store/realForex";
import { getSpread, convertUnits } from "store/realForex/helpers";

const TakeProfitPrice = ({ state, setState }) => {
  const { t } = useTranslation();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const min =
    currentTrade.isBuy &&
    parseFloat(
      parseFloat(realForexPrices[selectedAsset.id].ask) +
        parseFloat(selectedAsset.distance)
    ).toFixed(realForexPrices[selectedAsset.id].accuracy);

  const max =
    !currentTrade.isBuy &&
    parseFloat(
      parseFloat(realForexPrices[selectedAsset.id].bid) -
        parseFloat(selectedAsset.distance)
    ).toFixed(realForexPrices[selectedAsset.id].accuracy);

  const onChange = (value) => {
    if (state.takeProfitPrice !== null) {
      spinnerOnStop(value);
    } else {
      spinnerOnStart(value);
    }
  };

  const recalculateTPRate = (value) => {
    let TPDistance = "";
    let TPAmount = "";

    if (value) {
      if (currentTrade.isBuy) {
        TPDistance = Math.abs(
          value - parseFloat(realForexPrices[selectedAsset.id].ask)
        ).toFixed(realForexPrices[selectedAsset.id].accuracy);
        TPAmount = (
          (parseFloat(TPDistance) *
            convertUnits(
              parseFloat(currentTrade.quantity),
              selectedAsset.id,
              true,
              settings
            ) *
            1) /
          selectedAsset.rate
        ).toFixed(2);
        setState((prevState) => ({
          ...prevState,
          takeProfitDistance: parseFloat(TPDistance),
          takeProfitAmount: parseFloat(TPAmount),
          takeProfitPrice: parseFloat(value),
          TPActive: true,
        }));
      } else {
        TPDistance = Math.abs(
          value - parseFloat(realForexPrices[selectedAsset.id].bid)
        ).toFixed(realForexPrices[selectedAsset.id].accuracy);
        TPAmount = (
          (parseFloat(TPDistance) *
            convertUnits(
              parseFloat(currentTrade.quantity),
              selectedAsset.id,
              true,
              settings
            ) *
            1) /
          selectedAsset.rate
        ).toFixed(2);
        setState((prevState) => ({
          ...prevState,
          takeProfitDistance: parseFloat(TPDistance),
          takeProfitAmount: parseFloat(TPAmount),
          takeProfitPrice: parseFloat(value),
          TPActive: true,
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        takeProfitDistance: null,
        takeProfitAmount: null,
        takeProfitPrice: null,
        TPActive: false,
      }));
    }
  };

  const spinnerOnStop = (value) => {
    recalculateTPRate(value);
    if (value) {
      if (currentTrade.isBuy) {
        // TP Rate < ASK Price + Distance
        if (
          parseFloat(value) <
          parseFloat(
            parseFloat(realForexPrices[selectedAsset.id].ask) +
              parseFloat(selectedAsset.distance)
          )
        ) {
          Toast.show({
            type: "error",
            text1: `TP Rate must be higher than ${min.toFixed(
              selectedAsset.accuracy
            )}`,
          });
        }
      } else {
        // TP Rate > BID Price – Distance
        if (
          parseFloat(value) >
          parseFloat(
            parseFloat(realForexPrices[selectedAsset.id].bid) -
              parseFloat(selectedAsset.distance)
          )
        ) {
          Toast.show({
            type: "error",
            text1: `TP Rate must be higher than ${max.toFixed(
              selectedAsset.accuracy
            )}`,
          });
        }
      }
    }
  };

  const spinnerOnStart = () => {
    let TPRate = "";
    if (currentTrade.isBuy) {
      // TP Rate = ASK Price + Distance + (10 x spread)
      TPRate = parseFloat(
        parseFloat(realForexPrices[selectedAsset.id].ask) +
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
          )
      );
    } else {
      // TP Rate = BID Price – Distance - (10 x spread)
      TPRate = parseFloat(
        parseFloat(realForexPrices[selectedAsset.id].bid) -
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
          )
      );
    }
    recalculateTPRate(parseFloat(TPRate));
  };

  return selectedAsset && currentTrade ? (
    <Spinner
      placeholder={t("common-labels.price")}
      spinnerValue={state.takeProfitPrice}
      onSpinnerChange={(value) => onChange(value)}
      step={parseFloat(Math.pow(10, -selectedAsset.accuracy))}
      min={min}
      max={max}
      accuracy={selectedAsset.accuracy}
    />
  ) : null;
};

export default TakeProfitPrice;
