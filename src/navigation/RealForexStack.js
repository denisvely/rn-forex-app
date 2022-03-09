import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";

import QuotesRealForexStack from "./RealForex/QuotesRealForexStack";
import OpenPositionsRealForexStack from "./RealForex/OpenPositionsRealForexStack";
import PendingOrdersRealForexStack from "./RealForex/PendingOrdersRealForexStack";
import ClosedPositionsRealForexStack from "./RealForex/ClosedPositionsRealForexStack";
import BalanceStack from "./RealForex/BalanceStack";

import { CustomTabBar } from "../components";
import { loadInitialRealForexData } from "store/realForex";
import { signalRStop } from "../store/realForex/signalRActions";

const RealForexStack = createBottomTabNavigator();

const RealForexStackNavigator = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadInitialRealForexData(dispatch);
    return () => {
      signalRStop();
    };
  }, []);

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
        component={QuotesRealForexStack}
        options={{ headerShown: false }}
      />
      <RealForexStack.Screen
        name="openPositions"
        component={OpenPositionsRealForexStack}
        options={{ headerShown: false }}
      />
      <RealForexStack.Screen
        name="pendingOrders"
        component={PendingOrdersRealForexStack}
        options={{ headerShown: false }}
      />
      <RealForexStack.Screen
        name="closedPositions"
        component={ClosedPositionsRealForexStack}
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
