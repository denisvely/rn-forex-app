import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import Toast from "react-native-toast-message";

import { Button, TextField } from "../../../../components";
import { deviceWidth } from "../../../../utils";
import ChangePasswordService from "./services/ChangePasswordService";

import { getToken } from "../../../../store/app";

import styles from "./changePasswordStyles";

const changePassword = ChangePasswordService.changePassword();

const ChangePassword = () => {
  const { t } = useTranslation();
  const token = useSelector((state) => getToken(state));
  const [disabled, setDisabled] = useState(false);

  return (
    <View style={styles.container}>
      <Formik
        style={styles.form}
        initialValues={{
          currentPassword: "",
          newPassword: "",
          repeatPassword: "",
        }}
        onSubmit={(values) => {
          setDisabled(true);
          if (values.newPassword != values.repeatPassword) {
            Toast.show({
              type: "error",
              text1: `The passwords doesn't match.`,
              topOffset: 100,
            });
            return;
          } else {
            changePassword
              .fetch({
                sessionID: token.sessionId,
                oldPassword: values.currentPassword,
                newPassword: values.newPassword,
              })
              .then(({ response }) => {
                if (response.body.code !== 200) {
                  Toast.show({
                    type: "error",
                    text1: `Password wasn't changed. Try Again.`,
                    topOffset: 100,
                  });
                } else {
                  Toast.show({
                    type: "success",
                    text1: `Password changed successfully.`,
                    topOffset: 100,
                  });
                }
                setDisabled(false);
              });
          }
        }}
      >
        {(props) => (
          <View style={styles.formWrapper}>
            <ScrollView
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                width: deviceWidth - 48,
                flexGrow: 1,
                paddingBottom: 130,
                marginTop: 16,
              }}
            >
              <TextField
                placeholder={t(`menu.currentPassword`)}
                onChange={props.handleChange("currentPassword")}
                value={props.values.currentPassword}
                secureTextEntry={true}
              />
              <TextField
                placeholder={t(`menu.newPassword`)}
                onChange={props.handleChange("newPassword")}
                value={props.values.newPassword}
                secureTextEntry={true}
              />
              <TextField
                placeholder={t(`menu.repeatPassword`)}
                onChange={props.handleChange("repeatPassword")}
                value={props.values.repeatPassword}
                secureTextEntry={true}
              />
            </ScrollView>
            <View style={styles.buttonsWrapper}>
              <Button
                text={t("common-labels.save")}
                type="primary"
                font="mediumBold"
                size="big"
                onPress={props.handleSubmit}
                disabled={disabled}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ChangePassword;
