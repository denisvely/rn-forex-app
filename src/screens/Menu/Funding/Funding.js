import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Typography, Button } from "../../../components";

import styles from "./fundingStyles";

const Funding = ({ navigation }) => {
  const { t } = useTranslation();

  const submit = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fundingWrapper}>
        <Typography name="largeBold" text={t("menu.funding")} />
        <View style={styles.fundingInfo}>
          <Typography name="normal" text={t("menu.fundingInfo")} />
        </View>
      </View>
      <View style={styles.buttonsWrapper}>
        <Button
          text={t("common-labels.deposit")}
          type="primary"
          font="mediumBold"
          size="big"
          onPress={() =>
            submit("Deposit", {
              url: "https://www.trustpac.io/cashier",
            })
          }
        />
      </View>
    </View>
  );
};

export default Funding;
