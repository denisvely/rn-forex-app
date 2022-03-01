import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import RealForexStack from "./RealForexStack";
import { Home } from "../screens";
import { headerOptions } from "../constants";
import { HeaderLeft, HeaderRight, NotificationsIcon } from "../components";

import { getApplication } from "../store/app";

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
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
