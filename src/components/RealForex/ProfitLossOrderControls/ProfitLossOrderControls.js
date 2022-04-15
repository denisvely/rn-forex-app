import React from "react";
import { View } from "react-native";
import TakeProfit from "../TakeProfit/TakeProfit";
import StopLoss from "../StopLoss/StopLoss";
import { deviceWidth } from "../../../utils";

const ProfitLossOrderControls = ({ state, setState }) => {
  return (
    <View style={{ width: deviceWidth }}>
      <TakeProfit state={state} setState={setState} />
      <StopLoss state={state} setState={setState} />
    </View>
  );
};

export default ProfitLossOrderControls;
