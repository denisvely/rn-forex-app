import React, { useState } from "react";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import PropTypes from "prop-types";

import { PendingOrdersRealForex } from "screens";
import { headerOptions } from "constants";
import { HeaderLeft, HeaderRight, NotificationsIcon } from "components";

const PendingOrders = createStackNavigator();

const PendingOrdersNavigator = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <PendingOrders.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: true }}
    >
      <PendingOrders.Screen
        name="pendingOrders"
        component={PendingOrdersRealForex}
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
          headerRight: () => (
            <HeaderRight
              navigation={navigation}
              firstComponent={<NotificationsIcon navigation={navigation} />}
            />
          ),
        }}
      />
    </PendingOrders.Navigator>
  );
};

PendingOrdersNavigator.propTypes = {
  navigation: PropTypes.object,
};

export default PendingOrdersNavigator;
