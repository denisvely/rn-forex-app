import React, { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Typography from "../../../../Typography/Typography";
import Spinner from "../../../../Spinner/Spinner";
import { getSelectedAsset } from "store/realForex";

import styles from "./pendingDirectionAndRateStyles";

const PendingDirectionAndRate = ({
  isBuy,
  changeDirection,
  rateValue,
  onRateValueChange,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const min = parseFloat(Math.pow(10, -selectedAsset.accuracy)).toFixed(
    selectedAsset.accuracy
  );

  const onChange = (value) => {
    if (value) {
      onRateValueChange(value.toFixed(selectedAsset.accuracy));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.directionButtonsWrapper}>
        <Pressable
          onPress={() => changeDirection(false)}
          style={styles.directionButton}
        >
          <View style={styles.btnContainer}>
            {!isBuy ? (
              <View style={styles.checkboxActiveView}>
                <View style={styles.whiteDot} />
              </View>
            ) : (
              <View style={styles.checkboxView}>
                <View style={styles.whiteDot} />
              </View>
            )}
            <Typography
              name="normal"
              text={t("common-labels.sell")}
              style={!isBuy ? styles.btnTextActive : styles.btnText}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={() => changeDirection(true)}
          style={styles.directionButton}
        >
          <View style={styles.btnContainer}>
            {isBuy ? (
              <View style={styles.checkboxActiveView}>
                <View style={styles.whiteDot} />
              </View>
            ) : (
              <View style={styles.checkboxView}>
                <View style={styles.whiteDot} />
              </View>
            )}
            <Typography
              name="normal"
              text={t("common-labels.buy")}
              style={isBuy ? styles.btnTextActive : styles.btnText}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.spinnerWrapper}>
        <Spinner
          spinnerValue={rateValue}
          onSpinnerChange={(value) => onChange(value)}
          step={parseFloat(Math.pow(10, -selectedAsset.accuracy)).toFixed(
            selectedAsset.accuracy
          )}
          accuracy={selectedAsset.accuracy}
        />
      </View>
    </View>
  );
};

export default PendingDirectionAndRate;
