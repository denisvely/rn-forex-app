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
import { getSpread, convertUnits } from "../../../../store/realForex/helpers";
import { colors } from "../../../../constants";

const TakeProfitDistance = ({ state, setState }) => {
  const { t } = useTranslation();
  const [isErrorActive, setErrorState] = useState(false);
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const spinnerMin = parseFloat(selectedAsset.distance).toFixed(
    selectedAsset.accuracy
  );

  const onChange = (value) => {
    if (state.takeProfitDistance !== null) {
      spinnerOnStop(value);
    } else {
      spinnerOnStart(value);
    }
  };

  const recalculateTPDistance = (TPDistance) => {
    if (TPDistance != "") {
      let TPRate = null;
      const TPAmount = (
        (parseFloat(TPDistance) *
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
        TPRate = parseFloat(
          parseFloat(realForexPrices[selectedAsset.id].ask) +
            parseFloat(TPDistance)
        ).toFixed(realForexPrices[selectedAsset.id].accuracy);
      } else {
        TPRate = parseFloat(
          parseFloat(realForexPrices[selectedAsset.id].bid) -
            parseFloat(TPDistance)
        ).toFixed(realForexPrices[selectedAsset.id].accuracy);
      }
      setState((prevState) => ({
        ...prevState,
        takeProfitDistance: parseFloat(TPDistance),
        takeProfitAmount: parseFloat(TPAmount),
        takeProfitPrice: parseFloat(TPRate),
        TPActive: true,
        isPriceFocused: false,
      }));
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
    if (parseFloat(value) < parseFloat(spinnerMin)) {
      setState((prevState) => ({
        ...prevState,
        takeProfitDistance: parseFloat(spinnerMin),
      }));
      setErrorState(true);
      Toast.show({
        type: "error",
        text1: `TP Distance must be higher than ${spinnerMin}`,
        topOffset: 100,
      });

      setTimeout(() => {}, 3000);
    } else {
      if (value != "") {
        const TPDistance = parseFloat(
          parseFloat(value).toFixed(selectedAsset.accuracy)
        );
        setState((prevState) => ({
          ...prevState,
          takeProfitDistance: TPDistance,
          isPriceFocused: false,
        }));
        setErrorState(false);
        Toast.hide();
      }
    }
    recalculateTPDistance(value);
  };

  const spinnerOnStart = () => {
    let TPDistance = "";
    if (currentTrade.isBuy) {
      let TPRate =
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
        );
      // TP Distance = Math.abs(TP Rate - ASK Price)
      TPDistance = parseFloat(
        Math.abs(TPRate - parseFloat(realForexPrices[selectedAsset.id].ask))
      );
    } else {
      let TPRate =
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
        );
      // TP Distance = Math.abs(TP Rate  - BID Price)
      TPDistance = parseFloat(
        Math.abs(TPRate - parseFloat(realForexPrices[selectedAsset.id].bid))
      );
    }
    recalculateTPDistance(TPDistance);
  };

  useEffect(() => {
    if (!state.TPActive && isErrorActive) {
      setErrorState(false);
    }
  }, [state.TPActive]);

  return selectedAsset ? (
    <Spinner
      placeholder={t("common-labels.distance")}
      spinnerValue={state.takeProfitDistance}
      onSpinnerChange={(value) => onChange(value)}
      step={parseFloat(
        Math.pow(10, -selectedAsset.accuracy).toFixed(selectedAsset.accuracy)
      )}
      errorActive={isErrorActive}
      style={{
        backgroundColor:
          state.TPActive && !state.isPriceFocused
            ? colors.containerBackground
            : colors.white,
      }}
      // min={
      //   state.TPActive &&
      //   parseFloat(selectedAsset.distance).toFixed(selectedAsset.accuracy)
      // }
      accuracy={selectedAsset.accuracy}
    />
  ) : null;
};

export default TakeProfitDistance;
