import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import PropTypes from "prop-types";

import { Positions } from "screens";

import { colors } from "constants";

const PositionsStack = createStackNavigator();

const PositionsStackNavigator = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <PositionsStack.Navigator
      initialRouteName="positions"
      screenOptions={{ headerShown: true }}
    >
      <PositionsStack.Screen
        name="Positions"
        component={Positions}
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
    </PositionsStack.Navigator>
  );
};

PositionsStackNavigator.propTypes = {
  navigation: PropTypes.object,
};

export default PositionsStackNavigator;
