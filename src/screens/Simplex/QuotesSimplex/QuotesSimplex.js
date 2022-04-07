import React, { useState, useRef, memo } from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { getSimplexOptionsByType } from "../../../store/simplex";
import {
  AssetBoxSimplex,
  AssetsFilterSimplex,
  Loading,
} from "../../../components";
import styles from "./quotesStyles";
import { deviceWidth } from "../../../utils";

const QuotesSimplex = ({ navigation }) => {
  const onViewRef = useRef((viewableItems) => {
    console.log(viewableItems);
    // Use viewable items in state or as intended
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
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
        <FlatList
          removeClippedSubviews
          data={Object.values(simplexOptionsByType[activeFilter])}
          renderItem={({ item, index }) => {
            return (
              <AssetBoxSimplex
                asset={item}
                index={index}
                navigation={navigation}
              />
            );
          }}
          horizontal={false}
          onViewableItemsChanged={onViewRef.current}
          keyExtractor={(item) => item.id}
          viewabilityConfig={viewConfigRef.current}
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
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default memo(QuotesSimplex);
