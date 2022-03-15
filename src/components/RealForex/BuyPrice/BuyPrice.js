import React from "react";
import { View, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

import { getRealForexPrices } from "store/realForex";
import { Typography } from "components";
import { getFormattedAskPrice } from "store/realForex/helpers";

import styles from "./buyPriceStyles";

const BuyPrice = ({ asset, textColor }) => {
  const realForexPrices = useSelector((state) => getRealForexPrices(state));

  const askPrice =
    realForexPrices && getFormattedAskPrice(realForexPrices[asset.id]);

  return (
    <Typography name="normal" style={styles.buy}>
      <Typography
        name="normal"
        text={askPrice.askPriceMedium}
        style={{ ...styles.buy, color: textColor }} 
      />
      <Typography
        name="smallBold"
        text={askPrice.askPriceSmall}
        style={{ ...styles.buy, color: textColor }}
      />
      <Typography
        name="mediumBold"
        text={askPrice.askPriceBig}
        style={{ ...styles.buy, color: textColor }}
      />
    </Typography>
  );
};

export default BuyPrice;
