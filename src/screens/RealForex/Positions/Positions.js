import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";

import { Typography } from "components";

const RealForex = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography name="largeBold" text={"Positions"}></Typography>
    </View>
  );
};

export default RealForex;
