import React, { useState, useRef, memo } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import { getRealForexOptionsByType } from "../../../store/realForex";
import {
  LazyFlatList,
  AssetBox,
  AssetsFilter,
  Loading,
  AssetsSearch,
} from "../../../components";
import { assetIcon } from "../../../assets/svg/assetIcons/assetsIcons";

import styles from "./quotesStyles";
import { deviceWidth } from "../../../utils";

const Quotes = ({ navigation }) => {
  const flatListRef = useRef();
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
          <LazyFlatList
            list={Object.values(realForexOptionsByType[activeFilter])}
            renderItem={({ item, index }) => {
              return (
                <AssetBox
                  asset={item}
                  index={index}
                  navigation={navigation}
                  icon={assetIcon}
                />
              );
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
            listRef={flatListRef}
          />
        ) : (
          <Loading />
        )}
      </View>
    </View>
  );
};

export default memo(Quotes);
