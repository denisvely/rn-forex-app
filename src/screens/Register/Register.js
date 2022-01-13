import React from "react";
import { View, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";

import { Button, Picker } from "components";
import RegisterService from "./services/RegisterService";
import { Typography } from "../../components";
import { colors } from "constants";

import { register } from "store/app";

const signUpService = RegisterService.register();

const formInitialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  title: "",
  firstName: "",
  lastName: "",
};

const Register = ({ navigation }) => {
  const dispatch = useDispatch();

  const signUp = (values) => {
    signUpService
      .fetch({ username: userData.email, password: userData.password })
      .then(({ response }) => {
        const body = response.getBody();
        login(dispatch, body);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Typography name="largeBold" text={"Register"} />
      <Formik
        initialValues={formInitialValues}
        onSubmit={(values) => {
          signUp(values);
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
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Retype Password"
              onChangeText={props.handleChange("confirmPassword")}
              value={props.values.confirmPassword}
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
            <Picker
              placeholderText="Select title"
              value={props.values.title}
              onChange={(fieldName, value) => {
                props.setValues(fieldName, value);
              }}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="First Name"
              onChangeText={props.handleChange("firstName")}
              value={props.values.firstName}
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
              placeholder="Last Name"
              onChangeText={props.handleChange("lastName")}
              value={props.values.lastName}
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
              text="Sign In"
              type="primary"
              font="mediumBold"
              onPress={props.handleSubmit}
            />
          </>
        )}
      </Formik>
      {/* <Button
        style={{ marginTop: 40 }}
        text="Already have an account?"
        type="secondary"
        font="small"
        onPress={() => navigation.push("Login")}
      /> */}
    </View>
  );
};

export default Register;
