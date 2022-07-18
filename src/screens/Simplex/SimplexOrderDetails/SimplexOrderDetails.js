import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { MarketPendingButtons, HeaderAssetInfo } from "../../../components";
import SimplexDirectionsButtons from "./components/SimplexDirectionsButtons/SimplexDirectionsButtons";

import styles from "./simplexOrderDetailsStyles";

const SimplexOrderDetails = ({ route, navigation }) => {
  const { t } = useTranslation();
  const asset = route.params.asset;
  const [isMarket, setOrderType] = useState(true);
  const [tradeDirection, setDirection] = useState(null);

  useEffect(() => {
    if (asset) {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderAssetInfo asset={asset} navigation={navigation} />
        ),
      });
      // makeOrder();

      // return () => {
      //   setCurrentlyModifiedOrder(dispatch, null);
      // };
    }
  }, [route.params.asset]);

  return (
    <View style={styles.container}>
      <MarketPendingButtons
        isMarket={isMarket}
        setOrderType={(orderType) => setOrderType(orderType)}
      />
      <SimplexDirectionsButtons
        tradeDirection={tradeDirection}
        setDirection={(direction) => {
          debugger;

          setDirection(direction);
        }}
      />
    </View>
  );
};

export default SimplexOrderDetails;
