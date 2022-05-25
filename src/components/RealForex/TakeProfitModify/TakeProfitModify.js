import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import TakeProfitRate from "./TakeProfitRate/TakeProfitRate";
import TakeProfitAmount from "./TakeProfitAmount/TakeProfitAmount";
import Typography from "../../Typography/Typography";

import styles from "./takeProfitStyles";

const TakeProfitModify = ({ state, setState }) => {
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
                takeProfitRate: null,
                takeProfitAmount: null,
              }))
            }
          />
        </TouchableOpacity>
      </View>
      <TakeProfitRate state={state} setState={setState} />
      <TakeProfitAmount state={state} setState={setState} />
    </View>
  );
};

export default TakeProfitModify;
