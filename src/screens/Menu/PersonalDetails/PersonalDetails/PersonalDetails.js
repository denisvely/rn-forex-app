import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import moment from "moment";
import Toast from "react-native-toast-message";

import {
  Button,
  TextField,
  Picker,
  CountryPicker,
  Datepicker,
  Typography,
} from "../../../../components";
import { deviceWidth } from "../../../../utils";
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

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          city: user.city,
          countryCode: user.countryCode,
          phone: user.phone,
          secondaryPhone: user.secondaryPhone,
          addressLine1: user.addressLine1,
          addressLine2: user.addressLine2,
        }}
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
              <TextField
                placeholder={t(`menu.lastName`)}
                onChange={props.handleChange("lastName")}
                value={props.values.lastName}
              />
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
              <TextField
                placeholder={t(`menu.primaryPhone`)}
                onChange={props.handleChange("phone")}
                value={props.values.phone}
              />
              <TextField
                placeholder={t(`menu.secondaryPhone`)}
                onChange={props.handleChange("secondaryPhone")}
                value={props.values.secondaryPhone}
              />
            </ScrollView>
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
    </View>
  );
};

export default PersonalDetails;
