import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import Typography from "../../../components/Typography/Typography";
import StopLossAmount from "./StopLossAmount/StopLossAmount";
import StopLossDistance from "./StopLossDistance/StopLossDistance";
import styles from "./stopLossStyles";

const StopLossPending = ({ pendingState, setPendingState }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.inputsWrapper}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("common-labels.stopLoss")}
      />
      <StopLossAmount state={pendingState} setState={setPendingState} />
      <StopLossDistance state={pendingState} setState={setPendingState} />
    </View>
  );
};

export default StopLossPending;
