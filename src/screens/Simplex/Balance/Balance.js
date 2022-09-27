import React, { useEffect } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import {
  Typography,
  FormattedTypographyWithCurrency,
  Loading,
} from "../../../components";
import { getSimplexBalance, getBalance } from "../../../store/simplex";

import styles from "./balanceStyles";

const Balance = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const simplexBalance = useSelector((state) => getSimplexBalance(state));
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getBalance(dispatch);
    }
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
