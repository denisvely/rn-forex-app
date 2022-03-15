import React from "react";
import { View, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getRealForexTotalNewNotifications } from "../../store/realForex";
import { colors } from "../../constants";

import notificationsListStyles from "./notificationsIconStyles";
const notificationSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7188 13.3438C16.125 12.6875 14.9688 11.7188 14.9688 8.5C14.9688 6.09375 13.2812 4.15625 10.9688 3.65625V3C10.9688 2.46875 10.5312 2 10 2C9.4375 2 9 2.46875 9 3V3.65625C6.6875 4.15625 5 6.09375 5 8.5C5 11.7188 3.84375 12.6875 3.25 13.3438C3.0625 13.5312 2.96875 13.7812 3 14C3 14.5312 3.375 15 4 15H15.9688C16.5938 15 16.9688 14.5312 17 14C17 13.7812 16.9062 13.5312 16.7188 13.3438ZM5.09375 13.5C5.75 12.6562 6.46875 11.1875 6.5 8.53125C6.5 8.53125 6.5 8.53125 6.5 8.5C6.5 6.59375 8.0625 5 10 5C11.9062 5 13.5 6.59375 13.5 8.5C13.5 8.53125 13.4688 8.53125 13.4688 8.53125C13.5 11.1875 14.2188 12.6562 14.875 13.5H5.09375ZM10 18C11.0938 18 11.9688 17.125 11.9688 16H8C8 17.125 8.875 18 10 18Z" fill="#333333"/>
</svg>`;

const notificationSvgActive = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7188 13.3438C16.125 12.6875 14.9688 11.7188 14.9688 8.5C14.9688 6.09375 13.2812 4.15625 10.9688 3.65625V3C10.9688 2.46875 10.5312 2 10 2C9.4375 2 9 2.46875 9 3V3.65625C6.6875 4.15625 5 6.09375 5 8.5C5 11.7188 3.84375 12.6875 3.25 13.3438C3.0625 13.5312 2.96875 13.7812 3 14C3 14.5312 3.375 15 4 15H15.9688C16.5938 15 16.9688 14.5312 17 14C17 13.7812 16.9062 13.5312 16.7188 13.3438ZM5.09375 13.5C5.75 12.6562 6.46875 11.1875 6.5 8.53125C6.5 8.53125 6.5 8.53125 6.5 8.5C6.5 6.59375 8.0625 5 10 5C11.9062 5 13.5 6.59375 13.5 8.5C13.5 8.53125 13.4688 8.53125 13.4688 8.53125C13.5 11.1875 14.2188 12.6562 14.875 13.5H5.09375ZM10 18C11.0938 18 11.9688 17.125 11.9688 16H8C8 17.125 8.875 18 10 18Z" fill="white"/>
</svg>`;

const NotificationsIcon = ({ navigation, active }) => {
  const unreadNotifications = useSelector((state) =>
    getRealForexTotalNewNotifications(state)
  );

  return (
    <Pressable
      style={notificationsListStyles.btnContainerClick}
      onPress={() =>
        active ? navigation.goBack() : navigation.push("Notifications")
      }
    >
      <View style={notificationsListStyles.btnContainer}>
        <View
          style={{
            ...notificationsListStyles.svgContainer,
            backgroundColor: active ? colors.blueColor : colors.gray,
          }}
        >
          <SvgXml
            xml={active ? notificationSvgActive : notificationSvg}
            width="20"
            height="20"
          />
          {unreadNotifications && (
            <View style={notificationsListStyles.dotWrapper} />
          )}
        </View>
      </View>
    </Pressable>
  );
};

NotificationsIcon.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default NotificationsIcon;
