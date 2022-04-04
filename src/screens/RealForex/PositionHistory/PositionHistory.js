import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import moment from "moment";

import {
  Typography,
  LazyFlatList,
  FormattedTypographyWithCurrency,
  Loading,
} from "../../../components";
import { deviceHeight, deviceWidth } from "../../../utils";
import realForexServices from "../../../services/realForexServices";
import { convertUTCDateToLocalDate } from "../../../store/realForex/helpers";
import { colors } from "../../../constants";

import styles from "./positionHistoryStyles";

const getPositionInfo = realForexServices.getPositionInfo();

const PositionHistory = ({ route, navigation }) => {
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
              text={`${
                item.OrderType == "MO" ? "Market Order: " : "Pending Order: "
              }`}
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
                convertUTCDateToLocalDate(
                  new Date(item.DateCreated),
                  "yyyy-mm-dd HH:MM:ss"
                )
              ).format("YYYY-MM-DD HH:MM:ss")}
              style={styles.centerAligned}
            />
          </View>
          <View style={styles.rightBody}>
            <View>
              <Typography
                name="small"
                text={"Execution price:"}
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
              <FormattedTypographyWithCurrency
                name="small"
                style={styles.posIdHeaderTitle}
                text={result}
              />
            </View>
          </View>
          <View style={{ zIndex: 1 }}>
            <LazyFlatList
              removeClippedSubviews
              list={posData}
              renderItem={({ item }) => renderPositionHistoryRow(item)}
              keyExtractor={(item) => item.OrderId}
              showsVerticalScrollIndicator={true}
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
      {posData &&
      posData[0].Action.toLowerCase() == "closed" &&
      posData[0].AverageClosePrice > 0 ? (
        <View style={styles.posIdHeader}>
          <View style={styles.left}>
            <Typography
              name="small"
              style={styles.secondaryLabel}
              text={"Average Close Price:"}
            />
            <Typography name="small" text={item.AverageClosePrice} />
          </View>
          <View style={styles.right}>
            <Typography
              name="small"
              style={styles.secondaryLabel}
              text={item.PositionDirection}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default PositionHistory;
