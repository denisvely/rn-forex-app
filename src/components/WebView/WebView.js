import React from "react";
import { WebView } from "react-native-webview";

import Loading from "../Loading/Loading";

export default function NativeWebView({
  style,
  source,
  thirdPartyCookiesEnabled = true,
  sharedCookiesEnabled = true,
  javaScriptEnabled = true,
  domStorageEnabled = true,
}) {
  return (
    <WebView
      style={style}
      source={source}
      thirdPartyCookiesEnabled={thirdPartyCookiesEnabled}
      sharedCookiesEnabled={sharedCookiesEnabled}
      domStorageEnabled={domStorageEnabled}
      javaScriptEnabled={javaScriptEnabled}
      startInLoadingState={true}
      renderLoading={() => <Loading />}
    />
  );
}
