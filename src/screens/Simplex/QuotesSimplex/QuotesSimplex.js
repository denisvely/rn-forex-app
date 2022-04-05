import React, { useState, useRef, memo } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { getSimplexOptionsByType } from "../../../store/simplex";
import {
  LazyFlatList,
  AssetBoxSimplex,
  AssetsFilterSimplex,
  Loading,
} from "../../../components";
import styles from "./quotesStyles";
import { deviceWidth } from "../../../utils";

const QuotesSimplex = ({ navigation }) => {
  const flatListRef = useRef();
  const simplexOptionsByType = useSelector((state) =>
    getSimplexOptionsByType(state)
  );
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <View style={styles.container}>
      <AssetsFilterSimplex
        activeFilter={activeFilter}
        changeActiveFilter={(translation) => setActiveFilter(translation)}
      />
      {simplexOptionsByType ? (
        <LazyFlatList
          removeClippedSubviews
          list={Object.values(simplexOptionsByType[activeFilter])}
          renderItem={({ item, index }) => (
            <AssetBoxSimplex
              asset={item}
              index={index}
              navigation={navigation}
            />
          )}
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
          listRef={flatListRef}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default memo(QuotesSimplex);
