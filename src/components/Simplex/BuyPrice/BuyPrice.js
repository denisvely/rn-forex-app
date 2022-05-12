import React from "react";
import { useSelector } from "react-redux";
import { getSimplexPrices } from "../../../store/simplex";
import Typography from "../../../components/Typography/Typography";
import { getFormattedPrice } from "../../../store/simplex/helpers";
import styles from "./buyPriceStyles";
import { colors } from "../../../constants";

const BuyPrice = ({ asset, textColor = colors.white }) => {
  const simplexPrices = useSelector((state) => getSimplexPrices(state));
  const price =
    simplexPrices &&
    simplexPrices[asset.id] &&
    getFormattedPrice(simplexPrices[asset.id]);

  return (
    <Typography name="medium" style={styles.buy}>
      <Typography
        name="normal"
        text={price.priceMedium}
        style={{ ...styles.buy }}
      />
      <Typography
        name="mediumBold"
        text={price.priceBig}
        style={{ ...styles.buy, fontSize: 20, lineHeight: 24 }}
      />
    </Typography>
  );
};

export default BuyPrice;
