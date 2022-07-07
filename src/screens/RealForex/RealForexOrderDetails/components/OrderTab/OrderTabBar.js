/* eslint-disable indent */
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button } from "../../../../../components";
import PropTypes from "prop-types";
import { deviceWidth } from "../../../../../utils";

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

const OrderTabBar = ({
  state,
  descriptors,
  navigation,
  order,
  isPending,
  isHedging,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.orderTypeButtonsWrapper}>
        {innerRoutes.map((route, index) => {
          const isFocused = state.index === index;

          if (isPending && order && route.key === "market") {
            return null;
          }

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
                  pressableStyle={{
                    ...styles.orderTypeButtonActive,
                    width:
                      !isPending && order && isHedging
                        ? "100%"
                        : deviceWidth / 2 - 40,
                  }}
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
