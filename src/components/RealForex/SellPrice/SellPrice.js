import React from "react";
import {useSelector} from "react-redux";
import {getRealForexPrices} from "../../../store/realForex";
import Typography from "../../../components/Typography/Typography";
import {getFormattedBidPrice} from "../../../store/realForex/helpers";
import styles from "./sellPriceStyles";

const SellPrice = ({asset, textColor}) => {
    const realForexPrices = useSelector((state) => getRealForexPrices(state));
    const bidPrice =
        realForexPrices && getFormattedBidPrice(realForexPrices[asset.id]);

    return (
        <Typography name="normal" style={styles.sell}>
            <Typography
                name="normal"
                text={bidPrice.bidPriceMedium}
                style={{...styles.sell, color: textColor}}
            />
            <Typography
                name="smallBold"
                text={bidPrice.bidPriceSmall}
                style={{...styles.sell, color: textColor}}
            />
            <Typography
                name="mediumBold"
                text={bidPrice.bidPriceBig}
                style={{...styles.sell, color: textColor}}
            />
        </Typography>
    );
};

export default SellPrice;
