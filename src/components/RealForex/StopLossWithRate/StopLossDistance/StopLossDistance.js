import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import Spinner from "../../../Spinner/Spinner";
import {
  getSelectedAsset,
  getRealForexPrices,
  getCurrentTrade,
  getRealForexTradingSettings,
} from "../../../../store/realForex";
import {
  getSpread,
  convertUnits,
  getSpreadValue,
} from "../../../../store/realForex/helpers";
import { colors } from "../../../../constants";

const StopLossDistance = ({ state, setState }) => {
  const { t } = useTranslation();
  const [isErrorActive, setErrorState] = useState(false);
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const spinnerMin = (
    parseFloat(
      getSpreadValue(
        realForexPrices[selectedAsset.id].ask,
        realForexPrices[selectedAsset.id].bid,
        realForexPrices[selectedAsset.id].accuracy
      ) * Math.pow(10, -realForexPrices[selectedAsset.id].accuracy)
    ) + parseFloat(selectedAsset.distance)
  ).toFixed(selectedAsset.accuracy);

  const onChange = (value) => {
    if (state.stopLossDistance !== null) {
      spinnerOnStop(value);
    } else {
      spinnerOnStart(value);
    }
  };

  const recalculateSLDistance = (SLDistance) => {
    if (SLDistance != "") {
      const SLAmount = (
        (-parseFloat(SLDistance) *
          convertUnits(
            currentTrade.quantity,
            selectedAsset.id,
            true,
            settings
          ) *
          1) /
        selectedAsset.rate
      ).toFixed(2);
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
        stopLossDistance: parseFloat(SLDistance),
        stopLossAmount: parseFloat(SLAmount),
        stopLossPrice: parseFloat(SLRate),
        SLActive: true,
        isPriceFocused: false,
      }));
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
    if (parseFloat(value) < parseFloat(spinnerMin)) {
      setState((prevState) => ({
        ...prevState,
        stopLossDistance: parseFloat(spinnerMin),
      }));
      setErrorState(true);
      Toast.show({
        type: "error",
        text1: `SL Distance must be higher than ${spinnerMin}`,
        topOffset: 100,
      });

      setTimeout(() => {}, 3000);
    } else {
      if (value != "") {
        const SLDistance = parseFloat(
          parseFloat(value).toFixed(selectedAsset.accuracy)
        );
        setState((prevState) => ({
          ...prevState,
          stopLossDistance: SLDistance,
          isPriceFocused: false,
        }));
        setErrorState(false);
        Toast.hide();
      }
    }
    recalculateSLDistance(value);
  };

  const spinnerOnStart = () => {
    let SLDistance = "";
    if (currentTrade.isBuy) {
      let SLRate =
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
      SLDistance = parseFloat(
        Math.abs(SLRate - parseFloat(realForexPrices[selectedAsset.id].ask))
      );
    } else {
      let SLRate =
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
      SLDistance = parseFloat(
        Math.abs(SLRate - parseFloat(realForexPrices[selectedAsset.id].bid))
      );
    }
    recalculateSLDistance(SLDistance);
  };


  useEffect(() => {
    if (!state.SLActive && isErrorActive) {
      setErrorState(false);
    }
  }, [state.SLActive]);

  return selectedAsset ? (
    <Spinner
      placeholder={t("common-labels.distance")}
      spinnerValue={state.stopLossDistance}
      onSpinnerChange={(value) => onChange(value)}
      step={parseFloat(
        Math.pow(10, -selectedAsset.accuracy).toFixed(selectedAsset.accuracy)
      )}
      style={{
        backgroundColor:
          state.SLActive && !state.isPriceFocused
            ? colors.containerBackground
            : colors.white,
      }}
      errorActive={isErrorActive}
      // min={spinnerMin}
      accuracy={selectedAsset.accuracy}
    />
  ) : null;
};

export default StopLossDistance;
