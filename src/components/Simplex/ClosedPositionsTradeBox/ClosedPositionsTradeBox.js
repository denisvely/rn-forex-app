import React, {useState} from "react";
import {View, TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";
import {SvgXml} from "react-native-svg";
import moment from "moment";

import collapseDots from "../../../assets/svg/realForex/collapseDots";
import {Typography, FormattedTypographyWithCurrency} from "components";

import styles from "./closedPositionsTradeBoxStyles";

const ClosedPositionsSimplexTradeBox = ({item, navigation}) => {
    const {t} = useTranslation();
    const [isContentVisible, setContentVisible] = useState(false);

    if (!item || typeof item != "object") {
        return;
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
                            <Typography name="tiny"
                                        text={`${item.currencySymbol} ${parseFloat(item.volume).toFixed(2)}`}/>
                        </View>
                    </View>
                </View>
                <View style={styles.right}>
                    <Typography
                        name="small"
                        style={parseFloat(item.profit) < 0 ? styles.red : styles.green}
                        text={`${item.currencySymbol} ${item.profit.toFixed(2)}`}
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
                            text="Take Profit"
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={`${item.currencySymbol} ${item.takeProfitAmount}`}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text="Stop Loss"
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={`${item.currencySymbol} ${item.stopLossAmount}`}
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
                            text="Close Date"
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={moment(item.closeDate.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.expire`)}
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={
                                item.expirationDate
                                    ? moment(item.expirationDate.timestamp).format("YYYY-MM-DD HH:mm:ss")
                                    : "GTC"
                            }
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
                            text={item.orderId}
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
                            text="Close Price"
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={item.closeRate == 0 ? '-' : item.closeRate}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text="Return"
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={item.profit ? `${item.currencySymbol} ${parseFloat(item.profit + parseFloat(item.volume)).toFixed(2)}` : "-"}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text="Swap"
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={item.swap ? `${item.currencySymbol} ${item.swap}` : "-"}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.commission`)}
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={item.commission ? `${item.currencySymbol} ${parseFloat(item.commission).toFixed(2)}` : "-"}
                        />
                    </View>
                    <View style={styles.tradeInfoRow}>
                        <Typography
                            name="small"
                            style={styles.tradeInfoKey}
                            text={t(`common-labels.comment`)}
                        />
                        <Typography
                            name="small"
                            style={styles.tradeInfoValue}
                            text={item.closedReason}
                        />
                    </View>
                </View>
            ) : null}
        </View>
    );
};

export default ClosedPositionsSimplexTradeBox;
