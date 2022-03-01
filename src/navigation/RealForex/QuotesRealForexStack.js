import React, { useState } from "react";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import PropTypes from "prop-types";

import { headerOptions } from "constants";
import { HeaderLeft, HeaderRight, NotificationsIcon } from "components";
import { Quotes } from "screens";

import { colors } from "constants";

const QuotesStack = createStackNavigator();

const QuotesStackNavigator = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <QuotesStack.Navigator
      initialRouteName="quotes"
      screenOptions={{ headerShown: true }}
    >
      <QuotesStack.Screen
        name="quotes"
        options={{
          tabBarLabel: "quotes",
          title: t("navigation.quotes"),
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
      >
        {(props) => <Quotes {...props} />}
      </QuotesStack.Screen>
    </QuotesStack.Navigator>
  );
};

QuotesStackNavigator.propTypes = {
  navigation: PropTypes.object,
};

export default QuotesStackNavigator;
