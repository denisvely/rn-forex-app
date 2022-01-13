import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { Button } from "components";

import LoginService from "./services/LoginService";
import { login } from "store/app";

import { colors } from "constants";
import { Typography } from "../../components";

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
      <Typography name="largeBold" text={"Login"} />
      <Formik
        initialValues={{ email: "qa@testqa.me", password: "123qwe!@#" }}
        onSubmit={(values) => {
          signIn(values);
        }}
      >
        {(props) => (
          <>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
              keyboardType="email-address"
              style={{
                height: 40,
                width: "100%",
                backgroundColor: colors.primaryColorWhite,
                color: colors.textColor,
                borderWidth: 1,
                borderColor: colors.brandPrimary,
                borderRadius: 46,
                paddingVertical: 9,
                paddingHorizontal: 16,
                marginTop: 10,
              }}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Password"
              onChangeText={props.handleChange("password")}
              value={props.values.password}
              secureTextEntry={true}
              style={{
                height: 40,
                width: "100%",
                backgroundColor: colors.primaryColorWhite,
                color: colors.textColor,
                borderWidth: 1,
                borderColor: colors.brandPrimary,
                borderRadius: 46,
                paddingVertical: 9,
                paddingHorizontal: 16,
                marginTop: 10,
              }}
            />
            <Button
              style={{ marginTop: 40 }}
              text="Sign In"
              type="primary"
              font="mediumBold"
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
          text="Sign up"
          type="secondary"
          font="small"
          onPress={() => navigation.push("Register")}
        />
      </View>
    </View>
  );
};

export default Login;
