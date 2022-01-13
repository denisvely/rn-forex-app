import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography } from "components";
import styles from "./noInternetConnectionStyles";

const NoInternetConnection = ({}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.overlay}>
      <View style={styles.overlayContent}>
        <Typography
          style={styles.overlayText}
          name="medium"
          text={t("no-internet-connection")}
        ></Typography>
      </View>
    </View>
  );
};

export default NoInternetConnection;
