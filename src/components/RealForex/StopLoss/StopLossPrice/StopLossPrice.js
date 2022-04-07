import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import Spinner from "../../../Spinner/Spinner";
import {
  getSelectedAsset,
  getRealForexPrices,
  getCurrentTrade,
  getRealForexTradingSettings,
} from "../../../../store/realForex";
import { getSpread, convertUnits } from "../../../../store/realForex/helpers";
import { colors } from "../../../../constants";

const StopLossPrice = ({ state, setState }) => {
  const { t } = useTranslation();
  const [isErrorActive, setErrorState] = useState(false);
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const min = !currentTrade.isBuy
    ? parseFloat(
        parseFloat(realForexPrices[selectedAsset.id].bid) +
          parseFloat(selectedAsset.distance)
      ).toFixed(realForexPrices[selectedAsset.id].accuracy)
    : null;

  const max = currentTrade.isBuy
    ? parseFloat(
        parseFloat(realForexPrices[selectedAsset.id].ask) -
          parseFloat(selectedAsset.distance)
      ).toFixed(realForexPrices[selectedAsset.id].accuracy)
    : null;

  const onChange = (value) => {
    if (state.stopLossPrice !== null) {
      spinnerOnStop(value);
    } else {
      spinnerOnStart(value);
    }
  };

  const recalculateSLRate = (SLRate) => {
    let SLDistance = "";
    let SLAmount = "";

    if (SLRate !== "") {
      if (currentTrade.isBuy) {
        // SL Distance = Math.abs(SL Rate  - ASK Price)
        SLDistance = Math.abs(
          SLRate - parseFloat(realForexPrices[selectedAsset.id].ask)
        ).toFixed(realForexPrices[selectedAsset.id].accuracy);

        SLAmount = (
          (-parseFloat(SLDistance) *
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
          stopLossDistance: parseFloat(SLDistance),
          stopLossAmount: parseFloat(SLAmount),
          stopLossPrice: parseFloat(SLRate),
          SLActive: true,
          isPriceFocused: true,
        }));
      } else {
        // SL Distance = Math.abs(SL Rate - BID Price)
        SLDistance = Math.abs(
          SLRate - parseFloat(realForexPrices[selectedAsset.id].bid)
        ).toFixed(realForexPrices[selectedAsset.id].accuracy);
        SLAmount = (
          (-parseFloat(SLDistance) *
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
          stopLossDistance: parseFloat(SLDistance),
          stopLossAmount: parseFloat(SLAmount),
          stopLossPrice: parseFloat(SLRate),
          SLActive: true,
          isPriceFocused: true,
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        stopLossDistance: null,
        stopLossAmount: null,
        stopLossPrice: null,
        SLActive: false,
        isPriceFocused: false,
      }));
    }
  };

  const spinnerOnStop = (value) => {
    recalculateSLRate(value);
    if (value !== "") {
      if (currentTrade.isBuy) {
        // SL Rate > BID Price - Distance
        if (
          parseFloat(value) <
          parseFloat(
            parseFloat(realForexPrices[selectedAsset.id].bid) -
              parseFloat(selectedAsset.distance)
          )
        ) {
          setErrorState(true);
          Toast.show({
            type: "error",
            text1: `SL Rate must be below ${parseFloat(max).toFixed(
              selectedAsset.accuracy
            )}`,
          });
        }
      } else {
        // SL Rate > ASK Price + Distance
        if (
          parseFloat(value) >
          parseFloat(
            parseFloat(realForexPrices[selectedAsset.id].ask) +
              parseFloat(selectedAsset.distance)
          )
        ) {
          setErrorState(true);
          Toast.show({
            type: "error",
            text1: `SL Rate must be higher than ${parseFloat(min).toFixed(
              selectedAsset.accuracy
            )}`,
          });
        }
      }
    }
  };

  const spinnerOnStart = () => {
    let SLRate = "";

    if (currentTrade.isBuy) {
      // SL Rate = ASK Price - Distance  - (10 x spread)
      SLRate = parseFloat(
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
          )
      );
    } else {
      // SL Rate = BID Price + Distance + (10 x spread)
      SLRate = parseFloat(
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
          )
      );
    }
    recalculateSLRate(parseFloat(SLRate));
  };

  useEffect(() => {
    if (!state.SLActive && isErrorActive) {
      setErrorState(false);
    }
  }, [state.SLActive]);

  return selectedAsset && currentTrade ? (
    <Spinner
      placeholder={t("common-labels.price")}
      spinnerValue={state.stopLossPrice}
      onSpinnerChange={(value) => onChange(value)}
      step={parseFloat(Math.pow(10, -selectedAsset.accuracy))}
      errorActive={isErrorActive}
      // min={min}
      // max={max}
      style={{
        backgroundColor:
          state.SLActive && state.isPriceFocused
            ? colors.containerBackground
            : colors.white,
      }}
      accuracy={selectedAsset.accuracy}
    />
  ) : null;
};

export default StopLossPrice;
