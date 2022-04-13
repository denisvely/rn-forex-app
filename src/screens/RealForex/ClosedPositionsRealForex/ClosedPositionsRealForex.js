import React, { useRef, useState } from "react";
import { View, Pressable, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  LazyFlatList,
  ClosedPositionsTradeBox,
  Typography,
  Datepicker,
} from "../../../components";
import {
  getRealForexClosedPositions,
  getClosedPositions,
} from "../../../store/realForex";
import { deviceWidth } from "../../../utils";
import { tabStackIcons } from "../../../assets/svg/tabStackIcons/";
import { SvgXml } from "react-native-svg";

import styles from "./closedPositionsRealForexStyles";

const ClosedPositionsRealForex = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isPickerFromDateShow, setIsPickerFromDateShow] = useState(false);
  const [isPickerToDateShow, setIsPickerToDateShow] = useState(false);
  const [fromDate, setFromDate] = useState(new Date(Date.now()));
  const [toDate, setToDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1))
  );
  const closedPositionsRef = useRef();
  const closedPositions = useSelector((state) =>
    getRealForexClosedPositions(state)
  );

  const onChangeFromDate = (value) => {
    if (value !== null) {
      setFromDate(value);
      getClosedPositions(dispatch, {
        fromDate: value,
        toDate: toDate,
        positionId: null,
        tradableAssetId: null,
      });
    }
    setIsPickerFromDateShow(false);
  };

  const onChangeToDate = (value) => {
    if (value !== null) {
      setToDate(value);

      if (Date.parse(value) < Date.parse(fromDate)) {
        setFromDate(value);
        getClosedPositions(dispatch, {
          fromDate: value,
          toDate: value,
          positionId: null,
          tradableAssetId: null,
        });
      } else {
        getClosedPositions(dispatch, {
          fromDate: fromDate,
          toDate: value,
          positionId: null,
          tradableAssetId: null,
        });
      }
    }
    setIsPickerToDateShow(false);
  };

  return (
    <View style={styles.container}>
      <Datepicker
        modalState={isPickerFromDateShow}
        toggleModal={onChangeFromDate}
        datepickerDate={fromDate}
        maxDate={toDate}
      />
      <Datepicker
        modalState={isPickerToDateShow}
        toggleModal={onChangeToDate}
        datepickerDate={toDate}
      />
      <View style={styles.closePositionFilterWrapper}>
        <SvgXml
          xml={tabStackIcons["closedPositions"][0]}
          width="16"
          height="16"
        />
        <View style={styles.closePositionFilter}>
          <Pressable
            onPress={() => setIsPickerFromDateShow(!isPickerFromDateShow)}
          >
            <Typography
              name="small"
              text={moment(fromDate).format("DD-MM-YYYY")}
              style={styles.dateString}
            />
          </Pressable>
          <Typography name="small" text={"-"} />
          <Pressable onPress={() => setIsPickerToDateShow(!isPickerToDateShow)}>
            <Typography
              name="small"
              text={moment(toDate).format("DD-MM-YYYY")}
              style={styles.dateString}
            />
          </Pressable>
        </View>
      </View>
      {closedPositions ? (
        <LazyFlatList
          list={closedPositions}
          renderItem={({ item }) => {
            return (
              <ClosedPositionsTradeBox item={item} navigation={navigation} />
            );
          }}
          keyExtractor={(item) => item.positionId}
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
          listRef={closedPositionsRef}
        />
      ) : (
        <View style={styles.noTrades}>
          <Typography name="largeBold" text={"No trades found."} />
        </View>
      )}
    </View>
  );
};

export default ClosedPositionsRealForex;
