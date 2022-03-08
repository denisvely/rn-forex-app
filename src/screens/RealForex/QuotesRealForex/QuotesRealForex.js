import React, { useState, useEffect, useRef, memo } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getRealForexOptions, getRealForexPrices } from "store/realForex";
import { LazyFlatList, AssetBox } from "components";
import { assetIcon } from "../../../assets/svg/assetIcons/assetsIcons";
import { colors } from "constants";

import styles from "./quotesStyles";
import { deviceWidth } from "utils";

const Quotes = ({ navigation }) => {
  const flatListRef = useRef();
  const realForexOptions = useSelector((state) => getRealForexOptions(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));

  // console.log(realForexPrices);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.containerBackground,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {realForexOptions && (
        <LazyFlatList
          list={realForexOptions}
          renderItem={({ item, index }) => {
            return (
              <AssetBox
                option={item}
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
          }}
          style={styles.flatListContainer}
          listRef={flatListRef}
        />
      )}
    </View>
  );
};

export default memo(Quotes);
