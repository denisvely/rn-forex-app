import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useSelector, useDispatch } from "react-redux";

import {
  Typography,
  FormattedTypographyWithCurrency,
  Loading,
} from "../../../components";
import { getSimplexBalance, getBalance } from "../../../store/simplex";
import { colors } from "constants";

import styles from "./balanceStyles";

const Balance = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const simplexBalance = useSelector((state) => getSimplexBalance(state));

  useEffect(() => {
    getBalance(dispatch);
  }, []);

  return (
    <View style={styles.container}>
      {simplexBalance ? (
        <>
          <View style={styles.balanceContainer}>
            <View style={{ marginRight: 16 }}>
              <Typography
                name="tiny"
                text={t(`common-labels.balance`)}
                style={styles.balanceLabel}
              ></Typography>
              <FormattedTypographyWithCurrency
                name="largeBold"
                text={simplexBalance.balance}
                numberWithCommas={false}
                style={styles.balanceBig}
              />
            </View>
          </View>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Loading size="large" />
        </View>
      )}
    </View>
  );
};

export default Balance;
