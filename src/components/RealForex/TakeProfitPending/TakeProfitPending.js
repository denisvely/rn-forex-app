import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import Typography from "../../../components/Typography/Typography";
import TakeProfitDistance from "./TakeProfitDistance/TakeProfitDistance";
import TakeProfitAmount from "./TakeProfitAmount/TakeProfitAmount";

import styles from "./takeProfitStyles";

const TakeProfitPendingPending = ({ pendingState, setPendingState }) => {
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
              setPendingState((prevState) => ({
                ...prevState,
                pendingTPActive: false,
                pendingTPDistance: null,
                pendingTPAmount: null,
              }))
            }
          />
        </TouchableOpacity>
      </View>
      <TakeProfitAmount state={pendingState} setState={setPendingState} />
      <TakeProfitDistance state={pendingState} setState={setPendingState} />
    </View>
  );
};

export default TakeProfitPendingPending;
