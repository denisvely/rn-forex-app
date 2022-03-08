import React from "react";
import { Provider } from "react-redux";
import { LogBox, StatusBar } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import ServiceManager from "./src/utils/serviceManager";

import "./src/translations";

import Store from "./src/store";
import RootStackNavigator from "./src/navigation/RootStack";

LogBox.ignoreLogs(["Require cycle:"]);

ServiceManager.setStore(Store);

// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    // console.log("Fetch", { request: { uri, options, ...args }, response });
    return response;
  });
};

const App = () => {
  const theme = useColorScheme();
  return (
    <Provider store={Store}>
      <AppearanceProvider>
        <StatusBar style="auto" />
        <RootStackNavigator theme={theme} />
      </AppearanceProvider>
    </Provider>
  );
};

export default App;
