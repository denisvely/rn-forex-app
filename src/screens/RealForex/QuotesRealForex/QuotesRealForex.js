import React, { useState, useRef } from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { getRealForexOptionsByType } from "../../../store/realForex";
import {
  AssetBox,
  AssetsFilter,
  Loading,
  AssetsSearch,
} from "../../../components";
import { deviceWidth } from "../../../utils";

import styles from "./quotesStyles";

const Quotes = ({ navigation }) => {
  const onViewRef = useRef((viewableItems) => {
    // Use viewable items in state or as intended
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 100 });
  const realForexOptionsByType = useSelector((state) =>
    getRealForexOptionsByType(state)
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchString, onChangeSearchField] = useState("");
  const [foundAssets, setFoundAssets] = useState([]);

  const searchAsset = (str) => {
    if (!str && !str !== "") {
      setFoundAssets([]);
      return;
    }
    const searchStr = str.toLowerCase();
    let curAsset;

    const matchedAssets = [];
    for (const [i, asset] of Object.entries(realForexOptionsByType["All"])) {
      curAsset = asset.name.toLowerCase();
      if (curAsset.search(searchStr) != -1) {
        matchedAssets.push(asset);
      }
    }

    if (matchedAssets.length > 1) {
      addAssetsDropDownList(matchedAssets);
    }
  };

  const addAssetsDropDownList = (matchedAssets) => {
    setFoundAssets(matchedAssets);
  };

  const checkAvailableForTrading = (id) => {
    if (!realForexOptionsByType.All[id].rules.length) {
      return false;
    } else {
      var currTime = new Date(),
        availableForTrading = false;

      for (let i = 0; i < realForexOptionsByType.All[id].rules.length; i++) {
        var dateFrom = new Date(
            realForexOptionsByType.All[id].rules[i].dates.from.dateTime
          ),
          dateTo = new Date(
            realForexOptionsByType.All[id].rules[i].dates.to.dateTime
          );

        if (currTime > dateFrom && dateFrom < dateTo) {
          availableForTrading =
            realForexOptionsByType.All[id].rules[i].availableForTrading;
        }
      }

      return availableForTrading;
    }
  };
  const renderAssetBox = ({ item }) => (
    <AssetBox
      asset={item}
      marketClosed={!checkAvailableForTrading(item.id)}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 2 }}>
        <AssetsFilter
          activeFilter={activeFilter}
          changeActiveFilter={(translation) => setActiveFilter(translation)}
        />
        <AssetsSearch
          value={searchString}
          onChange={(str) => {
            onChangeSearchField(str), searchAsset(str);
          }}
          assets={foundAssets}
          emptyFoundAssets={() => setFoundAssets([])}
          navigation={navigation}
        />
      </View>
      <View style={{ zIndex: 1 }}>
        {realForexOptionsByType ? (
          <FlatList
            initialNumToRender={6}
            removeClippedSubviews={true}
            maxToRenderPerBatch={6}
            windowSize={1}
            horizontal={false}
            onViewableItemsChanged={onViewRef.current}
            data={Object.values(realForexOptionsByType[activeFilter])}
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
            renderItem={renderAssetBox}
          />
        ) : (
          <Loading size="large" />
        )}
      </View>
    </View>
  );
};

export default Quotes;
