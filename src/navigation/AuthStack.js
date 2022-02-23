import React from "react";
import PropTypes from "prop-types";
import { createStackNavigator } from "@react-navigation/stack";

import { Login, Register, ForgotPassword } from "../screens";

const AuthStack = createStackNavigator();

const AuthNavigator = ({ route: { name = "Login" } }) => {
  return (
    <AuthStack.Navigator
      initialRouteName={name}
      screenOptions={{
        title: "",
        headerTransparent: false,
        headerBackTitleVisible: true,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};

AuthNavigator.propTypes = {
  route: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default AuthNavigator;
