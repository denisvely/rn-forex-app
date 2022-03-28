import React from "react";
import moment from "moment";
import { TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Typography } from "../../../../components";
import { returnStatusText, getDateDiff } from "store/realForex/helpers";
import { getNotifications } from "../../../../store/realForex";

import styles from "./notificationRowStyles";
import { colors } from "../../../../constants";
import NotificationsService from "../../services/NotificationsService";

const deleteNotification = NotificationsService.deleteNotification();

const notificationX = `<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.71094 6.5L1.6875 10.4844L0.867188 11.3047C0.75 11.4219 0.75 11.6172 0.867188 11.7734L1.72656 12.6328C1.88281 12.75 2.07812 12.75 2.19531 12.6328L7 7.78906L11.8438 12.6328C11.9609 12.75 12.1562 12.75 12.3125 12.6328L13.1719 11.7734C13.2891 11.6172 13.2891 11.4219 13.1719 11.3047L8.32813 6.5L13.1719 1.65625C13.2891 1.53906 13.2891 1.34375 13.1719 1.1875L12.3125 0.328125C12.1563 0.210938 11.9609 0.210938 11.8438 0.328125L7 5.17187L3.01563 1.14844L2.19531 0.328125C2.07813 0.210937 1.88281 0.210937 1.72656 0.328125L0.867188 1.1875C0.75 1.34375 0.75 1.53906 0.867188 1.65625L5.71094 6.5Z" fill="#979797"/>
</svg>
`;

const NotificationRow = ({ notification }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const returnAssetAccuracy = (price) => {
    return price.toString().split(".").length === 1
      ? 0
      : price.toString().split(".")[1].length;
  };

  const notificationRowDataDelete = (id) => {
    deleteNotification
      .fetch({ id: id, optionType: 24 })

      .then(({ response }) => {
        if (response.body.code === 200) {
          getNotifications(dispatch);
        }
      });
  };

  return !notification.isDeleted ? (
    <View style={styles.notificationRow}>
      <View style={styles.left}>
        <View style={styles.top}>
          <Typography
            style={styles.notificationRowTitle}
            text={returnStatusText(notification.TradeNotificationActionType)}
          />
          <View style={styles.notificationDateTime}>
            <Typography
              style={styles.notificationRowTitleDate}
              text={getDateDiff(notification.CreatedDate)}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          {notification.TradeNotificationActionType === 0 ? (
            <Typography
              name="small"
              style={styles.errorMessage}
              text={notification.ErrorMsg}
            />
          ) : (
            <View style={styles.notificationRowData}>
              <Typography
                name="small"
                style={{
                  ...styles.notificationRowDirection,
                  color: notification.isBuy
                    ? colors.buyColor
                    : colors.sellColor,
                }}
                text={
                  notification.isBuy
                    ? t("common-labels.buy")
                    : t("common-labels.sell")
                }
              />
              <View style={styles.tradeInfo}>
                <Typography
                  name="small"
                  text={`${notification.Quantity} ${notification.AssetName}`}
                />
              </View>
              <Typography name="small" text={t("common-labels.at")} />
              <View style={styles.notificationPrice}>
                <Typography name="small" text={notification.ExecutionPrice} />
              </View>
            </View>
          )}
        </View>
        <View style={styles.notificationTpSlRow}>
          {notification.TakeProfit !== 0 && notification.TakeProfit !== null ? (
            <View style={styles.tpSlRowData}>
              <Typography
                name="small"
                text={t("common-labels.takeProfitShort")}
                style={styles.tpAndSlLabel}
              />
              <Typography
                name="small"
                text={notification.TakeProfit.toFixed(
                  returnAssetAccuracy(notification.ExecutionPrice)
                )}
              />
            </View>
          ) : null}
          {notification.StopLoss !== 0 && notification.StopLoss !== null ? (
            <View style={styles.tpSlRowData}>
              <Typography
                name="small"
                text={t("common-labels.stopLossShort")}
                style={styles.tpAndSlLabel}
              />
              <Typography
                name="small"
                text={notification.StopLoss.toFixed(
                  returnAssetAccuracy(notification.ExecutionPrice)
                )}
              />
            </View>
          ) : null}
          {notification.ExpirationDate !== null ? (
            <View style={styles.tpSlRowData}>
              <Typography
                name="small"
                text={t("common-labels.exp")}
                style={styles.tpAndSlLabel}
              />
              <Typography
                name="small"
                text={moment(notification.ExpirationDate).format("MM-DD HH:MM")}
              />
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          onPress={() => notificationRowDataDelete(notification.ID)}
        >
          <SvgXml xml={notificationX} width="16" height="16" />
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
};

export default NotificationRow;
