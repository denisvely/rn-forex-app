import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import {
  QuantityInput,
  TakeProfitPending,
  StopLossPending,
  OrderInfo,
} from "../../../components";
import { deviceWidth } from "../../../utils";
import { getSelectedAsset } from "../../../store/realForex";
import PendingDirectionAndRate from "./components/PendingDirectionAndRate/PendingDirectionAndRate";

import styles from "./pendingOrderControlsStyles";

const PendingOrderControls = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));

  const [takeProfitPendingAmount, onChangeTakeProfitPendingAmount] =
    useState(null);
  const [takeProfitPendingDistance, onChangeTakeProfitPendingDistance] =
    useState(null);
  const [stopLossPendingAmount, onChangeStopLossPendingAmount] = useState(null);
  const [stopLossPendingDistance, onChangeStopLossPendingDistance] =
    useState(null);
  const [quantity, setQuantity] = useState(null);
  const [isBuy, setDirection] = useState(true);
  const [rateValue, setRateValue] = useState(null);

  useEffect(() => {
    if (selectedAsset) {
      setQuantity(`${selectedAsset.quantity}`);
    }
  }, [selectedAsset]);
  return (
    <ScrollView
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
        width: deviceWidth,
        flexGrow: 1,
        paddingBottom: 200,
      }}
    >
      <View style={{ width: deviceWidth }}>
        <QuantityInput
          value={quantity}
          onChange={(text) => setQuantity(text)}
        />
        <PendingDirectionAndRate
          isBuy={isBuy}
          changeDirection={(isBuy) => setDirection(isBuy)}
          rateValue={rateValue}
          onRateValueChange={(value) => setRateValue(value)}
        />
        <TakeProfitPending
          takeProfitPendingAmount={takeProfitPendingAmount}
          onChangeTakeProfitPendingAmount={(value) =>
            onChangeTakeProfitPendingAmount(value)
          }
          takeProfitPendingDistance={takeProfitPendingDistance}
          onChangeTakeProfitPendingDistance={(value) =>
            onChangeTakeProfitPendingDistance(value)
          }
        />
        <StopLossPending
          stopLossPendingAmount={stopLossPendingAmount}
          onChangeStopLossPendingAmount={(value) =>
            onChangeStopLossPendingAmount(value)
          }
          stopLossPendingDistance={stopLossPendingDistance}
          onChangeStopLossPendingDistance={(value) =>
            onChangeStopLossPendingDistance(value)
          }
        />
        <OrderInfo />
      </View>
    </ScrollView>
  );
};

export default PendingOrderControls;
