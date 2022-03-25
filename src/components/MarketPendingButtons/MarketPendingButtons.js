import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";

import styles from "./marketPendingButtonsStyles";

const MarketPendingButtons = ({ isMarket, setOrderType }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.orderTypeButtonsWrapper}>
      <Button
        type="text"
        text={t("common-labels.market")}
        size="tabButton"
        pressableStyle={
          isMarket ? styles.orderTypeButtonActive : styles.orderTypeButton
        }
        onPress={() => setOrderType(true)}
      />
      <Button
        type="text"
        text={t("common-labels.pending")}
        size="tabButton"
        pressableStyle={
          !isMarket ? styles.orderTypeButtonActive : styles.orderTypeButton
        }
        onPress={() => setOrderType(false)}
      />
    </View>
  );
};

export default MarketPendingButtons;
