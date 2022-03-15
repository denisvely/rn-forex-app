import React, { useRef } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getRealForexOpenPositions } from "../../../store/realForex";
import { deviceWidth } from "../../../utils";
import { LazyFlatList, Loading } from "../../../components";

import styles from "./openPositionsRealForexStyles";

const OpenPositionsRealForex = ({ navigation }) => {
  const dispatch = useDispatch();
  const openPositionsRef = useRef();
  const openPositions = useSelector((state) =>
    getRealForexOpenPositions(state)
  );

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 1 }}>
        {openPositions ? (
          <LazyFlatList
            list={openPositions}
            renderItem={({ item, index }) => {
              return <View></View>;
            }}
            keyExtractor={(item) => item.id}
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
    </View>
  );
};

export default OpenPositionsRealForex;
