import React, { useRef, useEffect, useState } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import moment from "moment";

import { LazyFlatList, Loading, Typography } from "../../../components";
import { deviceWidth } from "../../../utils";
import MyMessagesService from "./service/MyMessagesService";
import { convertUTCDateToLocalDate } from "../../../store/realForex/helpers";

import styles from "./myMessagesStyles";
import { colors } from "../../../constants";

const getMessages = MyMessagesService.getMessages();

const MyMessages = ({ navigation }) => {
  const { t } = useTranslation();
  const [offset, setOffset] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [messages, setMessages] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [isReady, setReady] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getMessages
        .fetch({ offset: offset, rowsPerPage: rowsPerPage })
        .then(({ response }) => {
          if (response.body.code !== 200) {
            return;
          }
          const body = response.getBody();
          setMessages(body.results);
          setTotalItems(body.total);
          setReady(true);
        });
    });

    return unsubscribe;
  }, [navigation]);

  const renderMessage = (item) => {
    return (
      <View
        style={{
          ...styles.messageRow,
          backgroundColor: item.isRead ? colors.tabsBackground : colors.white,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MessageDetails", {
              id: item.id,
            })
          }
          style={styles.row}
        >
          <View style={styles.left}>
            <Typography
              text={item.subject}
              name="small"
              style={{
                color: item.isRead
                  ? colors.fontSecondaryColor
                  : colors.blueColor,
                opacity: item.isRead ? 0.7 : 1,
              }}
            />
          </View>
          <View style={styles.right}>
            <Typography
              text={moment(new Date(item.activeFrom.dateTime)).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
              name="small"
              style={{
                color: item.isRead
                  ? colors.fontSecondaryColor
                  : colors.blueColor,
                opacity: item.isRead ? 0.7 : 1,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isReady ? (
        messages ? (
          <FlatList
            horizontal={false}
            data={messages}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 16,
              width: deviceWidth - 32,
              justifyContent: "flex-start",
              alignItems: "center",
              alignSelf: "center",
              paddingBottom: 50,
            }}
            style={styles.flatListContainer}
            renderItem={({ item }) => renderMessage(item)}
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={6} // Reduce initial render amount
            maxToRenderPerBatch={6} // Reduce number in each render batch
            updateCellsBatchingPeriod={100} // Increase time between renders
            windowSize={7} // Reduce the window size
          />
        ) : (
          <View style={styles.noMessages}>
            <Typography name="largeBold" text={"No messages found."} />
          </View>
        )
      ) : (
        <Loading size="large" />
      )}
    </View>
  );
};

export default MyMessages;
