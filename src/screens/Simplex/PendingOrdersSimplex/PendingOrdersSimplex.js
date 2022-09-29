import React, { useRef } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { getSimplexPendingOrders } from "../../../store/simplex";
import { deviceWidth } from "../../../utils";
import {
  LazyFlatList,
  Typography,
  PendingOrdersSimplexTradeBox,
} from "../../../components";
import simplexServices from "../../../services/simplexServices";
import styles from "./pendingOrdersSimplexStyles";

const closePendingOrder = simplexServices.cancelPendingOrder();

const PendingOrdersSimplex = ({ navigation }) => {
  const pendingOrdersRef = useRef();
  const pendingOrders = useSelector((state) => getSimplexPendingOrders(state));

  const cancelSimplexPendingOrder = (id) => {
    closePendingOrder
      .fetch({ orderId: id })
      .then(({ response }) => {
        if (response.body.code == 200) {
          Toast.show({
            type: "success",
            text1: "Pending Order Cancelled",
            topOffset: 100,
            visibilityTime: 3000,
            autoHide: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {pendingOrders ? (
        <LazyFlatList
          list={pendingOrders}
          renderItem={({ item }) => {
            return (
              <PendingOrdersSimplexTradeBox
                item={item}
                navigation={navigation}
                cancelOrder={cancelSimplexPendingOrder}
              />
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

export default PendingOrdersSimplex;
