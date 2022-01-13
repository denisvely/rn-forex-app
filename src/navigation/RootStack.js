/* eslint-disable max-lines */
import React, { useEffect, useState, useRef } from "react";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from "expo-app-loading";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// TODO => Stacks
import AuthStack from "./AuthStack";
import TabsStack from "./RealForexStack";

import { NoInternetConnection } from "../screens";

import { checkConnection, getApplication, checkAsyncStorage } from "store/app";

const RootStack = createStackNavigator();

const getRootStack = ({ token, loading, isLogged }) => {
  if (loading) {
    return {
      component: null,
      name: null,
    };
  }

  if (token && !isLogged) {
    return {
      component: AuthStack,
      name: "Home",
    };
  }
  return {
    component: TabsStack,
    name: "TabsStack",
  };
};

const RootStackNavigator = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const app = useSelector((state) => getApplication(state));
  const [{ component, name }, updateStack] = useState(() => {
    return getRootStack({
      token: app.token,
      loading: app.loading,
      isLogged: app.isLogged,
    });
  });

  const routeNameRef = useRef();
  const navigationRef = useRef();

  const [loaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    if (app.loading && !app.token) {
      checkConnection(dispatch);
      checkAsyncStorage(dispatch);
    } else {
      updateStack(
        getRootStack({
          token: app.token,
          loading: app.loading,
          isLogged: app.isLogged,
        })
      );
    }
  }, [app.loading, app.token]);

  if (
    app.hasInternetConnection &&
    (app.loading || !app.isConnected || !loaded || (!component && !name))
  ) {
    return <AppLoading />;
  }

  if (!app.hasInternetConnection) {
    return (
      <NoInternetConnection
        checkConnection={() => {
          checkConnection(dispatch);
        }}
      />
    );
  }

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={async (one, two) => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName =
            navigationRef.current?.getCurrentRoute().name;

          routeNameRef.current = currentRouteName;
        }}
      >
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name={name} component={component} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootStackNavigator;
