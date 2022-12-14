import React from "react";
import {useTranslation} from "react-i18next";
import {View} from "react-native";
import {useSelector} from "react-redux";
import Typography from "../../Typography/Typography";
import Button from "../../Button/Button";
import BuyPrice from "../BuyPrice/BuyPrice";
import SellPrice from "../SellPrice/SellPrice";
import {getRealForexPrices} from "../../../store/realForex";
import styles from "./realForexTradeButtonsStyles";
import {colors} from "../../../constants";

const RealForexTradeButtons = ({asset, buyOnPress, sellOnPress}) => {
    const {t} = useTranslation();
    const realForexPrices = useSelector((state) => getRealForexPrices(state));

    return realForexPrices ? (
        <View style={styles.buttonsWrapper}>
            <Button
                size="medium"
                type="buy"
                style={styles.button}
                onPress={buyOnPress}
            >
                {() => (
                    <View>
                        <Typography
                            style={styles.buttonName}
                            name="small"
                            text={t("common-labels.buy")}
                        />
                        <BuyPrice
                            asset={realForexPrices[asset.id]}
                            textColor={colors.white}
                        />
                    </View>
                )}
            </Button>
            <Button
                size="medium"
                type="sell"
                style={styles.button}
                onPress={sellOnPress}
            >
                {() => (
                    <View>
                        <Typography
                            style={styles.buttonName}
                            name="small"
                            text={t("common-labels.sell")}
                        />
                        <SellPrice
                            asset={realForexPrices[asset.id]}
                            textColor={colors.white}
                        />
                    </View>
                )}
            </Button>
        </View>
    ) : null;
};

export default RealForexTradeButtons;
