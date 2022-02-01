import React, { useState } from "react";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import PropTypes from "prop-types";

import { Chart } from "screens";

import { colors } from "constants";

const ChartStack = createStackNavigator();

const ChartStackNavigator = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <ChartStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: true }}
    >
      <ChartStack.Screen
        name="Chart"
        component={Chart}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.textColor,
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
    </ChartStack.Navigator>
  );
};

ChartStackNavigator.propTypes = {
  navigation: PropTypes.object,
};

export default ChartStackNavigator;
