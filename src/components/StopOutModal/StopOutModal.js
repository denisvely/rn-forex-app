import React from "react";
import { View, Modal } from "react-native";

import { Typography, Button } from "../../components";

import styles from "./stopOutModalStyles";

const MarginCallModal = ({ isVisible, setState, closePos }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setState(!isVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Typography
            text="Stop out warning"
            name="normalBold"
            style={{ marginBottom: 12 }}
          />
          <View style={{ marginBottom: 12 }}>
            <Typography
              text={`By performing this action a Stop out will be triggered.`}
              name="small"
              style={styles.text}
            />
          </View>
          <View style={styles.tradeButtons}>
            <Button
              type="primary"
              text={"Confirm"}
              size="small"
              style={styles.button}
              textStyle={{ textTransform: "uppercase" }}
              onPress={() => closePos()}
            />
            <Button
              type="primary"
              text={"Cancel"}
              size="small"
              style={styles.button}
              textStyle={{ textTransform: "uppercase" }}
              onPress={() => setState(!isVisible)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MarginCallModal;
