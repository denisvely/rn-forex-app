import React from "react";
import { View, Pressable } from "react-native";
import PropTypes from "prop-types";
import { SvgXml } from "react-native-svg";
import Typography from "components/Typography/Typography";

const arrowRight = `<svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5625 1.125L0.34375 1.34375C0.1875 1.5 0.1875 1.71875 0.34375 1.875L6.4375 8L0.34375 14.0937C0.1875 14.25 0.1875 14.4687 0.34375 14.625L0.5625 14.8437C0.71875 15 0.9375 15 1.09375 14.8437L7.6875 8.25C7.84375 8.09375 7.84375 7.875 7.6875 7.71875L1.09375 1.125C0.9375 0.96875 0.71875 0.96875 0.5625 1.125Z" fill="#979797"/>
</svg>
`;

import styles from "./buttonWithIconsStyles";

const ButtonWithIcons = ({ text, icon, additionalPadding, onPress }) => {
  return (
    <View
      style={{
        ...styles.profileButtonWrapper,
        marginBottom: additionalPadding ? 32 : 12,
      }}
    >
      <Pressable onPress={onPress} style={styles.profileButton}>
        <View style={styles.btnContainer}>
          <SvgXml
            styles={styles.profileButtonIcon}
            xml={icon}
            width="20"
            height="16"
          />
          <Typography name={"normal"} text={text} style={styles.btnText} />
          <SvgXml
            style={styles.arrowRight}
            xml={arrowRight}
            width="19"
            height="19"
          />
        </View>
      </Pressable>
    </View>
  );
};

ButtonWithIcons.propTypes = {
  text: PropTypes.string,
  image: PropTypes.string,
  onPress: PropTypes.func,
};

export default ButtonWithIcons;
