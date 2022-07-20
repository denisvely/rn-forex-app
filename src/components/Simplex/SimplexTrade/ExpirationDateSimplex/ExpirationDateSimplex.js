import React, { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import moment from "moment";
import { SvgXml } from "react-native-svg";
import { useTranslation } from "react-i18next";

import { Typography, Datepicker } from "../../../../components";
import { tabStackIcons } from "../../../../assets/svg/tabStackIcons";
import platfromIcons from "../../../../assets/svg/platformIcons/platfromIcons";

import styles from "./expirationDateStyles";

const ExpirationDateSimplex = ({ state, setState, disabled }) => {
  const { t } = useTranslation();
  const [isPickerExpDateShow, setIsPickerExpDateShow] = useState(false);
  const [isPickerExpTimeShow, setIsPickerExpTimeShow] = useState(false);

  const onChangeExpDate = (value) => {
    if (disabled) {
      return;
    }
    if (value !== null) {
      setState((prevState) => ({
        ...prevState,
        expirationDate: value,
      }));
    }
    setIsPickerExpDateShow(false);
  };

  const onChangeExpTime = (value) => {
    if (disabled) {
      return;
    }
    if (value !== null) {
      setState((prevState) => ({
        ...prevState,
        expirationTime: value,
      }));
    }
    setIsPickerExpTimeShow(false);
  };

  return (
    <View
      style={{ ...styles.expirationInputsWrapper, opacity: disabled ? 0.2 : 1 }}
    >
      {/* Date */}
      {!disabled && (
        <Datepicker
          modalState={isPickerExpDateShow}
          toggleModal={onChangeExpDate}
          datepickerDate={
            state.expirationDate ? state.expirationDate : new Date(Date.now())
          }
          minDate={new Date(Date.now())}
        />
      )}
      <View style={styles.expirationHeader}>
        <Typography
          text={t("common-labels.expiryDate")}
          style={styles.expirationHeaderTitle}
          name="normal"
        />
      </View>
      <Pressable
        onPress={() => setIsPickerExpDateShow(!isPickerExpDateShow)}
        style={styles.expirationWrapper}
      >
        <SvgXml
          xml={tabStackIcons["closedPositions"][0]}
          style={{ position: "absolute", left: 28 }}
          width="20"
          height="20"
        />
        <Typography
          name="small"
          text={
            state.expirationDate
              ? moment(state.expirationDate).format("DD-MM-YYYY")
              : "GTC"
          }
          style={styles.dateString}
        />
      </Pressable>
      {/* Time */}
      {!disabled && (
        <Datepicker
          modalState={isPickerExpTimeShow}
          toggleModal={onChangeExpTime}
          datepickerDate={
            state.expirationTime ? state.expirationTime : new Date(Date.now())
          }
          mode="time"
        />
      )}
      <View style={styles.expirationHeader}>
        <Typography
          text={t("common-labels.expiryTime")}
          style={styles.expirationHeaderTitle}
          name="normal"
        />
      </View>
      <Pressable
        onPress={() => setIsPickerExpTimeShow(!isPickerExpTimeShow)}
        style={styles.expirationWrapper}
      >
        <SvgXml
          xml={platfromIcons["time"][0]}
          style={{ position: "absolute", left: 28 }}
          width="20"
          height="20"
        />
        <Typography
          name="small"
          text={
            state.expirationTime
              ? moment(state.expirationTime).format("HH:mm")
              : ""
          }
          style={styles.dateString}
        />
      </Pressable>
    </View>
  );
};

export default ExpirationDateSimplex;
