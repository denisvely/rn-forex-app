import React from "react";
import { View, TextInput } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography } from "components";
import { colors } from "constants";

import styles from "./quantityInputStyles";

const QuantityInput = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.inputsWrapper}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("common-labels.quantity")}
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChange}
        value={value}
        placeholder="32.9845"
        placeholderTextColor={colors.fontSecondaryColor}
        style={styles.quantityInput}
      />
    </View>
  );
};

export default QuantityInput;
