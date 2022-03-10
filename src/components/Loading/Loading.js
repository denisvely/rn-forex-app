import React from "react";
import PropTypes from "prop-types";
import { View, ActivityIndicator } from "react-native";

import { colors } from "constants";
import styles from "./loadingStyles";

const Loading = ({ size = "large", color = colors.blueColor, style = {} }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

Loading.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Loading;
