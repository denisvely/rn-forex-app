import React from "react";
import InputSpinner from "react-native-input-spinner";
import { colors } from "../../constants";
import styles from "./spinnerStyles";

const Spinner = ({
  spinnerValue,
  onSpinnerChange,
  placeholder,
  step,
  min,
  max,
  initialValue,
  accuracy,
  spinnerType,
}) => {
  return (
    <InputSpinner
      max={max}
      min={min}
      step={0.00001}
      speed={1}
      placeholder={placeholder}
      colorLeft={colors.inputBorder}
      colorRight={colors.inputBorder}
      value={spinnerValue}
      initialValue={initialValue}
      precision={accuracy}
      height={30}
      typingTime={1000}
      buttonFontSize={14}
      activeOpacity={0.5}
      onChange={onSpinnerChange}
      type={"float"}
      style={styles.spinner}
    />
  );
};

export default Spinner;
