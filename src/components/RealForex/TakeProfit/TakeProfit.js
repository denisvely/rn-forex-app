import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

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
      <Typography
        style={styles.label}
        name="normal"
        text={t("common-labels.takeProfit")}
      />
      <TakeProfitAmount state={state} setState={setState} />
      <TakeProfitDistance state={state} setState={setState} />
      <TakeProfitPrice state={state} setState={setState} />
    </View>
  );
};

export default TakeProfit;
