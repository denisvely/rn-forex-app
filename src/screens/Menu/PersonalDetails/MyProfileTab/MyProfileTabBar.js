/* eslint-disable indent */
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button } from "../../../../components";
import PropTypes from "prop-types";

import styles from "./myProfileTabBarStyles";

const innerRoutes = [
  {
    key: "personalDetails",
    name: "Personal Details",
  },
  {
    key: "changePassword",
    name: "Change Password",
  },
  {
    key: "uploadDocuments",
    name: "Upload Documents",
  },
];

const MyProfileTabBar = ({ state, descriptors, navigation }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.profileTypeButtonsWrapper}>
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
                  text={t(`menu.${route.key}Short`)}
                  size="tabButton"
                  pressableStyle={styles.profileTypeButtonActiveSmall}
                  onPress={onPress}
                />
              ) : (
                <Button
                  type="text"
                  text={t(`menu.${route.key}Short`)}
                  size="tabButton"
                  pressableStyle={styles.profileTypeButtonSmall}
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

MyProfileTabBar.propTypes = {
  state: PropTypes.shape({
    index: PropTypes.number,
    routes: PropTypes.array,
  }),
  descriptors: PropTypes.object,
  navigation: PropTypes.object,
};

export default MyProfileTabBar;
