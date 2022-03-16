import React, { useRef } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getRealForexOpenPositions } from "../../../store/realForex";
import { deviceWidth } from "../../../utils";
import {
  LazyFlatList,
  Loading,
  OpenPositionsTradeBox,
} from "../../../components";

import styles from "./openPositionsRealForexStyles";

const OpenPositionsRealForex = ({ navigation }) => {
  const dispatch = useDispatch();
  const openPositionsRef = useRef();
  const openPositions = useSelector((state) =>
    getRealForexOpenPositions(state)
  );

  return (
    <View style={styles.container}>
      {openPositions ? (
        <LazyFlatList
          list={openPositions}
          renderItem={({ item, index }) => {
            return <OpenPositionsTradeBox item={item} key={`${index}`} />;
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
        <Loading size="large" />
      )}
    </View>
  );
};

export default OpenPositionsRealForex;
