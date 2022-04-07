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
import MainStack from "./MainStack";
import InvalidTokenModal from "../components/InvalidTokenModal/InvalidTokenModal";
import { NoInternetConnection } from "../screens";
import {
  checkConnection,
  getApplication,
  checkAsyncStorage,
} from "../store/app";

const RootStack = createStackNavigator();

const RootStackNavigator = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const app = useSelector((state) => getApplication(state));

  const routeNameRef = useRef();
  const navigationRef = useRef();

  const [loaded] = useFonts({
    "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
    "Gilroy-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-Regular": require("../../assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-SemiBold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
  });

  useEffect(() => {
    if (app.loading) {
      checkConnection(dispatch);
      checkAsyncStorage(dispatch);
    }
  }, [app.loading]);

  if (app.loading || !app.isConnected || !loaded) {
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
      {!!app.invalidToken ? (
        <InvalidTokenModal
          logout={() => {
            logout(dispatch);
          }}
        />
      ) : null}
      <NavigationContainer
        ref={navigationRef}
        onStateChange={async () => {
          routeNameRef.current = navigationRef.current?.getCurrentRoute().name;
        }}
      >
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {!app.isLogged ? (
            <RootStack.Screen name="AuthStack" component={AuthStack} />
          ) : (
            <RootStack.Screen name="MainStack" component={MainStack} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootStackNavigator;
