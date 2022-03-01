import React, { useState } from "react";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import PropTypes from "prop-types";
import { headerOptions } from "constants";
import { HeaderLeft, HeaderRight, NotificationsIcon } from "components";
import { Balance } from "screens";

const BalanceStack = createStackNavigator();

const BalanceStackNavigator = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <BalanceStack.Navigator
      initialRouteName="balance"
      screenOptions={{ headerShown: true }}
    >
      <BalanceStack.Screen
        name="Balance"
        component={Balance}
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
          headerRight: () => (
            <HeaderRight
              navigation={navigation}
              firstComponent={<NotificationsIcon navigation={navigation} />}
            />
          ),
        }}
      />
    </BalanceStack.Navigator>
  );
};

BalanceStackNavigator.propTypes = {
  navigation: PropTypes.object,
};

export default BalanceStackNavigator;
