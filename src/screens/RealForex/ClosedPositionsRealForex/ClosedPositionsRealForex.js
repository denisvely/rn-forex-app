import React, { useRef } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  LazyFlatList,
  Loading,
  CollapsibleTradeBox,
} from "../../../components";
import { getRealForexClosedPositions } from "../../../store/realForex";
import { deviceWidth } from "../../../utils";

import styles from "./closedPositionsRealForexStyles";

const ClosedPositionsRealForex = ({ navigation }) => {
  const dispatch = useDispatch();
  const closedPositionsRef = useRef();
  const closedPositions = useSelector((state) =>
    getRealForexClosedPositions(state)
  );

  return (
    <View style={styles.container}>
      {closedPositions ? (
        <LazyFlatList
          list={closedPositions}
          renderItem={({ item, index }) => {
            return <CollapsibleTradeBox item={item} key={`${index}`} />;
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
          listRef={closedPositionsRef}
        />
      ) : (
        <Loading size="large" />
      )}
    </View>
  );
};

export default ClosedPositionsRealForex;
