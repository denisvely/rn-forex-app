import React, { useState } from "react";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import PropTypes from "prop-types";

import { Quotes } from "screens";

import { colors } from "constants";

const QuotesStack = createStackNavigator();

const QuotesStackNavigator = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <QuotesStack.Navigator
      initialRouteName="Quotes"
      screenOptions={{ headerShown: true }}
    >
      <QuotesStack.Screen
        name="Quotes"
        component={Quotes}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.textColor,
            fontSize: 18,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: colors.primaryColorWhite,
          },
          headerBackTitleVisible: false,
        }}
      />
    </QuotesStack.Navigator>
  );
};

QuotesStackNavigator.propTypes = {
  navigation: PropTypes.object,
};

export default QuotesStackNavigator;
