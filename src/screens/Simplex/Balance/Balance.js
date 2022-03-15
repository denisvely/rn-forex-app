import React from "react";
import {View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "../../../components";
import {getSimplexBalance} from "../../../store/simplex";
import styles from "./balanceStyles";

const Balance = ({navigation}) => {
    const simplexBalance = useSelector((state) => getSimplexBalance(state));

    return (
        <View style={styles.container}>
            <View>
                <Typography name="tiny" text={"Balance"}></Typography>
                <Typography
                    name="largeBold"
                    text={simplexBalance.balance}
                    style={styles.balance}
                ></Typography>
            </View>
            <View>
                <Typography name="tiny" text={"Profit"}></Typography>
                <Typography
                    name="largeBold"
                    text={simplexBalance.profit}
                    style={styles.balance}
                ></Typography>
            </View>
            <View>
                <Typography name="tiny" text={"Margin"}></Typography>
                <Typography
                    name="largeBold"
                    text={simplexBalance.margin}
                    style={styles.balance}
                ></Typography>
            </View>
            <View>
                <Typography name="tiny" text={"Equity"}></Typography>
                <Typography
                    name="largeBold"
                    text={simplexBalance.equity}
                    style={styles.balance}
                ></Typography>
            </View>
            <View>
                <Typography name="tiny" text={"Available balance"}></Typography>
                <Typography
                    name="largeBold"
                    text={simplexBalance.availableBalance}
                    style={styles.balance}
                ></Typography>
            </View>
        </View>
    );
};

export default Balance;
