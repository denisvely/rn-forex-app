import React, { useEffect } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useSelector, useDispatch } from "react-redux";

import {
  Typography,
  FormattedTypographyWithCurrency,
} from "../../../components";
import { getRealForexBalance, getBalance } from "../../../store/realForex";
import { colors } from "constants";

import styles from "./balanceStyles";

const Balance = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const realForexBalance = useSelector((state) => getRealForexBalance(state));

  useEffect(() => {
    getBalance(dispatch);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <View style={{ marginRight: 16 }}>
          <Typography
            name="tiny"
            text={t(`common-labels.balance`)}
            style={styles.balanceLabel}
          ></Typography>
          <FormattedTypographyWithCurrency
            name="largeBold"
            text={realForexBalance.balance}
            numberWithCommas={false}
            style={styles.balanceBig}
          />
        </View>
        <View>
          <Typography
            name="tiny"
            text={t(`common-labels.profit`)}
            style={styles.balanceLabel}
          ></Typography>
          <FormattedTypographyWithCurrency
            name="smallBold"
            text={realForexBalance.profit}
            style={{
              ...styles.profit,
              color:
                realForexBalance.profit > 0
                  ? colors.buyColor
                  : colors.sellColor,
            }}
          />
        </View>
      </View>
      <View style={styles.marginContainer}>
        <View style={styles.marginInfoWrapper}>
          <View style={styles.circleProgress}>
            <AnimatedCircularProgress
              size={40}
              width={8}
              fill={parseInt(realForexBalance.marginPercent)}
              rotation={360}
              tintColor={colors.blueColor}
              tintColorSecondary={colors.blueColor}
              backgroundColor="rgba(124, 124, 125, 0.3)"
            >
              {(fill) => (
                <View style={styles.circleChilds}>
                  <Typography
                    name="nanoBold"
                    color={null}
                    text={`${parseInt(realForexBalance.marginPercent)}%`}
                    style={styles.circleStats}
                  />
                </View>
              )}
            </AnimatedCircularProgress>
          </View>
          <View style={styles.marginInfo}>
            <Typography
              name="tiny"
              style={styles.balanceLabel}
              text={t(`common-labels.margin`)}
            />
            <FormattedTypographyWithCurrency
              name="tinyBold"
              text={realForexBalance.forexMargin}
              style={styles.balanceValue}
            />
          </View>
        </View>
        <View style={styles.equityWrapper}>
          <Typography
            name="tiny"
            style={styles.balanceLabel}
            text={t(`common-labels.equity`)}
          ></Typography>
          <FormattedTypographyWithCurrency
            name="tinyBold"
            text={realForexBalance.equity}
            style={styles.balanceValue}
          />
        </View>
        <View style={styles.equityWrapper}>
          <Typography
            name="tiny"
            style={styles.balanceLabel}
            text={t(`common-labels.availableBalance`)}
          ></Typography>
          <FormattedTypographyWithCurrency
            name="tinyBold"
            text={realForexBalance.availableBalance}
            style={styles.balanceValue}
          />
        </View>
      </View>
    </View>
  );
};

export default Balance;
