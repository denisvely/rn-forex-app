import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "../../../constants";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import ChangePassword from "./ChangePassword/ChangePassword";
import MyProfileTabBar from "./MyProfileTab/MyProfileTabBar";
import UploadDocuments from "./UploadDocuments/UploadDocuments";

import styles from "./myProfileStyles";

const Tab = createMaterialTopTabNavigator();

const MyProfile = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        tabBar={(props) => (
          <MyProfileTabBar state={props.state} navigation={props.navigation} />
        )}
        initialRouteName={"PersonalDetails"}
        style={{ backgroundColor: colors.white }}
      >
        <Tab.Screen name="Personal Details">
          {() => <PersonalDetails />}
        </Tab.Screen>
        <Tab.Screen name="Change Password">
          {() => <ChangePassword />}
        </Tab.Screen>
        <Tab.Screen name="Upload Documents">
          {() => <UploadDocuments />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default MyProfile;
