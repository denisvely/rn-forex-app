import React from "react";
import PropTypes from "prop-types";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Register, ForgotPassword } from "../screens";
import { headerOptions } from "../constants";

const AuthStack = createStackNavigator();

const AuthNavigator = ({ route: { name = "Login" } }) => {
  return (
    <AuthStack.Navigator
      initialRouteName={name}
      screenOptions={{
        title: "",
        headerTransparent: false,
        headerBackTitleVisible: true,
        headerBackVisible: false,
      }}
    >
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          title: "",
          ...headerOptions.whiteBackgroundHeader,
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerLeft: null,
        }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{
          title: "",
          ...headerOptions.whiteBackgroundHeader,
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerLeft: null,
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: "",
          ...headerOptions.whiteBackgroundHeader,
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerLeft: null,
        }}
      />
    </AuthStack.Navigator>
  );
};

AuthNavigator.propTypes = {
  route: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default AuthNavigator;
