import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import Typography from "../../../components/Typography/Typography";
import TakeProfitDistance from "./TakeProfitDistance/TakeProfitDistance";
import TakeProfitAmount from "./TakeProfitAmount/TakeProfitAmount";

import styles from "./takeProfitStyles";

const TakeProfitPendingPending = ({ pendingState, setPendingState }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.inputsWrapper}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("common-labels.takeProfit")}
      />
      <TakeProfitAmount state={pendingState} setState={setPendingState} />
      <TakeProfitDistance state={pendingState} setState={setPendingState} />
    </View>
  );
};

export default TakeProfitPendingPending;
