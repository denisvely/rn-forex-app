import React, { useRef, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import { getRealForexOpenPositions } from "../../../store/realForex";
import { deviceWidth } from "../../../utils";
import {
  LazyFlatList,
  OpenPositionsTradeBox,
  BottomSlidingPanel,
  Typography,
} from "../../../components";

import styles from "./openPositionsRealForexStyles";

const OpenPositionsRealForex = ({ navigation }) => {
  const [slidingPanelType, setPanelType] = useState(null);
  const [currentTrade, setCurrentTrade] = useState(null);
  const openPositionsRef = useRef();
  const openPositions = useSelector((state) =>
    getRealForexOpenPositions(state)
  );

  return (
    <View style={styles.container}>
      {openPositions && openPositions.length > 0 ? (
        <LazyFlatList
          list={openPositions}
          renderItem={({ item }) => {
            return (
              <OpenPositionsTradeBox
                item={item}
                toggleBottomSlidingPanel={(type) => setPanelType(type)}
                setCurrentTrade={(trade) => setCurrentTrade(trade)}
                navigation={navigation}
              />
            );
          }}
          keyExtractor={(item) => item.orderID}
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
          listRef={openPositionsRef}
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
