import React from "react";
import PropTypes from "prop-types";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import {
  Login,
  Register,
  ForgotPassword,
  TermsAndAgreements,
} from "../screens";
import { HeaderX } from "../components";
import { headerOptions } from "../constants";

const AuthStack = createStackNavigator();

const AuthNavigator = ({ route: { name = "Login" }, navigation }) => {
  const { t } = useTranslation();
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
      <AuthStack.Screen
        name="TermsAndAgreements"
        component={TermsAndAgreements}
        options={{
          title: t(`menu.terms`),
          headerTitleAlign: "center",
          ...headerOptions.headerTitleStyle,
          ...headerOptions.leftAndRightPadding,
          ...headerOptions.whiteBackgroundHeader,
          headerLeft: () => <HeaderX onPress={() => navigation.goBack()} />,
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
