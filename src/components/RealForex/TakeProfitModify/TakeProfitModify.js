import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import Typography from "../../../components/Typography/Typography";
import TakeProfitDistance from "./TakeProfitDistance/TakeProfitDistance";
import TakeProfitAmount from "./TakeProfitAmount/TakeProfitAmount";

import styles from "./takeProfitStyles";

const TakeProfitPendingModify = ({
  takeProfitPendingAmount,
  onChangeTakeProfitPendingAmount,
  takeProfitPendingDistance,
  onChangeTakeProfitPendingDistance,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.inputsWrapper}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("common-labels.takeProfit")}
      />
      <TakeProfitAmount
        spinnerValue={takeProfitPendingAmount}
        onSpinnerChange={(orderType) =>
          onChangeTakeProfitPendingAmount(orderType)
        }
        placeholder={t("common-labels.amount")}
      />
      <TakeProfitDistance
        spinnerValue={takeProfitPendingDistance}
        onSpinnerChange={(orderType) =>
          onChangeTakeProfitPendingDistance(orderType)
        }
        placeholder={t("common-labels.distance")}
      />
    </View>
  );
};

export default TakeProfitPendingModify;
