import React, { useRef } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { LazyFlatList, Typography } from "../../../../../components";
import { deviceWidth } from "../../../../../utils";

import styles from "./myDocumentsStyles";
import { colors } from "../../../../../constants";

const MyDocuments = ({ route }) => {
  const documents = route.params.documents;
  const flatListRef = useRef();
  const { t } = useTranslation();

  const renderDocument = (item) => {
    const docState =
      item.DocumentStatus < 2
        ? t(`common-labels.pending`)
        : item.DocumentStatus < 3
        ? t(`common-labels.approved`)
        : t(`common-labels.notApproved`);

    return (
      <View style={styles.documentRow}>
        <View style={styles.left}>
          <Typography text={item.DocumentName} name="small" />
          <Typography
            text={item.DocumentType}
            name="small"
            style={styles.secondaryText}
          />
        </View>
        <View style={styles.right}>
          <Typography
            text={docState}
            name="small"
            style={{
              color:
                item.DocumentStatus < 2
                  ? colors.orange
                  : item.DocumentStatus < 3
                  ? colors.buyColor
                  : colors.sellColor,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LazyFlatList
        list={documents}
        renderItem={({ item }) => renderDocument(item)}
        keyExtractor={(item, index) => item.index}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 16,
          width: deviceWidth - 32,
          justifyContent: "flex-start",
          alignItems: "center",
          alignSelf: "center",
          flexGrow: 1,
          height: "100%",
        }}
        style={styles.flatListContainer}
        listRef={flatListRef}
      />
    </View>
  );
};

export default MyDocuments;
