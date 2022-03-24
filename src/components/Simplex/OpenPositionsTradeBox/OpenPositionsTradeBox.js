import React, {useState} from "react";
import {View, TouchableOpacity, Alert} from "react-native";
import {useTranslation} from "react-i18next";
import {SvgXml} from "react-native-svg";
import moment from "moment";
import {useSelector} from "react-redux";
import {formatDeciamlWithComma} from "../../../store/realForex/helpers";
import collapseDots from "../../../assets/svg/realForex/collapseDots";
import {Typography, FormattedTypographyWithCurrency} from "../../../components";
import {getSimplexPrices} from "../../../store/simplex";

import styles from "./openPositionsTradeBoxStyles";
import {colors} from "../../../constants";

const OpenPositionsSimplexTradeBox = ({item, toggleBottomSlidingPanel, setCurrentTrade, navigation,  cancelPosition}) => {
    const {t} = useTranslation();
    const simplexPrices = useSelector((state) => getSimplexPrices(state));
    const [isContentVisible, setContentVisible] = useState(false);

    if (item.optionType !== "Forex") {
        return null;
    }

    let result = 0;
    let profit = 0;

    if (typeof simplexPrices != "undefined" && simplexPrices != null && simplexPrices[item.tradableAssetId] != undefined) {
        let price = ((parseFloat(simplexPrices[item.tradableAssetId].ask) + parseFloat(simplexPrices[item.tradableAssetId].bid)) / 2).toFixed(simplexPrices[item.tradableAssetId].accuracy);
        result = parseFloat(parseFloat(item.volume) + (item.actionType == "Buy" ? ((parseFloat(price) - parseFloat(item.rate)) * (parseFloat(item.volumeWithLeverage)/parseFloat(item.rate))) : ((parseFloat(item.rate) - parseFloat(price)) * (parseFloat(item.volumeWithLeverage)/parseFloat(item.rate))))).toFixed(2);
        profit = parseFloat(item.actionType == "Buy" ? ((parseFloat(price) - parseFloat(item.rate)) * (parseFloat(item.volumeWithLeverage)/parseFloat(item.rate))) : ((parseFloat(item.rate) - parseFloat(price)) * (parseFloat(item.volumeWithLeverage)/parseFloat(item.rate)))).toFixed(2);
    }

    return (
        <View style={styles.tradeBox}>
            <TouchableOpacity
                style={styles.tradeBoxButton}
                onPress={() => setContentVisible(!isContentVisible)}
            >
                <View style={styles.left}>
                    <View style={styles.leftInner}>
                        <Typography
                            name="tiny"
                            text={t(`common-labels.simplex-${item.actionType}`)}
                            style={item.actionType === "Buy" ? styles.green : styles.red}
                        />
                        <View style={styles.quantityWrapper}>
                            <Typography
                                name="small"
                                style={styles.assetName}
                                text={item.description}
                            />
                        </View>
                    </View>
                    <View style={styles.leftInner}>
                        <Typography
                            name="tiny"
                            text="Inv. Amount"
                        />
                        <View style={styles.quantityWrapper}>
                            <FormattedTypographyWithCurrency
                                name="tiny"
                                text={formatDeciamlWithComma(parseFloat(item.volume))}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.right}>
                    <FormattedTypographyWithCurrency
                        name="small"
                        style={{
                            ...styles.textRight,
                            color:
                                parseFloat(profit) < 0 ? colors.sellColor : colors.buyColor,
                        }}
                        text={profit}
                    />
                    <SvgXml
                        style={styles.assetIcon}
                        xml={collapseDots}
                        width="32"
                        height="32"
                    />
                </View>
            </TouchableOpacity>
            {isContentVisible ? (
                <View style={styles.tradeInfo}>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.takeProfit`)}
                        />
                        <FormattedTypographyWithCurrency
                            name="small"
                            style={styles.tradeInfoValue}
                            text={formatDeciamlWithComma(parseFloat(item.takeProfitAmount))}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.stopLoss`)}
                        />
                        <FormattedTypographyWithCurrency
                            name="small"
                            style={styles.tradeInfoValue}
                            text={formatDeciamlWithComma(parseFloat(item.stopLossAmount))}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text="Order Date"
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={moment(item.orderDate.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text="Expiry Date"
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={item.expirationDate ? moment(item.expirationDate.timestamp).format("YYYY-MM-DD HH:mm:ss") : 'GTC'}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.id`)}
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={item.orderID}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text="Market Price"
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={ typeof simplexPrices != "undefined" && simplexPrices != null && typeof simplexPrices[item.tradableAssetId] != "undefined" ? ((parseFloat(simplexPrices[item.tradableAssetId].ask) + parseFloat(simplexPrices[item.tradableAssetId].bid)) / 2).toFixed(simplexPrices[item.tradableAssetId].accuracy) : "-" }
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.openPrice`)}
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={item.rate}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text="Return"
                        />
                        <FormattedTypographyWithCurrency
                            name="small"
                            style={styles.tradeInfoValue}
                            text={result}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.swap`)}
                        />
                        <FormattedTypographyWithCurrency
                            name="small"
                            style={styles.tradeInfoValue}
                            text={item.swap ? parseFloat(item.swap).toFixed(2) : "-"}
                        />
                    </View>
                    <View style={styles.tradeButtons}>
                        <TouchableOpacity
                            style={styles.tradeButton}
                            onPress={() =>
                                navigation.navigate("RealForexOrderDetails", {
                                    asset: item,
                                    isBuy: item.actionType === "Buy" ? true : false,
                                    isPending: false,
                                    isModify: true,
                                })
                            }
                        >
                            <Typography
                                name="tinyBold"
                                style={styles.tradeButtonText}
                                text={t(`common-labels.modifyPosition`)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tradeButton}>
                            <Typography
                                name="tinyBold"
                                style={styles.tradeButtonText}
                                text={t(`common-labels.closePosition`)}
                                onPress={() => {
                                    Alert.alert(
                                        "Close position",
                                        `Are you sure you want to close this position for ${item.description}?`,
                                        [
                                            {
                                                text: t(`common-labels.no`),
                                                style: 'cancel',
                                            },
                                            {text: t(`common-labels.yes`), onPress: () => cancelPosition(item.orderID)},
                                        ],
                                        {cancelable: false}
                                    );
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : null}
        </View>
    );
};

export default OpenPositionsSimplexTradeBox;
