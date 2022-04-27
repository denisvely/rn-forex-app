import React, { useRef } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import { getRealForexPendingOrders } from "../../../store/realForex";
import { deviceWidth } from "../../../utils";
import {
  LazyFlatList,
  Typography,
  PendingOrdersTradeBox,
} from "../../../components";

import styles from "./pendingOrdersRealForexStyles";

const OpenPositionsRealForex = ({ navigation }) => {
  const pendingOrdersRef = useRef();
  const pendingOrders = useSelector((state) =>
    getRealForexPendingOrders(state)
  );

  return (
    <View style={styles.container}>
      {pendingOrders ? (
        <LazyFlatList
          list={pendingOrders}
          renderItem={({ item }) => {
            return (
              <PendingOrdersTradeBox item={item} navigation={navigation} />
            );
          }}
          keyExtractor={(item) => item.OrderID}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: deviceWidth,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            paddingBottom: 100,
          }}
          style={styles.flatListContainer}
          listRef={pendingOrdersRef}
        />
      ) : (
        <View style={styles.noTrades}>
          <Typography name="largeBold" text={"No trades found."} />
        </View>
      )}
    </View>
  );
};

export default OpenPositionsRealForex;
