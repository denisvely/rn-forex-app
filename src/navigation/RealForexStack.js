import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import QuotesStack from "./RealForex/QuotesStack";
import ChartStack from "./RealForex/ChartStack";
import PositionsStack from "./RealForex/PositionsStack";
import BalanceStack from "./RealForex/BalanceStack";

import { CustomTabBar } from "components";

const TabsStack = createBottomTabNavigator();

const TabsStackNavigator = () => {
  return (
    <TabsStack.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName={"realForex"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <TabsStack.Screen name="quotes" component={QuotesStack} />
      <TabsStack.Screen name="chart" component={ChartStack} />
      <TabsStack.Screen name="positions" component={PositionsStack} />
      <TabsStack.Screen name="balance" component={BalanceStack} />
    </TabsStack.Navigator>
  );
};

export default TabsStackNavigator;
