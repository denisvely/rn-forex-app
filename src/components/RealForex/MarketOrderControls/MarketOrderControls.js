import React from "react";
import { View } from "react-native";
import TakeProfit from "../TakeProfit/TakeProfit";
import StopLoss from "../StopLoss/StopLoss";
import { deviceWidth } from "../../../utils";

const MarketOrderControls = ({ marketState, setMarketState }) => {
  return (
    <View style={{ width: deviceWidth }}>
      <TakeProfit state={marketState} setState={setMarketState} />
      <StopLoss state={marketState} setState={setMarketState} />
    </View>
  );
};

export default MarketOrderControls;
