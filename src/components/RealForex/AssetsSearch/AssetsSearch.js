import React, { useRef, useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import Typography from "../../Typography/Typography";
import LazyFlatList from "../../LazyFlatList/LazyFlatList";
import { colors } from "../../../constants";
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

  useEffect(() => {
    return () => {
      emptyFoundAssets();
      onChange("");
    };
  }, []);

  return (
    <View style={styles.searchWrapper}>
      <View style={styles.inputWrapper}>
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
      </View>
      {assets.length > 0 ? (
        <View style={styles.foundAssets}>
          <LazyFlatList
            list={assets}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
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
                </TouchableOpacity>
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
      ) : null}
    </View>
  );
};

export default AssetsSearch;
