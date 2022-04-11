/* eslint-disable indent */
import React from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity } from "react-native";
import { Button, Typo } from "../../../../../components";
import { SvgXml } from "react-native-svg";
import PropTypes from "prop-types";

import { colors } from "../../../../../constants";

import styles from "./orderTabBarStyles";

const innerRoutes = [
  {
    key: "market",
    name: "Market",
  },
  {
    key: "pending",
    name: "Pending",
  },
];

const OrderTabBar = ({ state, descriptors, navigation }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.orderTypeButtonsWrapper}>
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
            <View key={index}>
              {isFocused ? (
                <Button
                  type="text"
                  text={t(`common-labels.${route.name}`)}
                  size="tabButton"
                  pressableStyle={styles.orderTypeButtonActive}
                  onPress={onPress}
                />
              ) : (
                <Button
                  type="text"
                  text={t(`common-labels.${route.name}`)}
                  size="tabButton"
                  pressableStyle={styles.orderTypeButton}
                  onPress={onPress}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

OrderTabBar.propTypes = {
  state: PropTypes.shape({
    index: PropTypes.number,
    routes: PropTypes.array,
  }),
  descriptors: PropTypes.object,
  navigation: PropTypes.object,
};

export default OrderTabBar;
