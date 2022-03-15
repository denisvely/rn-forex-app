/* eslint-disable indent */
import React from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import PropTypes from "prop-types";

import Typography from "../Typography/Typography";

import {
  tabStackIcons,
  tabStackIconsActive,
} from "../../assets/svg/tabStackIcons/";

import { colors } from "../../constants";

import styles from "./customTabBarStyles";

const innerRoutes = [
  {
    key: "quotes",
    name: "quotes",
  },
  {
    key: "openPositions",
    name: "openPositions",
  },
  {
    key: "pendingOrders",
    name: "pendingOrders",
  },
  {
    key: "closedPositions",
    name: "closedPositions",
  },
  {
    key: "balance",
    name: "balance",
  },
];

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.navigatorContainerTransparent}>
      {innerRoutes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={route.name}
            key={index}
            onPress={onPress}
            style={{ width: "20%", margin: 0, padding: 0 }}
          >
            {isFocused ? (
              <View style={styles.iconContainer}>
                <SvgXml
                  xml={tabStackIconsActive[route.name][0]}
                  width="24"
                  height="24"
                  style={{ marginBottom: 4 }}
                />
                <Typography
                  name="tiny"
                  text={t(`navigation.${route.name}`)}
                  style={{
                    color: colors.blueColor,
                  }}
                />
              </View>
            ) : (
              <View style={styles.iconContainer}>
                <SvgXml
                  xml={tabStackIcons[route.name][0]}
                  width="24"
                  height="24"
                  style={{ marginBottom: 4 }}
                />
                <Typography
                  name="tiny"
                  text={t(`navigation.${route.name}`)}
                  style={{ color: colors.fontPrimaryColor }}
                />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

CustomTabBar.propTypes = {
  state: PropTypes.shape({
    index: PropTypes.number,
    routes: PropTypes.array,
  }),
  descriptors: PropTypes.object,
  navigation: PropTypes.object,
};

export default CustomTabBar;
