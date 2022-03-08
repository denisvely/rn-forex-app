import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import RealForexStack from "./RealForexStack";
import { Home, Menu, Notifications } from "screens";
import { headerOptions } from "constants";
import {
  HeaderLeft,
  HeaderRight,
  NotificationsIcon,
  HeaderX,
} from "components";

import { getApplication } from "store/app";

const MainStack = createStackNavigator();

const MainStackNavigator = ({ navigation }) => {
  const app = useSelector((state) => getApplication(state));

  return (
    <MainStack.Navigator
      initialRouteName={app.game === "RealForex" ? "RealForexStack" : "Home"}
      screenOptions={{ headerShown: true }}
    >
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => (
            <HeaderLeft navigation={navigation} showDrawer={true} />
          ),
          headerRight: () => (
            <HeaderRight
              navigation={navigation}
              firstComponent={<NotificationsIcon navigation={navigation} />}
            />
          ),
        }}
      />
      <MainStack.Screen
        name="RealForexStack"
        component={RealForexStack}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Menu"
        component={Menu}
        options={{
          title: "Menu",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => <HeaderX onPress={() => navigation.goBack()} />,
          headerRight: () => (
            <HeaderRight
              navigation={navigation}
              firstComponent={<NotificationsIcon navigation={navigation} />}
            />
          ),
        }}
      />
      <MainStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: "Notifications",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => (
            <HeaderLeft navigation={navigation} showDrawer={true} />
          ),
          headerRight: () => (
            <HeaderRight
              navigation={navigation}
              firstComponent={
                <NotificationsIcon navigation={navigation} active={true} />
              }
            />
          ),
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
