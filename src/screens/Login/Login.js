import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { Button, TextField } from "components";
import { SvgXml } from "react-native-svg";

import LoginService from "./services/LoginService";
import { login } from "store/app";

import { colors } from "constants";
import { Typography } from "../../components";
import logo from "../../assets/svg/logo";

import styles from "./loginStyles";

const signInService = LoginService.login();

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loginMessage, setLogginMessage] = useState("");

  const signIn = (values) => {
    signInService
      .fetch({ username: values.email, password: values.password })
      .then(({ response }) => {
        const body = response.getBody();
        if (response.body.code === 400 || response.body.code === 401) {
          if (response.data.type === "2FA_NotValid") {
            // TODO => 2FA_NotValid
            return;
          } else {
            setLogginMessage("Invalid Username or Password");
            return;
          }
        }
        setLogginMessage("You have been logged in.");
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
      >
        {(props) => (
          <>
            <TextField
              placeholder="Email"
              onChange={props.handleChange("email")}
              value={props.values.email}
              type="email"
              hasIcon={true}
            />
            <TextField
              placeholder="Password"
              onChange={props.handleChange("password")}
              value={props.values.password}
              secureTextEntry={true}
              hasIcon={true}
              type="password"
            />
            <View style={styles.forgotPassword}>
              <Button
                textStyle={{ color: colors.buttonSecondary }}
                text="Forgot password?"
                type="text"
                font="small"
                size="small"
                onPress={() => navigation.navigate("ForgotPassoword?")}
              />
            </View>

            <Button
              style={{ marginTop: 32 }}
              text="Sign In"
              type="primary"
              font="mediumBold"
              size="big"
              onPress={props.handleSubmit}
            />
          </>
        )}
      </Formik>
      <Typography name="tiny" text={loginMessage} />
      <View style={styles.bottomViewLogin}>
        <Typography name="tiny" text={"Don't you have an account?"} />
        <Button
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
