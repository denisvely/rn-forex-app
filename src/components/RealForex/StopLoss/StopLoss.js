import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import Typography from "../../../components/Typography/Typography";
import StopLossAmount from "./StopLossAmount/StopLossAmount";
import StopLossDistance from "./StopLossDistance/StopLossDistance";
import styles from "./stopLossStyles";

const StopLoss = ({ state, setState }) => {
  const { t } = useTranslation();

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
            text={t("common-labels.clearAll")}
            name="tiny"
            onPress={() =>
              setState((prevState) => ({
                ...prevState,
                SLActive: false,
                stopLossDistance: null,
                stopLossAmount: null,
              }))
            }
          />
        </TouchableOpacity>
      </View>
      <StopLossAmount state={state} setState={setState} />
      <StopLossDistance state={state} setState={setState} />
    </View>
  );
};

export default StopLoss;
