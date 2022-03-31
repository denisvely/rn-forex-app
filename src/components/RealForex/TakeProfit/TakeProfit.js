import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import Typography from "../../Typography/Typography";
import TakeProfitDistance from "./TakeProfitDistance/TakeProfitDistance";
import TakeProfitAmount from "./TakeProfitAmount/TakeProfitAmount";
import TakeProfitPrice from "./TakeProfitPrice/TakeProfitPrice";
import {
  getSelectedAsset,
  getRealForexPrices,
  getCurrentTrade,
  getRealForexTradingSettings,
} from "../../../store/realForex";
import { convertUnits } from "../../../store/realForex/helpers";

import styles from "./takeProfitStyles";

const TakeProfit = () => {
  const { t } = useTranslation();
  const initialTPState = {
    TPActive: false,
    takeProfitDistance: null,
    takeProfitAmount: null,
    takeProfitPrice: null,
    isPriceFocused: false,
  };
  const [state, setState] = useState(initialTPState);
  const [isTradeButtonDisabled, setTradeButtonState] = useState(false);
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));

  const updateTPFields = () => {
    if (state.TPActive) {
      if (
        state.takeProfitPrice &&
        state.takeProfitDistance &&
        state.takeProfitAmount
      ) {
        if (state.isPriceFocused) {
          const TPRate = parseFloat(state.takeProfitPrice);

          // Disabled TRADE button if distance is below minimum distance
          if (
            parseFloat(state.takeProfitDistance) <
            parseFloat(selectedAsset.distance).toFixed(selectedAsset.accuracy)
          ) {
            setTradeButtonState(true);
          } else if (isTradeButtonDisabled) {
            setTradeButtonState(false);
          }
          if (currentTrade.isBuy) {
            // TP Distance = Math.abs(TP Rate - ASK Price)
            const TPDistance = Math.abs(
              TPRate - parseFloat(realForexPrices[selectedAsset.id].ask)
            ).toFixed(realForexPrices[selectedAsset.id].accuracy);
            const TPAmount = (
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
              takeProfitDistance: TPDistance,
              takeProfitAmount: TPAmount,
            }));
          } else {
            // TP Distance = Math.abs(TP Rate  - BID Price)
            const TPDistance = Math.abs(
              TPRate - parseFloat(realForexPrices[selectedAsset.id].bid)
            ).toFixed(realForexPrices[selectedAsset.id].accuracy);
            const TPAmount = (
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
              takeProfitDistance: TPDistance,
              takeProfitAmount: TPAmount,
            }));
          }
        } else {
          if (currentTrade.isBuy) {
            // TP Rate = ASK Price + Distance
            const TPRate = parseFloat(
              parseFloat(realForexPrices[selectedAsset.id].ask) +
                parseFloat(state.takeProfitDistance)
            ).toFixed(realForexPrices[selectedAsset.id].accuracy);
            setState((prevState) => ({
              ...prevState,
              takeProfitPrice: TPRate,
            }));
          } else {
            // TP Rate = BID Price – Distance
            const TPRate = parseFloat(
              parseFloat(realForexPrices[selectedAsset.id].bid) -
                parseFloat(state.takeProfitDistance)
            ).toFixed(realForexPrices[selectedAsset.id].accuracy);
            console.log(TPRate);
            setState((prevState) => ({
              ...prevState,
              takeProfitPrice: TPRate,
            }));
          }
        }
      }
    }
  };

  useEffect(() => {
    if (realForexPrices) {
      updateTPFields();
    }
  }, [realForexPrices]);

  return (
    <View style={styles.inputsWrapper}>
      <View style={styles.takeProfitHeader}>
        <Typography
          text={t("common-labels.takeProfit")}
          style={styles.takeProfitHeaderTitle}
          name="normal"
        />
        <TouchableOpacity>
          <Typography
            style={styles.takeProfitHeaderTitle}
            text={"Clear all"}
            name="tiny"
            onPress={() =>
              setState((prevState) => ({
                ...prevState,
                TPActive: false,
                takeProfitDistance: 0,
                takeProfitAmount: 0,
                takeProfitPrice: 0,
              }))
            }
          />
        </TouchableOpacity>
      </View>
      <TakeProfitAmount state={state} setState={setState} />
      <TakeProfitDistance state={state} setState={setState} />
      <TakeProfitPrice state={state} setState={setState} />
    </View>
  );
};

export default TakeProfit;
