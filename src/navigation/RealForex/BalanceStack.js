import React, { useState } from "react";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import PropTypes from "prop-types";

import { Balance } from "screens";

import { colors } from "constants";

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
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.fontPrimaryColor,
            fontSize: 18,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: colors.white,
          },
          headerBackTitleVisible: false,
        }}
      />
    </BalanceStack.Navigator>
  );
};

BalanceStackNavigator.propTypes = {
  navigation: PropTypes.object,
};

export default BalanceStackNavigator;
