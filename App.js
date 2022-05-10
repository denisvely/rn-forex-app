import React from "react";
import { Provider } from "react-redux";
import { LogBox, StatusBar } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import ServiceManager from "./src/utils/serviceManager";
import Toast from "./src/components/Toast/Toast";
import * as Sentry from "sentry-expo";

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
  Sentry.init({
    dsn: "https://d3f21029ceeb41588a7518e83ef5424d@o1239946.ingest.sentry.io/6391793",
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  });

  const theme = useColorScheme();
  return (
    <Provider store={Store}>
      <AppearanceProvider>
        <StatusBar style="auto" />
        <RootStackNavigator theme={theme} />
        <Toast />
      </AppearanceProvider>
    </Provider>
  );
};

export default App;
