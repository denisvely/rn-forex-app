import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography } from "components";
import { colors } from "constants";

import styles from "./orderInfoStyles";

const OrderInfo = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View>
        <Typography
          style={styles.label}
          name="small"
          text={t("common-labels.margin")}
        />
        <Typography
          style={styles.label}
          name="small"
          text={t("common-labels.swap")}
        />
        <Typography
          style={styles.label}
          name="small"
          text={t("common-labels.point")}
        />
      </View>
      <View>
        <Typography style={styles.buy} name="small" text={"$ 1.60"} />
        <Typography style={styles.buy} name="small" text="$ 0.09" />
        <Typography style={styles.buy} name="small" text="$ 0.001" />
      </View>
      <View>
        <Typography style={styles.sell} name="small" text={"$ 0"} />
        <Typography style={styles.sell} name="small" text="$ 0.18" />
        <Typography style={styles.sell} name="small" text="$ 0.0001" />
      </View>
    </View>
  );
};

export default OrderInfo;
