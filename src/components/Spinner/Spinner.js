import React from "react";
import { Platform } from "react-native";
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
  onBlur,
  children,
  prepend,
  errorActive,
  style,
  disabled,
}) => {
  return (
    <InputSpinner
      max={max}
      min={min}
      step={step}
      speed={1}
      disabled={disabled}
      accelerationDelay={Platform.OS === "ios" ? 1500 : 750}
      placeholder={placeholder}
      colorLeft={colors.inputBorder}
      colorRight={colors.inputBorder}
      emptied={true}
      value={spinnerValue}
      initialValue={initialValue}
      precision={accuracy}
      height={30}
      typingTime={1500}
      buttonFontSize={14}
      activeOpacity={0.5}
      onChange={onSpinnerChange}
      type={"float"}
      style={{
        ...styles.spinner,
        borderColor: errorActive ? colors.error : colors.inputBorder,
        ...style,
      }}
      onBlur={onBlur}
      prepend={prepend}
    >
      {children && children}
    </InputSpinner>
  );
};

export default Spinner;
