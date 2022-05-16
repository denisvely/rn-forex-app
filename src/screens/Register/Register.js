import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { SvgXml } from "react-native-svg";

import {
  Button,
  TextField,
  Typography,
  Error,
  Picker,
  Datepicker,
  CountryPicker,
  Loading,
} from "../../components";
import RegisterService from "./services/RegisterService";
import { register } from "store/app";
import { deviceWidth, deviceHeight } from "../../utils";
import { colors } from "../../constants";
import logo from "../../assets/svg/logo";
import textFieldIcons from "../../components/TextField/textFieldIcons";
import initialResourcesService from "../../services/initialResourcesService";

import styles from "./registerStyles";

const signUpService = RegisterService.register();

const formInitialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  phone: "",
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
  const [birthDate, setBirthDate] = useState(null);
  const [isDatepickerOpen, setDatepickerOpen] = useState(false);
  const [countryCode, changeCountryCode] = useState(null);
  const [initialRegisterSettingsLoaded, setRegisterSettings] = useState(false);

  useEffect(() => {
    initialResourcesService
      .getResources()
      .fetch()
      .then(({ response }) => {
        if (response.body.code === 200 || response.body.code === 201) {
          const body = response.getBody();
          setRegisterSettings(body);
        }
      });
  }, []);
  const signUp = (userData) => {
    setRequestProgress(true);
    signUpService
      .fetch({
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        title: title,
        phone: userData.phone,
        countryCode: countryCode,
        birthDay: birthDate ? birthDate.getDate() : "",
        birthMonth: birthDate ? birthDate.getMonth() + 1 : "",
        birthYear: birthDate ? birthDate.getFullYear() : "",
      })
      .then(({ response }) => {
        const body = response.getBody();
        setRequestProgress(false);
        register(dispatch, body);
      });
  };

  const onChangeBirthDate = (value) => {
    if (value !== null) {
      setBirthDate(value);
      setDatepickerOpen(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <SvgXml xml={logo} />
      </View>
      {initialRegisterSettingsLoaded ? (
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
                    paddingBottom: 150,
                  }}
                >
                  <View
                    style={{
                      ...styles.textFieldWrapperWithoutBorder,
                      marginBottom: 0,
                    }}
                  >
                    <View style={styles.iconWrapper}>
                      <SvgXml
                        xml={textFieldIcons["person"][0]}
                        height={40}
                        width={32}
                        style={{ marginTop: -13 }}
                      />
                    </View>
                    <Picker
                      values={titleValues}
                      placeholderText={title}
                      value={title}
                      onChange={(title) => setTitle(title)}
                      styles={{ width: "100%" }}
                      hasIcon={true}
                    />
                  </View>
                  <TextField
                    placeholder={t(`menu.firstName`)}
                    onChange={props.handleChange("firstName")}
                    value={props.values.firstName}
                    type="person"
                    hasIcon={true}
                  />
                  {props.errors.firstName && props.touched.firstName ? (
                    <Error
                      name="nano"
                      text={props.errors.firstName}
                      bigPadding={true}
                    />
                  ) : null}
                  <TextField
                    placeholder={t(`menu.lastName`)}
                    onChange={props.handleChange("lastName")}
                    value={props.values.lastName}
                    type="person"
                    hasIcon={true}
                  />
                  {props.errors.lastName && props.touched.lastName ? (
                    <Error
                      name="nano"
                      text={props.errors.lastName}
                      bigPadding={true}
                    />
                  ) : null}
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
                    type="password"
                    hasIcon={true}
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
                    type="password"
                    hasIcon={true}
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
                    type="phone"
                    hasIcon={true}
                  />
                  {props.errors.phone && props.touched.phone ? (
                    <Error
                      name="nano"
                      text={props.errors.phone}
                      bigPadding={true}
                    />
                  ) : null}
                  <Datepicker
                    modalState={isDatepickerOpen}
                    toggleModal={onChangeBirthDate}
                    datepickerDate={birthDate ? birthDate : new Date()}
                    maxDate={new Date()}
                  />
                  <View style={styles.textFieldWrapperWithoutBorder}>
                    <View style={styles.iconWrapper}>
                      <SvgXml
                        xml={textFieldIcons["birthDate"][0]}
                        height={40}
                        width={32}
                        style={{ marginTop: -6 }}
                      />
                    </View>
                    <Pressable
                      onPress={() => setDatepickerOpen(!isDatepickerOpen)}
                      style={styles.input}
                    >
                      <Typography
                        name="small"
                        style={styles.inputSecond}
                        text={
                          birthDate
                            ? moment(birthDate).format("DD-MM-YYYY")
                            : "Birth date"
                        }
                      />
                    </Pressable>
                  </View>
                  <View style={styles.textFieldWrapperWithoutBorder}>
                    <View style={styles.iconWrapper}>
                      <SvgXml
                        xml={textFieldIcons["country"][0]}
                        height={40}
                        width={32}
                        style={{ marginTop: -13 }}
                      />
                    </View>
                    <View style={styles.countryPickerWrapper}>
                      <CountryPicker
                        style={{ fontSize: 14 }}
                        selectedCountryCode={countryCode}
                        changeCountry={(countryCode) => {
                          changeCountryCode(countryCode);
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      ...styles.textFieldWrapperWithoutBorder,
                      marginBottom: 0,
                    }}
                  >
                    <View style={styles.iconWrapper}>
                      <SvgXml
                        xml={textFieldIcons["person"][0]}
                        height={40}
                        width={32}
                        style={{ marginTop: -13 }}
                      />
                    </View>
                    <Picker
                      values={titleValues}
                      placeholderText={title}
                      value={title}
                      onChange={(title) => setTitle(title)}
                      styles={{ width: "100%" }}
                      hasIcon={true}
                    />
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
              <View style={styles.buttonsWrapper}>
                <Button
                  disabled={requestInProgress}
                  text="Register"
                  type="primary"
                  font="mediumBold"
                  size="big"
                  onPress={props.handleSubmit}
                />
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
            </View>
          )}
        </Formik>
      ) : (
        <Loading size="large" />
      )}
    </View>
  );
};

export default Register;
