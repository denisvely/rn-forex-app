import React, { useState } from "react";
import { View } from "react-native";
import TakeProfitPending from "../TakeProfitPending/TakeProfitPending";
import StopLossPending from "../StopLossPending/StopLossPending";
import { deviceWidth } from "../../../utils";
import PendingDirectionAndRate from "./components/PendingDirectionAndRate/PendingDirectionAndRate";
import { ExpirationDate } from "../../../components";


const PendingOrderControls = ({ pendingState, setPendingState }) => {
  return (
    <View style={{ width: deviceWidth }}>
      <PendingDirectionAndRate
        isBuy={pendingState.isBuyPending}
        changeDirection={(isBuy) =>
          setPendingState((prevState) => ({
            ...prevState,
            isBuyPending: isBuy,
          }))
        }
        rateValue={pendingState.pendingPrice}
        onRateValueChange={(rateValue) =>
          setPendingState((prevState) => ({
            ...prevState,
            pendingPrice: rateValue,
          }))
        }
      />
      <TakeProfitPending
        pendingState={pendingState}
        setPendingState={setPendingState}
      />
      <StopLossPending
        pendingState={pendingState}
        setPendingState={setPendingState}
      />
      <ExpirationDate
        pendingState={pendingState}
        setPendingState={setPendingState}
      />
    </View>
  );
};

export default PendingOrderControls;
