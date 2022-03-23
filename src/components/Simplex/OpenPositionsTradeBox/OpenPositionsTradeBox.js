import React, {useState} from "react";
import {View, TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";
import {SvgXml} from "react-native-svg";
import moment from "moment";
import {useSelector} from "react-redux";

import {formatDeciamlWithComma} from "../../../store/realForex/helpers";
import collapseDots from "../../../assets/svg/realForex/collapseDots";
import {Typography, FormattedTypographyWithCurrency} from "components";
import {getSimplexPrices} from "../../../store/simplex";

import styles from "./openPositionsTradeBoxStyles";
import {colors} from "../../../constants";

const OpenPositionsSimplexTradeBox = ({
                                          item,
                                          toggleBottomSlidingPanel,
                                          setCurrentTrade,
                                          navigation,
                                      }) => {
    const {t} = useTranslation();
    const simplexPrices = useSelector((state) => getSimplexPrices(state));
    const [isContentVisible, setContentVisible] = useState(false);

    if (item.optionType !== "Forex") {
        return null;
    }

    let result = 0;

    if (typeof simplexPrices != "undefined" && simplexPrices != null && simplexPrices[item.tradableAssetId] != undefined) {
        result = parseFloat(
            (item.actionType === "Sell" ? (item.rate - simplexPrices[item.tradableAssetId].ask) : (simplexPrices[item.tradableAssetId].bid - item.rate)) *
            item.volume *
            (1 / item.exchangeRate)
        ).toFixed(2);
    }

    return (
        <View style={styles.tradeBox}>
            <TouchableOpacity
                style={styles.tradeBoxButton}
                onPress={() => setContentVisible(!isContentVisible)}
            >
                <View style={styles.left}>
                    <Typography
                        name="small"
                        style={styles.assetName}
                        text={item.description}
                    />
                    <View style={styles.leftInner}>
                        <Typography
                            name="tiny"
                            text={t(`common-labels.${item.actionType}`)}
                            style={item.actionType === "Buy" ? styles.green : styles.red}
                        />
                        <View style={styles.quantityWrapper}>
                            <Typography
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
                                parseFloat(result) < 0 ? colors.sellColor : colors.buyColor,
                        }}
                        text={result}
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
                        {parseFloat(item.takeProfitRate) == 0 ? (
                            <TouchableOpacity
                                onPress={() => {
                                    setCurrentTrade(item);
                                    toggleBottomSlidingPanel("tpAndSl");
                                }}
                            >
                                <Typography
                                    name="small"
                                    style={styles.tradeInfoValueClickable}
                                    text={t(`common-labels.addTakeProfit`)}
                                />
                            </TouchableOpacity>
                        ) : (
                            <Typography
                                name="small"
                                style={styles.tradeInfoValue}
                                text={item.takeProfitRate}
                            />
                        )}
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.stopLoss`)}
                        />
                        {parseFloat(item.stopLossRate) == 0 ? (
                            <TouchableOpacity
                                onPress={() => {
                                    setCurrentTrade(item);
                                    toggleBottomSlidingPanel("tpAndSl");
                                }}
                            >
                                <Typography
                                    name="small"
                                    style={styles.tradeInfoValueClickable}
                                    text={t(`common-labels.addStopLoss`)}
                                />
                            </TouchableOpacity>
                        ) : (
                            <Typography
                                name="small"
                                style={styles.tradeInfoValue}
                                text={item.stopLossRate}
                            />
                        )}
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.#`)}
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={moment(item.orderDate.timestamp).format(
                                "YYYY-MM-DD HH:MM:ss"
                            )}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.id`)}
                        />
                        <TouchableOpacity onPress={() => alert("open Position history")}>
                            <Typography
                                name="small"
                                style={styles.tradeInfoValueClickable}
                                text={`POS${item.orderID}`}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.@`)}
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={
                                typeof simplexPrices != "undefined" &&
                                simplexPrices != null &&
                                typeof simplexPrices[item.tradableAssetId] != "undefined"
                                    ? item.actionType == "Sell"
                                        ? simplexPrices[item.tradableAssetId].ask
                                        : simplexPrices[item.tradableAssetId].bid
                                    : "-"
                            }
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
                            text={t(`common-labels.avgPrice`)}
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
                            text={t(`common-labels.swap`)}
                        />
                        <FormattedTypographyWithCurrency
                            name="small"
                            style={parseFloat(item.swap) < 0 ? styles.red : styles.green}
                            text={item.swap ? parseFloat(item.swap).toFixed(2) : "-"}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.margin`)}
                        />
                        <FormattedTypographyWithCurrency
                            name="small"
                            style={styles.tradeInfoValue}
                            text={item.margin}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.commission`)}
                        />
                        <FormattedTypographyWithCurrency
                            name="small"
                            style={styles.tradeInfoValue}
                            text={
                                item.cfdCommission != null
                                    ? parseFloat(item.cfdCommission).toFixed(2)
                                    : "-"
                            }
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
                                    setCurrentTrade(item);
                                    toggleBottomSlidingPanel("closePosition");
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
