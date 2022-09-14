import React, { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import {
  RealForexTradeButtons,
  HeaderAssetInfo,
  Loading,
} from "../../../components";
import { getUser } from "../../../store/app";
import {
  getRealForexOpenPositions,
  getRealForexOptionsByType,
} from "../../../store/realForex";

import styles from "./realForexOrderChartStyles";

const RealForexOrderChart = ({ route, navigation }) => {
  const asset = route.params.asset;
  const user = useSelector((state) => getUser(state));
  const openPositions = useSelector((state) =>
    getRealForexOpenPositions(state)
  );
  const realForexOptionsByType = useSelector((state) =>
    getRealForexOptionsByType(state)
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderAssetInfo asset={asset} navigation={navigation} />
      ),
    });
  }, [route.params.asset]);

  const checkAvailableForTrading = (id) => {
    if (!realForexOptionsByType.All[id].rules.length) {
      return false;
    } else {
      var currTime = new Date(),
        availableForTrading = false;

      for (let i = 0; i < realForexOptionsByType.All[id].rules.length; i++) {
        var dateFrom = new Date(
            realForexOptionsByType.All[id].rules[i].dates.from.dateTime
          ),
          dateTo = new Date(
            realForexOptionsByType.All[id].rules[i].dates.to.dateTime
          );

        if (currTime > dateFrom && dateFrom < dateTo) {
          availableForTrading =
            realForexOptionsByType.All[id].rules[i].availableForTrading;
        }
      }

      return availableForTrading;
    }
  };

  const onButtonPress = (isDirectionBuy) => {
    let openTradeActive = null;
    for (let i = 0; i < openPositions.length; i++) {
      if (
        openPositions[i].tradableAssetId == asset.id &&
        openPositions[i].IsSocialLinked == null &&
        openPositions[i].optionType == "HARealForex"
      ) {
        openTradeActive = openPositions[i];
      }
    }
    if (openTradeActive && user.forexModeId != 3) {
      if (realForexOptionsByType.All[asset.id]) {
        navigation.navigate("RealForexOrderDetails", {
          asset: asset,
          isBuy: isDirectionBuy,
          isPending: false,
          order: openTradeActive,
          isMarketClosed: !checkAvailableForTrading(asset.id),
        });
      }
    } else {
      navigation.navigate("RealForexOrderDetails", {
        asset: asset,
        isBuy: isDirectionBuy,
      });
    }
  };

  return (
    <View style={styles.container}>
      {asset && asset.id ? (
        <>
          <SafeAreaView style={styles.container}>
            <WebView
              source={{
                uri: `https://advfeed.finte.co/tradingview/indexw.html?taid=${asset.id}`,
              }}
              allowFileAccessFromFileURLs={true}
              originWhitelist={["*"]}
            />
          </SafeAreaView>
          <View style={{ height: 140 }}>
            <RealForexTradeButtons
              asset={asset}
              buyOnPress={() => onButtonPress(true)}
              sellOnPress={() => onButtonPress(false)}
            />
          </View>
        </>
      ) : (
        <Loading size="large" />
      )}
    </View>
  );
};

export default RealForexOrderChart;
