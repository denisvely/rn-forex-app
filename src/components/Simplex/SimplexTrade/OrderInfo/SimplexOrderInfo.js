import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Typography } from "../../../../components";
import FormattedTypographyWithCurrency from "../../../FormatedCurrency/FormattedTypographyWithCurrency";

import styles from "./orderInfoStyles";

const showLeverageInfo = true;

const OrderInfo = ({ orderInfoData, setOrderInfoData, disabled }) => {
  const { t } = useTranslation();

  return orderInfoData ? (
    <View style={{ ...styles.container, opacity: disabled ? 0.5 : 1 }}>
      <View>
        <Typography
          style={styles.label}
          name="small"
          text={t("easyForex.commission")}
        />
        <Typography
          style={styles.label}
          name="small"
          text={t("easyForex.tradeValue")}
        />
        <Typography
          style={styles.label}
          name="small"
          text={t("easyForex.pointValue")}
        />
      </View>

      <View>
        <FormattedTypographyWithCurrency
          style={styles.sell}
          name="small"
          text={orderInfoData.commission}
        />
        <FormattedTypographyWithCurrency
          style={styles.sell}
          name="small"
          text={orderInfoData.tradeValue}
        />
        <FormattedTypographyWithCurrency
          style={styles.sell}
          name="small"
          text={orderInfoData.pointValue}
        />
      </View>
    </View>
  ) : null;
};

export default OrderInfo;
