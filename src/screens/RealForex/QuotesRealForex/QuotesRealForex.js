import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "store/app";
import { getForexTradingSettings } from "store/realForex";
import { Typography, Button } from "components";
import { logout } from "store/app/actions";
import { colors } from "constants";

const Quotes = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => getUser(state));
  const QuotesTradingSettings = useSelector((state) =>
    getForexTradingSettings(state)
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.containerBackground,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography name="largeBold" text={"You are logged in"}></Typography>

      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginTop: 20,
        }}
      >
        <Typography name="normal" text={"User Details"}></Typography>
        <Typography name="normal" text={user?.email}></Typography>
        <Typography name="normal" text={user?.firstName}></Typography>
      </View>

      <Button
        style={{ marginTop: 60 }}
        text="Logout"
        type="primary"
        font="mediumBold"
        onPress={() => logout(dispatch)}
      />
    </View>
  );
};

export default Quotes;
