import React, { useRef, useState } from "react";
import { View, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  LazyFlatList,
  ClosedPositionsSimplexTradeBox,
  Typography,
  Datepicker,
} from "../../../components";
import {
  getSimplexClosedPositions,
  getClosedPositions,
} from "../../../store/simplex";
import { deviceWidth } from "../../../utils";
import { tabStackIcons } from "../../../assets/svg/tabStackIcons/";
import { SvgXml } from "react-native-svg";
import styles from "./closedPositionsSimplexStyles";

const ClosedPositionsSimplex = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isPickerFromDateShow, setIsPickerFromDateShow] = useState(false);
  const [isPickerToDateShow, setIsPickerToDateShow] = useState(false);
  const [fromDate, setFromDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [toDate, setToDate] = useState(new Date(Date.now()));
  const closedPositionsRef = useRef();
  const closedPositions = useSelector((state) =>
    getSimplexClosedPositions(state)
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
      setIsPickerFromDateShow(false);
    }
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

  const getClosedPos = () => {
    getClosedPositions(dispatch, {
      fromDate: value,
      toDate: toDate,
      positionId: null,
      tradableAssetId: null,
    });
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
              <ClosedPositionsSimplexTradeBox
                item={item}
                navigation={navigation}
                getPositions={getClosedPos}
              />
            );
          }}
          keyExtractor={(item) => item.orderId}
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

export default ClosedPositionsSimplex;
