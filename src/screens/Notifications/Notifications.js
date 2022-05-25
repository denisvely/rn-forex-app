import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, TouchableOpacity } from "react-native";

import { LazyFlatList, Loading, Typography } from "components";
import NotificationService from "./services/NotificationsService";
import { deviceWidth } from "utils";
import NotificationRow from "./components/NotificationRow/NotificationRow";
import { getNotifications, getRealForexNotifications } from "store/realForex";

import styles from "./notificationsStyles";

const clearAll = NotificationService.delAllForexNotifications();

const Notifications = ({ navigation }) => {
  const dispatch = useDispatch();
  const flatListRef = useRef();
  const notifications = useSelector((state) =>
    getRealForexNotifications(state)
  );

  const clearAllNotifications = () => {
    clearAll
      .fetch({ optionType: 24 })

      .then(({ response }) => {
        if (response.body.code === 200) {
          getNotifications(dispatch);
        }
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getNotifications(dispatch);
    });

    return unsubscribe;
  }, [navigation]);

  return notifications ? (
    <View style={styles.container}>
      <View style={styles.notificationsHeader}>
        <Typography
          style={styles.notificationsHeaderTitle}
          text={"Notification history"}
          name="tiny"
        />
        {notifications.length > 0 ? (
          <TouchableOpacity onPress={() => clearAllNotifications()}>
            <Typography
              style={styles.notificationsHeaderTitleClearAll}
              text={"Clear all"}
              name="tiny"
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.notificationContainer}>
        <LazyFlatList
          list={notifications}
          renderItem={({ item }) => {
            return <NotificationRow notification={item} />;
          }}
          keyExtractor={(item) => item.ID}
          showsVerticalScrollIndicator={false}
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
    </View>
  ) : (
    <Loading size="large" />
  );
};

export default Notifications;
