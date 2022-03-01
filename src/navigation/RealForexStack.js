import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import QuotesStack from "./RealForex/QuotesStack";
import ChartStack from "./RealForex/ChartStack";
import PositionsStack from "./RealForex/PositionsStack";
import InstrumentsStack from "./RealForex/InstrumentsStack";
import BalanceStack from "./RealForex/BalanceStack";

import { CustomTabBar } from "../components";

const RealForexStack = createBottomTabNavigator();

const RealForexStackNavigator = ({ navigation }) => {
  return (
    <RealForexStack.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="quotes"
      screenOptions={{
        animationEnabled: true,
        headerShown: true,
      }}
    >
      <RealForexStack.Screen
        name="quotes"
        component={QuotesStack}
        options={{ headerShown: false }}
      />
      <RealForexStack.Screen
        name="chart"
        component={ChartStack}
        options={{ headerShown: false }}
      />
      <RealForexStack.Screen
        name="positions"
        component={PositionsStack}
        options={{ headerShown: false }}
      />
      <RealForexStack.Screen
        name="instruments"
        component={InstrumentsStack}
        options={{ headerShown: false }}
      />
      <RealForexStack.Screen
        name="balance"
        component={BalanceStack}
        options={{ headerShown: false }}
      />
    </RealForexStack.Navigator>
  );
};

export default RealForexStackNavigator;
