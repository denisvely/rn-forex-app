import React, { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

import { HeaderAssetInfo, Loading } from "../../../components";

import styles from "./simplexOrderChartStyles";

const SimplexOrderChart = ({ route, navigation }) => {
  const asset = route.params.asset;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderAssetInfo asset={asset} navigation={navigation} />
      ),
    });
  }, [route.params.asset]);

  return (
    <View style={styles.container}>
      {asset && asset.id ? (
        <>
          <SafeAreaView style={styles.container}>
            <WebView
              source={{
                uri: `https://advfeed-uat.testqa.me/tradingview/indexw.html?taid=${asset.id}`,
              }}
              allowFileAccessFromFileURLs={true}
              originWhitelist={["*"]}
            />
          </SafeAreaView>
        </>
      ) : (
        <Loading size="large" />
      )}
    </View>
  );
};

export default SimplexOrderChart;
