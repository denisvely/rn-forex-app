import React, { useState } from "react";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import PropTypes from "prop-types";
import { headerOptions } from "constants";
import { HeaderLeft, HeaderRight, NotificationsIcon } from "components";

import { ClosedPositionsRealForex } from "screens";

import { colors } from "constants";

const ClosedPositions = createStackNavigator();

const ClosedPositionsNavigator = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <ClosedPositions.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: true }}
    >
      <ClosedPositions.Screen
        name="ClosedPositions"
        component={ClosedPositionsRealForex}
        options={{
          tabBarLabel: "closedPositions",
          title: t("navigation.closedPositions"),
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
    </ClosedPositions.Navigator>
  );
};

ClosedPositionsNavigator.propTypes = {
  navigation: PropTypes.object,
};

export default ClosedPositionsNavigator;
