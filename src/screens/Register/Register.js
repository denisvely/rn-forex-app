import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";

import {
  Button,
  TextField,
  Typography,
  Error,
  Picker,
  Datepicker,
  CountryPicker,
  Loading,
  SwitchComponent,
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

const titleValues = [
  { label: "Select title", itemKey: 0, value: "" },
  { label: "Mister", itemKey: 1, key: 1, value: "mister" },
  { label: "Miss", itemKey: 2, key: 2, value: "miss" },
  { label: "Mrs", itemKey: 3, key: 3, value: "mrs" },
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
  phone: Yup.string().required("Required"),
  title: Yup.string().required("Required"),
  birthDate: Yup.date().required("Required"),
  countryCode: Yup.string().required("Required"),
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
  const [countryCodeList, setCountryCodeList] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [isTOSAccepted, setTOSState] = useState(false);
  const [tosError, setTosError] = useState(false);

  const formInitialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    title: titleValues[0].value,
    birthDate: "Birth date",
    countryCode: countryCode,
  };

  useEffect(() => {
    initialResourcesService
      .getResources()
      .fetch()
      .then(({ response }) => {
        if (response.body.code === 200 || response.body.code === 201) {
          Toast.show({
            type: "error",
            text1: "tuka eeee",
            topOffset: 100,
            visibilityTime: 5000,
            autoHide: true,
          });
          const body = response.getBody();
          const myCountryCodeList = [];
          body.countries.data.forEach((item, index) => {
            myCountryCodeList.push(item.countryCode);
          });
          setCountryCodeList(myCountryCodeList);
          if (body.location.data) {
            // changeCountryCode(body.location.data.country.code);
          }
          if (body.currencies.data) {
            const allCurrencies = [];
            for (const [i, item] of Object.entries(body.currencies.data)) {
              const currencyObj = {
                label: item,
                itemKey: `${i}`,
                key: `${i}`,
                value: i,
              };
              allCurrencies.push(currencyObj);
            }
            setCurrencies(allCurrencies);
            setCurrency(allCurrencies[0].value);
          }
          setRegisterSettings(body);
        }
      });
  }, []);
  const signUp = (userData) => {
    if (!isTOSAccepted) {
      setTosError(true);
      return;
    } else {
      setTosError(false);
    }
    setRequestProgress(true);
    signUpService
      .fetch({
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        title: userData.title,
        phone: userData.phone,
        countryCode: countryCode,
        birthDay: birthDate ? birthDate.getDate() : "",
        birthMonth: birthDate ? birthDate.getMonth() + 1 : "",
        birthYear: birthDate ? birthDate.getFullYear() : "",
        currencyCode: currency,
        isTosAccepted: isTOSAccepted,
      })
      .then(({ response }) => {
        if (response.body.code === 200 || response.body.code === 201) {
          const body = response.getBody();
          setRequestProgress(false);
          register(dispatch, body);
        } else {
          Toast.show({
            type: "error",
            text1: response.body.data.text,
            topOffset: 100,
            visibilityTime: 4000000,
            autoHide: true,
          });
          setRequestProgress(false);
        }
      });
  };

  const onChangeBirthDate = (value) => {
    if (value !== null) {
      setBirthDate(value);
      setDatepickerOpen(false);
    } else {
      if (Platform.OS === "ios") {
        setDatepickerOpen(false);
      }
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
          onSubmit={(values) => signUp(values)}
          validationSchema={SignUpSchema}
          enableReinitialize={true}
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
                      value={props.values.title}
                      onChange={(title) => {
                        setTitle(title);
                        props.setFieldValue("title", title);
                      }}
                      styles={{ width: "100%" }}
                      hasIcon={true}
                    />
                  </View>
                  {props.errors.title && props.touched.title ? (
                    <Error
                      name="nano"
                      text={props.errors.title}
                      bigPadding={true}
                    />
                  ) : null}
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
                    toggleModal={(date) => {
                      onChangeBirthDate(date);
                      props.setFieldValue("birthDate", date);
                    }}
                    datepickerDate={
                      birthDate ? props.values.birthDate : new Date()
                    }
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
                    <View>
                      <Pressable
                        onPress={() => setDatepickerOpen(!isDatepickerOpen)}
                        style={styles.input}
                      >
                        <Typography
                          name="small"
                          text={
                            birthDate
                              ? moment(birthDate).format("DD-MM-YYYY")
                              : "Birth date"
                          }
                        />
                      </Pressable>
                    </View>
                  </View>
                  {props.errors.birthDate && props.touched.birthDate ? (
                    <Error name="nano" text={"Required"} bigPadding={true} />
                  ) : null}
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
                        selectedCountryCode={
                          countryCode ? countryCode : props.values.countryCode
                        }
                        changeCountry={(countryCode) => {
                          props.setFieldValue("countryCode", countryCode);
                          changeCountryCode(countryCode);
                        }}
                        customContryCodeList={countryCodeList}
                      />
                    </View>
                  </View>
                  {props.errors.countryCode ? (
                    <Error name="nano" text={"Required"} bigPadding={true} />
                  ) : null}
                  <View
                    style={{
                      ...styles.textFieldWrapperWithoutBorder,
                      marginBottom: 0,
                    }}
                  >
                    <View style={styles.iconWrapper}>
                      <SvgXml
                        xml={textFieldIcons["currency"][0]}
                        height={40}
                        width={32}
                        style={{ marginTop: -13 }}
                      />
                    </View>
                    <Picker
                      values={currencies}
                      placeholderText={currency}
                      value={currency}
                      onChange={(currency) => setCurrency(currency)}
                      styles={{ width: "100%" }}
                      hasIcon={true}
                    />
                  </View>
                  <View style={styles.tosWrapper}>
                    <View style={styles.switchWrapper}>
                      <SwitchComponent
                        onValueChange={(value) => setTOSState(value)}
                        value={isTOSAccepted}
                        style={{
                          transform: [
                            { scaleX: Platform.OS === "ios" ? 0.5 : 0.7 },
                            { scaleY: Platform.OS === "ios" ? 0.5 : 0.7 },
                          ],
                        }}
                      />
                    </View>
                    <View style={styles.tosTextWrapper}>
                      <TouchableOpacity
                        style={styles.hrefButton}
                        onPress={() =>
                          navigation.navigate("TermsAndAgreements")
                        }
                      >
                        <Typography name="normal" style={styles.tosText}>
                          <Typography
                            name="normal"
                            text={"I have read and agree to "}
                          />
                          <Typography
                            style={{ color: colors.blueColor }}
                            name="normal"
                            text={t(`menu.terms`)}
                          />
                        </Typography>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {tosError ? (
                    <Error
                      name="nano"
                      text={"You must agree with the Terms and Agreements."}
                      bigPadding={true}
                    />
                  ) : null}
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
