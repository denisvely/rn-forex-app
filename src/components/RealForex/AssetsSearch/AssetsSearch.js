import React, { useRef } from "react";
import { View, TextInput, TouchableHighlight } from "react-native";
import { SvgXml } from "react-native-svg";
import { Typography, LazyFlatList } from "components";

import { colors } from "constants";
import search from "../../../assets/svg/realForex/search";

import styles from "./assetsSearchStyles";

const AssetsSearch = ({
  value,
  onChange,
  assets,
  navigation,
  emptyFoundAssets,
}) => {
  const foundAssetsRef = useRef();

  const tradeAsset = (asset) => {
    emptyFoundAssets();
    onChange("");
    navigation.navigate("RealForexOrderChart", { asset });
  };

  return (
    <View style={styles.searchWrapper}>
      <SvgXml
        styles={styles.searchIcon}
        xml={search}
        width="20"
        height="22"
        fill={colors.iconsColor}
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChange}
        value={value}
        placeholder="Search"
        placeholderTextColor={colors.fontSecondaryColor}
        style={styles.searchInput}
      />
      {assets.length > 0 && (
        <View style={styles.foundAssets}>
          <LazyFlatList
            list={assets}
            renderItem={({ item, index }) => {
              return (
                <TouchableHighlight
                  style={styles.asset}
                  onPress={() => tradeAsset(item)}
                  activeOpacity={0.1}
                  underlayColor={colors.containerBackground}
                >
                  <Typography
                    name="normal"
                    text={item.name}
                    style={styles.assetName}
                  />
                </TouchableHighlight>
              );
            }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
            style={styles.flatListContainer}
            listRef={foundAssetsRef}
          />
        </View>
      )}
    </View>
  );
};

export default AssetsSearch;
