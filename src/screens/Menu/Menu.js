import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SvgXml } from "react-native-svg";
import { logout } from "store/app/actions";

import { ButtonWithIcons, Typography } from "components";
import {
  products,
  funding,
  demoAccount,
  myMessages,
  personalDetails,
  settings,
  terms,
  contactUs,
  logoutIcon,
  accountInfoBackground,
} from "../../assets/svg/menuIcons/menuIcons";
import { getUser } from "store/app";

import styles from "./menuStyles";

const Menu = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => getUser(state));

  const submit = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

  return (
    <View style={styles.container}>
      <View style={styles.accountInfo}>
        <View>
          <Typography
            name="mediumBold"
            style={styles.accountInfoText}
            text={`${user?.firstName} ${user?.lastName}`}
          ></Typography>
          <Typography
            name="tinyBold"
            style={styles.accountInfoText}
            text={user?.email}
          ></Typography>
        </View>
        <SvgXml
          style={styles.accountInfoBG}
          xml={accountInfoBackground}
          width="93"
          height="93"
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <ButtonWithIcons
          icon={products}
          text={t(`menu.products`)}
          navigation={navigation}
          screenName={"Home"}
          onPress={() => submit("Home")}
        />
        <ButtonWithIcons
          icon={funding}
          text={t(`menu.funding`)}
          navigation={navigation}
          screenName={"Funding"}
          onPress={() => submit("Funding")}
        />
        <ButtonWithIcons
          icon={demoAccount}
          text={t(`menu.demoAccount`)}
          navigation={navigation}
          screenName={"DemoAccount"}
          onPress={() => submit("DemoAccount")}
        />
        <ButtonWithIcons
          icon={myMessages}
          text={t(`menu.myMessages`)}
          navigation={navigation}
          screenName={"MyMessages"}
          onPress={() => submit("MyMessages")}
        />
        <ButtonWithIcons
          icon={personalDetails}
          text={t(`menu.personalDetails`)}
          navigation={navigation}
          screenName={"PersonalDetails"}
          onPress={() => submit("PersonalDetails")}
        />
        <ButtonWithIcons
          icon={settings}
          text={t(`menu.settings`)}
          navigation={navigation}
          screenName={"Settings"}
          onPress={() => submit("Settings")}
        />
        <ButtonWithIcons
          icon={terms}
          text={t(`menu.terms`)}
          navigation={navigation}
          screenName={"TermsAndAgreements"}
          onPress={() => submit("TermsAndAgreements")}
        />
        <ButtonWithIcons
          icon={contactUs}
          text={t(`menu.contactUs`)}
          navigation={navigation}
          screenName={"ContactUs"}
          onPress={() => submit("ContactUs")}
        />
        <ButtonWithIcons
          icon={logoutIcon}
          text={t(`common-labels.logout`)}
          navigation={navigation}
          screenName={"Logout"}
          onPress={() => logout(dispatch)}
        />
      </ScrollView>
    </View>
  );
};

Menu.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Menu;
