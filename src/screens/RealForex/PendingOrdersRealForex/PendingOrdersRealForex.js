import React, { useRef } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getRealForexPendingOrders } from "../../../store/realForex";
import { deviceWidth } from "../../../utils";
import {
  LazyFlatList,
  Loading,
  PendingOrdersTradeBox,
} from "../../../components";

import styles from "./pendingOrdersRealForexStyles";

const OpenPositionsRealForex = ({ navigation }) => {
  const dispatch = useDispatch();
  const pendingOrdersRef = useRef();
  const pendingOrders = useSelector((state) =>
    getRealForexPendingOrders(state)
  );

  return (
    <View style={styles.container}>
      {pendingOrders ? (
        <LazyFlatList
          list={pendingOrders}
          renderItem={({ item, index }) => {
            return <PendingOrdersTradeBox item={item} />;
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
        <Loading size="large" />
      )}
    </View>
  );
};

export default OpenPositionsRealForex;
