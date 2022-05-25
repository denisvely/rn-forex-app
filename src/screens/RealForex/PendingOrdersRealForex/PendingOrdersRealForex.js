import React, { useRef, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import { getRealForexPendingOrders } from "../../../store/realForex";
import { deviceWidth } from "../../../utils";
import {
  LazyFlatList,
  Typography,
  PendingOrdersTradeBox,
  BottomSlidingPanel,
} from "../../../components";

import styles from "./pendingOrdersRealForexStyles";

const OpenPositionsRealForex = ({ navigation }) => {
  const pendingOrdersRef = useRef();
  const pendingOrders = useSelector((state) =>
    getRealForexPendingOrders(state)
  );
  const [slidingPanelType, setPanelType] = useState(null);
  const [currentTrade, setCurrentTrade] = useState(null);

  return (
    <View style={styles.container}>
      {pendingOrders ? (
        <LazyFlatList
          list={pendingOrders}
          renderItem={({ item }) => {
            return (
              <PendingOrdersTradeBox
                item={item}
                navigation={navigation}
                toggleBottomSlidingPanel={(type) => setPanelType(type)}
                setCurrentTrade={(trade) => setCurrentTrade(trade)}
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
      <BottomSlidingPanel
        panelType={slidingPanelType}
        item={currentTrade}
        setCurrentTrade={(trade) => setCurrentTrade(trade)}
        toggleSlidingPanel={() => setPanelType(false)}
      />
    </View>
  );
};

export default OpenPositionsRealForex;
