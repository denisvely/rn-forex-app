import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "../../../../components";

import styles from "./marketPendingButtonsStyles";

const MarketPendingButtons = ({
  isMarket,
  setOrderType,
  isModify,
  isPending,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {!isModify ? (
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
      ) : (
        <View style={styles.labelWrapper}>
          <Typography
            name="normal"
            text={isPending ? "Modify Order" : "Modify Position"}
          />
        </View>
      )}
    </>
  );
};

export default MarketPendingButtons;
