import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  ScrollView,
  Keyboard,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

import {
  Button,
  TextField,
  Picker,
  Typography,
  Error,
} from "../../../components";
import { deviceWidth } from "../../../utils";
import ContactUsService from "./services/ContactUsService";

import { getUser } from "../../../store/app";

import styles from "./contactUsStyles";

const postContactUsMessage = ContactUsService.postContactUsMessage();

const ContactUsSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().required("Required"),
});

const ContactUs = ({ navigation }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => getUser(state));
  const [disabled, setDisabled] = useState(false);
  const [subject, setSubject] = useState("deposit/withdraw");
  const [isKeyboardShown, setKeyboardStatus] = useState(false);

  const subjects = [
    {
      label: t(`menu.deposit/withdraw`),
      itemKey: 0,
      value: "deposit/withdraw",
    },
    { label: t(`menu.trading`), itemKey: 1, value: "trading" },
    { label: t(`menu.technical`), itemKey: 2, value: "technical" },
    { label: t(`menu.general`), itemKey: 3, value: "general" },
  ];

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {!isKeyboardShown ? (
        <View style={styles.contactUsInfo}>
          <Typography name="small" text={t(`menu.contactUsInfo1`)} />
          <View style={styles.additionalInfo}>
            <View style={styles.left}>
              <Typography
                name="small"
                text={t(`menu.phone`)}
                style={styles.textLeft}
              />
              <Typography
                name="small"
                text={t(`menu.customerSupport`)}
                style={styles.textLeft}
              />
              <Typography
                name="small"
                text={t(`menu.affilates`)}
                style={styles.textLeft}
              />
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:+3901711900127`)}
              >
                <Typography
                  name="small"
                  text="+3901711900127"
                  style={styles.textRight}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("mailto:support@247ProTrade.com")
                }
              >
                <Typography
                  name="small"
                  text="support@247ProTrade.com"
                  style={styles.textRight}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("mailto:affilates@247ProTrade.com")
                }
              >
                <Typography
                  name="small"
                  text="affilates@247ProTrade.com"
                  style={styles.textRight}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
      <Formik
        style={styles.form}
        initialValues={{
          name: user.firstName + " " + user.lastName,
          phone: user.phone ? user.phone.replace(/-/g, "") : "",
          email: user.email,
          subject: "deposit/withdraw",
        }}
        validationSchema={ContactUsSchema}
        onSubmit={(values) => {
          setDisabled(true);
          //   TODO
          //   if ($.cookie("TLAffiliateID")) {
          //     var cparams = URL.unserialize($.cookie("TLAffiliateID"));
          //     params["affiliateInfo"] = {};
          //     params["affiliateInfo"]["affiliateId"] = cparams["AffiliateID"];
          //     params["affiliateInfo"]["bannerId"] = cparams["ClickBannerID"];
          //     params["affiliateInfo"]["subAffiliateId"] =
          //       cparams["SubAffiliateID"];
          //     params["affiliateInfo"]["clickDateTime"] = cparams["ClickDateTime"];
          //     if (cparams["AffDealID"]) {
          //       params["affiliateInfo"]["dealId"] = cparams["AffDealID"];
          //     }
          //   }

          postContactUsMessage
            .fetch({
              name: values.name,
              phone: values.phone,
              email: values.email,
              subject: subject,
              message: values.message,
            })
            .then(({ response }) => {
              if (response.body.code === 200 || response.body.code === 201) {
                Toast.show({
                  type: "success",
                  text1: t(`menu.thankYou`),
                  topOffset: 100,
                  visibilityTime: 3000,
                  autoHide: true,
                });
              } else {
                Toast.show({
                  type: "success",
                  text1: t(`menu.tryAgain`),
                  topOffset: 100,
                  visibilityTime: 3000,
                  autoHide: true,
                });
              }
              setDisabled(false);
              navigation.goBack();
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

                marginTop: 16,
              }}
            >
              <TextField
                placeholder={t(`menu.name`)}
                onChange={props.handleChange("name")}
                value={props.values.name}
                onSubmitEditing={Keyboard.dismiss}
              />
              {props.errors.name && props.touched.name ? (
                <Error name="nano" text={props.errors.name} />
              ) : null}
              <TextField
                placeholder={t(`menu.email`)}
                onChange={props.handleChange("email")}
                value={props.values.email}
                keyboardType="email-address"
              />
              {props.errors.email && props.touched.email ? (
                <Error name="nano" text={props.errors.email} />
              ) : null}
              <TextField
                placeholder={t(`menu.phone`)}
                onChange={props.handleChange("phone")}
                value={props.values.phone}
                keyboardType="phone-pad"
              />
              {props.errors.phone && props.touched.phone ? (
                <Error name="nano" text={props.errors.phone} />
              ) : null}
              <Picker
                values={subjects}
                placeholderText={subject}
                value={subject}
                onChange={(subject) => setSubject(subject)}
              />
              <TextField
                isTextArea={true}
                placeholder={t(`menu.message`)}
                onChange={props.handleChange("message")}
                value={props.values.message}
                style={styles.message}
              />
              {props.errors.message && props.touched.message ? (
                <Error name="nano" text={props.errors.message} />
              ) : null}
            </ScrollView>
            <View style={styles.buttonsWrapper}>
              <Button
                text={t("common-labels.save")}
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

export default ContactUs;
