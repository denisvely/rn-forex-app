import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import styles from "./headerRightStyles";

const HeaderRight = ({ firstComponent, secondComponent }) => {
  return (
    <View style={styles.headerRight}>
      <View style={styles.firstComponent}>
        {firstComponent && firstComponent}
      </View>
      <View style={styles.secondComponent}>
        {secondComponent && secondComponent}
      </View>
    </View>
  );
};

HeaderRight.propTypes = {
  firstComponent: PropTypes.object,
  secondComponent: PropTypes.object,
};

export default HeaderRight;
