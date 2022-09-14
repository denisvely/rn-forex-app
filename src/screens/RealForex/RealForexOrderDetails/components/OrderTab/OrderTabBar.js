/* eslint-disable indent */
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button } from "../../../../../components";
import PropTypes from "prop-types";
import { deviceWidth } from "../../../../../utils";

import styles from "./orderTabBarStyles";

const OrderTabBar = ({
  state,
  descriptors,
  navigation,
  order,
  isPending,
  isHedging,
}) => {
  const { t } = useTranslation();
  const innerRoutes = !order
    ? [
        {
          key: "market",
          name: "Market",
        },
        {
          key: "pending",
          name: "Pending",
        },
      ]
    : isPending
    ? [
        {
          key: "pending",
          name: "Pending",
        },
      ]
    : isHedging
    ? [
        {
          key: "profitloss",
          name: "ProfitLoss",
        },
      ]
    : [
        {
          key: "market",
          name: "Market",
        },
        {
          key: "profitloss",
          name: "ProfitLoss",
        },
        {
          key: "pending",
          name: "Pending",
        },
      ];

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
                  pressableStyle={
                    (isPending && order) || (order && isHedging)
                      ? styles.orderTypeButtonFullActive
                      : !isPending && order && !isHedging
                      ? styles.orderTypeButtonThreeActive
                      : styles.orderTypeButtonActive
                  }
                  onPress={onPress}
                />
              ) : (
                <Button
                  type="text"
                  text={t(`common-labels.${route.name}`)}
                  size="tabButton"
                  pressableStyle={
                    !isPending && order && isHedging
                      ? styles.orderTypeButtonFull
                      : !isPending && order && !isHedging
                      ? styles.orderTypeButtonThree
                      : styles.orderTypeButton
                  }
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
