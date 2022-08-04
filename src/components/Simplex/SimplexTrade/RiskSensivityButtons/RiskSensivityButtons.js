import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "../../../../components";

import styles from "./riskSensivityStyles";

const MarketPendingButtons = ({ risk, setRisk, disabled }) => {
  const { t } = useTranslation();

  return (
    <View
      style={{ ...styles.riskSensivityWrapper, opacity: disabled ? 0.2 : 1 }}
    >
      <Typography text={t("easyForex.setRiskSensivity")} />
      <View
        style={{
          ...styles.orderTypeButtonsWrapper,
        }}
      >
        <Button
          disabled={disabled}
          type="text"
          text={t("easyForex.low")}
          size="tabButton"
          pressableStyle={
            risk === 0 ? styles.orderTypeButtonActive : styles.orderTypeButton
          }
          onPress={() => setRisk(0)}
        />
        <Button
          disabled={disabled}
          type="text"
          text={t("easyForex.medium")}
          size="tabButton"
          pressableStyle={
            risk === 1 ? styles.orderTypeButtonActive : styles.orderTypeButton
          }
          onPress={() => setRisk(1)}
        />
        <Button
          disabled={disabled}
          type="text"
          text={t("easyForex.high")}
          size="tabButton"
          pressableStyle={
            risk === 2 ? styles.orderTypeButtonActive : styles.orderTypeButton
          }
          onPress={() => setRisk(2)}
        />
      </View>
    </View>
  );
};

export default MarketPendingButtons;
