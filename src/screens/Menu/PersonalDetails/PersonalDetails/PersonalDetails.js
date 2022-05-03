import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";

import {
  Button,
  TextField,
  Picker,
  CountryPicker,
} from "../../../../components";
import { deviceWidth } from "../../../../utils";
import userService from "../../../../services/userService";

import { getUser, setUser } from "../../../../store/app";

import styles from "./personalDetailsStyles";

const titleValues = [
  { label: "Mister", key: 1, value: "mister" },
  { label: "Miss", key: 2, value: "miss" },
  { label: "Mrs", key: 3, value: "mrs" },
];

const PersonalDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => getUser(state));
  const [title, setTitle] = useState(null);
  const [countryCode, changeCountryCode] = useState(user.country);

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
      });
  };

  useEffect(() => {
    updateUserDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          city: user.city,
          dateOfBirth: `${user.birthDay}.${user.birthMonth}.${user.birthYear}`,
          country: user.countryCode,
          primaryPhone: user.phone,
          secondaryPhone: user.secondaryPhone,
          streetAddress: user.addressLine1,
          houseFlatNumber: user.addressLine2,
        }}
        style={styles.form}
        onSubmit={(values) => {
          console.log(values);
          console.log(countryCode);
          console.log(title);
          // TODO => Save user details
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
                  selectedCountryCode={props.values.country}
                  changeCountry={(countryCode) =>
                    changeCountryCode(countryCode)
                  }
                />
              </View>
              <TextField
                placeholder={t(`menu.dateOfBirth`)}
                onChange={props.handleChange("dateOfBirth")}
                value={props.values.dateOfBirth}
              />
              <TextField
                placeholder={t(`menu.streetAddress`)}
                onChange={props.handleChange("streetAddress")}
                value={props.values.streetAddress}
              />
              <TextField
                placeholder={t(`menu.houseFlatNumber`)}
                onChange={props.handleChange("houseFlatNumber")}
                value={props.values.houseFlatNumber}
              />
              <TextField
                placeholder={t(`menu.city`)}
                onChange={props.handleChange("city")}
                value={props.values.city}
              />
              <TextField
                placeholder={t(`menu.primaryPhone`)}
                onChange={props.handleChange("primaryPhone")}
                value={props.values.primaryPhone}
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
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default PersonalDetails;
