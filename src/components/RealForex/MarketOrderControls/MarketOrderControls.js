import React from "react";
import {View} from "react-native";
import TakeProfit from "../TakeProfit/TakeProfit";
import StopLoss from "../StopLoss/StopLoss";
import OrderInfo from "../OrderInfo/OrderInfo";
import {deviceWidth} from "../../../utils";

const MarketOrderControls = () => {
    return (
        <View style={{width: deviceWidth}}>
            <TakeProfit/>
            <StopLoss/>
            <OrderInfo/>
        </View>
    );
};

export default MarketOrderControls;
