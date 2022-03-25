import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { TakeProfit, StopLoss, OrderInfo } from "../../../components";
import { deviceWidth } from "../../../utils";
import {
  getSelectedAsset,
  getCurrentTrade,
  getRealForexTradingSettings,
} from "../../../store/realForex";
import {
  convertUnits,
  formatDeciamlWithComma,
} from "../../../store/realForex/helpers";

import styles from "./marketOrderControlsStyles";

const MarketOrderControls = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));

  return (
    <View style={{ width: deviceWidth }}>
      <TakeProfit />
      <StopLoss />
      <OrderInfo />
    </View>
  );
};

export default MarketOrderControls;
