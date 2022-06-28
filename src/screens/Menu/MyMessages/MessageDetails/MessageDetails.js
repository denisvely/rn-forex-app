import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Loading, Typography } from "../../../../components";
import MyMessagesService from "../service/MyMessagesService";
import moment from "moment";
import HTMLView from "react-native-htmlview";
import { convertUTCDateToLocalDate } from "../../../../store/realForex/helpers";

import styles from "../myMessagesStyles";

const getDetailedMessage = MyMessagesService.getMessageDetails();

const MessageDetails = ({ route }) => {
  const msgId = route.params.id;
  const [messageContent, setMessageContent] = useState(null);

  useEffect(() => {
    getDetailedMessage.fetch({ id: msgId }).then(({ response }) => {
      if (response.body.code !== 200) {
        return;
      }
      setMessageContent(response.body.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      {messageContent ? (
        <View style={styles.messageBox}>
          <View style={styles.boxRow}>
            <View style={styles.left}>
              <Typography text={messageContent.subject} name="small" />
            </View>
            <View style={styles.right}>
              <Typography
                text={moment(
                  new Date(messageContent.activeFrom.dateTime)
                ).format("YYYY-MM-DD HH:mm:ss")}
                style={styles.secondaryText}
                name="small"
              />
            </View>
          </View>
          <ScrollView
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: "100%",
              flexGrow: 1,
              paddingBottom: 50,
            }}
          >
            <HTMLView value={messageContent.content} />
          </ScrollView>
        </View>
      ) : (
        <Loading size="large" />
      )}
    </View>
  );
};

export default MessageDetails;
