import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Button, Typography, BuyPrice, SellPrice } from "../..";
import { colors } from "constants";

import { getRealForexPrices } from "store/realForex";

import styles from "./realForexDirectionButtonsStyles";

const RealForexDirectionButtons = ({ isBuy, setDirection, asset }) => {
  const { t } = useTranslation();
  const realForexPrices = useSelector((state) => getRealForexPrices(state));

  return (
    <View style={styles.buttonsWrapper}>
      <Button
        size="medium"
        type="buy"
        style={isBuy ? styles.buyButtonActive : styles.buyButton}
        onPress={() => setDirection(true)}
      >
        {() => (
          <View>
            <Typography
              style={isBuy ? styles.buyButtonTextActive : styles.buyButtonText}
              name="small"
              text={t("common-labels.buy")}
            />
            <BuyPrice
              asset={realForexPrices[asset.id]}
              textColor={isBuy ? colors.white : colors.buyColor}
            />
          </View>
        )}
      </Button>
      <Button
        size="medium"
        type="sell"
        style={!isBuy ? styles.sellButtonActive : styles.sellButton}
        onPress={() => setDirection(false)}
      >
        {() => (
          <View>
            <Typography
              style={
                !isBuy ? styles.sellButtonTextActive : styles.sellButtonText
              }
              name="small"
              text={t("common-labels.sell")}
            />
            <SellPrice
              asset={realForexPrices[asset.id]}
              textColor={!isBuy ? colors.white : colors.sellColor}
            />
          </View>
        )}
      </Button>
    </View>
  );
};

export default RealForexDirectionButtons;
