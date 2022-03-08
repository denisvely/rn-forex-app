import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { View, TouchableOpacity } from "react-native";

import { LazyFlatList, Loading, Typography } from "components";
import NotificationService from "./services/NotificationsService";
import { deviceWidth } from "utils";
import NotificationRow from "./components/NotificationRow/NotificationRow";
import { getRealForexNotifications } from "store/realForex";

import styles from "./notificationsStyles";

const getNotifications = NotificationService.getNotifications();

const Notifications = ({ navigation, game }) => {
  const flatListRef = useRef();
  const notifications = useSelector((state) =>
    getRealForexNotifications(state)
  );

  useEffect(() => {
    getNotifications.fetch().then(({ response }) => {
      // console.log(response);
    });
  }, []);

  const clearAllNotifications = () => {
    alert("Clear all here");
  };

  return !notifications ? (
    <Loading />
  ) : (
    <>
      <View style={styles.notificationsHeader}>
        <Typography
          style={styles.notificationsHeaderTitle}
          text={"Notification history"}
          name="tiny"
        />
        <TouchableOpacity>
          <Typography
            style={styles.notificationsHeaderTitle}
            text={"Clear all"}
            name="tiny"
            onPress={() => clearAllNotifications()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.notificationContainer}>
        <LazyFlatList
          list={notifications}
          renderItem={({ item, index }) => {
            return (
              <NotificationRow
                key={index}
                notification={item}
                navigation={navigation}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: deviceWidth,
            justifyContent: "center",
            alignItems: "center",
          }}
          style={styles.flatListContainer}
          listRef={flatListRef}
        />
      </View>
    </>
  );
};

export default Notifications;
