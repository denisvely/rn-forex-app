import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import Toast from "react-native-toast-message";

import {
  Button,
  TextField,
  Picker,
  CountryPicker,
  Datepicker,
  Typography,
  Error,
  PhoneInput,
  Loading,
} from "../../../../components";
import { deviceHeight, deviceWidth } from "../../../../utils";
import userService from "../../../../services/userService";
import PersonalDetailsService from "./services/PersonalDetailsService";

import { getUser, setUser, getToken } from "../../../../store/app";

import styles from "./personalDetailsStyles";

const titleValues = [
  { label: "Mister", itemKey: 0, value: "mister" },
  { label: "Miss", itemKey: 1, value: "miss" },
  { label: "Mrs", itemKey: 2, value: "mrs" },
];

const updateUser = PersonalDetailsService.updateUser();

const PersonalDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  addressLine1: Yup.string().required("Required"),
});

const PersonalDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => getUser(state));

  const token = useSelector((state) => getToken(state));
  const [title, setTitle] = useState(null);
  const [countryCode, changeCountryCode] = useState(user.countryCode);
  const [birthDate, setBirthDate] = useState(null);
  const [isDatepickerOpen, setDatepickerOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneCountryPrefix, setPhoneCountryPrefix] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("");
  const [isReady, setReady] = useState(false);

  const updateUserDetails = () => {
    userService
      .getUser()
      .fetch()
      .then(({ response }) => {
        if (response.body.code !== 200) {
          return;
        }
        const body = response.getBody();
        setUser(dispatch, body);

        if (user.birthYear && user.birthMonth && user.birthDay) {
          const date = new Date(
            `${user.birthYear}-${user.birthMonth}-${user.birthDay}`
          );
          setBirthDate(date);
        }
        const phoneSplitted = user.phone.split("-");
        if (phoneSplitted.length > 0) {
          setPhoneCountryPrefix(phoneSplitted[0]);
          setPhoneCountryCode["DE"];
          setPhone(phoneSplitted[2]);
        } else {
          setPhone(user.phone);
        }
        setReady(true);
      });
  };

  useEffect(() => {
    updateUserDetails();
  }, []);

  const onChangeBirthDate = (value) => {
    if (value !== null) {
      setBirthDate(value);
      setDatepickerOpen(false);
    }
  };

  const onChangePhone = (value) => {
    setPhone(value);
  };

  return (
    <View style={styles.container}>
      {isReady ? (
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            city: user.city,
            countryCode: user.countryCode,
            phone: phone,
            secondaryPhone: user.secondaryPhone,
            addressLine1: user.addressLine1,
            addressLine2: user.addressLine2,
          }}
          validationSchema={PersonalDetailsSchema}
          style={styles.form}
          onSubmit={(values) => {
            setDisabled(true);
            values.title = title ? title : user.title;
            values.countryCode = countryCode;
            values.birthDay = birthDate.getDate();
            values.birthMonth = birthDate.getMonth() + 1;
            values.birthYear = birthDate.getYear();
            values.email = user.email;
            updateUser
              .fetch({
                sessionID: token.sessionId,
                params: values,
                socialNetworkType: null,
              })
              .then(({ response }) => {
                if (response.body.code !== 200) {
                  Toast.show({
                    type: "error",
                    text1: t(`menu.notSaved`),
                    topOffset: 100,
                  });
                } else {
                  Toast.show({
                    type: "success",
                    text1: t(`menu.userUpdatedSuccessfully`),
                    topOffset: 100,
                  });
                  updateUserDetails();
                }
                setDisabled(false);
              });
          }}
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
                    paddingBottom: 130,
                  }}
                >
                  <Picker
                    values={titleValues}
                    placeholderText={title}
                    value={title}
                    onChange={(title) => setTitle(title)}
                  />
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
                  <View style={styles.textFieldWrapper}>
                    <CountryPicker
                      selectedCountryCode={countryCode}
                      changeCountry={(countryCode) => {
                        changeCountryCode(countryCode);
                      }}
                    />
                  </View>
                  <Datepicker
                    modalState={isDatepickerOpen}
                    toggleModal={onChangeBirthDate}
                    datepickerDate={birthDate}
                  />
                  <View style={styles.textFieldWrapper}>
                    <Pressable
                      onPress={() => setDatepickerOpen(!isDatepickerOpen)}
                      style={styles.input}
                    >
                      <Typography
                        name="small"
                        text={moment(birthDate).format("DD-MM-YYYY")}
                      />
                    </Pressable>
                  </View>
                  <TextField
                    placeholder={t(`menu.streetAddress`)}
                    onChange={props.handleChange("addressLine1")}
                    value={props.values.addressLine1}
                  />
                  {props.errors.addressLine1 && props.touched.addressLine1 ? (
                    <Error name="nano" text={props.errors.addressLine1} />
                  ) : null}
                  <TextField
                    placeholder={t(`menu.houseFlatNumber`)}
                    onChange={props.handleChange("addressLine2")}
                    value={props.values.addressLine2}
                  />
                  <TextField
                    placeholder={t(`menu.city`)}
                    onChange={props.handleChange("city")}
                    value={props.values.city}
                  />
                  {props.errors.city && props.touched.city ? (
                    <Error name="nano" text={props.errors.city} />
                  ) : null}
                  <PhoneInput
                    value={phone}
                    placeholder={t(`menu.primaryPhone`)}
                    onChange={(value) => onChangePhone(value)}
                    phoneCountryPrefix={phoneCountryPrefix}
                    onPhoneCountryPrefix={(value) =>
                      setPhoneCountryPrefix(value)
                    }
                    phoneCountryCode={phoneCountryCode}
                    onPhoneCountryCodeChange={(value) =>
                      setPhoneCountryCode(value)
                    }
                  />
                  <TextField
                    placeholder={t(`menu.secondaryPhone`)}
                    onChange={props.handleChange("secondaryPhone")}
                    value={props.values.secondaryPhone}
                  />
                </ScrollView>
              </KeyboardAvoidingView>
              <View style={styles.buttonsWrapper}>
                <Button
                  text={t("common-labels.submit")}
                  type="primary"
                  font="mediumBold"
                  size="big"
                  onPress={props.handleSubmit}
                  disabled={disabled}
                />
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

export default PersonalDetails;
