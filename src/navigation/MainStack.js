import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
  MyDocuments,
  MyMessages,
  MessageDetails,
  ContactUs,
  SimplexOrderDetails,
  SimplexOrderChart,
} from "../screens";
import { headerOptions } from "../constants";
import {
  HeaderLeft,
  HeaderRight,
  NotificationsIcon,
  HeaderX,
  FavouritesIcon,
  HeaderTitleLogo,
} from "../components";
import { getApplication } from "../store/app";

const MainStack = createStackNavigator();

const MainStackNavigator = ({ navigation }) => {
  const { t } = useTranslation();
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
          headerTitle: () => <HeaderTitleLogo />,
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
          title: t(`navigation.Menu`),
          headerTitleAlign: "center",
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
          title: t(`navigation.Settings`),
          headerTitleAlign: "center",
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
          headerTitle: () => <HeaderTitleLogo />,
          headerTitleAlign: "center",
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
          title: t(`navigation.Deposit`),
          headerTitleAlign: "center",
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
          title: t(`navigation.MyProfile`),
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => <HeaderX onPress={() => navigation.goBack()} />,
        }}
      />
      <MainStack.Screen
        name="MyDocuments"
        component={MyDocuments}
        options={{
          title: t(`navigation.MyDocuments`),
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => <HeaderX onPress={() => navigation.goBack()} />,
        }}
      />
      <MainStack.Screen
        name="MyMessages"
        component={MyMessages}
        options={{
          title: t(`navigation.MyMessages`),
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => <HeaderX onPress={() => navigation.goBack()} />,
        }}
      />
      <MainStack.Screen
        name="MessageDetails"
        component={MessageDetails}
        options={{
          title: t(`navigation.MessageDetails`),
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => <HeaderX onPress={() => navigation.goBack()} />,
        }}
      />

      <MainStack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          title: t(`navigation.ContactUs`),
          headerTitleAlign: "center",
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
          title: t(`navigation.Notifications`),
          headerTitleAlign: "center",
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
          title: t(`navigation.PositionHistory`),
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => <HeaderX onPress={() => navigation.goBack()} />,
        }}
      />
      <MainStack.Screen
        name="SimplexOrderChart"
        component={SimplexOrderChart}
        options={{
          tabBarLabel: "SimplexOrderChart",
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
        name="SimplexOrderDetails"
        component={SimplexOrderDetails}
        options={{
          tabBarLabel: "SimplexOrderDetails",
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
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
