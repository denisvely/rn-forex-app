import React, { useState } from "react";
import { View, Modal } from "react-native";
import { useSelector } from "react-redux";
import { getUser } from "../../store/app";

import { Typography, Button } from "../../components";

import styles from "./marginCallModalStyles";

const MarginCallModal = ({ percent, setState, navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const user = useSelector((state) => getUser(state));

  const marginCallButtonOnPress = () => {
    setState((prevState) => ({
      ...prevState,
      isMarginCallShown: false,
    }));
    navigation.navigate("Funding");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Typography
            text="Margin call"
            name="normalBold"
            style={{ marginBottom: 12 }}
          />
          {percent != null ? (
            <View style={{ marginBottom: 12 }}>
              <Typography
                text={`You are using more than ${percent}% of your Margin capacity.`}
                name="small"
                style={styles.text}
              />
              <Typography
                text={`To avoid a possible liquidation deposit more funds.`}
                name="small"
                style={{ ...styles.text, paddingTop: 12 }}
              />
            </View>
          ) : (
            <View style={{ marginBottom: 12 }}>
              <Typography
                text={`The equity of your account is now below ${user.MarginCallLevel}% of the margin requirement. Please be aware that if this level falls below ${user.StopOutLevel}% your positions will start to be liquidated in order to maintain the required level.`}
                name="small"
                style={styles.text}
              />
              <Typography
                text={`To avoid a possible liquidation deposit more funds.`}
                name="small"
                style={{ ...styles.text, paddingTop: 12 }}
              />
            </View>
          )}
          <Button
            type="primary"
            text={"Fund"}
            size="small"
            style={styles.button}
            textStyle={{ textTransform: "uppercase" }}
            onPress={() => marginCallButtonOnPress()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MarginCallModal;
