import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { Modal, View, Platform } from "react-native";
import { Button } from "../../components";

import styles from "./datepickerStyles";

const Datepicker = ({
  modalState = false,
  toggleModal,
  datepickerDate,
  maxDate,
  minDate,
  mode = "date",
}) => {
  const { t } = useTranslation();
  const [date, setDate] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const onChange = (event, value) => {
    if (value) {
      setDate(value);

      if (Platform.OS !== "ios") {
        toggleModal(value);
      } else {
        setDisabled(false);
      }
    }
  };

  const toggleModalAndSaveDate = () => {
    toggleModal(date);
  };

  return (
    <>
      {Platform.OS === "ios" ? (
        <Modal animationType="slide" transparent={true} visible={modalState}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DateTimePicker
                value={date ? date : datepickerDate}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                style={styles.datePicker}
                maximumDate={maxDate}
                minimumDate={minDate}
              />

              <View style={styles.buttonsWrapper}>
                <Button
                  type="primary"
                  text={t("common-labels.apply")}
                  size="small"
                  style={styles.button}
                  textStyle={{ textTransform: "uppercase" }}
                  onPress={() => toggleModalAndSaveDate()}
                  disabled={disabled}
                />
                <Button
                  type="text"
                  text={t("common-labels.cancel")}
                  size="small"
                  style={styles.button}
                  onPress={() => toggleModal(null)}
                />
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        React.useMemo(() => {
          return (
            modalState && (
              <DateTimePicker
                value={datepickerDate}
                display={"default"}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                style={styles.datePicker}
                maximumDate={maxDate}
                minimumDate={minDate}
              />
            )
          );
        }, [modalState])
      )}
    </>
  );
};
export default Datepicker;
