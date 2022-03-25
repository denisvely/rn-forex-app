import React from "react";
import Spinner from "../../../Spinner/Spinner";

const StopLossPrice = ({ spinnerValue, onSpinnerChange, placeholder }) => {
  return (
    <Spinner
      spinnerValue={spinnerValue}
      onSpinnerChange={(orderType) => onSpinnerChange(orderType)}
      placeholder={placeholder}
    />
  );
};

export default StopLossPrice;
