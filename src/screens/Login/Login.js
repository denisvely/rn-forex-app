import React from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Error } from "../../components";
import { SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";

import LoginService from "./services/LoginService";
import { login } from "store/app";

import { colors } from "../../constants";
import { Typography } from "../../components";
import logo from "../../assets/svg/logo";

import styles from "./loginStyles";

const signInService = LoginService.login();

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Invalid password"),
});

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const signIn = (values) => {
    signInService
      .fetch({ username: values.email, password: values.password })

      .then(({ response }) => {
        const body = response.getBody();
        if (response.body.code === 400 || response.body.code === 401) {
          Toast.show({
            type: "error",
            text1: `Invalid Username or Password`,
            topOffset: 100,
            visibilityTime: 3000,
            autoHide: true,
          });
          return;
        }
        login(dispatch, body);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <SvgXml xml={logo} />
      </View>

      <Formik
        initialValues={{ email: "qa@testqa.me", password: "123qwe!@#" }}
        onSubmit={(values) => {
          signIn(values);
        }}
        validationSchema={SignInSchema}
      >
        {(props) => (
          <>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              enabled
            >
              <TextField
                placeholder="Email"
                onChange={props.handleChange("email")}
                value={props.values.email}
                type="email"
                hasIcon={true}
                keyboardType="email-address"
              />
              {props.errors.email && props.touched.email ? (
                <Error
                  name="nano"
                  text={props.errors.email}
                  bigPadding={true}
                />
              ) : null}
              <TextField
                placeholder="Password"
                onChange={props.handleChange("password")}
                value={props.values.password}
                secureTextEntry={true}
                hasIcon={true}
                type="password"
              />
              {props.errors.password && props.touched.password ? (
                <Error
                  name="nano"
                  text={props.errors.password}
                  bigPadding={true}
                />
              ) : null}
              <View style={styles.forgotPassword}>
                <Button
                  textStyle={{ color: colors.blueColor }}
                  text="Forgot password?"
                  type="text"
                  font="small"
                  size="small"
                  onPress={() => navigation.navigate("ForgotPassword")}
                />
              </View>
              <TouchableOpacity
                onPress={props.handleSubmit}
                style={styles.loginBtn}
              >
                <Typography
                  name="mediumBold"
                  text={"Login"}
                  style={{ color: colors.white }}
                />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </>
        )}
      </Formik>
      <View style={styles.bottomViewLogin}>
        <Typography name="tiny" text={"Don't you have an account?"} />
        <Button
          textStyle={{ color: colors.blueColor }}
          size="small"
          text="Create one now!"
          type="secondary"
          font="small"
          onPress={() => navigation.push("Register")}
        />
      </View>
    </View>
  );
};

export default Login;
