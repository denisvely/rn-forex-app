<<<<<<< HEAD
import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
=======
import React from "react";
import { useSelector } from "react-redux";
>>>>>>> 5ac012d48f2e3878066180f81935fe8446fca961
import Toast from "react-native-toast-message";
import {useTranslation} from "react-i18next";
import Spinner from "../../../Spinner/Spinner";
import {
    getSelectedAsset,
    getRealForexPrices,
    getCurrentTrade,
    getRealForexTradingSettings,
} from "../../../../store/realForex";
<<<<<<< HEAD
import {getSpread, convertUnits} from "../../../../store/realForex/helpers";
=======
import { getSpread, convertUnits } from "../../../../store/realForex/helpers";
import { colors } from "../../../../constants";
>>>>>>> 5ac012d48f2e3878066180f81935fe8446fca961

const TakeProfitPrice = ({state, setState}) => {
    const {t} = useTranslation();
    const selectedAsset = useSelector((state) => getSelectedAsset(state));
    const realForexPrices = useSelector((state) => getRealForexPrices(state));
    const currentTrade = useSelector((state) => getCurrentTrade(state));
    const settings = useSelector((state) => getRealForexTradingSettings(state));
    const min = currentTrade.isBuy ? parseFloat(parseFloat(realForexPrices[selectedAsset.id].ask) + parseFloat(selectedAsset.distance)).toFixed(realForexPrices[selectedAsset.id].accuracy) : 0;
    const max = !currentTrade.isBuy ? parseFloat(parseFloat(realForexPrices[selectedAsset.id].bid) - parseFloat(selectedAsset.distance)).toFixed(realForexPrices[selectedAsset.id].accuracy) : null;

    const onChange = (value) => {
        if (state.takeProfitPrice !== null) {
            spinnerOnStop(value);
        } else {
            spinnerOnStart(value);
        }
    };

<<<<<<< HEAD
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
                if (parseFloat(value) < parseFloat(parseFloat(realForexPrices[selectedAsset.id].ask) + parseFloat(selectedAsset.distance))) {
                    Toast.show({
                        type: "error",
                        text1: `TP price must be higher than ${min}`,
                    });
                }
            } else {
                if (parseFloat(value) > parseFloat(parseFloat(realForexPrices[selectedAsset.id].bid) - parseFloat(selectedAsset.distance))) {
                    Toast.show({
                        type: "error",
                        text1: `TP price must be higher than ${max}`,
                    });
                }
            }
=======
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
          isPriceFocused: true,
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
          isPriceFocused: true,
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        takeProfitDistance: null,
        takeProfitAmount: null,
        takeProfitPrice: null,
        TPActive: false,
        isPriceFocused: false,
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
            text1: `TP Rate must be higher than ${parseFloat(min).toFixed(
              selectedAsset.accuracy
            )}`,
            visibilityTime: 3000,
            autoHide: true,
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
            text1: `TP Rate must be higher than ${parseFloat(max).toFixed(
              selectedAsset.accuracy
            )}`,
            visibilityTime: 3000,
            autoHide: true,
          });
>>>>>>> 5ac012d48f2e3878066180f81935fe8446fca961
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

<<<<<<< HEAD
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
=======
  return selectedAsset && currentTrade ? (
    <Spinner
      placeholder={t("common-labels.price")}
      spinnerValue={state.takeProfitPrice}
      onSpinnerChange={(value) => onChange(value)}
      step={parseFloat(Math.pow(10, -selectedAsset.accuracy))}
      // min={min}
      // max={max}
      style={{
        backgroundColor:
          state.TPActive && state.isPriceFocused
            ? colors.containerBackground
            : colors.white,
      }}
      accuracy={selectedAsset.accuracy}
    />
  ) : null;
>>>>>>> 5ac012d48f2e3878066180f81935fe8446fca961
};

export default TakeProfitPrice;
