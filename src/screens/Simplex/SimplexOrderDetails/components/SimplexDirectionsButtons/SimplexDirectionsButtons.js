import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Typography } from "../../../../../components";
import { colors } from "../../../../../constants";

import styles from "./simplexDirectionsButtonsStyles";

const SimplexDirectionsButtons = ({
  tradeDirection,
  setDirection,
  disabled,
}) => {
  const { t } = useTranslation();
  return (
    <View
      style={{ ...styles.orderTypeButtonsWrapper, opacity: disabled ? 0.5 : 1 }}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          ...(tradeDirection === "up"
            ? styles.upButtonActive
            : styles.upButton),
        }}
        onPress={() => !disabled && setDirection("up")}
      >
        <Typography
          name="smallBold"
          text={t("common-labels.simplex-buy")}
          style={{
            ...styles.upLabel,
            color: tradeDirection === "up" ? colors.white : colors.buyColor,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={
          tradeDirection === "down"
            ? styles.downButtonActive
            : styles.downButton
        }
        onPress={() => !disabled && setDirection("down")}
      >
        <Typography
          name="smallBold"
          text={t("common-labels.simplex-sell")}
          style={{
            ...styles.downLabel,
            color: tradeDirection === "down" ? colors.white : colors.sellColor,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SimplexDirectionsButtons;
