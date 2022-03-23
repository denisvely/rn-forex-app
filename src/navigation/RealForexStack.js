import React, { useEffect } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";

import {
  HeaderLeft,
  HeaderRight,
  NotificationsIcon,
  HeaderTitleLogo,
} from "components";
import { headerOptions } from "constants";
import {
  Quotes,
  OpenPositionsRealForex,
  PendingOrdersRealForex,
  ClosedPositionsRealForex,
  Balance,
} from "../screens";

import { CustomTabBar } from "../components";
import { loadInitialRealForexData } from "../store/realForex";
import { signalRStop } from "../store/realForex/signalRActions";

const RealForexStack = createBottomTabNavigator();

const RealForexStackNavigator = ({ navigation }) => {
  const { t } = useTranslation();
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
        options={{
          tabBarLabel: "quotes",
          title: "",
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => (
            <HeaderLeft navigation={navigation} showDrawer={true} />
          ),
          headerTitle: () => <HeaderTitleLogo />,
          headerRight: () => (
            <HeaderRight
              navigation={navigation}
              firstComponent={<NotificationsIcon navigation={navigation} />}
            />
          ),
        }}
      >
        {(props) => <Quotes {...props} />}
      </RealForexStack.Screen>
      <RealForexStack.Screen
        name="openPositions"
        options={{
          tabBarLabel: "openPositions",
          title: t("navigation.openPositions"),
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => (
            <HeaderLeft navigation={navigation} showDrawer={true} />
          ),
          headerTitle: () => <HeaderTitleLogo />,
          headerRight: () => (
            <HeaderRight
              navigation={navigation}
              firstComponent={<NotificationsIcon navigation={navigation} />}
            />
          ),
        }}
      >
        {(props) => <OpenPositionsRealForex {...props} />}
      </RealForexStack.Screen>
      <RealForexStack.Screen
        name="pendingOrders"
        options={{
          tabBarLabel: "pendingOrders",
          title: t("navigation.pendingOrders"),
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => (
            <HeaderLeft navigation={navigation} showDrawer={true} />
          ),
          headerTitle: () => <HeaderTitleLogo />,
          headerRight: () => (
            <HeaderRight
              navigation={navigation}
              firstComponent={<NotificationsIcon navigation={navigation} />}
            />
          ),
        }}
      >
        {(props) => <PendingOrdersRealForex {...props} />}
      </RealForexStack.Screen>
      <RealForexStack.Screen
        name="closedPositions"
        options={{
          tabBarLabel: "closedPositions",
          title: t("navigation.closedPositions"),
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => (
            <HeaderLeft navigation={navigation} showDrawer={true} />
          ),
          headerTitle: () => <HeaderTitleLogo />,
          headerRight: () => (
            <HeaderRight
              navigation={navigation}
              firstComponent={<NotificationsIcon navigation={navigation} />}
            />
          ),
        }}
      >
        {(props) => <ClosedPositionsRealForex {...props} />}
      </RealForexStack.Screen>
      <RealForexStack.Screen
        name="balance"
        options={{
          tabBarLabel: "balance",
          title: t("navigation.balance"),
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => (
            <HeaderLeft navigation={navigation} showDrawer={true} />
          ),
          headerTitle: () => <HeaderTitleLogo />,
          headerRight: () => (
            <HeaderRight
              navigation={navigation}
              firstComponent={<NotificationsIcon navigation={navigation} />}
            />
          ),
        }}
      >
        {(props) => <Balance {...props} />}
      </RealForexStack.Screen>
    </RealForexStack.Navigator>
  );
};

export default RealForexStackNavigator;
