import React, { useRef, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const [isSlidingPanelVisible, setPanelVisibility] = useState(false);
  const openPositionsRef = useRef();
  const openPositions = useSelector((state) =>
    getRealForexOpenPositions(state)
  );

  return (
    <View style={styles.container}>
      {openPositions ? (
        <LazyFlatList
          list={openPositions}
          renderItem={({ item }) => {
            return (
              <OpenPositionsTradeBox
                item={item}
                toggleBottomSlidingPanel={(type) => setPanelVisibility(type)}
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
        isVisible={isSlidingPanelVisible}
        toggleSlidingPanel={() => setPanelVisibility(false)}
      />
    </View>
  );
};

export default OpenPositionsRealForex;
