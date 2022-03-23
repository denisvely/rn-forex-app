import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { Typography } from "components";
import StopLossAmount from "./StopLossAmount/StopLossAmount";
import StopLossDistance from "./StopLossDistance/StopLossDistance";
import StopLossPrice from "./StopLossPrice/StopLossPrice";
import styles from "./stopLossStyles";
import { getSelectedAsset } from "../../../store/realForex";

const StopLoss = () => {
  const { t } = useTranslation();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const initialSLState = {
    SLActive: false,
    stopLossAmount: null,
    stopLossDistance: null,
    stopLossPrice: null,
  };
  const [state, setState] = useState(initialSLState);

  const initSL = () => {
    setState((prevState) => ({
      ...prevState,
      stopLossAmount: 1,
    }));
  };

  useEffect(() => {
    if (selectedAsset) {
      initSL();
    }
  }, [selectedAsset]);

  return (
    <View style={styles.inputsWrapper}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("common-labels.stopLoss")}
      />
      <StopLossAmount
        spinnerValue={state.stopLossAmount}
        onSpinnerChange={(value) => {
          setState((prevState) => ({
            ...prevState,
            stopLossAmount: value,
          }));
        }}
        placeholder={t("common-labels.amount")}
      />
      <StopLossDistance
        spinnerValue={state.stopLossDistance}
        onSpinnerChange={(value) => {
          setState((prevState) => ({
            ...prevState,
            stopLossDistance: value,
          }));
        }}
        placeholder={t("common-labels.distance")}
      />
      <StopLossPrice
        spinnerValue={state.stopLossPrice}
        onSpinnerChange={(value) => {
          setState((prevState) => ({
            ...prevState,
            stopLossPrice: value,
          }));
        }}
        placeholder={t("common-labels.price")}
      />
    </View>
  );
};

export default StopLoss;
