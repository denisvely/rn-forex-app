import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { View, Pressable } from "react-native";
import { Typography, SwitchComponent } from "../../../components";
import { getUser, setUser } from "../../../store/app";
import TradingModes from "./TradingModes/TradingModes";
import ChartTimezone from "./ChartTimezone/ChartTimezone";

import styles from "./settingsStyles";

const TradingSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => getUser(state));
  const [userForexModeId, setUserForexModeId] = useState(user.forexModeId);
  const [isHedgnetActive, setHedgnet] = useState(
    user.forexModeId === 3 && user.forexMarginModeId === 1 ? true : false
  );

  const changeModeId = (id) => {
    setUserForexModeId(id);
    user.forexModeId = id;
    setUser(dispatch, user);
  };

  return (
    <View style={styles.container}>
      <TradingModes />
      <ChartTimezone />
    </View>
  );
};

export default TradingSettings;
