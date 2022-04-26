import React from "react";
import { View } from "react-native";
import TakeProfitModify from "../TakeProfitModify/TakeProfitModify";
import StopLossModify from "../StopLossModify/StopLossModify";
import { deviceWidth } from "../../../utils";

const ProfitLossOrderControls = ({ state, setState }) => {
  return (
    <View style={{ width: deviceWidth }}>
      <TakeProfitModify state={state} setState={setState} />
      <StopLossModify state={state} setState={setState} />
    </View>
  );
};

export default ProfitLossOrderControls;
