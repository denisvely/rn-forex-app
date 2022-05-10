import React from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { SvgXml } from "react-native-svg";
import styles from "./headerLeftStyles";

const hamburgerIcon = `<svg width="44" height="46" viewBox="0 0 44 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.5156 20.9531C28.6328 20.9531 28.75 20.875 28.75 20.7188V19.7812C28.75 19.6641 28.6328 19.5469 28.5156 19.5469H11.4844C11.3281 19.5469 11.25 19.6641 11.25 19.7812V20.7188C11.25 20.875 11.3281 20.9531 11.4844 20.9531H28.5156ZM28.5156 27.2031C28.6328 27.2031 28.75 27.125 28.75 26.9688V26.0312C28.75 25.9141 28.6328 25.7969 28.5156 25.7969H11.4844C11.3281 25.7969 11.25 25.9141 11.25 26.0312V26.9688C11.25 27.125 11.3281 27.2031 11.4844 27.2031H28.5156ZM28.5156 33.4531C28.6328 33.4531 28.75 33.375 28.75 33.2188V32.2812C28.75 32.1641 28.6328 32.0469 28.5156 32.0469H11.4844C11.3281 32.0469 11.25 32.1641 11.25 32.2812V33.2188C11.25 33.375 11.3281 33.4531 11.4844 33.4531H28.5156Z" fill="#333333"/>
</svg>
`;

const HeaderLeft = ({
  navigation,
  showDrawer,
  firstComponent,
  secondComponent,
}) => {
  return (
    <View style={styles.headerLeft}>
      <View style={styles.firstComponent}>
        {showDrawer ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.avatarButton}
            onPress={() => navigation.navigate("Menu")}
          >
            <SvgXml xml={hamburgerIcon} height={40} width={40} />
          </TouchableOpacity>
        ) : (
          firstComponent
        )}
      </View>
      <View style={styles.secondComponent}>
        {secondComponent && secondComponent}
      </View>
    </View>
  );
};

HeaderLeft.propTypes = {
  navigation: PropTypes.object,
  showDrawer: PropTypes.bool,
  firstComponent: PropTypes.func,
  secondComponent: PropTypes.func,
};

export default HeaderLeft;
