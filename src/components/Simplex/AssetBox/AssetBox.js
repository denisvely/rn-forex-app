import React from "react";
import {View, Pressable} from "react-native";
import {SvgXml} from "react-native-svg";
import {useSelector} from "react-redux";
import {getSimplexPrices} from "../../../store/simplex";
import Typography from "../../../components/Typography/Typography";
import BuyPriceSimplex from "../../../components/Simplex/BuyPrice/BuyPrice";
import styles from "./assetBoxStyles";
import {getApplication} from "../../../store/app";

const AssetBox = ({asset, navigation, icon}) => {
    const simplexPrices = useSelector((state) => getSimplexPrices(state));
    const app = useSelector((state) => getApplication(state));

    const calculateSpread = (askPrice, bidPrice, openPrice) => {
        return (
            (openPrice ? ((((parseFloat(askPrice) + parseFloat(bidPrice)) / 2 - parseFloat(openPrice)) / parseFloat(openPrice)) * 100).toFixed(2) : "0.00") + "%"
        );
    };

    const navigateChart = () => {
        navigation.navigate("RealForexOrderChart", {asset})
    }

    return (
        simplexPrices && (
            <View style={styles.assetBox}>
                <Pressable style={styles.assetBoxButton} onPress={navigateChart}>
                    <View style={styles.left}>
                        <SvgXml style={styles.assetIcon} xml={icon} width="40" height="40"/>
                        <View>
                            <Typography text={asset.name} style={styles.assetName}/>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <Typography style={{fontFamily: 'Gilroy-Regular', fontSize: 14, lineHeight: 16, color: '#777777'}} text={'Price'}/>
                        <BuyPriceSimplex asset={asset}/>
                        <Typography style={{fontFamily: 'Gilroy-Regular', fontSize: 14, lineHeight: 16, color: '#777777', marginTop: 8}} text={'Daily change'}/>
                        <Typography
                            name="small"
                            text={calculateSpread(simplexPrices[asset.id].ask, simplexPrices[asset.id].bid, app.dailyChanges ? app.dailyChanges[asset.id].OpenPrice: 0)}
                            style={styles.profit}
                        />
                    </View>
                </Pressable>
            </View>
        )
    );
};

export default AssetBox;
