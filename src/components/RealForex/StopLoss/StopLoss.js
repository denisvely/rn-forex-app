import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import Typography from "../../../components/Typography/Typography";
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
