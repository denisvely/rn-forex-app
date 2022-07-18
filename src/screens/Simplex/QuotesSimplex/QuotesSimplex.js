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
    // Use viewable items in state or as intended
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const simplexOptionsByType = useSelector((state) =>
    getSimplexOptionsByType(state)
  );
  const [activeFilter, setActiveFilter] = useState("All");

  // we set the height of item is fixed
  const getItemLayout = (data, index) => ({
    length: 120,
    offset: 84 * index,
    index,
  });

  const ItemDivider = () => {
    return <View style={styles.itemDivider} />;
  };

  const checkAvailableForTrading = (id, expirationDate) => {
    if (!simplexOptionsByType.All[id].rules.length) {
      return false;
    } else {
      var currTime =
          expirationDate == null ? new Date() : new Date(expirationDate),
        availableForTrading = false;

      for (let i = 0; i < simplexOptionsByType.All[id].rules.length; i++) {
        var dateFrom = new Date(
            simplexOptionsByType.All[id].rules[i].dates.from.dateTime
          ),
          dateTo = new Date(
            simplexOptionsByType.All[id].rules[i].dates.to.dateTime
          );

        if (currTime > dateFrom && currTime < dateTo) {
          availableForTrading =
            simplexOptionsByType.All[id].rules[i].availableForTrading;
        }
      }

      return availableForTrading;
    }
  };

  const renderAssetBox = ({ item }) => (
    <AssetBoxSimplex
      asset={item}
      marketClosed={!checkAvailableForTrading(item.id, null)}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      <AssetsFilterSimplex
        activeFilter={activeFilter}
        changeActiveFilter={(translation) => setActiveFilter(translation)}
      />
      {simplexOptionsByType ? (
        <FlatList
          data={Object.values(simplexOptionsByType[activeFilter])}
          renderItem={renderAssetBox}
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
          getItemLayout={getItemLayout}
          ItemSeparatorComponent={ItemDivider}
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={6} // Reduce initial render amount
          maxToRenderPerBatch={6} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default memo(QuotesSimplex);
