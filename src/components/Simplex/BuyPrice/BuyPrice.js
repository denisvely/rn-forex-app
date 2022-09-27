import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSimplexPrices } from "../../../store/simplex";
import Typography from "../../../components/Typography/Typography";
import { getFormattedPrice } from "../../../store/simplex/helpers";
import styles from "./buyPriceStyles";
import { colors } from "../../../constants";

const BuyPrice = ({ asset, textColor = colors.white }) => {
  const [isUp, setIsUp] = useState(true);
  const [lastPrice, setLastPrice] = useState(null);
  const simplexPrices = useSelector((state) => getSimplexPrices(state));

  const price =
    simplexPrices &&
    simplexPrices[asset.id] &&
    getFormattedPrice(simplexPrices[asset.id]);

  const getPrice = (id) => {
    return Number(
      (parseFloat(simplexPrices[id].ask) + parseFloat(simplexPrices[id].bid)) /
        2
    ).toFixed(simplexPrices[id].accuracy);
  };

  const recalculateDirection = () => {
    if (!lastPrice) {
      setLastPrice(parseFloat(getPrice(asset.id)).toFixed(asset.accuracy));
      return;
    }

    let averagePrice = (
      (parseFloat(simplexPrices[asset.id].bid) +
        parseFloat(simplexPrices[asset.id].ask)) /
      2
    ).toFixed(asset.accuracy);


    if (parseFloat(lastPrice) == parseFloat(averagePrice)) {
      return;
    } else if (parseFloat(lastPrice) < parseFloat(averagePrice)) {
      setIsUp(true);
    } else {
      setIsUp(false);
    }

    setLastPrice(parseFloat(getPrice(asset.id)).toFixed(asset.accuracy));
  };

  useEffect(() => {
    if (!simplexPrices) {
      return;
    }
    recalculateDirection();
  }, [simplexPrices[asset.id]]);

  return (
    <>
      <Typography name="medium" style={isUp ? styles.buy : styles.sell}>
        <Typography
          name="normal"
          text={price.priceMedium}
          style={isUp ? styles.buy : styles.sell}
        />
        <Typography
          name="mediumBold"
          text={price.priceBig}
          style={isUp ? styles.buyBig : styles.sellBig}
        />
      </Typography>
    </>
  );
};

export default BuyPrice;
