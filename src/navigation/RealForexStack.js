import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import QuotesStack from "./RealForex/QuotesStack";
import ChartStack from "./RealForex/ChartStack";
import PositionsStack from "./RealForex/PositionsStack";
import InstrumentsStack from "./RealForex/InstrumentsStack";
import BalanceStack from "./RealForex/BalanceStack";

import { CustomTabBar } from "components";

const TabsStack = createBottomTabNavigator();

const TabsStackNavigator = ({ navigation }) => {
  return (
    <TabsStack.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="quotes"
      screenOptions={{
        animationEnabled: true,
        headerShown: true,
      }}
    >
      <TabsStack.Screen
        name="quotes"
        component={QuotesStack}
        options={{ headerShown: false }}
      />
      <TabsStack.Screen
        name="chart"
        component={ChartStack}
        options={{ headerShown: false }}
      />
      <TabsStack.Screen
        name="positions"
        component={PositionsStack}
        options={{ headerShown: false }}
      />
      <TabsStack.Screen
        name="instruments"
        component={InstrumentsStack}
        options={{ headerShown: false }}
      />
      <TabsStack.Screen
        name="balance"
        component={BalanceStack}
        options={{ headerShown: false }}
      />
    </TabsStack.Navigator>
  );
};

export default TabsStackNavigator;
