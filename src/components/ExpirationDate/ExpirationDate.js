import React, { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import moment from "moment";
import { SvgXml } from "react-native-svg";
import { useTranslation } from "react-i18next";

import { Typography, Datepicker } from "../../components";
import { tabStackIcons } from "../../assets/svg/tabStackIcons/";
import platfromIcons from "../../assets/svg/platformIcons/platfromIcons";

import styles from "./expirationDateStyles";

const ExpirationDate = ({ pendingState, setPendingState }) => {
  const { t } = useTranslation();
  const [isPickerExpDateShow, setIsPickerExpDateShow] = useState(false);
  const [isPickerExpTimeShow, setIsPickerExpTimeShow] = useState(false);

  const onChangeExpDate = (value) => {
    if (value !== null) {
      setPendingState((prevState) => ({
        ...prevState,
        pendingExpirationDate: value,
      }));
    }
    setIsPickerExpDateShow(false);
  };

  const onChangeExpTime = (value) => {
    if (value !== null) {
      setPendingState((prevState) => ({
        ...prevState,
        pendingExpirationTime: value,
      }));
    }
    setIsPickerExpTimeShow(false);
  };

  return (
    <View style={styles.expirationInputsWrapper}>
      {/* Date */}
      <Datepicker
        modalState={isPickerExpDateShow}
        toggleModal={onChangeExpDate}
        datepickerDate={
          pendingState.pendingExpirationDate
            ? pendingState.pendingExpirationDate
            : new Date(Date.now())
        }
        minDate={new Date(Date.now())}
      />
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
            pendingState.pendingExpirationDate
              ? moment(pendingState.pendingExpirationDate).format("DD-MM-YYYY")
              : "GTC"
          }
          style={styles.dateString}
        />
      </Pressable>
      {/* Time */}
      <Datepicker
        modalState={isPickerExpTimeShow}
        toggleModal={onChangeExpTime}
        datepickerDate={
          pendingState.pendingExpirationTime
            ? pendingState.pendingExpirationTime
            : new Date(Date.now())
        }
        mode="time"
      />
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
            pendingState.pendingExpirationTime
              ? moment(pendingState.pendingExpirationTime).format("HH:mm")
              : ""
          }
          style={styles.dateString}
        />
      </Pressable>
    </View>
  );
};

export default ExpirationDate;
