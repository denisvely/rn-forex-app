import React, { useState } from "react";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import PropTypes from "prop-types";

import { OpenPositionsRealForex } from "screens";
import { headerOptions } from "constants";
import { HeaderLeft, HeaderRight, NotificationsIcon } from "components";

const OpenPositions = createStackNavigator();

const OpenPositionsNavigator = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <OpenPositions.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: true }}
    >
      <OpenPositions.Screen
        name="OpenPositions"
        component={OpenPositionsRealForex}
        options={{
          tabBarLabel: "openPositions",
          title: t("navigation.openPositions"),
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
    </OpenPositions.Navigator>
  );
};

OpenPositionsNavigator.propTypes = {
  navigation: PropTypes.object,
};

export default OpenPositionsNavigator;
