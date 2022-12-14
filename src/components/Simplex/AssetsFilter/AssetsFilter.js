import React from "react";
import { useTranslation } from "react-i18next";
import { View, ScrollView, Pressable } from "react-native";
import Typography from "../../../components/Typography/Typography";
import styles from "./assetsFilterStyles";

const simplexFilters = [
  {
    translation: "All",
  },
  {
    translation: "Currencies",
  },
  {
    translation: "CryptoCoins",
  },
  {
    translation: "CryptoTokens",
  },
  {
    translation: "Indices",
  },
  {
    translation: "Commodities",
  },
  {
    translation: "Futures",
  },
  {
    translation: "Favourites",
  },
];

const AssetsFilterSimplex = ({ activeFilter, changeActiveFilter }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.scrollViewContainer}>
      <ScrollView
        horizontal={true}
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          height: 60,
          alignItems: "center",
          justifyContent: "flex-start",
          flexGrow: 1,
          paddingHorizontal: 16,
        }}
      >
        {simplexFilters.map(({ translation }) => {
          return (
            <Pressable
              onPress={() => changeActiveFilter(translation)}
              style={styles.filterButton}
              key={translation}
            >
              <Typography
                name="normal"
                style={
                  translation === activeFilter
                    ? styles.filterNameActive
                    : styles.filterName
                }
                text={t(`realForex.${translation}`)}
              />
              {translation === activeFilter && (
                <View style={styles.activeFilter} />
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AssetsFilterSimplex;
