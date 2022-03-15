import React from "react";
import {useSelector} from "react-redux";
import {getSimplexPrices} from "../../../store/simplex";
import {Typography} from "../../../components";
import styles from "./buyPriceStyles";

const BuyPrice = ({asset, textColor}) => {
    const simplexPrices = useSelector((state) => getSimplexPrices(state));
    const askPrice = ((parseFloat(simplexPrices[asset.id].ask) + parseFloat(simplexPrices[asset.id].bid))/2).toFixed(asset.accuracy);

    return (
        <Typography name="normal" style={styles.buy}>
            <Typography
                name="normal"
                text={askPrice}
                style={{...styles.buy, color: textColor}}
            />
            {/*<Typography*/}
            {/*    name="normal"*/}
            {/*    text={askPrice.priceMedium}*/}
            {/*    style={{...styles.buy, color: textColor}}*/}
            {/*/>*/}
            {/*<Typography*/}
            {/*    name="smallBold"*/}
            {/*    text={askPrice.priceSmall}*/}
            {/*    style={{...styles.buy, color: textColor}}*/}
            {/*/>*/}
            {/*<Typography*/}
            {/*    name="mediumBold"*/}
            {/*    text={askPrice.priceBig}*/}
            {/*    style={{...styles.buy, color: textColor}}*/}
            {/*/>*/}
        </Typography>
    );
};

export default BuyPrice;
