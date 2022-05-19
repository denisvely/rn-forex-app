import React, { useState } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

import { Button, TextField, Error } from "../../components";
import { SvgXml } from "react-native-svg";
import ForgotPasswordService from "./services/ForgotPasswordService";

import { Typography } from "../../components";
import logo from "../../assets/svg/logo";

import styles from "./forgotPasswordStyles";

const resetPassword = ForgotPasswordService.login();

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = ({ navigation }) => {
  const [requestInProgress, setRequestProgress] = useState(false);

  const resetPass = (values) => {
    setRequestProgress(true);
    resetPassword.fetch({ email: values.email }).then(({ response }) => {
      const body = response.getBody();
      if (response.body.code === 400 || response.body.code === 401) {
        if (body.type === "2FA_NotValid") {
          // TODO => 2FA_NotValid
          return;
        } else {
          Toast.show({
            type: "error",
            text1: `${body.text}`,
            topOffset: 100,
            visibilityTime: 3000,
            autoHide: true,
          });
          return;
        }
      } else {
        Toast.show({
          type: "success",
          text1: `${body.text}`,
          topOffset: 100,
          visibilityTime: 3000,
          autoHide: true,
        });
        navigation.navigate("Login");
      }
      setRequestProgress(false);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <SvgXml xml={logo} />
      </View>

      <Typography
        name="tiny"
        text="Enter your email address and we will send you instructions for resetting your password."
        style={{ color: "#000000", fontSize: 16, marginBottom: 32 }}
      />

      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={(values) => {
          resetPass(values);
        }}
      >
        {(props) => (
          <>
            <TextField
              placeholder="Email"
              onChange={props.handleChange("email")}
              value={props.values.email}
              type="email"
              hasIcon={true}
              keyboardType="email-address"
            />
            {props.errors.email && props.touched.email ? (
              <Error name="nano" text={props.errors.email} bigPadding={true} />
            ) : null}

            <Button
              disabled={requestInProgress}
              style={{ marginTop: 32 }}
              text="Reset password"
              type="primary"
              font="mediumBold"
              size="big"
              onPress={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword;
