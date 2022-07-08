import React from "react";
import { Provider } from "react-redux";
import { LogBox, StatusBar } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import ServiceManager from "./src/utils/serviceManager";
import Toast from "./src/components/Toast/Toast";

import "./src/translations";

import Store from "./src/store";
import RootStackNavigator from "./src/navigation/RootStack";

LogBox.ignoreLogs(["Warning"]);
LogBox.ignoreLogs(["Remote"]);
LogBox.ignoreLogs(["Require cycle:"]);
LogBox.ignoreLogs([
  // eslint-disable-next-line max-len
  "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.",
]);

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
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <RootStackNavigator theme={theme} />
        <Toast />
      </AppearanceProvider>
    </Provider>
  );
};

export default App;
