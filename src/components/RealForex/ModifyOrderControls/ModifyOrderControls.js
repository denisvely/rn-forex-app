import React from "react";
import { View } from "react-native";
import TakeProfitModify from "../TakeProfitModify/TakeProfitModify";
import StopLossModify from "../StopLossModify/StopLossModify";
import { deviceWidth } from "../../../utils";

const MarketOrderControls = () => {
  return (
    <View style={{ width: deviceWidth }}>
      <TakeProfitModify />
      <StopLossModify />
    </View>
  );
};

export default MarketOrderControls;
