import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "store/app";
import { getRealForexOptions } from "store/realForex";
import { LazyFlatList, AssetBox } from "components";
import { logout } from "store/app/actions";
import { assetIcon } from "../../../assets/svg/assetIcons/assetsIcons";
import { colors } from "constants";

import styles from "./quotesStyles";
import { deviceWidth } from "../../../utils";

const Quotes = ({ navigation }) => {
  const flatListRef = useRef();
  const realForexOptions = useSelector((state) => getRealForexOptions(state));

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
          data={realForexOptions}
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
