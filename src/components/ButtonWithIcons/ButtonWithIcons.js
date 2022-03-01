import React from "react";
import { View, Pressable } from "react-native";
import PropTypes from "prop-types";
import { SvgXml } from "react-native-svg";
import Typography from "components/Typography/Typography";
import { deviceWidth } from "utils";

const arrowRight = `<svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.0625 1.125L0.84375 1.34375C0.6875 1.5 0.6875 1.71875 0.84375 1.875L6.9375 8L0.84375 14.0937C0.6875 14.25 0.6875 14.4687 0.84375 14.625L1.0625 14.8437C1.21875 15 1.4375 15 1.59375 14.8437L8.1875 8.25C8.34375 8.09375 8.34375 7.875 8.1875 7.71875L1.59375 1.125C1.4375 0.96875 1.21875 0.96875 1.0625 1.125Z" fill="#979797"/>
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
