import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { Spinner } from "components";
import {
  getSelectedAsset,
  getRealForexPrices,
  getCurrentTrade,
  getRealForexTradingSettings,
} from "store/realForex";
import { getSpread, convertUnits } from "store/realForex/helpers";

const TakeProfitDistance = ({ state, setState }) => {
  const { t } = useTranslation();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));

  const initTPDistance = () => {
    selectedAsset.minTPDistance = parseFloat(selectedAsset.distance).toFixed(
      selectedAsset.accuracy
    );
  };

  const onChange = (value) => {
    if (state.takeProfitDistance !== null) {
      setState((prevState) => ({
        ...prevState,
        takeProfitDistance: value,
        TPActive: true,
        step: parseFloat(
          Math.pow(10, -selectedAsset.accuracy).toFixed(selectedAsset.accuracy)
        ),
      }));
      // TODO => onSecondChange -  distance spinner - .change && .stop
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
      console.log(TPAmount);
      setState((prevState) => ({
        ...prevState,
        takeProfitDistance: TPDistance,
        takeProfitAmount: parseFloat(TPAmount),
        takeProfitPrice: parseFloat(TPRate),
        TPActive: true,
      }));
    }
  };

  const spinnerOnStart = (value) => {
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
    if (selectedAsset) {
      initTPDistance();
    }
  }, [selectedAsset]);

  return selectedAsset ? (
    <Spinner
      placeholder={t("common-labels.distance")}
      spinnerValue={state.takeProfitDistance}
      onSpinnerChange={(value) => onChange(value)}
      step={parseFloat(
        Math.pow(10, -selectedAsset.accuracy).toFixed(selectedAsset.accuracy)
      )}
      min={
        state.TPActive &&
        parseFloat(selectedAsset.distance).toFixed(selectedAsset.accuracy)
      }
      accuracy={selectedAsset.accuracy}
    />
  ) : null;
};

export default TakeProfitDistance;
