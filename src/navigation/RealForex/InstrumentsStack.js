import React, { useState } from "react";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import PropTypes from "prop-types";

import { Instruments } from "screens";

import { colors } from "constants";

const InstrumentsStack = createStackNavigator();

const InstrumentsStackNavigator = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <InstrumentsStack.Navigator
      initialRouteName="Instruments"
      screenOptions={{ headerShown: true }}
    >
      <InstrumentsStack.Screen
        name="Instruments"
        component={Instruments}
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
    </InstrumentsStack.Navigator>
  );
};

InstrumentsStackNavigator.propTypes = {
  navigation: PropTypes.object,
};

export default InstrumentsStackNavigator;
