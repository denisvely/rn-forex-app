import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import Typography from "../../Typography/Typography";
import TakeProfitDistance from "./TakeProfitDistance/TakeProfitDistance";
import TakeProfitAmount from "./TakeProfitAmount/TakeProfitAmount";

import styles from "./takeProfitStyles";

const TakeProfit = ({ state, setState }) => {
  const { t } = useTranslation();

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
            text={t("common-labels.clearAll")}
            name="tiny"
            onPress={() =>
              setState((prevState) => ({
                ...prevState,
                TPActive: false,
                takeProfitDistance: null,
                takeProfitAmount: null,
              }))
            }
          />
        </TouchableOpacity>
      </View>
      <TakeProfitAmount state={state} setState={setState} />
      <TakeProfitDistance state={state} setState={setState} />
    </View>
  );
};

export default TakeProfit;
