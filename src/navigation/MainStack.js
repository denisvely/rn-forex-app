import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import RealForexStack from "./RealForexStack";
import SimplexStack from "./SimplexStack";
import {
  Home,
  Menu,
  Notifications,
  RealForexOrderChart,
  RealForexOrderDetails,
  PositionHistory,
  Settings,
  Funding,
  BrowserScreen,
  MyProfile,
} from "../screens";
import { headerOptions } from "../constants";
import {
  HeaderLeft,
  HeaderRight,
  NotificationsIcon,
  HeaderX,
  FavouritesIcon,
} from "../components";
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
        }}
      />
      <MainStack.Screen
        name="RealForexStack"
        component={RealForexStack}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="SimplexStack"
        component={SimplexStack}
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
        }}
      />
      <MainStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => <HeaderX onPress={() => navigation.goBack()} />,
        }}
      />
      <MainStack.Screen
        name="Funding"
        component={Funding}
        options={{
          title: "Funding",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => <HeaderX onPress={() => navigation.goBack()} />,
        }}
      />
      <MainStack.Screen
        name="Deposit"
        component={BrowserScreen}
        options={{
          title: "Deposit",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.arrowBackWithoutTitleNoMargin,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => (
            <HeaderX
              onPress={() => navigation.goBack()}
              styles={{ marginLeft: 16 }}
            />
          ),
        }}
      />
      <MainStack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          title: "MyProfile",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => <HeaderX onPress={() => navigation.goBack()} />,
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
      <MainStack.Screen
        name="RealForexOrderChart"
        component={RealForexOrderChart}
        options={{
          tabBarLabel: "RealForexOrderChart",
          title: "",
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerRight: () => (
            <HeaderRight
              navigation={navigation}
              firstComponent={<FavouritesIcon navigation={navigation} />}
            />
          ),
        }}
      />
      <MainStack.Screen
        name="RealForexOrderDetails"
        component={RealForexOrderDetails}
        options={{
          tabBarLabel: "RealForexOrderDetails",
          title: "",
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => <HeaderX onPress={() => navigation.goBack()} />,
          headerRight: () => (
            <HeaderRight
              navigation={navigation}
              firstComponent={<FavouritesIcon navigation={navigation} />}
            />
          ),
        }}
      />
      <MainStack.Screen
        name="PositionHistory"
        component={PositionHistory}
        options={{
          tabBarLabel: "PositionHistory",
          title: "Position History",
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => <HeaderX onPress={() => navigation.goBack()} />,
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
