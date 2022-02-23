import React from "react";
import PropTypes from "prop-types";
import { View, Pressable } from "react-native";
import Typography from "../Typography/Typography";
import styles from "./buttonStyles";

const Button = ({
  type,
  size,
  text,
  style,
  pressableStyle,
  marked,
  onPress,
  children,
  disabled,
  font,
  activeOpacity,
  textStyle,
  ...props
}) => {
  let textStyles = styles.buttons[type].text;
  let buttonStyles = {
    ...styles.buttons[type].button,
    // fix for android Pressable issue
    // https://github.com/facebook/react-native/issues/30924
    // borderWidth: 1,
  };

  if (marked && styles.buttons[type].marked) {
    buttonStyles = { ...buttonStyles, ...styles.buttons[type].marked };
  }

  if (marked && styles.buttons[type].markedButtonText) {
    textStyles = styles.buttons[type].markedButtonText;
  }

  if (disabled) {
    buttonStyles = styles.buttons[type].disabled;
  }

  return (
    <Pressable
      style={{ ...styles.sizes[size], ...pressableStyle }}
      activeOpacity={activeOpacity}
      disabled={disabled}
      onPress={onPress}
      {...props}
    >
      <View
        style={{
          ...buttonStyles,
          ...style,
          ...styles.sizes[`${size}Radius`],
        }}
      >
        {children ? (
          children({
            style: { alignSelf: "center", ...textStyles, ...textStyle },
            font,
            text,
            size,
            ...styles.sizes[`${size}Radius`],
          })
        ) : (
          <Typography
            name={font}
            text={text}
            style={{ alignSelf: "center", ...textStyles, ...textStyle }}
          />
        )}
      </View>
    </Pressable>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  pressableStyle: PropTypes.object,
  marked: PropTypes.bool,
  onPress: PropTypes.func,
  children: PropTypes.func,
  font: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  textStyle: PropTypes.object,
  activeOpacity: PropTypes.number,
};

Button.defaultProps = {
  activeOpacity: 1,
  size: "big",
  type: "default",
  disabled: false,
  text: "text",
  style: {},
  font: "normal",
  pressableStyle: {},
  textStyle: {},
  marked: false,
};

export default Button;
