import React from "react";
import { View, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";

import {Button, TextField, Typography} from "../../components";
import RegisterService from "./services/RegisterService";
import { register } from "store/app";
import styles from "../Login/loginStyles";
import {SvgXml} from "react-native-svg";
import logo from "../../assets/svg/logo";

const signUpService = RegisterService.register();

const formInitialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
};

const Register = ({ navigation }) => {
    const dispatch = useDispatch();

    const signUp = (userData) => {
        signUpService
            .fetch({ username: userData.email, password: userData.password })
            .then(({ response }) => {
                const body = response.getBody();
                register(dispatch, body);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoWrapper}>
                <SvgXml xml={logo} />
            </View>
            <Formik initialValues={formInitialValues}
                onSubmit={(values) => {
                  signUp(values);
                }}
            >
        {(props) => (
          <>
              <TextField
                  autoCapitalize="none"
                  placeholder="Email"
                  onChange={props.handleChange("email")}
                  value={props.values.email}
                  type="email"
                  keyboardType="email-address"
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
              <TextField
                  placeholder="Retype Password"
                  onChange={props.handleChange("confirmPassword")}
                  value={props.values.confirmPassword}
                  secureTextEntry={true}
                  hasIcon={true}
                  type="password"
              />
              <Button
                  style={{ marginTop: 32 }}
                  text="Register"
                  type="primary"
                  font="mediumBold"
                  size="big"
                  onPress={props.handleSubmit}
              />
          </>
        )}
      </Formik>
            <View style={styles.bottomViewLogin}>
                <Typography name="tiny" text={"Already have an account?"} />
                <Button
                    size="small"
                    text="Login"
                    type="secondary"
                    font="small"
                    onPress={() => navigation.push("Login")}
                />
            </View>
    </View>
  );
};

export default Register;
