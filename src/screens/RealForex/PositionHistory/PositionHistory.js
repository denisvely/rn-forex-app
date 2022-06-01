import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import moment from "moment";
import { useTranslation } from "react-i18next";

import {
  Typography,
  LazyFlatList,
  FormattedTypographyWithCurrency,
  Loading,
} from "../../../components";
import { deviceWidth } from "../../../utils";
import realForexServices from "../../../services/realForexServices";
import { convertUTCDateToLocalDate } from "../../../store/realForex/helpers";
import { colors } from "../../../constants";

import styles from "./positionHistoryStyles";

const getPositionInfo = realForexServices.getPositionInfo();

const PositionHistory = ({ route, navigation }) => {
  const { t } = useTranslation();
  const positionId = route.params.positionId;
  const result = route.params.result;
  const [posData, setPosData] = useState(null);
  const flatListRef = useRef();

  useEffect(() => {
    if (positionId) {
      getPositionInfo
        .fetch({
          posId: positionId,
        })
        .then(({ response }) => {
          if (response.body.code == 200) {
            if (response.body.data.length > 0) {
              setPosData(response.body.data);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [route.params]);

  const renderPositionHistoryRow = (item) => {
    return (
      <View style={styles.posRow}>
        <View style={styles.posRowHeader}>
          <View style={styles.leftHeader}>
            <View
              style={{
                ...styles.actionBox,
                backgroundColor:
                  item.Action === "Opened"
                    ? colors.buyColor
                    : item.Action === "Modified"
                    ? colors.blueColor
                    : colors.sellColor,
              }}
            >
              <Typography
                name="smallBold"
                text={item.Action}
                style={styles.actionLabel}
              />
            </View>
          </View>
          <View style={styles.rightHeader}>
            <Typography
              name="small"
              style={styles.secondaryLabel}
              text={
                item.OrderType == "MO"
                  ? t("common-labels.marketOrder")
                  : t("common-labels.pendingOrder")
              }
            />
            <Typography
              name="small"
              text={` ${item.OrderType}${item.OrderId}`}
            />
          </View>
        </View>
        <View style={styles.posRowBody}>
          <View style={styles.leftBody}>
            <Typography
              name="tiny"
              text={moment(
                convertUTCDateToLocalDate(new Date(item.DateCreated))
              ).format("YYYY-MM-DD HH:mm:ss")}
              style={styles.centerAligned}
            />
          </View>
          <View style={styles.rightBody}>
            <View>
              <Typography
                name="small"
                text={t("common-labels.averageClosePrice")}
                style={styles.secondaryLabel}
              />
              <Typography name="small" text={item.ExecutionPrice} />
            </View>
            <View style={styles.quantityBox}>
              {/* <Typography name="small" text={item.Direction} /> */}
              <Typography
                name="small"
                text={item.Quantity}
                style={item.Direction === "Buy" ? styles.buy : styles.sell}
              />
            </View>
          </View>
        </View>

        {item.Action.toLowerCase() == "closed" && item.AverageClosePrice > 0 ? (
          <View style={styles.posRowAveragePrice}>
            <View style={styles.leftAvg}>
              <Typography
                name="small"
                style={styles.secondaryLabel}
                text={t("common-labels.averageClosePrice")}
              />
              <Typography name="small" text={item.AverageClosePrice} />
            </View>
            <View style={styles.rightAvg}>
              <Typography
                name="small"
                style={styles.secondaryLabel}
                text={item.PositionDirection}
              />
              <Typography name="small" text={0} style={{ paddingLeft: 5 }} />
            </View>
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {posData ? (
        <View style={styles.positionContainer}>
          <View style={styles.posIdHeader}>
            <View style={styles.left}>
              <Typography
                style={styles.posId}
                text={"POS" + positionId}
                name="small"
              />
              <Typography
                style={styles.posIdAssetName}
                text={posData[0].Description}
                name="tiny"
              />
            </View>
            <View style={styles.right}>
              {posData[posData.length - 1].Action == "Closed" ? (
                <FormattedTypographyWithCurrency
                  name="small"
                  style={styles.posIdHeaderTitle}
                  text={parseFloat(posData[posData.length - 1].Profit).toFixed(
                    2
                  )}
                />
              ) : (
                <FormattedTypographyWithCurrency
                  name="small"
                  style={styles.posIdHeaderTitle}
                  text={result}
                />
              )}
            </View>
          </View>
          <View style={{ zIndex: 1 }}>
            <LazyFlatList
              removeClippedSubviews
              list={posData}
              renderItem={({ item }) => renderPositionHistoryRow(item)}
              keyExtractor={(item) => item.OrderId}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 0,
                width: deviceWidth - 64,
                justifyContent: "flex-start",
                alignItems: "center",
                alignSelf: "center",
              }}
              style={styles.flatListContainer}
              listRef={flatListRef}
            />
          </View>
        </View>
      ) : (
        <Loading size="large" />
      )}
    </View>
  );
};

export default PositionHistory;
