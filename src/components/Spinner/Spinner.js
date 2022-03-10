import React from "react";
import InputSpinner from "react-native-input-spinner";
import { colors } from "constants";

import styles from "./spinnerStyles";

const Spinner = ({ spinnerValue, onSpinnerChange, placeholder }) => {
  return (
    <InputSpinner
      max={5000}
      min={0.001}
      step={0.05}
      speed={1}
      placeholder={placeholder}
      colorLeft={colors.inputBorder}
      colorRight={colors.inputBorder}
      value={spinnerValue}
      precision={5}
      height={30}
      buttonFontSize={14}
      activeOpacity={0.5}
      onChange={onSpinnerChange}
      style={styles.spinner}
    />
  );
};

export default Spinner;
