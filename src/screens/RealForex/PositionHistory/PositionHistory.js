import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import moment from "moment";

import { Typography, LazyFlatList } from "../../../components";
import { deviceWidth } from "../../../utils";
import realForexServices from "../../../services/realForexServices";
import { convertUTCDateToLocalDate } from "../../../store/realForex/helpers";
import styles from "./positionHistoryStyles";

const getPositionInfo = realForexServices.getPositionInfo();

const PositionHistory = ({ route, navigation }) => {
  const positionId = route.params.positionId;
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
          <View style={styles.left}>
            <Typography name="normalBold" text={item.Action} />
          </View>
          <View style={styles.right}>
            <Typography
              name="tiny"
              text={`${
                item.OrderType == "MO" ? "Market Order: " : "Pending Order: "
              } ${item.OrderType}${item.OrderId}`}
            />
          </View>
        </View>

        <View style={styles.posRowBody}>
          <View style={styles.leftBody}>
            <Typography
              name="normalBold"
              text={moment(
                convertUTCDateToLocalDate(
                  new Date(item.DateCreated),
                  "yyyy-mm-dd HH:MM:ss"
                )
              ).format("YYYY-MM-DD HH:MM:ss")}
            />
          </View>
          <View style={styles.rightBody}>
            <View>
              <Typography name="normalBold" text={"Execution price:"} />
              <Typography name="normalBold" text={item.ExecutionPrice} />
            </View>
            <View>
              <Typography name="normalBold" text={item.Direction} />
              <Typography name="normalBold" text={item.Quantity} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {posData ? (
        <>
          <View style={styles.posIdHeader}>
            <View style={styles.left}>
              <Typography
                style={styles.posId}
                text={"POS" + positionId}
                name="mediumBold"
              />
              <Typography
                style={styles.posIdAssetName}
                text={posData[0].Description}
                name="small"
              />
            </View>
            <View style={styles.right}>
              <Typography
                style={styles.posIdHeaderTitle}
                text={"Result"}
                name="small"
              />
              <Typography
                style={styles.posIdHeaderTitle}
                text={"$ 0"}
                name="small"
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
                width: deviceWidth,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginTop: 16,
              }}
              style={styles.flatListContainer}
              listRef={flatListRef}
            />
          </View>
        </>
      ) : (
        <View>
          <Typography name="largeBold" text={"No data found."} />
        </View>
      )}
    </View>
  );
};

export default PositionHistory;
