import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import { Button, TextField, Typography, Error } from "../../components";
import RegisterService from "./services/RegisterService";
import { register } from "store/app";
import styles from "../Login/loginStyles";
import { SvgXml } from "react-native-svg";
import logo from "../../assets/svg/logo";
import { colors } from "../../constants";

const signUpService = RegisterService.register();

const formInitialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Invalid password"),
  confirmPassword: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Invalid password"),
});

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [requestInProgress, setRequestProgress] = useState(false);

  const signUp = (userData) => {
    setRequestProgress(true);
    signUpService
      .fetch({ username: userData.email, password: userData.password })
      .then(({ response }) => {
        const body = response.getBody();
        setRequestProgress(false);
        register(dispatch, body);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <SvgXml xml={logo} />
      </View>
      <Formik
        initialValues={formInitialValues}
        onSubmit={(values) => {
          signUp(values);
        }}
        validationSchema={SignUpSchema}
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
            {props.errors.email && props.touched.email ? (
              <Error name="nano" text={props.errors.email} bigPadding={true} />
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
            <TextField
              placeholder="Retype Password"
              onChange={props.handleChange("confirmPassword")}
              value={props.values.confirmPassword}
              secureTextEntry={true}
              hasIcon={true}
              type="password"
            />
            {props.errors.confirmPassword && props.touched.confirmPassword ? (
              <Error
                name="nano"
                text={props.errors.confirmPassword}
                bigPadding={true}
              />
            ) : null}
            <Button
              disabled={requestInProgress}
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
          textStyle={{ color: colors.blueColor }}
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
