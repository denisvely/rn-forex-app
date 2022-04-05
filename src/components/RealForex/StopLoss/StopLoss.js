import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Typography from "../../../components/Typography/Typography";
import StopLossAmount from "./StopLossAmount/StopLossAmount";
import StopLossDistance from "./StopLossDistance/StopLossDistance";
import StopLossPrice from "./StopLossPrice/StopLossPrice";
import styles from "./stopLossStyles";
import {
  getSelectedAsset,
  getRealForexPrices,
  getCurrentTrade,
  getRealForexTradingSettings,
} from "../../../store/realForex";
import { convertUnits, getSpreadValue } from "../../../store/realForex/helpers";

const StopLoss = () => {
  const { t } = useTranslation();
  const initialSLState = {
    SLActive: false,
    stopLossAmount: null,
    stopLossDistance: null,
    stopLossPrice: null,
    isPriceFocused: false,
  };
  const [state, setState] = useState(initialSLState);
  const [isTradeButtonDisabled, setTradeButtonState] = useState(false);
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));

  const updateSlFields = () => {
    if (state.SLActive) {
      if (
        state.stopLossPrice &&
        state.stopLossDistance &&
        state.stopLossAmount
      ) {
        if (state.isPriceFocused) {
          var SLRate = parseFloat(state.stopLossPrice);

          // Disabled TRADE button if distance is below minimum distance
          if (
            parseFloat(state.stopLossDistance) <
            (
              parseFloat(
                getSpreadValue(
                  realForexPrices[selectedAsset.id].ask,
                  realForexPrices[selectedAsset.id].bid,
                  realForexPrices[selectedAsset.id].accuracy
                ) * Math.pow(10, -realForexPrices[selectedAsset.id].accuracy)
              ) + parseFloat(selectedAsset.distance)
            ).toFixed(selectedAsset.accuracy)
          ) {
            setTradeButtonState(true);
          } else if (state.isTradeButtonDisabled) {
            setTradeButtonState(false);
          }

          if (currentTrade.isBuy) {
            // SL Distance = Math.abs(SL Rate  - ASK Price)
            const SLDistance = Math.abs(
              SLRate - parseFloat(realForexPrices[selectedAsset.id].ask)
            ).toFixed(realForexPrices[selectedAsset.id].accuracy);
            const SLAmount = (
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

            if (
              SLAmount !== state.stopLossAmount ||
              SLDistance !== state.stopLossDistance
            ) {
              setState((prevState) => ({
                ...prevState,
                stopLossDistance: SLDistance,
                stopLossAmount: SLAmount,
              }));
            }
          } else {
            // SL Distance = Math.abs(SL Rate - BID Price)
            const SLDistance = Math.abs(
              SLRate - parseFloat(realForexPrices[selectedAsset.id].bid)
            ).toFixed(realForexPrices[selectedAsset.id].accuracy);
            const SLAmount = (
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
            if (
              SLAmount !== state.stopLossAmount ||
              SLDistance !== state.stopLossDistance
            ) {
              setState((prevState) => ({
                ...prevState,
                stopLossDistance: SLDistance,
                stopLossAmount: SLAmount,
              }));
            }
          }
        } else {
          if (currentTrade.isBuy) {
            // SL Rate = BID Price - Distance
            const SLRate = parseFloat(
              parseFloat(realForexPrices[selectedAsset.id].bid) -
                parseFloat(state.stopLossDistance)
            ).toFixed(realForexPrices[selectedAsset.id].accuracy);

            if (SLRate !== state.stopLossPrice) {
              setState((prevState) => ({
                ...prevState,
                stopLossPrice: SLRate,
              }));
            }
          } else {
            // SL Rate = ASK Price + Distance
            const SLRate = parseFloat(
              parseFloat(realForexPrices[selectedAsset.id].ask) +
                parseFloat(state.stopLossDistance)
            ).toFixed(realForexPrices[selectedAsset.id].accuracy);

            if (SLRate !== state.stopLossPrice) {
              setState((prevState) => ({
                ...prevState,
                stopLossPrice: SLRate,
              }));
            }
          }
        }
      }
    }
  };

  if (realForexPrices && state.SLActive) {
    updateSlFields();
  }

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      SLActive: false,
      stopLossAmount: null,
      stopLossDistance: null,
      stopLossPrice: null,
      isPriceFocused: false,
    }));
  }, [realForexPrices]);

  return (
    <View style={styles.inputsWrapper}>
      <View style={styles.stopLossHeader}>
        <Typography
          text={t("common-labels.stopLoss")}
          style={styles.stopLossHeaderTitle}
          name="normal"
        />
        <TouchableOpacity>
          <Typography
            style={styles.stopLossHeaderTitle}
            text={"Clear all"}
            name="tiny"
            onPress={() =>
              setState((prevState) => ({
                ...prevState,
                SLActive: false,
                stopLossDistance: 0,
                stopLossAmount: 0,
                stopLossPrice: 0,
              }))
            }
          />
        </TouchableOpacity>
      </View>
      <StopLossAmount state={state} setState={setState} />
      <StopLossDistance state={state} setState={setState} />
      <StopLossPrice state={state} setState={setState} />
    </View>
  );
};

export default StopLoss;
