import React, { memo } from "react";
import {View, TouchableOpacity} from "react-native";
import {SvgXml} from "react-native-svg";
import {useSelector, useDispatch} from "react-redux";
import {getRealForexPrices} from "../../../store/realForex";
import Typography from "../../../components/Typography/Typography";
import BuyPrice from "../../../components/RealForex/BuyPrice/BuyPrice";
import SellPrice from "../../../components/RealForex/SellPrice/SellPrice";
import {setSelectedAsset} from "../../../store/realForex";
import {getApplication} from "../../../store/app";

import styles from "./assetBoxStyles";

const AssetBox = ({asset, navigation, icon}) => {
    const dispatch = useDispatch();
    const realForexPrices = useSelector((state) => getRealForexPrices(state));
    const app = useSelector((state) => getApplication(state));
    const calculateSpread = (askPrice, bidPrice, accuracy, openPrice, newOrderSpread) => {
        let stringifyAskPrice = askPrice.toString().split("."),
            stringifyBidPrice = bidPrice.toString().split("."),
            askPriceResult = stringifyAskPrice[0] + stringifyAskPrice[1],
            bidPriceResult = stringifyBidPrice[0] + stringifyBidPrice[1];

        if (!newOrderSpread) {
            return (
                (openPrice
                    ? (
                        (((parseFloat(askPrice) + parseFloat(bidPrice)) / 2 -
                                parseFloat(openPrice)) /
                            parseFloat(openPrice)) *
                        100
                    ).toFixed(2)
                    : "0.00") + "%"
            );
        } else {
            if (parseFloat(askPrice) < 1 && parseFloat(bidPrice) < 1) {
                return Math.round(
                    askPrice * Math.pow(10, accuracy) - bidPrice * Math.pow(10, accuracy)
                );
            } else {
                return (
                    parseFloat(askPriceResult - bidPriceResult) *
                    Math.pow(10, askPriceResult > 9999 ? 0 : accuracy)
                );
            }
        }
    };

    const pressAssetBoxButton = () => {
        setSelectedAsset(dispatch, asset);
        navigation.navigate("RealForexOrderChart", {asset});
    }

    return realForexPrices ? (
        <View style={styles.assetBox}>
            <TouchableOpacity style={styles.assetBoxButton} activeOpacity={0.5} onPress={pressAssetBoxButton}>
                <View style={styles.left}>
                    <SvgXml style={styles.assetIcon} xml={icon} width="40" height="40"/>
                    <View>
                        <Typography
                            name="medium"
                            text={asset.name}
                            style={styles.assetName}
                        />
                        <Typography
                            name="small"
                            text={calculateSpread(realForexPrices[asset.id].ask, realForexPrices[asset.id].bid, realForexPrices[asset.id].accuracy, app.dailyChanges ? app.dailyChanges[asset.id].OpenPrice : 0)}
                            style={styles.profit}
                        />
                    </View>
                </View>
                <View style={styles.right}>
                    <BuyPrice asset={asset}/>
                    <SellPrice asset={asset}/>
                </View>
            </TouchableOpacity>
        </View>
    ) : null;
};

export default memo(AssetBox);
