import React from "react";
import { View } from "react-native";
import { Typography } from "components";
import { returnStatusText, getDateDiff } from "store/realForex/helpers";

import styles from "./notificationRowStyles";

const NotificationRow = ({ notification, index, navigation }) => {
  var isSocialNotification =
      [17, 18, 19, 20, 21].indexOf(notification.TradeNotificationActionType) >
      -1,
    parsedBoUserId = notification.AdditionalInformationJSON
      ? JSON.parse(notification.AdditionalInformationJSON.replaceAll("'", '"'))
      : null,
    boUserTitle = "";

  if (parsedBoUserId && parsedBoUserId.isFromBroker === "True") {
    boUserTitle = " Broker";
  }

  return !notification.isDeleted ? (
    <View style={styles.notificationRow} key={`${index}`}>
      <Typography
        style={styles.notificationRowTitle}
        text={returnStatusText(notification.TradeNotificationActionType)}
      />
      <Typography
        style={styles.notificationRowTitle}
        text={getDateDiff(notification.CreatedDate)}
      />
    </View>
  ) : null;
};

export default NotificationRow;
