import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Typography } from "components";

import { getRealForexBalance } from "store/realForex";

import styles from "./balanceStyles";

const Balance = ({ navigation }) => {
  const realForexBalance = useSelector((state) => getRealForexBalance(state));

  return (
    <View style={styles.container}>
      <View>
        <Typography name="tiny" text={"Balance"}></Typography>
        <Typography
          name="largeBold"
          text={realForexBalance.balance}
          style={styles.balance}
        ></Typography>
      </View>
      <View>
        <Typography name="tiny" text={"Profit"}></Typography>
        <Typography
          name="largeBold"
          text={realForexBalance.profit}
          style={styles.balance}
        ></Typography>
      </View>
      <View>
        <Typography name="tiny" text={"Margin"}></Typography>
        <Typography
          name="largeBold"
          text={realForexBalance.margin}
          style={styles.balance}
        ></Typography>
      </View>
      <View>
        <Typography name="tiny" text={"Equity"}></Typography>
        <Typography
          name="largeBold"
          text={realForexBalance.equity}
          style={styles.balance}
        ></Typography>
      </View>
      <View>
        <Typography name="tiny" text={"Available balance"}></Typography>
        <Typography
          name="largeBold"
          text={realForexBalance.availableBalance}
          style={styles.balance}
        ></Typography>
      </View>
    </View>
  );
};

export default Balance;
