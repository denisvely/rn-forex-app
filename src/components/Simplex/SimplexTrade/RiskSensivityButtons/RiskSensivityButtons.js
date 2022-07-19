import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../components";

import styles from "./riskSensivityStyles";

const MarketPendingButtons = ({ risk, setRisk }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.orderTypeButtonsWrapper}>
      <Button
        type="text"
        text={t("easyForex.low")}
        size="tabButton"
        pressableStyle={
          risk === 1 ? styles.orderTypeButtonActive : styles.orderTypeButton
        }
        onPress={() => setRisk(1)}
      />
      <Button
        type="text"
        text={t("easyForex.medium")}
        size="tabButton"
        pressableStyle={
          !risk === 2 ? styles.orderTypeButtonActive : styles.orderTypeButton
        }
        onPress={() => setRisk(2)}
      />
      <Button
        type="text"
        text={t("easyForex.high")}
        size="tabButton"
        pressableStyle={
          !risk === 3 ? styles.orderTypeButtonActive : styles.orderTypeButton
        }
        onPress={() => setRisk(3)}
      />
    </View>
  );
};

export default MarketPendingButtons;
