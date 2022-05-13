import React, { useState } from "react";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { Button, TextField, Typography, Error, Picker } from "../../components";
import RegisterService from "./services/RegisterService";
import { register } from "store/app";
import styles from "../Login/loginStyles";
import { SvgXml } from "react-native-svg";
import logo from "../../assets/svg/logo";
import { deviceWidth, deviceHeight } from "../../utils";

const signUpService = RegisterService.register();

const formInitialValues = {
  email: "joshduam@abv.bg",
  password: "motorola",
  confirmPassword: "motorola",
  firstName: "Josh",
  lastName: "Duam",
  phone: "+44 54534 534534",
};

const titleValues = [
  { label: "Mister", itemKey: 0, value: "mister" },
  { label: "Miss", itemKey: 1, value: "miss" },
  { label: "Mrs", itemKey: 2, value: "mrs" },
];

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Invalid password"),
  confirmPassword: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Invalid password"),
  // TODO
  phone: Yup.string().required("Required"),
  // phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [requestInProgress, setRequestProgress] = useState(false);
  const [title, setTitle] = useState("");

  const signUp = (userData) => {
    setRequestProgress(true);
    debugger;
    signUpService
      .fetch({
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        title: title,
        phone: userData.phone,
      })
      .then(({ response }) => {
        debugger;
        const body = response.getBody();
        setRequestProgress(false);
        register(dispatch, body);
      });
  };

  return (
    <View style={styles.container}>
      <Typography name="largeBold" text={"Registration"} />
      {/* <View style={styles.logoWrapper}><SvgXml xml={logo} /></View> */}
      <Formik
        initialValues={formInitialValues}
        onSubmit={(values) => {
          signUp(values);
        }}
        validationSchema={SignUpSchema}
      >
        {(props) => (
          <View style={styles.formWrapper}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
              enabled
              keyboardVerticalOffset={deviceHeight / 4.5}
            >
              <ScrollView
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  width: deviceWidth - 48,
                  flexGrow: 1,
                  paddingBottom: 50,
                }}
              >
                <TextField
                  placeholder={t(`menu.firstName`)}
                  onChange={props.handleChange("firstName")}
                  value={props.values.firstName}
                />
                {props.errors.firstName && props.touched.firstName ? (
                  <Error name="nano" text={props.errors.firstName} />
                ) : null}
                <TextField
                  placeholder={t(`menu.lastName`)}
                  onChange={props.handleChange("lastName")}
                  value={props.values.lastName}
                />
                {props.errors.lastName && props.touched.lastName ? (
                  <Error name="nano" text={props.errors.lastName} />
                ) : null}
                <Picker
                  values={titleValues}
                  placeholderText={title}
                  value={title}
                  onChange={(title) => setTitle(title)}
                  styles={{ width: "100%", backgroundColor: "red" }}
                />
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
                <TextField
                  placeholder="Retype Password"
                  onChange={props.handleChange("confirmPassword")}
                  value={props.values.confirmPassword}
                  secureTextEntry={true}
                  hasIcon={true}
                  type="password"
                />
                {props.errors.confirmPassword &&
                props.touched.confirmPassword ? (
                  <Error
                    name="nano"
                    text={props.errors.confirmPassword}
                    bigPadding={true}
                  />
                ) : null}
                <TextField
                  placeholder={t(`menu.primaryPhone`)}
                  onChange={props.handleChange("phone")}
                  value={props.values.phone}
                  keyboardType="phone-pad"
                />
                {props.errors.phone && props.touched.phone ? (
                  <Error name="nano" text={props.errors.phone} />
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
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
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
