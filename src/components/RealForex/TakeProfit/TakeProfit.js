import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography } from "components";
import TakeProfitDistance from "./TakeProfitDistance/TakeProfitDistance";
import TakeProfitAmount from "./TakeProfitAmount/TakeProfitAmount";
import TakeProfitPrice from "./TakeProfitPrice/TakeProfitPrice";

import styles from "./takeProfitStyles";

const TakeProfit = () => {
  const { t } = useTranslation();
  const initialTPState = {
    TPActive: false,
    takeProfitDistance: null,
    takeProfitAmount: null,
    takeProfitPrice: null,
  };
  const [state, setState] = useState(initialTPState);

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
