import React, { useState } from "react";
import { View } from "react-native";

import {
  TakeProfitPending,
  StopLossPending,
  OrderInfo,
} from "../../../components";
import { deviceWidth } from "../../../utils";
import PendingDirectionAndRate from "./components/PendingDirectionAndRate/PendingDirectionAndRate";

import styles from "./pendingOrderControlsStyles";

const PendingOrderControls = () => {
  const [takeProfitPendingAmount, onChangeTakeProfitPendingAmount] =
    useState(null);
  const [takeProfitPendingDistance, onChangeTakeProfitPendingDistance] =
    useState(null);
  const [stopLossPendingAmount, onChangeStopLossPendingAmount] = useState(null);
  const [stopLossPendingDistance, onChangeStopLossPendingDistance] =
    useState(null);
  const [isBuy, setDirection] = useState(true);
  const [rateValue, setRateValue] = useState(null);

  return (
    <View style={{ width: deviceWidth }}>
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
  );
};

export default PendingOrderControls;
